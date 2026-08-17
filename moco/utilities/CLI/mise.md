---
title: mise
description: The polyglot dev tool version manager. Faster, unified replacement for nvm, volta, pyenv, and more.
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - CLI
  - DevEnv
sidebar_position: 10
hide_table_of_contents: true
date_created: 2026-07-26
date_updated: 2026-07-26
---

# mise

> [mise](https://mise.jdx.dev/) (mise-en-place) 是用 Rust 撰寫的多語言開發工具版本管理器，統一取代 nvm、volta、pyenv、goenv 等各自獨立的版本管理工具。

mise 提供單一介面管理 Node.js、Go、Python 等多種語言的版本切換，啟動速度極快（<50ms），並支援專案級的 `mise.toml` 配置檔，讓團隊成員可以共享一致的開發環境。

---

## 安裝

### macOS

```bash
# Homebrew
brew install mise

# 或使用官方安裝腳本
curl https://mise.jdx.dev/install.sh | sh
```

### Linux

```bash
# apt (Ubuntu/Debian)
apt install -y gpg wget curl
wget -qO - https://mise.jdx.dev/gpg-key.pub | gpg --dearmor -o /etc/apt/keyrings/mise-archive-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/mise-archive-keyring.gpg] https://mise.jdx.dev/deb stable main" | tee /etc/apt/sources.list.d/mise.list
apt update && apt install -y mise

# 或使用安裝腳本
curl https://mise.jdx.dev/install.sh | sh
```

### Shell 啟動

安裝後需要在 shell 中啟動 mise：

```bash
# ~/.zshrc 中加入
eval "$(mise activate zsh)"

# 若使用 bash
eval "$(mise activate bash)"
```

> 💡 mise 的 shell 啟動時間 <50ms，遠比 `sdkman-init.sh` + `volta` + `nvm` 的組合快得多。

---

## 配置 (mise.toml)

mise 使用 `mise.toml`（或 `.mise.toml`）作為專案配置檔，放在專案根目錄即可：

```toml
[tools]
node = "20"          # 安裝 Node.js 20.x 最新版
go = "1.22"          # 安裝 Go 1.22.x 最新版
python = "3.12"      # 安裝 Python 3.12.x 最新版

[settings]
# 支援 .nvmrc, .node-version, .python-version 等既有版本檔案
idiomatic_version_file = true
```

### 全域配置

```bash
# 全域配置位於 ~/.config/mise/config.toml
mise use --global node@20
mise use --global go@1.22
mise use --global python@3.12
```

### idiomatic_version_file 支援

mise 可以自動讀取既有的版本檔案，無需遷移：

| 檔案 | 對應工具 |
|------|---------|
| `.nvmrc` | Node.js |
| `.node-version` | Node.js |
| `.python-version` | Python |
| `.go-version` | Go |
| `.ruby-version` | Ruby |

開啟 `idiomatic_version_file = true` 後，mise 會自動偵測這些檔案並切換版本，與原本使用 nvm/volta 的團隊成員完全相容。

---

## 基本使用

### 安裝和切換版本

```bash
# 安裝指定版本
mise install node@20.15.0
mise install go@1.22.5
mise install python@3.12.4

# 設定專案使用版本（寫入 mise.toml）
mise use node@20
mise use go@1.22

# 設定全域預設版本
mise use --global node@20

# 列出已安裝版本
mise ls

# 列出可安裝的版本
mise ls-remote node
```

### 常用指令

```bash
# 查看目前使用的版本
mise current

# 安裝 mise.toml 定義的所有工具
mise install

# 移除不需要的版本
mise uninstall node@18.0.0

# 升級工具到最新版
mise upgrade node

# 清理未使用的版本
mise prune
```

---

## mise vs 其他工具比較

### mise vs Volta

| 比較 | mise | Volta |
|------|------|-------|
| 支援語言 | Node, Go, Python, Ruby, Rust 等 20+ | 僅 Node.js (+ npm 全域工具) |
| 配置檔 | `mise.toml` | `package.json > volta` |
| 效能 | <50ms 啟動 | <50ms 啟動 |
| 適用場景 | 多語言專案 | 純 Node.js 專案 |

Volta 在純 Node.js 專案中仍是優秀選擇，但若需管理多種語言，mise 是更統一的方案。

### mise vs SDKMAN

| 比較 | mise | SDKMAN |
|------|------|--------|
| 主要語言 | Node, Go, Python 等 | Java 生態系 |
| JDK 供應商 | 有限 | 30+ (Zulu, Temurin, GraalVM...) |
| Gradle/Maven | ❌ | ✅ 原生支援 |
| 啟動速度 | <50ms | ~200-500ms |
| patch 版本精度 | 一般 | 精確 (如 `21.0.9-zulu`) |

**建議：Java 仍使用 SDKMAN**。SDKMAN 對 JDK vendor 選擇、patch 版本精度、以及 Maven/Gradle 工具鏈的支援是 mise 目前無法取代的。

### mise vs asdf

| 比較 | mise | asdf |
|------|------|------|
| 實作語言 | Rust | Bash |
| 效能 | 5-10x 更快 | 較慢 (shell script) |
| 相容性 | 相容 asdf 插件 | - |
| 配置檔 | `mise.toml` + `.tool-versions` | `.tool-versions` |

mise 是 asdf 的精神繼承者，以 Rust 重寫帶來巨大的效能提升，且完全相容 asdf 的插件生態系。

---

## 與 Dotfiles 整合

### 建議的工具分工

```
mise       → Node.js, Go, Python (統一管理)
SDKMAN     → Java (patch 版本精度 + JDK vendor 選擇)
rustup     → Rust (官方工具鏈管理器)
```

### 在 zshrc 中的啟動配置

```bash
# mise 啟動 (放在 zshrc 中)
if command -v mise &> /dev/null; then
  eval "$(mise activate zsh)"
fi
```

### 與 direnv 搭配

mise 可與 direnv 互補，mise 負責工具版本，direnv 負責環境變數：

```bash
# .envrc
export DATABASE_URL="postgres://localhost/myapp"

# mise.toml
[tools]
node = "20"
```

---

## 進階功能

### mise tasks

mise 支援定義專案任務，類似 Makefile 或 npm scripts：

```toml
# mise.toml
[tasks.build]
run = "npm run build"
description = "Build the project"

[tasks.test]
run = "npm test"
depends = ["build"]

[tasks.lint]
run = "eslint src/"
```

```bash
# 執行任務
mise run build
mise run test

# 列出可用任務
mise tasks
```

### 環境變數管理

```toml
# mise.toml
[env]
NODE_ENV = "development"
DATABASE_URL = "postgres://localhost/myapp"

[env.production]
NODE_ENV = "production"
```

### Trust 機制

mise 會在第一次讀取新的 `mise.toml` 時要求確認（安全機制）：

```bash
# 信任目前目錄的配置
mise trust

# 信任指定路徑
mise trust /path/to/project
```

---

## See Also

- [[direnv]] - 目錄級環境變數管理
- [[Awesome CLI]] - 現代化 CLI 工具集合
- [mise 官方文件](https://mise.jdx.dev/)
- [mise GitHub](https://github.com/jdx/mise)
- [從 asdf 遷移到 mise](https://mise.jdx.dev/dev-tools/comparison-to-asdf.html)
