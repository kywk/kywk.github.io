---
title: Obsidian Daily Notes
description: 目前 vault 的 Daily Notes、模板與每日回顧流程
image: "https://i.imgur.com/mErPwqL.png"
tags:
  - Obsidian
  - Daily Notes
  - 日記系統
  - 模板
sidebar_position: 20
sidebar_label: 日記與模板
date_created: 2023-01-02T00:00:00.000Z
date_updated: 2026-09-22T00:00:00.000Z
---

# [Obsidian] Daily Notes 日記與模板

本頁依目前 `.obsidian/daily-notes.json`、`_templates/DAILY_NOTE_TEMPLATE.md` 與相關外掛設定整理。設定變更時，以 vault 內的檔案為準。

## 目前設定

| 項目 | 設定 |
| --- | --- |
| Daily Notes 資料夾 | `_journaling` |
| 模板 | `_templates/DAILY_NOTE_TEMPLATE.md` |
| 檔名格式 | `YYYY/MM-MMM/YYYY-MM-DD-dddd` |
| 一週起始日 | Monday |
| 每週筆記 | 未啟用 |

實際檔案會像這樣排列：

```text
_journaling/
└── 2026/
    └── 09-Sep/
        └── 2026-09-22-Tuesday.md
```

## 建立日記的工作流程

1. 使用核心 Daily Notes 開啟今天的筆記。
2. Obsidian 依 `daily-notes.json` 套用 `_templates/DAILY_NOTE_TEMPLATE.md`。
3. Templater 解析日期、前後日連結與每日模板腳本。
4. Calendar 提供日期導覽；目前設定為週一開始，沒有週筆記。
5. 在 Today Review 檢查完成任務、新建檔案與當日修改檔案。

## 模板 frontmatter

目前模板會建立以下欄位：

```yaml
---
type: daily
date_created: <% tp.file.creation_date() %>
reading: 0
steps: 10000
pai_earned: 0
pai_caculated: 0
10usd: false
sleep_at: 23:30
wake_up_at: 04:30
---
```

其中 `pai_caculated` 是 vault 既有欄位名稱，雖然拼法不是 `calculated`，目前不自行改名，以免影響既有資料與 Life Tracker 設定。

## 模板內容

### 日期導覽

模板依檔名 `YYYY-MM-DD-dddd` 產生 `Yesterday` 與 `Tomorrow` 的 wikilink。

### Task & Reminds

目前有三組 Tasks 查詢：

- 今天到期且尚未完成的任務。
- 來自 `com.nanshan`、已逾期且標題不含 `Pending` 的任務。
- 非 `com.nanshan`、已逾期且標題不含 `Pending` 的任務。

查詢會排除 `_templates`，並依優先級與到期日排序。

### Todo & Routine

- 每週一加入 Housekeeping 任務。
- 每日保留 Inbox、Outlook、新聞、生活、學習、LeetCode、AI、加班與運動等例行項目。

### Today Review

- **Done Today**：使用 Tasks 查詢今天完成的任務。
- **Created Today**：使用 Dataview 列出今天建立的檔案。
- **Last Modified Today**：使用 Dataview 列出今天修改的檔案。
- 模板最後執行 `_templates/scripts/pin_daily_note.js`，將當日日記固定到工作區。

## 與外掛的實際整合

### Templater

- 模板資料夾：`_templates`
- 使用者腳本資料夾：`_templates/scripts`
- 建立檔案時依資料夾觸發模板。
- 已使用 `pin_daily_note.js` 固定當日日記。

### Tasks

目前啟用完成日期與取消日期；自訂狀態包含 `/`（In Progress）與 `-`（Cancelled）。

### Dataview

- 啟用 DataviewJS。
- 啟用查詢自動刷新，間隔 5 秒。
- 日記模板使用 Dataview 列出新建與修改檔案。

### Life Tracker

目前模板中的 `steps`、`pai_earned`、`pai_caculated`、`reading`、`sleep_at`、`wake_up_at` 與 `10usd` 都有對應的 Life Tracker 欄位定義；但 `life-tracker` 沒有列在目前的社群外掛啟用清單，相關設定仍保留在 `.obsidian/plugins/life-tracker/data.json`。

## 相關文章

- [[my Obsidian]] - 個人 vault 配置
- [[Obsidian Properties]] - Properties 與 frontmatter
- [[Obsidian Plugin Templater]] - Templater 使用方式
- [[Obsidian Plugin Tasks]] - Tasks 查詢與任務狀態
- [[Obsidian Plugin Dataview]] - Dataview 查詢
