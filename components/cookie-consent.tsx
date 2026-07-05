"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "lore-cookie-consent";
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

type Consent = "accepted" | "declined" | null;

/**
 * Vercel Analytics/Speed Insights are first-party and cookieless, so they
 * load unconditionally elsewhere in the layout. Plausible is the only
 * genuinely optional, cookie-adjacent script on the site, so this banner
 * gates just that one — not a blanket "block everything" pattern, since
 * there's nothing else non-essential to block today.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen post-mount (SSR has no `window`), so
    // this one-time "hydrate from storage" effect intentionally calls
    // setState on mount rather than deriving it — the standard, safe
    // pattern for client-only initial state that avoids a hydration
    // mismatch (server always renders "no banner yet" until this runs).
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "accepted" || stored === "declined") setConsent(stored);
    setHydrated(true);
  }, []);

  const choose = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  };

  const showBanner = hydrated && consent === null && Boolean(plausibleDomain);
  const loadPlausible = hydrated && consent === "accepted" && Boolean(plausibleDomain);

  return (
    <>
      {loadPlausible && (
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={plausibleDomain}
          strategy="afterInteractive"
        />
      )}
      {showBanner && (
        <div className="consent-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
          <p>
            We use privacy-friendly analytics to understand traffic. No advertising
            cookies. See our{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
          <div className="consent-actions">
            <button type="button" className="btn btn-orange btn-sm" onClick={() => choose("accepted")}>
              Accept
            </button>
            <button type="button" className="btn btn-plain btn-sm" onClick={() => choose("declined")}>
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
