import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of Lore.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 5, 2026">
      <h2>Design-partner beta</h2>
      <p>
        Lore is currently in a private, hand-onboarded beta. Features, pricing, and
        availability may change as we work directly with design partners.
      </p>
      <h2>Acceptable use</h2>
      <p>
        You agree not to use Lore to process data you don&apos;t have the right to share,
        or to attempt to disrupt, reverse engineer, or overload the service.
      </p>
      <h2>Your content</h2>
      <p>
        You retain ownership of the pull requests, commits, and threads you connect to
        Lore. You grant us a license to process that content solely to operate the Canon
        on your behalf.
      </p>
      <h2>No warranty</h2>
      <p>
        The service is provided &quot;as is&quot; during the beta period, without
        warranty of any kind, express or implied.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Lore is not liable for indirect,
        incidental, or consequential damages arising from use of the service.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms as the product evolves; material changes will be
        communicated to design partners directly.
      </p>
    </LegalPage>
  );
}
