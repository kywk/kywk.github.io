---
title: docusaurus-kit 版本與變更記錄
description: docusaurus-kit 的套件版本與專案里程碑
tags:
  - Docusaurus
  - docusaurus-kit
  - Changelog
  - npm
sidebar_position: 60
sidebar_label: 版本與變更記錄
date_created: 2026-10-21T00:00:00.000Z
date_updated: 2026-10-21T00:00:00.000Z
---

# docusaurus-kit 版本與變更記錄

這篇只記錄 `docusaurus-kit` 套件與 repository 本身的版本和里程碑。

## 目前版本

| 套件 | npm `latest` | 說明 |
| --- | --- | --- |
| `docusaurus-theme-pele` | `0.1.1` | Pele Mermaid renderer |
| `remark-obsidian-kanban` | `0.3.0` | Obsidian Kanban → 靜態看板 |
| `rehype-obsidian-tasks` | `0.2.1` | `[-]` / `[/]` 任務狀態 |

## 版本紀錄

### docusaurus-theme-pele

| 版本 | 日期 | 變更 |
| --- | --- | --- |
| `0.1.0` | 2026-10-20 | 首發。Pele renderer、CSS 變數主題、`themeConfig.pele.zoom`、fixture/Playwright 測試 |
| `0.1.1` | 2026-10-20 | 補充 Docusaurus / React / Node.js / Pele 相容版本說明 |

### remark-obsidian-kanban

| 版本 | 日期 | 變更 |
| --- | --- | --- |
| `0.2.0` | 2026-10-20 | 首次以 npm 套件發佈。可選 `pageResolver` / `hrefTemplate`、狀態 class、settings 區塊移除、5 個單元測試 |
| `0.2.1` | 2026-10-20 | 補充相容版本說明 |
| `0.3.0` | 2026-10-21 | 卡片標題與內文的 `#tag` 轉成藥丸標籤（顏色由名稱雜湊決定），站台隨即切換為 npm 版本 |

### rehype-obsidian-tasks

| 版本 | 日期 | 變更 |
| --- | --- | --- |
| `0.2.0` | 2026-10-20 | 首次以 npm 套件發佈。`[-]` / `[/]`、GFM 相容、loose list 處理、4 個單元測試 |
| `0.2.1` | 2026-10-20 | 補充相容版本說明 |

> npm 首次發佈時可能出現短暫的 `0.0.0-stage` 版本，那是 staged publish 的佔位版本；在瀏覽器完成同意後會 promote 成正式版本。

## 專案里程碑

| 日期 | 變更 |
| --- | --- |
| 2026-10-20 | 建立 pnpm monorepo，新增 ADR 0001 |
| 2026-10-20 | CI：Node 20/22 matrix、Biome、typecheck、單元測試、fixture build、Playwright |
| 2026-10-20 | Release workflow：Changesets version PR、npm trusted publishing（OIDC）、provenance |
| 2026-10-20 | `docusaurus-theme-pele@0.1.0`、`remark-obsidian-kanban@0.2.0`、`rehype-obsidian-tasks@0.2.0` 首發 |
| 2026-10-20 | `docusaurus-theme-pele@0.1.1`、`remark-obsidian-kanban@0.2.1`、`rehype-obsidian-tasks@0.2.1` 發佈 |
| 2026-10-21 | 補齊套件 README 相容版本表，建立系列文章 |
| 2026-10-21 | 站台 kanban/tasks 切換為 npm 版本（kanban `0.3.0`、tasks `0.2.1`），移除站內 `plugins/` 複本 |

## 發佈方式

套件使用 Changesets 管理版本；push 到 `main` 後由 Release workflow 開 version PR，合併後以 OIDC 發佈。完整流程見 [[04 GitHub Actions 與 npm 信任發佈]]。

## 系列文章

- [[01 docusaurus-kit 專案總覽]]
- [[02 docusaurus-theme-pele 與 Mermaid 遷移]]
- [[03 Obsidian 外掛 Kanban 與 Tasks]]
- [[04 GitHub Actions 與 npm 信任發佈]]
- [[05 開發測試與新增套件]]

## 外部連結

- [docusaurus-kit repository](https://github.com/kywk/docusaurus-kit)
- [docusaurus-theme-pele](https://www.npmjs.com/package/docusaurus-theme-pele)
- [remark-obsidian-kanban](https://www.npmjs.com/package/remark-obsidian-kanban)
- [rehype-obsidian-tasks](https://www.npmjs.com/package/rehype-obsidian-tasks)
