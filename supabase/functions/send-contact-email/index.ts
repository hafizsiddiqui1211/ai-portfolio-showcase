import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://chainlit-shine-site.lovable.app",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// HTML escaping to prevent XSS/injection in emails
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Simple email format validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // --- Rate Limiting (5 requests per IP per hour) ---
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
    const { count } = await supabase
      .from("contact_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip", clientIp)
      .gte("created_at", oneHourAgo);

    if ((count ?? 0) >= 5) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Log this request for rate limiting
    await supabase.from("contact_rate_limits").insert({ ip: clientIp });

    // --- Input Validation ---
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request body." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, subject, message } = body as Record<string, unknown>;

    const nameStr = typeof name === "string" ? name.trim() : "";
    const emailStr = typeof email === "string" ? email.trim() : "";
    const subjectStr = typeof subject === "string" ? subject.trim() : "";
    const messageStr = typeof message === "string" ? message.trim() : "";

    if (!nameStr || nameStr.length > 100) {
      return new Response(
        JSON.stringify({ error: "Name is required and must be under 100 characters." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (!isValidEmail(emailStr)) {
      return new Response(
        JSON.stringify({ error: "A valid email address is required." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (!subjectStr || subjectStr.length > 200) {
      return new Response(
        JSON.stringify({ error: "Subject is required and must be under 200 characters." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (!messageStr || messageStr.length < 10 || messageStr.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Message must be between 10 and 2000 characters." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize all fields for safe HTML embedding
    const safeName = escapeHtml(nameStr);
    const safeEmail = escapeHtml(emailStr);
    const safeSubject = escapeHtml(subjectStr);
    const safeMessage = escapeHtml(messageStr).replace(/\n/g, "<br>");

    // --- Send notification email to site owner ---
    const ownerEmail = "wildansiddiqui8@gmail.com";
    const notificationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [ownerEmail],
        reply_to: emailStr,
        subject: `New Contact: ${safeSubject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      }),
    });

    if (!notificationResponse.ok) {
      console.error("Failed to send notification email:", notificationResponse.status);
    }

    // --- Send confirmation email to the sender ---
    // NOTE: Replace with your verified domain email, e.g., "noreply@yourdomain.com"
    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [emailStr],
        subject: "Thank you for reaching out!",
        html: `
          <h1>Thank you for contacting me, ${safeName}!</h1>
          <p>I have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <blockquote style="border-left: 3px solid #ccc; padding-left: 10px; color: #666;">
            ${safeMessage}
          </blockquote>
          <p>Best regards,<br>AI Engineering Expert</p>
        `,
      }),
    });

    if (!confirmationResponse.ok) {
      console.error("Failed to send confirmation email:", confirmationResponse.status);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: unknown) {
    // Log minimal error info server-side only — never expose to client
    console.error("Contact email error:", {
      timestamp: new Date().toISOString(),
      errorType: error instanceof Error ? error.constructor.name : "UnknownError",
    });

    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
