# AI Assistant Prompt for Remark Obsidian Kanban Plugin

## Context
You are working on a remark plugin that converts Obsidian Kanban markdown files into interactive kanban boards. The plugin is located at `remark-obsidian-kanban/`.

## Current Implementation
- **Plugin Type**: Remark plugin (NOT Docusaurus plugin)
- **Trigger**: Files with `kanban-plugin: board` in frontmatter
- **Logic**: H2 headings → columns, task lists → cards
- **Integration**: Added to `remarkPlugins` array as first plugin

## Key Files
- `src/index.js` - Main plugin logic with `remarkKanban` function
- `package.json` - NPM package configuration
- `README.md` / `README-CH.md` - Documentation

## Working Configuration
```typescript
const { remarkKanban } = require("./remark-obsidian-kanban/src/index.js");

remarkPlugins: [
  remarkKanban, // MUST be first
  // other plugins...
],
```

## Current Features ✅
- Detects kanban files via frontmatter
- Converts H2 → columns, tasks → cards
- Shows task counts per column
- Hides TOC for full-width display
- Filters kanban settings blocks
- Supports checked/unchecked tasks

## TODO List
- [ ] Improve card styling
- [ ] Add drag-and-drop functionality
- [ ] Support more Obsidian Kanban syntax
- [ ] Performance optimization
- [ ] Unit tests
- [ ] NPM publishing

## Critical Rules
1. Plugin MUST be first in remarkPlugins array
2. Use remark plugin approach, NOT Docusaurus plugin wrapper
3. CSS must be inlined in HTML output
4. Always test with `npm run build`

## When Helping
- Focus on minimal, working code
- Test changes with existing kanban files
- Maintain compatibility with Docusaurus 3.x
- Follow existing code patterns in `src/index.js`