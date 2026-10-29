---
title: Relive GPX 瘦身與分享工作流程
description: 用 GPX Slim 分析與精簡軌跡，區分刪點率、檔案大小與回放效果，保留原始紀錄
tags:
  - Obsidian
  - Plugin
  - Relive
  - GPX
sidebar_position: 50
sidebar_label: GPX 瘦身與分享
date_created: 2026-10-29T00:00:00.000Z
date_updated: 2026-10-30T00:00:00.000Z
---

# Relive GPX 瘦身與分享工作流程

長時間記錄的 GPX 可能包含大量停留或低速取樣點。把每個點都帶進分享頁面，不一定能讓讀者更理解路線；但刪點也會影響距離、時間內插與照片定位。GPX Slim 提供分析與預覽，讓你先看差異，再決定是否製作分享版本。

它是 Relive repository 裡的獨立 CLI，套件名稱 `@kywk/gpx-slim`、命令名稱 `gpx-slim`。不需要 Obsidian 或 Docusaurus，運算在本機進行，不上傳 GPX。CLI 需要 Node.js 22 以上，與 Relive 根專案的最低版本要求不同。

## 先分析，不寫入檔案

目前本機文件仍標示 CLI 尚未發布到 npm，因此先以原始碼方式示範。取得 Relive 專案後，進入 `packages/gpx-slim`：

```sh
npm ci
node bin/gpx-slim.js /path/to/ride.gpx --analyze
```

`--analyze` 比較三種強度，顯示軌跡點數、檔案位元組、路線距離等差異，不寫入檔案。需要機器可讀結果時可加 `--json`。

| 強度 | 使用方向 |
| --- | --- |
| `gentle` | 較保守的幾何與高度誤差限制，先從這個模式評估 |
| `balanced` | CLI 預設值，在細節與資料量之間取平衡 |
| `aggressive` | 較寬鬆的誤差限制，需更仔細檢查彎道與地形 |

強度不是品質保證，也不保證每條路線的點數都嚴格依序遞減。不同參數會影響停留分群與必要錨點，應以自己的軌跡分析結果判斷。

## 預覽指定參數，再產生副本

```sh
node bin/gpx-slim.js /path/to/ride.gpx --preset gentle --dry-run
node bin/gpx-slim.js /path/to/ride.gpx --preset gentle -o /path/to/ride.share.gpx
```

第一行只預覽；第二行輸出分享副本。未指定 `-o` 時，預設寫到原檔旁的 `ride.slim.gpx`。原始檔不會被覆寫，輸出位置已有檔案或符號連結時也會拒絕寫入。

要試目標刪點比例，使用：

```sh
node bin/gpx-slim.js /path/to/ride.gpx --preset balanced --reduction 70 --dry-run
```

`--reduction 70` 是目標刪除 70% 軌跡點，不是保留 70%，也不是檔案縮小 70%。必要點、誤差限制與離散點數可能讓實際刪點率低於目標。`--analyze` 不接受 `--preset`、`--reduction` 或輸出路徑；指定參數的預覽應使用 `--dry-run`。

## 瘦身保留什麼，又會失去什麼？

每個 `trkseg` 分開處理，不會把不同分段接起來。演算法保留段落首尾、停留起訖、特定註記點與時間異常邊界；保留點的原始 XML 資料不重新序列化。

但是，被刪除的點連同心率、踏頻等子資料也會消失。若指定 `--strip-extensions`，還會額外移除 GPX extensions。瘦身可能改變里程、累計爬升、速度與運動平台統計，因此原始訓練紀錄應另行保存。

Relive 的 GPS 照片配對會找最近的剩餘軌跡點；精簡後，尤其在停留、折返或重訪地點，照片出現的進度可能改變。有時間的照片仍按時間定位，但內插位置也可能有所不同。

## CLI 與網站建置瘦身怎麼選？

| 方式 | 結果 | 適用情境 |
| --- | --- | --- |
| GPX Slim CLI | 另外產生 `.gpx` 檔案 | 需要人工檢查、交給其他工具或分享下載 |
| Docusaurus `gpxSlim` | 精簡編入網站的軌跡資料，原檔不變 | 同一份 Vault 保留完整紀錄、網站減少資料量 |

網站設定可從 `gpxSlim: {preset: 'gentle'}` 開始，不必立即追求固定刪點率。刪點降低資料量與初始化負擔，但照片、圖磚與 3D 影像的成本仍在，不能宣稱刪點 70% 就會快 70%。

## 一個可重複的分享流程

1. 保留原始 GPX 與照片，先用 `--analyze` 了解資料量。
2. 用 `--dry-run` 評估，再建立公開副本或設定網站建置瘦身。
3. 比較起終點、髮夾彎、停留處、多段間隔及照片出現順序。
4. 檢查公開副本中的私人位置與 EXIF；瘦身不是去識別化，仍會保留起終點。
5. 需要精確時間與位置時，關閉瘦身，以完整軌跡發布。

目前 CLI 的參數驗證以合成資料為主，文件尚未宣稱完成各種實際記錄裝置的校準。整份 GPX 會載入記憶體，也不適合當成無大小上限的串流處理工具。

## 系列導覽

1. [[01 Relive 專案介紹]]
2. [[02 Relive 安裝與旅程筆記語法]]
3. [[03 Relive 照片定位與 3D 旅程回放]]
4. [[04 Relive Docusaurus 整合與公開附件]]
5. [[05 Relive GPX 瘦身與分享工作流程]]
6. [[06 Relive React 套件與跨框架整合]]

## 參考資料

- [GPX Slim CLI 使用說明](https://github.com/kywk/relive/blob/main/packages/gpx-slim/README.md)
- [網站瘦身效能報告](https://github.com/kywk/relive/blob/main/docs/gpx-slim-performance.md)
