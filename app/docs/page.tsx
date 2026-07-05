import type { Metadata } from "next";
import Link from "next/link";
import { DocsNav } from "@/components/docs-nav";
import { DocsContent } from "@/components/docs-content";
import { getDocsSections } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Documentation for Lore: the VS Code extension, the lore CLI, the Scribe git hook, the GitHub App, and self-hosting the backend.",
  alternates: { canonical: "/docs" },
};

export default async function DocsPage() {
  const sections = await getDocsSections();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lore.dev";
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Documentation", item: `${siteUrl}/docs` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- static JSON-LD, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="docs-top">
        <div className="in">
          <Link className="docs-brand" href="/">
            <span className="m">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10.4" stroke="currentColor" strokeWidth="1.7" />
                <path
                  d="M12 4.4v15.2M5.4 7.9l13.2 8.2M18.6 7.9L5.4 16.1"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
              </svg>
            </span>{" "}
            Lore
          </Link>
          <Link className="back" href="/">
            ← Back to site
          </Link>
        </div>
      </div>

      <div className="docs-layout">
        <DocsNav sections={sections} />
        <DocsContent sections={sections} />
      </div>
    </>
  );
}
