---
title: Obsidian Plugins Overview
description: 本專案中 Obsidian 插件的使用狀況與配置總覽
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - 配置
  - 總覽
sidebar_position: 1
sidebar_label: Plugins Overview
date_created: 2025-12-24T00:00:00.000Z
date_updated: 2025-12-24T00:00:00.000Z
slug: /obsidian/plugins/obsidian-plugins-overview/
---

# [Obsidian] Plugins 使用狀況總覽

本文分析整個專案中 Obsidian 插件的使用狀況，包含已啟用的核心插件、社群插件及其配置。

## 核心插件狀況

### ✅ 已啟用的核心插件
- **file-explorer**: 檔案總管
- **global-search**: 全域搜尋
- **switcher**: 快速切換器
- **graph**: 關係圖譜
- **backlink**: 反向連結
- **outgoing-link**: 外向連結
- **tag-pane**: 標籤面板
- **page-preview**: 頁面預覽
- **daily-notes**: 日記功能
- **note-composer**: 筆記編輯器
- **command-palette**: 命令面板
- **editor-status**: 編輯器狀態
- **outline**: 大綱
- **word-count**: 字數統計
- **file-recovery**: 檔案復原
- **canvas**: 白板功能
- **properties**: 屬性面板
- **bases**: 基礎功能

### ❌ 已停用的核心插件
- **templates**: 模板（使用 Templater 替代）
- **starred**: 星標
- **workspaces**: 工作區
- **slides**: 簡報模式
- **publish**: 發布功能
- **sync**: 同步功能

## 社群插件狀況

### 📊 數據管理類
#### **dataview** - 數據查詢與顯示
- **用途**: 動態查詢和顯示筆記數據
- **配置**: 啟用 DataviewJS，支援內聯查詢
- **使用場景**: 日記模板中的任務查詢、檔案統計

#### **obsidian-tracker** - 數據追蹤
- **用途**: 追蹤數字和事件，生成圖表
- **配置**: 自訂標籤顏色和追蹤設定
- **使用場景**: 習慣追蹤、健康數據記錄

### 🗂️ 任務與專案管理
#### **obsidian-tasks-plugin** - 任務管理
- **用途**: 進階任務管理和查詢
- **配置**: 與日記模板整合
- **使用場景**: 日記中的任務查詢和管理

#### **obsidian-kanban** - 看板管理
- **用途**: Trello 風格的看板管理
- **配置**: 
  - 自訂標籤顏色（#kywk, #NANSHAN, #MASA 等）
  - 連結日記到每日筆記
  - 隱藏標題中的標籤和日期
- **使用場景**: 專案管理、任務流程視覺化

### 📝 內容創建類
#### **templater-obsidian** - 進階模板系統
- **用途**: 動態模板生成
- **配置**:
  - 模板資料夾: `_templates`
  - 腳本資料夾: `_templates/scripts`
  - 啟用檔案創建時觸發
  - 啟用資料夾模板
- **使用場景**: 日記模板、看板模板、書籍模板

#### **quickadd** - 快速新增內容
- **用途**: 快速創建筆記和內容
- **使用場景**: 快速記錄想法和資訊

### 🎨 介面與視覺化
#### **obsidian-leaflet-plugin** - 地圖功能
- **用途**: 在筆記中嵌入互動地圖
- **使用場景**: 旅遊記錄、地點標記

#### **obsidian-excalidraw-plugin** - 繪圖工具
- **用途**: 手繪圖表和示意圖
- **使用場景**: 概念圖、流程圖繪製

#### **obsidian-charts** - 圖表生成
- **用途**: 生成各種統計圖表
- **使用場景**: 數據視覺化

### 🔧 編輯增強類
#### **obsidian-outliner** - 大綱編輯
- **用途**: 增強列表和大綱編輯功能
- **使用場景**: 結構化筆記編輯

#### **cm-editor-syntax-highlight-obsidian** - 語法高亮
- **用途**: 程式碼語法高亮顯示
- **使用場景**: 技術筆記、程式碼片段

### 🏷️ 標籤與連結管理
#### **tag-wrangler** - 標籤管理
- **用途**: 批量管理和重新命名標籤
- **使用場景**: 標籤系統維護

#### **obsidian-auto-link-title** - 自動連結標題
- **用途**: 自動獲取網頁標題作為連結文字
- **使用場景**: 網頁資源收集

### 🎛️ 系統增強類
#### **obsidian-style-settings** - 樣式設定
- **用途**: 自訂主題和樣式設定
- **使用場景**: 介面客製化

#### **recent-files-obsidian** - 最近檔案
- **用途**: 快速存取最近使用的檔案
- **使用場景**: 提升工作效率

#### **calendar** - 日曆功能
- **用途**: 日曆視圖和日期導航
- **使用場景**: 日記系統、時間管理

#### **convert-url-to-iframe** - URL 轉嵌入
- **用途**: 將 URL 轉換為嵌入式內容
- **使用場景**: 網頁內容嵌入

## 模板系統分析

### 📁 模板結構
```
_templates/
├── scripts/
│   └── pin_daily_note.js      # 日記置頂腳本
├── BOOK.md                    # 書籍模板
├── DAILY_NOTE_TEMPLATE.md     # 日記模板
└── KANBAN_TEMPLATE.md         # 看板模板
```

### 📋 日記模板功能
- **Frontmatter 數據追蹤**: 閱讀、寫作、步數、睡眠等
- **任務管理整合**: 使用 Tasks 插件查詢當日和逾期任務
- **Dataview 整合**: 顯示當日創建和修改的檔案
- **導航功能**: 前後日期導航
- **例行事項**: 週一清潔、日常例行工作

### 📊 看板模板配置
- **基本看板結構**: backlog → ISSUE → TODO → DOING → Done → archived
- **Kanban 插件整合**: 使用 `kanban-plugin: basic` 標記

## 插件生態系統

### 🔄 工作流程整合
1. **內容創建**: Templater → QuickAdd → Auto Link Title
2. **任務管理**: Tasks → Kanban → Tracker
3. **數據分析**: Dataview → Charts → Tracker
4. **視覺化**: Leaflet → Excalidraw → Canvas

### 🎯 使用重點
- **日記系統**: 以 Templater 為核心的自動化日記
- **專案管理**: Kanban + Tasks 的任務流程管理
- **數據追蹤**: Tracker + Dataview 的量化自我
- **知識管理**: Graph + Backlinks 的關聯網絡

## 配置建議

### 🚀 效能優化
- 停用不必要的核心插件（如 Slides、Publish）
- 合理配置 Dataview 刷新間隔（目前 5 秒）
- 限制 Tracker 數據範圍避免效能問題

### 🔧 維護要點
- 定期清理無用標籤（使用 Tag Wrangler）
- 檢查模板腳本的相依性
- 備份插件配置和模板檔案

### 📈 擴展方向
- 考慮新增 Periodic Notes 插件支援週報月報
- 評估 Advanced Tables 插件改善表格編輯
- 研究 Obsidian Projects 插件的專案管理功能

## 相關文章

- [[Obsidian Plugin Kanban]] - Kanban 插件詳細使用指南
- [[Obsidian Plugin Templater]] - Templater 插件完整教學
- [[Obsidian Plugin Tracker]] - Tracker 插件數據追蹤指南
