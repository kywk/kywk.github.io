// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

//const lightCodeTheme = require("prism-react-renderer/themes/github");
//const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const { themes } = require("prism-react-renderer");
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "kywk.me",
  tagline: "All around kywk",
  url: "https://kywk.github.io",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "kywk", // Usually your GitHub org/user name.
  projectName: "kywk.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: true,

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
          sidebarPath: require.resolve('./sidebars.js'),
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
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "backpacker",
        path: "backpacker",
        routeBasePath: "backpacker",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "lifehacker",
        path: "lifehacker",
        routeBasePath: "lifehacker",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "moco",
        path: "moco",
        routeBasePath: "moco",
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
            to: "/backpacker/way-2-kywk",
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
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
      },
    }),
};

module.exports = config;
