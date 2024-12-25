---
title: "HTTP: CSRF"
description: Cross Site Request Forgery
tags:
  - Security
  - HTTP
date_created: 2022-09-20T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

CSRF (Cross Site Request Forgery)
=================================

> 中文資源優先推薦 [零基礎資安系列（一）-認識 CSRF（Cross Site Request Forgery）](https://tech-blog.cymetrics.io/posts/jo/zerobased-cross-site-request-forgery/) 這篇, 
淺顯易懂, 易於了解.  
>
> _本文為資訊收藏整理, 多數內容節錄其他參考資料, 哪天我要選市長時請別拿這個來打我._


前言
----

零基礎資安系列前言的例子挺有趣的, 抄襲如下:

> 陌生人＝ Hacker / 菜單 ＝ Request
> 桌號＝ cookie / 老闆＝ web server / 你 ＝ User
> 
> 想像你到一家餐廳吃飯, 陌生人拿了一張有你桌號的菜單點餐之後給老闆. 
> 結果老闆問也不問便收了菜單並將帳記到了你的身上. 這就是 CSRF 的基礎概念。

這個例子來說, 以吃貨角度, 廚房做錯單, 喜歡的菜色就收下, 不喜歡就請服務生退回, 影響不大.
不過若是像一些酒吧是報桌號記帳的消費模式, 爭議就大了...

所以到底什麼是 CSRF 呢?


CSRF
----





See Also
--------

- [零基礎資安系列（一）-認識 CSRF（Cross Site Request Forgery）](https://tech-blog.cymetrics.io/posts/jo/zerobased-cross-site-request-forgery/)
- [讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
