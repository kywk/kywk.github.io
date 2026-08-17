---
title: Others
description: Other Version Manager
tags:
  - Node.js
  - JavaScript
sidebar_position: 40
hide_table_of_contents: true
date_created: 2025-05-30T00:00:00.000Z
date_updated: 2025-05-30T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[Node.js] Other Version Manager
===============================

> 那麼, 除了 [[JavaScript Nvm Volta Fnm Comparison]] 之外, 還有哪些工具呢?

是的，除了 `nvm`、`volta` 和 `fnm` 之外，還有一些其他 **Node.js 版本/環境管理工具**，雖然相對不那麼主流，但在特定情境或平台上也有其使用者和特色。以下是完整整理：

---

## 🌟 主流工具總覽（含次主流）

| 名稱                     | 主要語言           | 速度/效能 | 平台支援        | 特點與優勢                          |
| ---------------------- | -------------- | ----- | ----------- | ------------------------------ |
| **nvm**                | Bash           | 慢     | macOS/Linux | 最老牌、最穩定，社群龐大，但不支援 Windows      |
| **nvm-windows**        | C++/PowerShell | 中     | Windows     | 非官方 NVM Windows 版，使用簡單         |
| **fnm**                | Rust           | 快速    | 全平台         | 快速執行、多 shell 支援、與 nvm 相容       |
| **volta**              | Rust           | 快速    | 全平台         | 版本自動切換、支援全域工具、可 pin 專案版本       |
| **asdf** + node plugin | OCaml + Shell  | 中     | 全平台         | 多語言管理器，可管理 Node、Python、Ruby 同時 |

---

## 🔍 其他可用工具與選項

### 1. **n (node binary manager)**

* 📌 [官方 GitHub](https://github.com/tj/n)
* CLI 工具，用於安裝與切換 Node 版本
* 安裝簡單，可透過 `npm install -g n` 安裝
* 支援快速升級與切換
* 缺點：只能管理 node，缺乏 per-project 的版本 pin 功能

```bash
npm install -g n
n latest
n lts
n 18.16.0
```

---

### 2. **nvs (Node Version Switcher)**

* 📌 [GitHub](https://github.com/jasongin/nvs)
* 支援 Windows/macOS/Linux
* 支援 **多 shell**, **多平台架構**（x86 / x64 / ARM）
* 支援 `package.json` 中設定版本、自動切換
* 複雜度稍高，但功能強大
* 較受進階使用者與跨平台開發者歡迎

---

### 3. **asdf-nodejs plugin**

* [asdf](https://asdf-vm.com/) 是一個支援多種語言（Node.js, Python, Ruby, Elixir 等）的版本管理器
* 適合 polyglot 工程師
* 對 Node.js 支援穩定，但略繁瑣

```bash
asdf plugin add nodejs
asdf install nodejs 18.16.0
asdf global nodejs 18.16.0
```

---

### 4. **Corepack (Node.js 內建工具包管理器)**

* 隨 Node.js 16.9+ 一起提供（非版本管理器，但與 Volta 類似概念）
* 管理 `npm`, `yarn`, `pnpm` 的版本
* 結合 `packageManager` 欄位，可實現穩定可重現的工具鏈

```json
{
  "packageManager": "pnpm@8.7.5"
}
```

---

## 🧠 哪個工具適合你？

| 需求              | 推薦工具                  |
| --------------- | --------------------- |
| 最廣泛支援、社群最多      | `nvm`                 |
| Windows 使用者     | `nvm-windows` / `nvs` |
| 速度快，安裝快速        | `fnm` / `volta`       |
| 需要自動切換 + 專案釘選版本 | `volta`               |
| 想統一管理多種語言版本     | `asdf`                |
| 只想快速切換 node 版本  | `n`                   |

_assisted by ChatGPT_
