---
title: myObsidian 下一階段與多人共編
description: 持續收集使用經驗與除錯之外，優先處理多人共編，讓 Obsidian 成為公司內部團隊共筆工具
cover: https://i.imgur.com/mErPwqL.png
tags:
  - Obsidian
  - myObsidian
  - 共編
  - 路線圖
sidebar_position: 30
sidebar_label: 下一階段與多人共編
date_created: 2026-10-24T00:00:00.000Z
date_updated: 2026-10-24T00:00:00.000Z
---

# 03 myObsidian 下一階段與多人共編

第一版（見 [[02 myObsidian 第一版現況與驗收]]）證明了一件事：在瀏覽器跑未修改的官方 renderer 是可行的，個人自用已經可用。

下一階段走雙軌：

1. **持續收集使用經驗與除錯**：用複本實際吃自己的狗食（dogfooding），重點看社群外掛、附件、桌面版並寫時的 conflict。
2. **優先處理多人共編支援**：目標是讓 Obsidian 能在公司內部成為團隊共筆的工具。

第二軌是本篇的主題。它目前在 [kywk/my-obsidian](https://github.com/kywk/my-obsidian) 的 `docs/TODO.md` 還是 marked `[ ]` 未来（架構已預留，不實作），下一階段要把它扶正為優先項目。

## 為什麼第一版不敢碰多人共編

第一版是**單一寫入者模型**：server 是唯一的寫入仲裁者，兩個人同時寫同一檔案就走 conflict copy（舊版本另存為 `<name>.conflict-<timestamp>.<ext>` 再寫入，並跳通知）。

這對個人夠用（桌面版＋瀏覽器偶爾撞一下，留個副本人工合併即可），對團隊不夠用：

- Obsidian 的 `write()` 是**非原子寫入**（無 temp＋rename），兩個客戶端同時寫會撕裂。
- 現在的 reconcile 是「整檔比對＋逐檔 `reconcileFile`」，沒有**變更序列（change sequence）**，做不到字級／區塊級合併。
- Workspace 版面目前是「每人一份 `workspace-server.json`」隔離，還沒有 **per-user workspace**（每個人的分頁、側欄、開啟狀態各自獨立）。
- 認證目前是**單一共用 token**（`--auth-token`），不是登入系統，沒有 user、沒有權限模型，擋得住隨機掃描、擋不住已拿到 token 的人。
- 路由 `/v/<vaultId>/` 雖已預留多 vault，但一次只服務一個 vault，隔離模型（同一 process 還是每 vault 一個）還沒定。

白話說：**現在的多人是「輪流寫＋撞到留副本」，不是「同時寫＋自動合併」。** 要當團隊共筆，必須補上 OT／CRDT 之類的合併機制，以及身分、權限、presence（誰在看哪裡）。

## 多人共編要解決的四件事

| 題目 | 第一版現況 | 團隊共筆需要的形狀 |
|---|---|---|
| 合併語意 | 整檔覆寫＋conflict copy | OT／CRDT 變更序列；至少做到同檔不同段可自動合併、同段衝突才人工解 |
| 版面狀態 | `workspace.json` 改寫隔離成 `workspace-server.json`（單份） | per-user workspace：每個人的版面、開啟分頁、游標各自存放 |
| 身分與授權 | 單一共用 `--auth-token` | 真正登入：session、per-user 權限（讀／寫／管理）、vault 隔離；token 外洩的 blast radius 要可收斂 |
| 多 vault | 路由已預留 `/v/<vaultId>/`，一次一 vault | 隔離模型決策：同一 process 多 vault vs 每 vault 一 process；設定來源、UI 入口 |

另外三個相關決策（目前都在 `TODO.md`〈需要決策〉，維持不動、等共編設計一起看）：

- `child_process` 要不要開受控通道（L3）：開放等於把 server shell 曝露給外掛，是最大的安全邊界變動；團隊託管會放大風險。
- `releases.obsidian.md` 要不要加入 proxy allowlist：代理一個會再代理的端點的 SSRF 風險。
- Obsidian 1.14.5（含之後版本）驗證：開發機已自動更新到 1.14.5，發布前以 1.14.5 跑完整 21 支。

## 團隊共筆之前，必須先解決授權與安全

這是最重要、但最容易被跳過的一節。

myObsidian 的 renderer 是 Obsidian 的程式碼，不是我們的。專案的定位（見 [[01 myObsidian 專案介紹]] 與 `NOTICE.md`）是：**設計給你自己在自己的機器、自己的 vault 使用。把 renderer 送進他人的瀏覽器（團隊共用、客戶、公開網站、託管服務），需要 Obsidian 團隊的明示同意。**

所以下一階段的順序必須是：

1. **dogfooding＋除錯**（複本，不碰真實 vault）：收集 [[my Obsidian]] 實際工作流（Daily Notes、Tasks、Dataview、Kanban）在瀏覽器的落差。
2. **共編原型驗證**（複本＋隔離網路）：先證明 OT／CRDT 與 per-user workspace 在 renderer 不 patch 的前提下走得通。
3. **授權與安全審查**：取得 Obsidian 明示同意、完成威脅模型（token→登入、TLS、vault 隔離、外掛第三方碼執行、備份與復原），才進入內部試點。
4. **有限內部試點**：單一團隊、單一 vault、明確管理員，先當「可共讀＋輪流寫＋衝突可解」，再往「即時共編」走。

沒有第 3 步，就不要做第 4 步。技術上能跑，不代表可以對他人提供服務。

## 要收集的使用經驗（dogfooding 清單）

試用時請記下這幾類，開 issue 或直接更新本系列：

- 外掛落差：哪個外掛初始化成功但功能不如桌面版（特別是 Templater、Dataview、Tasks、Kanban、QuickAdd、Geo Story Map、Vault Feed Reader 之外你常用的）。
- 附件：圖片／PDF／Range／編碼檔名在你的 vault 是否都正常。
- 並寫衝突：桌面版＋瀏覽器同時寫，你多久遇到一次 conflict copy？合併痛不痛？
- 斷線重連：休眠／tunnel 斷線後，reconcile 是否把檔案加回來、有無漏檔。
- 版面：≥600px 桌面／平板版面在你的螢幕是否可用；popout 還原流程是否順。
- 效能：你的 vault 規模下的冷啟、掃描、重連時間（對照第一版的 510 ms／1 秒／4.2 秒）。

## 和既有方案的關係

- [[Why n How Obsidian]]：Notion 有線上協作，Obsidian 選的是本地＋開放格式。myObsidian 的共編目標不是把 Obsidian 變成 Notion，而是**保留本地 Markdown 與外掛生態**，再長出團隊可用的共編層。
- [[Co-working Spark and Obsidian]]：那是 AI 經由雲端讀寫 vault（讀寫分離、Inbox 落地、人工審核）。myObsidian 是人經由瀏覽器直接開 vault。兩條路徑互補，共編做起來之後，AI 產出與人工共筆會共用同一套衝突與審核語意。
- [[Obsidian Plugins Overview]]：瀏覽器版的外掛是 L2 宿主（瀏覽器 polyfill＋`fs`→RPC），`child_process` 程序執行拒絕。團隊託管時，vault 裡的社群外掛等於在 server 的信任邊界內執行第三方碼，試點前要先盤點允許清單。

## 相關文章

- [[01 myObsidian 專案介紹]]：架構、同意畫面、安全性
- [[02 myObsidian 第一版現況與驗收]]：驗收數字與做不到清單
- [[Why n How Obsidian]]：為什麼選擇 Obsidian（含與 Notion／Logseq 的比較）
- [[Co-working Spark and Obsidian]]：AI 讀寫 vault 的架構決策
- [[my Obsidian]]：個人 vault 實際配置（dogfooding 的對照基準）
