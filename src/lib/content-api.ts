/**
 * Content API - Server-side content management utilities
 * Handles content loading and caching for Next.js pages
 */

import { cache } from 'react'
import { 
  loadContentTree, 
  filterFileTree, 
  generateContentIndex, 
  getFileContent,
  loadDefinitions 
} from './content-loader'
import { 
  FileTreeItem, 
  ContentFilter, 
  ContentIndex,
  ContentDefinitions 
} from './content-types'

/**
 * Cached content loading for server-side rendering
 */
export const getCachedContentTree = cache(async (): Promise<FileTreeItem[]> => {
  try {
    return await loadContentTree({
      includeContent: false,
      parseMarkdown: true,
      applyTags: true
    })
  } catch (error) {
    console.error('Error loading content tree:', error)
    return []
  }
})

/**
 * Cached definitions loading
 */
export const getCachedDefinitions = cache(async (): Promise<ContentDefinitions> => {
  try {
    return await loadDefinitions()
  } catch (error) {
    console.error('Error loading definitions:', error)
    return {
      categories: {},
      tags: {},
      patterns: []
    }
  }
})

/**
 * Get filtered content by category
 */
export async function getFilteredContent(category: string): Promise<FileTreeItem[]> {
  const tree = await getCachedContentTree()
  
  if (category === 'all') {
    return tree
  }
  
  const filter: ContentFilter = {
    tags: [category]
  }
  
  return filterFileTree(tree, filter)
}

/**
 * Get content statistics
 */
export async function getContentStats() {
  const tree = await getCachedContentTree()
  const definitions = await getCachedDefinitions()
  
  let totalFiles = 0
  const categoryCount: Record<string, number> = {}
  const tagCount: Record<string, number> = {}
  
  function countItems(items: FileTreeItem[]) {
    for (const item of items) {
      if (item.type === 'file') {
        totalFiles++
        
        // Count tags
        if (item.tags) {
          item.tags.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1
          })
        }
        
        // Count categories from frontmatter
        if (item.frontmatter?.category) {
          const category = item.frontmatter.category
          categoryCount[category] = (categoryCount[category] || 0) + 1
        }
      } else if (item.children) {
        countItems(item.children)
      }
    }
  }
  
  countItems(tree)
  
  return {
    totalFiles,
    totalCategories: Object.keys(categoryCount).length,
    totalTags: Object.keys(tagCount).length,
    categoryCount,
    tagCount,
    definitions
  }
}

/**
 * Search content by query string
 */
export async function searchContent(query: string): Promise<FileTreeItem[]> {
  const tree = await getCachedContentTree()
  const results: FileTreeItem[] = []
  const queryLower = query.toLowerCase()
  
  function searchNode(node: FileTreeItem) {
    if (node.type === 'file') {
      // Search in filename, title, description
      const searchFields = [
        node.name,
        node.frontmatter?.title,
        node.frontmatter?.description,
        ...(node.tags || [])
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

/**
 * Get content for a specific file (for API routes)
 */
export const getCachedFileContent = cache(async (filePath: string): Promise<string> => {
  try {
    return await getFileContent(filePath)
  } catch (error) {
    console.error(`Error loading file content for ${filePath}:`, error)
    return ''
  }
})

/**
 * Generate build-time content index
 */
export async function generateBuildTimeIndex(): Promise<ContentIndex> {
  try {
    return await generateContentIndex()
  } catch (error) {
    console.error('Error generating content index:', error)
    const tree = await getCachedContentTree()
    const definitions = await getCachedDefinitions()
    
    return {
      files: tree,
      definitions,
      lastUpdated: new Date(),
      totalFiles: 0,
      categories: {},
      tags: {}
    }
  }
}