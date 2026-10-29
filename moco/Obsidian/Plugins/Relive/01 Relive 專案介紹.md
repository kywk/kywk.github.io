---
title: Relive 專案介紹
description: 把 GPX 軌跡、照片與沿途事件放回同一條時間軸，認識 Relive 與 Geo Story Map 的分工
tags:
  - Obsidian
  - Plugin
  - Relive
  - GPX
sidebar_position: 10
sidebar_label: 專案介紹
date_created: 2026-10-29T00:00:00.000Z
date_updated: 2026-10-30T00:00:00.000Z
---

# Relive 專案介紹

旅程結束後，照片留在相簿，路線留在 GPX，文字則散落在遊記裡。單獨看任何一份，都很難回答「拍下這張照片時，走到了哪裡？」

Relive 把這些資料放進同一篇 Markdown 筆記：以 GPX 決定路線與播放進度，沿途顯示照片和事件。讀者可以播放、拖曳時間軸，或直接點選照片，從地圖重新理解旅程。

本文介紹的是 [kywk/relive](https://github.com/kywk/relive) 開源專案。以下功能依 2026-10-30 本機 0.1.0 原始碼與文件整理；安裝附件、npm 與社群外掛市集的發布狀態須分別確認，不能以版本號推定已上架。

## 從筆記到 React 網站

在 Obsidian 裡，Relive 是處理 `relive` 程式碼區塊的外掛；切到閱讀模式，或讓 Live Preview 顯示區塊，就能操作地圖。在 Docusaurus 裡，對應的整合套件會於建置時讀取 GPX 與照片資料，讓公開網頁呈現同一段旅程。

另有獨立的 `@kywk/react-relive` 套件，可把同一個播放器放進 Vite、Next.js 等 React 應用程式，不需要 Docusaurus。React 端傳入已解析的旅程資料；檔案讀取、照片 URL 與網站路由由應用程式管理，詳見 [[06 Relive React 套件與跨框架整合]]。

原始資料仍是 Markdown、GPX 與圖片，不需要另外建立旅程資料庫。網站端仍須安裝整合套件、設定可公開附件範圍；把筆記放上網站，本身不會自動取得播放器。

可以先看 [官方 Demo](https://kywk.github.io/relive/)。專案說明中的京都鴨川路線與時間是示範編排，搭配有授權的照片，不能當成作者的真實旅行紀錄。

## 旅程回放能做什麼？

- **沿實際軌跡移動**：路線取自 GPX 點，照片和景點不會被拿來重畫路線；多個分段各自繪製。
- **把照片放回旅程**：優先按拍攝時間定位，也能依 GPS 找最近軌跡點；資料不足時保留照片並提示未定位。
- **留下沿途事件**：用經過時間、絕對時間或進度標記補給、休息與觀景點，播放到達時停留展示。
- **自由閱讀**：播放、暫停、倍速、跟隨鏡頭、時間軸跳轉，以及可收合、調整縮圖大小的相片集錦。
- **切換地圖視角**：預設 Leaflet 2D，可選免 API key 的 MapLibre 3D，或需自行設定 key 的 Google 寫實 3D。

播放器目前沒有影片與音樂匯出、海拔圖、離線地圖或發布精靈。它適合讓讀者操作網頁上的旅程，不宜直接當成影片產生工具。

## 與 Geo Story Map 怎麼選？

| 想表達的內容 | 適合的工具 | 準備的資料 |
| --- | --- | --- |
| 幾個景點之間的文字故事 | Geo Story Map | 地點筆記、坐標、封面與投影片順序 |
| 在地圖上查找筆記位置 | Geo Story Map 的純地圖 | `leaflet` 區塊與地點筆記 |
| 某一天走過的路，以及沿途拍照的時刻 | Relive | GPX、照片與選填事件 |

[[01 Geo Story Map 專案介紹|Geo Story Map]] 以「站點與筆記」組織故事，Relive 以「軌跡與時間」回放旅程。同一趟旅行可以先用 Story Map 說明每座城市，再於單日遊記放入 Relive。兩者的區塊語法不同，既有 `story-map` 或 `leaflet` 區塊不會自動變成 Relive。

## 本機資料與網路服務的界線

本機 GPX 與照片可由外掛讀取，不必先上傳到旅程平台；但底圖仍會向圖磚服務連線。MapLibre 3D 需要網路與 WebGL，Google 3D 另有 API 與帳務設定。

發表到網站則是另一個步驟：軌跡會成為頁面資料，照片也會隨網站發布。公開前應檢查住家起訖點與照片 EXIF，並只把要分享的附件納入網站。具體設定見 [[04 Relive Docusaurus 整合與公開附件]]。

## 系列導覽

1. [[01 Relive 專案介紹]]
2. [[02 Relive 安裝與旅程筆記語法]]
3. [[03 Relive 照片定位與 3D 旅程回放]]
4. [[04 Relive Docusaurus 整合與公開附件]]
5. [[05 Relive GPX 瘦身與分享工作流程]]
6. [[06 Relive React 套件與跨框架整合]]

## 參考資料

- [Relive 專案說明與原始碼](https://github.com/kywk/relive)
- [官方 Demo](https://kywk.github.io/relive/)
