"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, File, Folder, FolderOpen } from "lucide-react"

import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"

interface FileTreeItem {
  name: string
  type: "file" | "folder"
  children?: FileTreeItem[]
  isOpen?: boolean
}

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
  const isSelected = selectedPath === item.name
  
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
          "flex items-center gap-2 px-2 py-1 text-sm cursor-pointer rounded-md hover:bg-accent/50 transition-colors text-foreground",
          isSelected && "bg-accent text-accent-foreground"
        )}
        style={{ paddingLeft: `${indent + 8}px` }}
        onClick={handleToggle}
      >
        <File className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="truncate">{item.name}</span>
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