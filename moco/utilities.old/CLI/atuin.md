---
title: Atuin
description: 現代化 Shell 歷史記錄管理工具，以 SQLite 為後端提供全文模糊搜尋 TUI
image: /img/placeholder.png
tags: [CLI, Shell, History]
sidebar_position: 10
hide_table_of_contents: true
date_created: 2026-07-26
date_updated: 2026-07-26
---

# Atuin

## Overview

Atuin 是一款以 Rust 編寫的現代化 Shell 歷史記錄管理工具，取代傳統的 `Ctrl+R` 反向搜尋，
提供基於 SQLite 的全文模糊搜尋 TUI 介面。

核心優勢：

- **無限歷史記錄** — 使用 SQLite 儲存，不受 `HISTSIZE` 限制
- **豐富元資料** — 記錄每條指令的執行時間、退出碼、執行目錄、Session 等
- **全文模糊搜尋** — 支援 fuzzy、prefix、fulltext 多種搜尋模式
- **加密同步** — 可選的端對端加密歷史同步，支援自架伺服器
- **安全過濾** — 自動過濾含密碼、Token 的敏感指令

## Install

```bash
# macOS (Homebrew)
brew install atuin

# Linux (install script)
curl --proto '=https' --tlsv1.2 -LsSf https://setup.atuin.sh | sh

# Cargo
cargo install atuin
```

## Config

配置檔案位於 `~/.config/atuin/config.toml`：

```toml
## 搜尋模式: fuzzy | prefix | fulltext
search_mode = "fuzzy"

## 篩選範圍: host | session | global | directory
filter_mode = "host"

## 自動過濾含有密碼/token 的指令
secrets_filter = true

## TUI 樣式
style = "compact"

## 每頁顯示筆數
show_preview = true

## 歷史記錄存放位置
db_path = "~/.local/share/atuin/history.db"
```

### filter_mode 說明

| 模式 | 說明 |
|------|------|
| `host` | 僅顯示當前主機的歷史記錄（預設） |
| `session` | 僅顯示當前 session 的記錄 |
| `global` | 顯示所有同步裝置的記錄 |
| `directory` | 僅顯示在當前目錄執行過的指令 |

## Basic Usage

```bash
# 互動式搜尋 (取代 Ctrl+R)
atuin search -i

# 搜尋特定指令
atuin search "docker"

# 顯示歷史統計
atuin stats

# 匯入既有 shell 歷史
atuin import auto

# 列出最近執行的指令
atuin history list --cmd-only
```

在 TUI 搜尋介面中：

- 輸入關鍵字即時模糊搜尋
- `↑` / `↓` 瀏覽結果
- `Enter` 執行選中指令
- `Tab` 將指令填入命令列（不立即執行）
- `Ctrl+R` 切換 filter_mode

## Integration with Zsh / fzf

### Dotfiles 整合

在 `kywk.zshrc` 中加入初始化：

```bash
# Atuin: 現代化 shell history 搜尋
# --disable-up-arrow: 保留 ↑↓ 給 history-substring-search 使用
if command -v atuin &> /dev/null; then
  eval "$(atuin init zsh --disable-up-arrow)"
fi
```

**`--disable-up-arrow` 的設計考量：**

- Atuin 預設會接管 `↑` 鍵，但這會與 `zsh-history-substring-search` 衝突
- 使用 `--disable-up-arrow` 保留原生的 prefix search 行為
- `Ctrl+R` 由 Atuin TUI 接管，提供全文模糊搜尋
- `↑` / `↓` 維持 substring 前綴搜尋，兩者互補

### 與 fzf 的共存

Atuin 接管 `Ctrl+R` 後，fzf 的歷史搜尋功能自動讓位。
其他 fzf 功能（`Ctrl+T` 檔案搜尋、`Alt+C` 目錄跳轉）不受影響。

## Fallback Mechanism

防呆設計 — 當 Atuin 未安裝時，自動回退到原生方案：

```bash
if command -v atuin &> /dev/null; then
  # Atuin 可用：使用 Atuin TUI 搜尋
  eval "$(atuin init zsh --disable-up-arrow)"
else
  # Fallback：使用原生 zsh history + fzf Ctrl+R
  # fzf 的 key-bindings.zsh 會自動綁定 Ctrl+R
  bindkey '^R' history-incremental-search-backward
fi
```

這確保在任何環境中都有可用的歷史搜尋功能。

## Advanced Features

### 加密同步

Atuin 支援端對端加密的歷史記錄同步：

```bash
# 註冊帳號（使用官方伺服器）
atuin register -u <username> -e <email>

# 登入
atuin login -u <username>

# 手動同步
atuin sync

# 自架伺服器（Docker）
docker run -d --name atuin-server \
  -p 8888:8888 \
  ghcr.io/atuinsh/atuin:latest server start
```

同步為可選功能，不啟用時所有資料僅保存在本機 SQLite。

### 歷史統計

```bash
# 總覽統計
atuin stats

# 輸出範例：
# [▮▮▮▮▮▮▮▮▮▮] 8126 total commands
# Top commands:
#   git      1mass (23%)
#   cd       mass (12%)
#   docker   mass (9%)
#   vim      mass (7%)
```

## Comparison

### Atuin vs 原生 Zsh History

| 比較項目 | 原生 Zsh History | Atuin |
|---------|-----------------|-------|
| 儲存方式 | 純文字 `~/.zsh_history` | SQLite 資料庫 |
| 容量限制 | 受 `HISTSIZE` 限制 | 無限制 |
| 搜尋方式 | 簡單前綴/子串 | fuzzy / prefix / fulltext |
| 元資料 | 僅時間戳 | 時間、時長、退出碼、目錄、主機 |
| 跨機同步 | 無 | 端對端加密同步 |
| 去重 | `HIST_IGNORE_DUPS` | 智能去重 + 保留上下文 |

### Atuin vs fzf Ctrl+R

| 比較項目 | fzf Ctrl+R | Atuin |
|---------|-----------|-------|
| 資料來源 | 讀取 `~/.zsh_history` | 獨立 SQLite |
| 搜尋品質 | fzf 模糊搜尋 | 同等模糊搜尋 + 多模式 |
| 元資料顯示 | 僅指令文字 | 時間、時長、退出碼、目錄 |
| 篩選功能 | 無 | 按 host/session/directory 篩選 |
| 統計分析 | 無 | `atuin stats` |
| 獨立性 | 依賴 shell history 檔案 | 獨立管理，不受 HISTSIZE 影響 |

## See Also

- [Atuin 官方文件](https://docs.atuin.sh/)
- [Atuin GitHub](https://github.com/atuinsh/atuin)
- [fzf](/moco/utilities/cli/fzf/) — 通用模糊搜尋工具
- [Zinit 插件管理](/utilities/cli/zinit/) — Zsh 插件管理器
- [zsh-history-substring-search](https://github.com/zsh-users/zsh-history-substring-search) — ↑↓ 前綴搜尋插件
