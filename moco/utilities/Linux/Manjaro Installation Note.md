---
title: 'Manjaro: 安裝紀錄'
description: 'Manjaro: 安裝紀錄'
tags:
  - Linux/Manjaro
  - Linux
  - kywk
date_created: 2022-05-11T04:01:39.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AM-JKLU2Ot2TyON1chUA-Qw7qj-OQSRMYNin7jsJsUa3E_jwqq1JbwTZZckUtJmNZmqxY5M4egm-ryt4g3Ope_0EqHBrCDSEHmcy-goHRzWh-ZgguUoy1XKpyS1DNx8aV92vAkAM0zZOW6EZR4KS3W1DClQKhw=w800-no?authuser=0
slug: /utilities/Linux/Manjaro-Installation-Note/
---

[Manjaro] 系統安裝紀錄 2022.May
============================

__Updated: [[11-07-bye-manjaro|2022.11.07 暫時棄用 Manjaro]]__

因緣際會入手 ThinkPad T470, i7-7500u / 16G / 128+256 SSD / 雙電池的規格,
鍵盤手感, 整機質感... 等, 仍舊是那熟悉的 ThinkPad T 系列表現.

原本安裝了 Win 10 / macOS BigSur 雙系統使用. 
但黑蘋果下 CPU 耗電 / 喚醒 / LCD 亮度調整等一直有問題, 也沒太多時間進一步折騰.
偶然決定轉往 Win 10 / Linux 雙系統使用. 重溫 Linux Desktop, 重新熟悉 Linux 環境下的工作日常. 

許久沒使用 Linux 當桌面環境, 
在 Xubuntu 22.04 / elementary OS 6.1 / ... 等各種 LiveUSB 幾番測試後, 
最終決定落腳評價相當不錯的 Manjaro.

![](https://lh3.googleusercontent.com/pw/AM-JKLWCIDA7C0whwtLICjA-S34CPQh8BAk35XzE4U7yy3-JgN-hC_aEMYdFSc6Z-x3reElOjdWF4E0C-ORdgwHVMrzKLyj_i08T0kYNaYTRGX82fXY9BPLlBCPsHinzNEX9MMO5DpP5EUIvYMZ-eJXRkVO1bQ=w800-no?authuser=0)

網路上有許多各個系統的主客觀評價和分析, 
使用 Manjaro 主要因為他是基於 Arch Linux 衍申發展的桌面環境.
不想再使用 ubuntu 的嘗鮮心態, 加上 LiveUSB 時覺得順眼, 相當主觀印象所作的決定.



## First impression ##

有段期間 ubuntu GNOME 桌面風格改來改去, 
資源耗用多也不好看, 實用美觀都未令人滿意.
自從換了 xubuntu 後就愛上他的輕巧. 實用之餘, 好好客製調整, 也挺賞心悅目的.  

這回繼續選用 Manjaro Xfce 版, 使用 Live USB 安裝完系統後, 熟悉的界面回來了.   
而包含顯卡 / Wifi / 藍芽等筆電的主要硬體設備都可以正常工作. 大幅降低 Linux 的學習曲線. 
至於指紋辨識, 讀卡機等因尚無需求, 尚未進一步測試.

![](https://lh3.googleusercontent.com/pw/AM-JKLU6RW7IsT8PDr8j618y8gH-3egMOi53AUE-l8Rvbu9V5XHzDtBNbPsA9j63MgVMRWCaZ3GllYeidOuydk3A8wGf3osEZnrmRZYe0FExyBsnC3fvpS3llxsVBvsWBTnk0iYgeF5HIjFEvgYoH8GB3P212A=w800-no?authuser=0)



## Package Manager ##

第一次使用 Manjaro / Arch Linux 系統, 安裝軟體時都得先 Google 一番.
如: _manjaro install chrome_, _manjaro install dropbox_... 等.

網路上回答和教學各有不同, 進而慢慢了解 Manjaro / Arch Linux 套件管理.  
Manjaro 上有幾種不同的套件管理方式, 官方論壇有著許多討論:  
[Pacman vs Pamac vs Yay - Newbie Corner - Manjaro Linux Forum](https://archived.forum.manjaro.org/t/pacman-vs-pamac-vs-yay/122495/2)
> They all install packages:  
> 
> __pamac__ is Manjaro's package manager and it can install packages from the Manjaro repos or AUR  
> __pacman__ is the package manager from Arch. It can only install packages from the repos.  
> __yay__ is a wrapper that can install packages from the Manjaro repos or AUR.  
>  
> Feel free to use whichever you prefer  
>  
> EDIT: pamac also has a GUI version available pamac-manager which is in the menus as "Add/Remove Software"

Manjaro 並不使用 Arch 的套件庫, 而是使用自行維護的軟件庫.
官方表示他們會對軟體進行較詳細的測試後才上架, 
好處是系統較為穩定有保障, 但缺點則是部份軟體更新會較慢. (可透過 AUR 解決, 如後敘述)

### Pamac ###

[Pamac (Add/Remove Software)](https://wiki.manjaro.org/index.php/Pamac) 
是 Manjaro 預設的 Package Manager, 有 GUI 界面.  
Manjaro Desktop 安裝完成後, 可在 Application 選單上找到.

![](https://lh3.googleusercontent.com/pw/AM-JKLW7hPZ9Hjx3TMb2mo5O21FMrQ3-GDHI0YfAdwBcjcSr9XIkGswayNGGub1aY2JXnCDn1SWxvX9OKFSW1vpEr4X5qIa7vE7L8u65_RIs1mVcUR8rhzfA6Tw-zU6bdBIpBeItDDGS-RCWEuINuyzUFF0-xA=w800-no?authuser=0)

pamac 的 GUI 界面簡化了初學者對 Linux 套件管理的門檻, 界面簡單但功能齊全.  
清晰列出了已安裝和可更新的套件 / 分類搜尋 / 簡介和相依性等的資訊, 都相當明確實用. 

#### AUR ####

[__Arch User Repository (AUR)__](https://aur.archlinux.org/) 
是 Arch Linux 社群維護的套件庫. 
AUR 由社群組織和分享新軟體, 可以豐富 Arch Linux 上的軟體資源, 
藉由社群力量, 加速主流軟體進入官方套件庫的時間.

AUR 也是開發人員在新軟體被納入 Arch 官方套件之前, 向 Arch Limux 提供軟體的途徑.
[_什么是 Arch 用户仓库（AUR）以及如何使用？ | Linux 中国 - 知乎_](https://zhuanlan.zhihu.com/p/129855163)
這篇文章中有對 AUR 較進階說明. 

社群維護的 AUR 安全風險相對較高. 也曾發生被值入惡意程式事件: 
[Arch Linux的AUR儲存庫部份套件程式碼被加料，勿輕忽社群程式碼儲存庫安全風險 | iThome](https://www.ithome.com.tw/news/124481)  
官方也提醒使用者不要太相信 AUR 上的內容. 

Manjaro Linux 預設並不使用 AUR 套件庫, 可在 Pamac GUI 上啟用:  
`Perfreences > Third Party > Enable AUR`

![](https://lh3.googleusercontent.com/pw/AM-JKLU-EID0jSUZ0NO6JivrL_ytloDPc_CbS_7C8dYPqN_dl1j15ciwc3rEF_YfTWQqR5ViTmu7yyYUrVa1aDvD_TKcL4AaIQl0oZZCQsCgAaTpOPe0mLsyg8T2EorQAGgxfUImUgHnyLm7YH6uKeH_C7SJ-Q=w600-no?authuser=0) 

### Pacman ###

[Pacman](https://wiki.manjaro.org/index.php/Pacman_Overview) 
是 Arch Linux 上的 package manager,  
Manjaro 是基於 Arch Linux 衍申發展而來, 官方對 Pacman 說明如下:

-   Pacman is already installed in Manjaro Linux by default
-   Pacman is mainly developed/maintained by Arch Linux developers
-   Pacman can only be used from the command line.
-   Pacman can only use the official Manjaro repository. 
    There are separate articles available for accessing the Arch User Repository(AUR), 
    using flatpaks and using snaps

官方文件感覺起來, Manjaro 上雖保留了 `pacman`. 但並不特別建議使用.  

然而 pacman 上有些 pamac 所沒有的進階功能, 實務上常是 pacman / pamac 混用的.  
網路上許多文件也常可見 pacman 和 pamac 交錯使用的情況.

### Yay ###

Yay 是用 Go 寫的 AUR Helper.    
AUR 上的套件包原則上是需要編譯後安裝的, 
AUR Helper 主要協助 AUR 套件下載編譯安裝流程.
Yay 只需一個命令即可更輕鬆地安裝, 更新或刪除, 為多數用戶騰出在系統上花費的時間.

Manjaro 預設並不會安裝 yay, 需手動安裝:

```shell
sudo pacman -Syu
sudo pacman -S yay
```

### Snap ###

Snap 是 [Ubuntu 推的通用 Linux 套件格式](https://blog.longwin.com.tw/2016/07/ubuntu-linux-common-package-snap-2016/).
Snap 不是要取代原本的套件管理系統, 主要是用來發佈管理第三方套件 (不管有沒有 Open Source).

Linux 系統是否要支援 Snap 雖有爭議, 如 [Linux Mint決定不支援Ubuntu Snap](https://www.ithome.com.tw/news/138756),  
目前可在 Arch, Debian, Fedora, Ubuntu, ... 等環境使用.

Manjaro 也支援 Snap 格式, 需自行安裝相關套件管理程式:  

``` shell
sudo pacman -S snapd
sudo systemctl enable --now snapd.socket
sudo ln -s /var/lib/snapd/snap /snap
sudo snap install snap-store
```

Ref: [Install Snap Store on Manjaro Linux using the Snap Store | Snapcraft](https://snapcraft.io/install/snap-store/manjaro)



## Look and Feel ##

我的 T470 螢幕是 14" FullHD, 預設解析度文字偏小, 
在 Windows 10 下縮放為 125% 後比較清楚順眼.
Xfce 下調整縮放的設定可從 `Setting > Apperance > Fonts` 中的 DPI 調整.  

安裝完後預設是 96, 對我來說字體太小了, 調整到 128 後比較舒服.
![](https://lh3.googleusercontent.com/pw/AM-JKLUAXnzZ8Uo1Cdfj2sVsg4qHcvlQLkjxYg75KlHUFs5FSr62i_-z2O-InoZyCcXfvk-5sBlFYrWwrjnuoGQzFyHWWNb2-qlEwaINwwNoucLUEo4XJaqrbo5BRHIiz5Q5RFA3n2MNUPmi5GkKr3rsPqfKHQ=w734-no?authuser=0)


## macOS BigSur Like ##

剛安裝完系統和一些常用軟體後, Youtube 推薦影片上跳出 [UPDATE : How to Customize Your Xfce Desktop Look Like macOS Big Sur | Version 2.0 - YouTube](https://www.youtube.com/watch?v=uvvoJU69uNo)
看來網路足跡追蹤真的無所不在.

不過 macOS BigSur 系統樣式真的好看, 也適合長期使用 MacBook 的我.
跟著影片一步步設定安裝, 套用教學中的主題:

[[linux_xfce-macos-looks|[Xfce] 桌面 macOS 化設定記錄]]

## See Also ##

重回 Linux 桌面環境, 初步感覺 Linux 在桌面使用下已脫胎換骨.  
對 Manjaro + xfce + BigSur theme 相當滿意.
目前除了 Hotcorner 和 screenshot 尚找不到合用軟體外, 
其餘和自己在 macOS 下的使用已相去不遠,
畢竟常用的就是開發工具, 這些軟體在各平台都是支援的.

本文即是 Manjaro 下完成. 
也許日後會改變心意, 等日常使用一段時間後再寫篇心得回顧, 以及配置上的調整吧.


-   Manjaro user note
    -   [Manjaro初次使用報告—簡約而不簡單 | 青鳥脈博](https://archer1609wp.wordpress.com/2018/04/29/manjaro-first-look/)
-   Desktop Theme / Tweak
    -   [教你如何将 Manjaro xfce 美化的像 MacOS](https://linux265.com/news/6612.html)
    -   [Manjaro安装、美化 - 丑心疼](https://blog.csdn.net/weixin_30599769/article/details/101364443)
