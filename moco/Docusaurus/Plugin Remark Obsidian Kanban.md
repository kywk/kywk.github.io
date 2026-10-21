---
title: remark-obsidian-kanban
description: 將 Obsidian Kanban 看板轉成 Docusaurus 靜態看板的 remark 外掛
cover: https://i.imgur.com/mErPwqL.png
tags:
  - Docusaurus
  - Obsidian
  - Plugin
  - Kanban
  - 看板
  - npm
sidebar_position: 70
sidebar_label: Kanban Plugin
date_created: 2025-09-23T00:00:00.000Z
date_updated: 2026-10-21T00:00:00.000Z
history:
  - 2026-10-21 更新為 npm 0.2.1 現況；歷史見 [[Docusaurus 版本與變更記錄]]
  - 2026-10-21 站台切換為 npm 版本（kanban `0.3.0`、tasks `0.2.1`），移除站內 `plugins/` 複本
---

# [Docusaurus] remark-obsidian-kanban Plugin

`remark-obsidian-kanban` 把 Obsidian Kanban 格式的 Markdown 看板轉成靜態 HTML，讓 Docusaurus 文章可以直接呈現欄位與卡片。套件由 [[01 docusaurus-kit 專案總覽|docusaurus-kit]] 維護，目前 npm 版本是 `0.3.0`。

- npm：<https://www.npmjs.com/package/remark-obsidian-kanban>
- 原始碼：<https://github.com/kywk/docusaurus-kit/tree/main/packages/remark-obsidian-kanban>
- 系列概觀：[[03 Obsidian 外掛 Kanban 與 Tasks]]

## 功能特色

- **自動識別**：frontmatter 有 `kanban-plugin: board` 才啟用。
- **欄位與卡片**：`##` 標題是欄位，清單項目是卡片；欄位標題顯示卡片數。
- **卡片內容**：第一段是標題，縮排的清單、段落、圖片與連結是內文。
- **狀態**：`[ ]`、`[x]`、`[-]`、`[/]` 會轉成對應 class 與 `data-task`，標題中的標記會移除。
- **標籤**：卡片標題與內文的 `#tag` 會轉成藥丸標籤，顏色由名稱雜湊決定，同一標籤永遠同色。
- **Wikilink**：可選 `pageResolver` / `hrefTemplate`；沒有提供時仍可渲染，連結會變成純文字。
- **Settings 區塊**：自動移除 Obsidian 的 `%% kanban:settings %%`。
- **主題**：使用 Docusaurus 的 `--ifm-*` CSS 變數，跟隨站台配色與明暗模式。
- **靜態**：沒有拖曳、排序或持久化；輸出就是一般 HTML。

## 安裝

```bash
npm install remark-obsidian-kanban
```

## Docusaurus 設定

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
                // 兩個都是選用
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

若同時使用 `remark-wiki-link`，順序要是：

```ts
remarkPlugins: [
  [remarkWikiLink, wikiLinkOptions],
  [remarkKanban, kanbanOptions], // 必須在 wiki-link 之後
],
```

因為 `remarkKanban` 需要看到 `remark-wiki-link` 產生的 `wikiLink` 節點，才能把卡片內的連結轉成 `<a>`。

### 為什麼要 `markdown.format: 'detect'`

外掛不是把看板轉成一個 React 元件，而是產生 raw HTML 節點。Docusaurus 預設把 `.md` 當 MDX 處理，MDX 不接受 raw HTML，會把輸出吃掉或直接報錯。`format: 'detect'` 讓 `.md` 走 CommonMark、`.mdx` 走 MDX，是這個外掛的必要設定。

## 看板格式

````markdown
---
kanban-plugin: board
title: 專案看板
hide_table_of_contents: true
---

## To Do

- [ ] 撰寫文件
  - 補充安裝範例

## In Progress

- [/] 遷移舊看板

## Done

- [x] 建立 plugin
- [-] 取消的任務
````

## 卡片語法

### 標題與內容

```markdown
- [ ] 卡片標題
  - 第一行內容
  - 第二行內容
  - ![圖片](https://example.com/image.jpg)
```

第一段是卡片標題；縮排的內容會放在卡片內文。支援：

- 粗體、斜體
- Markdown 連結
- 圖片
- Wikilink（需提供 resolver）

### 狀態

| 標記 | 意義 | 卡片 class |
| --- | --- | --- |
| `[ ]` | 未完成 | `kanban-card--open` |
| `[x]` / `[X]` | 完成 | `kanban-card--done` |
| `[-]` | 取消 | `kanban-card--cancelled` |
| `[/]` | 進行中 | `kanban-card--in-progress` |

卡片也會有 `data-task` 屬性，值為對應的符號。這些 class 只負責語意，實際顏色由站台 CSS 決定；外掛內建一組基礎樣式，取消的卡片標題會加刪除線。

### 欄位

只有 `##`（level-2 heading）會變成欄位。`#` 或 `###` 不會。每個欄位固定 300px 寬，看板可水平滾動。

## TOC

看板的 `##` 標題會被替換成 HTML，不再產生 heading id。若這些欄位不該出現在目錄：

```yaml
---
hide_table_of_contents: true
---
```

不要用 CSS 隱藏 TOC。DOM 裡的連結還在，會變成 broken anchors；請用 frontmatter 關閉。

## 輸出

外掛會把看板的 heading 與 list 節點換成一個 HTML 節點，結構大致是：

```html
<div class="kanban-board-container">
  <div style="display: flex; gap: 1rem; overflow-x: auto; ...">
    <div style="flex: 0 0 300px; ...">
      <h3>To Do <span>2</span></h3>
      <div class="kanban-card kanban-card--open" data-task=" ">
        <div class="kanban-card-title">撰寫文件</div>
        ...
      </div>
    </div>
  </div>
</div>
```

外掛會附上一段基礎 `<style>`，主要處理：

- `.kanban-board-container` 的背景與 padding
- 圖片最大寬度
- 卡片標題顏色
- 取消/進行中卡片的視覺

要客製化時，覆寫 `.kanban-board-container`、`.kanban-card` 或狀態 class 即可。

## 技術實作

- 使用 `unist-util-visit` 遍歷 AST。
- 先掃描 YAML，確認 `kanban-plugin: board`；不是看板就直接 return，不做多餘處理。
- 逐一走訪 top-level 節點，收集 `##` 欄位與其後的 list。
- 每個 list item 的第一個 paragraph 當標題；其餘節點當內容。
- 移除 `kanban:settings`、`%% kanban %%` 與相關 code fence。
- 最後用一個 `html` 節點取代原本的 heading/list，並把其他非看板內容保留。

套件只依賴 `unist-util-visit`；`remark-frontmatter`、`remark-gfm`、`remark-wiki-link` 等是測試用的 dev dependency，不會強加給使用者。

## 站台狀態

kywk.me 已改用 npm 版本（`remark-obsidian-kanban@0.3.0`），`docusaurus.config.ts` 直接 `require('remark-obsidian-kanban')`，站內 `plugins/` 複本已移除。版本與舊版遷移紀錄見 [[Docusaurus 版本與變更記錄]]。

## 限制

- 看板是靜態的，沒有拖曳、排序、新增卡片或持久化。
- 只支援 `##` 欄位。
- 卡片標題只取第一個 paragraph；複雜的 nested block 可能只保留部分內容。
- Wikilink 需要自行提供 resolver；沒有 resolver 時不會自動推測站台路由。
- 圖片錯誤不會由外掛處理，瀏覽器會顯示破圖。

## 測試

- 6 個單元測試：欄位/卡片、無 resolver、wikilink、非看板文件、settings 區塊、`#tag` 藥丸標籤。
- Playground：`examples/playground/docs/kanban.md`。
- CI 會建置 fixture site 並跑 Playwright。

## 相關文章

- [[03 Obsidian 外掛 Kanban 與 Tasks]]：兩個 Obsidian 外掛的套件版說明
- [[01 docusaurus-kit 專案總覽]]
- [[Docusaurus Plugins]]：其他外掛
- [[Integrate Obsidian and Docusaurus]]：Obsidian 整合指南
- [[Wikilink in Docusaurus]]：Wikilink 支援說明
- [[Plugin Remark Obsidian Leaflet]]：Leaflet 地圖外掛（已停用，改用 [[01 Geo Story Map 專案介紹|Geo Story Map]]）
