---
title: The Future of the GitLab Web IDE
description: 2022.05.24 The Future of the GitLab Web IDE
authors: kywk
tags: [gitlab]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: true
---

[GitLab 發表新 WebIDE 的特色與整合說明](https://about.gitlab.com/blog/2022/05/23/the-future-of-the-gitlab-web-ide/), 
是以 VS Code 核心引擎 [Monaco](https://microsoft.github.io/monaco-editor/)
開發整合而來的.

<!--truncate-->

> The Web IDE is built on top of the fantastic open source project, Monaco. 
> What made Monaco a great choice as the foundation of the Web IDE 
> is also what makes it more difficult to address all these concerns holistically. 
> Monaco is just that: a foundation. We have to implement all these workflows 
> and features ourselves. Meanwhile, another open source project has been 
> laser-focused on delivering a lovable IDE on top of Monaco.

VS Code 確實是 Microsoft 近年來最受歡迎肯定的產品專案. 
以 VS Code 為基礎整合開發其實合理. 但因微軟同時擁有 GitHub, 整件事變得有趣.

> It's interesting to me that GitLab is adopting a Microsoft product 
> (VS Code) and Microsoft owns a significant competitor in GitHub. 
> Nothing intelligent to say about that other than to wish 
> I'd been a fly on the wall for the discussions about that.

[Hacker News](https://news.ycombinator.com/item?id=31487079)
上許多討論為何 GitHub 身為 GitLab 最大的對手, GitLab 卻選用了對手母公司的專案作為核心功能.
順便把曾經被 GitHub 號稱的 21 世紀 IDE - [Atom](https://github.com/atom/atom) 抓出來鞭屍一下.
