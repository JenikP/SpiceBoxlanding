// supabase/functions/send-waitlist-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { email, name } = await req.json();

  // Basic SMTP call through Brevo
  const resp = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": Deno.env.get("BREVO_API_KEY")!,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "SpiceBox", email: "admin@myspicebox.com.au" },
      to: [{ email, name }],
      subject: "🎉 You're on the SpiceBox Waitlist!",
      htmlContent: `
        <h2>Welcome to SpiceBox</h2>
        <p>Congrats ${name || ""}, you’re officially on the waitlist!</p>
        <p>We’ll notify you as soon as we launch. Until then, stay tuned 🍲🔥</p>
      `,
    }),
  });

  return new Response(JSON.stringify(await resp.json()), { status: 200 });
});
