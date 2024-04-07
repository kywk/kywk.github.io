---
title: "Setup: 開發環境建構"
description: macOS develop tools of Moo Cow
tags:
  - Mac
  - DevEnv
  - kywk
sidebar_position: 2
date_created: 2022-08-13T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/ACtC-3cYYtkzJjo_oG7Gzqq8T8XQm4V_qLE3wGWVKOahp6YT4lo-on60NJmjrkkatnizX1b-uID-MCM2ztsXH9z27cMRtql3PA5cpYZYbMfSPuM5Yh3MmqnjnnXYkTg6vtIiBL5SGAQRRAI9zEBIOoyP3tZpuA?authuser=0
---

[Mac] 開發環境建構 2022.Aug
=========================

_last updated: 2021-02-26T14:53:37+08:00_

過去重灌電腦最麻煩的就是還原設定檔, 雖然 Mac 有 TimeMachine 可無痛轉移, 但個人癖好還是喜歡重新檢視與安裝設定.
但越來越多軟體可以把配置設定存在雲端, 不但保持多台電腦間的同步, 重灌也只需登入帳號就可還原配置, 個人以為比 TimeMachine 方便.

但仍有些開發或 CLI 工具, 是將配置檔存放於家目錄下的隱藏檔 (.files),
無法透過雲端同步. 
我是把這些檔案搬移到 Dropbox 資料夾下, 再建立 Symbolic Link, 
如此就可透過 Dropbox 來同步設定檔. 

現在重灌電腦要安裝設定環境, 僅需透過 shell script 安裝軟體與建立 Symbolic Link, 相當無痛.

<!-- more -->

CLI Environment
---------------

### iTerm2 ###

``` shell
brew install iterm2
```

### zsh and oh-my-zsh ###

macOS Mojave (10.14.x) 開始內建 zsh, 而 Catalina (10.15.x) 以後預設 Shell 改為 zsh.

在 macOS Mojave 系統要把預設 shell 改為 zsh 以及配置 zsh 最方便也推薦的方式就是透過 [Oh My Zsh](https://ohmyz.sh)


__Oh My Zsh__

macOS Mojave 以後已經內建 Zsh, 所以直接安裝 Oh My Zsh 即可. 


``` shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```


``` shell
brew install zsh-completion 
```

### Powerline Font ###

``` shell
brew tap homebrew/cask-fonts
brew install font-fira-code font-fira-mono font-fira-sans 
brew install font-source-code-pro
brew install font-hack-nerd-font
```



Base Environment
----------------

### [Docker](https://www.docker.com) ###

``` shell
brew install docker
```

### Brew formulae ###

``` shell
brew install git tig zsh-completion tmux ncdu htop lesspipe sshtrix tldr diff-so-fancy fd ripgrep rclone thefuck ag svn moreutils asdf
```



Program Language
----------------

### Node.js ###

__[Node.js](https://nodejs.org/)__

[Installing Node.js or io.js with nvm](http://goo.gl/26nHDf)

__NVM Manual install__
```
git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`  
cat ". ~/.nvm/nvm.sh" >> .bashrc
```

__Install node.js__

``` shell
nvm install v8.11.1
nvm alias default tls
nvm use default
```

### Go ###

``` shell
brew install go
```

### Dart ###

``` shell
brew tap dart-lang/dart
brew install dart
```


IDE & GUI Tools
---------------

### VSCode ###

``` shell
brew install --cask visual-studio-code
```

### GoLand ###

``` shell
brew install --cask goland
```

### WebStorm ###

``` shell 
brew install --cask webstorm
```

### Others ###

__[Fork](https://git-fork.com/)__

Fork - a fast and friendly git client for Mac

```shell
brew install fork
```

__Postman__

The Collaboration Platform for API Development.

```shell
brew install postman
```

__[Sequel Pro](http://www.sequelpro.com/)__

Sequel Pro is a fast, easy-to-use Mac database management application for working with MySQL databases.

```shell
brew install sequel-pro
```

__[TablePlus](https://tableplus.com)__

Modern, Native Tool for Database Management.

```shell
brew install tableplus
```

__[Redis Desktop Manager](https://rdm.dev)__

Redis GUI management tool for Windows, Mac OS X, Ubuntu and Debian.

```shell
brew install --cask another-redis-desktop-manager
```

__[Robo3T](https://robomongo.org)__

Robo 3T. Free, open-source MongoDB GUI

``` shell
brew install tableplus
```


See Also
--------

### 遺珠 ###

以下是曾為個人熱愛, 但因故越來越少用的軟體. 暫列於此...

-   [Atom](https://atom.io/)  
    A hackable text editor for the 21st Century by github.
-   [SourceTree](http://sourcetreeapp.com/)  
    Free Mercurial and Git Client for Windows and Mac
-   [GitKraken](https://www.gitkraken.com/)  
    The downright luxurious Git client, for Windows, Mac & Linux
-   [HyperTerm](https://hyperterm.org/)
    JS/HTML/CSS Terminal
-   [alacritty/alacritty: A cross-platform, OpenGL terminal emulator.](https://github.com/alacritty/alacritty)

### Reference ###

__Zsh__

-   [让你的 Mac 提前用上 macOS Catalina 的 Shell——Oh My Zsh 配置指南 - 少数派](https://sspai.com/post/55176)
-   [bash to zsh 設定流程. 參考這篇一步一步執行，因為我已裝過 homebrew以及 iterm2… | by Youngmi huang | Medium](https://cyeninesky3.medium.com/bin-to-zsh-%E8%A8%AD%E5%AE%9A%E6%B5%81%E7%A8%8B-d29fe60a4121)

__iTerm2 + Oh My Zsh__

-   [[Tool] Mac + iTerm 2 + Oh My Zsh + Powerlevel9k 設定 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10192874)
-   [超簡單！十分鐘打造漂亮又好用的 zsh command line 環境 | by Gary Chu | 財報狗技術部落格 | Medium](https://medium.com/statementdog-engineering/prettify-your-zsh-command-line-prompt-3ca2acc967f)
-   [用Oh My Zsh把iTerm變美美. 使用終端機操作時常密密麻麻的，看一兩個小時還好，但如果長期這樣下去真的會眼殘，畫… | by Hazel Wu | Medium](https://medium.com/@hazelwu/%E7%94%A8oh-my-zsh%E6%8A%8Aiterm%E8%AE%8A%E7%BE%8E%E7%BE%8E-8a18daa8eac)
-   [看膩了一成不變的小黑窗？改用iterm2 + oh-my-zsh吧 | by Nathan Chou | Medium](https://medium.com/@h86991868/%E7%9C%8B%E8%86%A9%E4%BA%86%E4%B8%80%E6%88%90%E4%B8%8D%E8%AE%8A%E7%9A%84%E5%B0%8F%E9%BB%91%E7%AA%97-%E6%94%B9%E7%94%A8iterm2-oh-my-zsh%E5%90%A7-cc2b0683acb)

__WebStorm__

-   [WebStorm 安裝與設定 | 點燈坊](https://fpjs.fun/webstorm/general/setup/)

__Mac Dev__

-   [How to set up your Mac for Web Development – freeCodeCamp.org](https://goo.gl/ZDYqar)
-   [homebrew - Mac OS X Yosemite 10.10 開発環境構築 - Qiita](http://goo.gl/XOrSV6)
    -   [Python Development Environment on Mac OS X Mavericks 10.9 | Hacker Codex](http://goo.gl/8JkuvS)
    -   [Set Up Python and Install Django on Mac OS X Lion 10.7 | Hacker Codex](http://goo.gl/5yhNGk)
-   [Setting Up a Mac Dev Machine From Zero to Hero With Dotfiles - Tuts+ Code Tutorial](http://goo.gl/YkCvoT)
-   [MacOS 編輯器快捷建設定, short key of editor](http://goo.gl/gSnCRv)
-   [2018 最新 MacBook 必裝程式與設定 – Ryan Hsu – Medium](https://goo.gl/YZfREq)
