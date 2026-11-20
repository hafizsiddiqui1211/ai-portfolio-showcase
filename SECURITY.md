# Backend security and deployment

The portfolio uses three Supabase Edge Functions. The public browser key identifies the project; it is not a user credential. Contact and chat are public, while `admin-submissions` additionally requires the server-only `ADMIN_PASSCODE` in `x-admin-key`.

## Controls implemented

- Exact origin allowlist on every endpoint, including streaming chat responses and preflights. CORS is a browser control, not authentication.
- Actual request-byte limits (16 KiB contact, 64 KiB chat), JSON-object validation, field limits, text-only chat inputs and a 700-token AI output cap.
- Atomic database quota reservations using a transaction-scoped advisory lock. Database errors or a missing migration fail closed. A rejected quota check does not insert a row; any earlier successful reservation in the same multi-quota request remains charged.
- Per-client quotas plus global budgets: contact 3/hour per client and 100/day globally; portfolio chat 30/hour; playground 12/hour; both AI modes share 300/day globally. Admin allows 5 attempts per client and 100 attempts globally per 15 minutes. Admin reservations happen before comparing the passcode, so a correct guess cannot bypass a lockout.
- Rate identities are HMAC hashes of the final `X-Forwarded-For` hop; raw IP addresses are not written by the updated functions. Retention removes quota rows older than 24 hours on subsequent accepted requests.
- Row-level security and explicit grants prevent browser roles from reading submissions or modifying quotas. Only the service role can call the quota function.
- Admin responses are uncached. Passcodes are bounded, compared as fixed-size digests, cleared from the frontend after an attempt, and never stored in browser storage. Use a randomly generated passcode of at least 32 characters; the endpoint rejects values shorter than 12 or longer than 256.
- Contact success requires a successful database insert. Optional owner notifications are HTML-escaped, time-limited and sent only to the configured owner. No email is sent to an arbitrary unverified visitor address.
- Backend configuration is explicit. Missing browser configuration disables interactive backend controls gracefully instead of using production fallback credentials. Anonymous calls do not persist or broker auth sessions.
- AI calls have a 45-second deadline, sanitized client errors, and no reasoning output sent to the visitor. Diagnostic headers cannot hold the response open when upstream setup fails.

## Deployment order

These changes must be deployed to Supabase separately from the frontend. No remote database migration or Edge Function deployment was performed during this review.

1. Review and apply the complete `supabase/migrations` chain to the linked project:
   - `20260217220855_66c3e918-91ef-44d5-a7fe-b6d08a85add6.sql` — initial rate-limit table/RLS.
   - `20261115000000_contact_schema_prerequisites.sql` — purpose column and contact table for a fresh Supabase setup.
   - `20261116000000_harden_rate_limits.sql` — indexes, grants, retention helper and input-length constraint.
   - `20261116010000_atomic_rate_limits.sql` — service-role-only transactional quota RPC.

    The prerequisite migration also supports deployments that previously used the Drizzle migration. Apply migrations before deploying the new functions; otherwise quota checks intentionally return an unavailable response.
2. In the Supabase dashboard, configure `ADMIN_PASSCODE` and `LOVABLE_API_KEY`. `RESEND_API_KEY`, `OWNER_EMAIL` and `CONTACT_FROM_EMAIL` configure optional owner notifications; the sender must use a verified Resend domain for production delivery. Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` on the server. Never put these secrets in `VITE_*` variables. `LOVABLE_AI_MODEL` optionally overrides the existing default model; choose a model enabled on your Lovable gateway account.
3. Deploy `send-contact-email`, `chat` and `admin-submissions`, retaining the `verify_jwt = false` entries in `supabase/config.toml`. The endpoints enforce their application controls internally. New Supabase publishable keys are not JWTs.
4. Set only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the frontend build environment, then rebuild. Add any new production frontend origin explicitly to `_shared/security.ts` and redeploy the functions.
5. Check a real contact submission, owner notification, admin authentication and AI streaming against the deployed project. Validate that the hosting proxy appends or overwrites the final `X-Forwarded-For` entry. Without a trustworthy proxy hop, use a verified platform IP header or add a server-verified challenge; client-supplied headers cannot establish identity.

Example commands, after linking and reviewing the target project:

```sh
supabase db push --include-all
supabase functions deploy send-contact-email
supabase functions deploy chat
supabase functions deploy admin-submissions
```

## Verification and limits

```sh
node --test supabase/functions/_shared/security.test.ts
deno task --config supabase/functions/deno.json check
```

Nine helper regressions cover body validation and byte limits, origin checks, identity hashing, secret comparisons, quota failure behavior and nonblocking AI diagnostics. Edge Function TypeScript checks pass with pinned npm imports and a Deno lockfile. Registry resolution and Deno checking exposed the invalid old `@ai-sdk/openai@7` import; the checked compatible set is `@ai-sdk/openai@4.0.118`, `ai@7.0.173` and `@supabase/supabase-js@2.119.0`. An isolated npm audit of that exact edge dependency set reported zero known vulnerabilities at review time. The model ID is retained from the portfolio's existing configuration and can be overridden with `LOVABLE_AI_MODEL`; model availability was not verified without gateway credentials.

The fresh Supabase migration chain and upgrade from the existing Drizzle schema were executed in isolated PGlite databases. Quota isolation, expiry, denied-row behavior, and `anon`/`authenticated` role denial passed. PGlite is a PostgreSQL engine in one process; this was not a multi-session PostgreSQL concurrency test.

Live Supabase permissions/secrets, actual proxy headers, Resend delivery, Lovable model availability and provider responses remain unverified without deploying and exercising the real backend. Global quotas bound paid-provider use but do not prevent an attacker from exhausting a public site's daily budget. A provider spend limit and an optional server-verified challenge can reduce that risk further. This review does not establish that the whole application or its hosting infrastructure is vulnerability-free.
