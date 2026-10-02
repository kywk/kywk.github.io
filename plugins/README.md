# Plugins Directory

This directory contains custom plugins for the Obsidian + Docusaurus integration.

## Remark Plugins

### remark-obsidian-kanban/
Renders Obsidian Kanban boards in Docusaurus.
- Detects `kanban-plugin: board` frontmatter
- Converts Markdown task lists to interactive boards
- Supports wiki-link resolution

### slug-normalizer.js
Unified slug normalization module providing:
- `normalizeSlug()` utility function for file mapping
- `remarkSlugNormalizer` remark plugin for automatic slug injection
- Converts spaces to hyphens for SEO-friendly URLs

## Feature Plugins

### docusaurus-plugin-album/
Pinterest-style photo album plugin for Docusaurus with Google Photos timeline scrubber and lightbox.
- Wraps `@docusaurus/plugin-content-blog` via Wrapper Pattern
- Pinterest responsive masonry grid layout with mouse hover info overlay
- Google Photos-style floating timeline scrubber with year navigation
- Immersive Hero Header with cover image, location, and series badges
- Lightweight, zero-dependency full-screen photo lightbox with keyboard navigation and avatar exclusion

## Usage

These plugins are automatically loaded in `docusaurus.config.ts`:

```typescript
const { remarkKanban } = require("./plugins/remark-obsidian-kanban/src/index.js");
const { normalizeSlug, remarkSlugNormalizer } = require("./plugins/remark-slug-normalizer/src/index.js");
```

## StoryMap (external package)

`story-map` and `leaflet` fenced blocks are **not** handled by a local plugin.
`@story-map/remark-story-map` owns both dialects, and the site only supplies glue:

- `remark-story-map-loader.cjs` — loads the ESM package through Node's native
  `require(esm)`. Docusaurus reads the config through jiti, whose CJS interop
  drops `story-map-core`'s named `zod` exports.
- `story-map-client/` — registers the package's browser client (one Leaflet
  runtime for the whole page) plus this site's full-page StoryMap view.

The site also owns published-route resolution (`scripts/content-links.js`),
which the package consumes through the `resolveNoteHref` callback rather than
reimplementing Docusaurus slug policy.
