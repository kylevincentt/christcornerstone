# CLAUDE.md — Cornerstone (christcornerstone)

ChristCornerstone.org — a Christian faith resource website. Next.js 14 App Router + TypeScript + Tailwind, served by Vercel.

## Stack

- **Framework:** Next.js 14 (App Router) + TypeScript.
- **Styling:** Tailwind CSS (`tailwind.config.ts`, `app/globals.css`).
- **Database — admin CMS:** Neon (Postgres, serverless) via `@neondatabase/serverless`. Schema lives in `db/schema.sql`. Setup script: `npm run db:setup`.
- **Database / auth — user-facing:** Supabase (env vars in `.env.example`, helpers in `lib/supabase.ts`).
- **Admin auth:** `iron-session` + `jose` against `ADMIN_PASSWORD` env. Helpers in `lib/auth.ts`.
- **Email:** SendGrid (`@sendgrid/mail`).
- **Hosting:** Vercel. Vercel cron uses `CRON_SECRET`.

## Commands

- `npm run dev` — Next dev server.
- `npm run build` — production build.
- `npm run start` — run the production build.
- `npm run lint` — ESLint via `eslint-config-next`.
- `npm run db:setup` — `tsx scripts/setup-db.ts` (creates tables in Neon).
- `npm run db:reset` — drops + recreates schema.

## Supabase account

- **Account:** `kylevcrum@gmail.com` (Kyle's main Google account). NOT `itsprobablyfinemail@gmail.com` — that account is dedicated to Keepsake. Log in at supabase.com with kylevcrum@gmail.com.

## Layout

```
app/
  admin/        — protected admin CMS routes
  api/          — route handlers
  apologetics/, doctrine/, library/, quotes/, religions/, scripture/, start-here/, videos/
  layout.tsx, page.tsx, error.tsx, not-found.tsx
  globals.css, opengraph-image.tsx, robots.ts, sitemap.ts
components/    — AnimateOnScroll, EmailSignup, Footer, JsonLd, Nav, ThemeToggle
lib/           — auth, content, data, supabase
db/schema.sql  — Neon schema source of truth
scripts/setup-db.ts
```

## Theming — light/dark

The nav has a light/dark toggle (`components/ThemeToggle.tsx`, sun/moon icon in `components/Nav.tsx`). When adding new components or sections, **respect the dark-mode palette**: navy gradient background, cream text, gold accents. Light mode uses inverted complements. Tailwind `dark:` variants are the mechanism — add both base and `dark:` classes for any color you set.

## Env vars (see `.env.example`)

Neon — `DATABASE_URL` (implied by setup script).
Supabase — `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
Admin — `ADMIN_PASSWORD`.
SendGrid — `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `SENDGRID_FROM_NAME`.
Vercel — `CRON_SECRET` (auto-set), `NEXT_PUBLIC_SITE_URL`.

## Notes

- Two databases on purpose: Neon stores admin-CMS-authored content; Supabase handles user-facing data/auth. Don't conflate them.
- Admin pages live under `app/admin/` and gate via `lib/auth.ts` (iron-session). Don't expose admin data through public route handlers.
- Markdown editor in admin uses `@uiw/react-md-editor`.
- Vercel deploys on push to `main`. Run `npm run lint` and `npm run build` locally before pushing — Next build failures break the deploy.
