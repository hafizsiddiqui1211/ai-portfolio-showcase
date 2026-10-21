import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = new Set([
  "https://chainlit-shine-site.lovable.app",
  "https://id-preview--b5caf7ae-e532-478a-9247-e9e88f0d372a.lovable.app",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
]);

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-key",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  return headers;
}

const handler = async (req: Request): Promise<Response> => {
  const cors = corsHeaders(req);
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }

  // Server-side passcode validation — the passcode lives only in this function's secrets.
  const provided = req.headers.get("x-admin-key") ?? "";
  const expected = Deno.env.get("ADMIN_PASSCODE") ?? "";
  if (!expected || provided !== expected) {
    return new Response(JSON.stringify({ error: "Invalid passcode." }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("id, name, email, subject, message, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Admin query error:", error.constructor.name);
    return new Response(JSON.stringify({ error: "Could not load submissions." }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }

  return new Response(JSON.stringify({ submissions: data ?? [] }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...cors },
  });
};

serve(handler);
