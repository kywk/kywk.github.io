#!/usr/bin/env node
/**
 * Script to inject normalized slug frontmatter into Markdown files
 * in directories that contain spaces.
 * 
 * This is a one-time script that modifies files to add explicit slug
 * frontmatter, ensuring Docusaurus generates URLs with dashes instead of spaces.
 * 
 * Usage: node scripts/inject-slug-frontmatter.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Directories to process (relative to project root)
const DOC_DIRS = ['backpacker', 'lifehacker', 'moco'];

// Counter for tracking changes
let stats = {
    scanned: 0,
    modified: 0,
    skipped: 0,
    errors: 0
};

/**
 * Normalize a path by converting spaces to dashes in all segments
 * @param {string} urlPath - The path to normalize
 * @returns {string} Normalized path with spaces replaced by dashes
 */
function normalizeSlug(urlPath) {
    if (!urlPath) return urlPath;
    return urlPath
        .split('/')
        .map(segment => segment.replace(/ /g, '-'))
        .join('/');
}

/**
 * Check if a path contains spaces (needs normalization)
 * @param {string} filePath - File path to check
 * @returns {boolean} True if path contains spaces
 */
function needsNormalization(filePath) {
    return / /.test(filePath);
}

/**
 * Process a single markdown file
 * @param {string} filePath - Absolute path to the markdown file
 * @param {string} basePath - Base directory for calculating relative slug
 */
function processFile(filePath, basePath) {
    stats.scanned++;

    try {
        // Calculate relative path for slug
        const relativePath = path.relative(basePath, filePath);

        // Check if path needs normalization
        if (!needsNormalization(relativePath)) {
            stats.skipped++;
            return;
        }

        // Read and parse the file
        const content = fs.readFileSync(filePath, 'utf-8');
        const parsed = matter(content);

        // Skip if slug is already defined
        if (parsed.data.slug) {
            console.log(`  [SKIP] ${relativePath} - slug already defined`);
            stats.skipped++;
            return;
        }

        // Calculate the normalized slug
        const slugPath = relativePath.replace(/\.mdx?$/, '');
        const normalizedSlug = '/' + normalizeSlug(slugPath) + '/';

        // Add slug to frontmatter
        parsed.data.slug = normalizedSlug;

        // Reconstruct the file content
        const newContent = matter.stringify(parsed.content, parsed.data);

        // Write back to file
        fs.writeFileSync(filePath, newContent, 'utf-8');

        console.log(`  [MODIFIED] ${relativePath} -> slug: ${normalizedSlug}`);
        stats.modified++;

    } catch (error) {
        console.error(`  [ERROR] ${filePath}: ${error.message}`);
        stats.errors++;
    }
}

/**
 * Recursively scan a directory for markdown files
 * @param {string} dir - Directory to scan
 * @param {string} basePath - Base directory for calculating relative slug
 */
function scanDirectory(dir, basePath) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            // Skip node_modules and hidden directories
            if (item.name.startsWith('.') || item.name === 'node_modules') {
                continue;
            }
            scanDirectory(fullPath, basePath);
        } else if (item.isFile() && /\.mdx?$/.test(item.name)) {
            processFile(fullPath, basePath);
        }
    }
}

/**
 * Main function
 */
function main() {
    console.log('='.repeat(60));
    console.log('Injecting normalized slug frontmatter');
    console.log('='.repeat(60));
    console.log('');

    const projectRoot = path.resolve(__dirname, '..');

    for (const docDir of DOC_DIRS) {
        const fullPath = path.join(projectRoot, docDir);

        if (!fs.existsSync(fullPath)) {
            console.log(`[WARN] Directory not found: ${docDir}`);
            continue;
        }

        console.log(`\nProcessing: ${docDir}/`);
        console.log('-'.repeat(40));

        scanDirectory(fullPath, fullPath);
    }

    console.log('');
    console.log('='.repeat(60));
    console.log('Summary:');
    console.log(`  Scanned:  ${stats.scanned} files`);
    console.log(`  Modified: ${stats.modified} files`);
    console.log(`  Skipped:  ${stats.skipped} files`);
    console.log(`  Errors:   ${stats.errors} files`);
    console.log('='.repeat(60));
}

main();
