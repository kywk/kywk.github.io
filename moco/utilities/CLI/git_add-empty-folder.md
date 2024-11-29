---
title: "Git: add empty folder"
description: Add empty folder to git
tags:
  - Git
hide_table_of_contents: true
date_created: 2021-05-10T00:00:00+08:00
cover: https://lh3.googleusercontent.com/pw/ACtC-3c1Fcx8ZIVYrXBrmLfZUFhSnpBJqiUgVL36d3S6x_VzJ0a0JzmkF__USqKP6HCuphBVaLiWP5Vf0Qv2l-WzrdNy3h2G_emtP9mNa82Y2FySF8wu42FOSOySVj-7hf-yuabf58RkxPr-Lv8PvX172gAtYA=w800-no?authuser=0
---

[Git] Add empty folder
======================

> 如何提交空資料夾?

最近專案中不斷被問起這件事, 為了日後管理維護方便, 
案主期待 git 裡面能夠預先建立對應的資料夾樹.

而 git 設計是無法提交空資料夾, 
雖然網路上可以找到一些 hack 的方式可以在 git 裡加入空資料夾,
但可能因不同 git 版本關係, 在 checkout 時無法建立對應資料夾.

通用解法是在該資料夾底下新增一個不影響程式運行的檔案.
常見的有 `.gitignore` `.gitkeep` `README.md`


### .gitignore ###

若該資料夾不該保存任何程式資源, 只是為了專案特殊需求而必須存在資料夾, 
可新增 `.gitignore` 檔. 內容範例如後:

``` shell
$ mkdir <NEW_FOLDER>
$ cd <NEW_FOLDER>
$ vi .gitignore

# Ignore everything in this directory
*
# Except this file
!.gitignore
```

往後專案開發在該資料夾放任何檔案, commit 時都不會被加入 git 倉儲, 
checkout 時也不會產生衝突或影響.
適合當作不同環境會有所不同開發測試資源, 臨時資料夾等.


### .gitkeep ###

在資料夾底下新增一個 `.gitkeep` 的空白檔案,  git 就不會認為是空資料夾了.
雖然命名很像 Git 的系統檔案, 但其實不是, 它只是個普通檔案.

這個方式可以保存資料夾, 日後資料夾有檔案增減時, 亦會被提交到專案倉儲.

_題外話: 在 gitlab web 上新增資料夾時, gitlab 也是新增 .gitkeep 檔來處理空白資料夾的提交._

``` shell
$ mkdir <NEW_FOLDER>
$ cd <NEW_FOLDER>
$ touch .gitkeep
```


### README.md ###

和新增 `.gitkeep` 一樣, 在空資料夾下新增 `README.md` 檔案, 就不是空資料夾了.

不同的地方是 `.gitkeep` 會被視為系統隱藏檔, 大部分開發工具都會忽略它的存在,
而 `README.md` 則是個一般檔案, 要注意開發工具會不會引用而出錯.

若開發工具不會因為 `README.md` 出錯, 且專案是多人共同開發, 
新增個 `README.md` 簡單說明一下該空資料夾作什麼用途,
是對團隊較為友善的方式.

``` shell
$ mkdir <NEW_FOLDER>
$ cd <NEW_FOLDER>
$ vi README.md

WHO CREATED THIS FOLDER
WHY THIS FOLDER EXIST
WHAT THIS FOLDER WORKING FOR
```


### Reference ###

-   [How can I add an empty directory to a Git repository? - Stack Overflow](https://stackoverflow.com/questions/115983/how-can-i-add-an-empty-directory-to-a-git-repository)
-   [【狀況題】新增目錄？ - 為你自己學 Git | 高見龍](https://gitbook.tw/chapters/using-git/add-folder-to-git.html)
-   [git提交空資料夾 - IT閱讀](https://www.itread01.com/content/1542022390.html)
-   [XYZ的筆記本: Git commit 空資料夾](https://xyz.cinc.biz/2014/03/git-add-empty-directory.html)
