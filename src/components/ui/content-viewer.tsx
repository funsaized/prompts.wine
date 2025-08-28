"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface ContentViewerProps {
  content: string;
  className?: string;
}

export function ContentViewer({ content, className }: ContentViewerProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [content]);

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Content Block */}
      <div className="group relative rounded-lg border border-border bg-muted/30">
        {/* Copy Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy content</span>
        </Button>

        {/* Content */}
        <pre className="whitespace-pre-wrap break-words overflow-hidden p-4 pr-12 text-sm font-mono leading-relaxed text-foreground">
          {content}
        </pre>
      </div>
    </div>
  );
}