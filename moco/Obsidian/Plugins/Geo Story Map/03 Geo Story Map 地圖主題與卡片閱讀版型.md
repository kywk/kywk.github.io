---
title: Geo Story Map 地圖主題與卡片閱讀版型
description: 深入解析 6 種地圖主題、card 浮動卡片與 full 閱讀版型的比例配置與套用優先層級
cover: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - Geo-Story-Map
  - Layout
  - Theme
sidebar_position: 30
sidebar_label: 地圖主題與版型
date_created: 2026-09-29T00:00:00.000Z
date_updated: 2026-09-29T00:00:00.000Z
---
# Geo Story Map 地圖主題與卡片閱讀版型

地圖不只是標示坐標的工具，更是故事敘事氛圍的重要媒介。Geo Story Map 提供了 6 種精心設計的地圖視覺主題，以及 2 種核心版型模式（`card` 與 `full`），讓使用者能依據旅程性質與閱讀習慣，自由搭配出最適切的展示效果。

## 六種內建地圖主題

在故事文件的 ```` ```story-map ```` 區塊中，可透過 `map.theme` 指定地圖風格：

```yaml
map:
  theme: vintage
```

### 1. `auto`（Obsidian 預設）
深度整合 Obsidian 原生外觀。外掛會直接讀取 Obsidian 當前主題的 CSS 變數：
- 背景色：`--background-primary`
- 文字顏色：`--text-normal`、`--text-muted`
- 邊框與分割線：`--background-modifier-border`
- 強調色：`--interactive-accent`

當你在 Obsidian 切換淺色/深色模式，或套用不同的社群主題（如 Minimal、Things、AnuPpuccin）時，地圖的資訊面板、控制器、標記圖示與路徑連線都會即時自動換色，與筆記環境完美融為一體。

### 2. `light`
現代感的高亮度固定調色盤。背景潔淨、文字對比清晰，適合一般日間閱讀與正式報告展示。

### 3. `dark`
沉穩高質感的暗黑固定調色盤。深灰色系圖磚與暗調介面，適合低光源環境下專注閱讀。

### 4. `vintage`
溫暖復古的羊皮紙色調。圖磚帶有典雅的手繪水墨與老地圖質感，特別適合歷史人文踏查、古蹟走讀或懷舊旅行筆記。

### 5. `cyber`
高對比科技感的賽博龐克風格。深邃的黑夜底色搭配明亮奪目的霓虹青藍與粉紫標記，適合都會夜生活探索、科技展會記錄或科幻主題故事。

### 6. `atlas`
經典實體印刷地圖集（Atlas）風格。精緻呈現等高線與地貌色彩，適合山岳健行、國家公園探索與跨洲越野探險。

> [!TIP]
> 可以在 [Geo Story Map 官方展示站](https://kywk.github.io/story-map/) 的互動範例中即時切換這 6 種主題，體驗不同視覺調性。

## 自訂圖磚與地圖控制

除了內建風格，Geo Story Map 也支援介接任何標準的 XYZ 瓦片圖磚服務：

```yaml
map:
  tileUrl: 'https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=YOUR_KEY'
  attribution: '&copy; Thunderforest, &copy; OpenStreetMap contributors'
  zoom: 8
  minZoom: 3
  maxZoom: 18
  showPath: true
```

- `tileUrl`：自訂圖磚伺服器網址，支援 `{s}`, `{z}`, `{x}`, `{y}` 佔位符。
- `attribution`：地圖右下角的版權與圖資來源聲明。
- `zoom`：載入時的初始縮放倍率（預設為 `6`）。
- `minZoom` 與 `maxZoom`：限制讀者縮放地圖的範圍，防止縮放過度導致地圖失真或圖磚遺失。
- `showPath`：是否在站點之間依照順序繪製半透明的飛行軌跡連線（預設為 `true`）。

## 兩種排版模式：Card vs Full

透過 `layout.mode`，可以決定故事的版面配置結構：

### 模式一：`card`（浮動卡片版型）

地圖完全鋪滿整個畫布，投影片以半透明卡片的形式浮動疊加在畫面上。讀者在點選下一站時，地圖會平滑平移（`flyTo`）至新坐標，卡片內容同步切換。

```yaml
layout:
  mode: card
  card:
    align: left
    widthRatio: 0.38
    heightRatio: 0.75
```

- `align`：卡片水平對齊位置，可選 `left`（靠左，預設）、`center`（居中）或 `right`（靠右）。
- `widthRatio`：卡片寬度佔畫面的比例，範圍為 `0.20` 至 `0.80`（預設為 `0.38`）。
- `heightRatio`：卡片最大高度佔畫面的比例，範圍為 `0.20` 至 `0.95`（預設為 `0.75`）。
- **適用情境**：以地點探索為核心的導覽行程、快速瀏覽多個景點摘要、注重地圖全景呈現的視覺型故事。

### 模式二：`full`（閱讀分割版型）

將畫面劃分為兩半：一側為完整地圖，另一側為專門的筆記閱讀區域。

```yaml
layout:
  mode: full
  full:
    side: left
    contentRatio: 0.5
```

- `side`：閱讀區所在位置，可選 `left`（左側，預設）或 `right`（右側）。
- `contentRatio`：閱讀區佔總畫面的寬度比例，範圍為 `0.30` 至 `0.70`（預設為 `0.5`，即左右各半）。
- **完整內文呈現**：在 `full` 版型下，右側或左側閱讀區會自動採用完整 Markdown 內文（等同於 `noteDisplay: full`），支援標題、段落、引言與粗體等排版。
- **響應式自適應**：當使用者將 Obsidian 工作區分割為垂直窄視窗，或在手機等窄螢幕裝置瀏覽時，外掛會自動切換為上下堆疊排列（上方為地圖、下方為內文），維持最佳閱讀體驗。
- **適用情境**：深度田野調查紀錄、長篇遊記散文、邊參照地圖細節邊閱讀豐富內文的深度主題。

## 設定優先層級與規則

Geo Story Map 的設定遵循明確的三級套用順序：

$$\text{故事文件圍欄設定（Document）} \longrightarrow \text{外掛全域設定（Plugin Settings）} \longrightarrow \text{內建預設值（Built-in Defaults）}$$

1. **第一優先（文件設定）**：在單一 Markdown 筆記 ```` ```story-map ```` 圍欄內明確宣告的鍵值永遠最優先。
2. **第二優先（全域設定）**：在 Obsidian「設定 → Geo Story Map」中配置的全域預設值。若文件省略了某個參數（如 `order`、`dateField`、`noteDisplay`、`map.theme`、`map.zoom` 等），則會採用全域設定。修改全域設定會立即重新渲染目前開啟的故事地圖。
3. **第三優先（內建預設）**：外掛內建的基底設定值（如 `order: asc`、`dateField: date-created`、`noteDisplay: link` 等）。

### 僅限於文件內設定的項目

為了維護筆記獨立性與可攜性，以下專屬於特定故事的資料**僅能設定在故事文件內**，外掛全域設定不會也不應提供預設覆蓋：
- `schema` 與 `title`
- `noteFolder`
- `slides`
- `includeTags` 與 `excludeTags`
- `map.center`
- `layout`（含 `card` 或 `full` 的細部比例）

在 Obsidian 桌面環境下，工作區分頁固定以 `100%` 高度填滿視窗，因此 `height` 參數只會在發佈至網頁（如 React 獨立應用或 Docusaurus 預設嵌入）時生效。

## 延伸閱讀

- [[01 Geo Story Map 專案介紹]]
- [[02 Geo Story Map 安裝與故事筆記語法]]
- [[04 Geo Story Map 本機 AI 坐標查找設定]]
- [[05 Docusaurus 全螢幕地圖整合與切換設定]]
