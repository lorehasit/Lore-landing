import type { Meta, StoryObj } from "@storybook/nextjs";
import { FaqAccordionItem } from "./faq-accordion-item";

const meta: Meta<typeof FaqAccordionItem> = {
  title: "Components/FaqAccordionItem",
  component: FaqAccordionItem,
  args: {
    question: "Why decision memory instead of a wiki?",
    html: "<p>Wikis demand discipline no team sustains — and the “why” is almost never written down in the first place.</p>",
    portableText: null,
  },
};

export default meta;
type Story = StoryObj<typeof FaqAccordionItem>;

export const Closed: Story = {};
export const OpenByDefault: Story = { args: { defaultOpen: true } };
