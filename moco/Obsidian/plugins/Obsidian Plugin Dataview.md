---
title: Obsidian Dataview Plugin
description: Obsidian 中的數據查詢與動態內容生成插件
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - Dataview
  - 數據查詢
sidebar_position: 40
sidebar_label: Dataview Plugin
date_created: 2025-12-24T00:00:00.000Z
date_updated: 2025-12-24T00:00:00.000Z
slug: /obsidian/plugins/obsidian-plugin-dataview/
---

# [Obsidian] Dataview Plugin

[Dataview](https://github.com/blacksmithgu/obsidian-dataview) 是 Obsidian 中最強大的數據查詢插件，可以將你的筆記庫視為數據庫，動態查詢和顯示筆記內容。

## 功能特色

### 📊 數據查詢
- **SQL 風格查詢**: 使用類似 SQL 的語法查詢筆記
- **動態內容**: 查詢結果會隨筆記變化自動更新
- **多種顯示格式**: 列表、表格、任務、日曆等
- **JavaScript 支援**: 使用 DataviewJS 進行複雜查詢

### 🔍 查詢類型
- **LIST**: 顯示檔案列表
- **TABLE**: 顯示表格格式數據
- **TASK**: 顯示任務列表
- **CALENDAR**: 顯示日曆視圖

### 📝 數據來源
- **Frontmatter**: YAML 前置資料
- **內聯欄位**: 文件內的 `key:: value` 格式
- **檔案屬性**: 創建時間、修改時間、大小等
- **標籤和連結**: 自動索引的標籤和連結關係

## 基本語法

### LIST 查詢
```dataview
LIST
FROM "folder"
WHERE condition
SORT field ASC/DESC
```

### TABLE 查詢
```dataview
TABLE field1, field2, field3
FROM "folder"
WHERE condition
SORT field ASC/DESC
```

### TASK 查詢
```dataview
TASK
FROM "folder"
WHERE condition
```

## 實用範例

### 最近創建的檔案
```dataview
LIST
FROM ""
WHERE file.ctime >= date(today) - dur(7 days)
SORT file.ctime DESC
LIMIT 10
```

### 專案進度表格
```dataview
TABLE status, priority, due_date
FROM "projects"
WHERE status != "completed"
SORT priority DESC, due_date ASC
```

### 待辦任務統計
```dataview
TASK
FROM ""
WHERE !completed
GROUP BY file.folder
```

### 標籤統計
```dataview
TABLE length(file.tags) as "標籤數量"
FROM ""
WHERE file.tags
SORT length(file.tags) DESC
```

## 本專案中的應用

### 日記模板中的查詢

#### 當日任務查詢
```dataview
LIST
FROM ""
WHERE file.tasks.due = date({{date:YYYY-MM-DD}})
AND !file.tasks.completed
```

#### 當日創建檔案
```dataview
List 
FROM -"node_modules" 
WHERE file.cday = date("{{date:YYYY-MM-DD}}") 
SORT file.ctime ASC
```

#### 當日修改檔案
```dataview
List 
FROM -"node_modules" 
WHERE file.mday = date("{{date:YYYY-MM-DD}}") 
SORT file.mtime ASC
```

### 專案管理查詢

#### 專案狀態總覽
```dataview
TABLE status, priority, team, progress
FROM "projects"
WHERE type = "project"
SORT status ASC, priority DESC
```

#### 團隊任務分配
```dataview
TABLE file.name as "任務", assignee, status, due_date
FROM ""
WHERE assignee
GROUP BY assignee
```

## DataviewJS 進階應用

### 自訂統計圖表
```dataviewjs
let pages = dv.pages('"daily"')
let data = pages.map(p => ({
    date: p.file.name,
    steps: p.steps || 0,
    reading: p.reading || 0
}))

dv.table(["日期", "步數", "閱讀時間"], 
    data.map(d => [d.date, d.steps, d.reading]))
```

### 動態內容生成
```dataviewjs
let today = moment().format('YYYY-MM-DD')
let tasks = dv.pages().file.tasks
    .where(t => t.due && t.due.toString() === today)
    .where(t => !t.completed)

dv.header(2, `今日待辦 (${tasks.length} 項)`)
dv.taskList(tasks)
```

## 配置設定

### 基本配置
- **刷新間隔**: 5000ms（5秒）
- **任務完成追蹤**: 關閉
- **HTML 支援**: 啟用
- **DataviewJS**: 啟用
- **內聯查詢**: 啟用（前綴 `=`）

### 日期格式
- **預設日期格式**: `MMMM dd, yyyy`
- **日期時間格式**: `h:mm a - MMMM dd, yyyy`

### 表格設定
- **ID 欄位名稱**: `File`
- **群組欄位名稱**: `Group`

## 效能優化

### 查詢優化
- 使用具體的資料夾路徑而非全域搜尋
- 適當使用 LIMIT 限制結果數量
- 避免過於複雜的 WHERE 條件

### 刷新控制
- 調整刷新間隔避免效能問題
- 對於靜態內容可以關閉自動刷新
- 使用 `dv.current()` 獲取當前頁面資訊

## 常見問題

### Q: 查詢結果不更新？
A: 檢查刷新設定，確保啟用自動刷新功能。

### Q: DataviewJS 無法執行？
A: 確認已在設定中啟用 DataviewJS 功能。

### Q: 日期查詢格式錯誤？
A: 使用 `date()` 函數包裝日期字串，確保格式正確。

### Q: 中文檔名查詢問題？
A: 使用雙引號包裹中文路徑和檔名。

## 使用場景

### 📊 數據分析
- 筆記統計和分析
- 習慣追蹤數據彙總
- 專案進度監控

### 📋 任務管理
- 待辦事項彙總
- 截止日期提醒
- 任務分配統計

### 📚 知識管理
- 相關筆記推薦
- 標籤使用統計
- 連結關係分析

### 📅 時間管理
- 日記內容彙總
- 週期性回顧
- 時間分配分析

## 相關插件

- [[Obsidian Plugin Tracker]] - 數據追蹤與視覺化
- [[Obsidian Plugin Templater]] - 模板系統整合
- [[Obsidian Plugin Kanban]] - 看板數據查詢
- **Tasks Plugin** - 任務管理整合