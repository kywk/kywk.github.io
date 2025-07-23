---
title: "Setup: App 安裝紀錄"
description: kywk's favitote macOS Apps
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Mac
  - DevEnv
  - kywk
sidebar_position: 1
date_created: 2022-08-13
date_updated: 2025-06-01
---

# [Mac] 系統與 Apps 安裝紀錄 2025.Jun

設定新電腦, 順便整理紀錄一下目前日常使用的 Apps. 
越來越少從文章中看到新 App 的介紹, 更多的是從 Youtube 影片推薦得知. 
時代變遷...

## 前置軟體

### Homebrew

[**Homebrew**](https://brew.sh/index_zh-tw)

homebrew cask 的支援越來越多, 越來越方便,
個人多數軟體都透過 homebrew 安裝.
在開始安裝各類軟體前, Homebrew 是必要的.

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

可以進一步直接用 [[homebrew-bundle]] 來安裝必要的工具與軟體.

### Dropbox

專案和軟體配置檔案 (.files) 都放在 [**Dropbox**](https://www.dropbox.com/) 上,
故新電腦的第二件事就是安裝 Dropbox Desktop, 把工作專案和環境配置同步到新電腦.

許多開發者會把 .files 放到 GitHub 上, 新環境安裝配置時 git clone 下來 
透過 Dropbox 同步也能達到相同成果, 且更新同步上更為即時.

因 Dropbox 配合頻果的新政策更改了檔案位置, 反而讓自己一直習慣的路徑配置不方便使用.
加上免費仔只能連結三個裝置的限制, 現在改用第三方軟體取代官方桌面工具.

- [[Dotfiles Management]]
- [[Maestral:Open source Dropbox client, Maestral]]

```shell
brew install maestral
```

### Google Chrome

雖已漸漸棄用 Chrome, 改用 Safari 和 Edge. 但在 Chrome 長期使用習慣, 仍無法馬上改變. 導致先安裝 Chrome 也是安裝系統的必備之一.

- Microsoft Edge,

### Sublime Text / Zed

開發程式的主力已經轉為 VSCode, GoLand, WebStorm... 等.
但 Sublime Text/Zed 啟動速度快, 基本作業順暢, 仍是必然安裝的工具.

因安裝時 setup.sh 可能需要修改,
所以會先以 Sublime Text 開啟 setup.sh,
編改檢查後再行安裝各項軟體或依安裝情況修改配置.

Sublime Text 已可以用 brew 安裝.

```shell
brew install sublime-text zed
```

## 開發工具

參考: **[[Mac DevEnv Setup:macOS 開發環境建構]]**

## 生產力工具

### Obsidian

出發點是卡片筆記軟體, 因各種擴充功能, 已是個人全面性筆記與專案管理軟體.

```shell
brew install obsidian
```

### [[Raycast]]

取代 Spotlight 軟體

```shell
brew install raycast
```

### [AltTab](https://alt-tab-macos.netlify.app/)

和 Windows 一樣使用 `Alt + Tab` 切換視窗, 可在同一程式多個視窗中切換, 比 macOS 內建僅能在應用程式間切換來得快速方邊.

### [Pure Paste](https://sindresorhus.com/pure-paste)

讓預設貼上就是純文字，自動清除複製的文字樣式

## Menu Bar

### [Ice - Menu Bar Manager](https://icemenubar.app/)

- [GitHub - jordanbaird/Ice: Powerful menu bar manager for macOS](https://github.com/jordanbaird/Ice)
- [極簡控必備，MacOS 選單列整理工具 Ice](https://www.larrynote.com/menubar-ice/)

### [Itsycal](https://www.mowglii.com/itsycal/)

在功能表列上便捷地查看日曆, 可以查看月曆和事件列表, 還能快速創建新事件.

```shell
brew install itsycal
```

### [TopNotch](https://topnotch.app/) 

Makes the notch disappear like a 🥷.

### [MenubarX](https://menubarx.app) [AppStore](https://apps.apple.com/tw/app/menubarx/id1575588022) A powerful menu bar browser.

可在 MenuBar 上放置一個小瀏覽器, 方便查閱資料或當作開發 RWD 網頁時的檢視工具.
亦可將某些網站放置在 menu bar 上當作 App 來使用.
- [MenubarX 在 Mac 選單列加入瀏覽器，固定經常使用的網頁](https://free.com.tw/menubarx/)
- [MenubarX 讓你在 Mac 選單列中瀏覽網頁的小工具（內購限免） - 電腦王阿達](https://www.kocpc.com.tw/archives/421084)
- [讓 Mac 多一個小螢幕的《MenubarX》，打報告、查資料很好用 - 蘋果仁 - 果仁 iPhone/iOS/好物推薦科技媒體](https://applealmond.com/posts/129059)

### [Pomodorome](https://apps.apple.com/us/app/pomodoro-me-focus-on-tasks/id1484801884?mt=12)

在 menu bar 上的番茄時鐘, 方便調用. 亦有基本統計資訊, 方便追蹤時間使用.

## 網路通訊

### [CloudMounter](https://cloudmounter.net/) / [App Store](https://apps.apple.com/tw/app/cloudmounter-cloud-encryption/id1130254674?l=en&mt=12) 

把网络云盘放进你的 Finder 里 

### [rclone](https://rclone.org/)

  ```shell
brew install rclone
```

## 其他

### [IINA](https://iina.io/) 

Mac 上最強大的播放器, 幾乎支援所有影音格式. 開源, UI 美觀.

```shell
brew install iina
```

### [ExifRenamer](http://goo.gl/lSWZ)

```shell
brew install exifrenamer
```

### [McBopomofo 小麥注音輸入法](http://mcbopomofo.openvanilla.org/)

反應快速, 輕巧簡單, 為 Mac User 量身打造.
支援標準, 倚天, 許氏, 倚天26 鍵, IBM 以及漢語拼音鍵盤配置.

- [小麥注音的隱藏設定](https://osxchat.tumblr.com/post/29205181318/mcbopomofo-hidden-settings)

## See Also

### 遺珠

以下是曾為個人熱愛, 但因故越來越少用的軟體. 暫列於此...

- [Alfred](https://goo.gl/mD9K61) 大大減少離開來回鍵盤和觸控板的時間
	- [參考教學](https://goo.gl/SHsXkH)
- [Dozer](https://github.com/Mortennn/Dozer) 管理隱藏多餘的 menu bar icon, 使桌面保持清爽, 軟體一多很好用.
	- [Hidden Bar](https://apps.apple.com/tw/app/hidden-bar/id1452453066?mt=12)
		- [Hidden Bar 讓 Mac 工具列更乾淨，自動隱藏用不到的應用程式圖示](https://free.com.tw/hidden-bar/)
		- [隱藏、整理 Mac 選單列圖示，《Hidden Bar》幫你輕鬆搞定 - 蘋果仁 - 果仁 iPhone/iOS/好物推薦科技媒體](https://applealmond.com/posts/139513)
		- [Hidden Bar - 解決 Mac 狀態列圖示太多的小工具 – 蘋果迷 APPLEFANS](https://applefans.today/macos-app-hidden-bar/)
- [Rectangl](https://rectangleapp.com/) to snap windows to different positions, 快速整理安排視窗 Layout 的工具, 外接大螢幕時相當實用.
	- [Mac 視窗管理工具《Rectangle》，一鍵完成視窗分割、縮放、排列 - 蘋果仁 - 果仁 iPhone/iOS/好物推薦科技媒體](https://applealmond.com/posts/97644)
	- [Mac 視窗分割，用 Rectangle 就對了 - Starbugs Weekly 星巴哥技術專欄 - Medium](https://medium.com/starbugs/mac-快速分割視窗-用-rectangle-就對了-592ed40405e3)
	- [Moom vs Magnet vs Rectangle | Medium](https://davidmles.medium.com/moom-vs-magnet-493fd2d31a77)
	- [Magnet](https://goo.gl/0Ll1DU) 分割視窗軟體, 支援 「拖曳視窗到螢幕邊界後會自動分割」的功能
- [Typora](https://typora.io/) 基於 Markdown 開源的 IDE
- [Headset](https://headsetapp.co/) 極為好用的 Youtube 免費線上音樂播放工具! 豐富歌單, 電台以及個人收藏功能
- [Welly](https://github.com/clyang/welly) Mac 上的BBS軟體, 被 PTT 網頁版 term.ptt.cc 取代了.
- [XMind Zen](http://www.xmind.net/)  
  XMind Zen 不但跟原本的 XMind 一樣好用, 而且更美觀快速.  
  但全面性使用 Obsidian 作為筆記和專案管理以後, 都在 Obsidian 上找相關解決方案了.

### Reference

- [節省工具箱 Jason Tools: [套件分享] 在 macOS 工作所用的自由與開源軟體 (持續更新)](https://blog.jason.tools/2023/09/macos-opensource-apps.html?fbclid=IwAR1nRrdYDi3-Wpzia2qDm7gg-6y_F7CCMFCxPGqmJ8SJXfO0oC6co3pla0E)
- [10 BEST Mac Apps for Productivity (in 2022)!](https://www.youtube.com/watch?v=-xXc7qeiC8I)
- [5 款免费又好用的 Mac 菜单栏软件 - Mac云课堂](https://www.youtube.com/watch?v=OWdOq7E62Ws)
- [22 FREE Mac Apps I use to BOOST MY PRODUCTIVITY - YouTube](https://www.youtube.com/watch?v=w3Vue4bdPyM)
- [Amazing FREE Mac Apps You Aren’t Using! - YouTube](https://www.youtube.com/watch?v=FxUk8gxzHI8)
