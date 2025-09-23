---
title: remark-obsidian-kanban
description: Docusaurus plugin for Obsidian Kanban boards
image: https://i.imgur.com/mErPwqL.png
tags:
  - Docusaurus
  - Obsidian
  - Plugin
  - Kanban
sidebar_position: 30
sidebar_label: Kanban Plugin
date_created: 2025-09-23
date_updated: 2025-09-23
---

# [Docusaurus] remark-obsidian-kanban Plugin

自製的 Docusaurus remark 插件，用於將 Obsidian Kanban 格式的 markdown 文件轉換為網頁看板顯示。

## 功能特色

### 🎯 核心功能
- **自動識別**: 檢測 `kanban-plugin: board` frontmatter 自動啟用
- **看板渲染**: 將 Obsidian Kanban 格式轉換為視覺化看板
- **響應式設計**: 自適應不同螢幕尺寸，支援水平滾動

### 🔗 連結支援
- **Wikilink 解析**: 支援 `[[]]` 語法並正確解析為 Docusaurus 路由
- **Markdown 連結**: 完整支援標準 markdown 連結語法
- **統一路由**: 與 remark-wiki-link 使用相同的 pageResolver 邏輯

### 🖼️ 多媒體支援
- **圖片嵌入**: 支援 markdown 圖片語法 `![](url)`
- **響應式圖片**: 自動適應卡片寬度，保持比例
- **樣式優化**: 圓角、間距等視覺優化

### 🎨 主題整合
- **Docusaurus 主題**: 自動跟隨明暗主題切換
- **CSS 變數**: 使用 Docusaurus CSS 變數確保一致性
- **視覺層次**: 清晰的欄位和卡片區隔

## 使用方式

### 1. 安裝配置

在 `docusaurus.config.ts` 中配置：

```typescript
const { remarkKanban } = require("./remark-obsidian-kanban/src/index.js");

// 在 remarkPlugins 中添加
remarkPlugins: [
  [remarkKanban, { 
    pageResolver: createPageResolver(fileMap), 
    hrefTemplate: (permalink) => `/docs/${permalink}/` 
  }],
  // ... 其他插件
],
```

### 2. Markdown 格式

在 markdown 文件中使用：

```markdown
---
kanban-plugin: board
title: 專案看板
---

## 待辦事項

- [ ] 任務標題
  - 任務詳細說明
  - [[相關文件連結]]
  - ![圖片](image-url)

## 進行中

- [ ] 另一個任務
  - 更多說明

## 已完成

- [x] 完成的任務
```

### 3. 支援的語法

#### 卡片標題
- 純文字
- **粗體** 和 *斜體*
- `[[Wikilink]]` 連結
- `![](image)` 圖片

#### 卡片內容
- 縮排的列表項目
- Markdown 格式化
- 連結和圖片
- 多行內容

## 技術實作

### 架構設計
- **AST 處理**: 基於 unist-util-visit 遍歷語法樹
- **模組化**: 清晰的函數分離和錯誤處理
- **效能優化**: 僅處理 kanban 文件，避免不必要的處理

### 錯誤處理
- **連結解析**: wikilink 解析失敗時提供 fallback
- **圖片載入**: 圖片 URL 錯誤時不影響整體渲染
- **日誌記錄**: 詳細的錯誤日誌協助除錯

### 整合方式
```typescript
// 與 remark-wiki-link 共用 pageResolver
function createRemarkPlugins(fileMap, routeBase) {
  return [
    [remarkKanban, { 
      pageResolver: createPageResolver(fileMap), 
      hrefTemplate: (permalink) => `${routeBase}${permalink}/` 
    }],
    [remarkWikiLink, {
      pageResolver: createPageResolver(fileMap),
      hrefTemplate: (permalink) => `${routeBase}${permalink}/`,
    }],
  ];
}
```

## 使用場景

### 📋 專案管理
- 任務追蹤看板
- 專案進度管理
- 團隊協作規劃

### 🗓️ 行程規劃
- 旅遊行程安排
- 活動時程管理
- 學習計畫追蹤

### 📝 內容組織
- 文章寫作流程
- 知識整理分類
- 想法收集整理

## 相關連結

- [[Docusaurus Plugins]] - 其他 Docusaurus 插件
- [[Integrate Obsidian and Docusaurus]] - Obsidian 整合指南
- [[Wikilink in Docusaurus]] - Wikilink 支援說明