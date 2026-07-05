# Setup

The site works with **zero configuration**: `npm install && npm run dev` gives
you the exact original design, copy, and animations, with an in-memory rate
limiter and no analytics/error tracking. Everything below is additive — each
integration goes live the moment its environment variables are set, and
degrades gracefully (with a console warning) when they're absent.

Copy `.env.example` to `.env.local` and fill in only the sections you want to
turn on.

## Sanity (docs content, FAQ copy, waitlist leads)

1. Create a free project at [sanity.io](https://www.sanity.io/) — `npx sanity
   init` from this repo also works and can wire the IDs for you.
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
   (defaults to `production`).
3. In Sanity's management console, create an API token with **Editor**
   (write) access → set it as `SANITY_API_TOKEN`. This is what lets the
   waitlist server action persist leads and lets `/studio` save content.
4. Visit `/studio` on your running app and create a few `faqItem` and
   `docsSection` documents — the site prefers Sanity content the instant
   `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, falling back to the seed copy in
   `lib/seed-content.ts` only when a query returns nothing.
5. Optional — for instant revalidation instead of waiting out the 60s ISR
   window: Settings → API → Webhooks in Sanity, URL
   `https://<your-domain>/api/revalidate`, and set `SANITY_REVALIDATE_SECRET`
   to the same value as the webhook's signing secret.

## Upstash Redis (waitlist rate limiting)

1. Create a free Redis database at [upstash.com](https://upstash.com/).
2. Copy the REST URL and token into `UPSTASH_REDIS_REST_URL` and
   `UPSTASH_REDIS_REST_TOKEN`.
3. Without these, the waitlist action falls back to an in-memory token
   bucket — fine for local dev, **not durable** across serverless instances,
   so don't rely on it in a real multi-instance production deployment.

## Cloudflare Turnstile (waitlist bot protection)

1. Add a site at [dash.cloudflare.com/turnstile](https://dash.cloudflare.com/?to=/:account/turnstile).
2. Site key → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (rendered as a widget in the
   form). Secret key → `TURNSTILE_SECRET_KEY` (verified server-side in
   `app/actions/waitlist.ts`).
3. Without these, Turnstile verification is skipped (with a console warning
   in production) — the honeypot field still provides basic bot deterrence.

## Sentry (error tracking)

1. Create a project at [sentry.io](https://sentry.io/).
2. Copy the DSN into `NEXT_PUBLIC_SENTRY_DSN`.
3. `app/error.tsx`, `app/global-error.tsx`, and `instrumentation.ts` report
   client/server/edge errors automatically once this is set.

## Plausible (optional analytics)

Vercel Analytics + Speed Insights are always on (cookieless, first-party, no
account needed beyond hosting on Vercel). Plausible is optional and gated
behind the cookie-consent banner:

1. Add your domain at [plausible.io](https://plausible.io/).
2. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to that domain.
3. The script only loads after a visitor accepts the cookie banner.

## Feature flags

`NEXT_PUBLIC_FLAG_INTERACTIVE_DEMO` and `NEXT_PUBLIC_FLAG_ANNOUNCEMENT`
(both default `true`) toggle the "see it work" demo section and the hero's
"New" announcement pill without a code change — set to `false`/`0` to hide.

## Local commands

```bash
npm install
npm run dev            # http://localhost:3000
npm run lint
npm run typecheck
npm run test            # Vitest unit/component tests
npm run test:e2e        # Playwright — builds, starts, and tests the app
npm run storybook       # http://localhost:6006
npm run build
```
