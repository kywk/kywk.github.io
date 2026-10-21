---
title: Docusaurus 站台版本與變更記錄
description: kywk.me 這個 Docusaurus 站台的內容、外掛與升級變更
tags:
  - Docusaurus
  - Changelog
  - Album
  - StoryMap
  - 升級
sidebar_position: 90
sidebar_label: 站台變更記錄
date_created: 2026-10-21T00:00:00.000Z
date_updated: 2026-10-21T00:00:00.000Z
---

# Docusaurus 站台版本與變更記錄

這篇記錄 kywk.me 這個 Docusaurus 站台的變更，包括外掛、內容功能與 Docusaurus 升級。套件本身的版本與里程碑請看 [[06 docusaurus-kit 版本與變更記錄]]；站台可以連到套件，但套件不反向依賴站台。

## 目前站台狀態

| 項目 | 目前狀態 |
| --- | --- |
| Docusaurus | `3.10.2` |
| Mermaid renderer | `docusaurus-theme-pele@0.1.1` |
| Obsidian Kanban | `remark-obsidian-kanban@0.3.0`（npm，docusaurus-kit 發佈） |
| Obsidian Tasks | `rehype-obsidian-tasks@0.2.1`（npm，docusaurus-kit 發佈） |
| 相簿 | 站內 `plugins/docusaurus-plugin-album` |
| 故事地圖 | `remark-story-map` |
| 站內搜尋 | `@easyops-cn/docusaurus-search-local` |
| Slug | `plugins/remark-slug-normalizer` |

## 時間線

| 日期 | 變更 |
| --- | --- |
| 2022-05-24 | 建立 Docusaurus 站台與進階設定 |
| 2022-11-01 | 建立 Obsidian 與 Docusaurus 整合 |
| 2024-01-10 | 從 Docusaurus v2 升級到 v3 |
| 2024-05-15 | 支援 Obsidian wikilink |
| 2025-09-23 | 加入 Obsidian Kanban 外掛 |
| 2025-12-24 | 支援 Obsidian callouts |
| 2026-08-17 | 多實例站設定、search-local、backdrop-filter、TOC 與 3.9 → 3.10 升級 |
| 2026-09-30 | 以 `remark-story-map` 取代站內 Leaflet 外掛 |
| 2026-10-02 | 加入 Album 相簿部落格外掛 |
| 2026-10-20 | 拆分 `docusaurus-kit`；站台改用 `docusaurus-theme-pele` |
| 2026-10-20 | 修正 Album Blog 兩張圖的 `subgraph` 語法；22 頁 / 27 張圖正常渲染 |
| 2026-10-20 | `remark-obsidian-kanban@0.2.0`、`rehype-obsidian-tasks@0.2.0` 發佈到 npm |
| 2026-10-20 | `docusaurus-theme-pele@0.1.1`、兩個 Obsidian 外掛 `0.2.1` 由 OIDC 發佈 |
| 2026-10-21 | 補上 docusaurus-kit 系列文章；kanban/tasks 切換為 npm 版本並移除站內 `plugins/` 複本 |

## 站台外掛沿革

### Obsidian Leaflet → StoryMap

原本站內有 `remark-obsidian-leaflet`，用來把 Obsidian Leaflet 區塊轉成互動地圖。2026-09-30 由 `remark-story-map` 接手後移除，避免站上同時存在兩套 Leaflet runtime。

既有 ` ```leaflet ` 圍欄區塊不需改寫，標記仍由 `markerFolder` 遞迴讀取。相容細節見 [[06 Geo Story Map 純地圖與 Leaflet 相容]]，遷移配置見 [[Plugin Remark Obsidian Leaflet]]。

### remark-oembed

原本用來把獨立一行的影片/圖片 URL 轉成嵌入格式。因與 `remark-wiki-link` 衝突、影響 wikilink 解析而移除；現在直接使用 Markdown 圖片與連結語法。

### Kanban / Tasks 外掛

兩個外掛原本是站內 `plugins/` 的 Docusaurus plugin wrapper：

- 舊版透過 `configureMarkdownProcessor()` 把 remark plugin 塞進處理器。
- 新版 `remark-obsidian-kanban` 直接匯出 `remarkKanban`，設定回到 `remarkPlugins`。
- `rehype-obsidian-tasks` 直接匯出 `rehypeObsidianTasks`，設定回到 `rehypePlugins`。
- 站台已切換為 npm 版本（`remark-obsidian-kanban@0.3.0`、`rehype-obsidian-tasks@0.2.1`），`docusaurus.config.ts` 直接 `require` 套件名；`markdown.format: 'detect'` 與 `remark-wiki-link` 的順序維持不變。

### Album 與 StoryMap 留在站台

`docusaurus-plugin-album`、`remark-story-map` 與 `remark-slug-normalizer` 仍留在站台 repository，因為它們包含站台路由、內容結構或版型政策。等 API 變成資料中立後，再評估是否移進 `docusaurus-kit`。

## 站台修復紀錄

| 日期 | 項目 | 內容 |
| --- | --- | --- |
| 2026-10-20 | Mermaid `subgraph` | [[01 Album Blog 概念發想與決策記錄]] / [[05 Album Blog 全自動化相簿匯入與 RAG 提示詞工程]] 的 `subgraph` 標題補上引號，Pele 才能正確解析 |
| 2026-08-17 | 多實例搜尋 | 指定 `docsPluginIdForPreferredVersion`，避免非 docs 頁面 fallback 到不存在的 `default` 實例 |
| 2026-08-17 | TOC | 用 `hide_table_of_contents: true` 關閉目錄，避免看板 heading 被替換後留下 broken anchors |
| 2026-08-17 | Navbar | `backdrop-filter` 與 fixed 子元素衝突，選單展開時關閉效果 |
| 2026-08-17 | Docusaurus 3.10 | `future.experimental_faster` 改名、frontmatter tab 縮排會讓 build 失敗 |

## 相關文章

- [[Docusaurus v3 Upgrading]]
- [[Docusaurus Setup Note]]
- [[Docusaurus Plugins]]
- [[Plugin Remark Obsidian Kanban]]
- [[Plugin Remark Obsidian Leaflet]]
- [[01 Geo Story Map 專案介紹]]
- [[03 Album Blog 完工成果與架構插件化評估]]
- [[06 docusaurus-kit 版本與變更記錄]]
