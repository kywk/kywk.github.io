---
title: myObsidian 第一版現況與驗收
description: 第一版基準、能力現況、驗收數字與誠實的做不到清單
cover: https://i.imgur.com/mErPwqL.png
tags:
  - Obsidian
  - myObsidian
  - 驗收
  - Self-hosted
sidebar_position: 20
sidebar_label: 第一版現況與驗收
date_created: 2026-10-24T00:00:00.000Z
date_updated: 2026-10-24T00:00:00.000Z
---

# 02 myObsidian 第一版現況與驗收

第一版基準：`e11953a`（2026-10-24，自動信任與收合選單）。以下數字都是在 vault 複本上實測的，不是推論；真實 vault 從未被寫入。

| 項目 | 數字 |
|---|---|
| 單元測試 | **335/335** |
| 端到端 harness | **21 支／239 項斷言**全綠 |
| renderer | 未修改的官方 Obsidian **1.14.4**（`app.js` 3,942,126 bytes） |
| 冷啟 | **約 510 ms**（同機；約 1 萬檔／340 MB vault 實測） |
| 全 vault 掃描＋metadata cache | 約 1 秒（19,000+ 次 fs 請求，0 失敗） |
| 重連後 reconcile | 約 4.2 秒（10,036 檔） |
| 社群外掛初始化 | 15 個啟用：**15 成功、0 失敗** |

## 第一版做到了什麼

功能不是我們實作的，是 Obsidian 自己的；我們只把宿主補齊：

- Markdown 編輯與預覽、檔案樹、分頁與分割、全域搜尋、標籤／反向連結、圖譜、Canvas、命令面板
- 核心外掛全數、主題與 CSS 片段
- **社群外掛**：載入、啟用、安裝、更新、卸載（含 Obsidian 自己的 Browse 介面）；每次啟動直接信任目前 vault，保留個別外掛的停用狀態
- **多視窗 popout**（同一份 app 的第二個 DOM 表面，不是第二個實例）
- **收合功能選單、右鍵選單、列印／Export to PDF**：選單平常不占頂部空間；左側工具列三橫線按鈕、F10 或單按 Alt 展開，Escape／點外部收起
- **外部變更熱重載**、**衝突副本提示**、**斷線偵測與重連補償**
- 桌面與平板優先的版面（≥600px 維持桌面／平板版面；<600px 才是手機 fallback）、PWA 可加到主畫面

### 外掛：初始化成功 ≠ 功能全驗收

2026-10-24 在獨立複本、Obsidian 1.14.4、Chrome 下盤點：15 個啟用全部初始化成功。這只是啟動相容性，完整功能只驗了以下情境：

| 外掛 | 版本 | 已驗收功能 | harness |
|---|---|---|---|
| Kanban | 2.0.51 | 卡片新增／編輯／跨清單移動／完成／刪除／封存、重載一致 | 14 項 |
| Dataview | 0.5.68 | LIST／TABLE／TASK、DataviewJS、索引更新、checkbox 寫回 | 17 項 |
| Tasks | 8.6.0 | 完成／取消、完成日期、每日重複任務、重載 | 12 項 |
| QuickAdd | 2.32.1 | Template／Capture 寫檔、Unicode 檔名、重載後繼續寫入 | 14 項 |
| Templater | 2.26.0 | 日期／JS 模板、建檔／改名、純 JS user scripts | 12 項 |
| Geo Story Map | 0.5.1 | 地圖標記、故事切換、筆記索引（見 [[01 Geo Story Map 專案介紹]]） | 12 項 |
| Vault Feed Reader | 0.6.1 | 訂閱／RSS／快取／已讀／Markdown 保存（見 [[01 Vault Feed Reader 專案介紹]]） | 13 項 |

另外：`check:plugin-install`（真實網路 Browse → Install → Enable）6 項、`check:plugin-trust`（全新 origin 直接載入、不彈信任窗）6 項、`check:origin-echo`（同檔外改即時生效、跨批次回音收斂）13 項。

維持限制：`child_process` 可匯入、程序執行明確拒絕（Templater system commands 與本機 AI CLI 不可用）；外掛完整功能相容性以 `audit:plugins` 盤點後依情境回歸。詳見 [[Obsidian Plugins Overview]]。

## 誠實的做不到清單

不是待辦事項，是架構邊界：

| 限制 | 原因 |
|---|---|
| 外掛的 shell／本機 AI CLI 功能 | `child_process` 可匯入，所有程序執行呼叫明確拒絕 |
| 系統匣、全域快捷鍵、`obsidian://`、CLI、自動更新 | 瀏覽器沒有對應能力 |
| Sync／Publish 登入 | 官方帳號機制，本專案不使用 |
| 開機自動還原 popout 視窗 | 瀏覽器要求使用者手勢；改為列出上次視窗、逐一點擊還原 |
| 儲存對話框的實際落地路徑 | 瀏覽器不揭露目錄；PDF 一律由列印對話框決定位置 |
| **多人同時編輯** | 目前是單一寫入者模型＋conflict copy，未實作 OT／CRDT |
| 外掛的完整功能相容性 | 初始化成功不代表所有功能已驗收 |

## 怎麼驗（開發者）

專案位置：[kywk/my-obsidian](https://github.com/kywk/my-obsidian)；以下指令皆在 repo 根目錄執行。

```bash
npm --prefix packages/server ci
npm test                                # 335 項

export MYOBS_LIVE_VAULT="$HOME/my-vault"  # 真實 vault：守門會拒絕它，只當複本來源
# 每支 harness 一份乾淨複本（attachment 留 fixture、menu/popout 改 workspace）
npm run check:spike -- --vault <copy>   # 10/10：boot／載入／cache／文字與二進位往返／冷啟
# 其餘 20 支見專案 README〈驗收〉；全部回報 passed: true 才算完成
```

守門是 fail-closed：`MYOBS_LIVE_VAULT` 必須指向真實 vault，否則拒絕執行；複本不能與真實 vault 有父子路徑關係。

## 踩過最貴的坑（節錄）

完整 30+ 條在專案 `docs/DESIGN.md` §11，這裡只列會再咬人的：

1. `policy` 不可為空物件——否則所有社群外掛靜默不載入（§11.3）。
2. 附件 URL 回 `resourcePrefix`，`/v/*` 路徑不可再解碼一次（§11.7）。
3. 瀏覽器缺 `Buffer`：文字全正常、只有附件壞掉（§11.5）。
4. fs 併發上限擋在 shim 傳輸層（§11.1）。
5. `listAll()` 會弄壞檔案樹，用 `reconcileFile`（§11.13）。
6. 列印空白頁是 `app.css` 的 `@media print` 隱藏整個 app（§11.10）。
7. 良性 `ResizeObserver` 錯誤會蓋掉整個 app（§11.15）。
8. harness 共用 vault 複本會交叉汙染（§11.16）。

## 相關文章

- [[01 myObsidian 專案介紹]]：架構、同意畫面、日常使用、安全性
- [[03 myObsidian 下一階段與多人共編]]：下一階段為什麼優先做多人共編
- [[Obsidian Plugins Overview]]：外掛啟用狀況與設定總覽
- [[my Obsidian]]：個人 vault 實際配置（瀏覽器版用 `workspace-server.json` 隔離，不動它）
