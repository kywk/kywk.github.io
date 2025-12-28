# remark-slug-normalizer

A Docusaurus plugin to normalize URL slugs by converting spaces to dashes for SEO-friendly URLs.

## Features

- 🔗 Automatically normalizes file paths with spaces
- 📝 Injects `slug` frontmatter for clean URLs
- ⚡ Works with multiple content directories
- 🎯 Preserves existing slugs
- 🛠️ Provides utility function for file mapping

## Installation

```bash
npm install remark-slug-normalizer
```

## Usage

Add the plugin to your `docusaurus.config.js`:

```javascript
const { normalizeSlug, remarkSlugNormalizer } = require('remark-slug-normalizer');

module.exports = {
  // ... other config
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          remarkPlugins: [remarkSlugNormalizer],
        },
      },
    ],
  ],
};
```

## API

### `remarkSlugNormalizer(options)`

Remark plugin that automatically injects normalized slugs.

**Options:**
- None currently supported

### `normalizeSlug(urlPath)`

Utility function to normalize URL paths.

**Parameters:**
- `urlPath` (string): Path to normalize

**Returns:**
- Normalized path with spaces converted to dashes

**Example:**
```javascript
const { normalizeSlug } = require('remark-slug-normalizer');

console.log(normalizeSlug('My File Name')); // 'My-File-Name'
console.log(normalizeSlug('path/with spaces/file')); // 'path/with-spaces/file'
```

## How it Works

1. **Detection**: Scans file paths for spaces
2. **Normalization**: Converts spaces to dashes
3. **Injection**: Adds `slug` frontmatter if not present
4. **Preservation**: Skips files that already have slugs

## Supported Directories

- `backpacker/`
- `lifehacker/`
- `moco/`
- `blog.life/`
- `blog.news/`

## Example

**File path:** `docs/My Project/Getting Started.md`

**Generated frontmatter:**
```yaml
---
slug: /My-Project/Getting-Started/
---
```

**Result URL:** `/docs/My-Project/Getting-Started/`

## License

MIT
