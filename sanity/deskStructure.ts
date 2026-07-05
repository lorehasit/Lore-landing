import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("FAQ items")
        .child(
          S.documentTypeList("faqItem").title("FAQ items").defaultOrdering([
            { field: "order", direction: "asc" },
          ]),
        ),
      S.listItem()
        .title("Docs sections")
        .child(
          S.documentTypeList("docsSection")
            .title("Docs sections")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("Waitlist leads")
        .child(
          S.documentTypeList("waitlistLead")
            .title("Waitlist leads")
            .defaultOrdering([{ field: "createdAt", direction: "desc" }]),
        ),
    ]);
