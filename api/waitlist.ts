import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const waitlistSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("A valid email address is required"),
  suburb: z.string().min(1, "Suburb is required"),
  dietaryPreference: z.string().min(1, "Please select a dietary preference"),
  heardFrom: z.string().min(1, "Please let us know where you heard about us"),
  phone: z.string().optional(),
});

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const data = waitlistSchema.parse(req.body);

      const supabaseUrl = process.env.VITE_SUPABASE_URL!;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // ✅ Check if user already exists by email
      const { data: existingUser, error: getUserError } =
        await supabase.auth.admin.getUserByEmail(data.email);

      if (getUserError) throw getUserError;

      let userId: string;
      if (existingUser?.user) {
        userId = existingUser.user.id;
      } else {
        // ✅ Create new user
        const { data: newUser, error: createError } =
          await supabase.auth.admin.createUser({
            email: data.email,
            password: "TempPassword123!",
            email_confirm: true,
          });
        if (createError) throw createError;
        userId = newUser.user.id;
      }

      // ✅ Upsert into profiles
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: userId,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone ?? "", // not null
        suburb: data.suburb,
        heard_from: data.heardFrom,
        dietaryPreferance: data.dietaryPreference, // match schema spelling
      });

      if (profileError) {
        console.error("Profile insert error:", profileError);
        throw profileError;
      }

      return res.status(200).json({ success: true, userId });
    } catch (err: any) {
      console.error("Waitlist error:", err);
      if (err instanceof z.ZodError) {
        return res
          .status(400)
          .json({ success: false, error: "Validation failed", details: err.errors });
      }
      return res
        .status(500)
        .json({ success: false, error: err?.message ?? "Unknown error" });
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
