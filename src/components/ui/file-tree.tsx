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
import { FileTreeItem } from "@/lib/content-types";

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

  if (item.type === "file") {
    return (
      <div
        className={cn(
          "hover:bg-accent/50 text-foreground group flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors",
          isSelected && "bg-accent text-accent-foreground"
        )}
        style={{ paddingLeft: `${indent + 8}px` }}
        onClick={handleToggle}
      >
        <File className="text-muted-foreground h-4 w-4 shrink-0" />
        <span className="flex-1 truncate">{item.name}</span>
        {item.tags && item.tags.length > 0 && (
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Tag className="text-muted-foreground h-3 w-3" />
            <span className="text-muted-foreground text-xs">
              {item.tags.slice(0, 2).join(", ")}
              {item.tags.length > 2 && "..."}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div
          className={cn(
            "hover:bg-accent/50 text-foreground flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors",
            isSelected && "bg-accent text-accent-foreground"
          )}
          style={{ paddingLeft: `${indent + 8}px` }}
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
  );
}

export type { FileTreeItem, FileTreeProps };
