import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Security",
  description: "How Lore secures your team's data.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <LegalPage title="Security" updated="July 5, 2026">
      <h2>Isolation</h2>
      <p>
        Each team gets its own isolated memory store (the Canon). Answers are grounded
        only in your own team&apos;s connected sources.
      </p>
      <h2>Encryption</h2>
      <p>
        Data is encrypted in transit via TLS and encrypted at rest. Webhook payloads
        from the GitHub App are verified via HMAC signature before being processed.
      </p>
      <h2>Access control</h2>
      <p>
        You control which repositories are connected to the GitHub App, and can
        disconnect them at any time. Only merged pull requests are ever captured — a
        merge is treated as a finalized decision.
      </p>
      <h2>Reporting a vulnerability</h2>
      <p>
        If you believe you&apos;ve found a security issue, please email{" "}
        <a href="mailto:security@lore.dev">security@lore.dev</a> with details. We
        aim to acknowledge reports within two business days.
      </p>
    </LegalPage>
  );
}
