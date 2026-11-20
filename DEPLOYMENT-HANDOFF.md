# Publish the portfolio refresh

Open the existing [Lovable project](https://lovable.dev/projects/b5caf7ae-e532-478a-9247-e9e88f0d372a), connected to hafizsiddiqui1211/ai-portfolio-showcase. Keep the existing Supabase project: utadbkhhosbxpzxedamc. No new hosting or database project is needed.

## 1. Sync main and paste this in Lovable

```text
Use the latest main branch of hafizsiddiqui1211/ai-portfolio-showcase. Preserve the implemented design and project content. Read README.md, SECURITY.md and UPDATE-REPORT.md, then finish deployment in this existing Lovable project and its connected Supabase project utadbkhhosbxpzxedamc.

First inspect existing configuration. Set VITE_SUPABASE_URL to https://utadbkhhosbxpzxedamc.supabase.co and VITE_SUPABASE_PUBLISHABLE_KEY to this project's public publishable/anon key. Never use a service-role key in the frontend.

Preserve valid server secrets. Required for admin and AI: ADMIN_PASSCODE (prefer a random 32+ character value; minimum 12) and LOVABLE_API_KEY. Optional owner email notifications need RESEND_API_KEY, OWNER_EMAIL and CONTACT_FROM_EMAIL on a verified Resend domain. Use the secure Secrets interface for missing secrets; never place them in code or VITE_ variables. Keep the model configurable through LOVABLE_AI_MODEL and select a model supported by this gateway.

Inspect migration history and apply only pending repository migrations in their intended order. Preserve contact submissions and other data. Do not reset the database. The consume_portfolio_rate_limit RPC must exist before the new functions are deployed.

Deploy send-contact-email, chat and admin-submissions from this repository. Preserve the verify_jwt=false configuration: public endpoints enforce their quotas, while admin also checks its server-only passcode.

Run npm ci and npm run build using Node 22.18+ (24 preferred). Check phone and desktop navigation, project search/category/sort, resume download, a real contact submission, authorized admin access, AI assistant and prompt playground. Keep errors and unavailable states honest. Confirm that the final X-Forwarded-For hop comes from a trusted platform proxy.

Host all of dist/, including generated route index.html files. Direct project and article URLs must receive their own canonical metadata. Configure equivalent HTTP headers if the host does not honor public/_headers.

Do not publish until these checks pass. Report remaining blockers. Do not disable rate limits, RLS, CSP or other security controls to make a check pass.
```

Lovable must have backend access to perform these steps. If it cannot apply migrations or deploy functions, use the CLI alternative below or ask the project administrator. A successful prompt response alone does not prove that deployment works.

## 2. Add missing settings securely

Use Lovable/Supabase's secure configuration interface. Do not paste API keys, passcodes or database passwords into GitHub or this conversation. Existing valid secrets need not be rotated merely because the source changed.

Supabase provides SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to Edge Functions. They do not belong in frontend variables. Contact storage can work without Resend notifications; AI features need gateway access. Public portfolio pages still work when backend configuration is absent.

## 3. Review and publish

Review the Lovable preview at phone and desktop sizes. Submit a contact message, check it in the admin inbox and try both AI interfaces. Once checks pass, click Publish (or Update for an existing publication). Open https://chainlit-shine-site.lovable.app/ and confirm that the new design is visible.

The safe order is: public build variables and server secrets, pending migrations, Edge Functions, then frontend publication. The new frontend supports old anon JWT keys as well as new publishable keys, but this compatibility does not replace backend deployment.

## Supabase CLI alternative

Run locally from a freshly updated checkout with access to the existing project. Use the dashboard for secrets rather than command arguments.

```sh
git clone https://github.com/hafizsiddiqui1211/ai-portfolio-showcase.git
cd ai-portfolio-showcase
npm ci
npx supabase login
npx supabase link --project-ref utadbkhhosbxpzxedamc
npx supabase migration list
npx supabase db push --include-all --dry-run
```

Review pending migrations against SECURITY.md. If migration history differs or a table already exists without matching history, reconcile that first. Do not reset the database or blindly rerun the initial migration.

```sh
npx supabase db push --include-all
npx supabase functions deploy send-contact-email
npx supabase functions deploy chat
npx supabase functions deploy admin-submissions
```

Set the two public frontend values in Lovable, rebuild, verify the flows and publish there. Database/function deployment and frontend publication are separate steps.

## Access available in this conversation

GitHub source and checks are connected. Lovable publishing, Supabase management credentials and server secrets are not available here. The repository update can be completed here; backend deployment, settings and publication need your connected Lovable/Supabase account. No remote database change or secret rotation has been performed.
