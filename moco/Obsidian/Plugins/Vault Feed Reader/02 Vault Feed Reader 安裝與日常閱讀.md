---
title: Vault Feed Reader 安裝與日常閱讀
description: Vault Feed Reader 的手動安裝、來源新增、閱讀操作與文章保存指南
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - RSS
  - vault-feed-reader
sidebar_position: 20
sidebar_label: 安裝與日常閱讀
date_created: 2026-09-22T00:00:00.000Z
date_updated: 2026-09-22T12:16:48.043Z
---
# Vault Feed Reader 安裝與日常閱讀

本文依 0.4.0 的本機 Git 與發布紀錄更新。一般使用者可直接下載 GitHub Release 附件安裝；開發者也可自行建置。0.4.0 發布紀錄記載已送交社群審查，未記錄本版審查完成，以下採手動安裝流程。

## 下載或建置安裝檔

到 [0.4.0 GitHub Release](https://github.com/kywk/obsidian-feed-reader/releases/tag/0.4.0)，下載 `main.js`、`manifest.json`、`styles.css` 三個附件；使用現成附件不需要 Node.js。

若要自行建置，準備 Node.js 22，在專案目錄執行：

```sh
npm ci
npm run build
npm test
```

將下載或建置後的三個檔案 `main.js`、`manifest.json`、`styles.css` 複製到目標 vault 的：

```text
.obsidian/plugins/vault-feed-reader/
```

接著在 Obsidian「設定 → 社群插件」啟用 **Vault Feed Reader**。日後替換插件檔案後，需要停用再重新啟用。插件僅支援桌面版，宣告最低 Obsidian 版本為 1.8.7。

## 加入第一個來源

1. 點擊側邊工具列的 RSS 圖示，或執行 **Open RSS reader** 指令。
2. 開啟 **Manage sources**，新增公開 RSS／Atom 網址、顯示名稱與資料夾。
3. 點選來源，查看文章列表；點選文章進入閱讀畫面。
4. 遇到要保留的內容，按 `s` 保存成 Markdown。

新增來源時可以先只填 RSS／Atom URL，插件會嘗試讀取 feed 標題；失敗時保留草稿，補填名稱再送出。這是取得已知 feed 的標題，不是從任意網站自動探索訂閱網址。

來源可同時屬於多個資料夾，適合讓同一個技術部落格出現在「程式設計」與「工作參考」兩個分類。

## 日常閱讀流程

先選擇來源或資料夾，再套用未讀、已讀或今日等條件，也可以搜尋文章標題。列表每頁最多 50 篇，全文在需要時才載入。

開啟文章即標記為已讀。未讀列表會暫時保留剛讀過的文章，直到重新套用篩選或切換來源，方便返回原來的位置。閱讀畫面提供返回列表、上一篇與下一篇；按 `Esc` 返回時保留選取位置。

| 快捷鍵 | 功能 |
| --- | --- |
| `j` / `k` | 下一篇／上一篇，可跨列表頁面 |
| `Enter` | 開啟選取文章 |
| `o` | 在外部瀏覽器開啟原文 |
| `m` | 切換已讀／未讀 |
| `s` | 保存文章，或開啟已保存筆記 |
| `Esc` | 返回列表 |

快捷鍵只在閱讀器有焦點、且沒有正在輸入或進行輸入法組字時作用。設定中的 **Mark read on j/k navigation** 預設關閉；若啟用，使用 `j/k` 移到文章時也會標記已讀。

## 更新與批次整理

開啟閱讀器時會更新來源。只要仍有閱讀器分頁存在，就會每 30 分鐘更新一次；即使切換去寫筆記，排程也會繼續。關閉最後一個閱讀器分頁後才停止。也可以手動更新，來源失敗時會顯示錯誤並保留已有快取。

**Reading actions** 可批次標記目前來源、資料夾或全部來源。操作範圍不受標題搜尋限制，因此不要把搜尋結果視為批次操作的邊界。「某日期以前已讀」採本地日期的午夜為界，只影響嚴格早於該時間的文章。

## 保存後如何整理？

預設筆記存到 `Feed Reader/Articles/`。可以加入自己的摘要、關聯筆記與待辦事項；再次保存同一篇文章只會開啟既有筆記，不會覆寫人工編輯。即使取消訂閱或文章離開快取，已保存筆記仍會保留。

保存的是 feed 提供的內容。若只有摘要，可以按 `o` 前往原文，也可以先保存並開啟筆記，再從命令面板執行「抓取原文全文」或「抓取全文並摘要」。AI 功能需先設定本機 CLI；`s` 不會自動呼叫模型。

若只想整理重點，選「產生 AI 摘要」：有可辨識全文就直接使用，否則背景抓取原文，最後只寫入摘要與 tags，不附加全文。完整設定見 [[05 Vault Feed Reader 全文擷取與 AI 摘要設定]]。

## 延伸閱讀

- [[05 Vault Feed Reader 全文擷取與 AI 摘要設定]]
- [[01 Vault Feed Reader 專案介紹]]
- [[03 Vault Feed Reader 訂閱管理與筆記模板]]
- [專案 README：安裝與操作依據](https://github.com/kywk/obsidian-feed-reader)
