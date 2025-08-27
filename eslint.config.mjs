import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ),
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
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "*.config.*",
    ],
  },
];

export default eslintConfig;
