import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      stega: false,
    })
  : null;

/** Server-side write client for the waitlist server action (needs a token with write access). */
export function getWriteClient(): SanityClient | null {
  if (!isSanityConfigured || !process.env.SANITY_API_TOKEN) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });
}
