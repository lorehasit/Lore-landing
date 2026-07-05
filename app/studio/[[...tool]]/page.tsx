import { isSanityConfigured } from "@/sanity/lib/env";
import { StudioClient } from "@/components/studio-client";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ padding: 48, fontFamily: "sans-serif", maxWidth: 640 }}>
        <h1>Sanity Studio isn&apos;t configured</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code>) in your environment to enable the
          embedded Studio. See <code>SETUP.md</code> for how to create a Sanity project.
        </p>
      </main>
    );
  }
  return <StudioClient />;
}
