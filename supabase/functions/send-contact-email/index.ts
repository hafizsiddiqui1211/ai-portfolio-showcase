import { createClient } from "npm:@supabase/supabase-js@2.119.0";
import { allowRequest, corsHeaders, json, rateLimitIdentity, RateLimitUnavailable, readJsonObject, rejectOrigin, RequestBodyError } from "../_shared/security.ts";

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]!));
// Reject ASCII control characters in mail addresses (including CR/LF).
// eslint-disable-next-line no-control-regex
const isValidEmail = (email: string) => email.length <= 254 && /^[^\s@<>\x00-\x1f\x7f]+@[^\s@<>\x00-\x1f\x7f]+\.[^\s@<>\x00-\x1f\x7f]+$/.test(email);
// Normalize header-like fields before they reach a mail provider.
// eslint-disable-next-line no-control-regex
const clean = (value: unknown) => typeof value === "string" ? value.replace(/[\x00-\x1f\x7f]+/g, " ").trim() : "";

const handler = async (req: Request): Promise<Response> => {
  const cors = corsHeaders(req, "POST, OPTIONS");
  const denied = rejectOrigin(req, cors);
  if (denied) return denied;
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405, { ...cors, Allow: "POST, OPTIONS" });

  try {
    const { name, email, subject, message, website } = await readJsonObject(req, 16384);
    // A honeypot consumes neither storage nor email-provider resources.
    if (typeof website === "string" && website.trim()) return json({ success: true }, 200, cors);
    const nameStr = clean(name), emailStr = clean(email), subjectStr = clean(subject);
    const messageStr = typeof message === "string" ? message.trim() : "";
    if (!nameStr || nameStr.length > 100) return json({ error: "Name is required and must be at most 100 characters." }, 400, cors);
    if (!isValidEmail(emailStr)) return json({ error: "A valid email address is required." }, 400, cors);
    if (!subjectStr || subjectStr.length > 200) return json({ error: "Subject is required and must be at most 200 characters." }, 400, cors);
    if (messageStr.length < 10 || messageStr.length > 2000 || messageStr.includes("\0")) return json({ error: "Message must be between 10 and 2000 characters." }, 400, cors);

    const url = Deno.env.get("SUPABASE_URL"), serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !serviceKey) return json({ error: "The contact form is unavailable. Please email directly." }, 503, cors);
    const client = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const identity = await rateLimitIdentity(req, serviceKey);
    if (!(await allowRequest(client, identity, "contact", 3, 3600000)) ||
        !(await allowRequest(client, "global", "contact_global", 100, 86400000))) {
      return json({ error: "Too many requests. Please try later or email directly." }, 429, { ...cors, "Retry-After": "3600" });
    }

    // Confirm success only after the message is safely stored. Notification
    // delivery is optional and must never cause duplicate submissions on retry.
    const { error } = await client.from("contact_submissions")
      .insert({ name: nameStr, email: emailStr, subject: subjectStr, message: messageStr });
    if (error) throw new Error("Submission could not be saved");

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (apiKey) {
      try {
        const notification = await fetch("https://api.resend.com/emails", {
          method: "POST", signal: AbortSignal.timeout(10000),
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            from: Deno.env.get("CONTACT_FROM_EMAIL") || "Portfolio Contact <onboarding@resend.dev>",
            to: [Deno.env.get("OWNER_EMAIL") || "wildansiddiqui8@gmail.com"],
            reply_to: emailStr, subject: `New Contact: ${subjectStr}`,
            html: `<h2>New contact message</h2><p><strong>Name:</strong> ${escapeHtml(nameStr)}</p><p><strong>Email:</strong> ${escapeHtml(emailStr)}</p><p><strong>Subject:</strong> ${escapeHtml(subjectStr)}</p><p>${escapeHtml(messageStr).replace(/\n/g, "<br>")}</p>`,
          }),
        });
        if (!notification.ok) console.error("Contact notification failed:", notification.status);
        await notification.body?.cancel();
      } catch { console.error("Contact notification delivery unavailable; message is stored."); }
    }
    // Do not email an unverified arbitrary visitor address (mail-bombing risk).
    return json({ success: true }, 200, cors);
  } catch (error: unknown) {
    if (error instanceof RequestBodyError) return json({ error: error.message }, error.status, cors);
    console.error("Contact request failed:", error instanceof Error ? error.name : "UnknownError");
    return json({ error: "Your message could not be saved. Please try later or email directly." }, error instanceof RateLimitUnavailable ? 503 : 500, cors);
  }
};

Deno.serve(handler);
