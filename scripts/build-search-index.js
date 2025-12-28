#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIRS = ['backpacker', 'lifehacker', 'moco', 'blog.life', 'blog.news'];
const OUTPUT_FILE = 'static/search-index.json';

const searchIndex = {
  documents: [],
  metadata: {
    generatedAt: new Date().toISOString(),
    totalDocuments: 0,
    categories: {}
  }
};

function extractTextContent(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/\[\[([^\]]+)\]\]/g, '$1') // Convert wiki links to text
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/[*_~`]/g, '') // Remove formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
}

function processFile(filePath, category) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: body } = matter(content);
    
    const relativePath = path.relative(process.cwd(), filePath);
    const urlPath = relativePath
      .replace(/\.md$/, '')
      .replace(/\\/g, '/')
      .replace(/ /g, '-')
      .toLowerCase();
    
    const textContent = extractTextContent(body);
    const excerpt = textContent.substring(0, 200) + (textContent.length > 200 ? '...' : '');
    
    const document = {
      id: relativePath,
      title: frontmatter.title || path.basename(filePath, '.md'),
      url: `/${category}/${urlPath}/`,
      category: category,
      tags: frontmatter.tags || [],
      date: frontmatter.date || null,
      excerpt: excerpt,
      content: textContent.substring(0, 1000), // Limit content for search
      wordCount: textContent.split(/\s+/).length
    };
    
    searchIndex.documents.push(document);
    
    // Update category stats
    if (!searchIndex.metadata.categories[category]) {
      searchIndex.metadata.categories[category] = 0;
    }
    searchIndex.metadata.categories[category]++;
    
  } catch (error) {
    console.log(`⚠️  Error processing ${filePath}: ${error.message}`);
  }
}

function scanDirectory(dir, category) {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      scanDirectory(fullPath, category);
    } else if (item.isFile() && item.name.endsWith('.md')) {
      processFile(fullPath, category);
    }
  }
}

console.log('🔍 Building search index...\n');

CONTENT_DIRS.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Indexing ${dir}/`);
    scanDirectory(dir, dir);
  }
});

// Sort documents by date (newest first)
searchIndex.documents.sort((a, b) => {
  if (!a.date && !b.date) return 0;
  if (!a.date) return 1;
  if (!b.date) return -1;
  return new Date(b.date) - new Date(a.date);
});

searchIndex.metadata.totalDocuments = searchIndex.documents.length;

// Ensure static directory exists
const staticDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Write search index
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(searchIndex, null, 2));

console.log(`\n📊 Search Index Results:`);
console.log(`Total documents indexed: ${searchIndex.metadata.totalDocuments}`);
console.log(`Categories:`);
Object.entries(searchIndex.metadata.categories).forEach(([category, count]) => {
  console.log(`  - ${category}: ${count} documents`);
});
console.log(`\n✅ Search index saved to ${OUTPUT_FILE}`);

// Generate simple search page
const searchPageContent = `---
title: Search
---

# Search

<div id="search-container">
  <input type="text" id="search-input" placeholder="Search content..." />
  <div id="search-results"></div>
</div>

<script>
async function loadSearchIndex() {
  const response = await fetch('/search-index.json');
  return await response.json();
}

function performSearch(query, documents) {
  if (!query.trim()) return [];
  
  const terms = query.toLowerCase().split(/\\s+/);
  
  return documents
    .map(doc => {
      let score = 0;
      const titleLower = doc.title.toLowerCase();
      const contentLower = doc.content.toLowerCase();
      
      terms.forEach(term => {
        if (titleLower.includes(term)) score += 10;
        if (contentLower.includes(term)) score += 1;
        if (doc.tags.some(tag => tag.toLowerCase().includes(term))) score += 5;
      });
      
      return { ...doc, score };
    })
    .filter(doc => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}

document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchIndex = await loadSearchIndex();
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    const results = performSearch(query, searchIndex.documents);
    
    if (results.length === 0 && query.trim()) {
      searchResults.innerHTML = '<p>No results found.</p>';
    } else if (results.length > 0) {
      searchResults.innerHTML = results.map(doc => \`
        <div style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 4px;">
          <h3><a href="\${doc.url}">\${doc.title}</a></h3>
          <p><small>\${doc.category} • \${doc.wordCount} words</small></p>
          <p>\${doc.excerpt}</p>
        </div>
      \`).join('');
    } else {
      searchResults.innerHTML = '';
    }
  });
});
</script>
`;

fs.writeFileSync('src/pages/search.md', searchPageContent);
console.log('✅ Search page created at src/pages/search.md');
