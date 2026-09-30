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
};

// 舊網址轉址。2026-09-30 那次 vault 整理把一批筆記改名或搬動，
// 舊路徑就失效了。GitHub Pages 沒有伺服器端轉址，只能靠
// @docusaurus/plugin-client-redirects 產生實體頁面。
// 每一組都是「舊 -> 新」，新路徑務必用實際 slug（可從 build/ 底下確認）。
const redirectMap = {
  // atomic-habits 移入 personal-growth/
  '/lifehacker/reading/atomic-habits/': '/lifehacker/reading/personal-growth/atomic-habits/',

  // Taichung -> ChungChangTou
  '/lifehacker/taiwan/taichung/taichung-13cafe-a-sanhoyuan-cafe/':
    '/lifehacker/taiwan/chungchangtou/taichung-13cafe-a-sanhoyuan-cafe/',
  '/lifehacker/taiwan/taichung/taichung-13cafe-cafe-ensemble/':
    '/lifehacker/taiwan/chungchangtou/taichung-13cafe-cafe-ensemble/',
  '/lifehacker/taiwan/taichung/taichung-13cafe-familiar-way/':
    '/lifehacker/taiwan/chungchangtou/taichung-13cafe-familiar-way/',
  '/lifehacker/taiwan/taichung/taichung-ash-manna-coffee/':
    '/lifehacker/taiwan/chungchangtou/taichung-ash-manna-coffee/',
  '/lifehacker/taiwan/taichung/taichung-forro-cafe/':
    '/lifehacker/taiwan/chungchangtou/taichung-forro-cafe/',
  '/lifehacker/taiwan/taichung/taichung-miyahara/':
    '/lifehacker/taiwan/chungchangtou/taichung-miyahara/',
  '/lifehacker/taiwan/taichung/taichung-yuli-bookstore-and-reaturant/':
    '/lifehacker/taiwan/chungchangtou/taichung-yuli-bookstore-and-reaturant/',

  // Hualien / Taitung / Yilan -> YiHuaTung
  '/lifehacker/taiwan/hualien/hualien-our/': '/lifehacker/taiwan/yihuatung/hualien-our/',
  '/lifehacker/taiwan/taitung/taitung-193-cafe/': '/lifehacker/taiwan/yihuatung/taitung-193-cafe/',
  '/lifehacker/taiwan/taitung/taitung-blue-sunrise/': '/lifehacker/taiwan/yihuatung/taitung-blue-sunrise/',
  '/lifehacker/taiwan/taitung/taitung-who-knows-hostel/': '/lifehacker/taiwan/yihuatung/taitung-who-knows-hostel/',
  '/lifehacker/taiwan/yilan/yilan-corner/': '/lifehacker/taiwan/yihuatung/yilan-corner/',
  '/lifehacker/taiwan/yilan/yilan-the-wall/': '/lifehacker/taiwan/yihuatung/yilan-the-wall/',

  // Tainan -> YunChiaNan
  '/lifehacker/taiwan/tainan/tainan-sputnik-lab/': '/lifehacker/taiwan/yunchianan/tainan-sputnik-lab/',

  // 檔名重新命名
  '/backpacker/1105-sabah/note-plan-for-sabah-2011/': '/backpacker/1105-sabah/2-sabah-2011/',
  // VersionManager 系列去掉檔名冗餘的 "JavaScript " 前綴
  '/moco/javascript/versionmanager/javascript-node-version-manager/':
    '/moco/javascript/versionmanager/node-version-manager/',
  '/moco/javascript/versionmanager/javascript-nvm-volta-fnm-comparison/':
    '/moco/javascript/versionmanager/nvm-volta-fnm-comparison/',
  '/moco/javascript/versionmanager/javascript-other-version-manager/':
    '/moco/javascript/versionmanager/other-version-manager/',
  '/moco/javascript/versionmanager/javascript-version-manager-ending-note/':
    '/moco/javascript/versionmanager/version-manager-ending-note/',
  '/moco/javascript/versionmanager/javascript-volta-get-started/':
    '/moco/javascript/versionmanager/volta-get-started/',
  '/moco/javascript/versionmanager/javascript-why-version-manager/':
    '/moco/javascript/versionmanager/why-version-manager/',
};

module.exports = {
  pluginConfig,
  docsConfig,
  blogConfig,
  externalResources,
  // plugin-client-redirects 要的是 {from,to} 陣列，不是物件
  redirects: Object.entries(redirectMap).map(([from, to]) => ({ from, to })),
};