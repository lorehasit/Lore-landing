# Lore

Landing page for Lore. Institutional memory for engineering teams. Captures
the why behind every technical decision.

Next.js 16 (App Router) rebuild of the original static site — see
[SETUP.md](SETUP.md) for environment variables/integrations and
[DEPLOYMENT.md](DEPLOYMENT.md) for hosting/DNS/rollback. The original static
HTML/CSS/JS lives under [legacy/](legacy/) for reference.

## Quick start

```bash
npm install
npm run dev
```

Works with zero configuration — see [SETUP.md](SETUP.md) for what each
optional integration (Sanity, Upstash, Turnstile, Sentry, Plausible) adds and
how to turn it on.

## Stack

Next.js · TypeScript · Sanity · Zod · Upstash · GSAP/Lenis · Vitest ·
Playwright · Storybook
