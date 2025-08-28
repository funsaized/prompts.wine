/**
 * Server-side Content Generation (Node.js only)
 * This file can only be imported in Node.js environment
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Get built-in tagging definitions based on content patterns
 */
function getDefinitions() {
  return {
    categories: {
      agents: {
        name: "Agents",
        patterns: ["**/agents/**", "**/.claude/agents/**"],
        defaultTags: ["agents"],
      },
      commands: {
        name: "Commands",
        patterns: [
          "**/commands/**",
          "**/.claude/commands/**",
          "**/*.command.*",
        ],
        defaultTags: ["commands"],
      },
      prompts: {
        name: "Prompts",
        patterns: ["**/prompts/**", "**/claude/**", "**/*.prompt.*"],
        defaultTags: ["prompts"],
      },
      instructions: {
        name: "Instructions",
        patterns: ["**/instructions/**", "**/rules/**", "**/*.instructions.*"],
        defaultTags: ["instructions"],
      },
    },
    tags: {
      agents: {
        name: "Agents",
        description: "AI agent configurations and prompts",
      },
      commands: {
        name: "Commands",
        description: "Command definitions and workflows",
      },
      prompts: { name: "Prompts", description: "Reusable prompt templates" },
      instructions: {
        name: "Instructions",
        description: "Setup guides and configuration instructions",
      },
    },
    patterns: [],
  };
}

/**
 * Parse markdown file and extract frontmatter with robust error handling
 */
function parseMarkdownFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    
    // First, try normal parsing
    try {
      const parsed = matter(fileContent);
      return {
        content: parsed.content,
        frontmatter: parsed.data || {},
      };
    } catch (yamlError) {
      // If YAML parsing fails, try to extract basic metadata and treat rest as content
      console.warn(`YAML parsing failed for ${filePath}, attempting recovery...`);
      
      // Try to extract frontmatter manually
      const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (frontmatterMatch) {
        const [, rawFrontmatter, content] = frontmatterMatch;
        
        // Extract simple key-value pairs, ignoring complex structures
        const frontmatter = {};
        const lines = rawFrontmatter.split('\n');
        
        for (const line of lines) {
          const match = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/);
          if (match) {
            const [, key, value] = match;
            // Only extract simple values, skip complex multiline content
            if (!value.includes('<') && !value.includes('\\n')) {
              frontmatter[key] = value.replace(/^["']|["']$/g, ''); // Remove quotes
            } else if (key === 'name' || key === 'color' || key === 'tools') {
              // Always extract these important fields
              frontmatter[key] = value.replace(/^["']|["']$/g, '');
            }
          }
        }
        
        return {
          content: content,
          frontmatter,
        };
      }
      
      // Last resort: treat entire file as content
      console.warn(`Could not parse frontmatter for ${filePath}, treating as plain content`);
      return {
        content: fileContent,
        frontmatter: {
          name: path.basename(filePath, '.md'), // Use filename as fallback name
        },
      };
    }
  } catch (error) {
    console.error(`Error reading markdown file ${filePath}:`, error.message);
    return {
      content: "",
      frontmatter: {
        name: path.basename(filePath, '.md'), // Use filename as fallback name
      },
    };
  }
}

/**
 * Simple pattern matching for file paths
 */
function matchesPattern(filePath, pattern) {
  // Convert glob pattern to regex
  // Handle ** first (matches any number of directories including none)
  // Then handle single * (matches within a single directory level)
  const regexPattern = pattern
    .replace(/\*\*/g, "§DOUBLE_STAR§") // Temporary placeholder
    .replace(/\*/g, "[^/]*") // Single * matches within directory
    .replace(/§DOUBLE_STAR§/g, ".*") // ** matches across directories
    .replace(/\?/g, "[^/]"); // ? matches single character

  const regex = new RegExp(`^${regexPattern}$`, "i");
  return regex.test(filePath);
}

/**
 * Apply tags to a file based on path patterns and definitions
 */
function applyTagsToFile(filePath, frontmatter, definitions) {
  const tags = new Set();

  // Add frontmatter tags
  if (frontmatter.tags) {
    frontmatter.tags.forEach(tag => tags.add(tag));
  }

  // Add category tag if specified
  if (frontmatter.category) {
    tags.add(frontmatter.category);
  }

  // Apply pattern-based tagging
  const relativePath = path.relative(CONTENT_DIR, filePath);

  // Check category patterns
  Object.entries(definitions.categories).forEach(([categoryKey, category]) => {
    if (category.patterns) {
      category.patterns.forEach(pattern => {
        if (matchesPattern(relativePath, pattern)) {
          if (category.defaultTags) {
            category.defaultTags.forEach(tag => tags.add(tag));
          }
          tags.add(categoryKey);
        }
      });
    }
  });

  // Apply custom pattern rules
  definitions.patterns.forEach(patternDef => {
    if (matchesPattern(relativePath, patternDef.pattern)) {
      patternDef.tags.forEach(tag => tags.add(tag));
      if (patternDef.category) {
        tags.add(patternDef.category);
      }
    }
  });

  return Array.from(tags);
}

/**
 * Recursively build file tree from content directory
 */
function loadContentTree(options = {}) {
  const {
    includeContent = false,
    parseMarkdown = true,
    applyTags = true,
    excludePatterns = [".DS_Store", ".git", "node_modules"],
  } = options;

  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn("Content directory does not exist:", CONTENT_DIR);
    return [];
  }

  const definitions = applyTags ? getDefinitions() : null;

  function buildTree(currentPath, name = path.basename(currentPath)) {
    const stats = fs.statSync(currentPath);
    const relativePath = path.relative(CONTENT_DIR, currentPath);

    // Check exclusion patterns
    if (excludePatterns.some(pattern => name.includes(pattern))) {
      return null;
    }

    if (stats.isDirectory()) {
      const children = [];

      try {
        const items = fs.readdirSync(currentPath);
        for (const item of items) {
          const itemPath = path.join(currentPath, item);
          const child = buildTree(itemPath, item);
          if (child) {
            children.push(child);
          }
        }
      } catch (error) {
        console.error(`Error reading directory ${currentPath}:`, error);
      }

      // Sort children: folders first, then files
      children.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === "folder" ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });

      return {
        name,
        type: "folder",
        path: relativePath,
        children,
        lastModified: stats.mtime,
        tags: [],
      };
    } else {
      // Handle files
      const isMarkdown = name.endsWith(".md") || name.endsWith(".markdown");
      let content = "";
      let frontmatter = {};
      let fileTags = [];

      if (isMarkdown && parseMarkdown) {
        const parsed = parseMarkdownFile(currentPath);
        content = includeContent ? parsed.content : "";
        frontmatter = parsed.frontmatter;
      }

      if (applyTags && definitions) {
        fileTags = applyTagsToFile(currentPath, frontmatter, definitions);
      }

      return {
        name,
        type: "file",
        path: relativePath,
        content,
        frontmatter,
        tags: fileTags,
        size: stats.size,
        lastModified: stats.mtime,
      };
    }
  }

  const items = fs.readdirSync(CONTENT_DIR);
  const tree = [];

  for (const item of items) {
    const itemPath = path.join(CONTENT_DIR, item);
    const treeItem = buildTree(itemPath, item);
    if (treeItem) {
      tree.push(treeItem);
    }
  }

  return tree;
}

/**
 * Filter file tree based on tags and categories
 */
function filterFileTree(tree, filter) {
  function filterNode(node) {
    // For folders, recursively filter children
    if (node.type === "folder") {
      const filteredChildren = node.children
        ? node.children.map(filterNode).filter(Boolean)
        : [];

      // Include folder if it has matching children or matches filter itself
      if (filteredChildren.length > 0) {
        return { ...node, children: filteredChildren };
      }
      return null;
    }

    // For files, check if they match the filter
    if (filter.tags && filter.tags.length > 0) {
      const hasMatchingTag = filter.tags.some(
        tag =>
          (node.tags && node.tags.includes(tag)) ||
          (node.frontmatter &&
            node.frontmatter.tags &&
            node.frontmatter.tags.includes(tag))
      );
      if (!hasMatchingTag) {
        return null;
      }
    }

    if (filter.category) {
      const hasMatchingCategory =
        (node.tags && node.tags.includes(filter.category)) ||
        (node.frontmatter && node.frontmatter.category === filter.category);
      if (!hasMatchingCategory) {
        return null;
      }
    }

    return node;
  }

  return tree.map(filterNode).filter(Boolean);
}

/**
 * Generate all content data at build time (server-side only)
 */
function generateStaticContentData() {
  console.log("🔥 Generating static content data...");

  // Load content tree with full content and robust error handling
  console.log("📂 Loading content tree with error recovery...");
  const contentTree = loadContentTree({
    includeContent: true,
    parseMarkdown: true,
    applyTags: true,
  });

  const definitions = getDefinitions();

  // Create content map for quick lookup
  const contentMap = {};

  function collectContent(items) {
    for (const item of items) {
      if (item.type === "file" && item.content) {
        contentMap[item.path] = item.content;
      }
      if (item.children) {
        collectContent(item.children);
      }
    }
  }

  collectContent(contentTree);

  // Generate statistics with parsing health metrics
  let totalFiles = 0;
  let parsedFiles = 0;
  let failedFiles = 0;
  const categoryCount = {};
  const tagCount = {};

  function countItems(items) {
    for (const item of items) {
      if (item.type === "file") {
        totalFiles++;

        // Track parsing success
        if (item.frontmatter && Object.keys(item.frontmatter).length > 0) {
          parsedFiles++;
        } else {
          failedFiles++;
        }

        if (item.tags) {
          item.tags.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
          });
        }

        if (item.frontmatter && item.frontmatter.category) {
          const category = item.frontmatter.category;
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        }
      } else if (item.children) {
        countItems(item.children);
      }
    }
  }

  countItems(contentTree);

  const stats = {
    totalFiles,
    parsedFiles,
    failedFiles,
    parseSuccessRate: Math.round((parsedFiles / totalFiles) * 100),
    totalCategories: Object.keys(categoryCount).length,
    totalTags: Object.keys(tagCount).length,
    categoryCount,
    tagCount,
  };

  // Generate pre-filtered content for each tab
  const filteredContent = {
    all: contentTree,
    agents: filterFileTree(contentTree, { tags: ["agents"] }),
    prompts: filterFileTree(contentTree, { tags: ["prompts"] }),
    commands: filterFileTree(contentTree, { tags: ["commands"] }),
    instructions: filterFileTree(contentTree, { tags: ["instructions"] }),
  };

  console.log(
    `✅ Generated content data: ${totalFiles} files, ${Object.keys(contentMap).length} content entries`
  );
  console.log(
    `📊 Parsing health: ${parsedFiles}/${totalFiles} successful (${stats.parseSuccessRate}%)`
  );
  if (failedFiles > 0) {
    console.warn(`⚠️  ${failedFiles} files had parsing issues but were recovered`);
  }

  return {
    contentTree,
    definitions,
    contentMap,
    stats,
    filteredContent,
  };
}

/**
 * Save content data to JSON for static generation (server-side only)
 */
async function saveStaticContentData(data) {
  const outputPath = path.join(process.cwd(), "public", "content-data.json");

  // Create a version without content for the tree (content is in contentMap)
  const treeWithoutContent = JSON.parse(JSON.stringify(data.contentTree));

  function removeContent(items) {
    for (const item of items) {
      if (item.content) {
        delete item.content; // Remove content from tree to reduce size
      }
      if (item.children) {
        removeContent(item.children);
      }
    }
  }

  removeContent(treeWithoutContent);

  const outputData = {
    ...data,
    contentTree: treeWithoutContent,
    filteredContent: {
      all: JSON.parse(JSON.stringify(treeWithoutContent)),
      agents: filterContentForOutput(data.filteredContent.agents),
      prompts: filterContentForOutput(data.filteredContent.prompts),
      commands: filterContentForOutput(data.filteredContent.commands),
      instructions: filterContentForOutput(data.filteredContent.instructions),
    },
  };

  // Ensure public directory exists
  const publicDir = path.dirname(outputPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
  console.log(`📦 Saved content data to: ${outputPath}`);
}

function filterContentForOutput(items) {
  return JSON.parse(
    JSON.stringify(
      items.map(item => {
        const cleaned = { ...item };
        delete cleaned.content;
        if (cleaned.children) {
          cleaned.children = filterContentForOutput(cleaned.children);
        }
        return cleaned;
      })
    )
  );
}

module.exports = {
  generateStaticContentData,
  saveStaticContentData,
  loadContentTree,
  getDefinitions,
  filterFileTree,
};
