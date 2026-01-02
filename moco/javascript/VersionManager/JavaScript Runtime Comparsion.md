---
title: JS Runtime
description: JavaScript Runtime Comparsion
tags:
  - Node.js
  - JavaScript
sidebar_position: 50
hide_table_of_contents: true
date_created: 2025-05-30T00:00:00.000Z
date_updated: 2025-05-30T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /javascript/versionmanager/javascript-runtime-comparsion/
---

# [JavaScript] Runtime Comparsion

> 在 Node.js 生態圈, 有些開發者意識到 Node.js 架構的原生限制, 而發起其他 JavaScript Runtime 專案.
> 目前不同 Runtime 雖不屬於 Node.js Version Manager 範疇內,
> 也許多年後版本管理器也需要管理不同 Runtime, 如同 NVM 把 [io.js](https://iojs.org/api/documentation.html) 納入管理一般.

Node.js、Bun、Deno 是現代 JavaScript/TypeScript 執行環境的三大代表，雖然目的類似（在瀏覽器外執行 JavaScript），但在設計哲學、效能、模組系統、安全性等方面有顯著差異。以下是深入的比較與分析：

---

## 🧠 簡介對照

| 項目         | **Node.js**              | **Bun**                            | **Deno**                        |
| ------------ | ------------------------ | ---------------------------------- | ------------------------------- |
| 作者/團隊    | Ryan Dahl（原作者）等    | Jarred Sumner                      | Ryan Dahl（Node.js 原創者）     |
| 語言實作     | C++ + JavaScript (V8)    | Zig + JavaScriptCore (Safari 用)   | Rust + V8                       |
| 初次發表     | 2009                     | 2022                               | 2020                            |
| 執行核心     | V8 引擎                  | WebKit 的 JavaScriptCore           | Google V8 引擎                  |
| 模組支援     | CommonJS / ESM           | CommonJS / ESM / ts / jsx          | 原生 ES 模組、TS 支援           |
| TypeScript   | 需額外編譯工具（如 tsc） | 原生支援                           | 原生支援                        |
| npm 相容     | ✅（官方）               | ✅（完全支援，極速安裝）           | 部分支援（透過 3rd-party 工具） |
| 套件管理     | npm/yarn/pnpm            | 內建 `bun install`                 | 使用 URL import，或 `nest.land` |
| 效能         | 穩定                     | 🚀 超快（JSCore + native bundler） | 快速但略遜於 Bun                |
| 生態系       | 最大                     | 快速成長中                         | 穩定但較小                      |
| 安全模型     | 無內建沙箱               | 無沙箱                             | ✅ 預設安全限制（需開權限）     |
| 檔案權限控制 | ❌                       | ❌                                 | ✅ 如 `--allow-read`            |
| 開發工具鏈   | 外掛為主（Webpack 等）   | 內建 bundler, transpiler, test     | 內建 formatter, test, linter    |
| 應用場景     | Server, CLI, Desktop App | Web server, toolchain, SSR         | Scripting, Web server, 安全腳本 |

---

## 🚀 執行效能簡析

| 測試項目         | Node.js | Bun       | Deno |
| ---------------- | ------- | --------- | ---- |
| TS 編譯速度      | 慢      | ⚡ 快     | 中等 |
| npm install 速度 | 中等    | ⚡ 非常快 | 慢   |
| 启动时间         | 普通    | 快        | 慢   |
| HTTP Server QPS  | 中等    | ⚡ 高     | 普通 |

👉 _Bun 因使用 JavaScriptCore 並整合 native bundler/transpiler，在多數效能測試中領先。_

---

## 🔍 詳細比較重點

### 1. **模組系統**

- **Node.js**：支援 CommonJS 和 ESM，但歷史包袱重（如 `require()`）。
- **Bun**：完美相容 CommonJS / ESM，並支援 TypeScript/JSX/TSX 原生執行。
- **Deno**：嚴格 ES 模組架構，以 URL 為模組路徑，無 node_modules，學習曲線稍高。

---

### 2. **安全性**

- **Node.js/Bun**：預設無任何限制，任何腳本都可訪問檔案系統、網路等資源。
- **Deno**：預設封鎖所有權限，需顯式指定（如 `--allow-net --allow-read`），設計上更安全。

---

### 3. **生態與相容性**

- **Node.js**：生態最大，所有主流套件都支援。
- **Bun**：與 npm 完整相容，但仍有個別套件相容性問題。
- **Deno**：透過 `deno_std`、`deno.land/x` 或 `npm:` 模組支援，但與 Node 生態有斷層。

---

### 4. **開發體驗**

| 工具功能     | Node.js          | Bun                | Deno                |
| ------------ | ---------------- | ------------------ | ------------------- |
| 需要 bundler | ✅（Webpack 等） | ❌ 內建            | ❌ 內建             |
| 需要 linter  | ✅（ESLint）     | ❌ 內建            | ❌ 內建             |
| 需要測試框架 | ✅（Jest）       | ❌ 內建 `bun test` | ❌ 內建 `deno test` |

---

## 🧠 選擇建議

| 需求 / 偏好           | 推薦使用                    |
| --------------------- | --------------------------- |
| 最穩定/主流生態       | **Node.js**                 |
| 效能 + 開發整合       | **Bun**                     |
| 安全性 / 乾淨環境     | **Deno**                    |
| TypeScript 原生支援   | **Bun / Deno**（勝於 Node） |
| 自建 CLI 工具或腳本   | **Deno**                    |
| 快速 SSR / 全能工具鏈 | **Bun**                     |

---

## 📦 總結比較表（TL;DR）

| 特性            | Node.js      | Bun            | Deno                     |
| --------------- | ------------ | -------------- | ------------------------ |
| 發布年份        | 2009         | 2022           | 2020                     |
| 語言            | C++ / JS     | Zig            | Rust                     |
| JS 引擎         | V8           | JavaScriptCore | V8                       |
| TypeScript 支援 | 外掛         | ✅ 原生        | ✅ 原生                  |
| 套件管理        | npm          | bun            | URL import / npm（可選） |
| 模組系統        | CommonJS/ESM | CommonJS/ESM   | 原生 ESM                 |
| 安全沙箱        | ❌           | ❌             | ✅                       |
| 內建工具鏈      | ❌           | ✅             | ✅                       |
| 效能            | 穩定         | ⚡ 非常快      | 快                       |
| 生態穩定度      | ⭐⭐⭐⭐⭐   | ⭐⭐⭐         | ⭐⭐                     |

_assisted by ChatGPT_
