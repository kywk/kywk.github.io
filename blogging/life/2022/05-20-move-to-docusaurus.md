---
title: Hello Docusaurus
description: 2022.05.20 Why move to Docusaurus
authors: kywk
tags: [docusaurus, blog]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: true
---

在 [PJCHENder 未整理筆記](https://pjchender.dev/) 看到 [Docusaurus](https://docusaurus.io/) 這套 CMS.
查了一下才知道原來是 Facebook 推出, 適用於專案文件的靜態網站生成框架.

比起一篇篇獨立文章的部落格系統, 覺得 Docusaurus 更適合心得筆記整理用. 
剛好原本使用的 Hugo Theme 不合適, 正在找新主題, 
試用後, 決定轉往 Docusaurus 重新建構. 

<!--truncate-->

__決定轉換系統主因有幾點__

1.  部落格系統偏向一篇篇獨立文章, 文章彼此連結性不強烈, 結構也不清楚. 
    而心得筆記該有的結構關係, 透過部落格系統加上 `catelogy` `tag` ... 等輔助, 
    雖勉強可用但不盡如人意.
2.  心得筆記會不時更新, 而部落格系統以日期為主的文章陳列方式, 對筆記整理意義不大. 
3.  Docusaurus 原生專注於專案文件, 對於程式語言呈現相當友善. 
    側邊欄 / 文章主體 / TOC 基礎版面清楚明瞭. 心得 CMS 很合適.
4.  Docusaurus 有限客製化, 無須花費過多時間調整版面, 可專注於文件內容編寫.
5.  Docusaurus 有 Blog 支援, 筆記文件放 `docs`, 日常文章放 `blog`.
    筆記文件和部落格文章可以清楚分割. 

當時從 Hexo 換到 Hugo 主因是快! Hugo 生成速度遠快於 Hexo. 
而現在卻從 Hugo 換到比 Hexo 更慢的 Docusaurus. 
除了上述優點外, 透過 `GitHub Action`, 讓網站生成工作交由 GitHub 處理, 速度就不再是問題.

官方說明很清楚, 網路上文章也多, 基礎轉移沒遇到問題. 
倒是個人一些特殊需求, 試了一下才解決.

__Obsidian__

我的 Markdown 文件都放在 Obsidian Vault 下, 藉由 Obsidian 來建構筆記資料庫.
Hugo 框架可以透過 symbolic link 連結到 Obsidian 下的目錄, 而 Docusaurus 則會報錯.

還好 Obsidian 有 [Symbolic links](https://forum.obsidian.md/t/symbolic-links-symlinks-folder-links/1058) 需求的人不少,
透過 [symlinks-obsidian](https://github.com/chrisdmacrae/symlinks-obsidian/) plugin 
可以讓 Obsidian Vault 下的 symbolic link 正常工作.

如此, 反其向而行. 
文件放於 Docusaurus 工作目錄下, 在 Obsidian Vault 下建立 symbolic link 連結過去.
Docusaurus / Obsidian 都可以正常運行.

__node_modules__

這也是一般情況不會發生, 個人習慣衍生的問題.

我的 Docusaurus 工作目錄放在 Dropbox 同步, 為了節省空間, 
會把 `node_modules` 移到本機目錄後, 建立 symbolic link 連結.

發現有趣的是, 更改 `node_modules` 名稱後, 建立的 symbolic link 會出錯:

``` shell
[~/Dropbox/mySite] $ mv node_modules ~/node_modules/Docusaurus
[~/Dropbox/mySite] $ ln -sfF ~/node_modules/Docusaurus node_modules
[~/Dropbox/mySite] $ npm start

node:internal/errors:465
    ErrorCaptureStackTrace(err);
    ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@docusaurus/logger' imported from /home/kywk/project/node_modules/Docusaurus/doc/@docusaurus/core/bin/docusaurus.mjs
  ...
  code: 'ERR_MODULE_NOT_FOUND'
}
```

而若維持 `node_modules` 資料夾名稱, 則不會報錯:

``` shell
[~/Dropbox/mySite] $ mv node_modules ~/Docusaurus/node_modules/
[~/Dropbox/mySite] $ ln -sfF ~/Docusaurus/node_modules
[~/Dropbox/mySite] $ npm start

[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at http://localhost:3000/moco/.
```

Docusaurus 慢慢探索搬中. 初步印象, 85 分!
