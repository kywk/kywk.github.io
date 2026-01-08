---
title: zoxide
description: zoxide
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - CLI
sidebar_position: 10
hide_table_of_contents: true
date_created: 2024-05-24
date_updated: 2024-05-24
---

# zoxide

> [zoxide](https://github.com/ajeetdsouza/zoxide) is a smarter cd command, inspired by z and autojump.
>
> It remembers which directories you use most frequently, so you can "jump" to them in just a few keystrokes. zoxide works on all major shells.

智能目錄跳轉工具，取代傳統 `cd` 命令，透過學習使用習慣實現快速目錄切換。

## 安裝與設定

### 安裝
```bash
# macOS
brew install zoxide

# 或透過 dotfiles 一鍵安裝
cd ~/.files && ./bin/setup-devenv.sh
```

### Shell 整合
```bash
# 加入 ~/.zshrc
eval "$(zoxide init zsh)"

# 或使用 alias 模式
eval "$(zoxide init --cmd cd zsh)"
```

## 基本用法

### 目錄跳轉
```bash
# 傳統方式
cd /very/long/path/to/project

# zoxide 方式 (學習後)
z project

# 模糊匹配
z proj    # 跳轉到包含 "proj" 的目錄
z doc     # 跳轉到 Documents 或 docs 目錄
```

### 互動式選擇
```bash
# 當有多個匹配時，顯示選擇列表
zi project

# 結合 fzf 的互動式搜尋
zi
```

## 進階功能

### 查詢與管理
```bash
# 查看所有記錄的目錄
zoxide query -l

# 查看特定目錄的分數
zoxide query project

# 手動添加目錄
zoxide add /path/to/directory

# 移除目錄記錄
zoxide remove /path/to/directory
```

### 分數系統
```bash
# 查看目錄使用頻率分數
zoxide query -l -s

# 輸出範例：
# 25.0 /Users/kywk/projects/dotfiles
# 15.0 /Users/kywk/Documents
# 10.0 /Users/kywk/Downloads
```

## 實用技巧

### 1. 快速回到專案目錄
```bash
# 學習階段：正常使用 cd
cd ~/projects/my-awesome-project
cd ~/projects/another-project
cd ~/Documents/notes

# 學習完成後：快速跳轉
z awesome    # 跳到 my-awesome-project
z another    # 跳到 another-project  
z notes      # 跳到 Documents/notes
```

### 2. 結合其他工具
```bash
# 跳轉並執行命令
z project && git status

# 在 vim 中快速開啟專案
vim $(zoxide query project)

# 結合 fzf 的目錄搜尋
alias zf='cd $(zoxide query -l | fzf)'
```

### 3. 別名設定
```bash
# 常用別名
alias j='z'        # 更短的跳轉命令
alias ji='zi'      # 互動式跳轉
alias jl='zoxide query -l'  # 列出所有目錄
```

## 與其他工具比較

| 工具 | 特色 | 效能 |
|------|------|------|
| **zoxide** | Rust 編寫，速度快，智能排序 | ⭐⭐⭐⭐⭐ |
| autojump | Python 編寫，功能完整 | ⭐⭐⭐ |
| z | Shell 腳本，輕量級 | ⭐⭐⭐⭐ |
| fasd | 支援檔案和目錄 | ⭐⭐⭐ |

## 在 dotfiles 中的整合

```bash
# ~/.files/zsh/common.zshrc
# zoxide 智能目錄跳轉
if command -v zoxide >/dev/null 2>&1; then
    eval "$(zoxide init --cmd cd zsh)"
    alias j='z'
    alias ji='zi'
fi
```

## See Also

- [[Awesome CLI]] - 現代化 CLI 工具集合
- [[fzf]] - 模糊搜尋器，與 zoxide 完美搭配
- [zoxide GitHub Repository](https://github.com/ajeetdsouza/zoxide)
- [Smart cd command comparison](https://www.youtube.com/watch?v=aghxkpyRVDY&t=74s)
