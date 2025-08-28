import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  // Ignore patterns first
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "*.config.*",
      // Build scripts and content generation
      "scripts/**",
      "src/lib/server-content.js",
      // Test files
      "test-content.js",
    ],
  },

  // Apply Next.js recommended configs to all relevant files
  ...compat.extends("next/core-web-vitals").map(config => ({
    ...config,
    files: ["**/*.{js,jsx,ts,tsx}"],
  })),

  // TypeScript specific configs
  ...compat.extends("next/typescript").map(config => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
  })),

  // Prettier config (should come last to override conflicting rules)
  ...compat.extends("prettier").map(config => ({
    ...config,
    files: ["**/*.{js,jsx,ts,tsx}"],
  })),

  // Custom rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // General rules
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",

      // React specific
      "react/jsx-key": "error",
      "react/self-closing-comp": "error",

      // TypeScript rules - make them warnings for now
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",

      // Next.js specific rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "error",
    },
  },
];

export default eslintConfig;
