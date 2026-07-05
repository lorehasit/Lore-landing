import type { PortableTextBlock } from "next-sanity";
import { RichBody } from "@/components/rich-body";

export function FaqAccordionItem({
  question,
  html,
  portableText,
  defaultOpen = false,
}: {
  question: string;
  html: string | null;
  portableText: PortableTextBlock[] | null;
  defaultOpen?: boolean;
}) {
  return (
    <details className="qa" data-card="" open={defaultOpen}>
      <summary>
        {question}
        <span className="qa-x" />
      </summary>
      <div className="qa-a">
        <RichBody html={html} portableText={portableText} />
      </div>
    </details>
  );
}
