// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes } from "prism-react-renderer";

const remarkWikiLink = require("remark-wiki-link");
const remarkOembed = require("remark-oembed");
const path = require("path");

/**
 * Method to get the corresponding md file name for a given wikilink
 *
 * @param {string} wikilink The text between [[]] in an md file
 * Returns the file name corresponding to [[wiki link]]
 */
function sluggifyWikilink(wikilink) {
  /**
   * [[Some Fancy Title]] gets converted to 'some-fancy-title'
   * so there should be some-fancy-title.md file in docs
   */
  const slug = wikilink.replace(/ /g, "-").toLowerCase();
  return slug;

  // /**
  // * [[Some Fancy Title]] gets converted to 'Some Fancy Title'
  // * so there should be 'Some Fancy Title.md' file in docs
  //   */
  // return wikilink;
}

/**
 * Wiki might be under a subdirectory and the file name might be sluggified
 * Enable remark-wiki-link plugin to find such md files
 *
 * @param {string} wikilink The text between [[]] in an md file
 * Returns list of paths to help resolve a [[wiki link]]
 */
function wikilinkToUrl(docsDir, wikilink) {
  const slug = sluggifyWikilink(wikilink);
  const walkSync = require("walk-sync");
  let paths = walkSync(docsDir, {
    globs: ["**/" + slug + ".md*"],
    directories: false,
  });
  if (paths == null || paths.length == 0) {
    paths = walkSync(docsDir, {
      globs: ["**/" + wikilink + ".md*"],
      directories: false,
    });
  }
  paths = paths.map((path) => {
    let walkPaths = path.split("/");
    walkPaths = walkPaths.map((walkPath) =>
      walkPath.replace(/^[0-9]+[\-|\_]+/gm, ""),
    );
    path = walkPaths.join("/");
    return path.replace(".mdx", "").replace(".md", "");
  });
  return paths;
}

/**
 * Returns the url to the wiki
 *
 * @param {string} permalink url to the md file
 * Return the path to the wiki
 */
function toDocsUrl(docsDir, permalink) {
  return `/${docsDir}/${permalink}`;
}

/**
 * Plugin declarations
 *
 */
const lunrSearch = require.resolve("docusaurus-lunr-search");
const wikiGraph = [
  path.resolve(__dirname, "plugins", "docusaurus-plugin-wikigraph"),
  { slugMethod: sluggifyWikilink },
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "kywk.me",
  tagline: "All around kywk",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://kywk.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  trailingSlash: true,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  markdown: { format: "md" },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "kywk", // Usually your GitHub org/user name.
  projectName: "kywk.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-tw",
    locales: ["zh-tw"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        /*
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
         */
        /*
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        */
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    lunrSearch,
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "backpacker",
        path: "backpacker",
        routeBasePath: "backpacker",
        remarkPlugins: [
          remarkOembed,
          [
            remarkWikiLink,
            {
              pageResolver: (pageName) => {
                return wikilinkToUrl("backpacker", pageName);
              },
              hrefTemplate: (permalink) => {
                return toDocsUrl("backpacker", permalink);
              },
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
          remarkOembed,
          [
            remarkWikiLink,
            {
              pageResolver: (pageName) => {
                return wikilinkToUrl("lifehacker", pageName);
              },
              hrefTemplate: (permalink) => {
                return toDocsUrl("lifehacker", permalink);
              },
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
          remarkOembed,
          [
            remarkWikiLink,
            {
              pageResolver: (pageName) => {
                return wikilinkToUrl("moco", pageName);
              },
              hrefTemplate: (permalink) => {
                return toDocsUrl("moco", permalink);
              },
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
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "life",
        routeBasePath: "life",
        path: "blog.life",
        showReadingTime: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
            activeBaseRegex: `/moco/`,
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
        theme: themes.github,
        darkTheme: themes.dracula,
      },
    }),
};

export default config;
