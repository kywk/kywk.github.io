---
title: Dotfiles Management
description: 跨平台 dotfiles 配置管理系統
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - CLI
  - DevEnv
  - kywk
sidebar_position: 5
date_created: 2024-05-24T00:00:00.000Z
date_updated: 2025-09-20T00:00:00.000Z
slug: /utilities/dotfiles-management/
---

# Dotfiles Management

跨平台 dotfiles 配置，支援 macOS 和 Linux，提供統一的開發環境管理。

## 快速開始

```bash
# 1. Clone 專案
git clone <repo-url> ~/.files

# 2. 執行初始化
cd ~/.files && ./init.sh

# 3. 安裝開發環境
./bin/setup-devenv.sh

# 4. 重啟 shell
source ~/.zshrc
```

## 核心特色

- 🌍 **跨平台支援** - 自動檢測 macOS/Linux 並載入對應配置
- 🔧 **智能環境管理** - 專案自動切換 Java/Node.js/Go 版本
- ⚡ **效能最佳化** - Zinit Turbo 模式，Shell 啟動速度提升 50%+
- 🛡️ **安全設計** - 敏感資料獨立管理，不進版控
- 📦 **模組化架構** - 功能分離，易於維護和擴展
- 🚀 **一鍵安裝** - 自動化安裝和配置 70+ 開發工具
- 🔒 **防污染設計** - 最小化 .zshrc，避免其他工具污染配置

## 專案結構

```
dotfiles/
├── bin/                    # 可執行工具腳本
├── config/                # 配置檔案
│   ├── versions.sh       # 軟體版本統一管理
│   └── secret.sh         # 敏感資料 (不進版控)
├── zsh/                   # Shell 配置
│   ├── zinit.zshrc      # Zinit 插件管理 (Turbo 模式最佳化)
│   ├── common.zshrc     # 通用 zsh 配置
│   └── kywk.zshrc       # 基礎 zsh 設定
├── mac/                   # macOS 專用配置
│   └── Brewfile         # 套件管理 (70+ 開發工具)
└── 核心配置檔案 (gitconfig, gitmessage, kywk.shrc)
```

## 同步機制

### Dropbox 同步

使用 Dropbox 同步配置檔案，搭配 Symbolic Link：

```bash
# 配置檔案位置
~/Dropbox/config/dotfiles/

# 自動建立 symbolic links
~/.zshrc -> ~/.files/zsh/kywk.zshrc
~/.gitconfig -> ~/.files/gitconfig
~/.tmux.conf -> ~/.files/tmux.conf
```

### 開源客戶端 Maestral

取代官方 Dropbox Desktop：

```bash
brew install maestral
```

## 版本管理

### 支援的開發環境

| 語言/工具 | 版本管理 | 預設版本 | 自動檢測檔案 |
|----------|----------|----------|-------------|
| Java | SDKMAN | 21.0.5-zulu | `pom.xml`, `build.gradle` |
| Node.js | Volta/NVM | 20 | `package.json`, `.nvmrc` |
| Go | 系統安裝 | 1.21.5 | `go.mod` |

### 版本配置統一管理

```bash
# config/versions.sh
export JAVA_VERSION="21.0.5-zulu"
export NODE_VERSION="20"
export GO_VERSION="1.21.5"
```

## 實用工具腳本

### 系統維護

```bash
./bin/setup-devenv.sh    # 一鍵安裝開發環境
./bin/health-check.sh    # 環境健康檢查
./bin/update.sh          # 更新所有工具
./bin/backup.sh          # 配置備份
```

### 開發輔助

```bash
./bin/gen-gitignore.sh   # 智能生成 .gitignore
./config/versions.sh     # 軟體版本統一管理
```

## Shell 環境

### Zinit + Powerlevel10k

- **Turbo 模式最佳化** - 啟動速度提升 50%+
- **最小化 .zshrc** - 避免其他工具污染配置
- **自動檢測專案** - 根據檔案類型切換版本

參考：[[Zinit]]

## 自訂配置

### 本機設定

```bash
# ~/.config/local.sh
export KYWK_HOME="/custom/path"
export CUSTOM_VAR="value"
```

### 敏感資料

```bash
# config/secret.sh (不進版控)
export API_KEY="your-key"
export DATABASE_URL="your-db-url"
```

## 故障排除

### 常用命令

```bash
# 重載配置
source ~/.zshrc

# 除錯模式
LOG_LEVEL=debug source bin/load-env.sh

# 重新初始化
./bin/backup.sh && ./init.sh
```

### 健康檢查

```bash
# 檢查環境狀態
./bin/health-check.sh

# 檢查版本管理
which java node go
java -version
node --version
go version
```

## See Also

### 相關工具

- [[Zinit]] - Zsh 插件管理器
- [[Mac DevEnv Setup]] - macOS 開發環境建構
- [[Mac Apps Setup]] - macOS 應用程式安裝

### 替代方案

- **chezmoi** - 另一個 dotfiles 管理工具
- **GNU Stow** - 符號連結管理工具
- **yadm** - Yet Another Dotfiles Manager
