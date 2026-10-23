---
title: Album 相簿部落格：完工成果與路徑一插件化實作
description: 回顧 Docusaurus Album 相簿部落格的完整落地成果、圖文功能解析，並記錄依「路徑一（Wrapper Pattern）」封裝為獨立 Docusaurus Plugin 的架構實作
tags:
  - Docusaurus
  - Album
  - Plugin
  - 前端架構
  - 完工成果
sidebar_position: 30
date_created: 2026-10-02T00:00:00.000Z
date_updated: 2026-10-23T00:00:00.000Z
---

# Album 相簿部落格：完工成果與路徑一插件化實作

> **2026-10-23 更新**：`docusaurus-plugin-album` 在完成相簿首頁輕量資料分塊（Route Data Chunking）、捲動監聽與圖片載入優化後，已正式從站內 `plugins/` 抽離至 [[01 docusaurus-kit 專案總覽|docusaurus-kit]] 發佈為 npm 套件（`docusaurus-plugin-album@0.1.1`），本站已改為直接安裝 npm 套件使用。以下保留插件化演進與關鍵架構記錄。

接續前文 [[01 Album Blog 概念發想與決策記錄|概念發想與決策記錄]] 與 [[02 Album Blog 技術架構與實作計畫|技術架構與實作計畫]]，**Album 相簿部落格** 不僅已全數落地上線，更進一步依據技術評估之**「路徑一（Wrapper Pattern 微包裝模式）」**，正式將相簿功能抽離並封裝為專案內的獨立外掛 `plugins/docusaurus-plugin-album/`。

本文將展示完工後的最終視覺成果、互動機制，以及外掛封裝落地的完整工程細節。

---

## 🎨 完工成果圖文解析（Feature Walkthrough）

相簿部落格跳脫傳統技術文章以文字為主的框架，建立起專屬於影像敘事的閱讀體驗：

```mermaid
graph LR
    A[相簿首頁 /album/] -->|點擊相片卡片| B[相簿內頁 /album/YYYY/...]
    B -->|點擊封面或正文照片| C[自製全螢幕 Lightbox 燈箱]
    
    subgraph 首頁特點
        A1[Pinterest 純圖瀑布流]
        A2[滑鼠懸停 Hover 浮現資訊]
        A3[Google Photos 時間軸滑桿]
    end

    subgraph 內頁特點
        B1[Hero Header 滿版封面大圖]
        B2[拍攝地點與相簿系列徽章]
        B3[全圖 Lazy-loading 載入]
    end

    subgraph 燈箱特點
        C1[鍵盤左右切換與 ESC 關閉]
        C2[背景滾動鎖定]
        C3[嚴格排除作者大頭貼]
    end

    A --- A1
    A --- A2
    A --- A3
    B --- B1
    B --- B2
    B --- B3
    C --- C1
    C --- C2
    C --- C3
```

### 1. Pinterest 純圖瀑布流首頁（Masonry Grid & Hover Overlay）
- **視覺純粹性**：進入 `/album/` 首頁，映入眼簾的是純淨的照片瀑布流。卡片依據自然長寬比（橫圖 16:9、直圖 4:5、直立街景 9:16、正方形 1:1）錯落排列，徹底發揮影像張力。
- **無干擾 Hover 浮層**：相片預設不顯示冗長文字；當滑鼠懸停（Hover）於卡片時，底部以平滑動畫浮現半透明深色漸層遮罩，優雅展示文章標題、拍攝地點（📍）與相簿系列（📁）。
- **觸控裝置友善**：在不支援滑鼠 Hover 的手機或平板上，透過 `@media (hover: none)` 自動維持適度透明度的資訊浮層，兼顧易讀性。

### 2. Google Photos 風格時間軸滑桿（Timeline Scrubber）
- **歷史穿越導航**：畫面右側提供膠囊造型的時間軸滑桿，列出相簿涵蓋的年份刻度（如 `2026`、`2025`、`2024`）。
- **動態氣泡回饋**：當使用者滾動頁面或點擊特定年份時，滑桿旁會同步展開深色毛玻璃氣泡，提示當前視野所處的年月，並平滑滾動（Smooth Scroll）至對應區段。

### 3. 文章內頁 Hero Header
- **沉浸式第一印象**：文章頂部不再使用普通的文字標題，而是採用圓角與微光澤邊框包覆的 `AlbumHeroHeader`，大圖右下方標示圖說，底部卡片清楚列出拍攝地點與自訂相簿分類徽章。
- **保留側欄目錄**：完美相容專案既有的 `BlogSidebar` 年月摺疊選單，使相簿同時具備「自由瀏覽」與「精準檢索」的雙重能力。

### 4. 零依賴自製全螢幕燈箱（Image Lightbox）
- **純 React + CSS 實作**：無需引入肥大的外部燈箱套件，以不到 150 行程式碼實現極致輕量的沉浸式圖片檢視器。
- **操作體驗**：
  - 支援鍵盤快速鍵：`←` / `→` 循環切換前後張、`ESC` 隨時關閉。
  - 燈箱啟動時自動鎖定 `document.body` 滾動條，關閉時無縫復原。
  - 左上方即時顯示相片張數進度（如 `1 / 4`），右上方配置旋轉動畫關閉鈕。
- **關鍵除錯：嚴格排除作者大頭貼（Avatar Exclusion）**：
  - 原始實作直接收集文章容器內的所有 `img` 標籤，導致 Docusaurus 的作者大頭照（Avatar）也被納入相片輪播。
  - 修正後將選取範圍精準鎖定於 `.markdown img`，並建立雙重過濾機制：凡符合 `.avatar__photo`、父元素包含 `.avatar` 或位於 `header` 區塊者一律剃除，確保燈箱內 100% 只呈現純粹的攝影作品。

---

## 🚀 獨立外掛實作：`docusaurus-plugin-album`

為了讓本 repository 的設定檔保持整潔，並使相簿邏輯能像 [[Plugin Remark Obsidian Kanban]] 或 [[01 Geo Story Map 專案介紹|Geo Story Map]] 一樣具備高度內聚性，我們採用**路徑一（微包裝模式）**將 Album 完整抽離為獨立外掛。

### 1. 外掛目錄結構

所有相簿相關之 React 元件、樣式表與外掛生命週期進入點，均集中於 `plugins/docusaurus-plugin-album/`：

```text
plugins/docusaurus-plugin-album/
├── package.json          # 外掛宣告清單
├── README.md             # 外掛使用說明文件
├── index.js              # 外掛進入點 (Wrapper Lifecycle & validateOptions)
├── index.d.ts            # TypeScript 型別宣告
└── src/
    └── theme/            # 可被 Swizzle 的主題組件
        ├── AlbumListPage.tsx      # 相簿首頁控制器
        ├── AlbumPostPage.tsx      # 相簿內頁控制器
        ├── AlbumHeroHeader.tsx    # 內頁大圖橫幅
        ├── AlbumMasonryGrid.tsx   # Pinterest 瀑布流網格
        ├── TimelineScrubber.tsx   # Google Photos 時間軸
        ├── ImageLightbox.tsx      # 全螢幕相片燈箱
        └── styles.module.css      # Scoped CSS Modules
```

### 2. 外掛進入點與關鍵設計（`index.js`）

在實作 `@docusaurus/plugin-content-blog` 包裹層時，最核心的關鍵是 **`validateOptions` 生命週期鉤子**：

```javascript
// plugins/docusaurus-plugin-album/index.js
const pluginContentBlog = require('@docusaurus/plugin-content-blog').default;
const { validateOptions: validateBlogOptions } = require('@docusaurus/plugin-content-blog');
const path = require('path');

/**
 * 預先注入相簿專屬預設值，並委託官方 blog validator 補全 authorsMapPath 等內部屬性
 */
function validateOptions({ validate, options = {} }) {
  const mergedOptions = {
    id: 'album',
    path: 'blog.album',
    routeBasePath: 'album',
    blogSidebarTitle: 'All albums',
    blogSidebarCount: 'ALL',
    postsPerPage: 'ALL',
    blogListComponent: path.resolve(__dirname, './src/theme/AlbumListPage'),
    blogPostComponent: path.resolve(__dirname, './src/theme/AlbumPostPage'),
    onUntruncatedBlogPosts: 'ignore',
    showReadingTime: true,
    ...options,
  };

  return validateBlogOptions({ validate, options: mergedOptions });
}

module.exports = async function pluginAlbum(context, options) {
  const blogPluginInstance = await pluginContentBlog(context, options);

  return {
    ...blogPluginInstance,
    // 保留 blogPluginInstance.name ('docusaurus-plugin-content-blog')，切勿覆寫為 'docusaurus-plugin-album'
    getThemePath() {
      return path.resolve(__dirname, './src/theme');
    },
  };
};

module.exports.validateOptions = validateOptions;
```

#### 技術細節：為什麼必須 export `validateOptions`？
Docusaurus 在構建網站（`docusaurus build`）時，會先執行外掛的 `validateOptions`。若直接將 options 傳給 `pluginContentBlog(context, options)` 而跳過驗證步驟，`options.authorsMapPath` 等預設欄位將維持 `undefined`，導致底層在執行 `path.join()` 時拋出 `TypeError: The "path" argument must be of type string`。
透過在外掛導出 `validateOptions` 並鏈結官方驗證器，既能享有自訂相簿預設值，又兼顧 100% 的官方配置相容性。

#### 架構踩坑：為什麼微包裝模式不能覆寫外掛的 `name`？
在使用 Wrapper Pattern 封裝官方 `@docusaurus/plugin-content-blog` 時，若直覺地在外掛回傳物件中宣告 `name: 'docusaurus-plugin-album'`，會在建置階段引發致命的模組找不到錯誤：
1. **資料產出路徑（`createData`）**：Docusaurus 核心以 `path.join(generatedFilesDir, plugin.name, pluginId)` 決定輸出目錄，因此相簿中繼資料 JSON 被寫入 `.docusaurus/docusaurus-plugin-album/album/`。
2. **MDX 解析引入路徑（`metadataPath`）**：底層 `@docusaurus/plugin-content-blog` 內部的 MDX Loader 規則硬編碼了常數 `const PluginName = 'docusaurus-plugin-content-blog'`，向 Webpack / Rspack 要求載入 `@site/.docusaurus/docusaurus-plugin-content-blog/album/...`。
3. **路徑錯位**：導致 Client bundle 編譯時拋出 `Cannot find module '@site/.docusaurus/docusaurus-plugin-content-blog/album/...'`。

**結論**：包裝官方內容外掛時，必須沿用底層原生 `name`（多實例依賴 `options.id = 'album'` 區分），如此既能確保資料寫入與 MDX Loader 讀取路徑完全對齊，自訂的 `getThemePath()` 也依然能正常生效。

---

## 📐 引用方式更新：主設定檔全面解耦

在外掛獨立封裝前，`docusaurus.config.ts` 充滿了專案級的三元運算子；重構後，主設定檔乾淨利落：

### 重構前（內嵌判斷）
```typescript
...blogConfig.map(blog => [
  "@docusaurus/plugin-content-blog",
  {
    id: blog.id,
    blogSidebarTitle: blog.id === 'album' ? 'All albums' : 'All posts',
    postsPerPage: blog.id === 'album' ? 'ALL' : 10,
    blogListComponent: blog.id === 'album' ? path.resolve(__dirname, 'src/components/Album/AlbumListPage.tsx') : '@theme/BlogListPage',
    blogPostComponent: blog.id === 'album' ? path.resolve(__dirname, 'src/components/Album/AlbumPostPage.tsx') : '@theme/BlogPostPage',
    // ...
  },
])
```

### 重構後（比照其他 plugins）
```typescript
// docusaurus.config.ts

// 1. 一般文字部落格 (News & Life)
...blogConfig.filter(b => b.id !== 'album').map(blog => [
  "@docusaurus/plugin-content-blog",
  {
    id: blog.id,
    routeBasePath: blog.routeBasePath,
    path: blog.path,
    remarkPlugins: createBlogRemarkPlugins(blog),
    rehypePlugins: rehypeObsidianTasks ? [rehypeObsidianTasks] : [],
    blogSidebarTitle: "All posts",
    postsPerPage: 10,
  },
]),

// 2. 獨立相簿外掛 (Album Plugin，2026-10-23 起改用 npm 套件)
[
  "docusaurus-plugin-album",
  {
    id: "album",
    routeBasePath: "album",
    path: "blog.album",
    remarkPlugins: createBlogRemarkPlugins({ id: "album", path: "blog.album" }),
    rehypePlugins: rehypeObsidianTasks ? [rehypeObsidianTasks] : [],
  },
],
```

---

## ⚡ 2026-10-23 效能優化與 npm 套件化（`docusaurus-kit`）

隨著相簿文章數量成長，我們在將 `docusaurus-plugin-album` 移入 [[01 docusaurus-kit 專案總覽|docusaurus-kit]] 前完成了五項關鍵優化：

1. **相簿首頁輕量索引（Route Data Chunking）**：覆寫 `contentLoaded` 的 `actions.addRoute`，將原本列表頁會載入整包 MDX 正文與完整中繼資料的 `items` 替換為精簡的 `albumItems` JSON 檔案（僅保留 `id`、`title`、`permalink`、`date`、`formattedDate`、`image`、`location`、`album`、`aspectRatio`），大幅降低 `/album` 首頁的 JS bundle 體積與 Hydration 負擔。
2. **首屏優先與非同步圖片解碼**：瀑布流前 4 張圖片設為 `loading="eager"` + `fetchPriority="high"` 加速 LCP；其餘卡片維持 `loading="lazy"` + `decoding="async"`，並對卡片容器加上 `content-visibility: auto`，減少大量照片時的排版開銷。
3. **時間軸低頻狀態更新**：`TimelineScrubber` 的 `scroll` 監聽器改以 `useRef` 追蹤當前月份，僅在跨越月份區段時才觸發 React `setState`，並快取年份錨點座標避免在捲動期間強制同步重排（Forced Reflow）。
4. **燈箱正規化與前後張預載**：移除 `MutationObserver` 重複執行 `querySelectorAll` 的迴圈，改用 `data-album-lightbox-bound` 標記避免重複綁定，並在開啟燈箱時自動預載前後相鄰照片。
5. **發佈至 npm（`docusaurus-plugin-album@0.1.1`）**：由於 Docusaurus 打包工具預設排除 `node_modules` 的 TypeScript 語法轉譯，套件透過雙 `tsconfig` 將 `lib/theme/*.js` 預先編譯為 ESM JavaScript 供 `getThemePath()` 使用，同時保留 `src/theme/*.tsx` 供 `getTypeScriptThemePath()` swizzle 使用。

---

## 🎯 總結

1. **職責分離**：主專案的 `src/components/` 移除所有特定頻道的大型相簿元件，全部歸位至 `plugins/docusaurus-plugin-album/`。
2. **開箱即用**：相簿的 Pinterest 首頁、Hover 浮層、時間軸導航與照片燈箱，均作為外掛預設行為自動生效。
3. **無痛升級**：全站經 `npm run typecheck`、`npm run content:check` 及 `npm run build` 檢驗通過，靜態導出產生的 `/album/` 路由與全站功能皆無損銜接。

👉 接續閱讀相簿內容匯入與自動化：[[04 Album Blog Flickr 相簿匯入與自動化整合方案|Album 相簿部落格：Flickr 歷史相簿匯入與 AI 自動化整合方案]]
