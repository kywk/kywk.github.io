---
title: fzf
description: fzf
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - CLI
sidebar_position: 10
hide_table_of_contents: true
date_created: 2024-05-24
date_updated: 2024-05-24
---

# fzf

> [fzf](https://github.com/junegunn/fzf) is a general-purpose command-line fuzzy finder.

模糊搜尋器，支援檔案、歷史、程序搜尋，是現代 CLI 工作流程的核心工具。

## 基本用法

### 檔案搜尋
```bash
# 搜尋當前目錄檔案
fzf

# 搜尋並開啟檔案
vim $(fzf)

# 搜尋並切換目錄
cd $(find . -type d | fzf)
```

### 歷史搜尋
```bash
# 搜尋命令歷史 (Ctrl+R)
history | fzf

# 搜尋並執行歷史命令
eval $(history | fzf | sed 's/^[0-9 ]*//')
```

## 進階技巧

### 預覽功能
```bash
# 檔案預覽
fzf --preview 'bat --color=always {}'

# 目錄預覽
find . -type d | fzf --preview 'ls -la {}'
```

### 多選模式
```bash
# 多選檔案 (Tab 選擇，Enter 確認)
fzf --multi

# 批次刪除檔案
rm $(fzf --multi)
```

### Git 整合
```bash
# 搜尋 Git 分支
git branch | fzf

# 搜尋 Git 提交
git log --oneline | fzf
```

## 鍵盤快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Ctrl+R` | 搜尋命令歷史 |
| `Ctrl+T` | 搜尋檔案並插入路徑 |
| `Alt+C` | 搜尋目錄並切換 |
| `Tab` | 多選模式下選擇項目 |
| `Shift+Tab` | 多選模式下取消選擇 |

## 配置

### 環境變數
```bash
# 預設選項
export FZF_DEFAULT_OPTS='--height 40% --layout=reverse --border'

# 預設命令 (使用 fd 取代 find)
export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'

# Ctrl+T 的命令
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
```

## 實用 Alias

```bash
# 快速檔案編輯
alias vf='vim $(fzf)'

# 快速目錄切換
alias cdf='cd $(find . -type d | fzf)'

# 搜尋並殺死程序
alias fkill='kill $(ps aux | fzf | awk "{print \$2}")'
```

## See Also

- [[Awesome CLI]] - 現代化 CLI 工具集合
- [fzf GitHub Repository](https://github.com/junegunn/fzf)
- [fzf Wiki](https://github.com/junegunn/fzf/wiki)
