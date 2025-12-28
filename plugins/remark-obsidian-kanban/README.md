# remark-obsidian-kanban

A remark plugin for Docusaurus that renders Obsidian Kanban markdown files as interactive kanban boards.

## Installation

```bash
npm install remark-obsidian-kanban
```

## Usage

Add the remark plugin to your Docusaurus configuration:

```typescript
const { remarkKanban } = require("remark-obsidian-kanban/src/index.js");

module.exports = {
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        remarkPlugins: [
          remarkKanban, // Add as first plugin
          // ... other remark plugins
        ],
      },
    ],
  ],
};
```

## Obsidian Kanban Format

Create markdown files with kanban frontmatter:

```markdown
---
kanban-plugin: board
title: My Kanban Board
---

## To Do

- [ ] Task 1
- [ ] Task 2

## In Progress

- [ ] Task 3
- [x] Completed task

## Done

- [x] Finished task
```

## Features

- ✅ Detects kanban files via `kanban-plugin: board` frontmatter
- ✅ Converts H2 headings to kanban columns
- ✅ Renders task lists as interactive cards
- ✅ Shows task count per column
- ✅ Full-width display with hidden TOC
- ✅ Filters kanban settings blocks
- ✅ Supports checked/unchecked tasks

## License

MIT