import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Lore's commitment to accessibility.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement" updated="July 5, 2026">
      <h2>Our commitment</h2>
      <p>
        We aim to meet WCAG 2.1 AA guidelines across this site: semantic HTML, keyboard
        navigability, visible focus states, sufficient color contrast, and respect for
        reduced-motion preferences.
      </p>
      <h2>What we&apos;ve done</h2>
      <ul>
        <li>A skip-to-content link for keyboard users.</li>
        <li>Form fields with associated labels and live-region status messages.</li>
        <li>All decorative animation is disabled under <code>prefers-reduced-motion</code>.</li>
        <li>Native, keyboard-operable disclosure widgets for the FAQ.</li>
      </ul>
      <h2>Known limitations</h2>
      <p>
        This is an evolving product; if you encounter a barrier using this site or any
        Lore surface, please tell us so we can fix it.
      </p>
      <h2>Contact</h2>
      <p>
        Email <a href="mailto:accessibility@lore.dev">accessibility@lore.dev</a> with
        any accessibility feedback.
      </p>
    </LegalPage>
  );
}
