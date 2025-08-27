const fs = require('fs');
const path = require('path');

// Simple test of the content directory
function testContentDirectory() {
  const contentDir = path.join(__dirname, 'content');
  
  if (!fs.existsSync(contentDir)) {
    console.error('❌ Content directory does not exist');
    return false;
  }
  
  console.log('✅ Content directory exists');
  
  // List all files recursively
  function listFiles(dir, indent = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        console.log(`${indent}📁 ${item}/`);
        listFiles(itemPath, indent + '  ');
      } else {
        const extension = path.extname(item);
        const icon = extension === '.md' ? '📄' : extension === '.yaml' ? '⚙️' : '📄';
        console.log(`${indent}${icon} ${item}`);
      }
    }
  }
  
  console.log('\n📂 Content structure:');
  listFiles(contentDir);
  
  // Test definitions.yaml
  const definitionsPath = path.join(contentDir, 'definitions.yaml');
  if (fs.existsSync(definitionsPath)) {
    console.log('\n✅ definitions.yaml found');
    const content = fs.readFileSync(definitionsPath, 'utf8');
    console.log('📏 File size:', content.length, 'bytes');
  } else {
    console.log('\n❌ definitions.yaml not found');
  }
  
  // Count markdown files
  let markdownCount = 0;
  function countMarkdown(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stats = fs.statSync(itemPath);
      if (stats.isDirectory()) {
        countMarkdown(itemPath);
      } else if (item.endsWith('.md')) {
        markdownCount++;
      }
    }
  }
  
  countMarkdown(contentDir);
  console.log(`\n📊 Total markdown files: ${markdownCount}`);
  
  return true;
}

// Create basic content-data.json for testing
function createBasicContentData() {
  const contentDir = path.join(__dirname, 'content');
  const outputPath = path.join(__dirname, 'public', 'content-data.json');
  
  // Ensure public directory exists
  if (!fs.existsSync(path.join(__dirname, 'public'))) {
    fs.mkdirSync(path.join(__dirname, 'public'));
  }
  
  // Build basic file tree
  function buildFileTree(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    const tree = [];
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const relativePath = path.join(basePath, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        tree.push({
          name: item,
          type: 'folder',
          path: relativePath,
          children: buildFileTree(itemPath, relativePath),
          tags: []
        });
      } else {
        const tags = [];
        
        // Simple tagging based on directory
        if (basePath.includes('agents')) tags.push('agents');
        if (basePath.includes('prompts')) tags.push('prompts');
        if (basePath.includes('commands')) tags.push('commands');
        if (basePath.includes('instructions')) tags.push('instructions');
        if (item.endsWith('.md')) tags.push('markdown');
        
        tree.push({
          name: item,
          type: 'file',
          path: relativePath,
          tags,
          frontmatter: {},
          size: stats.size,
          lastModified: stats.mtime
        });
      }
    }
    
    return tree.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  }
  
  const contentTree = buildFileTree(contentDir);
  
  // Create content map (simplified - just filenames for now)
  const contentMap = {};
  function collectContent(items) {
    for (const item of items) {
      if (item.type === 'file' && item.name.endsWith('.md')) {
        const fullPath = path.join(contentDir, item.path);
        try {
          contentMap[item.path] = fs.readFileSync(fullPath, 'utf8');
        } catch (err) {
          console.error(`Error reading ${item.path}:`, err.message);
        }
      }
      if (item.children) {
        collectContent(item.children);
      }
    }
  }
  
  collectContent(contentTree);
  
  // Basic filtering
  function filterByTags(tree, tags) {
    return tree.map(item => {
      if (item.type === 'folder') {
        const filteredChildren = filterByTags(item.children || [], tags);
        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
        return null;
      } else {
        return item.tags && item.tags.some(tag => tags.includes(tag)) ? item : null;
      }
    }).filter(Boolean);
  }
  
  // Helper function to count tags
  function countTag(tree, tag) {
    let count = 0;
    function countInNode(node) {
      if (node.type === 'file' && node.tags && node.tags.includes(tag)) {
        count++;
      }
      if (node.children) {
        node.children.forEach(countInNode);
      }
    }
    tree.forEach(countInNode);
    return count;
  }
  
  // Calculate statistics
  const stats = {
    totalFiles: Object.keys(contentMap).length,
    totalCategories: 4,
    totalTags: 5,
    categoryCount: {
      agents: filterByTags(contentTree, ['agents']).length,
      prompts: filterByTags(contentTree, ['prompts']).length,
      commands: filterByTags(contentTree, ['commands']).length,
      instructions: filterByTags(contentTree, ['instructions']).length
    },
    tagCount: {
      agents: countTag(contentTree, 'agents'),
      prompts: countTag(contentTree, 'prompts'),
      commands: countTag(contentTree, 'commands'),
      instructions: countTag(contentTree, 'instructions'),
      markdown: countTag(contentTree, 'markdown')
    }
  };

  const data = {
    contentTree,
    definitions: {
      categories: {
        agents: { name: 'Agents', description: 'AI agents and configurations' },
        prompts: { name: 'Prompts', description: 'Reusable prompt templates' },
        commands: { name: 'Commands', description: 'Automation commands' },
        instructions: { name: 'Instructions', description: 'Setup guides' }
      },
      tags: {
        agents: { name: 'Agents', color: '#3b82f6' },
        prompts: { name: 'Prompts', color: '#10b981' },
        commands: { name: 'Commands', color: '#f59e0b' },
        instructions: { name: 'Instructions', color: '#8b5cf6' },
        markdown: { name: 'Markdown', color: '#6b7280' }
      },
      patterns: []
    },
    contentMap,
    stats,
    filteredContent: {
      all: contentTree,
      agents: filterByTags(contentTree, ['agents']),
      prompts: filterByTags(contentTree, ['prompts']),
      commands: filterByTags(contentTree, ['commands']),
      instructions: filterByTags(contentTree, ['instructions'])
    }
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\n📦 Created content-data.json with ${Object.keys(contentMap).length} files`);
  console.log(`💾 File saved to: ${outputPath}`);
  
  return true;
}

console.log('🧪 Testing Content Management System');
console.log('====================================');

if (testContentDirectory()) {
  createBasicContentData();
  console.log('\n🎉 Content system test completed successfully!');
} else {
  console.log('\n❌ Content system test failed');
  process.exit(1);
}