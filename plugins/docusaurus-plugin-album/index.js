const pluginContentBlog = require('@docusaurus/plugin-content-blog').default;
const { validateOptions: validateBlogOptions } = require('@docusaurus/plugin-content-blog');
const path = require('path');

/**
 * 建置期 Rehype 插件：為相簿文章內文所有 <img> 預先注入 loading="lazy" 與 decoding="async"，
 * 避免靜態 HTML 輸出時觸發瀏覽器 Preload Scanner 同時搶載數十張大圖。
 */
function rehypeAlbumLazyImages() {
  function visitNode(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'element' && node.tagName === 'img') {
      node.properties = node.properties || {};
      if (!node.properties.loading) {
        node.properties.loading = 'lazy';
      }
      if (!node.properties.decoding) {
        node.properties.decoding = 'async';
      }
    }
    if (Array.isArray(node.children)) {
      for (let i = 0; i < node.children.length; i += 1) {
        visitNode(node.children[i]);
      }
    }
  }

  return (tree) => {
    visitNode(tree);
  };
}

/**
 * 預先解析相簿文章的年份、月份與顯示字串，減少客戶端重複執行正規表示式與 Date 轉換。
 */
function parsePostDate(permalink, date) {
  if (typeof permalink === 'string') {
    const permalinkMatch = permalink.match(/\/(\d{4})\/(\d{2})\//);
    if (permalinkMatch) {
      const year = permalinkMatch[1];
      const month = String(Number(permalinkMatch[2]));
      return { year, month, displayDate: `${year}年 ${month}月` };
    }
  }

  if (date) {
    const d = date instanceof Date ? date : new Date(date);
    if (!Number.isNaN(d.getTime())) {
      const year = `${d.getUTCFullYear()}`;
      const month = `${d.getUTCMonth() + 1}`;
      return { year, month, displayDate: `${year}年 ${month}月` };
    }
  }

  return { year: '2026', month: '1', displayDate: '' };
}

/**
 * Docusaurus Plugin Album
 *
 * 以路徑一（Wrapper Pattern）封裝 @docusaurus/plugin-content-blog，
 * 提供專屬的 Pinterest 瀑布流、Google Photos 時光軸與無依賴全螢幕照片燈箱。
 */
function validateOptions({ validate, options = {} }) {
  const userRehypePlugins = Array.isArray(options.rehypePlugins)
    ? options.rehypePlugins
    : [];

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
    rehypePlugins: [rehypeAlbumLazyImages, ...userRehypePlugins],
  };

  return validateBlogOptions({ validate, options: mergedOptions });
}

module.exports = async function pluginAlbum(context, options) {
  const blogPluginInstance = await pluginContentBlog(context, options);

  return {
    ...blogPluginInstance,
    // Do not override blogPluginInstance.name ('docusaurus-plugin-content-blog')
    // because Docusaurus core uses plugin.name to namespace actions.createData(),
    // and @docusaurus/plugin-content-blog hardcodes 'docusaurus-plugin-content-blog'
    // in its MDX loader rules when referencing metadata json files.
    async contentLoaded({ content, allContent, actions }) {
      const albumPosts = (content?.blogPosts || [])
        .filter((post) => Boolean(post?.metadata?.frontMatter?.cover))
        .map((post) => {
          const { permalink, title, date, frontMatter } = post.metadata;
          const { year, month, displayDate } = parsePostDate(permalink, date);
          return {
            permalink,
            title,
            date,
            year,
            month,
            displayDate,
            frontMatter: {
              cover: frontMatter.cover,
              cover_caption: frontMatter.cover_caption,
              location: frontMatter.location,
              album_series: frontMatter.album_series,
              tags: frontMatter.tags,
            },
          };
        });

      const wrappedActions = {
        ...actions,
        addRoute(routeConfig) {
          const isAlbumListRoute =
            routeConfig.component === options.blogListComponent ||
            (typeof routeConfig.component === 'string' &&
              routeConfig.component.endsWith('AlbumListPage'));

          if (isAlbumListRoute) {
            return actions.addRoute({
              ...routeConfig,
              modules: {},
              props: {
                ...routeConfig.props,
                posts: albumPosts,
              },
            });
          }

          return actions.addRoute(routeConfig);
        },
      };

      return blogPluginInstance.contentLoaded({
        content,
        allContent,
        actions: wrappedActions,
      });
    },
    getThemePath() {
      return path.resolve(__dirname, './src/theme');
    },
  };
};

module.exports.validateOptions = validateOptions;
