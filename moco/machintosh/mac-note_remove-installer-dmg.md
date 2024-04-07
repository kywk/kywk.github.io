---
title: "Note: 刪除 Installer 映像檔"
description: remove macos installer
tags:
  - Mac
sidebar_position: 60
date_created: 2021-05-20T17:43:46+08:00
image: https://lh3.googleusercontent.com/pw/ACtC-3cDul66SHDP7oBSL7YOlMBo-SJl26dxZ8JYRv_9BfehLRz0El7Af6HPSRaBXo50ExW2q4oiF4cHsBmeAxq9Jj3GOJQYd4hjQ_MJIQf16HDYM12QvcbkhLLvFYRVY290eKrzn6rOyfiH-kCCHtdB7efiYg=w800-no?authuser=0
---

[Mac] macOS BigSur 刪除 Mojava/Catalina 映像檔
============================================

在 Big Sur 下載 Mojava/Catalina Installer, 製作完 USB 開機碟後,
要刪除時卻殺生無法刪除的錯誤訊息:

![](https://lh3.googleusercontent.com/pw/ACtC-3ffdLlnCmW8o_SFteTCsMZJFCM5U8C6j35XsaBaHm4_i3ZNyUAa61GW3VXCgW35L94wrKJfVcGFh4w1O0ceIFsr60TZS7U8olpgKwjmVGIB8pOMSmFVq9wuFrArEF20pCCTf59nUTe4udddaJ2XRUzDMQ=w800-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3e7r1g01lsEkcBDvycuOuJeEF7TaggbT9zWFpu7DgIaXo9-no5EgP0Ww-kSNGmaYsRGqQjTUZnufaVLHg5aFyTS8QuFIZqQZ8WCtTT9UStricHnqQTmBN9xpk-owXWZAcbso_1IXK_V4KPZJEJxRmYYvA=w808-no?authuser=0)

重新開機, 檢查系統所有運行程序, 看不到疑是正在使用該檔案的程序,
原本猜想可能是哪個系統程序, Google 後才發現是 SIP 若的禍.


### SIP ###

在 OS X El Capital 及後來的版本中, macOS 多了個與系統安全有關的模式 - 
__系統完整保護 (System Integrity Protection, 簡稱 SIP)__.
能在一定程度上保護 macOS 避免一些惡意軟體侵襲.
但也會造成少數正當程式無法安裝, 
或像這次的情況一樣, Installer DMG 無法刪除等奇怪問題.

而 macOS SIP 該不該打開眾說紛紜, 對於工程師或資深玩家來說, 
SIP 大多時候是造成困擾的, 因此也有不少建議關閉的文章.

-   [macOS安装某些应用为什么要关闭sip，关闭sip的利与弊_放飞梦想展翅高飞的博客-CSDN博客](https://blog.csdn.net/qq_45036710/article/details/103696230)
-   [关闭 macOS 的 System Integrity Protection 有哪些风险？ - 知乎](https://www.zhihu.com/question/40239893)


### 檢查 SIP 是否啟用 ###

``` shell
$ csrutil status
```

![](https://lh3.googleusercontent.com/pw/ACtC-3cj8SH0sp2wLMQ64l1dVklfsRrqtRVxPcotYL4i5shNhKDT6jTjwVIRiDYajjNv8xtwFIx43uZCS7mbv-RNVtCgu3AxcTpdoiWusV0szYY_JaXGAg999OspdkMH9oFXoOy8gSN878uqBmhUGJ8XZilpag=w800-no?authuser=0)


### 關閉 SIP ###

重新開機後按住 `Command` + `R`, 進入復原模式.
實用工具 > 終端機

``` shell
$ csrutil disable
```

輸入後重新開機回 macOS, 就可以把映像檔刪掉了.


### 開啟 SIP ###

只要有良好電腦使用習慣, 關閉 SIP 並不會損害電腦. 
使用習關不佳, 打開 SIP 也不會比較安全.
不過若想維持系統預設狀態, 可以重新開機到復原模式下啟用 SIP.

``` shell
$ csrutil enable
```

-   [Disabling and Enabling System Integrity Protection | Apple Developer Documentation](https://developer.apple.com/documentation/security/disabling_and_enabling_system_integrity_protection)
-   [[教學] 如何關閉 Mac 上的系統完整保護（SIP）](https://www.fonepaw.hk/tutorials/disable-system-integrity-protection-mac.html)
-   [macOS 开启或关闭 SIP - 少数派](https://sspai.com/post/55066)


### 後記 ###

近來蘋果高層抱怨 macOS 惡意軟體的新聞不少, 以後 macOS 版本類似保固機制可能會越來越多.
-   [開放用戶安裝未授權軟體！蘋果坦承Mac存在大量惡意程式 | 科技 | 新頭殼 Newtalk](https://newtalk.tw/news/view/2021-05-20/576279) 
-   [Craig Federighi：Mac惡意程式多到不可接受 » 網路資訊雜誌](https://netmag.tw/2021/05/21/craig-federighi：mac惡意程式多到不可接受)

如何在保護和使用便捷之間尋得最好的取捨,
相關議題 Windows 可說一直是不及格的,
期待 macOS 能優雅的找出解法.
