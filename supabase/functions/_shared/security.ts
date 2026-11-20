// Security checks shared by all public edge functions. CORS is not authentication.
export const ALLOWED_ORIGINS = new Set([
  "https://chainlit-shine-site.lovable.app",
  "https://id-preview--b5caf7ae-e532-478a-9247-e9e88f0d372a.lovable.app",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
]);

export function corsHeaders(req: Request, methods: string, extraHeaders = ""): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": `authorization, x-client-info, apikey, content-type${extraHeaders}`,
    "Access-Control-Allow-Methods": methods,
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Cache-Control": "no-store",
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

export const json = (body: unknown, status: number, cors: Record<string, string>) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...cors } });

export function rejectOrigin(req: Request, cors: Record<string, string>): Response | null {
  return req.headers.has("origin") && !cors["Access-Control-Allow-Origin"]
    ? json({ error: "Origin not allowed." }, 403, cors)
    : null;
}

export class RequestBodyError extends Error {
  status: number;
  constructor(message: string, status: number) { super(message); this.status = status; }
}

/** Enforce the actual byte count, including requests without Content-Length. */
export async function readJsonObject(req: Request, maxBytes: number): Promise<Record<string, unknown>> {
  if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    throw new RequestBodyError("Content-Type must be application/json.", 415);
  }
  const length = Number(req.headers.get("content-length"));
  if (Number.isFinite(length) && length > maxBytes) throw new RequestBodyError("Request body is too large.", 413);
  if (!req.body) throw new RequestBodyError("Invalid request body.", 400);
  const reader = req.body.getReader();
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new RequestBodyError("Request body is too large.", 413);
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try {
    const value: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return value as Record<string, unknown>;
  } catch { throw new RequestBodyError("Invalid request body.", 400); }
}

/**
 * Only use the final proxy-added X-Forwarded-For entry, never client-selected
 * CF-Connecting-IP/X-Real-IP. Deployment must preserve a trusted final proxy hop.
 * A missing/malformed address shares one restricted bucket. Global budgets also
 * apply, because an IP quota alone is not sufficient protection for paid APIs.
 */
export function getClientIp(req: Request): string {
  const candidate = req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  return candidate && candidate.length <= 64 && /^[0-9a-fA-F:.]+$/.test(candidate) ? candidate : "unknown";
}

/** Store keyed hashes rather than raw IP addresses in rate-limit storage. */
export async function rateLimitIdentity(req: Request, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(getClientIp(req)));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Compare fixed-size digests; inputs are capped before this function is called. */
export async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [left, right] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)), crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);
  const x = new Uint8Array(left), y = new Uint8Array(right);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

type RateLimitClient = {
  rpc: (name: string, args: Record<string, unknown>) => PromiseLike<{ data: unknown; error: unknown }>;
};
export class RateLimitUnavailable extends Error {}

/** Database-serialized quota reservation. Missing migration/DB failure fails closed. */
export async function allowRequest(client: RateLimitClient, identity: string, purpose: string, limit: number, windowMs: number): Promise<boolean> {
  const { data, error } = await client.rpc("consume_portfolio_rate_limit", {
    p_identity: identity, p_purpose: purpose, p_limit: limit, p_window_seconds: Math.ceil(windowMs / 1000),
  });
  if (error || typeof data !== "boolean") throw new RateLimitUnavailable("Rate limiting is unavailable.");
  return data;
}
