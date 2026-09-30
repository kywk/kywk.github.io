---
title: Geo Story Map 安裝與故事筆記語法
description: Geo Story Map 的安裝方式、故事文件語法、資料夾筆記自動探索與 noteDisplay 設定指南
cover: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - Geo-Story-Map
  - Markdown
sidebar_position: 20
sidebar_label: 安裝與筆記語法
date_created: 2026-09-29T00:00:00.000Z
date_updated: 2026-09-29T00:00:00.000Z
---
# Geo Story Map 安裝與故事筆記語法

Geo Story Map 已上架 Obsidian 官方社群外掛市場，一般使用者可直接在 Obsidian 內搜尋安裝；若有離線或手動安裝需求，亦可自 GitHub Releases 下載套件附件手動部署。外掛僅支援桌面版，宣告最低 Obsidian 版本為 **1.8.7**。

## 安裝外掛

### 從社群外掛市集安裝（推薦）

1. 開啟 Obsidian「設定 → 社群外掛」（Settings → Community plugins）。
2. 若尚未關閉「限制模式」（Restricted mode），請先點擊關閉。
3. 點擊「瀏覽」（Browse），搜尋 **Geo Story Map**。
4. 點選「安裝」（Install），安裝完成後點選「啟用」（Enable）。

亦可在瀏覽器中造訪 [Obsidian 社群外掛頁面：Geo Story Map](https://community.obsidian.md/plugins/geo-story-map) 或點擊 URI `obsidian://show-plugin?id=geo-story-map` 直接在 Obsidian 中開啟安裝畫面。

### 手動安裝

若你的工作環境無法直接連線社群外掛市集，可採手動安裝：

1. 前往 [GitHub Releases 最新發布頁面](https://github.com/kywk/story-map/releases/latest)，下載 `main.js`、`manifest.json` 與 `styles.css` 三個檔案。
2. 將檔案複製到目標 Vault 的外掛目錄：

```text
<Vault>/.obsidian/plugins/geo-story-map/
```

3. 回到 Obsidian「設定 → 社群外掛」，重新載入並啟用 **Geo Story Map**。日後手動更新檔案後，停用並重新啟用外掛即可載入新版本。

## 雙角色架構：故事文件 vs 故事筆記

在 Geo Story Map 的設計中，內容分為兩個角色：

1. **故事文件（Story Document）**：負責統籌整個故事的主控筆記，包含地圖初始中心、縮放等級、主題風格、閱讀版型，以及要讀取哪一個資料夾的站點。
2. **故事筆記（Story Note）**：故事中的個別地點筆記，記錄單一站點的經緯度坐標、文字介紹與封面圖片。

兩者皆為標準的 Markdown 檔案，完全符合 Obsidian 既有的編寫習慣。

## 故事文件撰寫語法

建立一份新的 Markdown 筆記（例如 `旅行/智利之旅.md`），在 frontmatter 加入 `story-map: true`，並在內文中加入一段 ` ```story-map ` 圍欄設定區塊：

````markdown
---
title: 智利縱貫之旅
story-map: true
---

```story-map
schema: storymap/v1
title: 智利經典景點巡禮
map:
  theme: vintage
  center: [-33.4489, -70.6693]
  zoom: 5
  showPath: true
layout:
  mode: full
  full:
    side: left
    contentRatio: 0.5
noteFolder: Travel/Chile/Places
order: asc
dateField: date-created
noteDisplay: link
includeTags: [travel, chile]
excludeTags: [draft]
```
````

### 圍欄參數說明

| 參數名稱 | 型別 / 選項 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `schema` | 字串 | `storymap/v1` | 規格版本識別標記。 |
| `title` | 字串 | 選填 | 故事地圖的主標題。 |
| `map.theme` | `auto` / `light` / `dark` / `vintage` / `cyber` / `atlas` | `auto` | 地圖視覺風格（`auto` 自動繼承 Obsidian 主題）。 |
| `map.center` | `[lat, lng]` | 選填 | 地圖載入時的初始中心點經緯度坐標。 |
| `map.zoom` | 數字 | `6` | 初始地圖縮放等級。 |
| `map.showPath` | 布林值 | `true` | 是否依照順序在地圖站點之間繪製路徑連線。 |
| `layout.mode` | `card` / `full` | `card` | 閱讀介面模式（浮動卡片或完整分割版型）。 |
| `noteFolder` | Vault 相對路徑 | 選填 | 指定要自動探索故事筆記的資料夾路徑。 |
| `order` | `asc` / `desc` | `asc` | 資料夾筆記排序方向（`asc` 由舊到新，`desc` 由新到舊）。 |
| `dateField` | 字串 | `date-created` | 排序所依據的 frontmatter 日期欄位名稱。 |
| `noteDisplay` | `basic` / `link` / `full` | `link` | 投影片呈現筆記內容的豐富程度。 |
| `includeTags` | 字串陣列 | `[]` | 僅納入帶有清單中任一標籤的筆記。 |
| `excludeTags` | 字串陣列 | `[]` | 排除帶有清單中任一標籤的筆記（優先權高於包含）。 |

## 故事筆記編寫語法

在 `noteFolder` 指定的目錄下（例如 `Travel/Chile/Places/Santiago.md`）建立個別地點筆記。筆記 frontmatter 必須包含 `story-map-note: true` 與坐標 `location`：

```yaml
---
story-map-note: true
title: 聖地牙哥 武器廣場
location: [-33.4372, -70.6506]
date-created: 2026-01-15
cover: https://images.unsplash.com/photo-1544620347-c4fd4a3d5957
description: 智利首都的歷史核心，周圍環繞著歷史悠久的大教堂與中央郵局。
tags:
  - travel
  - chile
---

# 武器廣場散步隨筆

武器廣場（Plaza de Armas）自 1541 年建城以來，始終是聖地牙哥的心臟地帶。

廣場周圍綠樹成蔭，經常能見到街頭畫家、棋手與演奏傳統安地斯音樂的街頭藝人。
```

### 支援的 Frontmatter 欄位

Geo Story Map 與常見的 Obsidian 外掛（如 Obsidian Leaflet）保持高度相容，支援下列欄位：

- `story-map-note: true`（必填）：標記此筆記為故事地圖的站點。未標記的筆記會被自動略過。
- `location`（必填）：地點坐標，格式為 `[緯度, 經度]`，例如 `[-33.4372, -70.6506]`。
- `title`（選填）：站點標題；若未填寫則預設取用筆記檔名。
- `date-created` / 自訂日期欄位（選填）：提供 `order` 排序所使用的日期值。
- `description` 或 `summary`（選填）：簡短摘要文字，用於卡片簡介。
- `cover`、`image` 或 `media`（選填）：站點封面圖片，支援本機附件路徑或外部 HTTP(S) 圖片網址。
- `mapmarker`（選填）：自訂標記圖示名稱。
- `mapzoom`（選填）：切換至該站點時專屬的地圖縮放等級。

## 資料夾自動探索機制

當設定了 `noteFolder` 時，Geo Story Map 會自動執行以下流程：

1. **遞迴搜尋**：自動尋找該資料夾及其所有子資料夾內的 Markdown 檔案。
2. **標記過濾**：只讀取 frontmatter 宣告 `story-map-note: true` 的筆記，一般說明文字或草稿會自動被忽略。
3. **標籤過濾**：
   - 若設定 `includeTags`，筆記的 frontmatter `tags` 必須包含清單中至少一個標籤。
   - 若設定 `excludeTags`，只要筆記包含排除清單中的任一標籤，即刻剃除。排除規則優先於包含規則。
   - 標籤比對時不區分大小寫，亦會自動忽略開頭的 `#` 符號。
4. **日期排序**：讀取每篇筆記的 `dateField` 欄位並依 `order`（`asc` 或 `desc`）排序。無法解析日期的筆記會被統一排在最後面。

## 筆記呈現方式（`noteDisplay`）

`noteDisplay` 決定了投影片中呈現筆記內容的豐富程度：

- `basic`：僅呈現 frontmatter 提供的中繼資訊（標題、坐標、摘要與封面圖片）。
- `link`（預設）：呈現中繼資訊，且標題提供筆記超連結：
  - 在 Obsidian 中，滑鼠移至標題會觸發官方的頁面懸停預覽（Page Preview）。
  - 點擊標題會在新的編輯器分頁開啟該原始筆記。
  - 在 Docusaurus 發佈站台時，標題會自動解析成站台內的公開網址。
- `full`：呈現中繼資訊，並自動剝除 frontmatter，將筆記本體的 Markdown 內文直接渲染在投影片中。

> [!NOTE]
> 當版型設為 `layout.mode: full` 時，閱讀區一律採用完整筆記內文（等同於 `full`），不受 `noteDisplay: basic` 影響。

## 手動明確定義投影片（`slides`）

若你的故事需要特定順序（非純日期排序），或者需要穿插外部地點，可在圍欄中直接定義 `slides` 清單：

````markdown
```story-map
schema: storymap/v1
title: 精選三天行程
slides:
  - note: "[[Travel/Chile/Places/Santiago]]"
  - title: 瓦爾帕萊索海岸
    location: [-33.0472, -71.6127]
    text: 智利著名的港口與彩色壁畫山城。
  - note: "[[Travel/Chile/Places/Atacama]]"
    title: 阿塔卡馬星空特別篇
```
````

**優先權原則**：
當圍欄內宣告了非空的 `slides` 陣列時，外掛會**完全以 `slides` 的自訂順序為準**，並自動忽略 `noteFolder` 自動探索。這保證了作者手動編排的投影片結構永遠不會被自動探索打亂或額外追加。

## 雙檢視無縫切換操作

當你在 Obsidian 中開啟帶有 `story-map: true` 的檔案時：

- **預設檢視**：外掛會自動以全尺寸故事地圖（Geo Story Map View）呈現。
- **切換至 Markdown 編輯**：
  - 開啟命令面板（`Cmd/Ctrl + P`），搜尋並執行 **Open as Markdown**。
  - 或點擊分頁右上角的三點圖示選單，選擇 **Open as Markdown**。
  - 此時筆記會切換回標準的 Markdown 文字編輯器，底層原始碼完全不受污染。
- **返回故事地圖**：
  - 隨時在命令面板執行 **Geo Story Map: Open as map**（或選單中的 **Open as Geo Story Map**），即可立即切換回互動故事地圖。

## 延伸閱讀

- [[01 Geo Story Map 專案介紹]]
- [[03 Geo Story Map 地圖主題與卡片閱讀版型]]
- [[04 Geo Story Map 本機 AI 坐標查找設定]]
- [[05 Docusaurus 全螢幕地圖整合與切換設定]]
