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

// ✅ Generate a referral code for the new user
const referralCode = Math.random().toString(36).substring(2, 8);

// ✅ Check if they came with a referral param (?ref=xxxx)
const referredBy = req.query?.ref || null;


export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const data = waitlistSchema.parse(req.body);

    const supabase = createClient(
      process.env.VITE_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // ✅ Check for duplicates
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", data.email)
      .maybeSingle();

    if (existing) {
      return res.status(400).json({
        success: false,
        error: "This email is already registered for the waitlist.",
      });
    }

    // Insert new record
  const { error } = await supabase.from("profiles").insert({
  full_name: data.fullName,
  email: data.email,
  phone: data.phone ?? "",
  suburb: data.suburb,
  heard_from: data.heardFrom,
  dietaryPreferance: data.dietaryPreference,
  referral_code: referralCode,   // new
  referred_by: referredBy        // new
});


    if (error) {
      console.error("Insert error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    // Call Edge Function to send confirmation email
    const functionUrl = `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.functions.supabase.co/send-waitlist-email`;

    await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        email: data.email,
        name: data.fullName,
      }),
    });

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
