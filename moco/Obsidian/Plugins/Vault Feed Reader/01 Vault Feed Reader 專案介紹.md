---
title: Vault Feed Reader 專案介紹
description: 在 Obsidian 中大量瀏覽 RSS／Atom，將精選文章保存為 Markdown 筆記
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - RSS
  - vault-feed-reader
sidebar_position: 10
sidebar_label: 專案介紹
date_created: 2026-09-22T00:00:00.000Z
date_updated: 2026-09-24T00:00:00.000Z
---
# Vault Feed Reader 專案介紹

Vault Feed Reader 是一款 Obsidian 桌面版 RSS／Atom 閱讀插件，目標是「大量瀏覽、精選保存」：先在閱讀器裡查看訂閱文章，再把值得留下的內容存成 vault 裡的 Markdown 筆記。

這讓資訊接收與個人知識整理可以在同一個工作環境完成。閱讀器負責更新、篩選與閱讀狀態；保存後的筆記則能加入自己的註解、連結與後續整理。

## 適合怎樣的工作方式？

假設你訂閱了技術部落格、產品消息與長篇專欄，每天可以先用「未讀」或「今日」篩選瀏覽標題，遇到值得細讀的文章再開啟內容。確定要保留時按下 `s`，將來源提供的正文或摘要保存成 Markdown，之後就能像一般 Obsidian 筆記一樣編輯。

瀏覽單一來源時，文章以雜誌卡片呈現，附上縮圖、作者、時間與摘要，並依日期分組；切換到資料夾或全部文章時則改用精簡清單，方便快速掃過大量標題。

插件不要求 Feedly 或其他服務帳號，只需要可公開存取的 HTTP(S) RSS／Atom 網址。同一來源可以放進多個資料夾，文章與已讀狀態仍共用一份。

## 核心功能

- **集中閱讀**：依來源、資料夾、已讀、未讀、今日與已保存篩選，支援標題搜尋。
- **雜誌式瀏覽**：單一來源以卡片顯示縮圖、作者、時間與摘要，並依日期分組。
- **鍵盤操作**：使用 `j/k` 移動、`Enter` 閱讀、`m` 切換已讀、`s` 保存。
- **精選保存**：文章轉為 Markdown；重複保存會開啟既有筆記，保留人工編輯。
- **訂閱搬移**：支援 YAML、TOML 與 OPML 匯入／匯出。
- **全文與 AI 摘要**：保存後在 Markdown 筆記上擷取公開原文，透過本機 CLI 產生摘要與主題標籤，也可搭配 Web Clipper 筆記。
- **筆記模板**：可設定檔名、內文與自訂 Properties，讓新文章符合自己的整理方式。
- **自訂存放位置**：可調整 Feed Reader 根目錄，更換時能選擇搬移原有資料，或在新位置建立新的空白來源。

## 資料放在哪裡？

訂閱、閱讀狀態與保存筆記都留在 vault。文章正文與中繼資料則放在本機 IndexedDB 快取，每個來源最多保留最新 500 篇。

兩者用途不同：快取支援日常瀏覽，保存筆記才是你主動留下的資料。快取淘汰不會刪除已讀紀錄或保存筆記；已保存清單也不依賴原文章仍在快取中。

## 使用範圍

外掛僅支援桌面版 Obsidian，宣告最低版本為 **1.8.7**，可直接在 Obsidian 內搜尋安裝，或從 GitHub Releases 下載安裝檔手動安裝。目前版本為 **0.5.0**。

閱讀器與 `s` 保存使用 feed 提供的正文或摘要；需要完整內容時，可開啟保存後的 Markdown 筆記，另行執行全文擷取或 AI 摘要命令。全文擷取限公開 HTML，不處理網站登入、動態 JavaScript 或付費牆；遠端圖片不保證離線顯示。

AI 摘要沿用本機 CLI 的登入與模型設定，可能將文章送往其設定的雲端模型。操作詳見 [[05 Vault Feed Reader 全文擷取與 AI 摘要設定]]。

## 系列導覽

1. 本篇：專案定位與功能概覽。
2. [[02 Vault Feed Reader 安裝與日常閱讀]]：從安裝到第一次保存文章。
3. [[03 Vault Feed Reader 訂閱管理與筆記模板]]：訂閱搬移、資料備份與模板範例。
4. [[04 Obsidian RSS 插件比較]]：比較 RSS Dashboard、Rho Reader 與本專案的使用取捨。
5. [[05 Vault Feed Reader 全文擷取與 AI 摘要設定]]：本機 Agent 設定、三種命令與 Web Clipper 範例。

## 參考資料

- [Obsidian 社群外掛：Vault Feed Reader](https://community.obsidian.md/plugins/vault-feed-reader)
- [專案原始碼與 README](https://github.com/kywk/obsidian-feed-reader)
- [繁體中文 README](https://github.com/kywk/obsidian-feed-reader/blob/main/README.zh-TW.md)
- [行為規格 SPEC](https://github.com/kywk/obsidian-feed-reader/blob/main/SPEC.md)
