---
title: 'Git: Check Remote Branch'
description: 'How to check if a remote branch exists on a given remote repository using git ls-remote'
tags:
  - Git
  - CLI
  - Tips
sidebar_position: 62
hide_table_of_contents: true
date_created: 2021-04-12T07:13:11.000Z
date_updated: 2024-01-01T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/ACtC-3djQkrvy1aqdMWCu9oEoqndQVIiLE9G5ZtlbDehi8_UcJ9pYib4aWForkHYHSu1voqdKMnCowTwGh1MXSnGeNrFwXRaOUCMD8s4rCZ4IuzWXIZ2khQ8KiJyT6SYlbLrnYYqONwaPZxlR8rReuWWMO7SYw=w8000-no?authuser=0
slug: /utilities/git/git-check-remote-branch/
---

# Git: Check Remote Branch

> 如何檢查遠端分支是否存在於指定的遠端倉庫？

## 使用情境

專案要幫一些舊項目導入 GitLab CI/CD，案例是有多個項目需參考另一個 Git 共用元件項目，通常會用 Git SubModule 來引用共用元件項目。但因舊項目既有開發流程與版控管理已久，有些需求實作就難以較正確的方式進行。

該案例中的管理流程是：
- 開發時，主要功能和共用元件項目都建立相同名稱的 branch（例如：`BR-A001`）
- 若共用元件有更新，則 build 時需 checkout 共用元件的 `BR-A001` 分支進行編譯
- 若共用元件沒有更新，則以 `master` 為主

因此，需在命令列模式下知道某個特定名稱的 Branch 是否存在。

## 解決方案

使用 `git ls-remote` 配合 `--exit-code` 可以得知某個 branch-name 是否存在遠端 repos 上。

### 官方說明

根據 [Git 官方文件](https://git-scm.com/docs/git-ls-remote)：

> `--exit-code`  
> Exit with status "2" when no matching refs are found in the remote repository. Usually the command exits with status "0" to indicate it successfully talked with the remote repository, whether it found any matching refs.

### Unix-like Shell

```bash
# 檢查存在的分支 - 回傳 0
git ls-remote --exit-code --heads origin <branch-that-exists-in-origin>

# 檢查不存在的分支 - 回傳 2
git ls-remote --exit-code --heads origin <branch-that-not-exists-origin>

# 實際使用範例
if git ls-remote --exit-code --heads origin feature/new-feature >/dev/null 2>&1; then
    echo "分支存在"
    git checkout feature/new-feature
else
    echo "分支不存在，使用 master"
    git checkout master
fi
```

### PowerShell

```powershell
# 檢查分支是否存在
if (git ls-remote --exit-code --heads origin <branch-name>) {
    Write-Host "分支存在"
    $true
} else {
    Write-Host "分支不存在"
    $false
}

# 實際使用範例
$branchName = "feature/new-feature"
if (git ls-remote --exit-code --heads origin $branchName) {
    git checkout $branchName
} else {
    git checkout master
}
```

## 進階用法

### 檢查多個遠端

```bash
# 檢查特定遠端
git ls-remote --exit-code --heads upstream feature-branch

# 檢查所有遠端的分支
git ls-remote --heads origin | grep "feature-branch"
```

### 在 CI/CD 中使用

```yaml
# GitLab CI 範例
check_branch:
  script:
    - |
      if git ls-remote --exit-code --heads origin $CI_COMMIT_REF_NAME; then
        echo "使用對應分支: $CI_COMMIT_REF_NAME"
        git checkout $CI_COMMIT_REF_NAME
      else
        echo "分支不存在，使用 master"
        git checkout master
      fi
```

## 相關指令

```bash
# 列出所有遠端分支
git ls-remote --heads origin

# 列出所有遠端標籤
git ls-remote --tags origin

# 檢查特定標籤是否存在
git ls-remote --exit-code --tags origin v1.0.0

# 靜默模式（不顯示輸出）
git ls-remote --exit-code --heads origin branch-name >/dev/null 2>&1
```

## 參考資料

- [Git ls-remote 官方文件](https://git-scm.com/docs/git-ls-remote)
- [How to check if remote branch exists on a given remote repository? - Stack Overflow](https://stackoverflow.com/questions/8223906/how-to-check-if-remote-branch-exists-on-a-given-remote-repository)
