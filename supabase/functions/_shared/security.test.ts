import assert from "node:assert/strict";
import { test } from "node:test";
import { getLovableAiGatewayRunId, withLovableAiGatewayRunIdHeader } from "./run-id.ts";
import {
  allowRequest, corsHeaders, getClientIp, rateLimitIdentity, RateLimitUnavailable,
  readJsonObject, rejectOrigin, RequestBodyError, timingSafeEqual,
} from "./security.ts";

const request = (body: string, headers: Record<string, string> = {}) => new Request("https://example.test", {
  method: "POST", headers: { "Content-Type": "application/json", ...headers }, body,
});
const bodyError = (status: number) => (error: unknown) => error instanceof RequestBodyError && error.status === status;

test("JSON accepts objects but rejects null, arrays, primitives and malformed JSON", async () => {
  assert.deepEqual(await readJsonObject(request('{"message":"hello"}'), 100), { message: "hello" });
  for (const body of ["null", "[]", '"text"', "1", "{"]) {
    await assert.rejects(readJsonObject(request(body), 100), bodyError(400));
  }
});

test("body limit measures bytes without relying on Content-Length", async () => {
  await assert.rejects(readJsonObject(request('{"x":"😀😀😀"}'), 12), bodyError(413));
  await assert.rejects(readJsonObject(request("{}", { "Content-Length": "9999" }), 100), bodyError(413));
  await assert.rejects(readJsonObject(request("{}", { "Content-Type": "text/plain" }), 100), bodyError(415));
});

test("streaming requests cannot bypass the body budget", async () => {
  const stream = new ReadableStream({ start(controller) {
    controller.enqueue(new TextEncoder().encode('{"x":"'));
    controller.enqueue(new TextEncoder().encode("x".repeat(200)));
    controller.close();
  } });
  const req = new Request("https://example.test", { method: "POST", headers: { "Content-Type": "application/json" }, body: stream, duplex: "half" } as RequestInit);
  await assert.rejects(readJsonObject(req, 100), bodyError(413));
});

test("CORS allows exact portfolio origin only and rejects foreign browser origins", () => {
  const allowed = new Request("https://example.test", { headers: { Origin: "https://chainlit-shine-site.lovable.app" } });
  const headers = corsHeaders(allowed, "POST, OPTIONS");
  assert.equal(headers["Access-Control-Allow-Origin"], "https://chainlit-shine-site.lovable.app");
  assert.equal(headers["Cache-Control"], "no-store");
  assert.equal(rejectOrigin(allowed, headers), null);
  for (const origin of ["https://attacker.test", "https://chainlit-shine-site.lovable.app.attacker.test", "null"]) {
    const req = new Request("https://example.test", { headers: { Origin: origin } });
    assert.equal(rejectOrigin(req, corsHeaders(req, "POST"))?.status, 403);
  }
});

test("IP identity ignores untrusted direct headers and uses final forwarded hop", () => {
  const req = new Request("https://example.test", { headers: { "cf-connecting-ip": "attacker", "x-real-ip": "attacker", "x-forwarded-for": "attacker, 203.0.113.10" } });
  assert.equal(getClientIp(req), "203.0.113.10");
  assert.equal(getClientIp(new Request("https://example.test", { headers: { "cf-connecting-ip": "203.0.113.10" } })), "unknown");
  assert.equal(getClientIp(new Request("https://example.test", { headers: { "x-forwarded-for": "not-an-ip" } })), "unknown");
});

test("stored IP identities are stable keyed hashes, not raw addresses", async () => {
  const req = new Request("https://example.test", { headers: { "x-forwarded-for": "203.0.113.10" } });
  const value = await rateLimitIdentity(req, "test-only-secret");
  assert.match(value, /^[a-f0-9]{64}$/);
  assert.equal(value, await rateLimitIdentity(req, "test-only-secret"));
  assert.notEqual(value, await rateLimitIdentity(req, "another-secret"));
});

test("secret equality handles prefixes, Unicode and different lengths", async () => {
  assert.equal(await timingSafeEqual("long-test-passcode", "long-test-passcode"), true);
  assert.equal(await timingSafeEqual("long-test-passcode", "long-test-passcodf"), false);
  assert.equal(await timingSafeEqual("prefix", "prefix-longer"), false);
  assert.equal(await timingSafeEqual("é", "e"), false);
});

test("quota reservation uses atomic RPC and accepts only an explicit boolean", async () => {
  let recorded: unknown;
  const client = { rpc: async (name: string, args: Record<string, unknown>) => {
    recorded = { name, args }; return { data: true, error: null };
  } };
  assert.equal(await allowRequest(client, "hashed-ip", "chat", 30, 3600000), true);
  assert.deepEqual(recorded, { name: "consume_portfolio_rate_limit", args: { p_identity: "hashed-ip", p_purpose: "chat", p_limit: 30, p_window_seconds: 3600 } });
  assert.equal(await allowRequest({ rpc: async () => ({ data: false, error: null }) }, "id", "chat", 30, 1000), false);
  for (const result of [{ data: null, error: null }, { data: true, error: { code: "DB_DOWN" } }, { data: "true", error: null }]) {
    await assert.rejects(allowRequest({ rpc: async () => result }, "id", "chat", 30, 1000), RateLimitUnavailable);
  }
});


test("AI diagnostics never delay a response when upstream headers are unavailable", async () => {
  const response = await withLovableAiGatewayRunIdHeader(new Response("provider unavailable"), {
    getRunId: () => undefined,
    waitForRunId: () => new Promise(() => {}),
  }, undefined, { waitForUpstreamHeaders: false });
  assert.equal(await response.text(), "provider unavailable");
  assert.equal(getLovableAiGatewayRunId(new Request("https://example.test", { headers: { "X-Lovable-AIG-Run-ID": "safe-id_123" } })), "safe-id_123");
  assert.equal(getLovableAiGatewayRunId(new Request("https://example.test", { headers: { "X-Lovable-AIG-Run-ID": "x".repeat(129) } })), undefined);
});
