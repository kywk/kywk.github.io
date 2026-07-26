---
title: Utilities Review & Modernization 2026
description: 2026 年度工具軟體現代化升級
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags: [Utilities, Review, Setup, kywk]
sidebar_position: 1
hide_table_of_contents: false
date_created: 2026-07-26
date_updated: 2026-07-26
slug: /utilities/utilities-2026/
---

# Utilities Review & Modernization 2026

## 概述

2026 年度的工具現代化重點在於**統一版本管理**與**終端體驗升級**。以 mise 取代分散的版本管理工具（volta/nvm），引入多款提升開發效率的現代 CLI 工具，並對既有配置進行全面優化。

## 🛠️ 版本管理遷移

本次最大變更是將版本管理統一至 mise：

| 語言/Runtime | 舊方案 | 新方案 | 說明 |
|-------------|--------|--------|------|
| Node.js | Volta / NVM | **mise** | 統一管理，支援 `.node-version` / `.tool-versions` |
| Go | 系統安裝 | **mise** | 版本切換更靈活 |
| Python | pyenv | **mise** | 減少依賴 |
| Java | SDKMAN | SDKMAN | 維持不變，生態成熟穩定 |
| Rust | rustup | rustup | 維持不變，官方方案最佳 |

mise 提供統一的 `.tool-versions` 和 `mise.toml` 配置，進入專案目錄自動切換版本，大幅簡化環境管理。

## ✨ 新增工具

| 工具 | 用途 | 說明文件 |
|------|------|---------|
| mise | 統一版本管理 | [[mise]] |
| atuin | Shell 歷史記錄同步與搜尋 | [[atuin]] |
| zellij | 終端多工器（tmux 備選） | [[zellij]] |
| yazi | 終端檔案管理器 | [[yazi]] |
| television | 模糊搜尋 TUI | [[television]] |
| uv | Python 套件管理（極速） | [[uv]] |
| oha | HTTP 負載測試工具 | [[oha]] |

## 🔧 配置優化

- **git-delta**：啟用為 git diff/log 預設 pager，提供語法高亮和 side-by-side 顯示
- **fzf**：設定 `FZF_DEFAULT_COMMAND` 使用 fd，`FZF_DEFAULT_OPTS` 統一主題色
- **bat**：配置主題（Catppuccin）、啟用 line numbers
- **ripgrep**：透過 `RIPGREP_CONFIG_PATH` 載入預設 ignore 規則
- **fd**：設定預設 exclude 目錄（node_modules, .git, dist）
- **atuin**：設定 `--disable-up-arrow`，避免覆蓋原生 up-arrow 行為，以 `Ctrl-R` 作為主要入口

## 📦 Brewfile 變更

### 移除

- `jsongrep` — 功能被 jq 完全覆蓋
- `volta` — 由 mise 取代

### 新增

- `mise` — 統一版本管理
- `uv` — 極速 Python 套件管理
- `zellij` — 現代終端多工器
- `atuin` — Shell 歷史記錄管理
- `yazi` — 終端檔案管理器
- `television` — 模糊搜尋 TUI
- `oha` — HTTP 負載測試

## 📝 決策記錄

| 決策 | 原因 |
|------|------|
| 保留 tmux | zellij 作為備選學習，tmux 生態和肌肉記憶成本高 |
| 同時保留 gitui + lazygit | 使用場景不同：gitui 輕量快速、lazygit 功能完整 |
| atuin `--disable-up-arrow` | 避免干擾既有操作習慣，用 `Ctrl-R` 觸發即可 |
| mise 不管理 Java/Rust | SDKMAN 和 rustup 為官方推薦且生態完整，無需替換 |

## 相關文件

- [[mise]] / [[atuin]] / [[yazi]] / [[zellij]] / [[television]] / [[uv]] / [[oha]]
- [[lazygit]] / [[Git Delta]]
- [[Dotfiles Management]] / [[Zinit]]
- [[Utilities 2024]]
