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
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const data = waitlistSchema.parse(req.body);

    const supabase = createClient(
      process.env.VITE_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // service role key only in serverless funcs
    );

    const { error } = await supabase.from("profiles").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone ?? "",
      suburb: data.suburb,
      heard_from: data.heardFrom,
      dietaryPreferance: data.dietaryPreference,
    });

    if (error) {
      console.error("Insert error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    // ✅ Call Supabase Edge Function to send email
    await fetch(
      `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.functions.supabase.co/send-waitlist-email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          name: data.fullName,
        }),
      }
    );

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Validation/API error:", err);
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: err.errors,
      });
    }
    return res
      .status(500)
      .json({ success: false, error: err?.message ?? "Unknown error" });
  }
}
