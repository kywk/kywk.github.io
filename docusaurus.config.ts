import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const { Logger } = require("./scripts/logger.js");
const { pluginConfig, docsConfig, blogConfig, externalResources } = require("./site.config.js");
const fs = require("fs");
const path = require("path");

// 插件載入 - 支援多種安裝方式：npm、本地開發、手動 clone
function loadPlugin(npmPackage, localPath) {
  const possiblePaths = [
    npmPackage,                    // npm 安裝的套件
    localPath,                     // 本地開發路徑
    `./plugins/${npmPackage}`,     // 手動 clone 到 plugins 目錄
    `./plugins/${npmPackage}/src/index.js`, // 手動 clone 的完整路徑
  ];

  for (const pluginPath of possiblePaths) {
    try {
      const plugin = require(pluginPath);
      Logger.info(`Plugin loaded from: ${pluginPath}`, 'PluginLoader');
      return plugin;
    } catch (error) {
      // 繼續嘗試下一個路徑
    }
  }

  Logger.warn(`Plugin ${npmPackage} not found in any location`, 'PluginLoader');
  return null;
}

const remarkWikiLink = require("remark-wiki-link");
const remarkKanban = loadPlugin("remark-obsidian-kanban", "./plugins/remark-obsidian-kanban/src/index.js")?.remarkKanban;
const remarkLeaflet = loadPlugin("remark-obsidian-leaflet", "./plugins/remark-obsidian-leaflet/src/index.js");
const slugNormalizerPlugin = loadPlugin("remark-slug-normalizer", "./plugins/remark-slug-normalizer/src/index.js");
const normalizeSlug = slugNormalizerPlugin?.normalizeSlug;
const deriveSlug = slugNormalizerPlugin?.deriveSlug;

// 建立檔案映射表 - 統一函數
function createFileMap(basePath) {
  const fileMap = new Map();

  function scanDirectory(dir) {
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
          scanDirectory(fullPath);
        } else if (item.isFile() && item.name.endsWith(".md")) {
          const fileName = item.name.replace(/\.md$/, "");
          const relativePath = path
            .relative(basePath, fullPath)
            .replace(/\.md$/, "");

          // 正規化路徑：將空格轉換為破折號
          const normalizedPath = normalizeSlug ? normalizeSlug(relativePath) : relativePath.replace(/ /g, '-').toLowerCase();

          // 建立多種可能的映射變體
          const variations = [
            fileName,
            fileName.toLowerCase(),
            fileName.replace(/ /g, "-"),
            fileName.replace(/ /g, "-").toLowerCase(),
            fileName.replace(/ /g, "_"),
            fileName.replace(/ /g, "_").toLowerCase(),
            fileName.replace(/ /g, ""),
            fileName.replace(/ /g, "").toLowerCase(),
            fileName.replace(/-/g, " "),
            fileName.replace(/-/g, " ").toLowerCase(),
          ];

          variations.forEach(variation => {
            if (variation !== fileName || !fileMap.has(variation)) {
              fileMap.set(variation, normalizedPath);
            }
          });
        }
      }
    } catch (error) {
      if (Logger) {
        Logger.warn(`Failed to scan directory ${dir}: ${error.message}`, 'FileMap');
      }
    }
  }

  scanDirectory(basePath);
  return fileMap;
}

// 為每個文檔實例建立檔案映射
const fileMaps = {};
docsConfig.forEach(doc => {
  fileMaps[doc.id] = createFileMap(doc.path);
});

// 建立共用的 pageResolver 函數
function createPageResolver(fileMap) {
  return (name) => {
    try {
      const cleanName = name.replace(/\.md$/, "");

      // 嘗試各種變體來查找檔案
      const variations = [
        cleanName, // 原始名稱
        cleanName.toLowerCase(), // 小寫
        cleanName.replace(/ /g, "-"), // 空格轉破折號
        cleanName.replace(/ /g, "-").toLowerCase(), // 空格轉破折號 + 小寫
        cleanName.replace(/ /g, "_"), // 空格轉底線
        cleanName.replace(/ /g, "_").toLowerCase(), // 空格轉底線 + 小寫
        cleanName.replace(/-/g, " "), // 破折號轉空格
        cleanName.replace(/-/g, " ").toLowerCase(), // 破折號轉空格 + 小寫
        cleanName.replace(/ /g, ""), // 移除空格
        cleanName.replace(/ /g, "").toLowerCase(), // 移除空格 + 小寫
      ];

      for (const variation of variations) {
        const mappedPath = fileMap.get(variation);
        if (mappedPath) {
          return [mappedPath];
        }
      }

      // 若都找不到，返回正規化的名稱
      return [cleanName.replace(/ /g, "-").toLowerCase()];
    } catch (error) {
      if (Logger) {
        Logger.warn(`Failed to resolve page ${name}: ${error.message}`, 'PageResolver');
      }
      return [name.replace(/ /g, "-").toLowerCase()];
    }
  };
}

// 建立共用的 remark 插件配置
function createRemarkPlugins(fileMap, routeBase) {
  const plugins = [];

  // 注意：slug 不在 remark 階段處理。Docusaurus 在 processDocMetadata 就算好 permalink，
  // remark 是之後才在 mdx-loader 跑的，改 frontmatter 已經來不及。
  // slug 統一由下方 markdown.parseFrontMatter 推導。

  if (remarkLeaflet) {
    plugins.push([remarkLeaflet, { routeBase }]);
  }

  if (remarkKanban) {
    plugins.push([
      remarkKanban,
      {
        pageResolver: createPageResolver(fileMap),
        hrefTemplate: (permalink) => pluginConfig.kanban.hrefTemplate(permalink, routeBase),
      },
    ]);
  }

  plugins.push([
    remarkWikiLink,
    {
      pageResolver: createPageResolver(fileMap),
      hrefTemplate: (permalink) => `${routeBase}${permalink}/`,
      aliasDivider: pluginConfig.wikiLink.aliasDivider,
    },
  ]);

  return plugins;
}

const config: Config = {
  title: "kywk.me",
  tagline: "All around kywk",
  favicon: "img/favicon.ico",

  url: "https://kywk.github.io",
  baseUrl: "/",
  trailingSlash: true,

  organizationName: "kywk",
  projectName: "kywk.github.io",
  deploymentBranch: "gh-pages",

  onBrokenLinks: "warn",

  // 先建立 Google Fonts 連線，縮短字型的等待時間（中文 Noto Sans TC 影響最大）
  headTags: [
    {
      tagName: "link",
      attributes: { rel: "preconnect", href: "https://fonts.googleapis.com" },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "anonymous",
      },
    },
  ],

  stylesheets: [
    {
      href: externalResources.fonts,
      type: "text/css",
    },
  ],

  scripts: [
    // Leaflet 本體不再全站載入，改由 leaflet-init.js 在有地圖的頁面動態注入
    {
      src: "/js/leaflet-init.js",
      async: true,
    },
  ],

  markdown: {
    format: "detect",
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
      onBrokenMarkdownImages: "warn",
    },
    // 全站 URL 的唯一權威來源：build 時由檔案路徑推導 slug，不寫回原始檔。
    //   規則：轉小寫 → 空白/底線換成 -、收合、去頭尾 → 去掉結尾的 /index
    //   docs  → /a/b/          blog → /YYYY/MM/DD/title（沿用 Docusaurus 的日期結構）
    // 推導函式與 npm run content:slug、wikilink resolver 共用，三者不可能不一致。
    // 檔案裡即使殘留舊的 slug frontmatter 也會被這裡覆蓋。
    parseFrontMatter: async (params) => {
      const result = await params.defaultParseFrontMatter(params);
      if (!deriveSlug) return result;

      const relPath = path.relative(__dirname, params.filePath);
      const { slug } = deriveSlug({
        relPath,
        docsPaths: docsConfig.map(doc => doc.path),
        blogPaths: blogConfig.map(blog => blog.path),
      });

      if (slug) {
        result.frontMatter.slug = slug;
      }
      return result;
    },
  },

  i18n: {
    defaultLocale: "zh-TW",
    locales: ["zh-TW"],
  },

  future: {
    faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: true,
      mdxCrossCompilerCache: true,
      rspackPersistentCache: true,
      // 需搭配 v4.removeLegacyPostBuildHeadAttribute
      ssgWorkerThreads: true,
      // gitEagerVcs 只在使用 showLastUpdateTime/Author 時有意義，本站未使用
    },
    v4: {
      // 本站無自訂 plugin 使用 postBuild({head})，可安全移除 legacy 參數
      removeLegacyPostBuildHeadAttribute: true,
    },
  },

  presets: [
    [
      "classic",
      {
        // docs/blog 都由下方 plugins 明確建立實例，關掉 preset 的預設實例，
        // 否則會多出 /docs 與 /blog 兩個空路由
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    ...docsConfig.map(doc => [
      "@docusaurus/plugin-content-docs",
      {
        id: doc.id,
        path: doc.path,
        routeBasePath: doc.routeBasePath,
        remarkPlugins: createRemarkPlugins(fileMaps[doc.id], doc.routeBase),
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ]),
    ...blogConfig.map(blog => [
      "@docusaurus/plugin-content-blog",
      {
        id: blog.id,
        routeBasePath: blog.routeBasePath,
        path: blog.path,
        showReadingTime: true,
        blogSidebarTitle: "All posts",
        blogSidebarCount: "ALL",
        onUntruncatedBlogPosts: "ignore",
      },
    ]),
  ],

  themes: [
    "@docusaurus/theme-mermaid",
    // 全靜態的站內搜尋（無外部服務），語言含中文分詞
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"],
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        // 多實例：docs 與 blog 的目錄與路由都要逐一列出
        docsDir: docsConfig.map(doc => doc.path),
        docsRouteBasePath: docsConfig.map(doc => doc.routeBasePath),
        blogDir: blogConfig.map(blog => blog.path),
        blogRouteBasePath: blogConfig.map(blog => blog.routeBasePath),
        // 非 docs 頁面（blog、404）沒有 activePlugin，SearchBar 會 fallback 到這個 id；
        // 不指定會去找不存在的 "default" docs 實例而讓 SSG 失敗
        docsPluginIdForPreferredVersion: docsConfig[0].id,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
      },
    ],
  ],

  themeConfig: {
    image: "img/og-social-card.png",
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    metadata: [
      {
        name: "keywords",
        content: "旅行, 背包客, 生活效率, 工程筆記, DevSecOps, Obsidian",
      },
      { name: "author", content: "kywk" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "kywk.me" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    navbar: {
      title: "kywk.me",
      logo: {
        alt: "kywk.me Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "/backpacker/lonely-planet",
          label: "lonely planet",
          position: "left",
          activeBaseRegex: `/backpacker/`,
        },
        {
          to: "/lifehacker/way-2-kywk",
          label: "lifehacker",
          position: "left",
          activeBaseRegex: `/lifehacker/`,
        },
        {
          to: "/moco/kywk.moco",
          label: "moco",
          position: "left",
          activeBaseRegex: "/moco/",
        },
        { to: "/life", label: "life", position: "left" },
        { to: "/news", label: "news", position: "left" },
        {
          href: "https://github.com/kywk/",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "主題索引",
          items: [
            { label: "Backpacker", to: "/backpacker/lonely-planet" },
            { label: "Lifehacker", to: "/lifehacker/way-2-kywk" },
            { label: "MoCo Lab", to: "/moco/kywk.moco" },
          ],
        },
        {
          title: "筆記頻道",
          items: [
            { label: "News Log", to: "/news" },
            { label: "Life Blog", to: "/life" },
          ],
        },
        {
          title: "連結",
          items: [{ label: "GitHub", href: "https://github.com/kywk" }],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} kywk. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
