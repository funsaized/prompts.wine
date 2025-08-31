"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FrontmatterDisplayProps {
  description: string;
  className?: string;
}

export function FrontmatterDisplay({ description, className }: FrontmatterDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Clean and format the description
  const cleanDescription = React.useMemo(() => {
    return description
      // Remove XML-like tags but preserve their content
      .replace(/<([^>]+)>/g, '')
      .replace(/&lt;([^&]+)&gt;/g, '')
      // Handle common entities
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      // Clean up extra whitespace and line breaks
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  }, [description]);

  // Check if description is long enough to warrant truncation
  const isLongDescription = cleanDescription.length > 150;
  const shouldTruncate = isLongDescription && !isExpanded;
  
  // Get display text
  const displayText = shouldTruncate 
    ? cleanDescription.substring(0, 150) + "..."
    : cleanDescription;

  // Format text with better line breaks for readability
  const formatDescription = (text: string) => {
    // Handle different content types
    if (text.includes('Examples:')) {
      // Split on "Examples:" for agent descriptions
      const parts = text.split('Examples:');
      return (
        <>
          <div className="mb-3">
            {parts[0].trim()}
          </div>
          {parts[1] && (
            <div>
              <div className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wide mb-2">
                Examples
              </div>
              <div className="text-muted-foreground/90 text-xs leading-relaxed">
                {parts[1].trim()}
              </div>
            </div>
          )}
        </>
      );
    }
    
    // Default formatting - split on periods for better readability
    const sentences = text.split(/(?<=\.)\s+(?=[A-Z])/);
    
    return sentences.map((sentence, index) => (
      <div key={index} className="mb-2 last:mb-0">
        {sentence.trim()}
      </div>
    ));
  };

  return (
    <div className={cn("mt-3", className)}>
      <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
        {isLongDescription ? (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              Description
            </button>
            <div className="text-sm leading-relaxed text-muted-foreground">
              {formatDescription(displayText)}
            </div>
            {!isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-xs text-primary hover:text-primary/80 transition-colors mt-2"
              >
                Show more
              </button>
            )}
          </>
        ) : (
          <>
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Description
            </div>
            <div className="text-sm leading-relaxed text-muted-foreground">
              {formatDescription(cleanDescription)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}