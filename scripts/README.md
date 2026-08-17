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

### 🔍 站內搜尋
搜尋已改用 `@easyops-cn/docusaurus-search-local`（設定於 `docusaurus.config.ts` 的 `themes`），
索引在 build 時自動產生。原本的 `build-search-index.js` 從未接進 build 流程，
且會寫出與外掛衝突的 `static/search-index.json` 與 `src/pages/search.md`，已移除。

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
