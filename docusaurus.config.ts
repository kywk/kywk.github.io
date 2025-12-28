import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const remarkWikiLink = require("remark-wiki-link");
const { remarkKanban } = require("./plugins/remark-obsidian-kanban/src/index.js");
const remarkLeaflet = require("./plugins/remark-obsidian-leaflet/src/index.js");
const { normalizeSlug, remarkSlugNormalizer } = require("./plugins/remark-slug-normalizer/src/index.js");
const fs = require("fs");
const path = require("path");

// 建立檔案映射表
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
          const normalizedPath = normalizeSlug(relativePath);

          // 建立多種可能的映射 (原始檔名)
          fileMap.set(fileName, normalizedPath);
          fileMap.set(fileName.toLowerCase(), normalizedPath);

          // 空格轉破折號
          const dashName = fileName.replace(/ /g, "-");
          fileMap.set(dashName, normalizedPath);
          fileMap.set(dashName.toLowerCase(), normalizedPath);

          // 空格轉底線
          const underscoreName = fileName.replace(/ /g, "_");
          fileMap.set(underscoreName, normalizedPath);
          fileMap.set(underscoreName.toLowerCase(), normalizedPath);

          // 移除所有空格
          const noSpaceName = fileName.replace(/ /g, "");
          fileMap.set(noSpaceName, normalizedPath);
          fileMap.set(noSpaceName.toLowerCase(), normalizedPath);

          // 破折號轉空格 (反向映射)
          const spaceName = fileName.replace(/-/g, " ");
          if (spaceName !== fileName) {
            fileMap.set(spaceName, normalizedPath);
            fileMap.set(spaceName.toLowerCase(), normalizedPath);
          }
        }
      }
    } catch (error) {
      console.warn(`Failed to scan directory ${dir}:`, error.message);
    }
  }

  scanDirectory(basePath);
  return fileMap;
}

// 為每個文檔實例建立檔案映射
const backpackerFileMap = createFileMap("backpacker");
const lifehackerFileMap = createFileMap("lifehacker");
const mocoFileMap = createFileMap("moco");

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
      console.warn(`Failed to resolve page ${name}:`, error.message);
      return [name.replace(/ /g, "-").toLowerCase()];
    }
  };
}

// 建立共用的 remark 插件配置
function createRemarkPlugins(fileMap, routeBase) {
  return [
    remarkSlugNormalizer, // 正規化 slug：空格轉破折號
    [remarkLeaflet, { routeBase }],
    [
      remarkKanban,
      {
        pageResolver: createPageResolver(fileMap),
        hrefTemplate: (permalink) => `${routeBase}${permalink}/`,
      },
    ],
    [
      remarkWikiLink,
      {
        pageResolver: createPageResolver(fileMap),
        hrefTemplate: (permalink) => `${routeBase}${permalink}/`,
        aliasDivider: "|",
      },
    ],
  ];
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

  stylesheets: [
    {
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+TC:wght@400;500;700&display=swap",
      type: "text/css",
    },
    {
      href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
      type: "text/css",
    },
  ],

  scripts: [
    {
      src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
      async: false,
    },
    {
      src: "/js/leaflet-init.js",
      async: false,
    },
  ],

  markdown: {
    format: "detect",
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
      onBrokenMarkdownImages: "warn",
    },
  },

  i18n: {
    defaultLocale: "zh-TW",
    locales: ["zh-TW"],
  },

  future: {
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: true,
    },
  },

  presets: [
    [
      "classic",
      {
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "backpacker",
        path: "backpacker",
        routeBasePath: "backpacker",
        remarkPlugins: createRemarkPlugins(backpackerFileMap, "/backpacker/"),
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "lifehacker",
        path: "lifehacker",
        routeBasePath: "lifehacker",
        remarkPlugins: createRemarkPlugins(lifehackerFileMap, "/lifehacker/"),
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "moco",
        path: "moco",
        routeBasePath: "moco",
        remarkPlugins: createRemarkPlugins(mocoFileMap, "/moco/"),
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "news",
        routeBasePath: "news",
        path: "blog.news",
        showReadingTime: true,
        blogSidebarTitle: "All posts",
        blogSidebarCount: "ALL",
        onUntruncatedBlogPosts: "ignore",
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "life",
        routeBasePath: "life",
        path: "blog.life",
        showReadingTime: true,
        blogSidebarTitle: "All posts",
        blogSidebarCount: "ALL",
        onUntruncatedBlogPosts: "ignore",
      },
    ],
  ],

  themes: ["@docusaurus/theme-mermaid"],

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
          to: "/backpacker/Lonely-Planet",
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
            { label: "Backpacker", to: "/backpacker/Lonely-Planet" },
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
