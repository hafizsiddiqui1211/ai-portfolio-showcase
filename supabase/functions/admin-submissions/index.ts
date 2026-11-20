import { createClient } from "npm:@supabase/supabase-js@2.119.0";
import { allowRequest, corsHeaders, json, rateLimitIdentity, RateLimitUnavailable, rejectOrigin, timingSafeEqual } from "../_shared/security.ts";

const handler = async (req: Request): Promise<Response> => {
  const cors = corsHeaders(req, "GET, OPTIONS", ", x-admin-key");
  const denied = rejectOrigin(req, cors);
  if (denied) return denied;
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "GET") return json({ error: "Method not allowed." }, 405, { ...cors, Allow: "GET, OPTIONS" });

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const expected = Deno.env.get("ADMIN_PASSCODE") ?? "";
    // Prefer a randomly generated passcode of at least 32 characters.
    if (!url || !serviceKey || expected.length < 12 || expected.length > 256) {
      return json({ error: "Admin access is not configured." }, 503, cors);
    }
    const client = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const identity = await rateLimitIdentity(req, serviceKey);
    // Reserve an attempt BEFORE checking the secret. A correct guess cannot bypass
    // a lockout. The global quota also limits distributed brute-force attempts.
    if (!(await allowRequest(client, identity, "admin", 5, 900000)) ||
        !(await allowRequest(client, "global", "admin_global", 100, 900000))) {
      return json({ error: "Too many attempts. Try again later." }, 429, { ...cors, "Retry-After": "900" });
    }
    const provided = req.headers.get("x-admin-key") ?? "";
    if (provided.length > 256 || !(await timingSafeEqual(provided, expected))) {
      return json({ error: "Invalid passcode." }, 401, cors);
    }
    const { data, error } = await client.from("contact_submissions")
      .select("id, name, email, subject, message, created_at")
      .order("created_at", { ascending: false }).limit(100);
    if (error) throw new Error("Submission query failed");
    return json({ submissions: data ?? [] }, 200, cors);
  } catch (error: unknown) {
    console.error("Admin request failed:", error instanceof Error ? error.name : "UnknownError");
    return json({ error: "Submissions are temporarily unavailable. Please try again later." }, error instanceof RateLimitUnavailable ? 503 : 500, cors);
  }
};

Deno.serve(handler);
