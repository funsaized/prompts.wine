import { Button } from "@/components/ui/button";

export default function Home(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center space-y-8 p-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Prompts Wine
          </h1>
          <p className="text-muted-foreground max-w-2xl text-xl">
            A Next.js 15+ project built with TypeScript, Tailwind CSS v4, and
            shadcn/ui components. Features dark theme by default, static export
            configuration, and strict ESLint rules.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button variant="default" size="lg" asChild>
            <a href="/components">View Components</a>
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <h3 className="mb-2 text-lg font-semibold">Next.js 15+</h3>
            <p className="text-muted-foreground text-sm">
              Built with the latest Next.js features including App Router and
              Turbopack support.
            </p>
          </div>

          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <h3 className="mb-2 text-lg font-semibold">Tailwind CSS v4</h3>
            <p className="text-muted-foreground text-sm">
              Styled with the latest Tailwind CSS v4 for modern utility-first
              styling.
            </p>
          </div>

          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <h3 className="mb-2 text-lg font-semibold">shadcn/ui</h3>
            <p className="text-muted-foreground text-sm">
              Includes shadcn/ui components with dark theme configured as
              default.
            </p>
          </div>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          <p>
            Ready for development • Static export configured • ESLint & Prettier
            set up
          </p>
        </div>
      </div>
    </div>
  );
}
