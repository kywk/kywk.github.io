#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIRS = ['backpacker', 'lifehacker', 'moco', 'blog.life', 'blog.news'];
const REQUIRED_FRONTMATTER = ['title'];
const ISSUES = [];

function validateFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: body } = matter(content);
    
    // Check required frontmatter
    REQUIRED_FRONTMATTER.forEach(field => {
      if (!frontmatter[field]) {
        ISSUES.push(`❌ ${filePath}: Missing required field '${field}'`);
      }
    });
    
    // Check for broken wiki links
    const wikiLinks = body.match(/\[\[([^\]]+)\]\]/g) || [];
    wikiLinks.forEach(link => {
      const linkText = link.slice(2, -2).split('|')[0];
      if (linkText.includes('http') || linkText.includes('www')) {
        ISSUES.push(`⚠️  ${filePath}: Suspicious wiki link '${link}'`);
      }
    });
    
    // Check for spaces in file path (should use slugs)
    if (filePath.includes(' ') && !frontmatter.slug) {
      ISSUES.push(`⚠️  ${filePath}: File path contains spaces but no slug defined`);
    }
    
    // Check for empty content
    if (body.trim().length < 50) {
      ISSUES.push(`⚠️  ${filePath}: Content too short (${body.trim().length} chars)`);
    }
    
  } catch (error) {
    ISSUES.push(`❌ ${filePath}: Parse error - ${error.message}`);
  }
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      scanDirectory(fullPath);
    } else if (item.isFile() && item.name.endsWith('.md')) {
      validateFile(fullPath);
    }
  }
}

console.log('🔍 Validating content...\n');

CONTENT_DIRS.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Scanning ${dir}/`);
    scanDirectory(dir);
  }
});

console.log(`\n📊 Validation Results:`);
console.log(`Total issues found: ${ISSUES.length}`);

if (ISSUES.length > 0) {
  console.log('\n🚨 Issues:');
  ISSUES.forEach(issue => console.log(issue));
  process.exit(1);
} else {
  console.log('✅ All content validated successfully!');
}
