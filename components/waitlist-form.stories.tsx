import type { Meta, StoryObj } from "@storybook/nextjs";
import { WaitlistForm } from "./waitlist-form";

// The real story exercises the actual "use server" action end to end
// (validation, rate limiting, honeypot) via @storybook/nextjs's server
// actions support, so this doubles as a manual QA surface for the form
// outside the full page.
const meta: Meta<typeof WaitlistForm> = {
  title: "Components/WaitlistForm",
  component: WaitlistForm,
};

export default meta;
type Story = StoryObj<typeof WaitlistForm>;

export const Default: Story = {};
