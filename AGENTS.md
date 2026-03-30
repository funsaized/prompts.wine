# AGENTS.md

## Project Overview

**prompts.wine** — A Next.js 15 static site that browses and displays curated AI prompts, agents, and instructions. Content is fetched from GitHub at build time, processed into a static JSON file, and rendered client-side with a file-tree explorer UI.

Tech stack: Next.js 15 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS v4, shadcn/ui, GSAP.

## Build & Run Commands

```bash
npm run dev              # Dev server with Turbopack (http://localhost:3000)
npm run build            # Production build (runs fetch-content first via prebuild)
npm run start            # Serve production build
npm run lint             # ESLint check
npm run lint:fix         # ESLint autofix
npm run format           # Prettier format all files
npm run format:check     # Prettier check (no write)
npm run type-check       # TypeScript type check (tsc --noEmit)
npm run fetch-content    # Download content from GitHub → /content, generate public/content-data.json
```

**No test framework is configured.** There are no test scripts, test files, or testing dependencies. If adding tests, use a framework compatible with Next.js (e.g., Vitest or Jest with @testing-library/react).

**Static export**: The site builds to `out/` with `output: "export"` in next.config.ts. No server-side rendering at runtime — all pages are statically generated.

## Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── layout.tsx           # Root layout (Geist Mono font, metadata)
│   ├── page.tsx             # Main page — file tree explorer + content viewer
│   ├── globals.css          # Tailwind v4 @theme tokens (dark theme, green accents)
│   └── components/page.tsx  # Component showcase page (/components)
├── components/
│   └── ui/                  # shadcn/ui and custom components
│       ├── button.tsx       # shadcn/ui Button with CVA variants
│       ├── card.tsx         # shadcn/ui Card compound component
│       ├── tabs.tsx         # shadcn/ui Tabs (Radix)
│       ├── scroll-area.tsx  # shadcn/ui ScrollArea (Radix)
│       ├── collapsible.tsx  # shadcn/ui Collapsible (Radix)
│       ├── tooltip.tsx      # shadcn/ui Tooltip (Radix)
│       ├── file-tree.tsx    # Custom file tree with color-coded content types
│       ├── content-viewer.tsx  # Markdown renderer (react-markdown + syntax highlighting)
│       ├── frontmatter-display.tsx  # Expandable frontmatter description
│       └── TextType.tsx     # GSAP typing animation component
├── lib/
│   ├── utils.ts             # cn() helper (clsx + tailwind-merge)
│   ├── content-types.ts     # TypeScript interfaces for content system
│   ├── colors.ts            # Content type color system (agents=blue, prompts=yellow, etc.)
│   └── server-content.js    # Node.js-only content processing (CommonJS)
└── hooks/                   # Custom hooks (currently empty)

scripts/
└── fetch-content.js         # Downloads content repo tarball, extracts, generates static data

content/                     # Git-ignored; populated by fetch-content at build time
public/                      # Static assets; content-data.json generated at build time
```

## Code Style

### Formatting (Prettier)

- **Double quotes** for strings (`"use client"`, not `'use client'`)
- **Semicolons** required
- **2-space indentation**, no tabs
- **Trailing commas**: `es5` (arrays, objects — not function params)
- **Print width**: 80 characters
- **Arrow parens**: `avoid` — `x => x`, not `(x) => x`
- **Bracket spacing**: `{ foo }` not `{foo}`
- **JSX quotes**: double (`className="foo"`)
- **End of line**: LF
- **Tailwind plugin**: `prettier-plugin-tailwindcss` auto-sorts class names

### Linting (ESLint)

Flat config (`eslint.config.mjs`) extends `next/core-web-vitals`, `next/typescript`, and `prettier`.

Key rules:

- `no-console: warn` — avoid console.log in components (acceptable in build scripts)
- `prefer-const: error` — always use `const` when variable isn't reassigned
- `no-var: error` — never use `var`
- `react/jsx-key: error` — always provide keys in lists
- `react/self-closing-comp: error` — `<Foo />` not `<Foo></Foo>`
- `@typescript-eslint/no-explicit-any: warn` — avoid `any`, use proper types
- `@typescript-eslint/no-unused-vars: warn` — remove unused variables
- `@next/next/no-img-element: error` — use `next/image` instead of `<img>`

### TypeScript

- **Strict mode** enabled (`"strict": true`)
- Path alias: `@/*` maps to `./src/*` — always use `@/` imports for src files
- Explicit return types on exported functions (e.g., `: React.JSX.Element`, `: string`)
- Use `interface` for object shapes, `type` for unions/intersections
- Index signatures with `unknown` not `any` (e.g., `[key: string]: unknown`)

### Imports

Order (separated by blank lines):

1. React (`import * as React from "react"`)
2. External packages (`lucide-react`, `react-markdown`, Radix primitives)
3. Internal absolute (`@/components/ui/...`, `@/lib/...`)
4. Relative (`./collapsible`, `./tooltip`)

- Import React as namespace: `import * as React from "react"` (preferred pattern in this codebase)
- Destructured imports for specific hooks/types are also used: `import { useState, useRef } from "react"`
- Use `import type` for type-only imports: `import type { Metadata } from "next"`

### Component Patterns

- **Function declarations** for components (not arrow functions): `function Button({ ... }) { ... }`
  - Exception: `TextType.tsx` uses `const TextType = ({ ... }) => { ... }` with default export
- **`"use client"`** directive at top of file for any component using hooks, event handlers, or browser APIs
- Server components are the default (no directive needed)
- **Named exports** preferred: `export { Button, buttonVariants }`
  - Exception: page components use `export default function PageName()`
- **Props**: Inline type or interface defined above the component
- **shadcn/ui pattern**: Components accept `className` prop, merge with `cn()` utility
- **Radix UI**: Components wrap Radix primitives, re-export with custom styling
- **data-slot attributes**: Used on shadcn/ui components for CSS targeting (`data-slot="button"`)

### Naming Conventions

- **Files**: kebab-case (`file-tree.tsx`, `content-types.ts`, `scroll-area.tsx`)
  - Exception: `TextType.tsx` uses PascalCase (inconsistency in codebase)
- **Components**: PascalCase (`FileTree`, `ContentViewer`, `FrontmatterDisplay`)
- **Functions/variables**: camelCase (`handleFileSelect`, `contentData`, `getNodeBackground`)
- **Types/Interfaces**: PascalCase (`FileTreeItem`, `ContentFrontmatter`, `ContentType`)
- **Constants**: UPPER_SNAKE_CASE for module-level config (`CONTENT_COLORS`, `CONTENT_DIR`)
- **CSS variables**: kebab-case with `--color-` prefix (`--color-primary`, `--color-background`)
- **Event handlers**: `handle` + action (`handleToggle`, `handleFileSelect`, `handleCopy`)

### Styling

- **Tailwind CSS v4** with `@theme` block in `globals.css` for design tokens
- Dark theme is the only theme (no light/dark toggle) — colors defined as CSS custom properties
- Green accent (`#22c55e`) as primary color
- Use semantic color tokens: `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border`
- Combine classes with `cn()` from `@/lib/utils` for conditional/merged class names
- Responsive: mobile-first with `sm:`, `md:`, `lg:`, `xl:` breakpoints
- Monospace font throughout (Geist Mono)

### Error Handling

- Try/catch with `instanceof Error` check: `err instanceof Error ? err.message : "fallback"`
- Build scripts use `console.error` + `process.exit(1)` for fatal errors
- Content parsing has multi-level fallback: YAML parse → manual extraction → treat as plain content
- Client-side: error state + loading state pattern with `useState`

### Server-Side Scripts

- `scripts/` and `src/lib/server-content.js` use **CommonJS** (`require`, `module.exports`)
- These run in Node.js only (build time), not in browser
- Content pipeline: fetch tarball → extract → parse markdown + frontmatter → generate JSON → write to `public/`

## Key Dependencies

| Package                                        | Purpose                                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------------------- |
| `next` (15.5)                                  | Framework (App Router, static export, Turbopack)                              |
| `react` / `react-dom` (19.1)                   | UI library                                                                    |
| `@radix-ui/*`                                  | Unstyled accessible primitives (Collapsible, ScrollArea, Tabs, Tooltip, Slot) |
| `class-variance-authority`                     | Component variant system (CVA) for shadcn/ui                                  |
| `clsx` + `tailwind-merge`                      | Class name utilities (wrapped in `cn()`)                                      |
| `gsap`                                         | Animation library (typing effect in TextType)                                 |
| `lucide-react`                                 | Icons                                                                         |
| `react-markdown` + `remark-gfm` + `rehype-raw` | Markdown rendering                                                            |
| `react-syntax-highlighter`                     | Code block syntax highlighting                                                |
| `gray-matter`                                  | Frontmatter parsing (build-time only)                                         |
