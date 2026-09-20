---
title: Obsidian Tasks Plugin
description: Obsidian 中的進階任務管理插件
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - Tasks
  - 任務管理
sidebar_position: 50
sidebar_label: Tasks Plugin
date_created: 2025-12-24T00:00:00.000Z
date_updated: 2025-12-24T00:00:00.000Z
---

# [Obsidian] Tasks Plugin

[Tasks Plugin](https://github.com/obsidian-tasks-group/obsidian-tasks) 是 Obsidian 中功能強大的任務管理插件，提供進階的任務查詢、過濾和管理功能。

## 功能特色

### ✅ 任務管理
- **進階任務語法**: 支援截止日期、優先級、重複任務等
- **任務狀態**: 多種任務完成狀態標記
- **任務查詢**: 強大的任務搜尋和過濾功能
- **任務統計**: 自動統計任務完成情況

### 📅 日期管理
- **截止日期**: `📅 YYYY-MM-DD` 格式
- **開始日期**: `🛫 YYYY-MM-DD` 格式
- **排程日期**: `⏳ YYYY-MM-DD` 格式
- **完成日期**: `✅ YYYY-MM-DD` 格式

### 🔄 重複任務
- **每日**: `🔁 every day`
- **每週**: `🔁 every week`
- **每月**: `🔁 every month`
- **自訂週期**: `🔁 every 2 weeks`

### ⭐ 優先級
- **高優先級**: `🔺`
- **中優先級**: `🔼`
- **低優先級**: `🔽`

## 任務語法

### 基本任務
```markdown
- [ ] 基本任務
- [x] 已完成任務
- [/] 進行中任務
- [-] 已取消任務
```

### 完整任務語法
```markdown
- [ ] 任務描述 🔺 📅 2024-01-15 🔁 every week
```

### 任務屬性
```markdown
- [ ] 專案會議 
  - 🔺 高優先級
  - 📅 2024-01-15 截止日期
  - 🛫 2024-01-10 開始日期
  - ⏳ 2024-01-12 排程日期
  - 🔁 every 2 weeks 重複
```

## 查詢語法

### 基本查詢
````markdown
```tasks
not done
due today
sort by priority
```
````

### 進階查詢
````markdown
```tasks
path includes projects
not done
due before 2024-01-20
priority is high
sort by due
sort by priority
```
````

## 本專案中的應用

### 日記模板中的任務查詢

#### 當日到期任務
````markdown
```tasks
path does not include _templates
not done
due on {{date:YYYY-MM-DD}}
sort by priority
```
````

#### 逾期任務（工作相關）
````markdown
```tasks
path does not include _templates
path includes com.nanshan
heading does not include Pending
not done
due before {{date:YYYY-MM-DD}}
sort by priority
sort by due
```
````

#### 逾期任務（個人相關）
````markdown
```tasks
path does not include _templates
path does not include com.nanshan
heading does not include Pending
not done
due before {{date:YYYY-MM-DD}}
sort by priority
sort by due
```
````

#### 當日完成任務
````markdown
```tasks
done on {{date:YYYY-MM-DD}}
path does not include _journaling/{{title}}
heading does not include Routine
```
````

## 查詢條件

### 路徑過濾
- `path includes folder` - 包含特定資料夾
- `path does not include folder` - 排除特定資料夾
- `filename includes text` - 檔名包含文字

### 狀態過濾
- `done` - 已完成任務
- `not done` - 未完成任務
- `status.name includes text` - 狀態名稱包含文字

### 日期過濾
- `due today` - 今日到期
- `due before date` - 指定日期前到期
- `due after date` - 指定日期後到期
- `done on date` - 指定日期完成

### 優先級過濾
- `priority is high` - 高優先級
- `priority is medium` - 中優先級
- `priority is low` - 低優先級

### 標題過濾
- `heading includes text` - 標題包含文字
- `heading does not include text` - 標題不包含文字

## 排序選項

### 基本排序
- `sort by due` - 按截止日期排序
- `sort by priority` - 按優先級排序
- `sort by created` - 按創建日期排序
- `sort by done` - 按完成日期排序

### 排序方向
- `sort by due reverse` - 反向排序
- `sort by priority` - 正向排序（預設）

### 多重排序
```tasks
sort by priority
sort by due
sort by path
```

## 任務狀態

### 預設狀態
- `[ ]` - 待辦
- `[x]` - 完成
- `[/]` - 進行中
- `[-]` - 取消

### 自訂狀態
- `[!]` - 重要
- `[?]` - 問題
- `[*]` - 星標
- `["]` - 引用

## 實用範例

### 專案任務管理
````markdown
```tasks
path includes projects/website
not done
sort by priority
sort by due
group by filename
```
````

### 每週回顧
````markdown
```tasks
done after 2024-01-01
done before 2024-01-08
sort by done
group by filename
```
````

### 高優先級任務
````markdown
```tasks
not done
priority is high
sort by due
limit 10
```
````

### 重複任務檢查
````markdown
```tasks
not done
description includes 🔁
sort by due
```
````

## 與其他插件整合

### Dataview 整合
```dataview
TASK
FROM ""
WHERE !completed AND due
SORT priority DESC, due ASC
```

### Calendar 整合
- 任務會在日曆中顯示
- 可以拖拽調整任務日期
- 支援任務完成狀態顯示

### Templater 整合
```javascript

```

## 最佳實踐

### 1. 任務組織
- **使用資料夾分類**: 工作、個人、專案等
- **標題分組**: 使用標題組織相關任務
- **標籤系統**: 配合標籤進行分類

### 2. 日期管理
- **設定截止日期**: 重要任務必須設定截止日期
- **使用開始日期**: 規劃任務執行時間
- **排程功能**: 合理安排任務時程

### 3. 優先級設定
- **高優先級**: 緊急且重要的任務
- **中優先級**: 重要但不緊急的任務
- **低優先級**: 可以延後的任務

### 4. 重複任務
- **例行工作**: 使用重複任務自動化
- **習慣追蹤**: 每日、每週的習慣
- **定期檢查**: 週期性的檢查任務

## 效能優化

### 查詢優化
- 使用具體的路徑過濾
- 避免過於複雜的查詢條件
- 適當使用 limit 限制結果

### 任務管理
- 定期清理已完成任務
- 合理設定任務數量
- 避免過度細分任務

## 相關插件

- [[Obsidian Plugin Dataview]] - 數據查詢整合
- [[Obsidian Plugin Kanban]] - 看板任務管理
- [[Obsidian Plugin Templater]] - 任務模板生成
- **Calendar Plugin** - 日曆視圖整合