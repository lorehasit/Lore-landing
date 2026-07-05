import { defineField, defineType } from "sanity";

/**
 * Write-only destination for waitlist form submissions (see
 * app/actions/waitlist.ts). Browsable in Studio; nothing in the app reads
 * this back, so no read-time query needed.
 */
export const waitlistLead = defineType({
  name: "waitlistLead",
  title: "Waitlist lead",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "createdAt",
      title: "Submitted at",
      type: "datetime",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where on the site the lead came from.",
      initialValue: "landing-final-cta",
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "createdAt" },
  },
});
