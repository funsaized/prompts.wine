import { Button } from "@/components/ui/button";

export default function Prompts(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto flex min-h-screen flex-col items-start justify-start space-y-8 py-4">
        <div className="space-y-4">
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
      </div>
    </div>
  );
}
