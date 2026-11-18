import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function readBackendConfig(): { url: string; publishableKey: string } | null {
  const rawUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!rawUrl || !publishableKey || /YOUR[-_]/i.test(`${rawUrl} ${publishableKey}`)) return null;
  // A server secret must never be used as a browser credential.
  if (publishableKey.startsWith("sb_secret_")) return null;
  try {
    const url = new URL(rawUrl);
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (url.protocol !== "https:" && !(local && url.protocol === "http:")) return null;
    if (url.username || url.password || url.search || url.hash || url.pathname !== "/") return null;
    if (publishableKey.startsWith("eyJ")) {
      const payload = JSON.parse(atob(publishableKey.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      if (payload.role !== "anon") return null;
    } else if (!publishableKey.startsWith("sb_publishable_")) {
      return null;
    }
    return { url: url.origin, publishableKey };
  } catch {
    return null;
  }
}

export const backendConfig = readBackendConfig();
export const isBackendConfigured = backendConfig !== null;

// The portfolio has no Supabase user-login flow. Do not persist or broker auth
// sessions, read URL tokens, or start token-refresh timers for anonymous calls.
export const supabase = backendConfig
  ? createClient<Database>(backendConfig.url, backendConfig.publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    })
  : null;
