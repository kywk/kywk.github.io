# remark-obsidian-leaflet

A Docusaurus plugin to render Obsidian Leaflet maps as interactive maps in your documentation.

## Features

- 🗺️ Renders Obsidian Leaflet code blocks as interactive maps
- 📍 Supports automatic marker loading from markdown files
- 🌓 Dark/light theme switching
- 🔗 Wiki-link integration
- 🌏 Chinese title and link support

## Installation

```bash
npm install remark-obsidian-leaflet
```

## Usage

Add the plugin to your `docusaurus.config.js`:

```javascript
const remarkLeaflet = require('remark-obsidian-leaflet');

module.exports = {
  // ... other config
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          remarkPlugins: [
            [remarkLeaflet, { routeBase: '/docs/' }]
          ],
        },
      },
    ],
  ],
};
```

## Markdown Syntax

Create interactive maps using leaflet code blocks:

````markdown
```leaflet
id: my-map
lat: 25.0330
long: 121.5654
defaultZoom: 12
markerFolder: docs/places
```
````

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `routeBase` | string | `''` | Base route for wiki-link resolution |

## Map Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | string | `'leaflet-map'` | Unique map identifier |
| `lat` | number | `25.0330` | Map center latitude |
| `long` | number | `121.5654` | Map center longitude |
| `defaultZoom` | number | `12` | Initial zoom level |
| `markerFolder` | string | `''` | Folder to scan for marker files |

## Requirements

- Leaflet CSS and JS must be included in your site
- Marker files should have `location` frontmatter with lat/lng coordinates

## License

MIT
