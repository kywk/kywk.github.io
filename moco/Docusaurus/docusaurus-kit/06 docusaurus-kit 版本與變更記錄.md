---
title: docusaurus-kit 版本與變更記錄
description: docusaurus-kit 的套件版本、站台整合與歷史變更集中整理
tags:
  - Docusaurus
  - docusaurus-kit
  - Changelog
  - npm
sidebar_position: 60
sidebar_label: 版本與變更記錄
date_created: 2026-10-21T00:00:00.000Z
date_updated: 2026-10-21T00:00:00.000Z
---

# docusaurus-kit 版本與變更記錄

這篇集中放版本與歷史資訊；[[01 docusaurus-kit 專案總覽|系列主文章]]只描述目前狀態與使用方式。

## 目前版本

| 套件 | npm `latest` | 說明 |
| --- | --- | --- |
| `docusaurus-theme-pele` | `0.1.1` | Pele Mermaid renderer |
| `remark-obsidian-kanban` | `0.2.1` | Obsidian Kanban → 靜態看板 |
| `rehype-obsidian-tasks` | `0.2.1` | `[-]` / `[/]` 任務狀態 |

## 版本紀錄

### docusaurus-theme-pele

| 版本 | 日期 | 變更 |
| --- | --- | --- |
| `0.1.0` | 2026-10-20 | 首發。Pele renderer、CSS 變數主題、`themeConfig.pele.zoom`、fixture/Playwright 測試 |
| `0.1.1` | 2026-10-20 | 補充 Docusaurus / React / Node.js / Pele 相容版本說明 |

### remark-obsidian-kanban

| 版本 | 日期 | 變更 |
| --- | --- | --- |
| `0.2.0` | 2026-10-20 | 首次以 npm 套件發佈。可選 `pageResolver` / `hrefTemplate`、狀態 class、settings 區塊移除、5 個單元測試 |
| `0.2.1` | 2026-10-20 | 補充相容版本說明 |

### rehype-obsidian-tasks

| 版本 | 日期 | 變更 |
| --- | --- | --- |
| `0.2.0` | 2026-10-20 | 首次以 npm 套件發佈。`[-]` / `[/]`、GFM 相容、loose list 處理、4 個單元測試 |
| `0.2.1` | 2026-10-20 | 補充相容版本說明 |

> npm 首次發佈時可能出現短暫的 `0.0.0-stage` 版本，那是 staged publish 的佔位版本；在瀏覽器完成同意後會 promote 成正式版本。

## 站台整合時間線

| 日期 | 變更 |
| --- | --- |
| 2026-10-20 | 建立 `docusaurus-kit` monorepo，網站改為 consumer |
| 2026-10-20 | kywk.me 改用 `docusaurus-theme-pele`，建置 22 頁 / 27 張圖 |
| 2026-10-20 | 修正 Album Blog 兩張圖的 `subgraph` 語法（標題補上引號） |
| 2026-10-20 | CI、Release workflow、Changesets、npm trusted publishing（OIDC）上線 |
| 2026-10-20 | `remark-obsidian-kanban@0.2.0`、`rehype-obsidian-tasks@0.2.0` 發佈 |
| 2026-10-20 | `docusaurus-theme-pele@0.1.1`、兩個 Obsidian 外掛 `0.2.1` 由 GitHub Actions OIDC 發佈 |
| 2026-10-21 | 補上 docusaurus-kit 系列文章；kanban/tasks 仍由站內版本載入，待切換 |

## 站台外掛沿革

這些是本站自己的外掛演進，與 npm 套件版本無直接關係。

### remark-obsidian-leaflet（已移除）

原本用來把 Obsidian Leaflet 區塊轉成互動地圖。2026-09-30 由 `remark-story-map` 接手後移除，避免站上同時存在兩套 Leaflet runtime。既有 ` ```leaflet ` 區塊不需改寫，標記仍由 `markerFolder` 遞迴讀取。

### remark-oembed（已移除）

原本把獨立一行的影片/圖片 URL 轉成嵌入格式。因與 `remark-wiki-link` 衝突、影響 wikilink 解析而移除；現在直接使用 Markdown 圖片與連結語法。

### 站內 Kanban / Tasks 外掛

兩個外掛原本是站內 `plugins/` 的 Docusaurus plugin wrapper：

- 舊版透過 `configureMarkdownProcessor()` 把 remark plugin 塞進處理器。
- 新版 `remark-obsidian-kanban` 直接匯出 `remarkKanban`，設定回到 `remarkPlugins`。
- `rehype-obsidian-tasks` 直接匯出 `rehypeObsidianTasks`，設定回到 `rehypePlugins`。
- 遷移時要把 import 改成 npm 套件、移除舊 wrapper，並確認 `markdown.format: 'detect'`。

kywk.me 目前仍載入站內版本；npm 版本已在 fixture site 驗證。切換會單獨處理，不與內容變更混在同一次部署。

## 修復與調整紀錄

| 日期 | 項目 | 內容 |
| --- | --- | --- |
| 2026-10-20 | Mermaid 語法 | [[01 Album Blog 概念發想與決策記錄|Album Blog 01]] / [[05 Album Blog 全自動化相簿匯入與 RAG 提示詞工程|Album Blog 05]] 的 `subgraph` 標題補上引號，Pele 才能正確解析 |
| 2026-10-20 | Tasks loose list | 支援 `<p>` 包覆與前置空白 text node 的任務清單 |
| 2026-10-21 | 文件 | 補齊套件 README 的相容版本表，並建立系列文章 |
| 2026-10-21 | 文件 | 將版本與歷史資訊集中到本篇，主文章改為現況描述 |

## 相關連結

- [docusaurus-kit repository](https://github.com/kywk/docusaurus-kit)
- [docusaurus-theme-pele](https://www.npmjs.com/package/docusaurus-theme-pele)
- [remark-obsidian-kanban](https://www.npmjs.com/package/remark-obsidian-kanban)
- [rehype-obsidian-tasks](https://www.npmjs.com/package/rehype-obsidian-tasks)
- [[01 docusaurus-kit 專案總覽]]
- [[02 docusaurus-theme-pele 與 Mermaid 遷移]]
- [[03 Obsidian 外掛 Kanban 與 Tasks]]
- [[04 GitHub Actions 與 npm 信任發佈]]
- [[05 開發測試與新增套件]]
