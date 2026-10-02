const pluginContentBlog = require('@docusaurus/plugin-content-blog').default;
const { validateOptions: validateBlogOptions } = require('@docusaurus/plugin-content-blog');
const path = require('path');

/**
 * Docusaurus Plugin Album
 *
 * 以路徑一（Wrapper Pattern）封裝 @docusaurus/plugin-content-blog，
 * 提供專屬的 Pinterest 瀑布流、Google Photos 時光軸與無依賴全螢幕照片燈箱。
 */
function validateOptions({ validate, options = {} }) {
  const mergedOptions = {
    id: 'album',
    path: 'blog.album',
    routeBasePath: 'album',
    blogSidebarTitle: 'All albums',
    blogSidebarCount: 'ALL',
    postsPerPage: 'ALL',
    blogListComponent: path.resolve(__dirname, './src/theme/AlbumListPage'),
    blogPostComponent: path.resolve(__dirname, './src/theme/AlbumPostPage'),
    onUntruncatedBlogPosts: 'ignore',
    showReadingTime: true,
    ...options,
  };

  return validateBlogOptions({ validate, options: mergedOptions });
}

module.exports = async function pluginAlbum(context, options) {
  const blogPluginInstance = await pluginContentBlog(context, options);

  return {
    ...blogPluginInstance,
    name: 'docusaurus-plugin-album',
    getThemePath() {
      return path.resolve(__dirname, './src/theme');
    },
  };
};

module.exports.validateOptions = validateOptions;
