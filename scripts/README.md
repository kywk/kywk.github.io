# Content Management Scripts

This directory contains automation scripts for content validation, optimization, and indexing.

## Scripts Overview

### 📋 content-validator.js
Validates markdown files for:
- Required frontmatter fields (title)
- Broken wiki links
- Files with spaces but no slug
- Empty or too-short content
- Parse errors

**Usage:**
```bash
npm run content:check
```

### 🖼️ optimize-images.js
Optimizes images by:
- Resizing to max 1920px width
- Compressing with 85% quality
- Supporting JPG, PNG, WebP formats
- Skipping files < 100KB

**Requirements:**
- ImageMagick (`brew install imagemagick`) OR
- Sharp (`npm install sharp`)

**Usage:**
```bash
npm run content:optimize
```

### 🔍 build-search-index.js
Builds search functionality:
- Indexes all markdown content
- Generates JSON search index
- Creates search page with client-side search
- Extracts titles, excerpts, tags

**Usage:**
```bash
npm run content:index
```

## Automation

Add to `.git/hooks/pre-commit`:
```bash
#!/bin/sh
npm run content:check
node scripts/inject-slug-frontmatter.js
```

## Dependencies

Scripts use existing project dependencies:
- `gray-matter` (already installed)
- `fs`, `path`, `child_process` (Node.js built-in)
