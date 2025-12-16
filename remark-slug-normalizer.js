const { visit } = require('unist-util-visit');

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
 * Remark plugin to normalize slugs by injecting `slug` frontmatter
 * for documents in paths containing spaces.
 * 
 * This ensures all URLs use dashes instead of %20 encoded spaces.
 */
function remarkSlugNormalizer(options = {}) {
    const { routeBase = '' } = options;

    return (tree, file) => {
        // Get the file path from VFile
        const filePath = file.path || file.history?.[0] || '';

        // Skip if no file path or path doesn't contain spaces
        if (!filePath) return;

        // Check if path contains spaces (needs normalization)
        const relativePath = filePath.replace(/\.mdx?$/, '');
        const needsNormalization = / /.test(relativePath);

        if (!needsNormalization) return;

        // Find or create YAML frontmatter node
        let yamlNode = null;
        let yamlIndex = -1;

        for (let i = 0; i < tree.children.length; i++) {
            if (tree.children[i].type === 'yaml') {
                yamlNode = tree.children[i];
                yamlIndex = i;
                break;
            }
        }

        // If there's already a slug defined in frontmatter, don't override
        if (yamlNode && /^slug:/m.test(yamlNode.value)) {
            return;
        }

        // Calculate the normalized slug
        // Extract the relative path within the docs folder
        const pathParts = relativePath.split('/');
        // Find the docs folder (backpacker, lifehacker, moco)
        const docsFolders = ['backpacker', 'lifehacker', 'moco', 'blog.life', 'blog.news'];
        let docsIndex = -1;
        for (let i = 0; i < pathParts.length; i++) {
            if (docsFolders.includes(pathParts[i])) {
                docsIndex = i;
                break;
            }
        }

        if (docsIndex === -1) return;

        // Get the path after the docs folder
        const pathAfterDocs = pathParts.slice(docsIndex + 1).join('/');
        const normalizedPath = normalizeSlug(pathAfterDocs);

        // Inject slug into frontmatter
        if (yamlNode) {
            // Append slug to existing frontmatter
            yamlNode.value = `slug: /${normalizedPath}/\n${yamlNode.value}`;
        } else {
            // Create new frontmatter with slug
            const newYaml = {
                type: 'yaml',
                value: `slug: /${normalizedPath}/`
            };
            tree.children.unshift(newYaml);
        }
    };
}

module.exports = remarkSlugNormalizer;
module.exports.remarkSlugNormalizer = remarkSlugNormalizer;
module.exports.normalizeSlug = normalizeSlug;
