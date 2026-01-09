---
title: 'Core: Properties'
description: My daily notes
tags:
  - Obsidian
  - PKM
sidebar_position: 20
hide_table_of_contents: true
date_created: 2023-12-25T00:00:00.000Z
image: 'https://i.imgur.com/mErPwqL.png'
slug: /obsidian/obsidian-properties/
---

# [Obs] Properties 屬性系統

## 概述

Obsidian Properties 是基於 YAML front matter 的強化功能，提供視覺化的屬性編輯介面和強大的資料管理能力。自 Obsidian 1.4.5 版本開始，Properties 成為筆記管理和資料組織的核心功能。

## YAML Front Matter 基礎

### 什麼是 YAML Front Matter

`YAML front matter` 雖然不是 Markdown 文件的標準，但因常被以 Markdown 作為文件格式的部落格、CMS、筆記等程式廣泛使用，常見的 Markdown 編輯器幾乎都支援 `YAML front matter` 的編輯，或是至少不會報錯。

### Obsidian 原生支援的屬性

Obsidian 過往對 front matter 支援算是友善，除了不會因 front matter 報錯外，也原生支援部分 `Key`：

- **tags**: [標籤的使用](https://publish.obsidian.md/help-zh/使用指南/標籤的使用)
- **alias**: [為筆記添加別名](https://publish.obsidian.md/help-zh/使用指南/為筆記添加別名)
- **cssclass**: 自訂 CSS 樣式類別
- **publish**: [發布設定](https://publish.obsidian.md/help-zh/插件/發布)

### 插件生態系統

YAML front matter 可以用來對文章添加屬性資訊，許多插件會利用 YAML front matter 來運作：

- **DataView**: 將文件 front matter 裡的資料當資料庫來搜尋使用
- **Templater**: 動態生成和處理 front matter
- **Calendar**: 使用日期屬性來組織筆記
- **Tasks**: 利用屬性來管理任務狀態

可以說每份文件中 front matter 裡的資料就像是 NoSQL 的一份 document。

## Properties 新功能

Obsidian 自 1.4.5 之後，強化 YAML front matter 區塊，推出 `Properties 屬性欄位` 的支援，帶來許多特點。

### 視覺化介面

![Properties 介面](https://lh3.googleusercontent.com/pw/ABLVV85WCjNBwc8khjV7PDBloQdwElTb1TmqKMWSiWBiPvrnCcPY0SgO6FbllozqMvf2HglBu3jWH7PD6y-1iLy0pfE_ZmK1FsaP6IiFwVpHFyK5Cdhp24vnkbcxFCiSRI4los6icVR8XbUnfuzCb_kCGRSepw=w900-h390-s-no-gm?authuser=0)

最明顯的改變首先是外觀：
- **區塊分離**: front matter 和文件內容有明顯的視覺區別
- **類型提示**: 每個欄位都有資料類型的視覺提示
- **即時編輯**: 可以直接在介面上編輯屬性值
- **自動完成**: 支援屬性名稱和值的自動完成

### 支援的資料類型

![資料類型](https://lh3.googleusercontent.com/pw/ABLVV857COUAsqFgSqlnc43rQoqH6HdwlXaWLR4_fvfsXh-Y6YKZYRy2yyDrlFq__s0p9A9RkyMMEc0xtpLBccP5fH-dvhbf49k6GGldzpdmn9TzNtlDLKIMahUXIX_KN4VV1NzToDkfvby36IQ08jMm0v2R7w=w406-h165-s-no-gm?authuser=0)

發文當下 Obsidian (1.5.3) 的屬性支援以下幾種資料類型：

#### Text (文字)
- 一般的文字資料
- 支援多行文字
- 可用於標題、描述、備註等

#### List (清單)
- Array 格式的資料
- 支援標籤列表、關鍵字等
- 可以動態新增和移除項目

#### Number (數字)
- 數字格式，可被其他插件用以計算
- 支援整數和小數
- 適用於評分、統計、計數等

#### Checkbox (核取方塊)
- 布林值，適合當作 TODO 使用
- 視覺化的勾選介面
- 可用於狀態標記、完成度追蹤

#### Date / Date & Time (日期時間)
- 日期時間欄位
- 適合用來標示筆記日期、TODO 截止日期等
- 支援日期選擇器介面
- 可設定時區和格式

### 全域屬性管理

#### 屬性面板
- 查看所有 vault 中使用的屬性
- 統計每個屬性的使用頻率
- 批次編輯和重新命名屬性

#### 搜尋整合
- 支援按屬性值搜尋
- 布林值搜尋：`property:TRUE` 或 `property:FALSE`
- 空值搜尋：`property:EMPTY`
- 數值比較：`some_property:>10`

## 實際應用案例

### 筆記分類系統
```yaml
---
title: "專案筆記標題"
type: "project"
status: "in-progress"
priority: 3
tags: ["work", "important"]
created: 2024-01-15
due_date: 2024-02-01
completed: false
---
```

### 閱讀筆記管理
```yaml
---
title: "書籍標題"
author: "作者姓名"
rating: 4
read_date: 2024-01-10
genre: ["技術", "管理"]
recommended: true
notes_count: 15
---
```

### 任務管理
```yaml
---
task_name: "完成專案報告"
assignee: "張三"
status: "pending"
priority: "high"
estimated_hours: 8
actual_hours: 6
completed: false
due_date: 2024-01-20T18:00:00
---
```

## 最佳實踐

### 屬性命名規範
1. **一致性**: 在整個 vault 中使用一致的命名規則
2. **描述性**: 屬性名稱應該清楚表達其用途
3. **簡潔性**: 避免過長的屬性名稱
4. **英文優先**: 使用英文命名以確保相容性

### 資料類型選擇
- **標籤和分類**: 使用 List 類型
- **狀態標記**: 使用 Checkbox 類型
- **評分和計數**: 使用 Number 類型
- **時間記錄**: 使用 Date 或 Date & Time 類型
- **描述和備註**: 使用 Text 類型

### 工作流程整合
1. **模板化**: 為不同類型的筆記建立標準化的屬性模板
2. **自動化**: 使用 Templater 等插件自動填入常用屬性
3. **查詢優化**: 設計便於搜尋和篩選的屬性結構
4. **定期維護**: 定期檢查和清理未使用的屬性

## 版本更新記錄

### Obsidian 1.5 更新
Obsidian 1.5 的更新中，針對 Properties 支援再更進一步：

- **全域重新命名**: Properties can now be renamed globally. Renaming will cause the property to be modified in each corresponding file and the search is case-insensitive.
- **進階搜尋**: Global Search now works with non-string property values. Search for boolean values `property:TRUE` or `property:FALSE` or empty values `property:EMPTY`. You can also use inequality operators to search for things like `some_property:>10`.
- **篩選功能**: Global properties view can now be filtered.

## 故障排除

### 常見問題
1. **屬性不顯示**: 檢查 YAML 語法是否正確
2. **類型錯誤**: 確認屬性值符合預期的資料類型
3. **搜尋失效**: 重新建立搜尋索引
4. **效能問題**: 避免在單一筆記中使用過多屬性

### 除錯技巧
- 使用開發者工具檢查 YAML 解析錯誤
- 定期備份重要的屬性配置
- 測試新屬性前先在副本上實驗

## See Also

### 相關文件
- [[Obsidian Customization Latest]] - 整體客製化設定
- [[Obsidian Task Management]] - 任務管理應用
- [[Obsidian Hot Key]] - 快速鍵設定

### 官方資源
- [YAML front matter - Obsidian 中文帮助](https://publish.obsidian.md/help-zh/高级用法/YAML+front+matter)
- [Properties - Obsidian Help](https://help.obsidian.md/Editing+and+formatting/Properties)

### 社群資源
- [Obsidian 推出 Properties 應用教學](https://www.playpcesor.com/2023/09/obsidian-properties.html)
- [使用 Properties 與 templates 實現日記模板](https://forum-zh.obsidian.md/t/topic/22960)
- [Properties 視覺化YAML編輯教學](https://jdev.tw/blog/8152/)
- [Obsidian 的 YAML Front matter 介紹](https://publish.obsidian.md/chinesehelp/01+2021新教程/Obsidian+的+YAML+Front+matter+介绍+by+Bon)
