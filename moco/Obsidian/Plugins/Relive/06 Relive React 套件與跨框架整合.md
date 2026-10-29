---
title: Relive React 套件與跨框架整合
description: 使用獨立 React 套件在 Vite 或其他 React 框架播放旅程，了解資料載入、樣式與 SSR 邊界
tags:
  - Obsidian
  - Plugin
  - Relive
  - React
sidebar_position: 60
sidebar_label: React 與跨框架整合
date_created: 2026-10-30T00:00:00.000Z
date_updated: 2026-10-30T00:00:00.000Z
---

# Relive React 套件與跨框架整合

如果網站使用 React，現在可以直接嵌入 `<Relive />`，不必為旅程回放改用 Docusaurus。獨立套件 `@kywk/react-relive` 包裝既有播放器，沿用 GPX 主時間軸、照片與事件停留、Leaflet 2D 和 3D 切換。

這個分層參考 Geo Story Map：共用資料處理與播放器，讓 Obsidian、Docusaurus 與 React 各自負責資料來源和畫面生命週期。它不會把 Vault API 或 Docusaurus 路由帶進 React 應用程式。

## 選擇適合的入口

| 使用場景 | 入口 | 資料由誰準備 |
| --- | --- | --- |
| Obsidian 筆記 | `relive` 外掛 | 外掛讀取區塊與 Vault 附件 |
| Docusaurus 發布筆記 | `@kywk/relive/integration` | remark 在建置時解析附件 |
| React 應用程式 | `@kywk/react-relive` | 應用程式傳入解析完成的旅程 |

React 套件支援 React 19.x，應用程式提供 React。此處說的跨框架是能使用 React 元件的 host；純 Vue 或 Svelte 不會因安裝此套件就直接得到原生元件。

## 安裝來源與範例

套件正式發布後，可在 React 專案執行：

```sh
npm install @kywk/react-relive
```

本機打包與 npm 發布是不同階段。尚未發布時，在 Relive repository 執行 `npm run release:pack` 與 `npm run react:release:pack`，取得 `.release/docusaurus/` 和 `.release/react/` 的 tarball，於應用程式同時安裝兩者。React 套件依賴共用 `@kywk/relive`，CI 也要能取得它。

原始碼中的 `examples/react` 是獨立 Vite 範例；根目錄執行 `npm run react:demo` 啟動、`npm run react:build` 建置。[官方 Demo](https://kywk.github.io/relive/) 的原始碼也改以 React 元件掛載播放器；遠端內容仍取決於網站部署是否完成。

## 最小旅程元件

以下是合成軌跡，沒有外部 GPX 或照片依賴：

```jsx
import {Relive, makeTrack, parseGpx} from '@kywk/react-relive';
import '@kywk/react-relive/styles.css';

const journey = {
  title: '示範散步',
  duration: 30,
  stopDuration: 3,
  timezoneOffset: '+08:00',
  renderer: 'leaflet',
  track: makeTrack(parseGpx(`<gpx version="1.1" creator="demo"><trk><trkseg>
    <trkpt lat="25.05" lon="121.50"><time>2026-10-30T00:00:00Z</time></trkpt>
    <trkpt lat="25.06" lon="121.51"><time>2026-10-30T00:10:00Z</time></trkpt>
  </trkseg></trk></gpx>`)),
  photos: [],
  events: [],
  warnings: [],
};

export default function App() {
  return <Relive journey={journey} />;
}
```

單一樣式入口包含 Leaflet、MapLibre 與 Relive CSS。`journey` 放在模組常數中，避免每次 React render 都換成新物件；動態資料可保存在 state 或 `useMemo`。換一個旅程物件會清理舊播放器、重新掛載並重置進度。

元件僅於瀏覽器 effect 載入地圖，卸載時清理地圖、動畫與事件。可選傳入 `className`、`style`、`onReady`、`onError`，以及 Google 3D 使用的 `googleMapsApiKey`。

## GPX、照片與 SSR 的責任

元件接收已解析的旅程，不會自行掃描 Vault、讀取檔案或抓 EXIF。應用程式負責取得 GPX XML，再以 `parseGpx`、`makeTrack` 建立軌跡；照片提供公開 URL 和已知時間或 GPS，再用 `matchPhoto` 配對。原有 YAML 可由 `parseBlock` 解析，但來源設定不等於可直接播放的旅程。

照片 URL 必須能被訪客瀏覽器存取。若應用程式 fetch 跨來源 GPX，也需要處理 CORS、載入失敗與取消請求。Docusaurus 的 `assetRoots`、`gpxSlim` 是建置整合選項，不是 `<Relive />` 的 props。

在 Next.js App Router，使用元件的檔案需要 `'use client'` 邊界，全域 CSS 放在框架允許的入口。SSR 階段不建立地圖，瀏覽器掛載後才顯示播放器。目前專案提供的可執行範例以 Vite 為主；其他框架仍應驗證各自的樣式、部署子路徑與切頁行為。

Google key 是瀏覽器端設定，會交付給訪客，需設定 API 與網站來源限制。一般 2D 和 MapLibre 3D 不需要 Google key，相關差異見 [[03 Relive 照片定位與 3D 旅程回放]]。

## 系列導覽

1. [[01 Relive 專案介紹]]
2. [[02 Relive 安裝與旅程筆記語法]]
3. [[03 Relive 照片定位與 3D 旅程回放]]
4. [[04 Relive Docusaurus 整合與公開附件]]
5. [[05 Relive GPX 瘦身與分享工作流程]]
6. [[06 Relive React 套件與跨框架整合]]

## 參考資料

- [React 整合指南](https://github.com/kywk/relive/blob/main/docs/react.md)
- [React 套件](https://github.com/kywk/relive/tree/main/packages/react-relive)
- [獨立 React 範例](https://github.com/kywk/relive/tree/main/examples/react)
