---
title: Version Manager
description: Node.js Version Manager
tags:
  - Node.js
  - JavaScript
sidebar_position: 10
hide_table_of_contents: true
date_created: 2025-05-30T00:00:00.000Z
date_updated: 2025-05-30T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /javascript/versionmanager/javascript-node-version-manager/
---

# [Node.js] Version Manager

「Node 版本管理器」（Node.js version manager），用來**在你的系統中安裝、切換、管理多個 Node.js 版本**，以解決以下常見開發問題：

---

## 🧾 定義：什麼是「Node 版本管理器」？

**Node 版本管理器**是一種 CLI 工具，它的功能包含：

- 安裝任意版本的 Node.js（如 v14、v16、v18、v20）
- 切換目前使用的版本（`use` 或 `default`）
- 根據專案自動選擇正確版本（如 `.nvmrc`）
- 有時也包含 npm/yarn/pnpm 管理（如 `volta`）

---

## 📦 常見的 Node 版本管理器工具

| 名稱    | 說明                            | 是否建議初學者   |
| ------- | ------------------------------- | ---------------- |
| `nvm`   | 最老牌、穩定、社群最大          | ✅ 非常推薦      |
| `fnm`   | 快速、用 Rust 寫的 `nvm`        | ✅ 較快          |
| `volta` | 自動對應專案版本、也管 yarn/npm | ✅ 團隊開發佳    |
| `n`     | 最簡單的 global 管理器          | ❌ 功能太簡單    |
| `asdf`  | 多語言通用版本管理器            | ✅ 適合 polyglot |
| `nix`   | 宣告式版本管理與封裝            | 🧠 高階用戶      |

> See Also: [[JavaScript Nvm Volta Fnm Comparison]] / [[Volta]]

---

## 💡 為什麼需要版本管理器？

Node.js 的生態變化快速，不同版本間有不少不相容的地方。例如：

- `npm` 8 跟 `npm` 10 的 lockfile 不同
- `Node 14` 不支援某些 ES 模組語法
- 一個專案用 `Node 16`，另一個用 `Node 20`，你該怎麼開發？

用版本管理器可以讓你：

| 情境                                     | 解法                                 |
| ---------------------------------------- | ------------------------------------ |
| 專案 A 要用 Node 16，專案 B 要用 Node 20 | 每個專案夾都有自己版本，自動切換     |
| 想快速測試某 lib 在 Node 14 下會不會爆   | `nvm install 14` + `nvm use 14`      |
| 團隊需要統一 Node/NPM 版本               | 設定 `.nvmrc` / `package.json#volta` |

> [[JavaScript Why Version Manager]]

---

## 📂 範例：專案中加 `.nvmrc`

```bash
echo "18.18.2" > .nvmrc
```

之後任何開發者只要進入此資料夾，執行：

```bash
nvm use
```

或用 `volta` 會自動套用，**避免每人版本不同導致 Bug 難除。**

---

## ✅ 總結一句話

> **Node 版本管理器 = Node 世界裡的「虛擬環境切換器」**，就像 Python 的 `pyenv`、Ruby 的 `rbenv`，或 Docker，但針對 Node 生態設計。

_assisted by ChatGPT_
