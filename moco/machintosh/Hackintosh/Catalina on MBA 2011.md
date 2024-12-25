---
title: Catalina on MBA 2011
description: Catalina on MBA 2011
tags:
  - Mac
  - Hackintosh
date_created: 2021-05-16T11:45:54+08:00
image: https://lh3.googleusercontent.com/pw/ACtC-3fVXuzPrSrtx2R10grZCwGi5meFEzFOuBSgtw8JrnWZ4N9G2MOCHLb41djGH8w9KeBv3wazMhPvopYCxvlLDcYrhAhB8JwJC4RYb4WkZo2EWUEXVjMquzbs7S5wYhLbasNhNq1nXFXKqZ6pqD4_qNv-8w=w800-no?authuser=0
---

# [Hackintosh] Macbook Air 2011 安裝 Mojava/Catalina

因故拿出閒置已久的 MacBook Air 2011 使用，
升級 brew 套件時發覺不再支援 High Sierra，
而升級 OS 時卻又發現新版 macOS 不再支援舊機型升級。
MacBook Air 爹不疼娘不愛地成了孤兒。

上網搜尋一下發現了 Mojava/Catalina Patcher，
可以讓部分官方不再支援的舊機型安裝新版系統。
其運作原理和 hackintosh 雷同，
仿造官方支援的 EFI 資訊，讓新版 macOS 可以順利跑在舊機型上。

參考比對一些資訊後，決定安裝 Mojava 而非 Catalina，
老電腦效能有限，Mojava 似乎比 Catalina 流暢些。
安裝紀錄於後。

_越獄安裝 macOS Mojava/Catalina 在非官方支援的硬體設備中，仍存有不穩定的風險，後果自負。_

## 準備工作

確認主機型號，並非所有舊電腦都可以透過 Patcher 安裝 Mojava/Catalina，
官方有列出支援的主機，請自行參考官網說明。

![](https://lh3.googleusercontent.com/pw/ACtC-3dL0riUaXnORmvDJUBkVLQYxPWmZByDQMB1PuFagMM5giIdPMBO6k8pyY1j2g9k6tpSTe9UR_LOk5YlNtg5MEWodsATK5e4ruaxO-TSwzjgoi8fppqRW77WQdSRHfHc-KIs2uOU8m8mjZhzYp-jDd8eBg=w593-h538-no?authuser=0)

Macbook Air 2011 系統型號為 `MacBookAir4.2`
在官方支援的機型中，可以進行後續準備動作。

- 16G 以上隨身碟
- [macOS Mojava Patcher](http://dosdude1.com/mojave/)
- [macOS Mojava Installer](https://apps.apple.com/us/app/macos-mojave/id1398502828?mt=12)  
  建議預先下載官方 macOS 系統安裝程序，亦可透過 Mojava Patcher 下載。  
  ![](https://lh3.googleusercontent.com/pw/ACtC-3d_P68vX1FQrc3cOVDFTsZXnykQ_iChRuqJ5IqrUarM4K9RGkGO2455iA67EsHJDgYQC83jwGLpmHA_hAV1z_vywntth5N26A421ZeliQa-9eOzpkt3xOlCgnC28kxn66ZH_9llUpc5LU1NDH-yilQt2g=w800-no?authuser=0)

## 製作安裝碟

將隨身碟格式化成GUID的擴充格式（日誌式）

![](https://lh3.googleusercontent.com/pw/ACtC-3dRH-9ipZmGNjim_uuVggf68nGbBjqlFky4G-2Khhrxvk459_LPCdLx8EsiNXpytFNTIysk2rQd43DM_hzo9ev-yz0vcIooIHOvnkcdt5i5hyZFGhXZYT0KiX0Kh5JnopIscPAaFlEGjS1KX8Ynx9294A=w800-no?authuser=0)

執行 macOS Mojava Patcher

![](https://lh3.googleusercontent.com/pw/ACtC-3f3oCmV_zRbzb6znhnjPs8Cf5bwM--3KtDKIA9d4l3__tF9m8Y1aUgI9fnkCfvcfcdoSrAmoPdnwIx-7n6JZyoFp0M78Ee0qlmSb5VaOamM9wjEu1bQVYdWEwxwE1rnRohgSL5oT2AwblIxKD8LlrKafg=w800-no?authuser=0)

分別選擇已下載的 Installer、剛剛格式化的隨身碟後按 **Start Operation...**

![](https://lh3.googleusercontent.com/pw/ACtC-3dpj2jDzuaPZTYRnBxksbvbfkhcZai1k7gUZaTssI0NOKDqtojW5yqsngQUEyZ5mowvUId7JmNaNKXvf9G3mjbd_inGYQutjXEDuP6Fxji4AVvKGTrjzqXKgJYpPIwsT6Ao17qmvd4wpU7gRoV1fqSdMQ=w800-no?authuser=0)

系統會跳出一些存取權限的請求警示視窗，一一確認後即開始製作安裝碟。

![](https://lh3.googleusercontent.com/pw/ACtC-3c2iIyJr7L8R-CWB4t_vlzThNcrt1pParpZXhLNDlulX-XEOv_lOhuGYrIRWWZoe4QXubXHqibg3xHifzBhcNut3RXOmAui86ACwBypML8lkjnPHnCi3CyPfAP2qw262yIGu1YxONVHbFCKs3hiCkaFUQ=w800-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3dsnASd-CKeHD1Bq-UFWoetPaVGOLVivHOzqPsD4-GseR60nl8ewhcWbvy-DcPoqQyFFYu21jwUpVErZL3HrCGTXDA37w_akjF9fuBrP3pPfyS3pQq1h3IOQjK0IQpXBl9LijItDsXYeSCW3DMsoj6Wsg=w800-no?authuser=0)

## 安裝系統

USB 開機碟製作完成後，在 Macbook Air 2011 上使用隨身碟開機與安裝系統，
安裝選單介面略有不同，但安裝流程和一般安裝 macOS 並無不同。

![](https://lh3.googleusercontent.com/pw/ACtC-3ckHt3xbE-g3RNZtnNNiRHRS6GfD1DyOE4w3hCT8nHnmRPYNp5p78U9Q-45fYQsfQxTSYLvrzoa3h1rBGdcC2k5JlKgeFu48kkP2oC0IHNZPn-9iqPvX2CWBoVsAICaPloJkEHtanT368Nfhk0Gurjh5A=w800-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3cpHHeOmeZIaXnKjuOwIieW-yiM_1vz-Fore8QbOWSih_YQoFRWuya1vIiGFbOJEVOb8YOw4BExcMqs0gZAz1tSOfNryy3xaR90dYjxO9_docDjLCLWh1n6My-i-8QckwATQ2ZWoJG496eiIeO3EkjJtg=w800-no?authuser=0)

安裝完成之後，會重新啟動電腦。
正常來說，重新啟動之後就完成系統安裝，
不過不要忘了這台電腦是不被原廠允許安裝這個作業系統的，
所以需要再次透過 USB 隨身碟開機，安裝修正檔。

## 安裝修正檔

第一次開機的時候按下 `Option` 不放，再次選擇USB安裝磁碟。
這次回來安裝畫面之後，選擇下方的這個 `macOS Post Install`。

![](https://lh3.googleusercontent.com/pw/ACtC-3dBw1ew6bzjvSHFQP-hRlQ2jsQRXMFpIDu2z205QA4AGueR7HU4I8k9Qj-eaNxSNYRYGZn7SKrHbl63B8vfkc0ZHLy_vASySS5Xb4Z9IPGY-g0MzmEKhRVEjce52jG6aeOILk1a8mfYjjzjNLpDrFu77g=w800-no?authuser=0)

執行之後，軟體自動判斷你這台機型應該是哪台，
可以確認一下軟體判斷的是否為前面步驟所查的型號 `MacBookAir4,2`
下面這一堆有的打勾、有的沒打勾的，就是適合這台安裝的一些修正。

![](https://lh3.googleusercontent.com/pw/ACtC-3dOAiY-38JGULik-odL_9inPHKGsiCrSQlWAFcCcBZVDg4P3Gmn2O65rL8wVcxrKzzLi5c4x_S5TlRs-j3cFW5rd4pQX6JN_2X2KRf_nCdMPuXognH7CLfKU8rhfgF1sOUFGNbnYOuWzk_c1IzD8GH5Pw=w800-no?authuser=0)

選擇所要安裝的系統磁碟後安裝，
等候修正程序安裝完成之後重新開機就可以正確進入 macOS 10.14。

![](https://lh3.googleusercontent.com/pw/ACtC-3c6NmV2FD-LJxXEq9ISRSFPnOvmLSeOD23zZFq1DnAA6Nrr--K00enPtEFXvLxRhPn6zh0eSThdkiQQrXQgpVDmf1MshbGhOuB2uEeAQ0kGK2k0m_0oghTBcBsC9BmG--Ebkbr4bMhbFSUAkl19IQqMZg=w698-no?authuser=0)

第一次進入系統後會自動跳出 Patch Updater，
讓他自動安裝需要的更新後再次重新開機，就可以快樂使用 Mojave 了。

![](https://lh3.googleusercontent.com/pw/ACtC-3e4qtQeJ6g7G3LPmgGIrUOrOW0zNEfMpXLoYp2xw2Mgx8MyXy7j0p2oBZCj_M8p4mSmEJV_AhKCyBOy6CXbeC-B3bKw-50rUwQxYf2KltUYFCTS7mLCFNBZJtmM3CORK5c8-31a7XxLjnoDU6m5iJuLLA=w800-no?authuser=0)

後續的系統更新有時可以直接安裝，有時會有問題。
出錯時大多情況下重新跑一次 Patch Updater 即可。
不過在進行系統更新前，最好先去 Mojava Patcher 官網確認支援情況後再更新。
也就是非必要的話，無須第一時間更新系統。

## 後記

因手上其他筆電皆為 macOS BigSur，介面操作和權限管理上和 Catalina 較為相近，
所以又把 MacBook Air 重新安裝 Catalina。

安裝流程大致雷同，就不另筆記了。

## See Also

上述流程和參考資料幾乎一樣，有部分內容也是直接引用參考資料。
所以發文，一來自己紀錄過會比較有記憶點，
二者網路資源隨時消逝，可能下回有需要安裝時就找不到資源了。

感謝前人整理的資訊，本篇安裝筆記分享之。

最後再次提醒：  
_越獄安裝 macOS Mojava/Catalina 在非官方支援的硬體設備中，仍存有不穩定的風險，後果自負。_

- [[OS X] 《吉米教你用》JB的方式讓你的老Mac可以跑macOS Mojave 10.14 - iPhone4.TW](https://iphone4.tw/forums/showthread.php?t=221017)
  - [[OS X] 《吉米教你用》JB的方式讓你的老Mac可以跑macOS Catalina 10.15 - iPhone4.TW](https://iphone4.tw/forums/showthread.php?t=221260)
  - [非支援機種 macOS 10.15 Catalina USB 安裝工具與重灌 | 民樂電腦](https://7--8.com/how-to-create-a-macos-catalina-10-15-unsupported-usb-installer/)
  - [在官方不支援macOS Catalina的裝置安裝macOS Catalina - 酷小易](https://blog.steveyi.net/macos-catalina-on-unsupport-mac/)
  - [macOS Catalina Patcher(如何在旧mac上安装Catalina系统) - 知乎](https://blog.steveyi.net/macos-catalina-on-unsupport-mac/)
- [如何取得舊版 macOS 作業系統 - 我和我的黑蘋果](https://www.imacpc.net/archives/3864)
