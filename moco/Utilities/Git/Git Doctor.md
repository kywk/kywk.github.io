---
title: "Git: Doctor"
description: 診斷與修復 .git 經 Dropbox 跨機同步造成的損傷（物件缺失、index 缺失、權限遺失）
tags:
  - Git
  - CLI
  - Troubleshooting
  - Dropbox
sidebar_position: 66
hide_table_of_contents: true
date_created: 2026-10-16T00:00:00.000Z
date_updated: 2026-10-16T00:00:00.000Z
cover: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

# Git: Doctor

`.git` 目錄經 Dropbox 在機器之間同步時，有三類損傷不會自癒。本文整理症狀判讀、診斷與修復指令，以及封裝好的 `git-doctor.sh` 工具。

## 🧭 背景：為什麼會壞？

dotfiles 的同步策略（`<Dropbox>/.mignore`）刻意將 `.git` 內容分成兩類：

| 會同步 | 不同步（機器本地） |
| :--- | :--- |
| `objects/`、`refs/`、`packed-refs`、`HEAD` | `index`、操作暫態（`*_HEAD`、`*_MSG`、`FETCH_HEAD` 等） |

- **物件經 Dropbox 傳輸**：任一機器漏傳一個物件，其他機器的 repo 就會「refs 完整、物件殘缺」；漏的是 tree 時，`git status`／`checkout` 直接無法運作。
- **`git fetch` / `git pull` 不會自癒**：它們只做 refs 協商，看到 commit hash 已存在就假設物件齊全，因此會顯示 `Already up to date` 卻仍無法操作。
- **Dropbox 不保留 Unix 權限**：可執行檔經同步後 `755 → 644`，git 會持續回報 modified。
- **index 屬機器本地**：新機器或剛同步完成的 repo 沒有 index，`git status` 會誤顯示所有檔案為 staged deletion（實際上是空 index）。

## 🩺 症狀判讀

| 症狀 | 原因 |
| :--- | :--- |
| `error: bad tree object HEAD` | commit 的 tree 物件缺失 |
| `fatal: unable to parse commit <hash>` | checkout 需要解析 HEAD 的 tree，但物件缺失 |
| `git pull` 顯示 `Already up to date` 卻無法操作 | refs 協商不會補物件 |
| `git status` 顯示所有檔案 `deleted`（staged）＋大量未追蹤 | index 不存在（機器本地、正常不同步） |
| 一堆腳本顯示 `modified`，但 `git diff` 沒有內容差異 | 可執行權限遺失（755 → 644） |

## 🔍 診斷

```bash
git fsck --full
```

- 出現 `missing` / `broken` → 物件缺失，需要修復。
- 只有 `dangling` → 正常現象（rebase、reflog 過期後的殘留），不需要處理。
- 沒有輸出 → 物件完整。

## 🔧 修復（手動指令）

```bash
# 1. 物件缺失：跳過 refs 協商、整包重抓（需 git >= 2.36）
git fetch --refetch origin
git fsck --full                     # 複驗

# 2. index 缺失：重建（--mixed，不動工作區）
git reset

# 3. 權限遺失：找出受影響檔案後還原
git diff --summary | sed -n 's/^ *mode change 100755 => 100644 //p'
chmod +x <file>
```

> [!IMPORTANT]
> 一般的 `git fetch` / `git pull` 無法修復物件缺失。修復前也**不要**執行 `git gc --prune=now`——它會把可能還需要的物件直接清掉，反而失去救援機會。

## 🛠️ 工具：git-doctor.sh

dotfiles 將上述檢查與修復封裝為 `~/.files/bin/git-doctor.sh`：

```bash
bash ~/.files/bin/git-doctor.sh            # 檢查並修復目前 repo
bash ~/.files/bin/git-doctor.sh -n <path>  # 只檢查（dry-run；有需修復項目時 exit 1）
bash ~/.files/bin/git-doctor.sh -q <path>  # 多個 repo；-q 健康時不輸出細節
```

執行內容：

1. **index 缺失** → `git reset` 重建（HEAD 尚未誕生時跳過）。
2. **物件缺失／損壞** → `git fetch --refetch origin`（無 origin 或 git < 2.36 時明確報錯；bare repo 亦支援）。
3. **可執行權限遺失** → 依 index/HEAD 模式 `chmod +x`，並列出受影響檔案。
4. 最後驗證 `git status` 可執行；未提交變更數僅提示、不算失敗（屬正常工作狀態）。

## 🛡️ 使用時機

- 新機器首次操作某個 repo、或大量檔案剛同步完成後，先跑 `git-doctor.sh -n` 確認。
- 遇到 `bad tree object`、`unable to parse commit`、或 status 顯示大量 staged deletion 時，直接跑 `git-doctor.sh`。
- 要例行掃描整個專案目錄：`bash ~/.files/bin/git-doctor.sh -n ~/project/*/`。

## 📖 相關文章

- [[Git Snippets]] - 常用 Git 指令片段（含緊急修復區）
- [[Git Aliases]] - 個人 gitconfig 別名完整解析
- [[Awesome Git]] - 精選 Git 工具與學習資源清單
