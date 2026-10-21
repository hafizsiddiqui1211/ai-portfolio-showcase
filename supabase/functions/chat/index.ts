import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { convertToModelMessages, type UIMessage } from "npm:ai@7";

import { createResponsesCall } from "../_shared/responses.ts";

const GATEWAY_URL = "https://ai.gateway.lovable.dev";
const MODEL = "openai/gpt-6-astra";

const ALLOWED_ORIGINS = new Set([
  "https://chainlit-shine-site.lovable.app",
  "https://id-preview--b5caf7ae-e532-478a-9247-e9e88f0d372a.lovable.app",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
]);

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  return headers;
}

const PERSONA_INSTRUCTIONS = `You are the AI assistant on the portfolio website of Hafiz Wildan Ahmed Siddiqui, an Agentic AI Engineer and Full-Stack Python Developer based in Karachi, Pakistan.

About Wildan:
- Specialties: Agentic AI (OpenAI Agents SDK), prompt and context engineering, Chainlit, Streamlit, FastAPI, and Python scripting.
- Currently a Back Office Executive at K-Electric (since March 2026), where he built and deployed a production attendance automation system (Python + Streamlit) used daily by HR for 45+ employees.
- Education: BS Software Engineering at SMIU Karachi (semester 6 of 8, expected 2026) and GIAIC (Governor's Initiative for AI & Computing).
- Notable projects: an Agentic AI chatbot with the OpenAI Agents SDK and Chainlit; the K-Electric attendance automation system; an ERP-style operations dashboard (Streamlit + FastAPI); a Flutter venue-booking app (NikkahNow); a Docusaurus documentation platform; and several Streamlit apps.
- He is open to AI roles, internships, freelance projects and consulting. Contact email: wildansiddiqui8@gmail.com. GitHub: github.com/hafizsiddiqui1211.

Your behavior:
- Be warm, professional and concise. Answer in plain text (no markdown headings or tables).
- Answer questions about Wildan's skills, experience, projects and services using only the facts above; do not invent credentials, dates or offers.
- For anything beyond Wildan's portfolio (general AI questions), you may answer briefly if helpful.
- If someone wants to hire or collaborate, invite them to use the Contact page at /contact.
- Keep replies under 120 words unless the question genuinely needs more.`;

const handler = async (req: Request): Promise<Response> => {
  const cors = corsHeaders(req);
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }

  try {
    // --- Rate limiting: 30 chat requests per IP per hour ---
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
    const { count } = await supabase
      .from("contact_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip", clientIp)
      .eq("purpose", "chat")
      .gte("created_at", oneHourAgo);
    if ((count ?? 0) >= 30) {
      return new Response(JSON.stringify({ error: "Rate limit reached. Please try again later." }), {
        status: 429,
        headers: { "Content-Type": "application/json", ...cors },
      });
    }
    await supabase.from("contact_rate_limits").insert({ ip: clientIp, purpose: "chat" });

    // --- Input validation ---
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request body." }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...cors },
      });
    }
    const parsed = body as { messages?: unknown; mode?: unknown; systemPrompt?: unknown };
    const rawMessages = parsed.messages;
    if (!Array.isArray(rawMessages) || rawMessages.length === 0 || rawMessages.length > 50) {
      return new Response(JSON.stringify({ error: "messages must be a non-empty array (max 50)." }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...cors },
      });
    }
    const shapeOk = rawMessages.every(
      (m) =>
        m !== null && typeof m === "object" &&
        ["user", "assistant"].includes((m as UIMessage).role) &&
        Array.isArray((m as UIMessage).parts)
    );
    if (!shapeOk) {
      return new Response(JSON.stringify({ error: "Invalid message format." }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...cors },
      });
    }

    let instructions = PERSONA_INSTRUCTIONS;
    if (parsed.mode === "playground") {
      const systemPrompt = typeof parsed.systemPrompt === "string" ? parsed.systemPrompt.trim() : "";
      if (!systemPrompt || systemPrompt.length > 4000) {
        return new Response(
          JSON.stringify({ error: "A system prompt (under 4000 characters) is required in playground mode." }),
          { status: 400, headers: { "Content-Type": "application/json", ...cors } }
        );
      }
      instructions = systemPrompt;
    }

    // --- Stream the model response through Lovable AI ---
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI is not configured yet. Please try again later." }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const modelMessages = await convertToModelMessages(rawMessages as UIMessage[]);
    const call = createResponsesCall(req, { baseURL: GATEWAY_URL, apiKey, model: MODEL }, modelMessages, instructions);
    return call.response();
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      return new Response(null, { status: 499, headers: cors });
    }
    console.error("Chat error:", error instanceof Error ? error.constructor.name : "UnknownError");
    return new Response(JSON.stringify({ error: "The assistant is unavailable right now. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }
};

serve(handler);
