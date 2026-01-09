---
title: remark-obsidian-kanban
description: Docusaurus plugin for Obsidian Kanban boards
image: 'https://i.imgur.com/mErPwqL.png'
tags:
  - Docusaurus
  - Obsidian
  - Plugin
  - Kanban
  - 看板
sidebar_position: 30
sidebar_label: Kanban Plugin
date_created: 2025-09-23T00:00:00.000Z
date_updated: 2025-09-23T00:00:00.000Z
slug: /obsidian/docusaurus/plugin-remark-obsidian-kanban/
---

# [Docusaurus] remark-obsidian-kanban Plugin

自製的 Docusaurus remark 插件，用於將 Obsidian Kanban 格式的 markdown 文件轉換為網頁看板顯示。

## 功能特色

### 🎯 核心功能
- **自動識別**: 檢測 `kanban-plugin: board` frontmatter 自動啟用
- **看板渲染**: 將 Obsidian Kanban 格式轉換為視覺化看板
- **響應式設計**: 自適應不同螢幕尺寸，支援水平滾動
- **任務統計**: 自動顯示每欄位的任務數量

### 🔗 連結支援
- **Wikilink 解析**: 支援 `[[]]` 語法並正確解析為 Docusaurus 路由
- **Markdown 連結**: 完整支援標準 markdown 連結語法
- **統一路由**: 與 remark-wiki-link 使用相同的 pageResolver 邏輯
- **錯誤處理**: 連結解析失敗時提供 fallback 機制

### 🖼️ 多媒體支援
- **圖片嵌入**: 支援 markdown 圖片語法 `![](url)`
- **響應式圖片**: 自動適應卡片寬度，保持比例
- **樣式優化**: 圓角、間距等視覺優化
- **內容格式**: 支援粗體、斜體等文字格式

### 🎨 主題整合
- **Docusaurus 主題**: 自動跟隨明暗主題切換
- **CSS 變數**: 使用 Docusaurus CSS 變數確保一致性
- **視覺層次**: 清晰的欄位和卡片區隔
- **隱藏 TOC**: 看板頁面自動隱藏目錄側邊欄

## 安裝配置

### 1. 插件安裝

```bash
# NPM 安裝 (推薦)
npm install remark-obsidian-kanban

# 或手動 clone 到 plugins 目錄
git clone https://github.com/your-repo/remark-obsidian-kanban plugins/remark-obsidian-kanban
```

### 2. Docusaurus 配置

在 `docusaurus.config.ts` 中配置：

```typescript
const { remarkKanban } = require("./plugins/remark-obsidian-kanban/src/index.js");

// 建立共用的 remark 插件配置
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

// 在 plugins 中使用
plugins: [
  [
    '@docusaurus/plugin-content-docs',
    {
      id: 'docs',
      path: 'docs',
      routeBasePath: 'docs',
      remarkPlugins: createRemarkPlugins(docsFileMap, '/docs/'),
    },
  ],
],
```

## 使用方式

### 1. 基本看板格式

在 markdown 文件中使用：

```markdown
---
kanban-plugin: board
title: 專案看板
---

## 待辦事項

- [ ] 任務標題
  - 任務詳細說明
  - 更多描述內容

- [ ] 另一個任務
  - [[相關文件連結]]
  - ![圖片](image-url)

## 進行中

- [ ] 正在處理的任務
  - 進度說明

## 已完成

- [x] 完成的任務
  - 完成時間：2025-01-01
```

### 2. 支援的語法

#### 卡片標題
- **純文字**: 直接使用任務列表項目
- **格式化**: 支援 **粗體** 和 *斜體*
- **Wikilink**: `[[文件名稱]]` 或 `[[文件名稱|顯示文字]]`
- **圖片**: `![alt](image-url)` 嵌入圖片

#### 卡片內容
- **縮排列表**: 使用縮排的列表項目作為卡片內容
- **多行內容**: 支援多個段落和列表項目
- **連結**: 支援 wikilink 和 markdown 連結
- **圖片**: 內容中的圖片會自動調整大小

### 3. 進階功能

#### 設定區塊過濾
插件會自動過濾 Obsidian Kanban 的設定區塊：
```markdown
%%
kanban:settings
%%
```

#### 任務狀態
- `[ ]` 未完成任務
- `[x]` 已完成任務
- 狀態會影響視覺呈現

## 技術實作

### 架構設計
- **AST 處理**: 基於 unist-util-visit 遍歷語法樹
- **模組化**: 清晰的函數分離和錯誤處理
- **效能優化**: 僅處理 kanban 文件，避免不必要的處理
- **記憶體管理**: 適當的節點過濾和清理

### 渲染流程
1. **檢測 Kanban**: 掃描 frontmatter 中的 `kanban-plugin: board`
2. **解析結構**: 將 H2 標題轉換為看板欄位
3. **處理任務**: 將列表項目轉換為看板卡片
4. **生成 HTML**: 使用 CSS 變數生成響應式看板
5. **樣式注入**: 自動注入必要的 CSS 樣式

### 連結解析機制
```javascript
// Wikilink 解析流程
const resolvedPages = pageResolver(linkText);
const permalink = resolvedPages?.[0] || linkText.replace(/ /g, '-').toLowerCase();
const href = hrefTemplate(permalink);
```

### 錯誤處理
- **連結解析**: wikilink 解析失敗時提供 fallback
- **圖片載入**: 圖片 URL 錯誤時不影響整體渲染
- **日誌記錄**: 詳細的錯誤日誌協助除錯
- **優雅降級**: 插件失效時不影響正常 markdown 渲染

## 樣式系統

### CSS 變數整合
```css
/* 使用 Docusaurus CSS 變數 */
background: var(--ifm-color-emphasis-100);
border: 1px solid var(--ifm-color-emphasis-300);
color: var(--ifm-color-primary);
```

### 響應式設計
- **水平滾動**: 欄位過多時支援水平滾動
- **固定寬度**: 每個欄位固定 300px 寬度
- **間距統一**: 使用一致的 padding 和 margin
- **陰影效果**: 卡片陰影增強視覺層次

### 主題適配
- **明暗主題**: 自動跟隨 Docusaurus 主題切換
- **顏色變數**: 使用主題顏色變數確保一致性
- **對比度**: 確保在不同主題下的可讀性

## 使用場景

### 📋 專案管理
- **任務追蹤**: 將專案任務視覺化管理
- **進度監控**: 清楚顯示各階段任務數量
- **團隊協作**: 共享專案進度和狀態

### 🗓️ 行程規劃
- **旅遊規劃**: 行程安排和景點整理
- **活動管理**: 活動籌備的各階段任務
- **學習計畫**: 課程進度和學習目標

### 📝 內容管理
- **文章寫作**: 寫作流程和進度追蹤
- **知識整理**: 學習筆記的分類整理
- **想法收集**: 創意和靈感的視覺化管理

### 🔄 工作流程
- **開發流程**: 功能開發的各個階段
- **審核流程**: 文件或內容的審核狀態
- **發布流程**: 從草稿到發布的完整流程

## 最佳實踐

### 1. 看板設計
- **欄位命名**: 使用清晰明確的欄位名稱
- **任務粒度**: 保持任務大小適中，避免過於細碎
- **狀態流程**: 設計合理的任務流轉順序

### 2. 內容組織
- **標題簡潔**: 卡片標題保持簡潔明瞭
- **詳細描述**: 在卡片內容中提供必要細節
- **連結使用**: 善用 wikilink 建立文件間關聯

### 3. 維護管理
- **定期更新**: 及時更新任務狀態和內容
- **歸檔處理**: 適時清理已完成的舊任務
- **備份重要**: 重要看板建議定期備份

## 相關連結

- [[Docusaurus Plugins]] - 其他 Docusaurus 插件
- [[Integrate Obsidian and Docusaurus]] - Obsidian 整合指南
- [[Wikilink in Docusaurus]] - Wikilink 支援說明
- [[Plugin Remark Obsidian Leaflet]] - Leaflet 地圖插件
