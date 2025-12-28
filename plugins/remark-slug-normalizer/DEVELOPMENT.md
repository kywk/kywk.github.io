# Development Guide

## Plugin Structure

Each plugin follows the standard structure:

```
remark-slug-normalizer/
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
   npm link remark-slug-normalizer
   ```

## Testing

Test the plugin in a Docusaurus project:

1. Add to `docusaurus.config.js`
2. Create test files with spaces in paths
3. Run `npm start` to see slug injection

## Plugin API

The plugin exports two main functions:

```javascript
// Utility function
function normalizeSlug(urlPath) {
  // Normalize path
}

// Remark plugin
function remarkSlugNormalizer(options = {}) {
  return (tree, file) => {
    // Transform AST and inject slugs
  };
}
```

## Publishing

1. Update version in `package.json`
2. Run `npm publish`

## Integration

This plugin is designed to work with:
- Docusaurus 3.x
- Multiple content directories
- Existing frontmatter preservation
