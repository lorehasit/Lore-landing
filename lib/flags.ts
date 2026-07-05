/**
 * Minimal env-driven feature flags. No LaunchDarkly/Split account needed —
 * flip an env var and redeploy. Real flags for a single-tenant marketing
 * site don't need per-user targeting, so this is intentionally a flat map
 * of booleans rather than a rules engine.
 */

function boolFlag(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  return value === "1" || value.toLowerCase() === "true";
}

export const flags = {
  /** The "see it work" editor+terminal demo section. On by default, matching the legacy site. */
  interactiveDemo: boolFlag(process.env.NEXT_PUBLIC_FLAG_INTERACTIVE_DEMO, true),
  /** The "New" announcement pill above the hero headline. */
  announcementBanner: boolFlag(process.env.NEXT_PUBLIC_FLAG_ANNOUNCEMENT, true),
} as const;
