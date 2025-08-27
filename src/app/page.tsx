import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Prompts(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto flex min-h-screen flex-col items-start justify-start space-y-8 p-4">
        <div className="space-y-4">
          <header className="flex flex-shrink-0 flex-col font-light uppercase">
            <h1 className="text-3xl tracking-tight sm:text-4xl">
              /prompts.wine
            </h1>
            <div className="mt-1 flex items-center gap-2 pl-2">
              <span>└─</span>
              <h2>
                a directory of subagents for Claude Code that have aged like
                fine wine 🍷
              </h2>
            </div>
            <div className="flex items-center gap-2 pl-2">
              <span>└─</span>
              <h2>
                Made by{" "}
                <a
                  href="https://s11a.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative top-1 inline-flex items-center gap-1.5 pl-1 transition-colors hover:text-white"
                >
                  <Image
                    alt="Sai Nimmagadda"
                    width={20}
                    height={20}
                    className="border-foreground size-5 rounded-full border transition-colors group-hover:border-white"
                    src="/face.png"
                  />
                  @funsaized
                </a>
              </h2>
            </div>
          </header>

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
