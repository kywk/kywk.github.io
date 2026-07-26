---
title: Yazi
description: 以 Rust 打造的超高速終端檔案管理器，支援非同步 I/O 與完整檔案預覽
image: /img/placeholder.png
tags: [CLI, FileManager]
sidebar_position: 10
hide_table_of_contents: true
date_created: 2026-07-26
date_updated: 2026-07-26
slug: /utilities/cli/yazi/
---

# Yazi

## Overview

Yazi（意為「快」）是一款以 Rust 編寫的現代終端檔案管理器，採用非同步 I/O 架構，帶來極致的操作速度與流暢體驗。相較於傳統的 ranger、lf 等工具，Yazi 在效能、預覽能力和擴展性方面都有顯著的提升。

主要特色：

- **極速效能** — Rust 實作搭配 async I/O，檔案列表載入與操作幾乎無延遲
- **完整檔案預覽** — 支援圖片、程式碼語法高亮、壓縮檔、PDF 等多種格式
- **現代終端整合** — 原生支援 Ghostty、Kitty、iTerm2 等終端的圖片協議
- **高度可自訂** — TOML 配置檔，支援插件擴展
- **Vi 風格操作** — 熟悉的鍵位映射，學習成本低

## Install

### macOS (Homebrew)

```bash
brew install yazi ffmpegthumbnailer poppler fd ripgrep fzf zoxide imagemagick
```

### Linux

```bash
# Arch Linux
pacman -S yazi ffmpegthumbnailer poppler fd ripgrep fzf zoxide

# Ubuntu/Debian (via cargo)
cargo install --locked yazi-fm yazi-cli
```

### 驗證安裝

```bash
yazi --version
```

## Config

Yazi 的配置檔案位於 `~/.config/yazi/`，採用 TOML 格式：

```
~/.config/yazi/
├── yazi.toml      # 主要配置（功能開關、排序、預覽設定）
├── keymap.toml    # 鍵位映射
├── theme.toml     # 主題和顏色配置
└── init.lua       # Lua 初始化腳本（插件載入）
```

### yazi.toml 基本設定

```toml
[manager]
sort_by = "natural"
sort_dir_first = true
show_hidden = false
show_symlink = true

[preview]
max_width = 1000
max_height = 1000
image_filter = "triangle"

[opener]
edit = [
  { run = '${EDITOR} "$@"', block = true, for = "unix" },
]
```

## Keybindings

Yazi 採用 Vi 風格鍵位，常用操作：

| 按鍵 | 功能 |
|------|------|
| `h` / `l` | 上層目錄 / 進入目錄或開啟檔案 |
| `j` / `k` | 下移 / 上移 |
| `H` / `L` | 後退 / 前進（歷史記錄） |
| `<Space>` | 選取 / 取消選取 |
| `d` | 刪除（移至垃圾桶） |
| `D` | 永久刪除 |
| `r` | 重新命名 |
| `c` | 複製（yank） |
| `x` | 剪下 |
| `p` | 貼上 |
| `/` | 篩選（filter） |
| `s` | 搜尋（整合 fd/rg） |
| `z` | 跳轉（整合 zoxide） |
| `.` | 顯示 / 隱藏隱藏檔案 |
| `q` | 離開 |
| `~` | 回到家目錄 |
| `t` | 新增分頁（tab） |

## Shell Integration (cd on exit)

預設情況下，Yazi 在子 shell 中執行，離開後不會改變工作目錄。透過 wrapper function 可以實現「離開時切換到最後瀏覽的目錄」：

```bash
function y() {
  local tmp="$(mktemp -t "yazi-cwd.XXXXXX")" cwd
  yazi "$@" --cwd-file="$tmp"
  if cwd="$(command cat -- "$tmp")" && [ -n "$cwd" ] && [ "$cwd" != "$PWD" ]; then
    builtin cd -- "$cwd"
  fi
  rm -f -- "$tmp"
}
```

將此函式加入 `.zshrc` 或 `.bashrc`，之後使用 `y` 指令啟動 Yazi，離開時會自動 `cd` 到最後所在的目錄。

## Preview Features

Yazi 的預覽系統是其最大亮點之一，支援多種檔案格式的即時預覽：

| 類型 | 工具依賴 | 說明 |
|------|----------|------|
| 圖片 | 終端原生支援 | Ghostty、Kitty、iTerm2 透過圖片協議直接顯示 |
| 程式碼 | `bat` | 語法高亮顯示，支援行號 |
| 影片 | `ffmpegthumbnailer` | 顯示影片縮圖 |
| PDF | `poppler` | 渲染 PDF 頁面預覽 |
| 壓縮檔 | 內建 | 列出壓縮檔內容 |
| 目錄 | 內建 | 顯示子目錄結構 |
| Markdown | `glow` (選用) | 渲染 Markdown |

### 整合現代 CLI 工具

Yazi 深度整合以下工具以提升搜尋與預覽體驗：

- **bat** — 程式碼預覽的語法高亮
- **fd** — 快速檔案搜尋（取代 find）
- **ripgrep** — 檔案內容搜尋（grep 替代）
- **fzf** — 模糊搜尋跳轉
- **zoxide** — 智能目錄跳轉

## Plugins

Yazi 支援 Lua 插件擴展功能：

```bash
# 安裝插件（使用 yazi-cli）
ya pack -a yazi-rs/plugins:full-border
ya pack -a yazi-rs/plugins:chmod
```

常用插件：

- **full-border** — 完整邊框 UI
- **chmod** — 直接修改檔案權限
- **git** — 顯示 Git 狀態標記
- **starship** — 整合 Starship prompt 顯示路徑資訊

插件配置在 `init.lua` 中載入：

```lua
-- ~/.config/yazi/init.lua
require("full-border"):setup()
require("git"):setup()
```

## Comparison

| 特性 | Yazi | ranger | lf | nnn |
|------|------|--------|----|----|
| 語言 | Rust | Python | Go | C |
| 速度 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 圖片預覽 | 原生支援 | 需額外配置 | 有限支援 | 需插件 |
| 非同步 I/O | ✅ | ❌ | 部分 | ❌ |
| 插件系統 | Lua | Python | Shell | Shell |
| 配置格式 | TOML | ini-like | 自訂 | 環境變數 |
| 記憶體佔用 | 低 | 高 | 低 | 極低 |

### 比較摘要

- **vs ranger** — ranger 以 Python 編寫，功能豐富但啟動慢、大目錄卡頓。Yazi 提供相似的三欄式 UI，但速度快數倍。
- **vs lf** — lf 以 Go 編寫，概念相近（受 ranger 啟發），但 Yazi 的預覽系統更完善，圖片支援更原生。
- **vs nnn** — nnn 以 C 編寫，極度精簡快速，但功能較少、預覽能力有限，需要大量外部腳本補充。

## See Also

- [Yazi GitHub](https://github.com/sxyazi/yazi)
- [Yazi Documentation](https://yazi-rs.github.io/)
- [Yazi Plugins](https://github.com/yazi-rs/plugins)
- [Ghostty Terminal](https://ghostty.org/) — 支援圖片協議的現代終端
- [bat](/utilities/cli/bat/) — 語法高亮 cat 替代工具
- [fd](/utilities/cli/fd/) — 現代 find 替代工具
- [ripgrep](/utilities/cli/ripgrep/) — 現代 grep 替代工具
