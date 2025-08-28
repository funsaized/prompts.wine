/**
 * Content Management System Types
 * Extended types for the content management system with tagging and frontmatter support
 */

export interface FileTreeItem {
  name: string
  type: "file" | "folder"
  path: string
  children?: FileTreeItem[]
  isOpen?: boolean
  tags?: string[]
  content?: string
  frontmatter?: ContentFrontmatter
  size?: number
  lastModified?: Date
}

export interface ContentFrontmatter {
  title?: string
  description?: string
  tags?: string[]
  category?: string
  author?: string
  date?: string
  [key: string]: any
}

export interface ContentDefinitions {
  categories: Record<string, CategoryDefinition>
  tags: Record<string, TagDefinition>
  patterns: PatternDefinition[]
}

export interface CategoryDefinition {
  name: string
  description?: string
  patterns?: string[]
  defaultTags?: string[]
}

export interface TagDefinition {
  name: string
  description?: string
  color?: string
}

export interface PatternDefinition {
  pattern: string
  tags: string[]
  category?: string
}

export interface ContentFilter {
  tags?: string[]
  category?: string
  type?: "file" | "folder" | "all"
}

export interface ContentIndex {
  files: FileTreeItem[]
  definitions: ContentDefinitions
  lastUpdated: Date
  totalFiles: number
  categories: Record<string, number>
  tags: Record<string, number>
}

export interface LoadContentOptions {
  includeContent?: boolean
  parseMarkdown?: boolean
  applyTags?: boolean
  excludePatterns?: string[]
}