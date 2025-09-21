// supabase/functions/send-waitlist-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const { email, name } = await req.json();

    console.log("📧 Attempting to send email...");
    console.log("Recipient:", email);
    console.log("Sender:", "admin@myspicebox.com.au");

    const resp = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": Deno.env.get("BREVO_API_KEY") ?? "",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "SpiceBox", email: "admin@myspicebox.com.au" },
        to: [{ email, name }],
        subject: "🎉 You're on the SpiceBox Waitlist!",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5">
            <h2 style="color:#e85d04">Welcome to SpiceBox</h2>
            <p>Hi ${name || "friend"},</p>
            <p>Congrats – you’re officially on our waitlist! 🍲🔥</p>
            <p>We’ll notify you as soon as we launch. Until then, stay tuned.</p>
            <br/>
            <p style="font-weight: bold">– The SpiceBox Team</p>
          </div>
        `,
      }),
    });

    const result = await resp.json();

    console.log("📡 Brevo status:", resp.status);
    console.log("📡 Brevo response:", result);

    if (!resp.ok) {
      return new Response(
        JSON.stringify({ success: false, error: result }),
        { status: resp.status }
      );
    }

    return new Response(
      JSON.stringify({ success: true, result }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("❌ Function error:", err.message);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
});
