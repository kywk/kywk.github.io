---
title: Plugins
description: Docusaurus Plugins 筆記
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Docusaurus
  - kywk
sidebar_position: 20
sidebar_label: Plugin 使用
date_created: 2024-05-24T00:00:00.000Z
date_updated: 2025-09-23T00:00:00.000Z
history:
  - 2024-05-24 Init
slug: /obsidian/docusaurus/docusaurus-plugins/
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

### remark-obsidian-leaflet

[[Plugin Remark Obsidian Leaflet]] 是自製的 Docusaurus remark 插件，用於將 Obsidian Leaflet 格式的地圖代碼轉換為互動式地圖顯示。

**核心功能**：
- 自動識別 `leaflet` 程式碼區塊
- 支援明暗主題自動切換
- 自動從 Markdown 檔案讀取地點標記
- Wiki-link 連結整合與中文支援

## 已移除插件

### remark-oembed

[remark-oembed](https://github.com/sergioramos/remark-oembed) 可將獨立一行的影片/圖片 URL 轉換成嵌入式格式。

**移除原因**：與 remark-wiki-link 產生衝突，影響 wikilink 解析功能。

**替代方案**：直接使用 Markdown 的圖片和連結語法。
