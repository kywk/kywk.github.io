# Development Guide

## Plugin Structure

Each plugin follows the standard structure:

```
remark-obsidian-leaflet/
├── src/
│   └── index.js          # Main plugin code
├── package.json          # Package configuration
├── README.md            # Usage documentation
└── DEVELOPMENT.md       # This file
```

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Link for local development:**
   ```bash
   npm link
   cd /path/to/docusaurus-project
   npm link remark-obsidian-leaflet
   ```

## Testing

Test the plugin in a Docusaurus project:

1. Add to `docusaurus.config.js`
2. Create test markdown with leaflet code blocks
3. Run `npm start` to see results

## Plugin API

The plugin exports a single function that returns a remark transformer:

```javascript
function remarkLeaflet(options = {}) {
  return (tree, file) => {
    // Transform AST
  };
}
```

## Publishing

1. Update version in `package.json`
2. Run `npm publish`

## Integration

This plugin is designed to work with:
- Docusaurus 3.x
- Obsidian Leaflet syntax
- Wiki-link resolution
