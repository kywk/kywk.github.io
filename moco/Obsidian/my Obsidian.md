---
title: My Obsidian Setup
description: 目前使用中的 Obsidian 個人配置與工作區設定
tags:
  - Obsidian
  - PKM
  - kywk
sidebar_position: 10
sidebar_label: 我的實際配置
hide_table_of_contents: true
date_created: 2024-04-07T00:00:00.000Z
date_updated: 2026-09-22T00:00:00.000Z
image: 'https://i.imgur.com/mErPwqL.png'
---

# [Obs] 我的 Obsidian 實際配置

本頁只記錄目前 vault 中已存在的設定；設定檔變更後，應一併更新本頁。最後核對日：**2026-09-22**。

## Vault 與檔案處理

- **Vault 入口**：`/Users/kywk/obsidian`，目前是指向 `Dropbox/obsidian` 的 symlink。
- **新建檔案**：統一放到 `_incoming/`。
- **附件**：統一放到 `assets/`。
- **自動更新連結**：啟用 `alwaysUpdateLinks`。
- **編輯模式**：Live Preview 啟用；不顯示行號；不使用 Obsidian 的 readable line length。
- **Obsidian 排除清單**：`node_modules/`、`plugins/`、`scripts/`、`src/`、`static/`、`build/`、`.docusaurus/`、`.git/`。

## 外觀與字體

| 項目 | 目前設定 |
| --- | --- |
| Base theme | Obsidian |
| CSS theme | Blue Topaz |
| 基本字級 | 15px |
| 介面／文章字體 | system-ui、PingFang SC、Hiragino Sans GB、Microsoft YaHei 等系統字體 |
| 等寬字體 | Hack Nerd Font、SF Mono、Monaco、Cascadia Code 等 |

## 工作區配置

目前的 `workspace.json` 是左側邊欄、主編輯區、右側邊欄的三區工作區：

- **左側：Vault**：Vault Feed Reader Sources、Files、Recent Files、Search、Tags、All Properties。
- **左側：目前筆記**：Outline、Local Graph、Backlinks、Outgoing links。
- **右側**：Calendar，以及固定開啟的 ACTION、Follow up、HomeLab TODOs、TOGO 等筆記。
- **主區**：Markdown 筆記與 Vault Feed Reader 閱讀器可以固定成分頁。

## 日記與模板

| 項目 | 目前設定 |
| --- | --- |
| Daily Notes 資料夾 | `_journaling` |
| Daily Notes 模板 | `_templates/DAILY_NOTE_TEMPLATE.md` |
| 檔名格式 | `YYYY/MM-MMM/YYYY-MM-DD-dddd` |
| Templater 模板資料夾 | `_templates` |
| Templater 使用者腳本 | `_templates/scripts` |
| 新建檔案時套用模板 | 依資料夾觸發 |

詳情見 [[Obsidian Daily Notes]]。

## 核心外掛

目前啟用的核心功能包含檔案瀏覽、全域搜尋、快速切換、Graph、Backlinks、Outgoing links、Tags、Page Preview、Daily Notes、Note Composer、Command Palette、Outline、Word Count、File Recovery、Canvas、Properties 與 Bases。

目前停用的核心功能包含 Templates、Slash command、Starred、Markdown importer、Random note、Slides、Audio recorder、Workspaces、Publish、Sync、Bookmarks 與 Footnotes。

## 已啟用的社群外掛

目前 `.obsidian/community-plugins.json` 列出的外掛如下：

- **Auto Link Title**：自動取得外部連結標題
- **Calendar**：以週一為一週開始日的日曆檢視
- **Editor Syntax Highlight**：編輯器中的程式碼語法高亮
- **Kanban**：Markdown 看板，並連結日期到 Daily Notes
- **Leaflet**：筆記中的互動地圖
- **Recent Files**：最近開啟檔案
- **Style Settings**：主題與外掛樣式設定
- **Tag Wrangler**：標籤管理
- **Tasks**：任務查詢與完成／取消日期
- **Dataview**：資料查詢，啟用 DataviewJS
- **Outliner**：列表與大綱編輯
- **QuickAdd**：快速新增內容
- **Tracker**：數值與事件追蹤
- **Templater**：模板與使用者腳本
- **Vault Feed Reader**：RSS／Atom 閱讀器與 Markdown 保存

`life-tracker`、`obsidian-excalidraw-plugin`、`obsidian-projects`、`obsidian42-brat`、`symlinks-obsidian` 目前雖仍在 `.obsidian/plugins/`，但沒有列入啟用清單，因此不把它們視為目前使用中的社群外掛。

## 自訂快捷鍵

完整清單見 [[Obsidian Hot Key]]。目前只有以下 4 組自訂快捷鍵：

| 指令 | macOS 快捷鍵 |
| --- | --- |
| Toggle left sidebar | `⌥ ←` |
| Toggle right sidebar | `⌥ →` |
| Swap line down | `⌥ ⌘ ↓` |
| Swap line up | `⌥ ⌘ ↑` |

## 主要資料夾

```text
_incoming/       新建檔案與待整理內容
_journaling/     Daily Notes
_templates/      BOOK、DAILY_NOTE、KANBAN 與 Templater scripts
assets/          附件
moco/            可發佈的工程與工具文章
```

## 相關文章

- [[Obsidian Daily Notes]]：日記、模板與每日回顧
- [[Obsidian Properties]]：Properties 與 frontmatter
- [[Obsidian Task Management]]：Tasks 與任務流程
- [[Obsidian Plugins Overview]]：外掛啟用狀況總覽
