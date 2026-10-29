---
title: Relive Docusaurus 整合與公開附件
description: 把同一份旅程筆記發布到 Docusaurus，設定整合入口、附件白名單與 GPX 建置瘦身
tags:
  - Obsidian
  - Plugin
  - Relive
  - GPX
sidebar_position: 40
sidebar_label: Docusaurus 整合
date_created: 2026-10-29T00:00:00.000Z
date_updated: 2026-10-30T00:00:00.000Z
---

# Relive Docusaurus 整合與公開附件

在 Obsidian 裡播放成功之後，下一步是讓沒有安裝外掛的讀者也能觀看。Relive 的 Docusaurus 整合會在建置時解析旅程資料，再於瀏覽器載入播放器。筆記語法可以沿用，但附件路徑與發布範圍需要明確設定。

不使用 Docusaurus 的網站可採 `@kywk/react-relive`，直接傳入旅程資料，不需要 remark 或 Vault 附件掃描。兩種整合共用播放器，資料載入責任不同，見 [[06 Relive React 套件與跨框架整合]]。

## 安裝來源先確認

網站套件名稱為 `@kywk/relive`。本機文件目前仍標示 npm 尚未發布，本文未取得 registry 的成功發布證據，因此不能保證直接執行 `npm install @kywk/relive` 已可安裝。

在正式發布前，可於 Relive 專案根目錄執行 `npm run release:pack`，取得經專案檢查的 `.release/docusaurus/` tarball，再在網站專案用 `npm install /實際路徑/套件.tgz` 安裝。CI 也必須取得同一份安裝來源，不能只依賴開發電腦的絕對路徑。套件正式上架後，才改用 registry 版本並提交 lockfile。

## 加入整合入口

以下以網站專案根目錄也是 Vault 根目錄、公開附件位於 `media/` 為例：

```js
const createReliveIntegration = require('@kywk/relive/integration');

const relive = createReliveIntegration({
  vaultRoot: __dirname,
  assetRoots: ['media'],
  gpxSlim: {preset: 'gentle'},
});
```

這是需合併進現有設定的片段。將 `relive.plugin` 加到站台 `plugins` 一次，並將 `relive.remark` 加到每個需要支援旅程的 docs／blog 的 `remarkPlugins`；相簿若有自己的 Markdown 流程，也要加入。保留既有的 wiki-link、slug 與其他 remark 設定。

本 Vault 的 docs、blog 與 album 使用不同處理入口。只改 docs，並不會讓部落格也得到播放器。本文新增教學與交叉連結，並未直接修改這個網站的安裝依賴或 Docusaurus 設定。

## 附件白名單決定可以讀取什麼

`assetRoots` 是 Relive 在建置時可讀取的附件目錄，不是文章發布清單，也不等同 Docusaurus 的 exclude。不要為了解決路徑錯誤，把整個 Vault 加入白名單。

| 筆記裡的路徑 | 網站端的意義 |
| --- | --- |
| `./media/ride.gpx` | 先按文章相對位置解析，再嘗試 Vault 根目錄相對位置 |
| `/media/ride.gpx` | Vault 根目錄相對路徑，不是部署網址的網站根目錄 |
| `'[[ride.gpx]]'` | 在允許的附件範圍搜尋；同名不明確時要求改成完整路徑 |

本 Vault 慣用的根目錄 `assets/` 被 Git 忽略，因此不能假設本機看得到的照片會出現在 CI。應將確定要公開的副本放到已追蹤的公開附件目錄，再把那個目錄加入 `assetRoots`，不要解除整個私人附件庫的忽略規則。

本機照片由 bundler 處理網址、hash 與 `baseUrl`。目前以原檔發布，原有 EXIF 也可能保留；需要移除 GPS 時應先製作公開副本，並在區塊補上用於回放的時間。HEIC 應先轉成 JPEG、PNG、WebP、GIF 或 AVIF 等支援格式。

## 遠端資料與本機資料不完全相同

網站端預設保留遠端照片網址，不在建置時抓 EXIF，因此需要手動填 `time` 或 `lat`／`lon`；也可以改成本機公開附件。遠端 GPX 預設禁止，確有需要時才透過整合選項啟用 `allowRemote: true`。

GPX 缺失會使建置失敗並指出文章；照片缺失則會出現警告。若只更新 GPX 或照片 EXIF，應清除 Docusaurus cache 再建置，不能假設附件已被即時重新解析。

## 與 Geo Story Map 共存

Relive 不取代 [[05 Docusaurus 全螢幕地圖整合與切換設定|Geo Story Map 的網站整合]]。兩種區塊可以並存，但不要重複註冊播放器或地圖入口。

專案的 shared-vault 範例特別處理 StoryMap 0.5.1 在 import 時自動掛載的情況，改在 `onRouteDidUpdate` 後延遲載入，以避免 hydration 前改動頁面。若網站使用這個版本，應參考範例的 `story-map-client.js`，並驗證直接開頁與站內切頁兩種情境。

## 建置時瘦身與交付檢查

`gpxSlim: {preset: 'gentle'}` 會在建置期精簡軌跡，原始 GPX 不變；省略或設為 `false` 保留完整軌跡，`true` 則使用 balanced。它不會產生額外可下載的瘦身 GPX，也不會處理自行放入 static 的原檔。取捨見 [[05 Relive GPX 瘦身與分享工作流程]]。

完成整合後，至少確認一個 docs 頁、一個 blog 頁及實際使用的相簿頁能播放；再測試切頁返回、子路徑部署下的照片、3D 切換與手機版面。這些是網站接入後的驗收步驟，不代表僅新增本文就完成網站整合。

## 系列導覽

1. [[01 Relive 專案介紹]]
2. [[02 Relive 安裝與旅程筆記語法]]
3. [[03 Relive 照片定位與 3D 旅程回放]]
4. [[04 Relive Docusaurus 整合與公開附件]]
5. [[05 Relive GPX 瘦身與分享工作流程]]
6. [[06 Relive React 套件與跨框架整合]]

## 參考資料

- [Docusaurus 整合說明](https://github.com/kywk/relive/blob/main/README.md)
- [共用 Vault 範例](https://github.com/kywk/relive/tree/main/examples/shared-vault)
- [整合入口原始碼](https://github.com/kywk/relive/blob/main/src/integration.cjs)
