import type { NormalizedDocsSection } from "@/sanity/lib/queries";
import { RichBody } from "@/components/rich-body";

export function DocsContent({ sections }: { sections: NormalizedDocsSection[] }) {
  return (
    <main className="doc">
      <h1>Documentation</h1>
      <p className="sub">Everything to install, run, and self-host Lore.</p>

      {sections.map((section) => (
        <section id={section.slug} key={section._id}>
          {/* eslint-disable-next-line react/no-danger -- trusted, repo/CMS-authored title, not user input */}
          <h2 dangerouslySetInnerHTML={{ __html: section.title }} />
          <RichBody html={section.html} portableText={section.portableText} />
        </section>
      ))}
    </main>
  );
}
