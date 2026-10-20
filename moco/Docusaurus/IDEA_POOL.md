---
title: Docusaurus 開發想法池
description: Docusaurus 相關功能開發與改進的想法收集
tags:
  - Docusaurus
  - TODO
  - 想法池
sidebar_position: 99
draft: true
---

# Docusaurus 開發想法池

收集 Docusaurus 相關功能開發與改進的想法，作為未來開發的參考。

## 已完成功能

- [x] **docusaurus-kit monorepo** ✅ 2026-10-20
  - 將可重用外掛抽到獨立 pnpm monorepo，發佈 npm
  - [[01 docusaurus-kit 專案總覽]]

- [x] **remark-obsidian-kanban plugin** ✅ 2025-09-23（npm `0.2.1`，2026-10-21）
  - 支援 Obsidian Kanban 格式轉換
  - [[Plugin Remark Obsidian Kanban]]、[[03 Obsidian 外掛 Kanban 與 Tasks]]

- [x] **rehype-obsidian-tasks plugin** ✅ 2026-10-20（npm `0.2.1`）
  - 支援 `[-]`、`[/]` 任務狀態
  - [[03 Obsidian 外掛 Kanban 與 Tasks]]

- [x] **Mermaid 改用 Pele** ✅ 2026-10-20
  - 取代 `@docusaurus/theme-mermaid`
  - [[02 docusaurus-theme-pele 與 Mermaid 遷移]]

- [x] **GitHub Actions + npm trusted publishing** ✅ 2026-10-20
  - Changesets version PR、OIDC 發佈、provenance
  - [[04 GitHub Actions 與 npm 信任發佈]]

- [x] **support obsidian wikilink** ✅ 2024-05-15
  - 支援 `[[]]` 語法
  - [[Wikilink in Docusaurus]]

- [x] **support obsidian callouts** ✅ 2025-12-24
  - 支援 Obsidian 的 callout 語法

- [x] **地理地圖（StoryMap 與 Leaflet 相容）** ✅ 2026-09-30
  - 原本的 `docusaurus-plugin-leaflet` 已由 `remark-story-map` 接手
  - [[Plugin Remark Obsidian Leaflet]]、[[01 Geo Story Map 專案介紹]]

## 開發中功能

- [x] **fix link to markdown file** ✅ 2026-09-23
  - 修正 Markdown 檔案連結問題

- [ ] **support obsidian dataview queries**
  - 支援 Obsidian Dataview 查詢語法

- [ ] **ignore Obsidian tags**
  - 忽略 Obsidian 標籤語法

## 未來想法

### 文件管理
- **docx/xlsx/pptx/pdf viewer**
  - 支援各種文件格式的線上預覽

- **MD file generator**
  - 自動生成 Markdown 檔案的工具

### 相關文章
- [[Integrate Obsidian and Docusaurus]] - 文件站點整合
