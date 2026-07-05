# Deployment

These are manual steps for whoever owns the hosting/DNS/monitoring accounts —
they can't be done from inside this repo.

## Vercel project

1. Import this repo at [vercel.com/new](https://vercel.com/new).
2. Framework preset: Next.js (auto-detected). Build command/output are the
   defaults (`next build`).
3. Add the environment variables from `.env.example` you want live, split by
   environment:
   - **Production** — real Sanity dataset, real Upstash/Turnstile/Sentry keys.
   - **Preview** — either the same values, or a separate Sanity dataset
     (e.g. `staging`) if you don't want preview deploys writing into
     production content.
   - **Development** — typically left empty; local dev uses the zero-config
     fallback described in `SETUP.md`.
4. Every push to `main` deploys to production; every PR gets its own preview
   URL automatically — nothing further to configure.

## Custom domain + DNS

1. Vercel dashboard → Project → Settings → Domains → add your domain.
2. At your DNS registrar: an `A`/`ALIAS` record for the apex domain to
   Vercel's IP (shown in the dashboard), and a `CNAME` for `www` to
   `cname.vercel-dns.com`. Vercel auto-provisions and renews the SSL
   certificate once DNS resolves.
3. Decide apex vs. `www` as canonical and let Vercel's "redirect to" domain
   setting handle the other — update `NEXT_PUBLIC_SITE_URL` to match (it
   feeds `metadataBase`, the sitemap, and JSON-LD).

## Rollback

Vercel keeps every deployment. Dashboard → Deployments → pick a prior
(green) deployment → "Promote to Production" — instant, no rebuild.

## Uptime monitoring

Not code-configurable — create a monitor at
[Better Uptime](https://betteruptime.com/) (or UptimeRobot) pointed at
`https://<your-domain>/` (and optionally `/api/revalidate` if you rely on
Sanity webhooks), alerting to wherever your team watches incidents.

## Sanity webhook (on-demand revalidation)

Once deployed, point the webhook from `SETUP.md`'s Sanity section at
`https://<your-domain>/api/revalidate` instead of localhost.

## CI

`.github/workflows/ci.yml` runs lint/typecheck/unit tests, a production
build, Playwright E2E + visual baselines, and Lighthouse CI budgets on every
push/PR. No secrets are required for CI to pass — it exercises the
zero-config fallback path the same way local dev does.
