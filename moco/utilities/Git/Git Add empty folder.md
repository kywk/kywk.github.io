---
title: 'Git: Add Empty Folder'
description: 'How to add empty folders to Git repository using .gitignore, .gitkeep, or README.md'
tags:
  - Git
  - Tips
sidebar_position: 61
hide_table_of_contents: true
date_created: 2021-05-09T16:00:00.000Z
date_updated: 2024-01-01T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/ACtC-3c1Fcx8ZIVYrXBrmLfZUFhSnpBJqiUgVL36d3S6x_VzJ0a0JzmkF__USqKP6HCuphBVaLiWP5Vf0Qv2l-WzrdNy3h2G_emtP9mNa82Y2FySF8wu42FOSOySVj-7hf-yuabf58RkxPr-Lv8PvX172gAtYA=w800-no?authuser=0
slug: /utilities/git/git-add-empty-folder/
---

# Git: Add Empty Folder

> 如何在 Git 中提交空資料夾？

## 問題背景

最近專案中不斷被問起這件事，為了日後管理維護方便，案主期待 Git 裡面能夠預先建立對應的資料夾樹。

而 **Git 設計是無法提交空資料夾**，雖然網路上可以找到一些 hack 的方式可以在 Git 裡加入空資料夾，但可能因不同 Git 版本關係，在 checkout 時無法建立對應資料夾。

**通用解法**是在該資料夾底下新增一個不影響程式運行的檔案。常見的有 `.gitignore`、`.gitkeep`、`README.md`。

## 解決方案

### 1. 使用 .gitignore

**適用情境**：該資料夾不該保存任何程式資源，只是為了專案特殊需求而必須存在資料夾。

```bash
# 建立資料夾並新增 .gitignore
mkdir <NEW_FOLDER>
cd <NEW_FOLDER>
touch .gitignore
```

`.gitignore` 檔案內容：
```gitignore
# Ignore everything in this directory
*
# Except this file
!.gitignore
```

**優點**：
- 往後在該資料夾放任何檔案，commit 時都不會被加入 Git 倉儲
- checkout 時也不會產生衝突或影響
- 適合當作不同環境會有所不同的開發測試資源、臨時資料夾等

### 2. 使用 .gitkeep

**適用情境**：需要保存資料夾結構，且日後會有檔案增減。

```bash
# 建立資料夾並新增 .gitkeep
mkdir <NEW_FOLDER>
cd <NEW_FOLDER>
touch .gitkeep
```

**特點**：
- 雖然命名很像 Git 的系統檔案，但其實不是，它只是個普通檔案
- 這個方式可以保存資料夾，日後資料夾有檔案增減時，亦會被提交到專案倉儲
- `.gitkeep` 會被視為系統隱藏檔，大部分開發工具都會忽略它的存在

> 📝 **題外話**：在 GitLab Web 上新增資料夾時，GitLab 也是新增 `.gitkeep` 檔來處理空白資料夾的提交。

### 3. 使用 README.md

**適用情境**：多人協作開發，需要說明資料夾用途。

```bash
# 建立資料夾並新增 README.md
mkdir <NEW_FOLDER>
cd <NEW_FOLDER>
touch README.md
```

`README.md` 檔案內容範例：
```markdown
# <FOLDER_NAME>

## 目的
說明這個資料夾的作用和目的。

## 使用方式
描述如何使用這個資料夾。

## 注意事項
列出使用時需要注意的事項。
```

**優點**：
- 和 `.gitkeep` 一樣可以保存空資料夾
- 為團隊提供資料夾用途說明，提高協作效率
- 可以記錄資料夾的使用規範和注意事項

**注意事項**：
- `README.md` 是一般檔案，要注意開發工具會不會因為它而出錯

## 最佳實踐

1. **優先選擇 `.gitkeep`**：簡單且不會干擾開發環境
2. **多人協作選擇 `README.md`**：提供文件說明，提高團隊協作效率
3. **臨時資料夾選擇 `.gitignore`**：避免意外提交不需要的檔案

## 參考資料

- [How can I add an empty directory to a Git repository? - Stack Overflow](https://stackoverflow.com/questions/115983/how-can-i-add-an-empty-directory-to-a-git-repository)
- [【狀況題】新增目錄？ - 為你自己學 Git | 高見龍](https://gitbook.tw/chapters/using-git/add-folder-to-git.html)
- [Git 提交空資料夾 - IT閱讀](https://www.itread01.com/content/1542022390.html)
- [XYZ的筆記本: Git commit 空資料夾](https://xyz.cinc.biz/2014/03/git-add-empty-directory.html)