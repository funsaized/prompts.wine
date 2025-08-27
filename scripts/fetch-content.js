#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');
const { createWriteStream, createReadStream } = require('fs');

/**
 * GitHub Content Fetcher
 * Downloads content from https://github.com/funsaized/prompts and extracts to /content
 */

const GITHUB_REPO = 'funsaized/prompts';
const BRANCH = 'main';
const CONTENT_DIR = path.join(process.cwd(), 'content');
const TEMP_DIR = path.join(process.cwd(), '.temp');

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    const request = https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`Request failed with status: ${response.statusCode}`));
        return;
      }
      
      pipeline(response, file).then(resolve).catch(reject);
    });
    
    request.on('error', (err) => {
      file.close();
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function extractTarGz(tarPath, extractPath) {
  const tar = require('tar');
  return tar.x({
    file: tarPath,
    cwd: extractPath,
    strip: 1, // Remove the top-level directory from the archive
  });
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyDirectory(src, dest) {
  ensureDirectoryExists(dest);
  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function cleanupTempFiles() {
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
}

async function main() {
  try {
    console.log('🚀 Starting content fetch from GitHub...');
    
    // Clean up any existing temp files
    cleanupTempFiles();
    ensureDirectoryExists(TEMP_DIR);
    
    // Download archive
    const archiveUrl = `https://github.com/${GITHUB_REPO}/archive/${BRANCH}.tar.gz`;
    const archivePath = path.join(TEMP_DIR, 'repo.tar.gz');
    const extractPath = path.join(TEMP_DIR, 'extracted');
    
    console.log(`📥 Downloading from: ${archiveUrl}`);
    await downloadFile(archiveUrl, archivePath);
    console.log('✅ Download complete');
    
    // Extract archive
    console.log('📦 Extracting archive...');
    ensureDirectoryExists(extractPath);
    await extractTarGz(archivePath, extractPath);
    console.log('✅ Extraction complete');
    
    // Clean existing content directory
    if (fs.existsSync(CONTENT_DIR)) {
      fs.rmSync(CONTENT_DIR, { recursive: true, force: true });
    }
    ensureDirectoryExists(CONTENT_DIR);
    
    // Copy content to destination
    console.log('📁 Copying content to /content directory...');
    copyDirectory(extractPath, CONTENT_DIR);
    console.log('✅ Content copy complete');
    
    // Verify important files exist
    const definitionsPath = path.join(CONTENT_DIR, 'definitions.yaml');
    if (fs.existsSync(definitionsPath)) {
      console.log('✅ definitions.yaml found');
    } else {
      console.log('⚠️  definitions.yaml not found - tagging may not work properly');
    }
    
    // Count files
    const countFiles = (dir) => {
      let count = 0;
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
          count += countFiles(itemPath);
        } else {
          count++;
        }
      }
      return count;
    };
    
    const fileCount = countFiles(CONTENT_DIR);
    console.log(`📊 Total files downloaded: ${fileCount}`);
    
    // Cleanup temp files
    cleanupTempFiles();
    
    console.log('🎉 Content fetch completed successfully!');
    console.log(`Content available in: ${CONTENT_DIR}`);
    
    // Generate static content data
    console.log('⚡ Generating static content data...');
    try {
      const { generateStaticContentData, saveStaticContentData } = require('../src/lib/server-content');
      const contentData = await generateStaticContentData();
      await saveStaticContentData(contentData);
      console.log('✅ Static content data generated!');
    } catch (buildError) {
      console.error('⚠️  Warning: Failed to generate static content data:', buildError.message);
      console.log('Content fetched successfully, but build-time optimization failed.');
    }
    
  } catch (error) {
    console.error('❌ Error fetching content:', error.message);
    cleanupTempFiles();
    process.exit(1);
  }
}

// Check if tar is available
try {
  require('tar');
} catch (error) {
  console.error('❌ Missing dependency: tar');
  console.log('Install with: npm install tar');
  process.exit(1);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main };