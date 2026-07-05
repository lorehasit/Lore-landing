"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// Sanity Studio is a client-only SPA with a heavy dependency graph that
// isn't safe to import at Server Component module scope (some of its deps
// only ship a "react-server" condition export incompatible with how the
// Studio itself uses them). Isolating the import here, behind "use client",
// keeps it out of the server module graph entirely.
export function StudioClient() {
  return <NextStudio config={config} />;
}
