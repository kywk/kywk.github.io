---
title: Vault Feed Reader 訂閱管理與筆記模板
description: 管理 RSS 訂閱、使用 OPML 搬移來源，並設定資料備份與保存筆記模板
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - RSS
  - vault-feed-reader
sidebar_position: 30
sidebar_label: 訂閱管理與筆記模板
date_created: 2026-09-22T00:00:00.000Z
date_updated: 2026-09-24T00:00:00.000Z
---
# Vault Feed Reader 訂閱管理與筆記模板

Vault Feed Reader 把訂閱清單、閱讀狀態與筆記留在 vault，讓日常閱讀能銜接個人的備份與筆記整理方式。本文說明資料用途、存放位置與設定方式。

## 訂閱與資料夾

**Manage sources** 會開啟專用管理分頁，分成 **Sources** 與 **Folders** 兩個檢視。來源每頁顯示 50 筆，可依名稱、網址或資料夾搜尋全部訂閱。

單一來源可屬於多個資料夾。從資料夾移除來源只會解除該關聯；取消訂閱則會全域移除來源並清除本機快取，但保留閱讀狀態與保存筆記。刪除資料夾不會刪除來源，失去所有資料夾歸屬的來源會出現在 **Unfiled**。

來源網址與穩定 ID 共同維持閱讀歷史。重新訂閱相同網址會沿用原有 ID；若要換網址，應新增來源，名稱與資料夾則可直接編輯。

## 用 OPML 搬移訂閱

在 **Manage sources → Import / export** 選擇 **OPML**，貼上內容或選取 `.opml`／`.xml` 檔，再執行匯入。選檔不會自動切換格式，需要先確認格式選項。

預設採合併：以 URL 去除重複來源，保留既有名稱、ID 與分類關聯。**Replace all subscriptions** 會要求確認，採用匯入的名稱與分類，並沿用已知網址的 ID。匯出時使用 **Generate export** 產生文字，或透過 **Download** 下載 `feeds.opml`。

支援匯入 OPML 1.0、1.1、2.0，匯出為 2.0。巢狀分類會攤平成 `Parent / Child` 形式的單層名稱，匯出時不會還原成巢狀結構。

OPML 只搬移訂閱與分類，不包含閱讀狀態、快取、保存筆記或本專案內部 ID。全新環境會產生新的 ID，不能將匯入 OPML 視為完整還原。

## 自訂存放根目錄

在 **Settings → Vault Feed Reader → Feed Reader root folder** 可自訂存放資料的根目錄。若新目錄是空的，插件會詢問要「把原資料夾檔案搬過去」，或在該位置「建立新的空白來源」；新目錄已有檔案時則直接切換，不會搬動或刪除既有內容。

訂閱 YAML、每來源閱讀狀態、來源 ID 對照與保存筆記都預設位於此根目錄下；變更後，未來的保存與狀態寫入會改到新位置。

## 備份要保留什麼？

| 資料 | 預設位置 | 用途 |
| --- | --- | --- |
| 訂閱清單 | `Feed Reader/feeds.yaml` | 訂閱的唯一權威來源，可調整路徑 |
| 閱讀狀態 | `Feed Reader/state/<feedId>.json` | 各來源已讀與未讀紀錄 |
| 來源 ID 對照 | `Feed Reader/state/source-ids.json` | 重新訂閱時延續身分 |
| 保存筆記 | `Feed Reader/Articles/` | 精選文章與人工註記，可調整路徑 |
| 文章快取 | 本機 IndexedDB | 日常瀏覽使用，可淘汰重建 |

備份時應保留 vault 裡的訂閱、狀態與筆記。插件設定使用 Obsidian 的插件資料儲存；若也要保留模板等偏好，備份策略需涵蓋對應插件設定。AI 提示詞與全文辨識規則也在插件設定中；Agent 路徑、參數、預設 Agent 與偵測結果則存在此裝置、此 vault 專用的 localStorage。換裝置後要重新安裝／登入 CLI 並檢查本機 Agent 設定。

快取每來源最多保留最新 500 篇，重建時只能取得來源仍提供的文章，不能當成歷史封存。插件不處理跨裝置衝突合併。

若直接修改訂閱 YAML，插件會自動重新載入。無效檔案會顯示錯誤、沿用最後有效清單，並暫停介面回寫直到修正，避免損壞內容被覆蓋。

## 建立自己的保存模板

在 **Settings → Vault Feed Reader → Saved note templates** 可設定檔名、內文與自訂 Properties。

檔名不必加 `.md`，例如：

```text
{{date}} {{title}}
```

自訂 Properties 輸入 YAML mapping，不需要 `---`：

```yaml
tags:
  - rss
status: inbox
source: "{{feed}}"
```

內文範例：

```markdown
# {{title}}

## 我的筆記

## 文章內容

{{content}}
```

可用變數包含 `{{title}}`、`{{feed}}`、`{{link}}`、`{{published}}`、`{{created}}`、`{{date}}`；`{{content}}` 只可用於內文。尚不支援作者、獨立摘要或資料夾變數，也不執行腳本。

`published` 與 `created` 預設為 ISO 時間；例如 `{{created:YYYY-MM-DD}}` 可輸出日期。支援格式為 `YYYY-MM-DD`、`YYYY-MM-DD HH:mm`、`YYYY-MM-DD HH:mm:ss`、`YYYY-MM-DDTHH:mm:ss`，全部採 UTC。`date` 依發佈時間、首次抓取時間、保存時間依序取可用值；缺少發佈日期時，`published` 留空。

設定頁可預覽檔名與 Markdown 原始碼。確認後按 **Apply templates** 才會保存；**Load defaults** 只重設草稿，仍需套用。`title`、`date_created`、`date_updated` 與 `feed_reader_*` 為保留 Properties，不能覆寫。模板只影響新筆記，不會重寫已保存內容。

## 筆記日期與 AI 標籤

新保存筆記使用 `date_created`、`date_updated`，初次都是保存當下的 UTC ISO 時間。對本插件保存的筆記執行全文或摘要更新時，保留建立時間並更新 `date_updated`；重複 Save 仍只開啟筆記，不改寫日期。人工編輯不會由插件自動更新日期。

舊筆記仍可開啟與去重；明確執行全文／摘要命令時，才將舊日期欄位遷移，沒有整批改寫。這項日期維護只作用於具有 `feed_reader_id` 的筆記，不會改動 Web Clipper 筆記的自訂日期。

摘要會同時要求 3–5 個主題標籤，合併到既有 `tags` 清單並忽略大小寫去重，不刪除原有標籤。單獨抓取全文不產生 tags；模型格式或既有 tags 型別無效時，摘要與標籤都不寫入。設定見 [[05 Vault Feed Reader 全文擷取與 AI 摘要設定]]。

## 內容與連線

閱讀與保存沿用共用的 HTML 清理規則，再將保存內容轉成 Markdown。圖片仍使用遠端網址，開啟內容時可能向第三方圖片主機發出請求。

更新會直接連線到訂閱來源；開原文則使用外部瀏覽器。依專案 README，插件沒有分析追蹤、廣告或開發者營運的後端，也不將筆記與閱讀狀態上傳至插件服務。執行 AI 摘要時，選定文字會交給本機 CLI，並可能送到該 CLI 設定的模型服務；「本機 Agent」不表示模型一定離線執行。

## 延伸閱讀

- [[05 Vault Feed Reader 全文擷取與 AI 摘要設定]]
- [[01 Vault Feed Reader 專案介紹]]
- [[02 Vault Feed Reader 安裝與日常閱讀]]
- [專案 README：資料、模板與 OPML 說明](https://github.com/kywk/obsidian-feed-reader)
- [SPEC：資料與保存行為契約](https://github.com/kywk/obsidian-feed-reader/blob/main/SPEC.md)
