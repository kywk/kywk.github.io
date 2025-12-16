#!/usr/bin/env node
/**
 * Script to convert Markdown links to Wiki-links (Obsidian format)
 * 
 * Converts:
 *   [text](./file.md) → [[file|text]] or [[file]] if text equals filename
 *   [text](../path/file.md) → [[file|text]]
 *   [text](./path/file.md) → [[file|text]]
 * 
 * Usage: node scripts/convert-to-wikilinks.js
 */

const fs = require('fs');
const path = require('path');

// Directories to process
const DOC_DIRS = ['backpacker', 'lifehacker', 'moco'];

// Stats
let stats = {
    scanned: 0,
    modified: 0,
    linksConverted: 0,
    skipped: 0,
    errors: 0
};

/**
 * Convert a Markdown link to wiki-link format
 * @param {string} match - The full matched link
 * @param {string} text - The link text
 * @param {string} url - The link URL
 * @returns {string} Wiki-link format
 */
function convertToWikiLink(match, text, url) {
    // Skip external links, anchors, and non-.md files
    if (url.startsWith('http') || url.startsWith('#') || !url.endsWith('.md')) {
        return match;
    }

    // Skip if not a relative link
    if (!url.startsWith('./') && !url.startsWith('../')) {
        return match;
    }

    // Extract filename without extension and path
    const decodedUrl = decodeURIComponent(url);
    const fileName = path.basename(decodedUrl, '.md');

    // If text equals filename (case-insensitive), use simple wiki-link
    if (text.toLowerCase() === fileName.toLowerCase()) {
        stats.linksConverted++;
        return `[[${fileName}]]`;
    }

    // Otherwise, use alias format
    stats.linksConverted++;
    return `[[${fileName}|${text}]]`;
}

/**
 * Process a single file
 * @param {string} filePath - Path to the file
 */
function processFile(filePath) {
    stats.scanned++;

    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        const originalContent = content;

        // Regex to match Markdown links: [text](url)
        // Captures: [1] = text, [2] = url
        const linkRegex = /\[([^\]]+)\]\(([^)]+\.md)\)/g;

        content = content.replace(linkRegex, (match, text, url) => {
            return convertToWikiLink(match, text, url);
        });

        // Check if content changed
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`  [MODIFIED] ${path.relative(process.cwd(), filePath)}`);
            stats.modified++;
        } else {
            stats.skipped++;
        }
    } catch (error) {
        console.error(`  [ERROR] ${filePath}: ${error.message}`);
        stats.errors++;
    }
}

/**
 * Recursively scan a directory for markdown files
 * @param {string} dir - Directory to scan
 */
function scanDirectory(dir) {
    try {
        const items = fs.readdirSync(dir, { withFileTypes: true });

        for (const item of items) {
            const fullPath = path.join(dir, item.name);

            if (item.isDirectory()) {
                // Skip hidden directories and node_modules
                if (item.name.startsWith('.') || item.name === 'node_modules') {
                    continue;
                }
                scanDirectory(fullPath);
            } else if (item.isFile() && /\.mdx?$/.test(item.name)) {
                processFile(fullPath);
            }
        }
    } catch (error) {
        console.error(`Failed to scan ${dir}: ${error.message}`);
    }
}

/**
 * Main function
 */
function main() {
    console.log('='.repeat(60));
    console.log('Converting Markdown links to Wiki-links');
    console.log('='.repeat(60));
    console.log('');

    for (const docDir of DOC_DIRS) {
        if (!fs.existsSync(docDir)) {
            console.log(`[WARN] Directory not found: ${docDir}`);
            continue;
        }

        console.log(`\nProcessing: ${docDir}/`);
        console.log('-'.repeat(40));

        scanDirectory(docDir);
    }

    console.log('');
    console.log('='.repeat(60));
    console.log('Summary:');
    console.log(`  Scanned:    ${stats.scanned} files`);
    console.log(`  Modified:   ${stats.modified} files`);
    console.log(`  Converted:  ${stats.linksConverted} links`);
    console.log(`  Skipped:    ${stats.skipped} files (no changes)`);
    console.log(`  Errors:     ${stats.errors} files`);
    console.log('='.repeat(60));
}

main();
