---
title: Vault Feed Reader 安裝與日常閱讀
description: Vault Feed Reader 的安裝方式、來源新增、閱讀操作與文章保存指南
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
date_updated: 2026-09-25T00:00:00.000Z
---
# Vault Feed Reader 安裝與日常閱讀

Vault Feed Reader 已上架 Obsidian 社群外掛市場，一般使用者可直接在 Obsidian 內搜尋安裝；若有特殊需求，亦可透過 GitHub Release 下載附件手動安裝或自行建置。外掛僅支援桌面版，宣告最低 Obsidian 版本為 1.8.7。

## 安裝外掛

### 從社群外掛安裝（推薦）

1. 開啟 Obsidian「設定 → 社群外掛」（Settings → Community plugins）。
2. 若尚未關閉限制模式，請先關閉。
3. 點擊社群外掛旁的「瀏覽」（Browse），搜尋 **Vault Feed Reader**。
4. 點擊「安裝」（Install），安裝完成後點擊「啟用」（Enable）。

亦可透過 [Obsidian 社群外掛頁面](https://community.obsidian.md/plugins/vault-feed-reader) 或在瀏覽器中點擊 `obsidian://show-plugin?id=vault-feed-reader` 於 Obsidian 中開啟安裝頁面。

### 手動安裝或自行建置

若環境無法直接連線社群外掛市場，可採手動安裝：

1. 到 [0.6.0 GitHub Release](https://github.com/kywk/obsidian-feed-reader/releases/tag/0.6.0)，下載 `main.js`、`manifest.json`、`styles.css` 三個附件；使用現成附件不需要 Node.js。
2. 將這三個檔案複製到目標 vault 的外掛目錄：

```text
.obsidian/plugins/vault-feed-reader/
```

3. 接著在 Obsidian「設定 → 社群外掛」啟用 **Vault Feed Reader**。日後替換外掛檔案後，需要停用再重新啟用。

若要自行建置，準備 Node.js 22，在專案目錄執行：

```sh
npm ci
npm run build
npm test
```

建置完成後的 `main.js`、`manifest.json` 與 `styles.css` 同樣複製至上述 `.obsidian/plugins/vault-feed-reader/` 目錄。

## 加入第一個來源

1. 點擊側邊工具列的 RSS 圖示，或執行 **Open RSS reader** 指令。
2. 開啟 **Manage sources**，新增公開 RSS／Atom 網址、顯示名稱與資料夾。
3. 點選來源，查看文章列表；點選文章進入閱讀畫面。
4. 遇到要保留的內容，按 `s` 保存成 Markdown。

新增來源時可以先只填 RSS／Atom URL，插件會嘗試讀取 feed 標題；失敗時保留草稿，補填名稱再送出。這是取得已知 feed 的標題，不是從任意網站自動探索訂閱網址。

來源可同時屬於多個資料夾，適合讓同一個技術部落格出現在「程式設計」與「工作參考」兩個分類。

## 日常閱讀流程

### 導覽與篩選

閱讀器介面左側欄上方提供四個常用快捷檢視：
- **Today**：今日發布的新文章。
- **Saved**：已在 Vault 中建立筆記的文章清單。
- **Favorite**：已加入「我的最愛」的珍藏文章。
- **Read Later**：加入「稍候閱讀」待處理的清單。

下方則為資料夾與個別訂閱來源。

在文章列表頂部，篩選按鈕分成兩組明確區隔：
1. **讀取狀態**：`all articles`（全部文章）／`unread`（未讀）／`read`（已讀）。
2. **檢視範疇**：`today`（今日）／`saved`（已保存）／`favorite`（我的最愛）／`read later`（稍候閱讀）。

兩組可自由搭配，例如切換至某資料夾後，只看未讀（`unread`）且屬於稍候閱讀（`read later`）的文章。列表預設套用「未讀」篩選，可在設定中調整預設值。列表每頁最多 50 篇，全文在需要時才載入。

瀏覽單一來源時，文章以雜誌卡片呈現縮圖、作者、時間與摘要，並依日期分組；切換到資料夾或全部文章時則使用精簡清單。

### 閱讀畫面與純圖示工具列

點選文章進入閱讀畫面：
- **頂部標題與後設資訊**：文章標題醒目置頂，下方以緊湊小字與淡色顯示來源名稱與發布時間。
- **純圖示工具列**：
  1. **開啟原文**（`globe` 圖示）：在外部預設瀏覽器中開啟原始網頁。
  2. **複製網址**（`link` 圖示）：將原始文章 URL 複製到剪貼簿。
  3. **複製 Markdown 連結**（`link-2` 圖示）：複製 `[標題](網址)` 格式。
  4. **儲存筆記／開啟筆記**（`bookmark`／`bookmark-check` 圖示）：即時偵測該文章是否已存入 Vault。未保存時顯示書籤圖示；已保存時自動切換為已勾選的書籤圖示並帶有主題高亮，點擊即可直接切換至該 Markdown 筆記。
  5. **我的最愛**（`star` 圖示）：加入或移出「我的最愛」清單。
  6. **稍候閱讀**（`clock` 圖示）：加入或移出「稍候閱讀」清單。加入稍候閱讀的文章，閱讀後**不會**自動消失，必須由你手動再次點擊圖示才會移出。
  7. **切換已讀**（`check-circle` 圖示）：切換已讀與未讀狀態。

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

- [Obsidian 社群外掛：Vault Feed Reader](https://community.obsidian.md/plugins/vault-feed-reader)
- [[05 Vault Feed Reader 全文擷取與 AI 摘要設定]]
- [[01 Vault Feed Reader 專案介紹]]
- [[03 Vault Feed Reader 訂閱管理與筆記模板]]
- [專案 README：安裝與操作依據](https://github.com/kywk/obsidian-feed-reader)
