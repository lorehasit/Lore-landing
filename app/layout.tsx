import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { geistSans, geistMono, instrumentSerif } from "@/lib/fonts";
import { SkipLink } from "@/components/skip-link";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lore.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lore — Your engineering decisions, remembered",
    template: "%s — Lore",
  },
  description:
    "Lore captures the why behind every technical decision — from closed PRs to dead Slack threads — and gives it back the instant anyone asks. Ask /lore in your editor, terminal, or on the PR — with sources.",
  openGraph: {
    title: "Lore — Your engineering decisions, remembered",
    description:
      "Lore captures the why behind every technical decision and gives it back the instant anyone asks — with sources.",
    url: siteUrl,
    siteName: "Lore",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lore — Your engineering decisions, remembered",
    description:
      "Lore captures the why behind every technical decision and gives it back the instant anyone asks — with sources.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body>
        <SkipLink />
        {children}
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
