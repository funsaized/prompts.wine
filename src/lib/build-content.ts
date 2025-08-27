/**
 * Build-time Content Generation
 * Processes all content at build time and generates static data
 */

import fs from 'fs'
import path from 'path'
import { 
  loadContentTree, 
  loadDefinitions, 
  filterFileTree 
} from './content-loader'
import { 
  FileTreeItem, 
  ContentDefinitions, 
  ContentFilter 
} from './content-types'

export interface StaticContentData {
  contentTree: FileTreeItem[]
  definitions: ContentDefinitions
  contentMap: Record<string, string>
  stats: {
    totalFiles: number
    totalCategories: number
    totalTags: number
    categoryCount: Record<string, number>
    tagCount: Record<string, number>
  }
  filteredContent: {
    all: FileTreeItem[]
    agents: FileTreeItem[]
    prompts: FileTreeItem[]
    commands: FileTreeItem[]
    instructions: FileTreeItem[]
  }
}

/**
 * Generate all content data at build time
 */
export async function generateStaticContentData(): Promise<StaticContentData> {
  console.log('🔥 Generating static content data...')
  
  // Load content tree with full content
  const contentTree = await loadContentTree({
    includeContent: true,
    parseMarkdown: true,
    applyTags: true
  })
  
  const definitions = await loadDefinitions()
  
  // Create content map for quick lookup
  const contentMap: Record<string, string> = {}
  
  function collectContent(items: FileTreeItem[]) {
    for (const item of items) {
      if (item.type === 'file' && item.content) {
        contentMap[item.path] = item.content
      }
      if (item.children) {
        collectContent(item.children)
      }
    }
  }
  
  collectContent(contentTree)
  
  // Generate statistics
  let totalFiles = 0
  const categoryCount: Record<string, number> = {}
  const tagCount: Record<string, number> = {}
  
  function countItems(items: FileTreeItem[]) {
    for (const item of items) {
      if (item.type === 'file') {
        totalFiles++
        
        if (item.tags) {
          item.tags.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1
          })
        }
        
        if (item.frontmatter?.category) {
          const category = item.frontmatter.category
          categoryCount[category] = (categoryCount[category] || 0) + 1
        }
      } else if (item.children) {
        countItems(item.children)
      }
    }
  }
  
  countItems(contentTree)
  
  const stats = {
    totalFiles,
    totalCategories: Object.keys(categoryCount).length,
    totalTags: Object.keys(tagCount).length,
    categoryCount,
    tagCount
  }
  
  // Generate pre-filtered content for each tab
  const filteredContent = {
    all: contentTree,
    agents: filterFileTree(contentTree, { tags: ['agents'] }),
    prompts: filterFileTree(contentTree, { tags: ['prompts'] }),
    commands: filterFileTree(contentTree, { tags: ['commands'] }),
    instructions: filterFileTree(contentTree, { tags: ['instructions'] })
  }
  
  console.log(`✅ Generated content data: ${totalFiles} files, ${Object.keys(contentMap).length} content entries`)
  
  return {
    contentTree,
    definitions,
    contentMap,
    stats,
    filteredContent
  }
}

/**
 * Save content data to JSON for static generation
 */
export async function saveStaticContentData(data: StaticContentData): Promise<void> {
  const outputPath = path.join(process.cwd(), 'public', 'content-data.json')
  
  // Create a version without content for the tree (content is in contentMap)
  const treeWithoutContent = JSON.parse(JSON.stringify(data.contentTree))
  
  function removeContent(items: FileTreeItem[]) {
    for (const item of items) {
      if (item.content) {
        delete item.content // Remove content from tree to reduce size
      }
      if (item.children) {
        removeContent(item.children)
      }
    }
  }
  
  removeContent(treeWithoutContent)
  
  const outputData = {
    ...data,
    contentTree: treeWithoutContent,
    filteredContent: {
      all: JSON.parse(JSON.stringify(treeWithoutContent)),
      agents: filterContentForOutput(data.filteredContent.agents),
      prompts: filterContentForOutput(data.filteredContent.prompts),
      commands: filterContentForOutput(data.filteredContent.commands),
      instructions: filterContentForOutput(data.filteredContent.instructions)
    }
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2))
  console.log(`📦 Saved content data to: ${outputPath}`)
}

function filterContentForOutput(items: FileTreeItem[]): FileTreeItem[] {
  return JSON.parse(JSON.stringify(items.map(item => {
    const cleaned = { ...item }
    delete cleaned.content
    if (cleaned.children) {
      cleaned.children = filterContentForOutput(cleaned.children)
    }
    return cleaned
  })))
}

/**
 * Load static content data (for client-side)
 * Note: This function is now handled directly in the component
 * to avoid importing Node.js modules on the client side
 */
export function createEmptyContentData(): StaticContentData {
  return {
    contentTree: [],
    definitions: {
      categories: {},
      tags: {},
      patterns: []
    },
    contentMap: {},
    stats: {
      totalFiles: 0,
      totalCategories: 0,
      totalTags: 0,
      categoryCount: {},
      tagCount: {}
    },
    filteredContent: {
      all: [],
      agents: [],
      prompts: [],
      commands: [],
      instructions: []
    }
  }
}