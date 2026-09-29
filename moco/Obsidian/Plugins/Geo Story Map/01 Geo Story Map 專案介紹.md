---
title: Geo Story Map 專案介紹
description: 在 Obsidian、React 與 Docusaurus 中將 Markdown 筆記轉化為互動式地理故事
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - Geo-Story-Map
  - Leaflet
sidebar_position: 10
sidebar_label: 專案介紹
date_created: 2026-09-29T00:00:00.000Z
date_updated: 2026-09-29T00:00:00.000Z
---
# Geo Story Map 專案介紹

Geo Story Map（語法代稱與套件名稱為 StoryMap）是一套小巧、可重用的 Leaflet 地理敘事工具堆疊。它的核心理念是**「一份設定，三種載體」**：使用同一份標準 Markdown 來源與 `StoryMapConfig` 設定，就能在三個不同的環境中渲染出完全一致的互動地圖與幻燈片：

1. **Obsidian 桌面外掛**：以獨立的工作區分頁（full-leaf view）開啟故事地圖，可隨時無縫切換回 Markdown 原始碼進行編輯。
2. **獨立 React 應用**：透過 `@story-map/react-story-map` 提供純粹的 React + Leaflet 元件，負責平移縮放、分頁導覽與響應式重繪。
3. **Docusaurus 靜態網站**：透過 `@story-map/remark-story-map` 在建置期將圍欄語法轉換為主機佔位容器，並在瀏覽器端掛載共用渲染器，同時支援全螢幕地圖與 Markdown 檢視切換。

這讓你的筆記不只是靜態文字，還能以地理空間為軸線，串聯成可探索的旅程故事。

## 適合怎樣的工作方式？

當你平常在 Obsidian 記錄旅遊行程、田野調查、城市探索或歷史事件時，每一篇筆記通常會對應到一個具體地點。

傳統上，如果想在地圖上展示這些筆記，往往需要手動複製經緯度到外部地圖軟體，或者仰賴複雜的資料庫與外部平台。而在 Geo Story Map 的工作流程中：

- **平常寫作維持原樣**：只需在原本的 Markdown 筆記 frontmatter 加上地點坐標（例如 `location: [25.033, 121.565]`）與 `story-map-note: true` 標記。
- **一鍵建立故事地圖**：建立一份故事筆記，宣告 `noteFolder`（例如指向旅程資料夾），外掛便會自動遞迴掃描該目錄下的筆記，依據建立日期排序，將地點與照片自動生成為按順序排列的投影片。
- **雙檢視無縫切換**：在 Obsidian 裡查看地圖時，點擊選單的「Open as Markdown」就能隨時修改原始設定；改完後切換回「Open as Geo Story Map」，畫面立即更新。
- **發佈到個人網站**：若使用 Docusaurus 發佈網站，相同的 Markdown 檔案能直接發佈成互動式全螢幕地圖，且投影片上的標題連結能直接解析為站台的公開網址。

## 核心功能特色

- **一份設定，三種載體**：不論在 Obsidian、React 專案還是 Docusaurus 網站，核心解析邏輯與渲染元件完全共用，絕無平台邏輯滲漏至渲染元件中。
- **完全本地化、零外部資料庫**：不需要註冊 StoryMap 帳號，也不依賴雲端資料庫。所有內容、設定與筆記百分之百保存在本地 Vault 的 Markdown 檔案內。
- **自動探索與精準過濾**：設定 `noteFolder` 即可自動探索整個資料夾與子資料夾中的標記筆記，並支援以 `dateField` 日期排序（`asc`／`desc`），以及透過 `includeTags` 與 `excludeTags` 進行 frontmatter 標籤篩選。
- **彈性投影片順序**：除了自動探索外，若在設定中明確定義 `slides` 清單，則會嚴格遵循手動指定的順序，完全不會被自動探索覆蓋或追加。
- **六種精緻地圖主題**：
  - `auto`（Obsidian 預設）：自動偵測並繼承 Obsidian 當前主題配色（深色/淺色模式、強調色等）。
  - `light` / `dark`：經典明亮與暗色固定調色盤。
  - `vintage`：復古羊皮紙色調，適合古蹟探訪與人文歷史。
  - `cyber`：高對比霓虹科技感，適合都會夜間探索。
  - `atlas`：經典實體地圖集印刷風格，適合自然長程健行與探險。
- **兩種閱讀版型**：
  - `card`：地圖鋪底，上方疊加懸浮卡片，支援左、中、右對齊與自訂寬高比例。
  - `full`：地圖與完整筆記閱讀區並列分割，窄螢幕自動轉為垂直堆疊，兼顧長文閱讀與空間瀏覽。
- **本機 AI 坐標查找（Local Agent）**：在桌面版 Obsidian 整合本機已安裝的 CLI Agent（Codex、Claude Code、OpenCode、pi 等），輸入地名即時在互動小地圖預覽確認坐標，杜絕 AI 幻覺，確認後直接寫入筆記。
- **Docusaurus 全螢幕整合**：採用 Host-owned 設計原則，提供浮動切換按鈕、自動收合側邊欄、`sessionStorage` 偏好記憶與 SPA 路由監聽。

## 套件生態架構

Geo Story Map 將關注點嚴格分離，由四個模組組成：

| 套件名稱 | 角色定位 | 發布管道 |
| --- | --- | --- |
| `@story-map/story-map-core` | 與框架無關的 Schema 驗證、Parser 解析器與輔助工具 | npm |
| `@story-map/react-story-map` | 基於 React 與 Leaflet 的共用渲染器，負責分頁導覽、動畫平移與響應式尺寸 | npm |
| `@story-map/remark-story-map` | 建置期 Remark 語法轉接器與瀏覽器端客戶端掛載模組 | npm |
| `@story-map/obsidian-story-map` | Geo Story Map Obsidian 桌面外掛視圖與 Vault 資源解析器 | Obsidian 社群市集 / GitHub Releases |

## 資料與網路存取原則

1. **Vault 本地優先**：你的筆記內容、設定與相片完全儲存在你的 Vault 中。外掛不包含任何遙測（Telemetry）或追蹤機制。
2. **圖磚連線**：地圖預設向 OpenStreetMap 官方伺服器請求圖磚（`https://{s}.tile.openstreetmap.org`），載入圖磚時會正常發送標準 HTTP 請求。若有離線或自訂需求，可於設定中更換自訂的 `tileUrl`。
3. **本機 AI 安全性**：AI 坐標查找功能只會將使用者在對話框中輸入的「地名」傳送給本機 CLI，絕對不讀取、不上傳 Vault 內的其他筆記或私人資料。

## 使用範圍

- 外掛僅支援 **Obsidian 桌面版**（宣告最低版本為 **1.8.7**），目前未支援手機版。
- 本外掛獨立運作，**不需要**預先安裝或依賴 Obsidian Leaflet 外掛（但相容既有 Leaflet 筆記的 `location` 等 frontmatter 欄位）。
- 發佈到 Docusaurus 網站時，所呈現的故事頁面具備完整的響應式設計，能在手機與平板瀏覽器上順暢瀏覽。

## 系列導覽

1. 本篇：專案定位、設計理念與核心架構概覽。
2. [[02 Geo Story Map 安裝與故事筆記語法]]：外掛安裝步驟、故事文件設定與筆記自動探索語法。
3. [[03 Geo Story Map 地圖主題與卡片閱讀版型]]：6 種視覺風格、card/full 版型參數與設定優先權。
4. [[04 Geo Story Map 本機 AI 坐標查找設定]]：本機 Local Agent 串接、小地圖確認與經緯度寫入流程。
5. [[05 Docusaurus 全螢幕地圖整合與切換設定]]：Host-owned 架構解析、Remark 轉接器、客戶端 DOM 控制與雙檢視切換機制。

## 參考資料

- [Geo Story Map 官方網站與互動展示](https://kywk.github.io/story-map/)
- [Obsidian 社群外掛：Geo Story Map](https://community.obsidian.md/plugins/geo-story-map)
- [GitHub 原始碼倉庫：kywk/story-map](https://github.com/kywk/story-map)
- [繁體中文使用指南與設定一覽](https://kywk.github.io/story-map/?lang=zh)
