---
title: remark-obsidian-leaflet
description: Docusaurus plugin for Obsidian Leaflet interactive maps
cover: https://i.imgur.com/mErPwqL.png
tags:
  - Docusaurus
  - Obsidian
  - Plugin
  - Leaflet
  - 地圖
sidebar_position: 80
sidebar_label: Leaflet Plugin
date_created: 2025-12-24T00:00:00.000Z
date_updated: 2026-09-30T00:00:00.000Z
---

# [Docusaurus] remark-obsidian-leaflet Plugin

> **本外掛已刪除，個人已改用 Geo Story Map 取代。**
>
> 這篇保留為**歷史紀錄**，記錄當初為什麼會寫這個 remark 外掛，以及它解決了什麼問題。內文的安裝與設定步驟**已經不能照做**。
>
> 目前網站上所有 ` ```leaflet ` 區塊，都改由 [[01 Geo Story Map 專案介紹|Geo Story Map]] 的 `@story-map/remark-story-map` 渲染。本機的 `plugins/remark-obsidian-leaflet/` 與 `static/js/leaflet-init.js` 都已刪除，網站上不再存在第二套 Leaflet runtime。
>
> 好消息是**筆記本身完全不用改**：舊的 `leaflet` 圍欄區塊（`id`、`lat`、`long`、`markerFolder` 等歷史 key）由 Geo Story Map 直接沿用，標記照樣從 `markerFolder` 遞迴讀取既有筆記的 `location`。
>
> 兩者的差別，以及哪些 key 真的能用、哪些刻意保留中，請見 [[06 Geo Story Map 純地圖與 Leaflet 相容]]。

自製的 Docusaurus remark 插件，用於將 Obsidian Leaflet 格式的地圖代碼轉換為互動式地圖顯示。

## 改用 remark-story-map 的配置方式

> 取代方案**不是**什麼都不用做：舊的 ` ```leaflet ` 圍欄區塊語法完全不用改，但 remark 外掛與瀏覽器 runtime 必須換掉，否則站上會同時存在兩套 Leaflet。
>
> 下面就是本站實際採用的配置。若你只需要渲染舊區塊，照著前三步就夠了。

### 1. 安裝套件

```bash
npm install @story-map/remark-story-map react@^19 react-dom@^19
```

`react` 與 `react-dom` 是 peer dependency，兩者都必須是 React 19。若站台目前是 React 18，需要先升級。

### 2. 註冊 remark 外掛

在 `docusaurus.config.ts` 中，把 `remarkStoryMap` 加進**每一個** docs 實例的 `remarkPlugins`（本站是多 docs 實例，所以放在共用的 `createRemarkPlugins()` 裡）：

```typescript
const storyMapOptions = {
  vaultRoot: __dirname,                          // 掃描標記來源的 Vault 根目錄
  resolveNoteHref: (vaultRelativePath: string) => {
    // 交給站台既有的索引決定最終網址，不要自己實作 slug 規則
    const matches = contentLinkIndex.resolve(vaultRelativePath);
    return matches.length === 1 ? matches[0].route : undefined;
  },
  leafletDefaults: { theme: 'auto' },            // 僅供 leaflet 區塊使用
};

plugins: [
  '@docusaurus/plugin-content-docs',
  {
    id: 'moco',
    path: 'moco',
    remarkPlugins: [
      [remarkKanban, { /* … */ }],
      [remarkWikiLink, { /* … */ }],
      [remarkStoryMap, storyMapOptions],         // ← 新增
    ],
  },
],
```

**`vaultRoot` 一定要給。** ` ```leaflet ` 的 `markerFolder` 靠它遞迴掃描 Vault 才能變成標記；省略的話區塊仍會被解析，但不會有任何標記。

若 Docusaurus 讀取設定時，jiti 破壞了套件的具名 `zod` 匯出（`z` 變成 `undefined`），改用 Node 原生的 `require(esm)` 載入，讓套件留在原生 loader 上：

```js
// plugins/remark-story-map-loader.cjs
const { createRequire } = require('node:module');
const nativeRequire = createRequire(__filename);
const mod = nativeRequire('@story-map/remark-story-map');
module.exports = mod.default ?? mod;
```

```typescript
// docusaurus.config.ts
const remarkStoryMap = require('./plugins/remark-story-map-loader.cjs');
```

### 3. 註冊瀏覽器 client

外掛在建置期只會把圍欄區塊換成一個空的 host 容器，**真正畫出地圖**要靠瀏覽器端的 client：

```js
// plugins/story-map-client/index.js
module.exports = function storyMapClientPlugin() {
  return {
    name: 'story-map-client',
    getClientModules() {
      return [require.resolve('@story-map/remark-story-map/client')];
    },
  };
};
```

```typescript
plugins: ['./plugins/story-map-client']
```

`docusaurus build` 期間**不會**建立任何 Leaflet 實例，Leaflet 只在瀏覽器端動態載入；頁面上沒有 story 或 map host 時，連圖磚庫都不會下載。

### 4. 移除舊 runtime

確認新路徑渲染正常之後，再把重複的部分刪掉：

| 刪除項目 | 位置 |
| --- | --- |
| `remarkLeaflet` 的載入與 `remarkPlugins` 條目 | `docusaurus.config.ts` |
| `scripts: [{ src: '/js/leaflet-init.js' }]` | `docusaurus.config.ts` |
| `static/js/leaflet-init.js` | 整個檔案 |
| `plugins/remark-obsidian-leaflet/` | 整個資料夾 |
| 舊的 `.leaflet-*` 樣式 | `src/css/custom.css` |

**順序很重要**：先確認新路徑能畫出地圖，再刪舊的。`leaflet-init.js` 是用 CDN 注入 Leaflet 的，刪掉之後如果新 client 沒註冊成功，站上會直接沒有地圖、而且沒有明顯錯誤。

### 5. 主題橋接（只有設定 `auto` 時才需要）

`map.theme: auto` 預設跟隨的是 `prefers-color-scheme`，也就是**作業系統**，不是 Docusaurus 存在 localStorage 的主題切換。兩者不一致時要自己橋接，而且**兩個方向都要寫**：

```css
/* src/css/story-map-theme.css */
[data-theme='light'] .story-map[data-map-theme='auto'] {
  --story-map-tile-filter: none;
  --story-map-marker: var(--ifm-color-primary);
}

[data-theme='dark'] .story-map[data-map-theme='auto'] {
  --story-map-tile-filter: invert(0.95) hue-rotate(195deg) saturate(0.5) brightness(1) contrast(0.95);
  --story-map-marker: var(--ifm-color-primary-light);
}
```

只寫 dark 那一段會在「作業系統是深色、但站台切到淺色」時失效——renderer 自己的 dark media query 會蓋過來。

### 6. 驗收

改完之後逐項確認：

- [ ] 舊的 ` ```leaflet ` 區塊**完全沒改**也能畫出地圖
- [ ] `markerFolder` 內有 `location` 的筆記都變成標記
- [ ] 標記連結點得下去，導向站台上真的存在的路由
- [ ] 同一頁兩張地圖時，Leaflet 只初始化一次
- [ ] 進出地圖頁面（SPA 導航）不會重複掛載、也不會累積 React root
- [ ] Console 沒有 `leaflet-init.js` 相關錯誤
- [ ] 輸出的 HTML 沒有本機絕對路徑

## 功能特色

### 🗺️ 核心功能
- **自動識別**: 檢測 `leaflet` 程式碼區塊自動渲染地圖
- **互動地圖**: 基於 Leaflet.js 的完整互動式地圖體驗
- **標記載入**: 自動從 Markdown 檔案讀取地點標記
- **響應式設計**: 自適應不同螢幕尺寸

### 🌓 主題整合
- **明暗主題**: 自動跟隨 Docusaurus 主題切換地圖樣式
- **動態偵測**: 運行時偵測當前主題並切換圖層
- **視覺一致**: 與 Docusaurus 設計語言完美整合

### 🔗 連結支援
- **Wiki-link 整合**: 標記點擊可導航到對應文章
- **中文支援**: 完整支援中文標題和連結
- **路由正規化**: 自動處理檔名空格轉換

### 📍 標記系統
- **多種圖示**: 支援餐廳、飯店、景點等不同類型標記
- **自訂顏色**: 每種標記類型有專屬顏色和圖示
- **Frontmatter 整合**: 從 Markdown frontmatter 讀取位置資訊

## 安裝配置

### 1. 插件安裝

```bash
# NPM 安裝 (推薦)
npm install remark-obsidian-leaflet

# 或手動 clone 到 plugins 目錄
git clone https://github.com/your-repo/remark-obsidian-leaflet plugins/remark-obsidian-leaflet
```

### 2. Docusaurus 配置

在 `docusaurus.config.ts` 中配置：

```typescript
const { remarkLeaflet } = require("./plugins/remark-obsidian-leaflet/src/index.js");

// 在 remarkPlugins 中添加
remarkPlugins: [
  [remarkLeaflet, { routeBase: '/docs/' }],
  // ... 其他插件
],
```

### 3. Leaflet 資源載入（按需載入）

**不要**把 Leaflet CSS/JS 掛成全域 `headTags` / `stylesheets` / `scripts`。
全站 900+ 頁裡只有 3 頁有地圖，全域載入等於每頁都多背約 160KB 的阻塞資源。

正確做法是只全域載入自己的初始化腳本，由它偵測頁面上有沒有地圖再注入 Leaflet：

```typescript
// docusaurus.config.ts
scripts: [
  { src: "/js/leaflet-init.js", async: true },
],
```

```javascript
// static/js/leaflet-init.js —— Leaflet CDN 位址的唯一來源
var LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
var LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
var assetsRequested = false;

function requestLeafletAssets() {
  if (assetsRequested) return;          // 輪詢會重複呼叫，只注入一次
  assetsRequested = true;
  // 動態 append <link> 與 <script> 到 document.head
}

function initLeafletMaps() {
  // 1. 先找 .leaflet-map-wrapper[data-leaflet-config]，沒有就直接跳出
  // 2. 有地圖但 L 還沒載入 → requestLeafletAssets() 並排下一次輪詢
  // 3. L 就緒 → 建立地圖
}
```

#### ⚠️ `document.body` 在 `<head>` 階段是 null

`scripts` 注入的 `<script>` 位於 `<head>`，若在 IIFE 尾端直接
`new MutationObserver(...).observe(document.body, ...)` 會丟 TypeError，
使 SPA 換頁後的地圖初始化整段失效（首次載入正常，所以很難發現）。要加守衛：

```javascript
if (document.body) observeUrlChanges();
else document.addEventListener('DOMContentLoaded', observeUrlChanges);
```

## 使用方式

### 1. 基本地圖

```markdown
\`\`\`leaflet
id: my-map
lat: 25.0330
long: 121.5654
defaultZoom: 12
\`\`\`
```

### 2. 自動標記載入

```markdown
\`\`\`leaflet
id: travel-map
lat: 25.0330
long: 121.5654
defaultZoom: 10
markerFolder: backpacker/trip/places
\`\`\`
```

### 3. 標記檔案格式

標記檔案需要包含 `location` frontmatter：

```markdown
---
title: 台北101
location: [25.0340, 121.5645]
mapmarker: attraction
---

# 台北101

著名的摩天大樓...
```

## 配置選項

### 插件選項

| 選項 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `routeBase` | string | `'/'` | Wiki-link 路由基礎路徑 |

### 地圖配置

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `id` | string | `'leaflet-map'` | 地圖唯一識別碼 |
| `lat` | number | `25.0330` | 地圖中心緯度 |
| `long` | number | `121.5654` | 地圖中心經度 |
| `defaultZoom` | number | `12` | 初始縮放等級 |
| `height` | string | `'500px'` | 地圖高度 |
| `minZoom` | number | `2` | 最小縮放等級 |
| `maxZoom` | number | `18` | 最大縮放等級 |
| `markerFolder` | string | `''` | 標記檔案掃描資料夾 |

### 標記類型

| 類型 | 圖示 | 顏色 | 用途 |
|------|------|------|------|
| `default` | 📍 | 綠色 | 一般地點 |
| `restaurant` | 🍽️ | 紅色 | 餐廳美食 |
| `hotel` | 🏨 | 藍色 | 住宿飯店 |
| `attraction` | ⭐ | 橙色 | 景點名勝 |
| `airport` | ✈️ | 紫色 | 機場交通 |
| `beach` | 🏖️ | 青色 | 海灘度假 |
| `mountain` | ⛰️ | 綠色 | 山岳自然 |
| `museum` | 🏛️ | 紫色 | 博物館文化 |
| `temple` | 🛕 | 橙色 | 寺廟宗教 |
| `market` | 🛒 | 紅色 | 市場購物 |

## 技術實作

### 架構設計
- **AST 處理**: 基於 unist-util-visit 遍歷和轉換語法樹
- **檔案掃描**: 自動掃描指定資料夾的 Markdown 檔案
- **主題偵測**: 運行時動態偵測並切換地圖圖層
- **UTF-8 支援**: 使用 encodeURIComponent 確保中文正確處理

### 標記載入流程
1. 掃描 `markerFolder` 指定的資料夾
2. 解析每個 `.md` 檔案的 frontmatter
3. 提取 `location` 座標和 `mapmarker` 類型
4. 生成對應的標記配置和連結

### 主題切換機制
```javascript
// 支援明暗主題的圖層配置
const mapConfig = {
  lightTileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  darkTileLayer: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  // 運行時偵測主題並切換
};
```

## 使用場景

### 🗺️ 旅遊記錄
- 行程路線規劃
- 景點位置標記
- 旅遊回憶整理

### 📍 地點收藏
- 美食餐廳收集
- 住宿飯店記錄
- 購物景點整理

### 🏛️ 文化導覽
- 博物館展覽
- 歷史古蹟介紹
- 文化路線規劃

## 相關連結

- [[Docusaurus Plugins]] - 其他 Docusaurus 插件
- [[Integrate Obsidian and Docusaurus]] - Obsidian 整合指南
- [[Plugin Remark Obsidian Kanban]] - Kanban 看板插件
- [Leaflet.js 官方文件](https://leafletjs.com/)
