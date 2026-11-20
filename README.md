# Hafiz Wildan Siddiqui — Portfolio

A responsive portfolio for AI engineering, Python automation and full-stack work. Built with React, TypeScript, Vite, Tailwind, shadcn/ui and Framer Motion. Supabase Edge Functions support the optional contact inbox and AI features.

## Local development

Use Node **22.18+** (Node 24 is used in CI) and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Set the two public Supabase values in `.env.local` to enable contact/chat/admin. Without them, the portfolio works and those features show an unavailable state with direct contact links. Never put a service-role key or AI/email secret in a `VITE_` variable.

```sh
npm run typecheck
npm run lint
npm run test:security
npm run build
npm run check:build
npm audit
```

The dev server uses port 8080. `npm run build` generates a `dist/` folder, including **13 route-specific HTML pages** with readable content before JavaScript, canonical URLs, social metadata and structured data. Interactive pages load through React; the chat SDK is deferred until the assistant is opened.

## Content and previews

| Content | Source |
|---|---|
| Projects and verified activity dates | `src/data/projects.ts` |
| Skills | `src/pages/Skills.tsx` |
| Home, experience, availability | `src/pages/Home.tsx` |
| Articles | `src/data/blog.ts` |
| Saved first-look images and provenance | `src/data/project-previews.json` |
| Build-time crawler content | `scripts/generate-pages.mjs` |
| Per-route client metadata | `src/components/Seo.tsx` |
| Resume | `public/downloads/hafiz-wildan-siddiqui-resume.pdf` |

Projects are sorted by verified public GitHub activity when available; private projects retain the supplied portfolio milestone. Dates are not represented as release dates. Project descriptions combine public repository evidence with the supplied portfolio content. Private work and existing resume/blog content have not been independently verified.

Project images are checked-in WebP captures, not runtime screenshot-service requests. The manifest labels website captures versus repository previews and records capture date/source. Failed app screens are not presented as successful previews. Update the image and manifest together when a project changes.

## Deploy the frontend

Start with [DEPLOYMENT-HANDOFF.md](DEPLOYMENT-HANDOFF.md) for the existing Lovable project link and a ready-to-paste deployment prompt.

Keep the existing Lovable/GitHub connection, use build command `npm run build`, and publish **all of `dist/`**. Ensure the host serves generated route directories before applying an SPA fallback. Otherwise link unfurlers may receive the homepage metadata on every route. `public/_headers` and `_redirects` support hosts that recognize those files; configure equivalent headers/routes in the hosting platform if it does not.

The canonical origin is `https://chainlit-shine-site.lovable.app`. If changing domains, update `src/components/Seo.tsx`, `scripts/generate-pages.mjs`, `index.html`, `public/robots.txt`, `public/llms.txt`, and the exact CORS allowlist in the backend together. The sitemap is generated into `dist/` during build.

Production builds restrict scripts with CSP, permit inline styles used by the UI libraries, and connect only to the configured backend origin. The HTTP-only protections in `_headers` require host support.

## Deploy the backend

Read [SECURITY.md](SECURITY.md) before deployment. Apply **all** SQL migrations in order before publishing the three edge functions. The quota RPC is required: requests fail closed if it is missing. Configure secrets in Supabase, not the repository. The source refresh does not apply remote database changes or rotate existing secrets.

The contact endpoint stores submissions before reporting success, then optionally notifies the owner. It never sends automatic mail to unverified visitor addresses. Contact confirmation means storage succeeded, not that an email was delivered.

## Maintenance

GitHub Actions checks reproducible installation, TypeScript, lint, security tests, build output and npm audit. Dependabot proposes weekly package and Actions updates. A zero-advisory audit is a point-in-time dependency result, not a guarantee that an application has no security issues.

See [UPDATE-REPORT.md](UPDATE-REPORT.md) for verification evidence, capture limitations and deployment status for this refresh.
