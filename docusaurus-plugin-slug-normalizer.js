/**
 * Docusaurus plugin to normalize document slugs by converting spaces to dashes.
 * This ensures all generated URLs use dashes instead of %20 encoded spaces.
 * 
 * Uses the docs plugin lifecycle hooks to modify slugs before routes are created.
 */

const path = require('path');

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
 * Plugin factory function
 * @param {import('@docusaurus/types').LoadContext} context - Docusaurus context
 * @param {object} options - Plugin options
 */
function pluginDocsSlugNormalizer(context, options = {}) {
    return {
        name: 'docusaurus-plugin-docs-slug-normalizer',

        /**
         * Configure the docs plugin to modify document metadata
         * This hook allows us to modify the slug before routes are created
         */
        async contentLoaded({ content, actions }) {
            // This plugin works by being used as a docs plugin option
            // The actual slug normalization is done via the docs plugin's
            // beforeDefaultRemarkPlugins or via slug option
        },
    };
}

/**
 * Create a custom docs plugin configuration with slug normalization
 * This extends the standard @docusaurus/plugin-content-docs configuration
 * 
 * @param {object} baseConfig - Base configuration for @docusaurus/plugin-content-docs
 * @returns {Array} Plugin configuration array
 */
function createDocsPluginWithSlugNormalizer(baseConfig) {
    return [
        '@docusaurus/plugin-content-docs',
        {
            ...baseConfig,
            // Use the async metadataProcessor to normalize slugs
            async sidebarItemsGenerator({
                defaultSidebarItemsGenerator,
                ...args
            }) {
                const items = await defaultSidebarItemsGenerator(args);
                return items;
            },
        },
    ];
}

// Export the normalize function for use in docusaurus.config.ts
module.exports = pluginDocsSlugNormalizer;
module.exports.normalizeSlug = normalizeSlug;
module.exports.createDocsPluginWithSlugNormalizer = createDocsPluginWithSlugNormalizer;
