import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const remarkWikiLink = require("remark-wiki-link");
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
      // 忽略無法讀取的目錄
    }
  }
  
  scanDirectory(basePath);
  return fileMap;
}

// 為每個文檔實例建立檔案映射
const backpackerFileMap = createFileMap('backpacker');
const lifehackerFileMap = createFileMap('lifehacker');
const mocoFileMap = createFileMap('moco');

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
  onBrokenMarkdownLinks: "warn",

  markdown: {
    format: "detect",
    mermaid: true,
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
        remarkPlugins: [
          [
            remarkWikiLink,
            {
              pageResolver: (name) => {
                const cleanName = name.replace(/\.md$/, '');
                
                // 嘗試從檔案映射表中找到正確路徑
                const mappedPath = backpackerFileMap.get(cleanName) || 
                                 backpackerFileMap.get(cleanName.toLowerCase()) ||
                                 backpackerFileMap.get(cleanName.replace(/ /g, '-').toLowerCase()) ||
                                 backpackerFileMap.get(cleanName.replace(/ /g, '_').toLowerCase());
                
                if (mappedPath) {
                  return [mappedPath];
                }
                
                // 如果找不到，使用預設轉換
                return [cleanName.replace(/ /g, '-').toLowerCase()];
              },
              hrefTemplate: (permalink) => `/backpacker/${permalink}/`,
            },
          ],
        ],
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "lifehacker",
        path: "lifehacker",
        routeBasePath: "lifehacker",
        remarkPlugins: [
          [
            remarkWikiLink,
            {
              pageResolver: (name) => {
                const cleanName = name.replace(/\.md$/, '');
                
                const mappedPath = lifehackerFileMap.get(cleanName) || 
                                 lifehackerFileMap.get(cleanName.toLowerCase()) ||
                                 lifehackerFileMap.get(cleanName.replace(/ /g, '-').toLowerCase()) ||
                                 lifehackerFileMap.get(cleanName.replace(/ /g, '_').toLowerCase());
                
                if (mappedPath) {
                  return [mappedPath];
                }
                
                return [cleanName.replace(/ /g, '-').toLowerCase()];
              },
              hrefTemplate: (permalink) => `/lifehacker/${permalink}/`,
            },
          ],
        ],
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "moco",
        path: "moco",
        routeBasePath: "moco",
        remarkPlugins: [
          [
            remarkWikiLink,
            {
              pageResolver: (name) => {
                const cleanName = name.replace(/\.md$/, '');
                
                const mappedPath = mocoFileMap.get(cleanName) || 
                                 mocoFileMap.get(cleanName.toLowerCase()) ||
                                 mocoFileMap.get(cleanName.replace(/ /g, '-').toLowerCase()) ||
                                 mocoFileMap.get(cleanName.replace(/ /g, '_').toLowerCase());
                
                if (mappedPath) {
                  return [mappedPath];
                }
                
                return [cleanName.replace(/ /g, '-').toLowerCase()];
              },
              hrefTemplate: (permalink) => `/moco/${permalink}/`,
            },
          ],
        ],
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