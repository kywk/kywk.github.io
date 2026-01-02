/**
 * 專案配置集中管理
 */

// 插件配置
const pluginConfig = {
  kanban: {
    hrefTemplate: (permalink, routeBase) => `${routeBase}${permalink}/`,
  },
  leaflet: {
    defaultZoom: 12,
    minZoom: 1,
    maxZoom: 18,
    lightTileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    darkTileLayer: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    lightAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    darkAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  wikiLink: {
    aliasDivider: '|',
  },
};

// 文檔實例配置
const docsConfig = [
  {
    id: 'backpacker',
    path: 'backpacker',
    routeBasePath: 'backpacker',
    routeBase: '/backpacker/',
  },
  {
    id: 'lifehacker',
    path: 'lifehacker',
    routeBasePath: 'lifehacker',
    routeBase: '/lifehacker/',
  },
  {
    id: 'moco',
    path: 'moco',
    routeBasePath: 'moco',
    routeBase: '/moco/',
  },
];

// 部落格配置
const blogConfig = [
  {
    id: 'news',
    routeBasePath: 'news',
    path: 'blog.news',
  },
  {
    id: 'life',
    routeBasePath: 'life',
    path: 'blog.life',
  },
];

// 外部資源配置
const externalResources = {
  fonts: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+TC:wght@400;500;700&display=swap',
  leafletCSS: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  leafletJS: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
};

module.exports = {
  pluginConfig,
  docsConfig,
  blogConfig,
  externalResources,
};