---
title: Obsidian Tracker Plugin
description: Obsidian 中的數據追蹤與視覺化插件
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Obsidian
  - Plugin
  - Tracker
  - 數據視覺化
sidebar_position: 30
sidebar_label: Tracker Plugin
date_created: 2023-01-31T00:00:00.000Z
date_updated: 2025-12-24T00:00:00.000Z
slug: /obsidian/plugins/obsidian-plugin-tracker/
---

# [Obsidian] Tracker Plugin

[Obsidian Tracker Plugin](https://github.com/pyrochlore/obsidian-tracker) 是一個強大的數據追蹤與視覺化插件，可以追蹤筆記中的數字、事件和習慣，並生成圖表進行視覺化分析。

## 功能特色

### 📊 數據追蹤
- **數字追蹤**: 追蹤筆記中的數字變化
- **事件記錄**: 記錄特定事件的發生次數
- **習慣追蹤**: 監控日常習慣的執行情況
- **時間序列**: 追蹤數據隨時間的變化

### 📈 視覺化圖表
- **線型圖**: 顯示數據趋勢變化
- **柱狀圖**: 比較不同時期的數據
- **熱力圖**: 顯示活動強度分佈
- **餅圖**: 顯示數據組成比例
- **日曆視圖**: 以日曆形式顯示數據

### 🔍 數據分析
- **統計資訊**: 自動計算平均值、總和、最大最小值
- **趋勢分析**: 分析數據的上升或下降趋勢
- **目標追蹤**: 設定目標值並追蹤達成情況
- **時期比較**: 比較不同時期的表現

## 安裝與設定

### 1. 插件安裝
1. 開啟 Obsidian 設定
2. 點擊「第三方插件」
3. 關閉「安全模式」
4. 點擊「瀏覽」搜尋 "Tracker"
5. 安裝並啟用插件

### 2. 基本配置
- **預設資料夾**: 設定追蹤數據的預設資料夾
- **日期格式**: 設定日期的顯示格式
- **圖表樣式**: 自訂圖表的顏色和樣式

## 基本語法

### 簡單追蹤
````markdown
```tracker
searchType: tag
searchTarget: exercise
folder: Daily Notes
```
````

### 數字追蹤
````markdown
```tracker
searchType: frontmatter
searchTarget: weight
folder: Daily Notes
line:
    title: 體重變化
    yAxisLabel: 公斤
```
````

### 多數據追蹤
````markdown
```tracker
searchType: frontmatter
searchTarget: mood, energy
folder: Daily Notes
line:
    title: 情緒與精力
    yAxisLabel: 分數
```
````

## 實用範例

### 習慣追蹤
````markdown
```tracker
searchType: tag
searchTarget: workout, reading, meditation
folder: Daily Notes
summary:
    template: "本月共運動 {{sum}} 次"
    style: "color: blue;"
```
````

### 健康指標
````markdown
```tracker
searchType: frontmatter
searchTarget: steps, water
folder: Health
line:
    title: 每日步數與飲水量
    yAxisLabel: 步數/毫升
    lineColor: blue, green
```
````

### 學習進度
````markdown
```tracker
searchType: frontmatter
searchTarget: study_hours
folder: Study
bar:
    title: 每日學習時數
    xAxisLabel: 日期
    yAxisLabel: 小時
```
````

### 情緒追蹤
````markdown
```tracker
searchType: frontmatter
searchTarget: mood
folder: Journal
heatmap:
    title: 情緒熱力圖
    calendarWeeks: 12
```
````

## 進階功能

### 条件篩選
````markdown
```tracker
searchType: frontmatter
searchTarget: mood
folder: Daily Notes
filter:
    - "mood > 7"
    - "date >= 2024-01-01"
```
````

### 目標設定
````markdown
```tracker
searchType: frontmatter
searchTarget: exercise_minutes
folder: Health
line:
    title: 運動時間追蹤
    yAxisLabel: 分鐘
    lineColor: red
    showPoint: true
    pointColor: blue
    fillGap: true
    yMin: 0
    yMax: 120
    reverseYAxis: false
```
````

### 多圖表組合
````markdown
```tracker
searchType: frontmatter
searchTarget: weight, body_fat
folder: Health
line:
    title: 體重與體脂變化
    yAxisLabel: 公斤/%
    lineColor: blue, red
    yAxisLocation: left, right
```
````

## 使用場景

### 🏃 健康管理
- **運動記錄**: 追蹤每日運動時間和強度
- **體重管理**: 監控體重、體脂率變化
- **睡眠追蹤**: 記錄睡眠時間和品質
- **飲食管理**: 追蹤卡路里攝取和營養

### 📚 學習追蹤
- **學習時間**: 記錄每日學習時數
- **閱讀進度**: 追蹤閱讀頁數和書籍
- **技能練習**: 監控程式設計、語言學習進度
- **考試成績**: 追蹤各科目考試表現

### 💼 工作效率
- **專案進度**: 追蹤各專案的完成度
- **時間管理**: 記錄工作時間分配
- **目標達成**: 監控 KPI 和目標達成率
- **效率分析**: 分析工作效率變化

### 😊 情緒管理
- **情緒記錄**: 每日情緒評分追蹤
- **壓力水平**: 監控壓力指數變化
- **幸福指數**: 追蹤生活滿意度
- **社交活動**: 記錄社交互動頻率

## 最佳實踐

### 1. 數據結構設計
- **一致性**: 保持數據記錄的一致性
- **標準化**: 使用統一的標籤和欄位名稱
- **簡單明瞭**: 避免過於複雜的數據結構

### 2. 視覺化設計
- **選擇合適圖表**: 根據數據類型選擇最適合的圖表
- **顏色配置**: 使用有意義的顏色代表不同數據
- **清晰標籤**: 為圖表添加清晰的標題和軸標籤

### 3. 數據管理
- **定期備份**: 定期備份追蹤數據
- **數據清理**: 定期清理異常或錯誤數據
- **長期追蹤**: 建立長期的數據追蹤習慣

## 相關資源

### 官方資源
- [Tracker Plugin GitHub](https://github.com/pyrochlore/obsidian-tracker)
- [Plugin 使用文件](https://github.com/pyrochlore/obsidian-tracker/blob/master/docs/README.md)

### 教學資源
- [Building a USEFUL Habit Tracker in Obsidian](https://www.youtube.com/watch?v=W_leEJHBZW4)

## 相關插件

- [[Obsidian Plugins Overview]] - 插件使用總覽
- [[Obsidian Plugin Kanban]] - 看板管理
- [[Obsidian Plugin Templater]] - 模板系統
- [[Obsidian Plugin Dataview]] - 數據查詢
- [[Obsidian Plugin Tasks]] - 任務管理
- **Dataview** - 數據查詢與顯示
- **Calendar** - 日曆整合
