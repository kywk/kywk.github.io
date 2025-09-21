---
title: "Setup: 開發環境建構"
description: macOS develop tools of Moo Cow
image: https://lh3.googleusercontent.com/pw/ACtC-3cYYtkzJjo_oG7Gzqq8T8XQm4V_qLE3wGWVKOahp6YT4lo-on60NJmjrkkatnizX1b-uID-MCM2ztsXH9z27cMRtql3PA5cpYZYbMfSPuM5Yh3MmqnjnnXYkTg6vtIiBL5SGAQRRAI9zEBIOoyP3tZpuA?authuser=0
tags:
  - Mac
  - DevEnv
  - kywk
sidebar_position: 1
date_created: 2022-08-13
date_updated: 2025-09-20
---

# [Mac] 開發環境建構 2025.Jun

使用 dotfiles 專案的自動化腳本，一鍵安裝和配置所有開發環境。

## 快速安裝

```bash
# 1. Clone dotfiles 專案
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

<!-- more -->

## 終端環境

### 終端模擬器

**Ghostty** (推薦) - 新一代 GPU 加速終端：

```shell
brew install ghostty
```

**其他選擇**：

```shell
brew install iterm2 kitty
```

### Shell 環境

**Zinit + Powerlevel10k** (Turbo 模式最佳化)

自動安裝和配置，無需手動設定：

```bash
# 自動建立 symbolic link
# ~/.zshrc -> ~/.files/zsh/kywk.zshrc
```

**特色**：
- 最小化 .zshrc，避免其他工具污染配置
- Turbo 模式加載，啟動速度提升 50%+
- 自動檢測專案類型並切換版本

### 程式設計字體

支援 Ligatures 的現代化字體：

```shell
brew install font-jetbrains-mono font-fira-code font-cascadia-code
```

## 容器化環境

### Docker Runtime

**OrbStack** (推薦) - 輕量級、高效能：

```shell
brew install orbstack
```

**其他選擇**：

```shell
brew install docker          # Docker CLI
brew install docker-desktop  # Docker Desktop
```

## 現代 CLI 工具

### 系統監控和檔案管理

取代傳統 Unix 工具的現代化替代品：

```shell
# 系統監控
brew install btop            # 取代 htop

# 檔案管理
brew install eza             # 取代 ls
brew install bat             # 取代 cat
brew install ripgrep         # 取代 grep
brew install fd              # 取代 find
brew install zoxide          # 取代 cd
```

### Git 工具

```shell
brew install git tig gitui git-delta
```

### 其他實用工具

```shell
brew install fzf direnv jq tldr tmux
```

## 程式語言環境

### 版本管理系統

**自動檢測和切換版本**：

| 語言/工具 | 版本管理 | 預設版本 | 自動檢測檔案 |
|----------|----------|----------|-------------|
| Java | SDKMAN | 21.0.5-zulu | `pom.xml`, `build.gradle` |
| Node.js | Volta/NVM | 20 | `package.json`, `.nvmrc` |
| Go | 系統安裝 | 1.21.5 | `go.mod` |

### Java

**SDKMAN** - Java 版本管理：

```bash
# 自動安裝和配置
curl -s "https://get.sdkman.io" | bash
sdk install java 21.0.5-zulu
```

### Node.js

**Volta** (推薦) - 快速、可靠的 JavaScript 工具管理：

```bash
curl https://get.volta.sh | bash
volta install node@20
```

### Go

```shell
brew install go
```

**跨平台編譯別名**：

```bash
# 已在 dotfiles 中配置
alias go-linux="GOOS=linux GOARCH=amd64 go build"
alias go-windows="GOOS=windows GOARCH=amd64 go build"
```

## IDE 和 GUI 工具

### 編輯器

**VS Code** - 主力開發環境：

```shell
brew install visual-studio-code
```

**Zed** - 高效能編輯器：

```shell
brew install zed
```

**Sublime Text** - 快速文字編輯：

```shell
brew install sublime-text
```

### JetBrains IDE

```shell
brew install intellij-idea goland webstorm
```

### 開發工具

**Git 客戶端**：

```shell
brew install fork              # Git GUI
brew install sourcetree        # Atlassian Git GUI
```

**API 開發**：

```shell
brew install bruno             # API 測試工具
brew install insomnia          # REST 客戶端
```

**資料庫管理**：

```shell
brew install tableplus                        # 現代資料庫 GUI
brew install sequel-pro                       # MySQL GUI
brew install another-redis-desktop-manager    # Redis GUI
brew install mongodb-compass                  # MongoDB GUI
```

## 系統維護

### 實用腳本

```bash
# 環境健康檢查
./bin/health-check.sh

# 更新所有工具
./bin/update.sh

# 配置備份
./bin/backup.sh

# 智能生成 .gitignore
./bin/gen-gitignore.sh
```

### 自訂配置

**本機設定**：

```bash
# ~/.config/local.sh
export KYWK_HOME="/custom/path"
export CUSTOM_VAR="value"
```

**敏感資料**：

```bash
# config/secret.sh (不進版控)
export API_KEY="your-key"
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

## See Also

### 已整合到 Brewfile

以下工具已整合到自動化安裝腳本中：

- **SourceTree/GitKraken** - Git GUI 客戶端
- **Postman** - API 測試工具
- **Docker Desktop** - 容器化平台

### Reference

**Zsh**

- [让你的 Mac 提前用上 macOS Catalina 的 Shell——Oh My Zsh 配置指南 - 少数派](https://sspai.com/post/55176)

**Mac Dev**

- [How to set up your Mac for Web Development – freeCodeCamp.org](https://goo.gl/ZDYqar)
- [homebrew - Mac OS X Yosemite 10.10 開発環境構築 - Qiita](http://goo.gl/XOrSV6)
  - [Python Development Environment on Mac OS X Mavericks 10.9 | Hacker Codex](http://goo.gl/8JkuvS)
  - [Set Up Python and Install Django on Mac OS X Lion 10.7 | Hacker Codex](http://goo.gl/5yhNGk)
- [Setting Up a Mac Dev Machine From Zero to Hero With Dotfiles - Tuts+ Code Tutorial](http://goo.gl/YkCvoT)
- [MacOS 編輯器快捷建設定, short key of editor](http://goo.gl/gSnCRv)
- [2018 最新 MacBook 必裝程式與設定 – Ryan Hsu – Medium](https://goo.gl/YZfREq)
