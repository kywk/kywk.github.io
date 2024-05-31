---
title: Don't DRY
description: "[HN Daily] Don't DRY Your Code Prematurely"
image: https://lh3.googleusercontent.com/pw/AM-JKLXZZHmidSgMMB2k8blkneclNRysPXLr__G7rZ4hPi2sN0jC67PHAbX1MyFj8hQX_MTZ6bwIMPwCyu2fu1bU0ZXSX09eu-OlSDb4U-9haUS_wgnVPLaCM6WQLsRbsnocF8X5Edmt35rDjytljbNEMsaf8A=w800-no?authuser=0
authors: kywk
tags:
  - HN
hide_table_of_contents: true
---

# Don't DRY Your Code Prematurely

前些日子團隊針對 Code Quality 進行了討論, 其中重造輪子是團隊成員相當在意的一個部分. 恰巧今日看到 
[Google Testing Blog: Don't DRY Your Code Prematurely](https://testing.googleblog.com/2024/05/dont-dry-your-code-prematurely.html) 
這篇上了 [HackerNews Daily Top 10](https://news.ycombinator.com/item?id=40525064) 的熱門討論.

> Applying DRY principles too rigidly leads to premature abstractions that make future changes more complex than necessary. 
> Consider carefully if code is truly redundant or just superficially similar.

觀點出發有些類似 __過早最佳化是萬惡的根源__, 在未確定是否為效能瓶頸時進行優化可時反而會適得其反,
在未確定是否為 functional redundant 前進行程式複用的加工, 有時反而會讓程式變得複雜.
