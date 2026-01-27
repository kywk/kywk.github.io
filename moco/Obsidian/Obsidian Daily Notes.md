---
title: Obsidian Daily Notes
description: Obsidian 日記系統的完整使用指南與最佳實踐
image: "https://i.imgur.com/mErPwqL.png"
tags:
  - Obsidian
  - Daily Notes
  - 日記系統
  - 時間管理
sidebar_position: 20
sidebar_label: Daily Notes
date_created: 2023-01-02T00:00:00.000Z
date_updated: 2025-12-24T00:00:00.000Z
slug: /obsidian/obsidian-daily-notes/
---

# [Obsidian] Daily Notes 日記系統

Daily Notes 是 Obsidian 的核心功能之一，體現了筆記軟體的核心思維：**隨時記錄，定期整理**。透過日記系統，可以建立有系統的知識管理和生活記錄。

## 核心理念

### 📝 記錄哲學

1. **隨時記錄**: 把所有臨時想法和靈感紀錄下來
2. **定期整理**: 值得深入的點子再擴展成獨立文章
3. **連結思維**: 利用連結建立知識網絡
4. **時間軸線**: 以時間為軸線的知識累積

### 🔄 工作流程

- **每日記錄** → **週期整理** → **月度回顧** → **年度總結**
- **想法收集** → **主題分類** → **深入研究** → **成果輸出**

## 日期格式設計

### 推薦格式

參考 [Dann Berg 的日記模板](https://dannb.org/blog/2022/obsidian-daily-note-template/)，採用分年月資料夾的樹狀結構：

```
📅 日記結構
├── 2024/
│   ├── 01-Jan/
│   │   ├── 2024-01-01-Monday.md
│   │   ├── 2024-01-02-Tuesday.md
│   │   └── ...
│   ├── 02-Feb/
│   └── ...
└── 2025/
```

**格式**: `YYYY/MM-MMM/YYYY-MM-DD-dddd`

### 優勢

- **有序組織**: 按年月自然排列
- **快速導航**: 容易找到特定時期的記錄
- **檔案管理**: 避免單一資料夾過於臃大
- **備份方便**: 可以按月或年分別備份

## 日記模板設計

### 模板結構

本專案使用的 [DAILY_NOTE_TEMPLATE.md](https://raw.githubusercontent.com/kywk/kywk.github.io/_templates/DAILY_NOTE_TEMPLATE.md) 包含以下模塊：

#### 1. Frontmatter 數據追蹤

```yaml
---
type: daily
date_created: 2026-01-08 16:33
reading: 0 # 閱讀時間（分鐘）
writing: 0 # 寫作時間（分鐘）
steps: 10000 # 步數目標
pai_earned: 0 # PAI 獲得值
sleep_at: 23:30 # 就寬時間
wake_up_at: 04:30 # 起床時間
---
```

#### 2. 日期導航

```markdown
<< [[Yesterday]] | [[Tomorrow]] >>
```

#### 3. IDEA Pool & Quick Noting

快速記錄區域，用於捕捉靈感和臨時想法。

#### 4. Task & Reminds

使用 Tasks 插件查詢任務：

```tasks
# 當日任務
due on {{date:YYYY-MM-DD}}
not done
sort by priority

# 逾期任務
due before {{date:YYYY-MM-DD}}
not done
sort by priority
```

#### 5. Todo & Routine

- **每週一的清潔任務**
- **日常例行事項**
- **學習和成長活動**

#### 6. Today Review

使用 Dataview 和 Tasks 插件統計：

```dataview
# 當日完成任務
TASK WHERE done = date("{{date:YYYY-MM-DD}}")

# 當日建立檔案
LIST WHERE file.cday = date("{{date:YYYY-MM-DD}}")

# 當日修改檔案
LIST WHERE file.mday = date("{{date:YYYY-MM-DD}}")
```

## 插件整合

### 🔌 核心插件

- **[[Obsidian Plugin Templater]]**: 動態模板生成
- **[[Obsidian Plugin Tasks]]**: 任務管理和查詢
- **[[Obsidian Plugin Dataview]]**: 數據查詢和統計
- **[[Obsidian Plugin Tracker]]**: 習慣追蹤和數據視覺化

### 📅 輔助插件

- **Calendar**: 日曆視圖和導航
- **Recent Files**: 快速存取最近檔案
- **QuickAdd**: 快速新增內容

## 使用場景

### 📋 個人管理

- **時間管理**: 記錄每日時間分配
- **習慣追蹤**: 監控健康、學習、運動等習慣
- **情緒記錄**: 記錄每日情緒和感受
- **目標追蹤**: 監控個人目標達成情況

### 💼 工作管理

- **任務記錄**: 追蹤工作任務和專案進度
- **會議筆記**: 記錄會議要點和行動項目
- **學習記錄**: 記錄每日學習內容和心得
- **靈感收集**: 捕捉工作中的想法和改進建議

### 📚 知識管理

- **閱讀筆記**: 記錄每日閱讀內容和心得
- **研究記錄**: 追蹤研究進度和發現
- **想法連結**: 建立不同主題間的連結
- **知識累積**: 逐步建立個人知識庫

## 最佳實踐

### 1. 模板設計

- **結構化**: 保持一致的模板結構
- **模塊化**: 將不同功能分成清晰的模塊
- **自動化**: 利用 Templater 自動生成內容
- **彈性設計**: 根據需求調整模板內容

### 2. 內容組織

- **清晰標題**: 使用有意義的標題和分類
- **連結使用**: 善用 wikilink 建立連結
- **標籤系統**: 建立一致的標籤命名規則
- **定期整理**: 定期清理和整理日記內容

### 3. 數據管理

- **一致性**: 保持 frontmatter 欄位的一致性
- **有意義**: 記錄有意義的數據和指標
- **可分析**: 設計可以分析和視覺化的數據結構
- **長期追蹤**: 建立長期的數據追蹤習慣

### 4. 工作流程

- **每日審查**: 每天花 5-10 分鐘審查和更新
- **週期回顧**: 每週回顧和整理重要內容
- **月度總結**: 每月分析數據和調整策略
- **年度規劃**: 每年制定新的目標和計畫

## 相關資源

### 教學資源

- [【Obsidian 使用教學】應用篇 03 — 如何使用 Obsidian 進行每日復盤？](https://chuhenry.medium.com/obsidian-使用教學-應用篇-03-如何使用-obsidian-進行每日復盤-2285e313884d)
- [My Obsidian Daily Note Template | Dann Berg](https://dannb.org/blog/2022/obsidian-daily-note-template/)
- [My Obsidian Daily Note Template 2022 | Michelle Mac](https://heymichellemac.com/obsidian-daily-note-2022)
- [Obsidian Daily Note Implementation v2 – AgileAdam.com](https://agileadam.com/2022/07/obsidian-daily-note-implementation-v2/)

### 相關插件

- [[Obsidian Plugin Templater]] - 模板系統
- [[Obsidian Plugin Tasks]] - 任務管理
- [[Obsidian Plugin Dataview]] - 數據查詢
- [[Obsidian Plugin Tracker]] - 數據追蹤
- [[Obsidian Plugins Overview]] - 插件總覽
