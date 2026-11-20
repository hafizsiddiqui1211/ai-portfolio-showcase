import { createHash } from "node:crypto";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";

/** Restrict production network access to the backend explicitly configured by the owner. */
function backendOrigins(value: string | undefined): string[] {
  if (!value) return [];
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return [];
    return [url.origin, url.origin.replace(/^https:/, "wss:")];
  } catch {
    return [];
  }
}

function securityMeta(origins: string[]): Plugin {
  return {
    name: "security-meta",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        // Hash exact inline data blocks without allowing arbitrary executable inline scripts.
        // The postbuild page generator recalculates these for each page's structured data.
        const hashes = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
          .map((match) => `'sha256-${createHash("sha256").update(match[1]).digest("base64")}'`);
        const csp = [
          "default-src 'self'",
          `script-src 'self' ${hashes.join(" ")}`.trim(),
          // Framer Motion and Radix apply inline styles; scripts remain strictly restricted.
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com data:",
          "img-src 'self' data: blob:",
          `connect-src 'self' ${origins.join(" ")}`.trim(),
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "upgrade-insecure-requests",
        ].join("; ");
        return html.replace("<head>", `<head>\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`);
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  // Vite exposes only VITE_-prefixed public configuration. No production fallback credentials.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    server: { host: "::", port: 8080 },
    plugins: [react(), securityMeta(backendOrigins(env.VITE_SUPABASE_URL)), mode === "development" && componentTagger()].filter(Boolean),
    resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
    build: { sourcemap: false, chunkSizeWarningLimit: 700 },
  };
});
