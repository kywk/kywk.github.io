---
title: lazygit
description: 最受歡迎的 Git Terminal UI，以 Go 編寫，提供直覺的鍵盤操作和強大的自訂命令功能
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags: [CLI, Git, TUI]
sidebar_position: 10
hide_table_of_contents: true
date_created: 2026-07-26
date_updated: 2026-07-26
slug: /utilities/git/lazygit/
---

## Overview

[lazygit](https://github.com/jesseduffield/lazygit) 是目前最受歡迎的 Git TUI 工具，以 Go 語言編寫，GitHub 上擁有 55k+ stars。它將複雜的 Git 操作轉化為直覺的鍵盤快捷鍵，讓你無需記憶冗長的 Git 命令就能高效管理版本控制。

主要面板配置：

| 面板 | 功能 |
|------|------|
| **Status** | 顯示當前 repo 狀態、remote 資訊 |
| **Files** | 檔案變更列表，支援 stage/unstage |
| **Branches** | 分支管理、切換、merge |
| **Commits** | 提交歷史、rebase、cherry-pick |
| **Stash** | Stash 管理 |

面板間使用數字鍵 `1-5` 或 `h/l` 切換，操作流暢且一致。

## Install

```bash
# macOS
brew install lazygit

# Arch Linux
pacman -S lazygit

# Go install
go install github.com/jesseduffield/lazygit@latest

# 建議設定 alias
alias lg="lazygit"
```

## Config

配置檔位於 `~/.config/lazygit/config.yml`：

```yaml
gui:
  theme:
    activeBorderColor:
      - green
      - bold
    selectedLineBgColor:
      - reverse
  showFileTree: true
  showRandomTip: false
  nerdFontsVersion: "3"

git:
  paging:
    pager: delta --paging=never  # 整合 git-delta，提供語法高亮 diff
  autoFetch: true
  autoRefresh: true

os:
  editPreset: "nvim"  # 或 vscode, sublime 等
```

整合 [git-delta](https://github.com/dandavid/delta) 可大幅提升 diff 閱讀體驗，是必裝的搭配工具。

## Keybindings

常用操作速查：

| 按鍵 | 功能 | 說明 |
|------|------|------|
| `space` | Stage/Unstage | 切換檔案暫存狀態 |
| `a` | Stage all | 暫存所有變更 |
| `c` | Commit | 撰寫 commit message |
| `P` | Push | 推送到 remote |
| `p` | Pull | 拉取更新 |
| `r` | Rebase | 互動式 rebase |
| `d` | Drop/Discard | 丟棄變更或刪除 commit |
| `e` | Edit file | 用編輯器開啟檔案 |
| `w` | Worktree | 管理 worktree |
| `Ctrl+z` | Undo | 基於 reflog 的撤銷操作 |
| `?` | Help | 顯示當前面板快捷鍵 |

## Custom Commands

自訂命令是 lazygit 的殺手級功能，可在 `config.yml` 中定義複雜的 Git 工作流程：

```yaml
customCommands:
  - key: "C"
    context: "files"
    command: "git commit -m '{{.Form.Type}}({{.Form.Scope}}): {{.Form.Message}}'"
    prompts:
      - type: input
        title: "Type (feat/fix/docs/refactor):"
        key: Type
      - type: input
        title: "Scope:"
        key: Scope
      - type: input
        title: "Message:"
        key: Message

  - key: "<c-f>"
    context: "global"
    command: "git fetch --all --prune"
    description: "Fetch all remotes"

  - key: "G"
    context: "commits"
    command: "git revert {{.SelectedLocalCommit.Sha}}"
    description: "Revert commit"
```

透過 `prompts` 支援互動式輸入（input、menu、confirm），可以建構 Conventional Commits 等複雜流程。

## Comparison with gitui

| 特性 | lazygit | gitui |
|------|---------|-------|
| 語言 | Go | Rust |
| 啟動速度 | 普通 | 快 2x |
| 記憶體用量 | 較高 | 約 1/15 |
| 自訂命令 | ✅ 強大 | ❌ |
| Undo (Ctrl+Z) | ✅ | ❌ |
| Bisect | ✅ | ❌ |
| Worktree | ✅ | ❌ |
| Interactive Rebase | ✅ 拖放式 | ✅ 基本 |
| 社群規模 | 55k+ stars | 18k+ stars |
| 介面複雜度 | 功能豐富 | 簡潔直覺 |

**使用策略**：

- **日常開發**：`alias lg=lazygit`，享受完整功能和自訂命令
- **大型 Repo / 快速操作**：gitui 更適合單純的 stage + commit，在超大 repo 中效能明顯更好

兩者並非互斥，根據場景選擇最合適的工具。

## Advanced Features

### Undo (Ctrl+Z)

基於 `git reflog` 實現的撤銷功能，幾乎所有操作都可以復原，包括 commit、rebase、merge 等。這是 lazygit 最讓人安心的功能之一。

### Interactive Rebase

在 Commits 面板中按 `r` 進入互動式 rebase，支援：
- 拖放式重新排序 commits（`Ctrl+j/k`）
- Squash (`s`)、Fixup (`f`)、Edit (`e`)、Drop (`d`)
- 修改任意 commit message（`r`）

### Cherry-pick 跨分支

1. 在來源分支的 Commits 面板選取 commit，按 `C` 複製
2. 切換到目標分支
3. 按 `V` 貼上（cherry-pick）

### Worktree 管理

按 `w` 進入 worktree 管理，可同時在多個分支上工作而無需 stash。

### Bisect

在 Commits 面板按 `b` 啟動 bisect，標記 good/bad 快速定位問題 commit。

## See Also

- [lazygit GitHub](https://github.com/jesseduffield/lazygit)
- [lazygit Keybindings](https://github.com/jesseduffield/lazygit/blob/master/docs/keybindings)
- [lazygit Custom Commands](https://github.com/jesseduffield/lazygit/wiki/Custom-Commands-Compendium)
- [gitui](https://github.com/extrawurst/gitui) - 輕量快速的 Rust Git TUI
- [git-delta](https://github.com/dandavison/delta) - 語法高亮的 diff 工具
