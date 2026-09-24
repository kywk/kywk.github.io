---
title: Obsidian RSS 插件比較：Vault Feed Reader、RSS Dashboard 與 Rho Reader
description: 比較三款 Obsidian RSS 插件的閱讀流程、資料儲存、筆記保存與適用情境
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - RSS
  - vault-feed-reader
sidebar_position: 40
sidebar_label: RSS 插件比較
date_created: 2026-09-22T00:00:00.000Z
date_updated: 2026-09-25T00:00:00.000Z
---
# Obsidian RSS 插件比較：Vault Feed Reader、RSS Dashboard 與 Rho Reader

把 RSS 放進 Obsidian，可以先閱讀再挑選保存，也可以讓每個閱讀項目直接成為筆記檔案。這個選擇會影響知識庫裡出現多少檔案、哪些內容能離線保留，以及換裝置時需要搬移什麼。

本文整理 Vault Feed Reader、RSS Dashboard 與 Rho Reader 的差異，延續本系列「大量瀏覽、精選保存」的使用情境，協助判斷哪一種方式適合自己的閱讀習慣。

> 比較更新：2026-09-25。Vault Feed Reader 0.6.0 已上架社群外掛市場。內容依本專案 README／SPEC，以及另外兩款的官方 README、儲存指南與發布紀錄整理；本文沒有實際安裝評測另外兩款，功能表代表文件所述能力，不代表所有平台與來源都已驗證。

## 三種閱讀方式

**Vault Feed Reader** 的流程是「來源 → 文章列表 → 閱讀 → 精選保存」。大量文章先留在本機快取，只有主動保存的內容才成為 Markdown 筆記，適合每天快速瀏覽、留下少量值得整理的文章。此外也支援「我的最愛」與「稍候閱讀」本地 JSON 清單，兼顧離線全文與輕量標記。[專案 README](https://github.com/kywk/obsidian-feed-reader)

**RSS Dashboard** 將文章與影音集中在閱讀介面，提供全文取得、Markdown 保存、YouTube 與 Podcast 播放、階層資料夾和標籤，並有行動裝置支援。需要多種媒體閱讀功能時，這是值得試用的候選。[官方功能說明](https://github.com/amatya-aditya/obsidian-rss-dashboard#features)

**Rho Reader** 採用每個來源、每篇文章各自一個檔案的方式，結合 Obsidian Bases。點文章預設開啟瀏覽器，也可搭配 Web Viewer。它適合希望閱讀清單直接融入筆記管理的人。[官方 README](https://github.com/scriptnull/rho-reader#readme)

## 功能比較

| 面向 | Vault Feed Reader | RSS Dashboard | Rho Reader |
| --- | --- | --- | --- |
| 主要閱讀介面 | 4 大導覽捷徑、狀態與範疇分組清單（單一來源為雜誌卡片）、純圖示工具列（即時偵測保存狀態）、文章正文 | Dashboard、閱讀器、影音播放器 | Bases 與文章連結 |
| Feed 格式 | RSS、Atom | RSS、Atom、JSON 等 | RSS、Atom、JSON Feed |
| 正文取得 | 閱讀器用 feed 內容；筆記命令可擷取公開原文；最愛/稍候閱讀內建離線全文快照 | 支援原文全文取得 | 主要開啟原文連結 |
| Markdown 檔案 | 選中後手動保存（亦可先加入最愛或稍候閱讀） | 手動保存，支援模板 | 每篇文章建立檔案 |
| 分類方式 | 訂閱為單層多重歸屬；最愛/稍候閱讀清單；摘要可加入筆記 tags | 階層資料夾、標籤 | 標籤 |
| 訂閱交換 | YAML、TOML、OPML | OPML | OPML |
| 平台與安裝 | 桌面限定；社群插件（亦可手動安裝） | 桌面與行動裝置；社群插件 | 基於 Bases，需 Obsidian 1.9.0 以上；社群插件 |

Vault Feed Reader 可在保存後的筆記或 Web Clipper 筆記上，透過 Codex、Claude Code、OpenCode、pi 或自訂 CLI 產生摘要與主題標籤。這是筆記增補流程，不會改成自動替全部訂閱產生 AI 摘要。另兩款是否有同等 AI 功能未在本次調查，不據此宣稱只有本專案支援。詳見 [[05 Vault Feed Reader 全文擷取與 AI 摘要設定]]。

功能依據：[Vault Feed Reader](https://github.com/kywk/obsidian-feed-reader)、[RSS Dashboard](https://github.com/amatya-aditya/obsidian-rss-dashboard#features)、[Rho Reader](https://github.com/scriptnull/rho-reader#readme)。Rho 的發布紀錄另有行動端修正，但本文未驗證其操作體驗。[Rho 發布紀錄](https://github.com/scriptnull/rho-reader/releases)

## 資料如何留下來？

| 資料層 | Vault Feed Reader | RSS Dashboard | Rho Reader |
| --- | --- | --- | --- |
| 訂閱與狀態 | Vault YAML、每來源 JSON、我的最愛與稍候閱讀 JSON | 插件管理的資料；Shards v2 分離使用者狀態 | 來源與文章檔案的 Properties |
| 文章資料 | 本機 IndexedDB，每來源最多 500 篇；最愛/稍候閱讀持久化於 Vault | 可用每來源 JSON shard 保存歷史 | 每篇 Markdown 保存中繼資料 |
| 個人筆記 | 主動保存後建立 | 另存 Markdown | 文章檔案內文供筆記使用 |

Vault Feed Reader 的快取可淘汰，清除後只能重抓來源目前仍提供的文章；閱讀狀態、最愛／稍候閱讀清單與已保存筆記則繼續留在 vault。這讓「日常閱讀」、「輕量標記」與「長期知識沉澱」有清晰分工，也表示備份 vault 時收藏與筆記都能完整隨身帶走。[資料與快取說明](https://github.com/kywk/obsidian-feed-reader#subscriptions-and-reading-state)

RSS Dashboard 的 Vault Shards 將文章歷史拆成每來源 JSON；v2 再將已讀、星號、標籤等狀態獨立放入 `user-state.json`。這有助於資料搬移，但官方指南明言尚未解決所有同步問題。儲存模式與設定仍需一起考慮。[Vault Shards 指南](https://github.com/amatya-aditya/obsidian-rss-dashboard/blob/master/docs/storage-vault-shards-guide.md)

Rho Reader 的 v0.4.0 發布說明指出，文章檔案保存標題、連結、日期、閱讀狀態、標籤及摘要等中繼資料，內文留給使用者做筆記。因此「每篇一個 Markdown」不能直接解讀成「每篇都保存原文全文」。[Rho 檔案儲存說明](https://github.com/scriptnull/rho-reader/releases/tag/v0.4.0)

## 用同一個情境看取捨

假設一天收到 100 篇文章，最後只有 3 篇值得留下。以下是依文件描述推導的工作流程，並非效能量測結果。

使用 Vault Feed Reader 時，100 篇文章可以先在閱讀器快速篩選，感興趣但暫時無法細讀的加入「稍候閱讀」，具備啟發性的加入「我的最愛」，最後只把 3 篇核心內容保存成 Markdown 筆記。保存後可以加入心得，重複保存會開啟原筆記，保留人工編輯。需要長期留存的內容，應在仍可取得時主動保存。

使用 RSS Dashboard 時，可以在同一介面閱讀文章與影音，再把選中的內容另存為筆記。若還希望文章歷史隨裝置搬移，需配合其儲存與同步設定；官方要求新裝置先完成初次同步再啟用，以免空白預設資料覆蓋訂閱。[同步設定說明](https://github.com/amatya-aditya/obsidian-rss-dashboard#syncing-across-devices)

使用 Rho Reader 時，每個項目都有自己的檔案，適合逐篇標籤、連結與做筆記。由此可推論，大量訂閱會增加 vault 檔案數與索引、同步工作；影響程度仍須依訂閱量、裝置與同步方式實測，不能直接判定比較慢。

## 依需求選擇

- **主要在桌面瀏覽很多文章，只保留少量精選內容**：Vault Feed Reader 的資料分工符合這個方向，已上架社群外掛市場（亦可使用 GitHub Release 安裝）；適合桌面環境，行動裝置請改用其他方案。
- **希望直接使用現成閱讀器，並需要手機、全文取得與影音**：優先試用 RSS Dashboard，再用自己的來源檢查閱讀與同步效果。
- **希望每個閱讀項目都能直接參與 Bases、標籤與筆記整理**：Rho Reader 的檔案模式較貼近需求；若重點是保存全文，需另行考慮內容取得流程。

這些建議依工作流程推導；本文沒有進行同一批來源、同一台裝置的效能比較，因此不做速度、記憶體或穩定度排名。

## 系列與比較來源

- [Obsidian 社群外掛：Vault Feed Reader](https://community.obsidian.md/plugins/vault-feed-reader)
- [[05 Vault Feed Reader 全文擷取與 AI 摘要設定]]
- [[01 Vault Feed Reader 專案介紹]]
- [[02 Vault Feed Reader 安裝與日常閱讀]]
- [[03 Vault Feed Reader 訂閱管理與筆記模板]]

本文以[原始比較對話](https://chatgpt.com/s/cx_6ab2363a2f88819194263b6568cc9e69)為整理起點，再核對文中連結的官方文件。分享對話是討論紀錄；功能現況以此次核對與本專案現行文件為準。
