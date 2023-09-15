---
sidebar_position: 1
title: "系統安裝紀錄"
tags: ["Mac", "kywk"]

date: 2021-02-26T14:05:03+08:00
images: ["https://lh3.googleusercontent.com/pw/ACtC-3cYYtkzJjo_oG7Gzqq8T8XQm4V_qLE3wGWVKOahp6YT4lo-on60NJmjrkkatnizX1b-uID-MCM2ztsXH9z27cMRtql3PA5cpYZYbMfSPuM5Yh3MmqnjnnXYkTg6vtIiBL5SGAQRRAI9zEBIOoyP3tZpuA?authuser=0"]
categories: ["mac"]
---

[Mac] 系統與 Apps 安裝紀錄 2021.Feb
================================

因故拿了 MacBook Pro 2015 重灌 macOS Mojave, 記錄一下軟體安裝歷程.
隨著網頁工具越來越成熟, 電腦上必備的工具倒是越來越少.

前置軟體
--------

### Homebrew ###

__[Homebrew](https://brew.sh/index_zh-tw)__

homebrew cask 的支援越來越多, 越來越方便, 
個人多數軟體都透過 homebrew 安裝. 
在開始安裝各類軟體前, Homebrew 是必要的.

``` shell
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Dropbox ###

我的專案和軟體配置檔案 (.files) 都放在 __[Dropbox](https://www.dropbox.com/)__ 上, 
.files 裡也存了為了新環境設定的簡單 setup.sh.
故新電腦的第二件事就是安裝 Dropbox Desktop, 把工作專案和環境配置同步到新電腦.

### Google Chrome ###

雖已漸漸棄用 Chrome, 改用 Safari 和 Edge.
但在 Chrome 長期使用習慣, 仍無法馬上改變.
導致先安裝 Chrome 也是安裝系統的必備之一.

### Sublime Text ###

其實開發程式的主力已經轉為 VSCode, GoLand, WebStorm... 等.
但 Sublime Text 啟動速度快, 基本作業順暢, 仍是我必然安裝的工具.

因安裝時 setup.sh 可能需要修改, 
所以會先以 Sublime Text 開啟 setup.sh,
編改檢查後再行安裝各項軟體或依安裝情況修改配置.

Sublime Text 已可以用 brew 安裝.

``` shell
$ brew install sublime-text
```


開發工具
--------

__參考 [macOS 開發環境建構](#)__


生產力工具
----------

### Obsidian ###

[Zettelkasten](https://zettelkasten.de/)
[Zettlr](https://www.zettlr.com), [Joplin](#), [Trilium Notes](https://github.com/zadam/trilium)

``` shell
$ brew install --cask obsidian
```

### Alfred ###

__[Alfred](https://goo.gl/mD9K61)__類似 Spotlight 的軟體, 但功能遠遠不止這樣.
能大大減少離開來回鍵盤和觸控板的時間, 可以參考[這篇教學](https://goo.gl/SHsXkH)

``` shell
$ brew install --cask alfred
```

### Itsycal ###

__[Itsycal](https://www.mowglii.com/itsycal/)__ 在功能表列上便捷地查看日曆, 可以查看月曆和事件列表, 還能快速創建新事件.

``` shell
$ brew install --cask itsycal
```

### XMind Zen ###

不得不說, 重新開發的 __[XMind Zen](http://www.xmind.net/)__ 不但跟原本的 XMind 一樣好用,
而且更美觀, 快速. 值得更換.

``` shell
$ brew install --cask xmind-zen
```


網路通訊
--------

### Welly ###

[Welly](https://github.com/clyang/welly)  是一套運行在 Mac 上功能豐富的BBS軟體

``` shell
$ brew install welly
```

### CloudMounter ###

[CloudMounter](https://cloudmounter.net/) 把网络云盘放进你的Finder里

-   [Get From App Store](https://apps.apple.com/tw/app/cloudmounter-cloud-encryption/id1130254674?l=en&mt=12)

### rclone ###

__[rclone](https://rclone.org/)__

``` shell
$ brew install rclone
```


其他
----

### IINA ###

[IINA](https://iina.io/) 是 Mac 上最強大的播放器, 幾乎支援所有影音格式. 開源, UI 美觀.

``` shell
$ brew install iina
```

### ExifRenamer ###

__[ExifRenamer](http://goo.gl/lSWZ)__

``` shell
$ brew install exifrenamer
```

### McBopomofo 小麥注音輸入法 ###

__[McBopomofo 小麥注音輸入法](http://mcbopomofo.openvanilla.org/)__ 反應快速，輕巧簡單, 為 Mac User 量身打造. 
支援標準、倚天、許氏、倚天26 鍵、IBM 以及漢語拼音鍵盤配置

-   [小麥注音的隱藏設定](https://osxchat.tumblr.com/post/29205181318/mcbopomofo-hidden-settings)


See Also
--------

### 遺珠 ###

以下是曾為個人熱愛, 但因故越來越少用的軟體. 暫列於此...

-   [Magnet](https://goo.gl/0Ll1DU)  
    分割視窗軟體, 支援「拖曳視窗到螢幕邊界後會自動分割」的功能
-   [Typora](https://typora.io/)  
    基於 Markdown 開源的 IDE
-   [截圖](https://goo.gl/Jwx6Sx)  
    截圖除了豐富的標註工具, 支援 QR Code 跨螢幕傳圖, 倒數計時截圖, 標籤與貼紙等功能
-   [Franz](http://meetfranz.com/)  
    集大成的 IM 通訊軟體, 在同一個視窗內使用 Slack, Messenger, Telegram, ...
-   [Headset](https://headsetapp.co/)  
    極為好用的 Youtube 免費線上音樂播放工具! 豐富歌單, 電台以及個人收藏功能
-   [BarTender3](https://www.macbartender.com/),
    [Dozer](https://free.com.tw/dozer-mac/)  
    有效管理 status bar 出現的 icon, 軟體一多很好用

### Reference ###

-   [實用 Mac Apps 推薦 – 魏志軒 – Medium](https://goo.gl/xYCwZa)
-   [2018 最新 MacBook 必裝程式與設定 – Ryan Hsu – Medium](https://goo.gl/YZfREq)
-   [Cask 讓 OSX 安裝軟體更有效率 | VISIONCAN](https://goo.gl/Z9BKtx) | [list](https://goo.gl/y7AU5x)
