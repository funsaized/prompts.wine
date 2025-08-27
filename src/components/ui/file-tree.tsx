"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, Tag } from "lucide-react"

import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { FileTreeItem } from "@/lib/content-types"

interface FileTreeNodeProps {
  item: FileTreeItem
  level?: number
  onSelect?: (item: FileTreeItem) => void
  selectedPath?: string
}

interface FileTreeProps {
  data: FileTreeItem[]
  onSelect?: (item: FileTreeItem) => void
  selectedPath?: string
  className?: string
}

function FileTreeNode({ item, level = 0, onSelect, selectedPath }: FileTreeNodeProps): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState(item.isOpen ?? false)
  const isSelected = selectedPath === item.path
  
  const handleToggle = (): void => {
    if (item.type === "folder") {
      setIsOpen(!isOpen)
    }
    onSelect?.(item)
  }

  const indent = level * 16

  if (item.type === "file") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1 text-sm cursor-pointer rounded-md hover:bg-accent/50 transition-colors text-foreground group",
          isSelected && "bg-accent text-accent-foreground"
        )}
        style={{ paddingLeft: `${indent + 8}px` }}
        onClick={handleToggle}
      >
        <File className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="truncate flex-1">{item.name}</span>
        {item.tags && item.tags.length > 0 && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Tag className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {item.tags.slice(0, 2).join(', ')}
              {item.tags.length > 2 && '...'}
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-2 px-2 py-1 text-sm cursor-pointer rounded-md hover:bg-accent/50 transition-colors w-full text-foreground",
            isSelected && "bg-accent text-accent-foreground"
          )}
          style={{ paddingLeft: `${indent + 8}px` }}
          onClick={handleToggle}
        >
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-primary shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          )}
          {isOpen ? (
            <FolderOpen className="h-4 w-4 text-primary shrink-0" />
          ) : (
            <Folder className="h-4 w-4 text-muted-foreground shrink-0" />
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
  )
}

export function FileTree({ data, onSelect, selectedPath, className }: FileTreeProps): React.JSX.Element {
  return (
    <div className={cn("space-y-1 p-2 text-foreground", className)}>
      {data.map((item, index) => (
        <FileTreeNode
          key={`${item.name}-${index}`}
          item={item}
          onSelect={onSelect}
          selectedPath={selectedPath}
        />
      ))}
    </div>
  )
}

export type { FileTreeItem, FileTreeProps }