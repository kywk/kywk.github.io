---
title: 'Setup: App 安裝紀錄'
description: kywk's favorite macOS Apps
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Mac
  - DevEnv
  - kywk
sidebar_position: 1
date_created: 2022-08-13T00:00:00.000Z
date_updated: 2025-01-20T00:00:00.000Z
slug: /machintosh/applications/mac-apps-setup/
---

# [Mac] 系統與 Apps 安裝紀錄

設定新電腦，順便整理紀錄目前日常使用的 Apps。
越來越少從文章中看到新 App 的介紹，更多的是從 YouTube 影片推薦得知。
時代變遷...

## 快速安裝

### 一鍵安裝腳本

使用 dotfiles 專案的自動化安裝腳本，一次安裝所有必要工具：

```bash
# 1. Clone dotfiles 專案
git clone <repo-url> ~/.files

# 2. 執行初始化
cd ~/.files && ./init.sh

# 3. 安裝開發環境和應用程式
./bin/setup-devenv.sh
```

### Homebrew

[**Homebrew**](https://brew.sh/index_zh-tw)

所有軟體透過 `Brewfile` 統一管理，包含 70+ 開發工具：

```shell
# 手動安裝 Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 使用 Brewfile 批次安裝
brew bundle --file=mac/Brewfile
```

### 配置同步

**Dropbox + [[Maestral]]**

配置檔案透過 Dropbox 同步，使用開源客戶端 Maestral：

```shell
brew install maestral
```

詳細說明請參考 [[Maestral]] 文章。

**Dotfiles 管理**

- 🔧 **智能環境管理** - 專案自動切換 Java/Node.js/Go 版本
- ⚡ **效能最佳化** - Zinit Turbo 模式，Shell 啟動速度提升 50%+
- 🛡️ **安全設計** - 敏感資料獨立管理，不進版控
- 📦 **模組化架構** - 功能分離，易於維護和擴展

### 瀏覽器

**Google Chrome / Microsoft Edge**

```shell
brew install google-chrome microsoft-edge
```

### 編輯器

**Ghostty / iTerm2 / Kitty**

現代化終端模擬器，支援 GPU 加速和豐富功能：

```shell
brew install ghostty iterm2 kitty
```

**Zed / VS Code / Sublime Text**

高效能編輯器，啟動速度快：

```shell
brew install zed visual-studio-code sublime-text
```

**JetBrains 系列**

```shell
brew install intellij-idea goland webstorm
```

## 開發工具

### 程式設計字體

支援 Ligatures 的現代化字體：

```shell
brew install font-jetbrains-mono font-fira-code font-cascadia-code
```

### 現代 CLI 工具

取代傳統 Unix 工具的現代化替代品：

```shell
# 系統監控和檔案管理
brew install btop eza bat ripgrep zoxide fd

# Git 工具
brew install tig gitui git-delta

# 其他實用工具
brew install tldr fzf direnv jq
```

詳細開發環境設定請參考：[[Mac DevEnv Setup]]

## 生產力工具

### Obsidian

出發點是卡片筆記軟體，因各種擴充功能，已是個人全面性筆記與專案管理軟體：

```shell
brew install obsidian
```

### [[Raycast]]

強大的應用程式啟動器，取代 Spotlight 和 Alfred：

```shell
brew install raycast
```

詳細功能介紹請參考 [[Raycast]] 文章。

### [AltTab](https://alt-tab-macos.netlify.app/)

和 Windows 一樣使用 `Alt + Tab` 切換視窗，可在同一程式多個視窗中切換，比 macOS 內建僅能在應用程式間切換來得快速方便：

```shell
brew install alt-tab
```

### [Pure Paste](https://sindresorhus.com/pure-paste)

讓預設貼上就是純文字，自動清除複製的文字樣式：

```shell
brew install pure-paste
```

## Menu Bar

### [Ice - Menu Bar Manager](https://icemenubar.app/)

開源的 Menu Bar 管理工具，取代付費的 Bartender：

```shell
brew install jordanbaird-ice
```

- [GitHub - jordanbaird/Ice: Powerful menu bar manager for macOS](https://github.com/jordanbaird/Ice)
- [極簡控必備，MacOS 選單列整理工具 Ice](https://www.larrynote.com/menubar-ice/)

### [Itsycal](https://www.mowglii.com/itsycal/)

在功能表列上便捷地查看日曆，可以查看月曆和事件列表，還能快速創建新事件：

```shell
brew install itsycal
```

### [TopNotch](https://topnotch.app/)

隱藏 MacBook 瀏海區域，讓螢幕看起來更完整：

```shell
brew install topnotch
```

### [MenubarX](https://menubarx.app)

在 Menu Bar 上放置小型瀏覽器，方便查閱資料或當作開發 RWD 網頁時的檢視工具。亦可將常用網站固定在 Menu Bar 上當作 App 使用：

- [MenubarX 在 Mac 選單列加入瀏覽器，固定經常使用的網頁](https://free.com.tw/menubarx/)
- [App Store 下載](https://apps.apple.com/tw/app/menubarx/id1575588022)

### [Pomodorome](https://apps.apple.com/us/app/pomodoro-me-focus-on-tasks/id1484801884?mt=12)

在 Menu Bar 上的番茄時鐘，方便調用。具備基本統計資訊，方便追蹤時間使用。

## 網路與雲端工具

### [CloudMounter](https://cloudmounter.net/)

將雲端硬碟掛載到 Finder，支援多種雲端服務：

- [App Store 下載](https://apps.apple.com/tw/app/cloudmounter-cloud-encryption/id1130254674?l=en&mt=12)

### [rclone](https://rclone.org/)

命令列雲端同步工具，支援 40+ 雲端服務：

```shell
brew install rclone
```

## 其他

### 多媒體工具

**[IINA](https://iina.io/)**

Mac 上最強大的播放器，幾乎支援所有影音格式，開源且 UI 美觀：

```shell
brew install iina
```

**[ImageOptim](https://imageoptim.com/)**

圖片壓縮優化工具：

```shell
brew install imageoptim
```

### [ExifRenamer](http://goo.gl/lSWZ)

```shell
brew install exifrenamer
```

### [McBopomofo 小麥注音輸入法](http://mcbopomofo.openvanilla.org/)

反應快速、輕巧簡單，為 Mac 使用者量身打造。支援標準、倚天、許氏、倚天 26 鍵、IBM 以及漢語拼音鍵盤配置：

```shell
brew install mcbopomofo
```

參考資料：
- [小麥注音的隱藏設定](https://osxchat.tumblr.com/post/29205181318/mcbopomofo-hidden-settings)

## 實用工具腳本

### 系統維護

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

### 版本管理

```bash
# 軟體版本統一管理
source config/versions.sh

# 支援的開發環境
# Java: SDKMAN (21.0.5-zulu)
# Node.js: Volta/NVM (20)
# Go: 系統安裝 (1.21.5)
```

## See Also

### 已整合到 Brewfile 的工具

以下工具已整合到自動化安裝腳本中：

- **Alfred/Raycast** - 應用程式啟動器
- **Rectangle** - 視窗管理工具
- **Hidden Bar/Ice** - Menu Bar 管理
- **Typora** - Markdown 編輯器
- **XMind** - 心智圖工具

### Reference

- [節省工具箱 Jason Tools: [套件分享] 在 macOS 工作所用的自由與開源軟體 (持續更新)](https://blog.jason.tools/2023/09/macos-opensource-apps.html?fbclid=IwAR1nRrdYDi3-Wpzia2qDm7gg-6y_F7CCMFCxPGqmJ8SJXfO0oC6co3pla0E)
- [10 BEST Mac Apps for Productivity (in 2022)!](https://www.youtube.com/watch?v=-xXc7qeiC8I)
- [5 款免费又好用的 Mac 菜单栏软件 - Mac云课堂](https://www.youtube.com/watch?v=OWdOq7E62Ws)
- [22 FREE Mac Apps I use to BOOST MY PRODUCTIVITY - YouTube](https://www.youtube.com/watch?v=w3Vue4bdPyM)
- [Amazing FREE Mac Apps You Aren’t Using! - YouTube](https://www.youtube.com/watch?v=FxUk8gxzHI8)
