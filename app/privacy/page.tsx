import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Lore collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 5, 2026">
      <h2>What we collect</h2>
      <p>
        When you request access on this site, we collect the email address you provide.
        If you connect the Lore GitHub App or Scribe git hook to a repository, we
        process the pull request titles, descriptions, review discussion, and commit
        messages you explicitly choose to send us, in order to build your team&apos;s
        decision memory (the &quot;Canon&quot;).
      </p>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to access requests and product communication you opt into.</li>
        <li>To operate the Canon for your team: capturing, indexing, and recalling decisions.</li>
        <li>To monitor and improve reliability and security of the service.</li>
      </ul>
      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t sell your data.</li>
        <li>We don&apos;t use your team&apos;s content to train shared or third-party models.</li>
        <li>We don&apos;t share one team&apos;s Canon with another team.</li>
      </ul>
      <h2>Data storage and security</h2>
      <p>
        Each team&apos;s Canon is stored in an isolated data store. Data is encrypted in
        transit (TLS) and at rest. Access is limited to the infrastructure that serves
        your team&apos;s requests.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        We use privacy-friendly, cookieless product analytics (Vercel Analytics) by
        default. If configured, optional Plausible analytics only loads after you accept
        the cookie banner. See our cookie banner for details and to change your choice.
      </p>
      <h2>Your rights</h2>
      <p>
        You can request a copy of, or deletion of, the data we hold about you or your
        team by contacting us at the address on our{" "}
        <a href="/security">Security</a> page.
      </p>
    </LegalPage>
  );
}
