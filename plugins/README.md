# Plugins Directory

This directory contains custom plugins for the Obsidian + Docusaurus integration.

## Remark Plugins

### remark-obsidian-kanban/
Renders Obsidian Kanban boards in Docusaurus.
- Detects `kanban-plugin: board` frontmatter
- Converts Markdown task lists to interactive boards
- Supports wiki-link resolution

### remark-obsidian-leaflet/
Renders interactive Leaflet maps in Docusaurus.
- Processes `leaflet` code blocks
- Supports `markerFolder` for automatic marker loading
- Dark/light theme switching
- Chinese title and link support

### slug-normalizer.js
Unified slug normalization module providing:
- `normalizeSlug()` utility function for file mapping
- `remarkSlugNormalizer` remark plugin for automatic slug injection
- Converts spaces to hyphens for SEO-friendly URLs

## Usage

These plugins are automatically loaded in `docusaurus.config.ts`:

```typescript
const { remarkKanban } = require("./plugins/remark-obsidian-kanban/src/index.js");
const remarkLeaflet = require("./plugins/remark-obsidian-leaflet/src/index.js");
const { normalizeSlug, remarkSlugNormalizer } = require("./plugins/remark-slug-normalizer/src/index.js");
```
