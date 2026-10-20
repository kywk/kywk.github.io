---
title: Obsidian 外掛 Kanban 與 Tasks
description: remark-obsidian-kanban 與 rehype-obsidian-tasks 的安裝、設定、輸出與站內版本遷移
tags:
  - Docusaurus
  - Obsidian
  - Plugin
  - Kanban
  - Tasks
  - npm
sidebar_position: 30
sidebar_label: Kanban 與 Tasks
date_created: 2026-10-21T00:00:00.000Z
date_updated: 2026-10-21T00:00:00.000Z
---

# Obsidian 外掛 Kanban 與 Tasks

`remark-obsidian-kanban` 與 `rehype-obsidian-tasks` 是由 [[01 docusaurus-kit 專案總覽|docusaurus-kit]] 維護的兩個外掛：

| 套件 | 版本 | 階段 | 功能 |
| --- | --- | --- | --- |
| `remark-obsidian-kanban` | `0.2.1` | remark | 將 Obsidian Kanban 看板轉成靜態 HTML |
| `rehype-obsidian-tasks` | `0.2.1` | rehype | 將 `[-]`、`[/]` 轉成 GFM task item |

兩者可以獨立使用。若站上同時有看板與任務清單，通常會一起裝。

## 安裝

```bash
npm install remark-obsidian-kanban rehype-obsidian-tasks
```

## Kanban

### 設定

```ts
// docusaurus.config.ts
import { remarkKanban } from 'remark-obsidian-kanban';

export default {
  markdown: {
    // 外掛會輸出 raw HTML；Docusaurus 需以 CommonMark 處理 .md
    format: 'detect',
  },
  presets: [
    [
      'classic',
      {
        docs: {
          remarkPlugins: [
            [
              remarkKanban,
              {
                // 兩個都是選用；不給時 wikilink 會變成純文字
                pageResolver: (name: string) => [name.replaceAll(' ', '-').toLowerCase()],
                hrefTemplate: (permalink: string) => `/docs/${permalink}`,
              },
            ],
          ],
        },
      },
    ],
  ],
};
```

`pageResolver` 與 `hrefTemplate` 的責任和 `remark-wiki-link` 相同：前者把筆記名稱轉成 permalink，後者把 permalink 轉成 URL。若站上同時使用 `remark-wiki-link`，`remarkKanban` 要放在它**後面**，這樣看板外掛才看得到 `wikiLink` 節點。

### 看板格式

```markdown
---
kanban-plugin: board
title: 專案看板
---

## To Do

- [ ] 撰寫文件
  - 補充安裝範例

## In Progress

- [/] 遷移舊看板

## Done

- [x] 建立 plugin
- [-] 取消的任務
```

外掛的判斷與轉換規則：

- 只在 frontmatter 出現 `kanban-plugin: board` 時啟用。
- `##` 標題是欄位；清單項目是卡片。
- 卡片第一段是標題，縮排內容是卡片內文。
- 移除卡片標題前的 `[ ]`、`[x]`、`[-]`、`[/]` 標記。
- 依狀態加上 `kanban-card--open`、`kanban-card--done`、`kanban-card--cancelled`、`kanban-card--in-progress`，並在卡片上留下 `data-task`。
- 欄位標題會顯示卡片數量。
- 刪除 Obsidian 的 `%% kanban:settings %%` 區塊。
- 保留卡片內的圖片、Markdown 連結與 wikilink。

輸出是靜態 HTML，沒有拖曳、排序或持久化。卡片欄位固定 300px，看板本身可水平滾動，顏色使用 Docusaurus 的 `--ifm-*` 變數。

### TOC

看板的 `##` 標題會被替換成 HTML，不再產生 heading id。若這些欄位不該出現在目錄，請在 frontmatter 關閉 TOC：

```yaml
---
hide_table_of_contents: true
---
```

不要用 CSS `display: none` 隱藏 TOC；DOM 裡的連結還在，會變成 broken anchors。

### 連結解析

沒有提供 `pageResolver` / `hrefTemplate` 時，看板仍會渲染，卡片內的 wikilink 會顯示為純文字。這對「只是想把 Obsidian 看板貼上網站」的情境已經夠用；需要站內連結時再補解析器。

若解析失敗，外掛會 `console.warn` 並退回純文字，不會讓整張看板消失。

## Tasks

### 設定

```ts
// docusaurus.config.ts
import { rehypeObsidianTasks } from 'rehype-obsidian-tasks';

export default {
  presets: [
    [
      'classic',
      {
        docs: {
          rehypePlugins: [rehypeObsidianTasks],
        },
      },
    ],
  ],
};
```

若站台是多 docs 實例，要套用到**每一個** content plugin 實例；blog 或自訂 content plugin 也一樣。

### 支援的狀態

| 語法 | 意義 | 輸出 class |
| --- | --- | --- |
| `- [-]` | 取消 | `task-list-item--cancelled` |
| `- [/]` | 進行中 | `task-list-item--in-progress` |
| `- [ ]` | 未完成 | GFM 原生處理 |
| `- [x]` | 完成 | GFM 原生處理 |

外掛只處理 `[-]` 與 `[/]`，標準 GFM checkbox 不動。每個 task item 會得到：

```html
<li class="task-list-item task-list-item--cancelled" data-task="-">
  <input type="checkbox" disabled data-task="-" />
  Cancelled task
</li>
```

父層 `<ul>` / `<ol>` 會加上 `contains-task-list`；checkbox 也有對應的 `task-list-item-checkbox--cancelled` 或 `--in-progress` class。

### 樣式

```css
.task-list-item--cancelled {
  color: var(--ifm-color-emphasis-500);
  text-decoration: line-through;
}

.task-list-item--in-progress {
  color: var(--ifm-color-primary);
}

.task-list-item--in-progress .task-list-item-checkbox--in-progress {
  accent-color: var(--ifm-color-primary);
}
```

外掛不提供圖示或互動，只給 class、data attribute 與 checkbox；要什麼視覺效果由站台 CSS 決定。

### Loose list

外掛會處理 loose list：Markdown 如下時，項目會被 `<p>` 包住，且 `<li>` 前可能有空白 text node。

```markdown
- [-] Cancelled

- [/] In progress
```

外掛會先找到正確的文字容器、跳過空白節點，再辨識狀態，所以 tight list 與 loose list 都能運作。

## 兩個外掛一起用

```ts
import { rehypeObsidianTasks } from 'rehype-obsidian-tasks';
import { remarkKanban } from 'remark-obsidian-kanban';
import remarkWikiLink from 'remark-wiki-link';

const remarkPlugins = [
  [remarkWikiLink, wikiLinkOptions],
  [remarkKanban, kanbanOptions], // 放在 wiki-link 後面
];

const rehypePlugins = [rehypeObsidianTasks];
```

## 測試與範例

- `remark-obsidian-kanban`：5 個單元測試，涵蓋欄位/卡片、無 link resolver、wikilink、非看板文件、settings 區塊。
- `rehype-obsidian-tasks`：4 個單元測試，涵蓋兩種狀態、GFM 相容、loose list、一般清單。
- Playground 有 `docs/kanban.md` 與 `docs/tasks.md`，CI 會建置 fixture site 並跑 Playwright。

## 系列文章

- [[01 docusaurus-kit 專案總覽]]
- [[02 docusaurus-theme-pele 與 Mermaid 遷移]]
- [[04 GitHub Actions 與 npm 信任發佈]]
- [[05 開發測試與新增套件]]
- [[06 docusaurus-kit 版本與變更記錄]]
- [[Plugin Remark Obsidian Kanban]]：Kanban 外掛的詳細使用與實作筆記

## 參考

- [remark-obsidian-kanban README](https://github.com/kywk/docusaurus-kit/tree/main/packages/remark-obsidian-kanban)
- [rehype-obsidian-tasks README](https://github.com/kywk/docusaurus-kit/tree/main/packages/rehype-obsidian-tasks)
