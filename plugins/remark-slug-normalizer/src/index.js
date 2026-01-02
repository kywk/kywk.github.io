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
        .map(segment => segment.replace(/ /g, '-').toLowerCase())
        .join('/');
}

/**
 * Remark plugin to normalize slugs by injecting `slug` frontmatter
 * for documents in paths containing spaces.
 */
function remarkSlugNormalizer(options = {}) {
    return (tree, file) => {
        const filePath = file.path || file.history?.[0] || '';
        if (!filePath) return;

        const relativePath = filePath.replace(/\.mdx?$/, '');
        const needsNormalization = / /.test(relativePath);
        if (!needsNormalization) return;

        // Find existing YAML frontmatter
        let yamlNode = null;
        for (let i = 0; i < tree.children.length; i++) {
            if (tree.children[i].type === 'yaml') {
                yamlNode = tree.children[i];
                break;
            }
        }

        // Skip if slug already exists
        if (yamlNode && /^slug:/m.test(yamlNode.value)) {
            return;
        }

        // Calculate normalized slug
        const pathParts = relativePath.split('/');
        const docsFolders = ['backpacker', 'lifehacker', 'moco', 'blog.life', 'blog.news'];
        let docsIndex = -1;
        for (let i = 0; i < pathParts.length; i++) {
            if (docsFolders.includes(pathParts[i])) {
                docsIndex = i;
                break;
            }
        }

        if (docsIndex === -1) return;

        const pathAfterDocs = pathParts.slice(docsIndex + 1).join('/');
        const normalizedPath = normalizeSlug(pathAfterDocs);

        // Inject slug into frontmatter
        if (yamlNode) {
            yamlNode.value = `slug: /${normalizedPath}/\n${yamlNode.value}`;
        } else {
            tree.children.unshift({
                type: 'yaml',
                value: `slug: /${normalizedPath}/`
            });
        }
    };
}

module.exports = {
    normalizeSlug,
    remarkSlugNormalizer
};
