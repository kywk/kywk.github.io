---
title: Plugins
description: Docusaurus Plugins 筆記
cover: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Docusaurus
  - kywk
sidebar_position: 60
sidebar_label: Plugin 使用
date_created: 2024-05-24T00:00:00.000Z
date_updated: 2026-10-02T00:00:00.000Z
history:
  - 2026-10-02 新增 docusaurus-plugin-album 相簿外掛紀錄
  - 2026-09-30 remark-obsidian-leaflet 刪除，改用 remark-story-map
  - 2024-05-24 Init
---

# [Docusaurus] Plugin 使用筆記

本文記錄在 Docusaurus 專案中使用的各種 remark 插件，特別是針對 Obsidian 整合所開發或配置的插件。

## 核心插件

### remark-wiki-link

[[Wikilink in Docusaurus]] 插件支援 `[[Document Filename|Display Title]]` 這樣的 Wiki 內部文件連結語法。

**主要優勢**：
- **動態解析**：不需指明檔案絕對位置，產出文件網站時動態搜尋
- **重構友善**：重構資料夾結構或搬移檔案時，較不會造成連結失效
- **Obsidian 相容**：與 Obsidian 的 Wiki-Link 語法完全相容

**配置範例**：
```javascript
[remarkWikiLink, {
  pageResolver: createPageResolver(fileMap),
  hrefTemplate: (permalink) => `/${permalink}/`,
  aliasDivider: '|'
}]
```

### remark-obsidian-kanban

[[Plugin Remark Obsidian Kanban]] 是自製的 Docusaurus remark 插件，用於將 Obsidian Kanban 格式的 markdown 文件轉換為網頁看板顯示。

**核心功能**：
- 自動識別 `kanban-plugin: board` frontmatter
- 支援 wikilink 連結解析與錯誤處理
- 圖片嵌入與響應式設計
- 與 Docusaurus 主題整合與 TOC 隱藏

### remark-story-map

[[01 Geo Story Map 專案介紹|Geo Story Map]] 官方發布的 Docusaurus remark 插件，負責把兩種地理圍欄區塊轉成互動式地圖。

**核心功能**：
- 自動識別 `story-map`（故事地圖）與 `leaflet`（純地圖）兩種程式碼區塊
- `markerFolder` / `noteFolder` 遞迴掃描 Vault，既有筆記的 `location`、`mapmarker`、`mapzoom` 直接沿用
- 建置期只輸出空 host 容器，Leaflet 僅在瀏覽器端動態載入（SSR／build 不會建立實例）
- 單一 client 生命週期依明確的 `story` / `map` 判別式掛載，同一頁不會初始化兩次 Leaflet

**配置範例**：

```javascript
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
// docusaurus.config.ts
const storyMapOptions = {
  vaultRoot: __dirname,                        // 掃描標記來源的 Vault 根目錄
  resolveNoteHref: (vaultRelativePath) =>      // 網址交給站台既有索引決定
    contentLinkIndex.resolve(vaultRelativePath)[0]?.route,
  leafletDefaults: { theme: 'auto' },          // 僅供 leaflet 區塊使用
};

remarkPlugins: [[remarkStoryMap, storyMapOptions]]
```

`react` 與 `react-dom` 是 peer dependency，兩者都必須是 React 19。完整安裝、主題橋接與移除舊 runtime 的步驟見 [[Plugin Remark Obsidian Leaflet]]。

### docusaurus-plugin-album

自製的 Docusaurus 攝影相簿外掛程式（位於 `plugins/docusaurus-plugin-album/`），以微包裝模式（Wrapper Pattern）封裝 `@docusaurus/plugin-content-blog`，為相簿頻道打造專屬的影像敘事與互動瀏覽體驗。

**核心功能**：
- **Pinterest 瀑布流**：長寬比自適應卡片錯落分欄，滑鼠懸停（Hover）平滑浮現標題、地點與相簿系列
- **Google Photos 時光軸**：右側固定膠囊滑桿，即時年份感應與平滑錨點跳轉
- **沉浸式 Hero Header**：文章內頁滿版封面橫幅與中繼資料徽章
- **原生全螢幕相片燈箱**：零依賴輕量 Lightbox，支援鍵盤導航並嚴格排除作者大頭貼（Avatar Exclusion）
- **乾淨解耦**：自帶 `validateOptions` 與 Theme Components，無需在主設定檔撰寫判斷式

**配置範例**：
```typescript
// docusaurus.config.ts
[
  path.resolve(__dirname, 'plugins/docusaurus-plugin-album'),
  {
    id: 'album',
    routeBasePath: 'album',
    path: 'blog.album',
    remarkPlugins: createBlogRemarkPlugins({ id: 'album', path: 'blog.album' }),
  },
]
```

詳細架構設計與演進過程見 [[03 Album Blog 完工成果與架構插件化評估|Album 相簿部落格：完工成果與路徑一插件化實作]]。

## 已移除插件

### remark-obsidian-leaflet（已刪除）

自製的 remark 插件，用於將 Obsidian Leaflet 格式的地圖代碼轉換為互動式地圖顯示。**已於 2026-09-30 刪除**。

**移除原因**：功能已被 `remark-story-map` 完整接手，兩者同時載入會讓站上存在兩套 Leaflet runtime。`plugins/remark-obsidian-leaflet/`、`static/js/leaflet-init.js` 與相關的 `.leaflet-*` 樣式都已刪除。

**原本的核心功能（皆已由 Geo Story Map 接手）**：
- 自動識別 `leaflet` 程式碼區塊
- 支援明暗主題自動切換
- 自動從 Markdown 檔案讀取地點標記
- Wiki-link 連結整合與中文支援

既有 ` ```leaflet ` 圍欄區塊**不需要改寫**，標記照樣從 `markerFolder` 遞迴讀取既有筆記的 `location`。相容程度與保留中的 key 見 [[06 Geo Story Map 純地圖與 Leaflet 相容]]，遷移配置見 [[Plugin Remark Obsidian Leaflet]]。

### remark-oembed

[remark-oembed](https://github.com/sergioramos/remark-oembed) 可將獨立一行的影片/圖片 URL 轉換成嵌入式格式。

**移除原因**：與 remark-wiki-link 產生衝突，影響 wikilink 解析功能。

**替代方案**：直接使用 Markdown 的圖片和連結語法。
