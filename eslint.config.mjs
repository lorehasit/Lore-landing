import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import prettierConfig from "eslint-config-prettier";

// Hand-assembled flat config rather than routing eslint-config-next through
// FlatCompat: the installed eslint-plugin-react ships circular `configs.flat`
// objects that crash @eslint/eslintrc's legacy config validator when
// FlatCompat tries to convert `next/core-web-vitals`. Pulling each plugin's
// plain `.rules` maps directly sidesteps that crash while keeping the same
// rule set Next.js's own preset would apply.
export default tseslint.config(
  {
    ignores: [
      "legacy/**",
      ".storybook/**",
      "storybook-static/**",
      "playwright-report/**",
      "test-results/**",
      ".next/**",
    ],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react/no-danger": "warn",
    },
    settings: {
      react: { version: "detect" },
    },
  },
  prettierConfig,
);
