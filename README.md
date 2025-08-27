# Prompts Wine 🍷

**Live Demo: [prompts.wine](https://prompts.wine)**

A modern Next.js 15+ project showcasing a beautiful component library with shadcn/ui components, built with TypeScript, Tailwind CSS v4, and featuring a sleek dark theme by default.

## ✨ Features

- 🚀 **Next.js 15+** with App Router and Turbopack support
- 🎨 **Tailwind CSS v4** for modern utility-first styling
- 🌟 **shadcn/ui** components with custom theming
- 🌙 **Dark theme** configured as default
- 📱 **Responsive design** with mobile-first approach
- 🔧 **TypeScript** for type safety
- 📦 **Static export** configuration ready
- ✨ **ESLint & Prettier** with strict rules
- 🎭 **Component showcase** with interactive examples

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd prompts-wine
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
prompts-wine/
├── src/
│   ├── app/
│   │   ├── components/      # Components showcase page
│   │   ├── globals.css      # Global styles & CSS variables
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/
│   │   └── ui/             # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── tabs.tsx
│   │       ├── scroll-area.tsx
│   │       ├── collapsible.tsx
│   │       └── file-tree.tsx
│   ├── lib/
│   │   └── utils.ts        # Utility functions
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
├── components.json         # shadcn/ui configuration
└── content/               # Content files
```

## 🎨 Components

This project includes a comprehensive set of shadcn/ui components:

- **Button** - Multiple variants (default, secondary, outline, ghost) with sizes
- **Tabs** - Nested navigation with smooth transitions  
- **ScrollArea** - Custom scrollable content areas
- **Collapsible** - Expandable/collapsible content sections
- **FileTree** - Interactive file/folder tree component

Visit `/components` to see all components in action with live examples.

## 🛠️ Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with static export
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## ⚙️ Configuration

### Static Export

This project is configured for static export with:
- `output: "export"` in `next.config.ts`
- `trailingSlash: true` for proper routing
- `unoptimized: true` for images

### Tailwind CSS v4

Using the latest Tailwind CSS v4 with:
- CSS variables for theming
- Custom color palette
- Dark theme as default
- Responsive design system

### shadcn/ui

Components are configured with:
- TypeScript support
- CSS variables for theming
- Custom aliases for imports
- Slate base color scheme

## 🎨 Theming

The project uses a comprehensive theming system with CSS variables:
- Dark theme by default
- Green accent colors
- Comprehensive semantic color tokens
- Full contrast ratio compliance

## 📱 Responsive Design

Built with mobile-first responsive design:
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Responsive typography
- Touch-friendly interactive elements

## 🚀 Deployment

### Static Export

The project is configured for static export and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any static hosting service

Build command:
```bash
npm run build
```

The built files will be in the `out/` directory.

### Vercel (Recommended)

Deploy easily with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/prompts-wine)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [shadcn/ui](https://ui.shadcn.com) - Beautiful UI components  
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Lucide React](https://lucide.dev) - Beautiful icons
- [Radix UI](https://radix-ui.com) - Unstyled, accessible UI primitives
