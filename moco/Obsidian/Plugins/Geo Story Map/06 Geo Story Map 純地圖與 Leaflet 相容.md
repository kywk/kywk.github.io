---
title: Geo Story Map 純地圖與 Leaflet 相容
description: 純地圖 GeoMap 元件，以及舊版 Obsidian Leaflet 圍欄區塊在 Geo Story Map 中的相容程度與已知限制
cover: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - Geo-Story-Map
  - Leaflet
  - 地圖
sidebar_position: 60
sidebar_label: 純地圖與 Leaflet 相容
date_created: 2026-09-30T00:00:00.000Z
date_updated: 2026-09-30T00:00:00.000Z
---
# Geo Story Map 純地圖與 Leaflet 相容

Geo Story Map 除了「故事」之外，同時提供**純地圖**（GeoMap）這一種形態：只有地圖與標記，沒有投影片、沒有面板、沒有敘事。

而更重要的一點是：**你既有的 Obsidian Leaflet 圍欄區塊，現在可以直接使用，不必改寫筆記。**

## 兩種 dialect，一個渲染器

先把最容易混淆的地方講清楚。Geo Story Map 有兩套**互相獨立**的輸入語言：

| | ` ```story-map ` | ` ```leaflet ` |
| --- | --- | --- |
| 形態 | 故事：投影片 + 版型 + 面板 | 純地圖：只有地圖與標記 |
| Parser | `storymap/v1` schema | 專屬的 `leaflet` parser |
| 設定物件 | `StoryMapConfig` | `GeoMapConfig` |
| 渲染元件 | `<StoryMap />` | `<GeoMap />` |

`leaflet` 區塊**不會**進入 `storymap/v1`，純地圖也**不會**被偽裝成「投影片只有零張」的故事。兩者各自解析，最後交給同一個 Leaflet 生命週期，所以同一頁裡混放兩種區塊時，地圖只會載入一次。

## 舊 Leaflet 區塊直接可用

原本的寫法不需要任何修改：

````markdown
```leaflet
id: taipei-eats
height: 500px
lat: 25.0330
long: 121.5654
minZoom: 6
maxZoom: 18
defaultZoom: 11
unit: meters
scale: 1
darkMode: true
markerFolder: Travel/Taipei/Eats
```
````

**行為完全一致的部分：**

- 在 Obsidian 一般 Markdown 閱讀檢視中，直接渲染成內嵌地圖。
- `markerFolder` 遞迴解析該資料夾；每則有 `location` 的筆記成為一個標記，沒有座標的筆記會被略過（不會出錯）。
- 標記的標題、說明、連結，一樣讀既有筆記的 `title`、`description`／`summary` frontmatter。
- 標記連結的行為與故事投影片完全相同：在 Obsidian 是 hover 顯示頁面預覽、點擊新分頁開啟；在網站上則解析成站台的公開網址。
- 這也是為什麼**原本就為 Leaflet 寫的筆記可以直接沿用**——它們本來就依賴 `location` 這些欄位。

**Obsidian 設定也分開了。** 原本的 Obsidian Leaflet 設定可以按一下匯入。預設值的解析是**依 dialect 分開**的：Leaflet 專用的預設中心點、標記登錄表、tooltip 預設或單位制，絕不會套用到原生 StoryMap；反過來 StoryMap 的主題與路徑預設也不會套用到 `leaflet` 區塊。

唯一同時被兩邊讀取的是**圖磚設定**（淺色／深色圖磚 URL 與出處標示），因為圖磚供應商屬於「地圖資料」而不是「故事內容」。

## 哪些 key 真的能用

這一節刻意只列**實際驗證過**的狀態。

### 已經支援

| Key | 說明 |
| --- | --- |
| `id` | 原樣傳遞。**可以重複**，不會造成衝突。 |
| `height` | 區塊高度，不會被強制成 `100%`。 |
| `lat` ＋ `long`／`lng` | 地圖中心。只給一半或超出範圍會明確報錯。 |
| `defaultZoom` | 初始縮放。 |
| `minZoom` / `maxZoom` | 縮放範圍。 |
| `markerFolder` | 遞迴解析。支援重複書寫、YAML 陣列、逗號分隔字串。 |
| `unit` / `scale` | 接受為相容性中繼資料，**不會報錯**，但目前沒有功能。 |
| `darkMode` | 接受為相容性旗標，不會改變主題或圖磚來源。 |

筆記 frontmatter 方面：`location`、`mapmarker`、`mapzoom`、`title`、`description`／`summary` 全部照舊運作。`mapzoom: [5, 12]` 會變成標記的縮放可見範圍。

### 刻意保留中

這些 key **會被解析、會被帶著走，但目前不會有效果**：

- **控制項**：`noUI`、`noScrollZoom`、`recenter`、`lock`、`zoomDelta`
- **檔案圖層**：`geojson`、`gpx`、`tileOverlay`、`imageOverlay`、`overlay` 等
- **影像地圖 / 測量 / 繪圖**：`image`、`draw`、`distanceMultiplier` 等

這些不是「壞掉」，而是**明確排程中**。實作它們的話，就會讓診斷訊息變成謊話，所以現在選擇先回報、再排程。

### 重要原則：不會被安靜忽略

這是設計上最在意的一件事：

- **已辨識但尚未實作的 key**，會列在地圖下方的診斷清單裡，並指名是哪一個 key。
- **無法辨識的 key**，會另外用不同代碼回報。

所以打錯字不會被誤認成「排程中的功能」，你寫的設定也不會無聲消失。

## 已知限制

誠實列出目前還沒做到的事：

- **設定好的深色圖磚來源會被儲存，但不會被請求。** 渲染器一律使用淺色圖磚，深色效果由主題的圖磚濾鏡達成。`darkMode` 只會被解析與回報。
- **Shift 點擊複製座標**是用地圖投影找最近標記（16px 半徑），而不是逐圖層綁事件，因為 Leaflet 不會在冒泡事件中交出來源圖層。
- **`unitSystem` 只儲存，沒有測量功能。**
- **P2 圖層與 P3 功能只解析與診斷，不渲染。**

## React 端的純地圖

若要在自己的 React 專案裡畫純地圖，直接用 `<GeoMap />`：

```tsx
import { GeoMap, type GeoMapConfig } from '@story-map/react-story-map';

const map: GeoMapConfig = {
  schema: 'geomap/v1',
  height: '500px',
  map: {
    theme: 'light',
    zoom: 11,
    tiles: {
      light: {
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '© OpenStreetMap contributors',
      },
    },
  },
  markers: [
    { location: { lat: 25.0338, lng: 121.5647 }, title: '鼎泰豐', type: 'food' },
    { location: { lat: 25.0555, lng: 121.5097 }, title: '迪化街', type: 'shop' },
  ],
};

<GeoMap map={map} markerTypes={[{ id: 'food', icon: { kind: 'symbol', value: '🍜' } }]} />;
```

`<GeoMap />` 與 `<StoryMap />` 使用**同一個**主題根元素，所以六種地圖主題與 `--story-map-*` CSS 變數**不需要額外設定**就能套用到純地圖上。

未註冊的 `mapmarker` 類型**仍然會產生標記**，只是畫成虛線圓環，並保留你原本寫下的名稱——所以資料不會因為名稱拼錯就整批消失。

## 系列導覽

1. [[01 Geo Story Map 專案介紹]]：專案定位、設計理念與核心架構概覽。
2. [[02 Geo Story Map 安裝與故事筆記語法]]：外掛安裝步驟、故事文件設定與筆記自動探索語法。
3. [[03 Geo Story Map 地圖主題與卡片閱讀版型]]：6 種視覺風格、card/full 版型參數與設定優先權。
4. [[04 Geo Story Map 本機 AI 坐標查找設定]]：本機 Local Agent 串接、小地圖確認與經緯度寫入流程。
5. [[05 Docusaurus 全螢幕地圖整合與切換設定]]：Host-owned 架構解析、Remark 轉接器、客戶端 DOM 控制與雙檢視切換機制。
6. 本篇：純地圖 `<GeoMap />` 與舊 `leaflet` 圍欄區塊的相容程度、保留項目與已知限制。

相關的歷史文章：[[Plugin Remark Obsidian Leaflet]]（該 remark 外掛已停用，改由本專案取代）。

## 參考資料

- [Geo Story Map 官方網站與互動展示](https://kywk.github.io/story-map/)
- [GitHub 原始碼倉庫：kywk/story-map](https://github.com/kywk/story-map)
- [相容性對照表（英文，逐 key 狀態）](https://github.com/kywk/story-map/blob/main/docs/leaflet-compatibility.md)
