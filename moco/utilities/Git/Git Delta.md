---
title: 'Git Delta'
description: 'A syntax-highlighting pager for git, diff, and grep output - making code diffs more readable and beautiful'
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - CLI
  - Git
  - Tools
sidebar_position: 10
hide_table_of_contents: true
date_created: 2024-12-22T00:00:00.000Z
date_updated: 2024-12-22T00:00:00.000Z
slug: /utilities/git/git-delta/
---

# Git Delta

> A syntax-highlighting pager for git, diff, and grep output

**Git Delta** 是一個強大的命令列工具，為 Git diff、grep 和 blame 輸出提供語法高亮和美化功能。它讓程式碼差異檢視變得更加高效和愉悦，同時允許你對 diff 的佈局和樣式進行廣泛的自訂。

## ✨ 主要特色

- **語法高亮**：支援多種程式語言的語法高亮
- **並排檢視**：side-by-side diff 檢視模式
- **行號顯示**：清晰的行號標示
- **檔案樹狀圖**：美化的檔案變更樹狀結構
- **主題支援**：多種內建主題，支援自訂配色
- **Git 整合**：無縫整合到現有的 Git 工作流程
- **效能優化**：快速處理大型 diff 輸出

## 🚀 安裝

### macOS
```bash
# 使用 Homebrew
brew install git-delta

# 使用 MacPorts
sudo port install git-delta
```

### Linux
```bash
# Ubuntu/Debian
sudo apt install git-delta

# Arch Linux
sudo pacman -S git-delta

# 使用 cargo
cargo install git-delta
```

### Windows
```powershell
# 使用 Chocolatey
choco install delta

# 使用 Scoop
scoop install delta

# 使用 winget
winget install dandavison.delta
```

## ⚙️ 配置

### 基本 Git 配置

在 `~/.gitconfig` 中添加以下配置：

```ini
[core]
    pager = delta

[interactive]
    diffFilter = delta --color-only

[delta]
    navigate = true    # 使用 n 和 N 在 diff 區塊間導航
    light = false      # 設為 true 使用淺色主題
    side-by-side = true # 啟用並排檢視
```

### 進階配置

```ini
[delta]
    # 外觀設定
    line-numbers = true
    decorations = true
    file-style = bold yellow ul
    file-decoration-style = none
    hunk-header-decoration-style = cyan box ul
    
    # 並排檢視設定
    side-by-side = true
    line-numbers-left-format = "{nm:>4}┊"
    line-numbers-right-format = "{np:>4}│"
    line-numbers-left-style = cyan
    line-numbers-right-style = cyan
    
    # 語法主題
    syntax-theme = Dracula
    
    # 空白字元處理
    whitespace-error-style = 22 reverse
```

## 💡 使用方式

### 基本用法

配置完成後，Delta 會自動處理所有 Git diff 輸出：

```bash
# 這些命令會自動使用 Delta
git diff
git show
git log -p
git stash show -p
git reflog --patch
```

### 直接使用 Delta

```bash
# 直接處理 diff 輸出
git diff | delta

# 比較兩個檔案
delta file1.txt file2.txt

# 處理其他 diff 工具的輸出
diff -u file1.txt file2.txt | delta
```

### 導航快捷鍵

在 Delta 檢視中可以使用以下快捷鍵：

- `n` / `N`：跳到下一個/上一個檔案
- `g` / `G`：跳到開頭/結尾
- `/`：搜尋
- `q`：退出

## 🎨 主題與自訂

### 內建主題

```bash
# 查看可用主題
delta --list-syntax-themes

# 常用主題
# - Dracula
# - GitHub
# - Monokai Extended
# - Solarized (dark)
# - Solarized (light)
```

### 自訂配色

```ini
[delta]
    # 自訂顏色
    minus-style = syntax "#3f0001"
    minus-emph-style = syntax "#901011"
    plus-style = syntax "#002800"
    plus-emph-style = syntax "#006000"
    
    # 行號樣式
    line-numbers-minus-style = "#B10036"
    line-numbers-plus-style = "#03a4ff"
```

## 🔧 進階功能

### 檔案樹狀圖

```bash
# 顯示檔案變更樹狀圖
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit | delta
```

### 與其他工具整合

```bash
# 與 fzf 整合
git log --oneline | fzf --preview 'git show --color=always {1} | delta'

# 與 bat 整合
export BAT_PAGER="delta --paging=never"
```

## 🛠️ 疑難排解

### 常見問題

**問題**：Delta 沒有自動啟用
```bash
# 檢查 Git 配置
git config --get core.pager

# 手動設定
git config --global core.pager delta
```

**問題**：並排檢視顯示異常
```bash
# 調整終端寬度設定
git config --global delta.width 120
```

**問題**：顏色顯示不正確
```bash
# 檢查終端顏色支援
echo $TERM

# 強制啟用顏色
git config --global delta.color-only true
```

## 📚 相關資源

- **[官方網站](https://dandavison.github.io/delta/introduction.html)** - 完整文件和使用指南
- **[GitHub 專案](https://github.com/dandavison/delta)** - 原始碼和問題回報
- **[配置範例](https://github.com/dandavison/delta#configuration)** - 更多配置選項
- **[Hacker News 討論](https://news.ycombinator.com/item?id=42091365)** - 社群討論和使用心得

## 💭 使用心得

Git Delta 大幅改善了程式碼審查和 diff 檢視的體驗，特別是：

1. **語法高亮**讓程式碼變更更容易理解
2. **並排檢視**提供更直觀的比較方式
3. **豐富的自訂選項**可以配合個人喜好調整
4. **無縫整合**不會干擾現有的 Git 工作流程

對於經常需要檢視程式碼差異的開發者來說，Git Delta 是一個值得投資學習的工具。
