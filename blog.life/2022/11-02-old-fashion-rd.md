---
title: Old Fashing RD style
description: 2022.11.02 Develop in old fashion
authors: kywk
tags: []
cover: https://lh3.googleusercontent.com/pw/AM-JKLXZZHmidSgMMB2k8blkneclNRysPXLr__G7rZ4hPi2sN0jC67PHAbX1MyFj8hQX_MTZ6bwIMPwCyu2fu1bU0ZXSX09eu-OlSDb4U-9haUS_wgnVPLaCM6WQLsRbsnocF8X5Edmt35rDjytljbNEMsaf8A=w800-no?authuser=0
hide_table_of_contents: true
---

老派開發的必要
==============

Chrome 推薦了這篇: [7 Shorthand Optimization Tricks every JavaScript Developer Should Know 😎 - DEV Community 👩‍💻👨‍💻](https://dev.to/ruppysuppy/7-shorthand-optimization-tricks-every-javascript-developer-should-know-4fj5).
如何利用 JS 語法特性, 精簡程式碼.
大多值得參考, 尤其是文章底下的回應討論, 有更多可以偷得技巧.

特別引起注意的是 __For-of and For-in loops__ 這章節, 
`for-of` 確實能程式看起來精簡易讀, 但會不會有效能問題?
查了幾篇文章和討論, 雖然最終結論偏向於各有利弊. 
不過多數情況下, `for-of` 效能是和 `for (let i = 0; ....)` 老派宣告方法不相上下的.

接手的專案前人的習慣對陣列元素的處理會大量利用 .map / .reduce / .filter / ... 等方式.
也許慢慢將這些程式碼改成 `for-of` 的宣告, 也可能改成最最傳統的 `for (let i = 0; ....)`.


老派開發, 除了多數情況下都是效能指標外, 更無須擔心新語法平台支援度問題.

敬, 永遠年輕的老靈魂.

Ref. [Performance of JavaScript .forEach, .map and .reduce vs for and for..of](https://leanylabs.com/blog/js-forEach-map-reduce-vs-for-for_of/)  
Ref. [Functional Programming vs. Vanilla Javascript - FBRS](https://www.fbrs.io/ramda/)
