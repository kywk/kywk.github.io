---
title: "Core: Properties"
description: My daily notes
tags:
  - Obsidian
  - PKM
sidebar_position: 20
hide_table_of_contents: true
created: 2023-12-25
image: https://i.imgur.com/mErPwqL.png
---

[Obs] Properties
================

YAML front matter
-----------------

`YAML front matter` 雖然不是 Markdown 文件的標準, 但因常被以 Markdown 作為文件格式的部落格 / CMS / 筆記 / ... 程式廣泛使用, 常見的 Markdown 編輯器幾乎都支援 `YAML front matter` 的編輯, 或是至少不會報錯.

Obsidian 過往對 front metter 支援算是友善, 除了不會因 front metter 報錯外, 也原生支援部分 `Key` 如下:

- tags [标签的使用 - Obsidian 中文帮助 - Obsidian Publish](https://publish.obsidian.md/help-zh/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/%E6%A0%87%E7%AD%BE%E7%9A%84%E4%BD%BF%E7%94%A8)
- alias [为笔记添加别名 - Obsidian 中文帮助 - Obsidian Publish](https://publish.obsidian.md/help-zh/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/%E4%B8%BA%E7%AC%94%E8%AE%B0%E6%B7%BB%E5%8A%A0%E5%88%AB%E5%90%8D)
- cssclass
- publish [发布 - Obsidian 中文帮助 - Obsidian Publish](https://publish.obsidian.md/help-zh/%E6%8F%92%E4%BB%B6/%E5%8F%91%E5%B8%83)

### Plugin support

YAML front matter 可以用來對文章添加屬性資訊, 有些 plugin 會利用 YAML front matter 來作事, 熱門 Plugins - [DataView](#) 就是把文件 front metter 裡的資料當資料庫來搜尋使用. 可以說每份文件中 front metter 裡的資料就像是 NoSQL 的一份 document.


Properties
----------

Obsidian 自 1.4.5 之後, 強化 YAML font metter 區塊, 推出 `Properties 屬性欄位` 的支援, 帶來許多特點.

### Look & Feel ###

![](https://lh3.googleusercontent.com/pw/ABLVV85WCjNBwc8khjV7PDBloQdwElTb1TmqKMWSiWBiPvrnCcPY0SgO6FbllozqMvf2HglBu3jWH7PD6y-1iLy0pfE_ZmK1FsaP6IiFwVpHFyK5Cdhp24vnkbcxFCiSRI4los6icVR8XbUnfuzCb_kCGRSepw=w900-h390-s-no-gm?authuser=0)

最明顯的改變首先是外觀, 原本 Obsidian 的 front metter 區塊並沒有特別樣式, 和文件內容一致. 自己就曾經要修改內文卻編輯到 front metter 區塊的資訊.
而改版後則明顯看得出 front metter 和文件區塊有所區別, front metter 區塊除了顯示 UI 不同外, 還有提示每個欄位的資料屬性.

### Data Type ###

![](https://lh3.googleusercontent.com/pw/ABLVV857COUAsqFgSqlnc43rQoqH6HdwlXaWLR4_fvfsXh-Y6YKZYRy2yyDrlFq__s0p9A9RkyMMEc0xtpLBccP5fH-dvhbf49k6GGldzpdmn9TzNtlDLKIMahUXIX_KN4VV1NzToDkfvby36IQ08jMm0v2R7w=w406-h165-s-no-gm?authuser=0)

發文當下 Obsidian (1.5.3) 的屬性支援以下幾種資料
- Text: 一般的文字資料
- List: Array
- Number: 數字格式, 可被其他 plugin 用以計算
- Checkbox: 適合當作 TODO 使用
- Data / Date & Time: 日期時間欄位, 適合用來標示筆記日期, 或 TODO due day 等等.

### Search by Properties

...TBD...


Memo
----

YAML front metter 配合一些 plugin 就可以玩出許多花樣, 讓 Obsidian 不再只是單純的筆記工具, 從個人 TODO 管理到團隊/中大型專案管理都有諸多案例分享可查.
Obsidian Properties 的支援更是讓 front metter 編輯變得簡單容易, 是個有感的功能.

__2023.12.28 updated__

Obsidian 1.5 的更新中, 針對 Properties 支援再更進一步, 其中最有感的大概是全域更改欄位名稱這個功能吧.

- Properties can now be renamed globally. Renaming will cause the property to be modified in each corresponding file and the search is case-insensitive.
- Global Search: Search now works with non-string property values. Search for boolean values `property:TRUE` or `property:FALSE` or empty values `property:EMPTY`. You can also use inequality operators to search for things like `some_property:>10`.
- Global properties view can now be filtered.

See Also
--------

- [Obsidian 的 YAML Front matter 介绍 by Bon - Obsidian中文教程 - Obsidian Publish](https://publish.obsidian.md/chinesehelp/01+2021%E6%96%B0%E6%95%99%E7%A8%8B/Obsidian+%E7%9A%84+YAML+Front+matter+%E4%BB%8B%E7%BB%8D+by+Bon)
- [YAML front matter - Obsidian 中文帮助 - Obsidian Publish](https://publish.obsidian.md/help-zh/%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95/YAML+front+matter)
- [Obsidian 推出 Properties 應用教學，解救混亂筆記、追蹤遺漏任務](https://www.playpcesor.com/2023/09/obsidian-properties.html)
- [【搭建你的日记本】使用 Properties 与 templates 实现一个日记模板 - 经验分享 - Obsidian 中文论坛](https://forum-zh.obsidian.md/t/topic/22960)
- [Obs133 | Properties (Obsidian 1.4)! 視覺化YAML編輯，讓Frontmatter可用性又向上一階 – 簡睿隨筆](https://jdev.tw/blog/8152/)
