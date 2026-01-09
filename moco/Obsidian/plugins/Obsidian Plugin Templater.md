---
title: Obsidian Templater Plugin
description: Obsidian 中的進階模板系統插件
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - Template
  - 自動化
sidebar_position: 20
sidebar_label: Templater Plugin
date_created: 2023-01-24T00:00:00.000Z
date_updated: 2025-12-24T00:00:00.000Z
slug: /obsidian/plugins/obsidian-plugin-templater/
---

# [Obsidian] Templater Plugin

[Templater](https://github.com/SilentVoid13/Templater) 是 Obsidian 中功能強大的模板系統插件，提供了比內建模板更進階的功能，支援動態內容生成和 JavaScript 程式碼執行。

## 功能特色

### 📝 核心功能
- **動態模板**: 支援變數、函數和條件判斷
- **JavaScript 支援**: 可以在模板中執行 JavaScript 程式碼
- **系統整合**: 讀取系統資訊如日期、時間、檔案資訊等
- **互動式輸入**: 支援使用者輸入和選擇

### 🔄 自動化功能
- **自動觸發**: 在建立檔案時自動執行模板
- **热鍵綁定**: 可以為模板設定快速鍵
- **指令面板**: 透過指令面板快速執行模板
- **批次處理**: 可以同時處理多個檔案

### 🔗 整合能力
- **外部檔案**: 可以讀取和引用外部檔案
- **網路資源**: 支援從網路獲取資料
- **其他插件**: 與其他 Obsidian 插件的整合

## 安裝與設定

### 1. 插件安裝
1. 開啟 Obsidian 設定
2. 點擊「第三方插件」
3. 關閉「安全模式」
4. 點擊「瀏覽」搜尋 "Templater"
5. 安裝並啟用插件

### 2. 基本配置
- **模板資料夾**: 設定存放模板的資料夾
- **自動觸發**: 設定哪些資料夾啟用自動模板
- **程式碼執行**: 啟用 JavaScript 程式碼執行功能

## 基本語法

### 變數語法
```javascript
// 日期變數
{{date}}
{{date:YYYY-MM-DD}}
{{time}}

// 檔案變數
{{title}}
{{folder}}

// 使用者輸入
{{tp.file.cursor}}
{{tp.system.prompt("Enter title")}}
```

### 常用函數
```javascript
// 檔案操作
<% tp.file.title %>
<% tp.file.creation_date() %>
<% tp.file.last_modified_date() %>

// 系統資訊
<% tp.date.now() %>
<% tp.date.now("YYYY-MM-DD") %>
<% tp.date.weekday() %>

// 使用者互動
<% tp.system.prompt("Question") %>
<% tp.system.suggester(["A", "B"], ["Option A", "Option B"]) %>
```

## 實用模板範例

### 日記模板
```markdown
---
title: <% tp.date.now("YYYY-MM-DD") %>
date: <% tp.date.now() %>
tags: [daily]
---

# <% tp.date.now("YYYY年MM月DD日") %>

## 今日任務
- [ ] 

## 今日筆記


## 明日計畫

```

### 會議紀錄模板
```markdown
---
title: <% tp.system.prompt("會議主題") %>
date: <% tp.date.now() %>
type: meeting
attendees: <% tp.system.prompt("參與者") %>
---

# <% tp.system.prompt("會議主題") %>

**日期**: <% tp.date.now("YYYY-MM-DD HH:mm") %>
**參與者**: <% tp.system.prompt("參與者") %>

## 議程
1. 

## 討論要點


## 行動項目
- [ ] 

## 下次會議

```

### 專案模板
```markdown
---
title: <% tp.system.prompt("專案名稱") %>
type: project
status: planning
start_date: <% tp.date.now("YYYY-MM-DD") %>
tags: [project]
---

# <% tp.system.prompt("專案名稱") %>

## 專案概述
**目標**: 
**範圍**: 
**成功標準**: 

## 利益關係人


## 時程規劃


## 風險評估


## 資源需求

```

## 進階技巧

### JavaScript 程式碼
```javascript
<%*
// 獲取上週的日期
const lastWeek = tp.date.now("YYYY-MM-DD", -7);

// 建立檔案連結
const fileName = tp.system.prompt("檔案名稱");
const link = `[[${fileName}]]`;

// 輸出結果
tR += `相關文件: ${link}`;
%>
```

### 剪貼簿處理
參考 [Paste clipboard into list of wikilinks](https://github.com/SilentVoid13/Templater/discussions/173) 的討論，可以將剪貼簿內容轉換為 wikilink 清單。

### 模板嵌套
```javascript
<%* 
// 引用其他模板
const headerTemplate = tp.file.include("[[Header Template]]");
tR += headerTemplate;
%>
```

## 使用場景

### 📋 日常管理
- **日記系統**: 自動建立日記檔案
- **週報月報**: 定期報告模板
- **任務清單**: 結構化的任務管理

### 📚 學習筆記
- **課程筆記**: 統一的筆記格式
- **讀書筆記**: 書籍閱讀模板
- **研究資料**: 學術研究整理

### 💼 工作流程
- **會議紀錄**: 標準化會議文件
- **專案管理**: 專案文件結構
- **報告撰寫**: 工作報告模板

## 模板資源

### 官方資源
- [Templater 官方文件](https://silentvoid13.github.io/Templater/)
- [GitHub Repository](https://github.com/SilentVoid13/Templater)

### 社群模板
- [OB_Template - 新手參考模板](https://github.com/llZektorll/OB_Template)
- [Template Hub - 模板集合](https://github.com/llZektorll/Template_Hub)
- [Bunch of Obsidian Templates](https://github.com/AdamJeddy/Bunch-of-Obsidian-Templates)

## 相關插件

- [[Obsidian Plugins Overview]] - 插件使用總覽
- [[Obsidian Plugin Kanban]] - 看板管理
- [[Obsidian Plugin Tracker]] - 數據追蹤
- [[Obsidian Plugin Dataview]] - 數據查詢
- [[Obsidian Plugin Tasks]] - 任務管理
- **QuickAdd** - 快速新增內容
- **Calendar** - 日曆整合
