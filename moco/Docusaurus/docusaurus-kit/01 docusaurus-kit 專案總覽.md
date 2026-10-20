---
title: docusaurus-kit 專案總覽
description: 將 kywk.me 的可重用 Docusaurus 外掛拆成獨立 pnpm monorepo，並透過 GitHub Actions 發佈到 npm
tags:
  - Docusaurus
  - docusaurus-kit
  - npm
  - Monorepo
  - Open Source
sidebar_position: 10
sidebar_label: 專案總覽
date_created: 2026-10-21T00:00:00.000Z
date_updated: 2026-10-21T00:00:00.000Z
---

# docusaurus-kit 專案總覽

`docusaurus-kit` 是把 kywk.me 站內可重用的 Docusaurus 外掛抽出來後成立的 pnpm monorepo。網站本身留在原本的 Obsidian vault repository，只當這些套件的消費者；套件的版本、CI 與 changelog 則獨立運作。

- GitHub：<https://github.com/kywk/docusaurus-kit>
- npm：`docusaurus-theme-pele`、`remark-obsidian-kanban`、`rehype-obsidian-tasks`
- 決策紀錄：[ADR 0001: Publish packages from a standalone monorepo](https://github.com/kywk/docusaurus-kit/blob/main/docs/adr/0001-packages-monorepo.md)

## 為什麼要拆成獨立專案

原本這些外掛都放在 kywk.me 的 `plugins/` 目錄。這樣做在只有一個站台時很方便，但這個 repository 同時是 Obsidian vault，帶著私人筆記、大量內容資產，而且每次內容 push 都會觸發部署。外掛和內容共用同一條 release 節奏，會產生幾個問題：

- **發佈耦合**：改一個外掛就要跟內容一起進版，無法單獨發 npm 版本。
- **外部協作困難**：別人想貢獻外掛，不需要也不應該拿到整個私人 vault。
- **建置風險**：外掛重構可能在下一次內容部署時直接弄壞網站，而不是等到刻意升級版本才生效。
- **憑證與體積**：npm 發佈權限不該放在 vault repository；workspace 工具與 build 產物也會讓 Dropbox 同步的 repo 更重。

拆開後，網站可以明確選擇「什麼時候」升級某個套件，套件也能有自己的測試、CI、版本與 changelog。

## 目前套件

| 套件 | 版本 | 用途 |
| --- | --- | --- |
| [`docusaurus-theme-pele`](https://www.npmjs.com/package/docusaurus-theme-pele) | `0.1.1` | 用 [Pele](https://pele.run) 取代 Mermaid 渲染 `mermaid` 圍欄區塊 |
| [`remark-obsidian-kanban`](https://www.npmjs.com/package/remark-obsidian-kanban) | `0.2.1` | 將 Obsidian Kanban 看板轉成靜態 HTML |
| [`rehype-obsidian-tasks`](https://www.npmjs.com/package/rehype-obsidian-tasks) | `0.2.1` | 將 Obsidian 的 `[-]`、`[/]` 任務狀態轉成 GFM task item |

三個套件都是 MIT，版本以 2026-10-21 的 npm `latest` 為準。

## 專案結構

```text
docusaurus-kit/
├── packages/
│   ├── theme-pele/                 # Docusaurus theme
│   ├── remark-obsidian-kanban/     # remark plugin
│   └── rehype-obsidian-tasks/      # rehype plugin
├── examples/playground/            # 最小 Docusaurus 測試站
├── docs/adr/                       # 架構決策
├── e2e/                            # Playwright
└── .github/workflows/
    ├── ci.yml
    └── release.yml
```

`examples/playground` 不是展示用的樣品站，而是 CI 的 fixture：三個套件都會掛進去，建置後用 Playwright 檢查圖表、看板與任務狀態是否真的出現在瀏覽器裡。

## 設計原則

1. 套件必須能在沒有 kywk.me 內容、路徑或設定的情況下使用。
2. 每個套件都要有 README、相容版本表與可執行的範例。
3. theme 套件不能只跑單元測試，必須經過 fixture site 的實際建置。
4. `peerDependencies` 保持寬鬆；精確的 Docusaurus 版本放在 `devDependencies`。
5. 不從網站 repository 發佈套件。

第 5 點很重要：網站是 consumer，不是 package source。即使站內還有 `plugins/` 目錄，也不代表那些程式應該從 vault 發佈。

## 快速安裝

三個套件可以分開使用，不需要一次全裝。以全部使用為例：

```bash
npm install docusaurus-theme-pele remark-obsidian-kanban rehype-obsidian-tasks
```

```ts
// docusaurus.config.ts
import { rehypeObsidianTasks } from 'rehype-obsidian-tasks';
import { remarkKanban } from 'remark-obsidian-kanban';

export default {
  markdown: {
    // Kanban 外掛會輸出 raw HTML，Docusaurus 需以 CommonMark 處理 .md
    format: 'detect',
    mermaid: true,
  },
  themes: ['docusaurus-theme-pele'],
  presets: [
    [
      'classic',
      {
        docs: {
          remarkPlugins: [remarkKanban],
          rehypePlugins: [rehypeObsidianTasks],
        },
      },
    ],
  ],
  themeConfig: {
    pele: {
      zoom: 'auto',
    },
  },
};
```

`remarkKanban` 的 `pageResolver` / `hrefTemplate` 是選用的；沒有提供時，看板仍會渲染，卡片內的 wikilink 會變成純文字。`rehypeObsidianTasks` 則要套用到每一個可能包含任務清單的 content plugin 實例。

## 站台與套件的邊界

目前移到 `docusaurus-kit` 的是「離開 kywk.me 也能獨立運作」的部分：

- Pele Mermaid theme
- Obsidian Kanban
- Obsidian task statuses

仍留在網站 repository 的是帶有站台政策或資料依賴的部分：

- `docusaurus-plugin-album`：相簿路由、Flickr 匯入與站台版型
- `remark-story-map`：掃描 vault 標記、站台路由解析
- `remark-slug-normalizer`：本站的 slug 規則

這些不是「不能開源」，而是目前 API 還綁著站台假設。等它們長出資料中立的介面，再考慮搬進 monorepo。

## 發佈方式

套件使用 Changesets 管理版本。push 到 `main` 後，Release workflow 會開一個 version PR；合併後由 GitHub Actions 以 npm trusted publishing（OIDC）發佈，不需要 `NPM_TOKEN`，也不需要每次人工 2FA。

完整流程、首次發佈與故障排除見 [[04 GitHub Actions 與 npm 信任發佈]]。

## 系列文章

| 文章 | 內容 |
| --- | --- |
| [[01 docusaurus-kit 專案總覽]] | 拆分原因、套件與專案結構 |
| [[02 docusaurus-theme-pele 與 Mermaid 遷移]] | Pele renderer、設定、主題與相容性 |
| [[03 Obsidian 外掛 Kanban 與 Tasks]] | 兩個 Obsidian 外掛的安裝與行為 |
| [[04 GitHub Actions 與 npm 信任發佈]] | Changesets、OIDC、CI/CD |
| [[05 開發測試與新增套件]] | 本地開發、測試策略與新增套件清單 |
| [[06 docusaurus-kit 版本與變更記錄]] | 版本、站台整合與歷史變更 |

## 目前狀態

- 三個套件都已發佈：`docusaurus-theme-pele@0.1.1`、`remark-obsidian-kanban@0.2.1`、`rehype-obsidian-tasks@0.2.1`。
- `0.2.1` 由 GitHub Actions 以 OIDC 發佈並附 provenance。
- kywk.me 已改用 npm 版的 `docusaurus-theme-pele`。
- Kanban 與 Tasks 目前仍由站內的本地版本載入；套件已可用，後續再切換，避免把「內容變更」與「套件升級」混在同一次部署。
- 下一個候選是 album 與 story map，但前提是先把它們的站台政策與資料依賴拆開。
