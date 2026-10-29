---
title: Relive 安裝與旅程筆記語法
description: 從手動安裝到第一段可回放的 GPX，掌握 relive 區塊、附件路徑與時間設定
tags:
  - Obsidian
  - Plugin
  - Relive
  - GPX
sidebar_position: 20
sidebar_label: 安裝與筆記語法
date_created: 2026-10-29T00:00:00.000Z
date_updated: 2026-10-30T00:00:00.000Z
---

# Relive 安裝與旅程筆記語法

第一次使用 Relive，先讓一條短軌跡播放成功，再加入照片，比一開始整理整趟旅行容易排查問題。本篇提供不依賴照片附件的最小範例。

## 安裝 Obsidian 外掛

本機 manifest 宣告版本 0.1.0、最低 Obsidian 1.5.0，且 `isDesktopOnly: false`。這代表未限制為桌面專用，不代表已在每種手機或 Electron 環境完成驗證。

先查看 [GitHub Releases](https://github.com/kywk/relive/releases)。若目標版本已有發布附件，下載同一版本的 `main.js`、`manifest.json`、`styles.css`，放到下列位置：

```text
<Vault>/.obsidian/plugins/relive/
  main.js
  manifest.json
  styles.css
```

重新載入 Obsidian，在「設定 → 社群外掛」啟用 Relive。不要只複製 `main.js`，也不要把 npm 套件當成 Obsidian 安裝包。

若 Release 尚無可下載附件，可從原始碼建置。開發環境需要 Node.js 20.19 以上；在 Relive 專案根目錄執行：

```sh
npm ci
npm run build
```

再將 `dist/obsidian/` 的三個檔案複製到上述目錄。外掛建置已包含所需程式與樣式，使用者不需要在 Vault 內執行 npm。社群市集是否已收錄需另行確認，本篇不以市集搜尋作為安裝前提。

若要嵌入自己的 React 網站，使用獨立的 `@kywk/react-relive` npm 套件；它與上述 Obsidian 三檔安裝包是不同入口，見 [[06 Relive React 套件與跨框架整合]]。

## 第一段回放：不需要外部附件

建立筆記，貼上以下完整內容。這是一段合成測試軌跡，坐標與時間只用來示範語法。

````markdown
# 我的第一段旅程回放

```relive
title: 示範路線
duration: 30
timezoneOffset: '+08:00'
raw: |
  <gpx version="1.1" creator="Relive example">
    <trk><trkseg>
      <trkpt lat="25.05" lon="121.50"><time>2026-10-29T00:00:00Z</time></trkpt>
      <trkpt lat="25.06" lon="121.51"><time>2026-10-29T00:10:00Z</time></trkpt>
    </trkseg></trk>
  </gpx>
```
````

切到閱讀模式後，按播放。看到位置沿線移動，就確認區塊處理與地圖載入已經正常；接著再換成自己的 GPX。

## 換成 Vault 裡的路線與照片

假設已準備公開用附件 `media/ride.gpx` 與 `media/bridge.jpg`，可以寫成：

````markdown
```relive
title: 河岸散步
gpx: '[[media/ride.gpx]]'
photos:
  - src: '[[media/bridge.jpg]]'
    time: '2026-10-29T08:05:00+08:00'
    caption: 橋邊的風景
duration: 60
stopDuration: 3
timezoneOffset: '+08:00'
```
````

上面的附件路徑與時間是範例，請換成實際資料。YAML 中的 wiki-link 必須加引號，避免 `[[...]]` 被解析成陣列。`photos` 也接受一般路徑、Markdown 圖片連結及 HTTPS 網址。

| 欄位 | 用途與預設 |
| --- | --- |
| `gpx` | 單一路徑或路徑清單；與 `raw` 至少提供一項 |
| `raw` | 以 `raw: \|` 放入縮排的 GPX XML |
| `photos` | 照片清單，可省略；物件使用 `src`，可附 `time`、`lat`、`lon`、`caption` |
| `duration` | 沿完整軌跡移動的回放秒數，1–3600，預設 60；不含事件停留 |
| `stopDuration` | 每組事件停留秒數，0–60，預設 3；0 表示不停留 |
| `timezoneOffset` | 解讀缺少時區的照片時間及顯示時刻，預設 `+08:00` |
| `renderer` | `leaflet`（預設）、`maplibre-3d`、`google-3d` |

多個 GPX 依清單順序載入；若同時提供 `raw`，它會先載入。不同軌跡分段不會強行連成一條直線。請自行按旅程順序排列來源。

## 設定寫在區塊，不是 Properties

Relive 不要求在筆記 frontmatter 加上 `relive: true`。`gpx`、`photos`、`duration` 都放在 `relive` 圍欄裡；筆記原有的標題、標籤與日期仍可照常使用。這與 Geo Story Map 的故事文件標記不同，詳見 [[Obsidian Properties]]。

## 看不到回放時，先檢查這幾件事

1. 只顯示文字：確認外掛已啟用，區塊語言為 `relive`，並切到閱讀模式。
2. GPX 讀不到：確認檔案存在，wiki-link 有引號，先用明確路徑排除同名附件。
3. 有路線卻沒有底圖：檢查網路；本機附件不代表底圖也能離線載入。
4. 時刻不符：GPX 時間需含時區；照片若沒有 EXIF 時區，會採 `timezoneOffset`。
5. 照片沒有出現於預期位置：先檢查拍攝時間是否落在 GPX 範圍內，再看 GPS 配對，詳見下一篇。

## 系列導覽

1. [[01 Relive 專案介紹]]
2. [[02 Relive 安裝與旅程筆記語法]]
3. [[03 Relive 照片定位與 3D 旅程回放]]
4. [[04 Relive Docusaurus 整合與公開附件]]
5. [[05 Relive GPX 瘦身與分享工作流程]]
6. [[06 Relive React 套件與跨框架整合]]

## 參考資料

- [安裝與 Markdown 格式](https://github.com/kywk/relive/blob/main/README.md)
- [外掛 manifest](https://github.com/kywk/relive/blob/main/manifest.json)
