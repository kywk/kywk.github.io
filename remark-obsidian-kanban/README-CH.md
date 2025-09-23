# remark-obsidian-kanban

一個 Docusaurus 的 remark 插件，將 Obsidian Kanban markdown 檔案渲染為互動式看板。

## 安裝

```bash
npm install remark-obsidian-kanban
```

## 使用方式

在 Docusaurus 配置中添加 remark 插件：

```typescript
const { remarkKanban } = require("remark-obsidian-kanban/src/index.js");

module.exports = {
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        remarkPlugins: [
          remarkKanban, // 作為第一個插件添加
          // ... 其他 remark 插件
        ],
      },
    ],
  ],
};
```

## Obsidian Kanban 格式

建立包含 kanban frontmatter 的 markdown 檔案：

```markdown
---
kanban-plugin: board
title: 我的看板
---

## 待辦

- [ ] 任務 1
- [ ] 任務 2

## 進行中

- [ ] 任務 3
- [x] 已完成任務

## 完成

- [x] 已完成任務
```

## 功能特色

- ✅ 透過 `kanban-plugin: board` frontmatter 偵測看板檔案
- ✅ 將 H2 標題轉換為看板欄位
- ✅ 將任務列表渲染為互動式卡片
- ✅ 顯示每欄任務數量
- ✅ 全寬顯示並隱藏目錄
- ✅ 過濾看板設定區塊
- ✅ 支援已勾選/未勾選任務

## 授權

MIT