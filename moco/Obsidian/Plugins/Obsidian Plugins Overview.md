---
title: Obsidian Plugins Overview
description: 目前 vault 的核心功能、已啟用外掛與外掛設定總覽
cover: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - 配置
  - 總覽
sidebar_position: 10
sidebar_label: 外掛總覽
date_created: 2025-12-24T00:00:00.000Z
date_updated: 2026-09-30T00:00:00.000Z
---

# [Obsidian] 外掛使用狀況總覽

本頁以 `.obsidian/core-plugins.json`、`.obsidian/community-plugins.json`、各外掛的 `manifest.json` 與 `data.json` 為準。最後核對日：**2026-09-30**。

> **地圖外掛已換成 Geo Story Map。** 原先的 `obsidian-leaflet-plugin` 已於 2026-09-30 **解除安裝**（`community-plugins.json` 已移除，`.obsidian/plugins/obsidian-leaflet-plugin/` 目錄也已刪除），改由 [[01 Geo Story Map 專案介紹|Geo Story Map]]（`geo-story-map` v0.5.0）負責。既有 `location`、`mapmarker`、`mapzoom` frontmatter 欄位與 ` ```leaflet ` 圍欄區塊都繼續沿用，筆記不需要改寫。

## 核心功能

### 已啟用

目前啟用的核心功能可分成：

- **導覽與搜尋**：File explorer、Global search、Switcher、Graph、Backlinks、Outgoing links、Tag pane、Page preview、Outline。
- **筆記與內容**：Daily Notes、Note composer、Command palette、Editor status、Word count、File recovery、Canvas。
- **結構化資料**：Properties、Bases。

### 已停用

目前停用的核心功能包括 Templates、Slash command、Starred、Markdown importer、ZK prefixer、Random note、Slides、Audio recorder、Workspaces、Publish、Sync、Bookmarks、Web viewer 與 Footnotes。

日記模板不是使用核心 Templates，而是使用已啟用的 Templater；詳見 [[Obsidian Plugin Templater]] 與 [[Obsidian Daily Notes]]。

## 已啟用的社群外掛

以下清單來自 `.obsidian/community-plugins.json`：

| ID | 名稱 | 在 vault 中的用途 |
| --- | --- | --- |
| `obsidian-auto-link-title` | Auto Link Title | 自動取得外部連結標題 |
| `calendar` | Calendar | Daily Notes 日期導覽；週一為一週開始日 |
| `cm-editor-syntax-highlight-obsidian` | Editor Syntax Highlight | 編輯器中的程式碼語法高亮 |
| `obsidian-kanban` | Kanban | Markdown 看板；日期連結到 Daily Notes |
| `recent-files-obsidian` | Recent Files | 最近開啟檔案 |
| `obsidian-style-settings` | Style Settings | Blue Topaz 與其他樣式設定 |
| `tag-wrangler` | Tag Wrangler | 標籤整理與重新命名 |
| `obsidian-tasks-plugin` | Tasks | 任務查詢、完成／取消日期與自訂狀態 |
| `dataview` | Dataview | Daily Notes 的檔案查詢與 DataviewJS |
| `obsidian-outliner` | Outliner | 列表與大綱編輯 |
| `quickadd` | QuickAdd | 快速新增內容；目前沒有已儲存的 choice |
| `obsidian-tracker` | Tracker | 數值與事件追蹤 |
| `templater-obsidian` | Templater | `_templates` 模板與 `_templates/scripts` 使用者腳本 |
| `vault-feed-reader` | Vault Feed Reader | RSS／Atom 閱讀與 Markdown 保存 |
| `geo-story-map` | Geo Story Map | 互動地圖與旅遊標記；取代先前的 Leaflet 外掛 |

### 已解除安裝

| ID | 狀態 |
| --- | --- |
| `obsidian-leaflet-plugin` | **已解除安裝**（2026-09-30）。`community-plugins.json` 已移除該 ID，`.obsidian/plugins/obsidian-leaflet-plugin/` 目錄亦已刪除。功能由 `geo-story-map` 接手，說明見 [[06 Geo Story Map 純地圖與 Leaflet 相容]]。 |

## 目前已確認的外掛配置

### 日記與模板

- **Templater**：模板資料夾是 `_templates`；使用者腳本資料夾是 `_templates/scripts`；依資料夾觸發模板。
- **Calendar**：週一開始；不建立週筆記。
- **Tasks**：完成與取消時寫入日期；自訂狀態為 `/`（In Progress）與 `-`（Cancelled）。
- **Dataview**：啟用 DataviewJS；查詢自動刷新間隔為 5 秒。
- **Tracker**：目前追蹤格式為 `YYYY-MM-DD-dddd`。
- **Life Tracker 欄位設定**：仍保留 `data.json`，但 `life-tracker` 沒有列入目前的啟用清單。

### 看板與地圖

- **Kanban**：啟用 `link-date-to-daily-note`、`prepend-archive-date`，並隱藏看板標題中的日期與標籤。
- **Geo Story Map**（`geo-story-map` v0.5.0，`minAppVersion` 1.8.7，僅桌面版）：`.obsidian/plugins/geo-story-map/` 下**只有** `main.js`、`manifest.json`、`styles.css`，**沒有 `data.json`**，代表設定全部採用外掛內建預設值，尚未在設定介面調整過。
  - 原本由 Leaflet 保留的「Egypt map 標記資料夾」與「預設公制單位」等設定，隨外掛解除安裝一併消失；`markerFolder` 改由各 ` ```leaflet ` 區塊自行指定，`unit` / `scale` 則作為相容性中繼資料被接受但目前沒有功能。
  - 設定介面可從舊的 Obsidian Leaflet 外掛**匯入**相容性設定（Leaflet 專用預設值與 StoryMap 預設值分開儲存、互不套用）。本次未執行匯入。
  - 桌面版的本機 AI 坐標查找設定屬裝置本機資料，存在 `app.saveLocalStorage`，不寫入 vault。

### 快速新增與外觀

- **QuickAdd**：目前沒有設定 choices；停用線上功能與 URI callback，保留輸入草稿。
- **Style Settings**：目前使用 Blue Topaz；字級與字體的主要來源仍是 `.obsidian/appearance.json`。

## 已安裝但目前未啟用

以下資料夾存在於 `.obsidian/plugins/`，但沒有出現在 `community-plugins.json`，因此不列為目前啟用的外掛：

- `life-tracker`
- `obsidian-excalidraw-plugin`
- `obsidian-projects`
- `obsidian42-brat`
- `symlinks-obsidian`

這個區分很重要：插件目錄存在不等於外掛正在載入。

## 目前文章覆蓋範圍

- Dataview：[[Obsidian Plugin Dataview]]
- Kanban：[[Obsidian Plugin Kanban]]
- Tasks：[[Obsidian Plugin Tasks]]
- Templater：[[Obsidian Plugin Templater]]
- Tracker：[[Obsidian Plugin Tracker]]
- Vault Feed Reader：[[01 Vault Feed Reader 專案介紹]]
- Geo Story Map：[[01 Geo Story Map 專案介紹]]（含安裝、語法、主題版型、本機 AI 坐標查找、Docusaurus 整合與 [[06 Geo Story Map 純地圖與 Leaflet 相容]]）

## 相關文章

- [[my Obsidian]] - 個人 vault 配置
- [[Obsidian Daily Notes]] - 日記與模板
- [[Obsidian Properties]] - Properties 與 frontmatter
- [[Obsidian Task Management]] - 任務管理流程
- [[01 Geo Story Map 專案介紹]] - 地圖與地理故事外掛
- [[06 Geo Story Map 純地圖與 Leaflet 相容]] - 舊 ` ```leaflet ` 區塊的相容程度
