export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

/**
 * Whether a real Sanity project is wired up. When false, content-fetching
 * code paths fall back to lib/seed-content.ts so the site works out of the
 * box with zero external accounts.
 */
export const isSanityConfigured = Boolean(projectId);
