"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface ContentViewerProps {
  content: string;
  frontmatter?: Record<string, any>;
  className?: string;
}

export function ContentViewer({
  content,
  frontmatter,
  className,
}: ContentViewerProps) {
  const [copied, setCopied] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  // Detect theme mode (simple approach for now)
  React.useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleCopy = React.useCallback(() => {
    // Reconstruct the full markdown with frontmatter if it exists
    let fullContent = content;
    if (frontmatter && Object.keys(frontmatter).length > 0) {
      // Convert frontmatter object back to YAML format
      const frontmatterLines = ["---"];
      for (const [key, value] of Object.entries(frontmatter)) {
        if (typeof value === "string") {
          // Handle multiline strings
          if (value.includes("\n") || value.includes("|")) {
            frontmatterLines.push(`${key}: |`);
            const lines = value.split("\n");
            lines.forEach(line => {
              frontmatterLines.push(`  ${line}`);
            });
          } else {
            frontmatterLines.push(`${key}: ${value}`);
          }
        } else if (Array.isArray(value)) {
          frontmatterLines.push(`${key}: ${value.join(", ")}`);
        } else if (value !== null && value !== undefined) {
          frontmatterLines.push(`${key}: ${JSON.stringify(value)}`);
        }
      }
      frontmatterLines.push("---");
      frontmatterLines.push("");
      fullContent = frontmatterLines.join("\n") + content;
    }

    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [content, frontmatter]);

  // Custom components for ReactMarkdown
  const markdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      return !inline && language ? (
        <SyntaxHighlighter
          style={isDarkMode ? oneDark : oneLight}
          language={language}
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: "6px",
            fontSize: "0.875rem",
          }}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code
          className={cn(
            "bg-muted rounded-md px-1.5 py-0.5 font-mono text-sm",
            className
          )}
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({ children }: any) => (
      <h1 className="text-foreground mt-6 mb-4 text-2xl font-bold first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-foreground mt-5 mb-3 text-xl font-semibold first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-foreground mt-4 mb-2 text-lg font-semibold first:mt-0">
        {children}
      </h3>
    ),
    p: ({ children }: any) => (
      <p className="text-muted-foreground mb-3 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: any) => (
      <ul className="text-muted-foreground mb-3 list-inside list-disc space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="text-muted-foreground mb-3 list-inside list-decimal space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="text-muted-foreground ml-2">{children}</li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-border bg-muted/30 mb-3 rounded-r-md border-l-4 py-2 pl-4">
        {children}
      </blockquote>
    ),
    strong: ({ children }: any) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="text-foreground italic">{children}</em>
    ),
    table: ({ children }: any) => (
      <div className="mb-4 overflow-x-auto">
        <table className="border-border min-w-full border-collapse rounded-md border">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-muted/50">{children}</thead>
    ),
    tbody: ({ children }: any) => <tbody>{children}</tbody>,
    tr: ({ children }: any) => (
      <tr className="border-border border-b">{children}</tr>
    ),
    th: ({ children }: any) => (
      <th className="border-border text-foreground border px-3 py-2 text-left text-sm font-semibold">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="border-border text-muted-foreground border px-3 py-2 text-sm">
        {children}
      </td>
    ),
    hr: () => <hr className="border-border my-6" />,
  };

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Content Block */}
      <div className="group border-border bg-muted/30 relative rounded-lg border">
        {/* Copy Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy content</span>
        </Button>

        {/* Markdown Content */}
        <div className="overflow-x-auto p-4 pr-12 text-sm leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
