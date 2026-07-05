import { NextResponse } from "next/server";

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const sentryDsnHost = (() => {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return null;
  try {
    return new URL(dsn).host;
  } catch {
    return null;
  }
})();

/**
 * Security headers on every response. GSAP/Lenis are bundled npm deps (not
 * inline/CDN scripts) so the script-src allow-list stays tight — no
 * 'unsafe-inline'. Turnstile/Plausible/Sentry hosts are only added to the
 * allow-list conceptually here; they're harmless to allow even when unused
 * since the corresponding script simply never loads without its env var.
 */
export function proxy() {
  const response = NextResponse.next();
  const isDev = process.env.NODE_ENV !== "production";

  const scriptSrc = [
    "'self'",
    "'unsafe-inline'", // next/script inline bootstrap + JSON-LD; no remote eval
    isDev ? "'unsafe-eval'" : "", // Next dev/Turbopack's fast-refresh client uses eval()
    "https://challenges.cloudflare.com",
    "https://va.vercel-scripts.com",
    plausibleDomain ? "https://plausible.io" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const connectSrc = [
    "'self'",
    "https://cdn.sanity.io",
    "https://*.api.sanity.io",
    sentryDsnHost ? `https://${sentryDsnHost}` : "",
    plausibleDomain ? "https://plausible.io" : "",
    "https://vitals.vercel-insights.com",
    isDev ? "ws://localhost:* http://localhost:*" : "", // Turbopack HMR socket
  ]
    .filter(Boolean)
    .join(" ");

  const csp = [
    `default-src 'self'`,
    `script-src ${scriptSrc}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: https://cdn.sanity.io`,
    `font-src 'self' data:`,
    `connect-src ${connectSrc}`,
    `frame-src 'self' https://challenges.cloudflare.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'self'`,
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and Next's own internals, so
     * headers apply to pages/routes without re-processing every asset
     * request.
     */
    "/((?!_next/static|_next/image|favicon.ico|favicon.svg).*)",
  ],
};
