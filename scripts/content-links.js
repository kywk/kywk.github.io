/**
 * Published-content link index shared by Docusaurus remark plugins.
 *
 * Obsidian resolves a wikilink by note name, while Docusaurus publishes a
 * route derived from the file path.  Keep those two concerns in one index so
 * docs and blog links use the same route derivation and collision rules.
 */

const fs = require('fs');
const path = require('path');
const { deriveSlug, normalizePath } = require('../plugins/remark-slug-normalizer/src/index.js');

function collectMarkdownFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;

  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name.startsWith('.') || item.name === 'node_modules') continue;
      collectMarkdownFiles(fullPath, out);
    } else if (item.isFile() && /\.mdx?$/.test(item.name)) {
      out.push(fullPath);
    }
  }
  return out;
}

function stripExtension(value) {
  return String(value).replace(/\.mdx?$/i, '');
}

function cleanLookupValue(value) {
  return stripExtension(String(value).trim())
    .replace(/\\/g, '/')
    .replace(/^\.\//, '')
    .replace(/^\/+|\/+$/g, '');
}

/**
 * Generate the variants Obsidian users commonly type for a note name/path.
 * The normalized variant is also the same form used by deriveSlug().
 */
function lookupVariants(value) {
  const clean = cleanLookupValue(value);
  if (!clean) return [];

  const normalized = normalizePath(clean);
  return [
    clean,
    clean.toLowerCase(),
    clean.replace(/ /g, '-'),
    clean.replace(/ /g, '-').toLowerCase(),
    clean.replace(/ /g, '_'),
    clean.replace(/ /g, '_').toLowerCase(),
    clean.replace(/-/g, ' '),
    clean.replace(/-/g, ' ').toLowerCase(),
    clean.replace(/ /g, ''),
    clean.replace(/ /g, '').toLowerCase(),
    normalized,
    normalized.replace(/-/g, ' '),
    normalized.replace(/-/g, '_'),
  ].filter(Boolean);
}

function addLookupKeys(map, value, entry) {
  for (const variant of lookupVariants(value)) {
    const key = variant.toLowerCase();
    const entries = map.get(key) || [];
    if (!entries.includes(entry)) entries.push(entry);
    map.set(key, entries);
  }
}

function joinRoute(routeBasePath, slug) {
  const route = `/${routeBasePath}/${String(slug).replace(/^\/+/, '')}`.replace(/\/+/g, '/');
  return route.endsWith('/') ? route : `${route}/`;
}

function createContentLinkIndex({ root, docsConfig, blogConfig }) {
  const docsPaths = docsConfig.map((doc) => doc.path);
  const blogPaths = blogConfig.map((blog) => blog.path);
  const configs = [
    ...docsConfig.map((config) => ({ ...config, kind: 'docs' })),
    ...blogConfig.map((config) => ({ ...config, kind: 'blog' })),
  ];
  const entries = [];
  const lookup = new Map();

  for (const config of configs) {
    const basePath = path.join(root, config.path);
    for (const filePath of collectMarkdownFiles(basePath)) {
      const relPath = path.relative(root, filePath).split(path.sep).join('/');
      const relWithoutExtension = stripExtension(relPath);
      const insidePath = relWithoutExtension.slice(`${config.path}/`.length);
      const basename = path.basename(insidePath);
      const derived = deriveSlug({ relPath, docsPaths, blogPaths });
      if (!derived.slug) continue;

      const entry = {
        kind: config.kind,
        vault: config.path,
        relPath,
        insidePath,
        basename,
        route: joinRoute(config.routeBasePath, derived.slug),
      };
      entries.push(entry);

      // Full vault path, vault-relative path, and basename all work.  The
      // basename is intentionally allowed to have multiple matches so the
      // resolver can reject ambiguous wikilinks instead of silently choosing.
      addLookupKeys(lookup, relWithoutExtension, entry);
      addLookupKeys(lookup, insidePath, entry);
      addLookupKeys(lookup, basename, entry);
      // Blog filenames commonly carry a month/day prefix, while Obsidian
      // links normally use the post title (the final slug segment).
      addLookupKeys(lookup, derived.slug, entry);
      const slugTail = derived.slug.split('/').filter(Boolean).pop();
      if (slugTail) addLookupKeys(lookup, slugTail, entry);
    }
  }

  return {
    entries,
    permalinks: entries.map((entry) => entry.route),
    resolve(name) {
      const target = cleanLookupValue(name).split('#', 1)[0];
      const matches = lookup.get(target.toLowerCase()) || [];
      return [...new Set(matches)];
    },
  };
}

function createWikiPageResolver(index, { strict = false, context = 'content' } = {}) {
  return (name) => {
    const matches = index.resolve(name);
    if (matches.length === 1) return [matches[0].route];

    if (strict) {
      if (!matches.length) {
        throw new Error(`Unresolved Obsidian link in ${context}: [[${name}]]`);
      }
      throw new Error(
        `Ambiguous Obsidian link in ${context}: [[${name}]] -> ${matches.map((entry) => entry.relPath).join(', ')}`,
      );
    }

    // Keep the historical docs behaviour for now: existing docs contain old
    // links that are reported by Docusaurus as warnings and will be migrated
    // separately.  New blog links use strict mode below.
    return [cleanLookupValue(name).replace(/ /g, '-').toLowerCase()];
  };
}

module.exports = {
  createContentLinkIndex,
  createWikiPageResolver,
  lookupVariants,
};
