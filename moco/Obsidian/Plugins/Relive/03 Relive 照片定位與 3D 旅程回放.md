---
title: Relive 照片定位與 3D 旅程回放
description: 理解照片時間與 GPS 配對、事件停留及三種地圖視角，讓旅程回放更容易閱讀
tags:
  - Obsidian
  - Plugin
  - Relive
  - GPX
sidebar_position: 30
sidebar_label: 照片、事件與 3D
date_created: 2026-10-29T00:00:00.000Z
date_updated: 2026-10-30T00:00:00.000Z
---

# Relive 照片定位與 3D 旅程回放

照片出現在地圖上，不代表它一定出現在正確時刻。Relive 會根據照片與 GPX 的可用資料選擇定位方式；理解這個順序，比反覆調整播放速度更能解決錯位問題。

## 照片先比時間，再比位置

第一步是時間：手動 `time` 優先於 EXIF 的 `DateTimeOriginal`／`CreateDate`。當 GPX 時間可用，而且照片時間落在軌跡範圍內，播放器以時間內插對應位置。

若時間不可用、超出範圍，或 GPX 時間不完整，才使用手動或 EXIF GPS，尋找最近的軌跡點。這個方式目前沒有最大距離門檻：距離旅程很遠的照片，也可能配到某個端點；重訪同一地點時，GPS 本身也無法說明是哪一次經過。

時間與 GPS 都不足的照片仍會保留在相片集錦，標示「未定位」。開啟時可能借用當下播放位置顯示，但那不是確認過的拍攝地點。

## 跨時區旅行的設定

`timezoneOffset` 預設為 `+08:00`。若照片的 EXIF 沒有時區，而拍攝地使用日本時間，可設為 `'+09:00'`。EXIF 有 `OffsetTimeOriginal` 時優先使用它；手動時間若已包含時區，則以手動值為準。

```yaml
timezoneOffset: '+09:00'
photos:
  - src: '[[media/bridge.jpg]]'
    time: '2026-10-29T09:05:00+09:00'
    caption: 橋邊休息
```

這段是加入既有 `relive` 區塊的設定片段，仍需保留 `gpx` 或 `raw`。固定 offset 不會自動處理夏令時間；跨時區旅程可為照片明確填寫含時區的時間。

## 用事件補上沒有拍照的片刻

事件適合記錄補給、折返或等車，也可以補充一個只有文字的觀景點：

```yaml
events:
  - at: '00:02:00'
    title: 第一座橋
    text: 在這裡短暫休息。
  - time: '2026-10-29T08:08:00+08:00'
    title: 折返
  - progress: 0.9
    title: 接近終點
```

每筆事件都要有 `title`，再從 `at`、`time`、`progress` 擇一定位。`at` 是從 GPX 起點經過的時間，不是壓縮後播放器的秒數；`time` 是絕對日期時間，兩者需要完整、單調的 GPX 時間，且不能超出範圍。`progress` 使用 0–1，適合沒有完整時間的軌跡。

未指定事件坐標時，由軌跡內插；若有明確地點，可成對提供 `lat` 與 `lon`。文字以純文字顯示，不執行 HTML。

## 移動時間與停留時間是兩回事

`duration: 60` 表示沿路線移動的回放時間為 60 秒；`stopDuration: 3` 表示每組事件另停留 3 秒。停留不受倍速影響，同一時刻的照片與事件合併顯示、只停一次，因此整段觀看時間可能超過 60 秒。

到達事件時，位置與 GPX 時鐘一起停止；倒數結束後自動續播。手動暫停會凍結倒數，拖曳會取消當次停留。點選縮圖或事件則維持暫停，讓讀者自己決定何時繼續。

## 選擇地圖視角

| 模式 | 區塊設定 | 適合的閱讀方式與條件 |
| --- | --- | --- |
| Leaflet 2D | `renderer: leaflet` | 預設視角，容易看清路線與地名，底圖仍需網路 |
| MapLibre 3D | `renderer: maplibre-3d` | 查看地形與建築輪廓，不需 API key，需要網路與 WebGL |
| Google 寫實 3D | `renderer: google-3d` | 查看供應區域的寫實影像，需 Google API key 與相應帳務設定 |

MapLibre 使用 OpenFreeMap 向量底圖及 Mapterhorn 地形，並非寫實攝影城市。切換地圖會保留進度並暫停；3D 初始化失敗時可回到 2D。公共圖資的覆蓋與可用性仍取決於供應商。

Google key 在 Obsidian 的 Relive 設定或網站整合設定中提供，不寫入 Markdown。瀏覽器端 key 會出現在客戶端，需設定適當的 API 與來源限制。桌面環境的 `app://` 來源不能直接假設與網站相同。

依目前專案文件，MapLibre 已有 Chromium 不同視窗尺寸與失敗回退驗證；實際 Obsidian Electron／手機硬體仍待驗證。Google 模式尚未以真實 key 驗證實景載入及桌面授權。選用前應在自己的環境確認。

## 系列導覽

1. [[01 Relive 專案介紹]]
2. [[02 Relive 安裝與旅程筆記語法]]
3. [[03 Relive 照片定位與 3D 旅程回放]]
4. [[04 Relive Docusaurus 整合與公開附件]]
5. [[05 Relive GPX 瘦身與分享工作流程]]
6. [[06 Relive React 套件與跨框架整合]]

## 參考資料

- [照片配對、時間軸與 3D 說明](https://github.com/kywk/relive/blob/main/README.md)
- [配對與軌跡原始碼](https://github.com/kywk/relive/blob/main/src/track.js)
