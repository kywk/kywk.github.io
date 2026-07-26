---
title: Zellij
description: 以 Rust 編寫的現代終端多工器，具備可探索式快捷鍵與模式化操作
image: /img/placeholder.png
tags: [CLI, Terminal, Multiplexer]
sidebar_position: 10
hide_table_of_contents: true
date_created: 2026-07-26
date_updated: 2026-07-26
slug: /utilities/cli/zellij/
---

# Zellij

## Overview

Zellij 是一款以 Rust 編寫的現代終端多工器 (terminal multiplexer)，設計目標是提供直覺且可探索的使用體驗。與傳統的 tmux 不同，Zellij 在畫面底部的狀態列會即時顯示目前模式下可用的快捷鍵，大幅降低學習門檻。

主要特色：

- **可探索式介面** — 狀態列即時提示當前可用操作，無需記憶大量快捷鍵
- **模式化操作** — 透過不同模式 (Normal, Pane, Tab, Resize 等) 組織功能
- **浮動面板 (Floating Panes)** — 支援浮動視窗，彈性管理工作空間
- **WebAssembly 插件系統** — 以 WASM 擴展功能，安全且跨平台
- **KDL 格式配置** — 使用現代化的 KDL 格式進行設定，語法清晰易讀
- **Layout 系統** — 預定義或自訂佈局，快速建立開發環境

## Install

```bash
# macOS (Homebrew)
brew install zellij

# Cargo (Rust)
cargo install --locked zellij

# Linux (各發行版)
# Arch Linux
pacman -S zellij

# 下載預編譯二進位檔
# https://github.com/zellij-org/zellij/releases
```

## Config

Zellij 使用 KDL (KDocument Language) 格式作為配置語言，配置檔位於：

```
~/.config/zellij/config.kdl
```

產生預設配置檔：

```bash
# 輸出預設配置到標準輸出
zellij setup --dump-config

# 直接寫入配置檔
mkdir -p ~/.config/zellij
zellij setup --dump-config > ~/.config/zellij/config.kdl
```

基本配置範例：

```kdl
// ~/.config/zellij/config.kdl

// 主題設定
theme "catppuccin-mocha"

// 預設模式
default_mode "normal"

// 簡化 UI（隱藏面板框架）
pane_frames false

// 啟動時的預設 layout
default_layout "compact"

// 滾動緩衝區大小
scroll_buffer_size 10000

// 複製到系統剪貼板
copy_on_select true
```

## Basic Usage

### 模式 (Modes)

Zellij 的核心設計是模式化操作，每種模式負責不同的功能群組：

| 模式 | 進入方式 | 用途 |
|------|---------|------|
| Normal | `Esc` / 預設 | 一般終端操作 |
| Pane | `Ctrl+p` | 面板管理（新增、關閉、移動焦點） |
| Tab | `Ctrl+t` | 分頁管理（新增、切換、重新命名） |
| Resize | `Ctrl+n` | 調整面板大小 |
| Move | `Ctrl+h` | 移動面板位置 |
| Search | `Ctrl+s` | 搜尋面板內容 |
| Session | `Ctrl+o` | Session 管理（分離、退出） |
| Locked | `Ctrl+g` | 鎖定模式，所有快捷鍵失效（避免衝突） |

### 常用操作

```bash
# 啟動 zellij
zellij

# 以指定 layout 啟動
zellij --layout dev

# 啟動並命名 session
zellij -s my-project
```

在 Normal 模式下的基本操作流程：

1. `Ctrl+p` 進入 Pane 模式 → `n` 新增面板、`d` 下方分割、`r` 右方分割
2. `Ctrl+t` 進入 Tab 模式 → `n` 新增分頁、`r` 重新命名
3. `Ctrl+n` 進入 Resize 模式 → 方向鍵調整大小
4. `Esc` 返回 Normal 模式

## Layouts

Zellij 支援以 `.kdl` 檔案定義佈局，放置於 `~/.config/zellij/layouts/`：

```kdl
// ~/.config/zellij/layouts/dev.kdl
layout {
    pane split_direction="vertical" {
        pane size="70%"        // 主編輯區
        pane split_direction="horizontal" {
            pane               // 終端
            pane command="btop" // 系統監控
        }
    }
    pane size=1 borderless=true {
        plugin location="compact-bar"
    }
}
```

使用內建佈局：

```bash
# 使用 compact layout（精簡狀態列）
zellij --layout compact

# 列出可用的 layout
ls ~/.config/zellij/layouts/
```

## Sessions

Zellij 的 session 管理讓你可以隨時中斷工作並在之後恢復：

```bash
# 列出所有 sessions
zellij list-sessions
zellij ls

# 附著到既有的 session
zellij attach my-project
zellij a my-project

# 刪除指定 session
zellij kill-session my-project

# 刪除所有 sessions
zellij kill-all-sessions

# 分離目前 session (在 zellij 內)
# Ctrl+o → d
```

## Keybindings

### 預設快捷鍵速查

| 快捷鍵 | 功能 |
|--------|------|
| `Ctrl+p` | 進入 Pane 模式 |
| `Ctrl+t` | 進入 Tab 模式 |
| `Ctrl+n` | 進入 Resize 模式 |
| `Ctrl+h` | 進入 Move 模式 |
| `Ctrl+s` | 進入 Search 模式 |
| `Ctrl+o` | 進入 Session 模式 |
| `Ctrl+g` | 進入 Locked 模式 |
| `Ctrl+q` | 退出 Zellij |

### 自訂快捷鍵

在 `config.kdl` 中可以覆寫或新增快捷鍵：

```kdl
keybinds {
    normal {
        bind "Alt h" { MoveFocusOrTab "Left"; }
        bind "Alt l" { MoveFocusOrTab "Right"; }
        bind "Alt j" { MoveFocus "Down"; }
        bind "Alt k" { MoveFocus "Up"; }
    }
    pane {
        bind "f" { ToggleFloatingPanes; SwitchToMode "Normal"; }
    }
}
```

## Plugins

Zellij 內建多個實用插件，並支援以 WebAssembly 開發自訂插件：

- **compact-bar** — 精簡狀態列（單行顯示分頁和狀態）
- **status-bar** — 完整狀態列（顯示模式提示和快捷鍵）
- **tab-bar** — 分頁列
- **session-manager** — Session 管理器（`Ctrl+o` → `w` 開啟）
- **filepicker** — 檔案選擇器

## Comparison with tmux

| 特性 | tmux | Zellij |
|------|------|--------|
| 語言 | C | Rust |
| 配置格式 | `.tmux.conf` (自有語法) | `config.kdl` (KDL) |
| 操作模式 | Prefix key (`Ctrl+b`) | 多模式切換 |
| 學習曲線 | 陡峭，需記憶大量快捷鍵 | 平緩，狀態列即時提示 |
| 浮動面板 | 有限支援 (popup) | 原生支援 |
| 插件系統 | 無 | WebAssembly 插件 |
| 遠端使用 | 廣泛，幾乎所有伺服器都有 | 需自行安裝 |
| 生態系統 | 成熟、豐富 (tpm, tmuxinator) | 發展中 |
| 穩定性 | 極高，經過數十年驗證 | 良好，持續改進中 |

### 使用策略

兩者可以共存，根據場景選擇：

- **tmux** — SSH 連線、遠端伺服器操作（幾乎所有環境都有）
- **Zellij** — 本地開發環境（現代 UX、更直覺的操作）

兩者的配置都可納入 dotfiles 統一管理。

## See Also

- [Zellij 官方網站](https://zellij.dev/)
- [Zellij GitHub](https://github.com/zellij-org/zellij)
- [KDL 語言規格](https://kdl.dev/)
- [Zellij Plugin 開發指南](https://zellij.dev/documentation/plugins)
- [tmux vs Zellij 比較](https://zellij.dev/about/)
