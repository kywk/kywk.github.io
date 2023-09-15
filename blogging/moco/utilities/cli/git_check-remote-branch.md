---
#id: git_remote-branch-check
title: "Git: Remote branch check"
description: "Git: check if remote branch exists on a given remote repository"
tags: [git]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

hide_table_of_contents: true

date: 2021-04-12T15:13:11+08:00
image: "https://lh3.googleusercontent.com/pw/ACtC-3djQkrvy1aqdMWCu9oEoqndQVIiLE9G5ZtlbDehi8_UcJ9pYib4aWForkHYHSu1voqdKMnCowTwGh1MXSnGeNrFwXRaOUCMD8s4rCZ4IuzWXIZ2khQ8KiJyT6SYlbLrnYYqONwaPZxlR8rReuWWMO7SYw=w8000-no?authuser=0"
---

[Git] check if remote branch exists
===================================

專案要幫一些舊項目導入 GitLab CI/CD, 
案例是有多個項目需參考另一個 Git 共用元件項目, 通常會用 Git SubModule 來引用共用元件項目.
但因舊項目既有開發流程與版控管理已久, 有些需求實作就難以較正確的方式進行.

該案例中的管理流程是: 開發時, 主要功能和共用元件項目都建立相同名稱的 branch, (Ex: BR-A001)
若共用元件有更新. 則 build 時需 checkout 共用元件的 BR-A001 分支進行編譯.
若共用元件沒有更新, 則以 master 為主.

因此, 需在命令列模式下知道某個特定名稱的 Branch 是否存在.

找了一下, 原來 `ls-remote` 配合 `--exit-code` 可以得知某個 branch-name 是否存在遠端 repos 上.
[官方說明](https://git-scm.com/docs/git-ls-remote) 如下:

>   --exit-code
>   Exit with status "2" when no matching refs are found in the remote repository. Usually the command exits with status "0" to indicate it successfully talked with the remote repository, whether it found any matching refs.

__UNiX-like Shell__

``` bash
$ git ls-remote --exit-code --heads origin <branch-that-exists-in-origin>
=> return 0

$ git ls-remote --exit-code --heads origin <branch-that-not-exists-origin>
=> return 2
```

__PowerShell__

``` powershell
$ if (git ls-remote --exit-code --heads origin <branch-that-exists-in-origin>) { $true } else 
{ $false }
```

Ref: [git - How to check if remote branch exists on a given remote repository? - Stack Overflow](https://stackoverflow.com/questions/8223906/how-to-check-if-remote-branch-exists-on-a-given-remote-repository)
