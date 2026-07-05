import { PortableText, type PortableTextBlock } from "next-sanity";

/**
 * Renders either the seed-content HTML string (trusted, authored in this
 * repo — not user input) or a Sanity portable-text body, whichever the
 * caller has. Keeps FAQ/docs components agnostic of which content source
 * is active.
 */
export function RichBody({
  html,
  portableText,
}: {
  html: string | null;
  portableText: PortableTextBlock[] | null;
}) {
  if (portableText) {
    return <PortableText value={portableText} />;
  }
  if (html) {
    // eslint-disable-next-line react/no-danger -- trusted, repo-authored seed content, not user input
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return null;
}
