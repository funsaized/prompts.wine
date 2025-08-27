import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import {
  FileTreeItem,
  ContentFrontmatter,
  ContentDefinitions,
  ContentFilter,
  ContentIndex,
  LoadContentOptions,
  PatternDefinition
} from './content-types'

/**
 * Content Management System - Core Loading Utilities
 * Handles loading, parsing, and organizing markdown content with tagging support
 */

const CONTENT_DIR = path.join(process.cwd(), 'content')
const DEFINITIONS_FILE = path.join(CONTENT_DIR, 'definitions.yaml')

/**
 * Load and parse definitions.yaml for tagging rules
 */
export async function loadDefinitions(): Promise<ContentDefinitions> {
  const defaultDefinitions: ContentDefinitions = {
    categories: {
      agents: { name: 'Agents', patterns: ['**/agents/**', '**/.claude/**'], defaultTags: ['agents'] },
      prompts: { name: 'Prompts', patterns: ['**/prompts/**', '**/*.prompt.*'], defaultTags: ['prompts'] },
      commands: { name: 'Commands', patterns: ['**/commands/**', '**/*.command.*'], defaultTags: ['commands'] },
      instructions: { name: 'Instructions', patterns: ['**/instructions/**', '**/*.instructions.*'], defaultTags: ['instructions'] },
    },
    tags: {
      agents: { name: 'Agents', description: 'AI agent configurations and prompts' },
      prompts: { name: 'Prompts', description: 'Reusable prompt templates' },
      commands: { name: 'Commands', description: 'Command definitions and workflows' },
      instructions: { name: 'Instructions', description: 'Setup and configuration instructions' },
    },
    patterns: []
  }

  try {
    if (fs.existsSync(DEFINITIONS_FILE)) {
      const definitionsContent = fs.readFileSync(DEFINITIONS_FILE, 'utf8')
      const parsed = yaml.load(definitionsContent) as Partial<ContentDefinitions>
      
      // Merge with defaults
      return {
        categories: { ...defaultDefinitions.categories, ...parsed.categories },
        tags: { ...defaultDefinitions.tags, ...parsed.tags },
        patterns: [...defaultDefinitions.patterns, ...(parsed.patterns || [])]
      }
    }
  } catch (error) {
    console.warn('Failed to load definitions.yaml, using defaults:', error)
  }

  return defaultDefinitions
}

/**
 * Parse markdown file and extract frontmatter
 */
export function parseMarkdownFile(filePath: string): {
  content: string
  frontmatter: ContentFrontmatter
} {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const parsed = matter(fileContent)
    
    return {
      content: parsed.content,
      frontmatter: parsed.data as ContentFrontmatter
    }
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error)
    return {
      content: '',
      frontmatter: {}
    }
  }
}

/**
 * Apply tags to a file based on path patterns and definitions
 */
export function applyTagsToFile(
  filePath: string,
  frontmatter: ContentFrontmatter,
  definitions: ContentDefinitions
): string[] {
  const tags = new Set<string>()
  
  // Add frontmatter tags
  if (frontmatter.tags) {
    frontmatter.tags.forEach(tag => tags.add(tag))
  }
  
  // Add category tag if specified
  if (frontmatter.category) {
    tags.add(frontmatter.category)
  }
  
  // Apply pattern-based tagging
  const relativePath = path.relative(CONTENT_DIR, filePath)
  
  // Check category patterns
  Object.entries(definitions.categories).forEach(([categoryKey, category]) => {
    if (category.patterns) {
      category.patterns.forEach(pattern => {
        if (matchesPattern(relativePath, pattern)) {
          if (category.defaultTags) {
            category.defaultTags.forEach(tag => tags.add(tag))
          }
          tags.add(categoryKey)
        }
      })
    }
  })
  
  // Apply custom pattern rules
  definitions.patterns.forEach((patternDef: PatternDefinition) => {
    if (matchesPattern(relativePath, patternDef.pattern)) {
      patternDef.tags.forEach(tag => tags.add(tag))
      if (patternDef.category) {
        tags.add(patternDef.category)
      }
    }
  })
  
  return Array.from(tags)
}

/**
 * Simple pattern matching for file paths
 */
function matchesPattern(filePath: string, pattern: string): boolean {
  // Convert glob pattern to regex
  const regexPattern = pattern
    .replace(/\*\*/g, '.*')
    .replace(/\*/g, '[^/]*')
    .replace(/\?/g, '[^/]')
  
  const regex = new RegExp(`^${regexPattern}$`, 'i')
  return regex.test(filePath)
}

/**
 * Recursively build file tree from content directory
 */
export async function loadContentTree(options: LoadContentOptions = {}): Promise<FileTreeItem[]> {
  const {
    includeContent = false,
    parseMarkdown = true,
    applyTags = true,
    excludePatterns = ['.DS_Store', '.git', 'node_modules']
  } = options

  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn('Content directory does not exist:', CONTENT_DIR)
    return []
  }

  const definitions = applyTags ? await loadDefinitions() : null

  function buildTree(currentPath: string, name: string = path.basename(currentPath)): FileTreeItem | null {
    const stats = fs.statSync(currentPath)
    const relativePath = path.relative(CONTENT_DIR, currentPath)
    
    // Check exclusion patterns
    if (excludePatterns.some(pattern => name.includes(pattern))) {
      return null
    }

    if (stats.isDirectory()) {
      const children: FileTreeItem[] = []
      
      try {
        const items = fs.readdirSync(currentPath)
        for (const item of items) {
          const itemPath = path.join(currentPath, item)
          const child = buildTree(itemPath, item)
          if (child) {
            children.push(child)
          }
        }
      } catch (error) {
        console.error(`Error reading directory ${currentPath}:`, error)
      }

      // Sort children: folders first, then files
      children.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'folder' ? -1 : 1
        }
        return a.name.localeCompare(b.name)
      })

      return {
        name,
        type: 'folder',
        path: relativePath,
        children,
        lastModified: stats.mtime,
        tags: []
      }
    } else {
      // Handle files
      const isMarkdown = name.endsWith('.md') || name.endsWith('.markdown')
      let content = ''
      let frontmatter: ContentFrontmatter = {}
      let fileTags: string[] = []

      if (isMarkdown && parseMarkdown) {
        const parsed = parseMarkdownFile(currentPath)
        content = includeContent ? parsed.content : ''
        frontmatter = parsed.frontmatter
      }

      if (applyTags && definitions) {
        fileTags = applyTagsToFile(currentPath, frontmatter, definitions)
      }

      return {
        name,
        type: 'file',
        path: relativePath,
        content,
        frontmatter,
        tags: fileTags,
        size: stats.size,
        lastModified: stats.mtime
      }
    }
  }

  const items = fs.readdirSync(CONTENT_DIR)
  const tree: FileTreeItem[] = []

  for (const item of items) {
    const itemPath = path.join(CONTENT_DIR, item)
    const treeItem = buildTree(itemPath, item)
    if (treeItem) {
      tree.push(treeItem)
    }
  }

  return tree
}

/**
 * Filter file tree based on tags and categories
 */
export function filterFileTree(
  tree: FileTreeItem[],
  filter: ContentFilter
): FileTreeItem[] {
  function filterNode(node: FileTreeItem): FileTreeItem | null {
    // For folders, recursively filter children
    if (node.type === 'folder') {
      const filteredChildren = node.children
        ? node.children.map(filterNode).filter(Boolean) as FileTreeItem[]
        : []
      
      // Include folder if it has matching children or matches filter itself
      if (filteredChildren.length > 0) {
        return { ...node, children: filteredChildren }
      }
      return null
    }
    
    // For files, check if they match the filter
    if (filter.tags && filter.tags.length > 0) {
      const hasMatchingTag = filter.tags.some(tag => 
        node.tags?.includes(tag) || node.frontmatter?.tags?.includes(tag)
      )
      if (!hasMatchingTag) {
        return null
      }
    }
    
    if (filter.category) {
      const hasMatchingCategory = 
        node.tags?.includes(filter.category) ||
        node.frontmatter?.category === filter.category
      if (!hasMatchingCategory) {
        return null
      }
    }
    
    return node
  }
  
  return tree.map(filterNode).filter(Boolean) as FileTreeItem[]
}

/**
 * Get content for a specific file by path
 */
export async function getFileContent(filePath: string): Promise<string> {
  try {
    const fullPath = path.join(CONTENT_DIR, filePath)
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${filePath}`)
    }
    
    const content = fs.readFileSync(fullPath, 'utf8')
    
    // If it's a markdown file, parse and return just the content
    if (filePath.endsWith('.md') || filePath.endsWith('.markdown')) {
      const parsed = matter(content)
      return parsed.content
    }
    
    return content
  } catch (error) {
    console.error(`Error loading file content for ${filePath}:`, error)
    return ''
  }
}

/**
 * Generate content index for build-time optimization
 */
export async function generateContentIndex(): Promise<ContentIndex> {
  const tree = await loadContentTree({ includeContent: false, parseMarkdown: true, applyTags: true })
  const definitions = await loadDefinitions()
  
  // Count files and collect statistics
  let totalFiles = 0
  const categories: Record<string, number> = {}
  const tags: Record<string, number> = {}
  
  function countItems(items: FileTreeItem[]) {
    for (const item of items) {
      if (item.type === 'file') {
        totalFiles++
        
        // Count tags
        if (item.tags) {
          item.tags.forEach(tag => {
            tags[tag] = (tags[tag] || 0) + 1
          })
        }
        
        // Count categories
        if (item.frontmatter?.category) {
          const category = item.frontmatter.category
          categories[category] = (categories[category] || 0) + 1
        }
      } else if (item.children) {
        countItems(item.children)
      }
    }
  }
  
  countItems(tree)
  
  return {
    files: tree,
    definitions,
    lastUpdated: new Date(),
    totalFiles,
    categories,
    tags
  }
}

/**
 * Search content by query
 */
export function searchContent(tree: FileTreeItem[], query: string): FileTreeItem[] {
  const results: FileTreeItem[] = []
  const queryLower = query.toLowerCase()
  
  function searchNode(node: FileTreeItem) {
    if (node.type === 'file') {
      // Search in filename, title, description, content
      const searchFields = [
        node.name,
        node.frontmatter?.title,
        node.frontmatter?.description,
        node.content
      ].filter(Boolean).join(' ').toLowerCase()
      
      if (searchFields.includes(queryLower)) {
        results.push(node)
      }
    } else if (node.children) {
      node.children.forEach(searchNode)
    }
  }
  
  tree.forEach(searchNode)
  return results
}