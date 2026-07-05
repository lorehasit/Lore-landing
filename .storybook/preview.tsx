import type { Preview } from "@storybook/nextjs";
import { geistSans, geistMono, instrumentSerif } from "../lib/fonts";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <div className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
