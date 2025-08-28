"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  Tag,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { FileTreeItem } from "@/lib/content-types";
import {
  getPrimaryContentType,
  getContentTypeBackground,
  createGradientBackground,
  type ContentType,
} from "@/lib/colors";

interface FileTreeNodeProps {
  item: FileTreeItem;
  level?: number;
  onSelect?: (item: FileTreeItem) => void;
  selectedPath?: string;
}

interface FileTreeProps {
  data: FileTreeItem[];
  onSelect?: (item: FileTreeItem) => void;
  selectedPath?: string;
  className?: string;
}

function FileTreeNode({
  item,
  level = 0,
  onSelect,
  selectedPath,
}: FileTreeNodeProps): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState(item.isOpen ?? false);
  const isSelected = selectedPath === item.path;

  const handleToggle = (): void => {
    if (item.type === "folder") {
      setIsOpen(!isOpen);
    }
    onSelect?.(item);
  };

  const indent = level * 16;

  // Calculate background color based on content type or children composition
  const getNodeBackground = React.useMemo(() => {
    if (item.type === "file" && item.tags) {
      const primaryType = getPrimaryContentType(item.tags);
      return primaryType
        ? getContentTypeBackground(primaryType, 0.15)
        : undefined;
    }

    if (item.type === "folder" && item.children) {
      // Count content types in all descendant files
      const typeCount: Record<ContentType, number> = {
        agents: 0,
        prompts: 0,
        commands: 0,
        instructions: 0,
      };

      function countTypes(items: FileTreeItem[]) {
        for (const child of items) {
          if (child.type === "file" && child.tags) {
            const primaryType = getPrimaryContentType(child.tags);
            if (primaryType) {
              typeCount[primaryType]++;
            }
          } else if (child.type === "folder" && child.children) {
            countTypes(child.children);
          }
        }
      }

      countTypes(item.children);

      // Create weighted color blend
      const colorWeights: Array<[ContentType, number]> = [];
      let totalCount = 0;
      for (const [type, count] of Object.entries(typeCount) as Array<
        [ContentType, number]
      >) {
        if (count > 0) {
          colorWeights.push([type, count]);
          totalCount += count;
        }
      }

      if (totalCount > 0) {
        // Always use gradient for consistent appearance
        return createGradientBackground(colorWeights);
      }
    }

    return undefined;
  }, [item]);

  if (item.type === "file") {
    return (
      <div
        className={cn(
          "hover:bg-accent/50 text-foreground group flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm transition-all",
          isSelected && "bg-accent text-accent-foreground ring-accent ring-2"
        )}
        style={{
          paddingLeft: `${indent + 8}px`,
          background: !isSelected ? getNodeBackground : undefined,
          borderLeft:
            getNodeBackground && !isSelected
              ? `3px solid ${getNodeBackground}`
              : undefined,
        }}
        onClick={handleToggle}
      >
        <File className="text-muted-foreground h-4 w-4 shrink-0" />
        <span className="flex-1 truncate">{item.name}</span>
        {item.tags && item.tags.length > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex cursor-help items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Tag className="text-muted-foreground h-3 w-3" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="end" className="max-w-xs">
              <div className="flex flex-wrap gap-1">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div
          className={cn(
            "hover:bg-accent/50 text-foreground relative flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 py-1 text-sm transition-all",
            isSelected && "bg-accent text-accent-foreground ring-accent ring-2"
          )}
          style={{
            paddingLeft: `${indent + 8}px`,
            background:
              !isSelected && getNodeBackground ? getNodeBackground : undefined,
          }}
          onClick={handleToggle}
        >
          {isOpen ? (
            <ChevronDown className="text-primary h-4 w-4 shrink-0" />
          ) : (
            <ChevronRight className="text-muted-foreground h-4 w-4 shrink-0" />
          )}
          {isOpen ? (
            <FolderOpen className="text-primary h-4 w-4 shrink-0" />
          ) : (
            <Folder className="text-muted-foreground h-4 w-4 shrink-0" />
          )}
          <span className="truncate font-medium">{item.name}</span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1">
        {item.children?.map((child, index) => (
          <FileTreeNode
            key={`${child.name}-${index}`}
            item={child}
            level={level + 1}
            onSelect={onSelect}
            selectedPath={selectedPath}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function FileTree({
  data,
  onSelect,
  selectedPath,
  className,
}: FileTreeProps): React.JSX.Element {
  return (
    <TooltipProvider>
      <div className={cn("text-foreground space-y-1 p-2", className)}>
        {data.map((item, index) => (
          <FileTreeNode
            key={`${item.name}-${index}`}
            item={item}
            onSelect={onSelect}
            selectedPath={selectedPath}
          />
        ))}
      </div>
    </TooltipProvider>
  );
}

export type { FileTreeItem, FileTreeProps };
