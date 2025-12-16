import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const remarkWikiLink = require("remark-wiki-link");
const { remarkKanban } = require("./remark-obsidian-kanban/src/index.js");
const fs = require('fs');
const path = require('path');

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
        } else if (item.isFile() && item.name.endsWith('.md')) {
          const fileName = item.name.replace(/\.md$/, '');
          const relativePath = path.relative(basePath, fullPath).replace(/\.md$/, '');
          
          // 建立多種可能的映射
          fileMap.set(fileName, relativePath);
          fileMap.set(fileName.toLowerCase(), relativePath);
          fileMap.set(fileName.replace(/ /g, '-').toLowerCase(), relativePath);
          fileMap.set(fileName.replace(/ /g, '_').toLowerCase(), relativePath);
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
const backpackerFileMap = createFileMap('backpacker');
const lifehackerFileMap = createFileMap('lifehacker');
const mocoFileMap = createFileMap('moco');

// 建立共用的 pageResolver 函數
function createPageResolver(fileMap) {
  return (name) => {
    try {
      const cleanName = name.replace(/\.md$/, '');
      
      const mappedPath = fileMap.get(cleanName) || 
                       fileMap.get(cleanName.toLowerCase()) ||
                       fileMap.get(cleanName.replace(/ /g, '-').toLowerCase()) ||
                       fileMap.get(cleanName.replace(/ /g, '_').toLowerCase());
      
      if (mappedPath) {
        return [mappedPath];
      }
      
      return [cleanName.replace(/ /g, '-').toLowerCase()];
    } catch (error) {
      console.warn(`Failed to resolve page ${name}:`, error.message);
      return [name.replace(/ /g, '-').toLowerCase()];
    }
  };
}

// 建立共用的 remark 插件配置
function createRemarkPlugins(fileMap, routeBase) {
  return [
    [remarkKanban, { pageResolver: createPageResolver(fileMap), hrefTemplate: (permalink) => `${routeBase}${permalink}/` }],
    [
      remarkWikiLink,
      {
        pageResolver: createPageResolver(fileMap),
        hrefTemplate: (permalink) => `${routeBase}${permalink}/`,
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

  markdown: {
    format: "detect",
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
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
      mdxCrossCompilerCache: true,
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
        remarkPlugins: createRemarkPlugins(backpackerFileMap, '/backpacker/'),
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "lifehacker",
        path: "lifehacker",
        routeBasePath: "lifehacker",
        remarkPlugins: createRemarkPlugins(lifehackerFileMap, '/lifehacker/'),
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "moco",
        path: "moco",
        routeBasePath: "moco",
        remarkPlugins: createRemarkPlugins(mocoFileMap, '/moco/'),
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
        onUntruncatedBlogPosts: 'ignore',
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
        onUntruncatedBlogPosts: 'ignore',
      },
    ],
  ],

  themes: ["@docusaurus/theme-mermaid"],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "kywk.me",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "/backpacker/Lonely Planet",
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
        { to: "/news", label: "news", position: "left" },
        { to: "/life", label: "life", position: "left" },
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
          title: "Docs",
          items: [
            {
              label: "Journal",
              to: "/lifehacker/way-2-kywk",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/life",
            },
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus",
            },
          ],
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