---
title: 'Git: CLI Snippets'
description: 'Useful Git command line snippets and one-liners for daily development workflow'
tags:
  - Git
  - CLI
  - Snippets
sidebar_position: 60
hide_table_of_contents: true
date_created: 2023-01-02T00:00:00.000Z
date_updated: 2024-01-01T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

# Git: CLI Snippets

常用的 Git 命令列片段和一行式命令，提高日常開發效率。

## 🏷️ Tag 管理

### 清理所有 Tags

```bash
# 刪除所有本地 tags（建議先執行）
git tag -d $(git tag -l)

# 重新取得所有遠端 tags（建議先執行）
git fetch --tags

# 刪除所有遠端 tags（注意：一次推送比多次推送快）
git push origin --delete $(git tag -l)

# 再次刪除所有本地 tags
git tag -d $(git tag -l)
```

### Tag 操作

```bash
# 列出所有 tags
git tag -l

# 建立新 tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送特定 tag 到遠端
git push origin v1.0.0

# 推送所有 tags 到遠端
git push origin --tags

# 刪除本地 tag
git tag -d v1.0.0

# 刪除遠端 tag
git push origin --delete v1.0.0
```

## 🌱 Branch 管理

### 清理分支

```bash
# 刪除已合併的本地分支
git branch --merged | grep -v "\*\|main\|master\|develop" | xargs -n 1 git branch -d

# 刪除遠端已刪除的本地追蹤分支
git remote prune origin

# 列出所有遠端分支
git branch -r

# 列出所有本地分支
git branch -a
```

### 分支操作

```bash
# 建立並切換到新分支
git checkout -b feature/new-feature

# 重新命名分支
git branch -m old-name new-name

# 強制刪除分支
git branch -D feature/unwanted

# 設定上游分支
git branch --set-upstream-to=origin/main main
```

## 📝 Commit 管理

### Commit 修改

```bash
# 修改最後一次 commit 訊息
git commit --amend -m "New commit message"

# 修改最後一次 commit（不改訊息）
git commit --amend --no-edit

# 重設到特定 commit
git reset --hard <commit-hash>

# 軟重設（保留變更）
git reset --soft HEAD~1
```

### Commit 查詢

```bash
# 查看 commit 歷史（一行顯示）
git log --oneline

# 查看檔案變更歷史
git log --follow -- <filename>

# 查看特定作者的 commits
git log --author="Author Name"

# 查看特定時間範圍的 commits
git log --since="2023-01-01" --until="2023-12-31"
```

## 🔄 Stash 管理

```bash
# 儲存當前變更
git stash

# 儲存並添加訊息
git stash save "Work in progress on feature X"

# 列出所有 stash
git stash list

# 套用最新的 stash
git stash pop

# 套用特定 stash
git stash apply stash@{0}

# 刪除特定 stash
git stash drop stash@{0}

# 清空所有 stash
git stash clear
```

## 🔍 搜尋與查找

### 檔案搜尋

```bash
# 在 Git 歷史中搜尋文字
git log -S "search term" --oneline

# 在當前工作目錄搜尋
git grep "search term"

# 搜尋檔案名
git ls-files | grep "filename"

# 查找刪除的檔案
git log --diff-filter=D --summary | grep delete
```

### Blame 與追蹤

```bash
# 查看檔案每行的修改者
git blame <filename>

# 查看特定行數範圍
git blame -L 10,20 <filename>

# 忽略空白字元變更
git blame -w <filename>
```

## 🔧 實用工具

### 檔案操作

```bash
# 取消追蹤檔案（但保留本地檔案）
git rm --cached <filename>

# 重新命名檔案
git mv old-filename new-filename

# 恢復刪除的檔案
git checkout HEAD -- <filename>

# 查看檔案狀態
git status --porcelain
```

### 配置管理

```bash
# 查看所有配置
git config --list

# 設定全域使用者資訊
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 設定編輯器
git config --global core.editor "code --wait"

# 設定別名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
```

## 🔄 Remote 管理

```bash
# 查看遠端倉庫
git remote -v

# 添加遠端倉庫
git remote add upstream https://github.com/original/repo.git

# 更改遠端 URL
git remote set-url origin https://github.com/user/repo.git

# 同步上游倉庫
git fetch upstream
git merge upstream/main

# 強制推送（謹慎使用）
git push --force-with-lease
```

## 📊 統計與分析

```bash
# 查看貢獻統計
git shortlog -sn

# 查看檔案變更統計
git log --stat

# 查看代碼行數統計
git log --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }'

# 查看最活躍的檔案
git log --pretty=format: --name-only | sort | uniq -c | sort -rg | head -10
```

## ⚠️ 緊急情況

### 恢復操作

```bash
# 恢復到上一次 commit
git reset --hard HEAD~1

# 恢復特定檔案
git checkout HEAD -- <filename>

# 撤銷 merge
git merge --abort

# 撤銷 rebase
git rebase --abort

# 清理未追蹤的檔案
git clean -fd
```

### 緊急修復

```bash
# 強制同步本地與遠端
git fetch origin
git reset --hard origin/main

# 恢復意外刪除的 commit
git reflog
git reset --hard <commit-hash>

# 修復損壞的倉庫
git fsck --full
git gc --prune=now
```

## 📝 最佳實踐

1. **定期清理**：定期刪除已合併的分支和無用的 tags
2. **使用別名**：為常用命令設定簡短的別名
3. **備份重要操作**：在執行破壞性操作前先備份
4. **使用 --dry-run**：在不確定的情況下先測試命令
5. **閱讀輸出**：仔細閱讀命令輸出，理解操作結果

---

> 💡 **提示**：這些命令片段可以組合使用，但請在生產環境中謹慎使用破壞性操作。
