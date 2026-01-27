---
slug: /obsidian/docusaurus/wikilink-in-docusaurus/
title: Wikilink in Docusaurus
description: 在 Docusaurus 中實現 Obsidian Wikilink 語法支援的完整指南
tags: [obsidian, docusaurus, wikilink, markdown]
---

# Wikilink in Docusaurus

在 Obsidian 與 Docusaurus 整合的專案中，最重要的功能之一就是讓 Docusaurus 能夠正確解析 Obsidian 的 Wikilink 語法 `[[]]`。這樣可以確保在 Obsidian 中建立的連結在網站上也能正常運作。

## 什麼是 Wikilink

Wikilink 是一種簡化的連結語法，最初來自 Wiki 系統：

- **基本語法**: `[[目標頁面]]`
- **別名語法**: `[[目標頁面|顯示文字]]`
- **優勢**: 比 Markdown 連結更簡潔，支援自動補全

## 技術實現

### remark-wiki-link 插件

本專案使用 `remark-wiki-link` 插件來處理 Wikilink 語法：

```javascript
// docusaurus.config.ts
remarkPlugins: [
  [
    require('remark-wiki-link'),
    {
      pageResolver: (name) => [name.replace(/ /g, '-').toLowerCase()],
      hrefTemplate: (permalink) => `/${permalink}/`,
      aliasDivider: '|'
    }
  ]
]
```

### 配置說明

- **pageResolver**: 將頁面名稱轉換為 URL slug
- **hrefTemplate**: 定義連結的 URL 格式
- **aliasDivider**: 設定別名分隔符號

## 使用範例

### 基本連結
```markdown
參考 [[Docusaurus]] 的官方文件
```

### 別名連結
```markdown
查看 [[Docusaurus|網站生成器]] 的功能
```

### 跨目錄連結
```markdown
相關文章：[[Obsidian/Plugin Development]]
```

## 最佳實踐

### 1. 檔名規範
- 使用有意義的檔名
- 避免特殊字元
- 保持一致的命名風格

### 2. 連結管理
- 優先使用 Wikilink 而非 Markdown 連結
- 善用別名功能提升可讀性
- 定期檢查斷鏈

### 3. 目錄結構
- 保持清晰的目錄層次
- 使用有意義的資料夾名稱
- 考慮 URL 結構的 SEO 友善性

## 常見問題

### Q: Wikilink 無法正確解析？
A: 檢查 `remark-wiki-link` 插件配置，確保 `pageResolver` 函數正確處理檔名轉換。

### Q: 跨目錄連結失效？
A: 確認目標檔案的 slug 設定，並檢查相對路徑是否正確。

### Q: 中文檔名支援？
A: 建議使用英文檔名或透過 frontmatter 的 `slug` 欄位自訂 URL。

## 相關資源

- [remark-wiki-link 官方文件](https://github.com/landakram/remark-wiki-link)
- [讓 Obsidian 與 Docusaurus 一起協作 | Flow state.](https://alex-flow-state.netlify.app/pkm/obs-docusau-cowork/)
- [[Obsidian Plugin Development]]
- [[Docusaurus Configuration]]
