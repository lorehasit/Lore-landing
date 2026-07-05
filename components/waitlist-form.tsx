"use client";

import { useActionState } from "react";
import Script from "next/script";
import { submitWaitlist } from "@/app/actions/waitlist";
import { initialWaitlistState } from "@/lib/validation";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function WaitlistForm() {
  const [state, formAction, isPending] = useActionState(submitWaitlist, initialWaitlistState);

  const noteClass =
    state.status === "success" ? "final-note ok" : state.status === "error" ? "final-note err" : "final-note";

  return (
    <>
      <form className="final-form" action={formAction} data-fade="">
        <input type="email" name="email" required placeholder="you@yourteam.com" aria-label="Work email" />
        {/* Honeypot: hidden from sighted and screen-reader users; bots that
            fill every field they find will trip lib/validation.ts's rule
            that this field must stay empty. */}
        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        {turnstileSiteKey && (
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="dark" />
        )}
        <button className="btn btn-orange btn-lg" type="submit" disabled={isPending}>
          {isPending ? "Sending…" : "Request access"}
        </button>
      </form>
      <p className={noteClass} role="status" aria-live="polite">
        {state.message || "No spam — just early access, when your team is up."}
      </p>
      {turnstileSiteKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      )}
    </>
  );
}
