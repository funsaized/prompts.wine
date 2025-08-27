"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy, Hash, Loader2 } from "lucide-react";
import type { Components } from "react-markdown";
import styles from "./markdown-viewer.module.css";

interface MarkdownViewerProps {
  content: string;
  className?: string;
  loading?: boolean;
  error?: string | null;
}

export function MarkdownViewer({
  content,
  className,
  loading = false,
  error = null,
}: MarkdownViewerProps) {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyCode = React.useCallback((code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }, []);

  // Custom components for markdown elements
  const components: Components = React.useMemo(
    () => ({
      // Headers with anchor links
      h1: ({ children, ...props }) => {
        const id = props.id || "";
        return (
          <h1
            className="scroll-mt-20 mb-6 mt-10 text-4xl font-bold tracking-tight text-foreground first:mt-0"
            {...props}
          >
            <a href={`#${id}`} className="group no-underline">
              {children}
              <Hash className="ml-2 inline-block h-5 w-5 opacity-0 transition-opacity group-hover:opacity-50" />
            </a>
          </h1>
        );
      },
      h2: ({ children, ...props }) => {
        const id = props.id || "";
        return (
          <h2
            className="scroll-mt-20 mb-4 mt-8 text-3xl font-semibold tracking-tight text-foreground"
            {...props}
          >
            <a href={`#${id}`} className="group no-underline">
              {children}
              <Hash className="ml-2 inline-block h-4 w-4 opacity-0 transition-opacity group-hover:opacity-50" />
            </a>
          </h2>
        );
      },
      h3: ({ children, ...props }) => {
        const id = props.id || "";
        return (
          <h3
            className="scroll-mt-20 mb-3 mt-6 text-2xl font-semibold tracking-tight text-foreground"
            {...props}
          >
            <a href={`#${id}`} className="group no-underline">
              {children}
              <Hash className="ml-2 inline-block h-4 w-4 opacity-0 transition-opacity group-hover:opacity-50" />
            </a>
          </h3>
        );
      },
      h4: ({ children, ...props }) => {
        const id = props.id || "";
        return (
          <h4
            className="scroll-mt-20 mb-2 mt-4 text-xl font-semibold tracking-tight text-foreground"
            {...props}
          >
            <a href={`#${id}`} className="group no-underline">
              {children}
              <Hash className="ml-1 inline-block h-3 w-3 opacity-0 transition-opacity group-hover:opacity-50" />
            </a>
          </h4>
        );
      },
      h5: ({ children, ...props }) => (
        <h5
          className="mb-2 mt-3 text-lg font-semibold tracking-tight text-foreground"
          {...props}
        >
          {children}
        </h5>
      ),
      h6: ({ children, ...props }) => (
        <h6
          className="mb-1 mt-2 text-base font-semibold tracking-tight text-foreground"
          {...props}
        >
          {children}
        </h6>
      ),

      // Paragraph
      p: ({ children }) => (
        <p className="mb-4 leading-7 text-foreground [&:not(:first-child)]:mt-6">
          {children}
        </p>
      ),

      // Links
      a: ({ href, children, ...props }) => {
        // Check if this is an anchor link (starts with #) and if it has the anchor-link class
        // If so, just return the children to avoid nested <a> tags
        if (props.className?.includes('anchor-link')) {
          return <>{children}</>;
        }
        
        return (
          <a
            href={href}
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            {...props}
          >
            {children}
          </a>
        );
      },

      // Blockquotes
      blockquote: ({ children }) => (
        <blockquote className="mt-6 border-l-4 border-primary/30 bg-muted/50 pl-6 pr-4 py-4 italic text-muted-foreground">
          {children}
        </blockquote>
      ),

      // Lists
      ul: ({ children }) => (
        <ul className="mb-4 ml-6 list-disc space-y-2 text-foreground [&>li]:mt-2">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="mb-4 ml-6 list-decimal space-y-2 text-foreground [&>li]:mt-2">
          {children}
        </ol>
      ),
      li: ({ children }) => <li className="leading-7">{children}</li>,

      // Tables
      table: ({ children }) => (
        <div className="my-6 w-full overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            {children}
          </table>
        </div>
      ),
      thead: ({ children }) => (
        <thead className="bg-muted/50">{children}</thead>
      ),
      tbody: ({ children }) => <tbody>{children}</tbody>,
      tr: ({ children }) => (
        <tr className="border-b border-border transition-colors hover:bg-muted/50">
          {children}
        </tr>
      ),
      th: ({ children }) => (
        <th className="px-4 py-2 text-left font-semibold text-foreground [&[align=center]]:text-center [&[align=right]]:text-right">
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className="px-4 py-2 text-foreground [&[align=center]]:text-center [&[align=right]]:text-right">
          {children}
        </td>
      ),

      // Horizontal Rule
      hr: () => <hr className="my-8 border-border" />,

      // Code blocks with syntax highlighting and copy button
      code({ inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        const language = match ? match[1] : "";
        const codeString = String(children).replace(/\n$/, "");

        if (!inline && match) {
          return (
            <div className="group relative my-6">
              {language && (
                <div className="absolute left-4 top-0 z-10 -translate-y-3">
                  <span className="bg-primary px-2 py-1 text-xs font-medium text-primary-foreground rounded-md">
                    {language}
                  </span>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => handleCopyCode(codeString)}
              >
                {copiedCode === codeString ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy code</span>
              </Button>
              <SyntaxHighlighter
                style={oneDark}
                language={language}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  padding: "1.5rem 1rem 1rem 1rem",
                }}
                {...(props as any)}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          );
        }

        // Inline code
        return (
          <code
            className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-foreground"
            {...props}
          >
            {children}
          </code>
        );
      },

      // Pre tag (wrapper for code blocks)
      pre: ({ children }) => <>{children}</>,

      // Emphasis
      em: ({ children }) => (
        <em className="italic text-foreground">{children}</em>
      ),
      strong: ({ children }) => (
        <strong className="font-bold text-foreground">{children}</strong>
      ),

      // Images
      img: ({ src, alt, ...props }) => (
        <img
          src={src}
          alt={alt}
          className="my-6 rounded-lg border border-border"
          loading="lazy"
          {...props}
        />
      ),
    }),
    [copiedCode, handleCopyCode]
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading content...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium text-destructive">
            Error loading content
          </p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-none scroll-smooth",
        styles["markdown-viewer"],
        className
      )}
    >
      <article className="prose prose-gray dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
                properties: {
                  className: ["anchor-link"],
                },
              },
            ],
          ]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}