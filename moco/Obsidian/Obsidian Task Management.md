---
title: Task Management
description: 目前 vault 使用 Tasks、Kanban 與 Daily Notes 管理任務的方式
tags:
  - Obsidian
  - PKM
  - Tasks
  - Kanban
sidebar_position: 60
sidebar_label: 任務管理
hide_table_of_contents: true
date_created: 2023-05-15T00:00:00.000Z
date_updated: 2026-09-22T00:00:00.000Z
image: 'https://i.imgur.com/mErPwqL.png'
---

# [Obs] Obsidian 任務管理

本頁記錄目前 vault 的任務管理方式。重點是 Markdown 任務、Tasks 查詢、Daily Notes 與 Kanban 的組合；Properties 主要用來描述筆記，不取代任務本身的狀態。

## 目前配置

- **Tasks** 已啟用，完成與取消時會寫入日期。
- 內建狀態是「未完成」與「完成」。
- 自訂狀態是 `/`（In Progress）與 `-`（Cancelled）。
- **Kanban** 已啟用，並設定日期連結到 Daily Notes、封存時加上日期、隱藏看板標題中的日期與標籤。
- Daily Notes 會在 `_templates/DAILY_NOTE_TEMPLATE.md` 內執行任務查詢。
- 新建任務或暫存內容先放在 `_incoming/`，整理後再移到工作、專案或主題資料夾。

## 基本任務語法

Obsidian 使用一般 Markdown checklist：

```markdown
- [ ] 未完成任務
- [x] 已完成任務
```

Tasks 額外支援到期日、排程日、優先級、重複規則、路徑與標題篩選。例如：

```markdown
- [ ] 完成文件 📅 2026-09-30
- [ ] 修正部署問題 ⏫ 📅 2026-09-23
```

任務狀態的顯示與切換由 Tasks 外掛處理；不要把 frontmatter 的 `status` 欄位和 checklist 狀態混為一談。

## Daily Notes 中的查詢

目前日記模板的 Task & Reminds 區塊包含三組查詢：

### 今天到期

```tasks
path does not include _templates
not done
due on {{date:YYYY-MM-DD}}
sort by priority
```

### 工作區逾期任務

第一組逾期查詢包含 `com.nanshan` 路徑，排除標題含 `Pending` 的任務：

```tasks
path does not include _templates
path includes com.nanshan
heading does not include Pending
not done
due before {{date:YYYY-MM-DD}}
sort by priority
sort by due
```

第二組使用相同條件，但排除 `com.nanshan`，用來查看其他來源的逾期任務。完整模板見 [[Obsidian Daily Notes]]。

## 個人使用流程

### Capture：先收集

- 臨時想法與新任務先寫入當日日記或 `_incoming/`。
- 任務句子以動詞開頭，必要時補上期限、優先級與專案 wikilink。
- 不在收集時過度設計 Properties；先確保任務可找到、可執行。

### Organize：整理來源

- 工作任務依工作資料夾與專案資料夾歸檔。
- 個人事項留在日記、ACTION 或對應生活資料夾。
- 看板適合需要視覺化狀態的專案；單純期限追蹤則使用 Tasks 查詢。
- 已完成的任務保留完成日期，由 Tasks 的設定寫入，不直接手動刪除歷史。

### Execute：執行

- 開啟 Daily Note，先看今天到期與逾期區塊。
- 使用 Tasks 的優先級與到期日排序。
- 需要調整清單順序時使用自訂快捷鍵 `⌥ ⌘ ↑`／`⌥ ⌘ ↓`。
- 需要看流程分欄時開啟對應 Kanban。

### Review：回顧

- Daily Note 的 Done Today 會列出今天完成的任務。
- 每週整理 `_incoming/` 與未完成任務。
- 定期檢查已失效的到期日、重複任務與不再使用的標籤。

## Kanban 使用方式

目前模板位於 `_templates/KANBAN_TEMPLATE.md`，欄位順序是：

```text
backlog → ISSUE → TODO → DOING → Done → archived
```

看板資料仍是 Markdown，因此可以同時使用 wikilink、Tasks 語法與 Git 版本控制。Kanban 的實際設定包括：

- `link-date-to-daily-note: true`
- `prepend-archive-date: true`
- `hide-tags-in-title: true`
- `hide-date-in-title: true`

## Properties 與任務的分工

- **Checklist**：記錄任務是否完成。
- **Tasks metadata**：記錄期限、排程、優先級、重複與完成／取消日期。
- **Properties**：記錄筆記或專案的 type、status、priority、project 等描述資訊。
- **Dataview**：彙整筆記與任務資料，產生回顧清單。

Properties 的型別與目前欄位請見 [[Obsidian Properties]]；不要為了讓查詢成立而任意改動既有欄位名稱。

## 相關外掛

- [[Obsidian Plugin Tasks]]：Tasks 語法、查詢與狀態設定。
- [[Obsidian Plugin Kanban]]：看板與 Daily Notes 整合。
- [[Obsidian Plugin Dataview]]：資料彙整與查詢。
- [[Obsidian Plugin Templater]]：Daily Notes 模板與腳本。
- [[Obsidian Daily Notes]]：每日任務查詢的實際來源。

## 相關文章

- [[my Obsidian]] - 個人 vault 配置
- [[Obsidian Hot Key]] - 自訂快捷鍵
- [[Obsidian Plugins Overview]] - 外掛啟用狀況
