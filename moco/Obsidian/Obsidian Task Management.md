---
title: Task Management
description: Use Obsidian as task manager
tags:
  - Obsidian
  - PKM
sidebar_position: 1
hide_table_of_contents: true
date_created: 2023-05-15T00:00:00.000Z
date_updated: 2023-05-15T00:00:00.000Z
image: 'https://i.imgur.com/mErPwqL.png'
---

# [Obs] Obsidian 任務管理系統

## 概述

使用 Obsidian 作為任務管理工具，結合其強大的連結系統、Properties 功能和豐富的插件生態系統，可以建立一個高效且靈活的個人或團隊任務管理系統。

## 核心功能

### 基本任務語法

Obsidian 原生支援 Markdown 任務列表語法：

```markdown
- [ ] 未完成任務
- [x] 已完成任務
- [>] 轉發任務
- [<] 排程任務
- [!] 重要任務
- [-] 取消任務
- [?] 問題任務
- [/] 進行中任務
- [*] 星號任務
```

### Properties 整合

使用 Properties 為任務添加結構化資訊：

```yaml
---
title: "專案任務"
type: "task"
status: "in-progress"
priority: "high"
assignee: "張三"
due_date: 2024-02-01
estimated_hours: 4
actual_hours: 2.5
tags: ["work", "urgent"]
project: "網站重構"
completed: false
---
```

## 任務管理工作流程

### 1. 任務收集 (Capture)

#### 快速收集
- 使用 `⌘ N` 快速建立新任務筆記
- 利用 Daily Notes 記錄當日任務
- 透過 Quick Capture 插件即時記錄想法

#### 收集模板
```markdown
# 任務：{{title}}

## 基本資訊
- **負責人**：
- **優先級**：🔴 高 / 🟡 中 / 🟢 低
- **預估時間**：
- **截止日期**：
- **專案**：[[專案名稱]]

## 任務描述

## 子任務
- [ ] 
- [ ] 
- [ ] 

## 相關資源
- 

## 進度記錄

```

### 2. 任務組織 (Organize)

#### 分類系統
- **按專案分類**：使用資料夾或標籤
- **按優先級分類**：🔴 緊急重要、🟡 重要不緊急、🟢 一般任務
- **按狀態分類**：待辦、進行中、已完成、已取消
- **按負責人分類**：個人任務、團隊任務、委派任務

#### 標籤系統
```
#task/personal     # 個人任務
#task/work         # 工作任務
#task/urgent       # 緊急任務
#task/waiting      # 等待他人
#task/someday      # 未來可能
#project/website   # 網站專案
#context/home      # 在家執行
#context/office    # 辦公室執行
```

### 3. 任務執行 (Execute)

#### 每日工作流程
1. **晨間回顧**：檢查 Daily Notes 和 ACTION 清單
2. **優先級排序**：根據重要性和緊急性安排任務
3. **時間分配**：使用番茄鐘技術執行任務
4. **進度更新**：即時更新任務狀態和進度

#### 專注模式
- 使用 Focus Mode 插件隱藏干擾元素
- 開啟 Zen Mode 進入專注寫作狀態
- 利用 Pomodoro Timer 管理工作時間

### 4. 任務回顧 (Review)

#### 每日回顧
- 檢查當日完成的任務
- 更新未完成任務的狀態
- 規劃明日重點任務

#### 週回顧
- 統計週任務完成率
- 分析時間分配效率
- 調整下週工作重點

#### 月回顧
- 回顧月度目標達成情況
- 分析任務管理系統效果
- 優化工作流程和模板

## 推薦插件

### 核心插件

#### Tasks Plugin
- **功能**：強大的任務查詢和管理
- **特色**：支援複雜的任務篩選和排序
- **查詢語法**：
```
```tasks
not done
due before tomorrow
path includes Projects
sort by priority
```
```

#### Kanban Plugin
- **功能**：看板式任務管理
- **特色**：視覺化任務流程
- **使用場景**：專案管理、工作流程追蹤

#### Calendar Plugin
- **功能**：日曆檢視和日程管理
- **特色**：整合 Daily Notes 和任務截止日期
- **使用場景**：時間規劃、截止日期追蹤

### 輔助插件

#### Templater
- **功能**：動態模板生成
- **用途**：自動化任務建立流程

#### Dataview
- **功能**：資料查詢和統計
- **用途**：任務統計報表、進度追蹤

#### Quick Capture
- **功能**：快速記錄想法
- **用途**：即時任務收集

## 實際應用案例

### 個人 GTD 系統

#### 收集箱設置
```markdown
# 📥 INBOX

## 今日收集
- [ ] 
- [ ] 

## 待處理項目
- [ ] 
- [ ] 

## 快速筆記
- 
```

#### 專案管理
```markdown
# 🎯 專案：網站重構

## 專案資訊
- **開始日期**：2024-01-15
- **預計完成**：2024-03-01
- **負責人**：開發團隊
- **狀態**：進行中

## 主要任務
- [x] 需求分析
- [/] UI/UX 設計
- [ ] 前端開發
- [ ] 後端開發
- [ ] 測試部署

## 相關文件
- [[需求規格書]]
- [[設計稿]]
- [[技術架構]]
```

### 團隊協作系統

#### 任務分配
```markdown
# 👥 團隊任務看板

## 待辦 (TODO)
- [ ] 設計登入頁面 @設計師 #due/2024-01-20
- [ ] 實作 API 接口 @後端工程師 #due/2024-01-25

## 進行中 (DOING)
- [/] 前端頁面開發 @前端工程師 #due/2024-01-30

## 已完成 (DONE)
- [x] 資料庫設計 @後端工程師
- [x] 原型設計 @設計師
```

#### 會議任務追蹤
```markdown
# 📅 會議記錄：週例會

**日期**：2024-01-15
**參與者**：全體團隊

## 決議事項
1. 確定專案時程
2. 分配開發任務
3. 建立溝通機制

## 行動項目
- [ ] 更新專案文件 @專案經理 #due/2024-01-17
- [ ] 準備開發環境 @技術主管 #due/2024-01-18
- [ ] 設計 UI 原型 @設計師 #due/2024-01-20

## 下次會議
**時間**：2024-01-22 10:00
**議程**：進度回報、問題討論
```

## 查詢和統計

### Dataview 查詢範例

#### 未完成任務統計
```dataview
TASK
FROM "Tasks"
WHERE !completed
GROUP BY file.folder
SORT priority DESC
```

#### 本週到期任務
```dataview
TABLE priority, assignee, due_date
FROM "Tasks"
WHERE due_date >= date(today) AND due_date <= date(today) + dur(7 days)
SORT due_date ASC
```

#### 專案進度統計
```dataview
TABLE 
  length(filter(file.tasks, (t) => t.completed)) as "已完成",
  length(filter(file.tasks, (t) => !t.completed)) as "未完成",
  round((length(filter(file.tasks, (t) => t.completed)) / length(file.tasks)) * 100) + "%" as "完成率"
FROM "Projects"
WHERE file.tasks
SORT file.name
```

## 最佳實踐

### 系統設計原則
1. **簡單易用**：避免過度複雜的分類系統
2. **一致性**：統一的命名規則和標籤系統
3. **可擴展**：隨著需求變化調整系統結構
4. **定期維護**：清理過期任務和無效連結

### 工作流程優化
1. **批次處理**：集中處理相似類型的任務
2. **時間分配**：為不同類型任務分配固定時間段
3. **優先級管理**：使用艾森豪威爾矩陣分類任務
4. **進度追蹤**：定期更新任務狀態和進度

### 常見陷阱避免
1. **過度分類**：避免建立過多細分類別
2. **忽略回顧**：定期回顧和調整系統
3. **工具依賴**：專注於工作流程而非工具本身
4. **完美主義**：接受系統的不完美，持續改進

## 故障排除

### 常見問題
1. **任務重複**：建立清晰的任務歸屬規則
2. **連結失效**：定期檢查和修復連結
3. **標籤混亂**：統一標籤命名規範
4. **查詢失效**：檢查 Dataview 語法和資料結構

### 效能優化
- 避免在單一筆記中建立過多任務
- 定期歸檔已完成的任務
- 使用適當的資料夾結構組織檔案
- 限制同時開啟的筆記數量

## See Also

### 相關文件
- [[Obsidian Properties]] - 屬性系統使用
- [[Obsidian Customization Latest]] - 整體客製化設定
- [[Obsidian Hot Key]] - 快速鍵設定

### 推薦資源
- [我如何用 Obsidian 管理任務清單](https://jsliang.com/zh/post/task-management-with-obsidian/)
- [GTD 方法論官方指南](https://gettingthingsdone.com/)
- [Obsidian Tasks Plugin 文件](https://obsidian-tasks-group.github.io/obsidian-tasks/)

### 相關插件
- [Tasks Plugin](https://github.com/obsidian-tasks-group/obsidian-tasks)
- [Kanban Plugin](https://github.com/mgmeyers/obsidian-kanban)
- [Calendar Plugin](https://github.com/liamcain/obsidian-calendar-plugin)
- [Templater Plugin](https://github.com/SilentVoid13/Templater)
