import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

// Self-hosted via next/font: zero layout shift, no external Google Fonts
// network round-trip (the legacy site loaded these from fonts.googleapis.com).
export const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
