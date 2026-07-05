import type { NormalizedDocsSection } from "@/sanity/lib/queries";
import { docsNavGroups } from "@/lib/seed-content";

export function DocsNav({ sections }: { sections: NormalizedDocsSection[] }) {
  return (
    <aside className="docs-side">
      {docsNavGroups.map((group) => {
        const groupSections = sections.filter((s) => s.navGroup === group);
        if (groupSections.length === 0) return null;
        return (
          <div key={group}>
            <h5>{group}</h5>
            {groupSections.map((section) => (
              <a key={section._id} href={`#${section.slug}`}>
                {section.navTitle ?? section.title}
              </a>
            ))}
          </div>
        );
      })}
    </aside>
  );
}
