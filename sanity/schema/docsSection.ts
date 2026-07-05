import { defineField, defineType } from "sanity";

export const docsSection = defineType({
  name: "docsSection",
  title: "Docs section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "navTitle",
      title: "Sidebar link text",
      type: "string",
      description: "Plain-text override for the sidebar link, if Title contains markup.",
    }),
    defineField({
      name: "navGroup",
      title: "Sidebar group",
      type: "string",
      options: { list: ["Start", "Surfaces", "Backend"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "navGroup" },
  },
});
