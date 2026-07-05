import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button, LinkButton } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  args: {
    children: "Request access",
  },
  argTypes: {
    variant: { control: "select", options: ["orange", "ink", "plain"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Orange: Story = { args: { variant: "orange" } };
export const Ink: Story = { args: { variant: "ink" } };
export const Plain: Story = { args: { variant: "plain" } };
export const Large: Story = { args: { variant: "orange", size: "lg" } };
export const Small: Story = { args: { variant: "ink", size: "sm" } };
export const Disabled: Story = { args: { variant: "orange", disabled: true } };

export const AsLink: StoryObj<typeof LinkButton> = {
  render: (args) => <LinkButton {...args} />,
  args: { href: "/docs", variant: "orange", children: "Read the docs" },
};
