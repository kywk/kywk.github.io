---
title: Plugins
description: Docusaurus Plugins 筆記
cover: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Docusaurus
  - kywk
  - npm
  - docusaurus-kit
sidebar_position: 60
sidebar_label: Plugin 使用
date_created: 2024-05-24T00:00:00.000Z
date_updated: 2026-10-23T00:00:00.000Z
history:
  - 2026-10-21 更新為目前套件與 Pele 狀態；歷史見 [[Docusaurus 版本與變更記錄]]
  - 2026-10-23 docusaurus-plugin-album 移入 docusaurus-kit 並切換為 npm 版本 0.1.1；同步更新 pele 0.1.2、kanban 0.3.1、tasks 0.2.2
---

# [Docusaurus] Plugin 使用筆記

本文記錄在 Docusaurus 專案中使用的各種 remark 插件，特別是針對 Obsidian 整合所開發或配置的插件。

> 多數外掛已由 [[01 docusaurus-kit 專案總覽|docusaurus-kit]] 發佈到 npm；站台直接使用 npm 版本，僅剩 slug normalizer 與 story-map loader 留在站內 `plugins/`。

## docusaurus-kit 套件

| 套件 | 版本 | 類型 | 用途 |
| --- | --- | --- | --- |
| `docusaurus-theme-pele` | `0.1.2` | theme | 以 Pele 取代 Mermaid renderer |
| `docusaurus-plugin-album` | `0.1.1` | plugin | Pinterest 瀑布流相簿、時光軸與燈箱 |
| `remark-obsidian-kanban` | `0.3.1` | remark | Obsidian Kanban 轉靜態看板 |
| `rehype-obsidian-tasks` | `0.2.2` | rehype | `[-]` / `[/]` 任務狀態 |

來源與發佈流程見 [[01 docusaurus-kit 專案總覽]]、[[04 GitHub Actions 與 npm 信任發佈]]。

## 核心外掛與主題

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

### docusaurus-theme-pele

以 [Pele](https://pele.run) 取代 `@docusaurus/theme-mermaid` 的 Docusaurus theme。仍使用 `mermaid` 圍欄語法，但 renderer 換成體積較小、同步渲染、可用 CSS 變數切換主題的 Pele。

設定只有兩件事：`markdown.mermaid: true` 與 `themes: ['docusaurus-theme-pele']`；舊的 `@docusaurus/theme-mermaid`、`mermaid`、`@mermaid-js/layout-elk` 可以移除。詳細遷移與相容性見 [[02 docusaurus-theme-pele 與 Mermaid 遷移]]。

### remark-obsidian-kanban

已從站內 `plugins/` 抽到 [[01 docusaurus-kit 專案總覽|docusaurus-kit]]，站台直接使用 npm 版本 `0.3.1`。[[Plugin Remark Obsidian Kanban]] 保留為詳細使用與實作筆記。

**核心功能**：
- 自動識別 `kanban-plugin: board` frontmatter
- `##` 轉欄位、清單項目轉卡片，欄位標題顯示卡片數
- 可選 `pageResolver` / `hrefTemplate` 解析卡片內的 wikilink；不提供時仍可渲染
- 卡片狀態 `[ ]`、`[x]`、`[-]`、`[/]` 會轉成對應 class 與 `data-task`
- 圖片、Markdown 連結與縮排內容保留
- 自動移除 Obsidian 的 `kanban:settings` 區塊

**注意**：外掛輸出 raw HTML，Docusaurus 需設 `markdown.format: 'detect'`；看板頁請用 frontmatter `hide_table_of_contents: true`，不要用 CSS 隱藏 TOC。

### rehype-obsidian-tasks

將 Obsidian 的 `[-]`（取消）與 `[/]`（進行中）轉成 GFM task item 的 rehype 外掛，npm 版本 `0.2.2`。

**核心功能**：
- 保留標準 GFM `[ ]` / `[x]` 行為
- 加上 `task-list-item--cancelled`、`task-list-item--in-progress` 與 `data-task`
- 父層清單加 `contains-task-list`
- 支援 tight list 與 loose list
- 只處理 task item 的 class/attribute 與 checkbox，視覺由站台 CSS 決定

安裝、設定與兩個外掛一起用的範例見 [[03 Obsidian 外掛 Kanban 與 Tasks]]。

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

已從站內 `plugins/` 抽到 [[01 docusaurus-kit 專案總覽|docusaurus-kit]] 發佈，站台直接使用 npm 版本 `0.1.1`。以微包裝模式（Wrapper Pattern）封裝 `@docusaurus/plugin-content-blog`，為相簿頻道打造專屬的影像敘事與互動瀏覽體驗。

**核心功能**：
- **Pinterest 瀑布流**：長寬比自適應卡片錯落分欄，滑鼠懸停（Hover）平滑浮現標題、地點與相簿系列；首屏前 4 張高優先權載入，其餘非同步解碼與延遲渲染
- **Google Photos 時光軸**：右側固定膠囊滑桿，即時年份感應與平滑錨點跳轉（僅在捲動跨越月份區段時觸發 React 狀態更新）
- **沉浸式 Hero Header**：文章內頁滿版封面橫幅與中繼資料徽章
- **原生全螢幕相片燈箱**：零依賴輕量 Lightbox，支援鍵盤導航、前後張預載並嚴格排除作者大頭貼（Avatar Exclusion）
- **獨立輕量索引**：透過 `contentLoaded` 將相簿首頁精簡卡片索引拆為獨立 JSON chunk，避免把全文 MDX bundle 帶進列表頁

**配置範例**：
```typescript
// docusaurus.config.ts
[
  'docusaurus-plugin-album',
  {
    id: 'album',
    routeBasePath: 'album',
    path: 'blog.album',
    remarkPlugins: createBlogRemarkPlugins({ id: 'album', path: 'blog.album' }),
  },
]
```

詳細架構設計與演進過程見 [[03 Album Blog 完工成果與架構插件化評估|Album 相簿部落格：完工成果與路徑一插件化實作]]。

## 已移除外掛

`remark-obsidian-leaflet` 與 `remark-oembed` 的移除原因、替代方案與站台外掛沿革，整理在 [[Docusaurus 版本與變更記錄]]。

## 延伸閱讀

- [[01 docusaurus-kit 專案總覽]]
- [[02 docusaurus-theme-pele 與 Mermaid 遷移]]
- [[03 Obsidian 外掛 Kanban 與 Tasks]]
- [[04 GitHub Actions 與 npm 信任發佈]]
- [[05 開發測試與新增套件]]
- [[06 docusaurus-kit 版本與變更記錄]]
- [[Docusaurus 版本與變更記錄]]
