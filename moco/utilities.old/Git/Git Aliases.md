---
title: 'Git: Custom Aliases'
description: '個人 ~/.gitconfig Alias 完整配置解析與高效日常開發工作流'
tags:
  - Git
  - CLI
  - Aliases
  - Configuration
sidebar_position: 65
hide_table_of_contents: true
date_created: 2026-09-14T00:00:00.000Z
date_updated: 2026-09-14T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

# Git: Custom Aliases

精心調校的 `~/.gitconfig` 別名（Alias）清單，涵蓋日常高頻操作、分支與子模組同步、日誌視覺化以及具備安全回退機制的快速存檔/抹除指令。

---

## 📋 完整配置預覽

可直接複製並加入到 `~/.gitconfig` 的 `[alias]` 區塊：

```ini
[alias]
	# 基礎快捷縮寫
	st = status -sb
	sh = stash
	br = branch -v
	rb = rebase
	ci = commit
	co = checkout
	cos = checkout --recurse-submodules
	sw = switch
	re = restore
	
	# 日誌與視覺化
	lg = log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all
	ll = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
	lc = log --no-merges --pretty=format:' - %s'
	tree = log --graph --decorate --pretty=oneline --abbrev-commit
	
	# 差異與檢視
	ls = diff --stat
	ds = diff --staged
	dt = difftool
	
	# 安全存檔與復原
	undo = reset HEAD~1 --mixed
	amend = commit -a --amend
	wipe = !git add -A && git commit -qm 'WIPE SAVEPOINT' && git reset HEAD~1 --hard
	save = !git add -A && git commit -m 'SAVEPOINT'
	
	# 分支與遠端管理
	cleanup = "!git branch --merged | grep -v '\\*\\|main\\|master\\|develop' | xargs -n 1 git branch -d"
	publish = "!git push -u origin $(git branch --show-current)"
	unpublish = "!git push origin --delete $(git branch --show-current)"
```

---

## 🚀 基礎快捷縮寫 (Basic Shortcuts)

高頻操作的 2~3 字母縮寫，大幅減少擊鍵次數，並附加更友好的預設參數。

### 指令詳解

```bash
# 查看簡潔狀態與分支追蹤（-s 簡短模式，-b 顯示分支領先/落後資訊）
git st

# 暫存當前未提交的工作目錄變更
git sh

# 詳細列出分支（含最新 commit hash 與 commit message）
git br

# 啟動 rebase 衍合
git rb

# 提交變更
git ci

# 傳統簽出（切換分支或還原檔案）
git co

# 切換分支並同步更新所有 submodules 至該分支所對應的 commit
git cos <branch_name>

# Git 2.23+ 專門分支切換（職責單一化）
git sw <branch_name>

# Git 2.23+ 專門工作目錄檔案還原
git re <file_name>
```

> [!TIP]
> **為什麼推薦 `git cos`？**  
> 在包含 Submodule 的大型專案中，一般的 `git checkout` 只會切換主專案指標，常導致 submodule 仍停留在舊的 commit 而造成未預期的程式錯誤或編譯失敗。`git checkout --recurse-submodules` 確保切換分支時，所有已啟用的 submodules 均會同步切換到該分支紀錄的 commit。

---

## 📜 日誌與歷史視覺化 (Log & Visualization)

不用開 GUI 工具也能在終端機享受清晰明瞭的 Commit 線圖與格式化日誌。

### 指令詳解

```bash
# 全域彩色分支圖（含相對時間、作者、全部分支與 tags）
git lg

# 精簡彩色歷史圖（適合快速追蹤近期提交）
git ll

# 排除 Merge Commit 的簡要清單（適合產生 Release Notes / Changelog）
git lc

# 單行極簡樹狀圖
git tree
```

### 使用場景

* **`git lg` (Log Graph)**：  
  顯示格式為 `[Commit Hash] - ([相對時間]) [主旨] - [作者] [分支/標籤裝飾]`，加上 `--all` 參數，能一次鳥瞰所有遠端與本地分支的分岔與交會情況。
* **`git lc` (Log Changelog)**：  
  使用 `git lc v1.0.0..HEAD` 可以立即列出從 `v1.0.0` 到目前為止所有非 merge 的變更條目，直接作為版本發布的 Release Notes 草稿。

---

## 🔍 差異與比對 (Diff & Comparison)

搭配 [[Git Delta]] 能讓程式碼審查更加直覺。

### 指令詳解

```bash
# 顯示變更檔案統計摘要（修改行數與增刪長條圖）
git ls

# 查看已暫存（Staged）內容與前一次 commit 的詳細差異
git ds

# 啟動外部圖形化或自訂比對工具（如 vimdiff、vscode、meld）
git dt
```

* **`git ls`**：在提交前先大致確認哪些檔案被修改、修改幅度為何，避免誤動不相干的檔案。
* **`git ds`**：等同於 `git diff --staged`，在執行 `git commit` 前再次確認即將入庫的實際 diff。

---

## ⚡ 安全存檔與復原 (Safety & Undo)

提供保險機制的復原與快速存檔指令，即使執行毀滅性清理也能透過 `reflog` 找回。

### 指令詳解

```bash
# 撤銷前一次 commit，但保留程式碼修改於未暫存狀態
git undo

# 自動加入所有追蹤檔案的修改並直接併入前一次 commit
git amend

# 快速建立檢查點（Savepoint）
git save

# 清空當前所有未提交變更（但具備 Reflog 保險機制）
git wipe
```

> [!IMPORTANT]
> **`git wipe` 的安全機制設計**  
> 一般的 `git reset --hard` 會直接把未提交的變更永久抹除。這裡的 `wipe` 採用了雙重設計：
> ```bash
> !git add -A && git commit -qm 'WIPE SAVEPOINT' && git reset HEAD~1 --hard
> ```
> 它會**先將所有變更（含未追蹤檔案）靜默提交一個臨時 Commit**，然後才執行 hard reset 退回。這代表如果誤刪了重要程式碼，只要透過 `git reflog` 就能隨時找回該筆 `WIPE SAVEPOINT` 救回資料！

---

## 🌿 分支與遠端管理 (Branch & Remote Workflow)

自動化繁瑣的分支發布與已合併分支的清理作業。

### 指令詳解

```bash
# 一鍵推送當前分支至 origin 並設定 upstream 追蹤
git publish

# 一鍵刪除 origin 遠端上的同名分支
git unpublish

# 一鍵清理本地所有已合併到 main/master/develop 的分支
git cleanup
```

### 運作原理

* **`git publish`**：  
  利用 `$(git branch --show-current)` 自動取得目前所在分支名稱，執行 `git push -u origin <current_branch>`，初次推新分支時再也不用手動輸入分支名稱。
* **`git unpublish`**：  
  當 PR/MR 已合併或需求廢棄時，直接在該分支下輸入 `git unpublish` 即可刪除遠端對應分支。
* **`git cleanup`**：  
  透過 pipe 過濾保護核心主分支（當前分支 `*`、`main`、`master`、`develop`），將其餘已合併的本地過期分支自動交由 `git branch -d` 安全刪除，常保本地分支清爽。

---

## 📊 別名速查表 (Quick Reference)

| 別名 | 原生指令 | 說明 |
| :--- | :--- | :--- |
| `st` | `status -sb` | 簡短狀態與分支資訊 |
| `sh` | `stash` | 快速暫存工作區變更 |
| `br` | `branch -v` | 分支列表與最新 commit |
| `rb` | `rebase` | 衍合分支 |
| `ci` | `commit` | 提交變更 |
| `co` | `checkout` | 簽出分支或檔案 |
| `cos` | `checkout --recurse-submodules` | 簽出分支並同步 submodules |
| `sw` | `switch` | 切換分支 |
| `re` | `restore` | 還原檔案 |
| `lg` | `log --graph ... --all` | 全域彩色樹狀日誌 |
| `ll` | `log --color --graph ...` | 精簡彩色分支歷史 |
| `lc` | `log --no-merges ...` | 無 merge commit 清單（Release Notes） |
| `tree` | `log --graph ... --pretty=oneline` | 單行精簡線圖 |
| `ls` | `diff --stat` | 檔案變更行數統計 |
| `ds` | `diff --staged` | 檢視已暫存檔案的 diff |
| `dt` | `difftool` | 啟動外部比對工具 |
| `undo` | `reset HEAD~1 --mixed` | 撤銷上一次 commit（保留代碼） |
| `amend` | `commit -a --amend` | 修正上一次 commit |
| `save` | `!git add -A && git commit -m 'SAVEPOINT'` | 一鍵建立暫存檢查點 |
| `wipe` | `!git add -A && git commit ... && reset --hard` | 安全清空變更（留有 reflog） |
| `publish` | `!git push -u origin $(current-branch)` | 推送當前分支並關聯遠端 |
| `unpublish` | `!git push origin --delete $(current-branch)` | 刪除遠端同名分支 |
| `cleanup` | `!git branch --merged ... \| xargs git branch -d` | 自動清理已合併分支 |

---

## 📖 相關文章

- [[Awesome Git]] - 精選 Git 工具與學習資源清單
- [[Git Snippets]] - 常用 Git 一行式指令與代碼片段
- [[Git Delta]] - 語法高亮的 Git Diff 檢視器
