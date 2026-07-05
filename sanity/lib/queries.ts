import type { PortableTextBlock } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "./env";
import { docsSections as seedDocsSections, faqItems as seedFaqItems } from "@/lib/seed-content";

export type NormalizedFaqItem = {
  _id: string;
  question: string;
  html: string | null;
  portableText: PortableTextBlock[] | null;
};

export type NormalizedDocsSection = {
  _id: string;
  slug: string;
  navGroup: "Start" | "Surfaces" | "Backend";
  title: string;
  navTitle?: string;
  order: number;
  html: string | null;
  portableText: PortableTextBlock[] | null;
};

const FAQ_QUERY = /* groq */ `*[_type == "faqItem"] | order(order asc) {
  _id, question, answer
}`;

const DOCS_QUERY = /* groq */ `*[_type == "docsSection"] | order(order asc) {
  _id, title, navTitle, "slug": slug.current, navGroup, order, body
}`;

export async function getFaqItems(): Promise<NormalizedFaqItem[]> {
  if (isSanityConfigured && client) {
    try {
      const items = await client.fetch<
        { _id: string; question: string; answer: PortableTextBlock[] }[]
      >(FAQ_QUERY, {}, { next: { revalidate: 60, tags: ["faq"] } });
      if (items.length > 0) {
        return items.map((item) => ({
          _id: item._id,
          question: item.question,
          html: null,
          portableText: item.answer,
        }));
      }
    } catch (error) {
      console.error("[sanity] failed to fetch FAQ items, falling back to seed content", error);
    }
  }
  return seedFaqItems.map((item) => ({
    _id: item._id,
    question: item.question,
    html: item.answerHtml,
    portableText: null,
  }));
}

export async function getDocsSections(): Promise<NormalizedDocsSection[]> {
  if (isSanityConfigured && client) {
    try {
      const sections = await client.fetch<
        {
          _id: string;
          title: string;
          navTitle?: string;
          slug: string;
          navGroup: "Start" | "Surfaces" | "Backend";
          order: number;
          body: PortableTextBlock[];
        }[]
      >(DOCS_QUERY, {}, { next: { revalidate: 60, tags: ["docs"] } });
      if (sections.length > 0) {
        return sections.map((section) => ({
          _id: section._id,
          slug: section.slug,
          navGroup: section.navGroup,
          title: section.title,
          navTitle: section.navTitle,
          order: section.order,
          html: null,
          portableText: section.body,
        }));
      }
    } catch (error) {
      console.error(
        "[sanity] failed to fetch docs sections, falling back to seed content",
        error,
      );
    }
  }
  return seedDocsSections.map((section) => ({
    _id: section._id,
    slug: section.slug,
    navGroup: section.navGroup,
    title: section.title,
    navTitle: section.navTitle,
    order: section.order,
    html: section.html,
    portableText: null,
  }));
}
