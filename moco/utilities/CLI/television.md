---
title: television
description: Rust 打造的模糊搜尋工具，內建多種資料來源 (channels)
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags: [CLI, Search]
sidebar_position: 10
hide_table_of_contents: true
date_created: 2026-07-26
date_updated: 2026-07-26
---

# television

## Overview

[television](https://github.com/alexpasmantier/television) 是一款以 Rust 開發的通用模糊搜尋工具。
與傳統的 fzf 不同，television 內建了多種「頻道 (channels)」作為資料來源，
不需要透過 pipe 餵入資料就能直接進行搜尋。

主要特色：

- 🦀 Rust 開發，效能優異
- 📺 內建多種 channels（檔案、Git repos、環境變數等）
- 🎯 開箱即用，不需額外組合指令
- 🖥️ 內建預覽功能，支援語法高亮
- ⚡ 即時模糊搜尋，支援多種匹配演算法

## Install

```bash
# macOS (Homebrew)
brew install television

# Cargo
cargo install television

# Arch Linux
pacman -S television
```

## Basic Usage

```bash
# 啟動預設頻道 (files)
tv

# 指定頻道啟動
tv files
tv git-repos
tv git-branches
tv env
tv aliases
tv text

# 搜尋後輸出選取結果至 stdout
tv files | xargs code
```

基本操作：

- 輸入文字即開始模糊搜尋
- `Enter` 確認選取
- `Esc` / `Ctrl+C` 取消
- `Ctrl+N` / `Ctrl+P` 上下移動
- `Tab` 切換頻道

## Channels (資料來源)

television 的核心概念是 **channels**，每個 channel 是一個獨立的資料來源：

| Channel | 說明 | 指令 |
|---------|------|------|
| Files | 當前目錄下的檔案 | `tv files` |
| Git Repos | 系統中的 Git 倉庫 | `tv git-repos` |
| Git Branches | 當前 repo 的分支 | `tv git-branches` |
| Env | 環境變數 | `tv env` |
| Aliases | Shell aliases | `tv aliases` |
| Recent Dirs | 最近存取的目錄 | `tv recent-dirs` |
| Text (grep) | 檔案內容全文搜尋 | `tv text` |

也可以自訂 channel，從任意指令輸出建立資料來源。

## Configuration

設定檔位置：`~/.config/television/config.toml`

```toml
# 預設頻道
default_channel = "files"

# 快捷鍵設定
[keybindings]
quit = ["esc", "ctrl-c"]
select = ["enter"]
channel_next = ["tab"]
channel_prev = ["shift-tab"]

# UI 設定
[ui]
preview = true
preview_width = 50
```

## 與 fzf 的比較

| 特性 | fzf | television |
|------|-----|-----------|
| 定位 | 通用 filter (stdin → stdout) | 整合型模糊搜尋器 |
| 資料來源 | 需透過 pipe 提供 | 內建 channels |
| Shell 整合 | `Ctrl+R`, `Ctrl+T`, `Alt+C` | 有限 |
| 自訂性 | 極高（任意組合） | 中等（channel 為主） |
| 啟動速度 | 極快 | 快 |
| 適用場景 | Pipeline、Shell 整合 | 快速獨立搜尋 |

**建議使用方式：** 兩者可以共存。fzf 作為核心模糊引擎處理 pipe 和 shell 整合場景，
television 則用於需要快速獨立搜尋特定資料來源（如 git repos、環境變數）的情境。

```bash
# fzf: pipe 導向，靈活組合
cat ~/.zsh_history | fzf
find . -name "*.ts" | fzf --preview 'bat {}'

# television: 內建來源，開箱即用
tv git-repos    # 直接搜尋所有 git 倉庫
tv env          # 快速查找環境變數
```

## See Also

- [television GitHub](https://github.com/alexpasmantier/television)
- [fzf](./fzf.md) - 通用模糊搜尋引擎
- [ripgrep](./ripgrep.md) - 快速文字搜尋工具
