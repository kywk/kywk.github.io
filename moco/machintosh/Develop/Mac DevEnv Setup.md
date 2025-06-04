---
title: "Setup: 開發環境建構"
description: macOS develop tools of Moo Cow
image: https://lh3.googleusercontent.com/pw/ACtC-3cYYtkzJjo_oG7Gzqq8T8XQm4V_qLE3wGWVKOahp6YT4lo-on60NJmjrkkatnizX1b-uID-MCM2ztsXH9z27cMRtql3PA5cpYZYbMfSPuM5Yh3MmqnjnnXYkTg6vtIiBL5SGAQRRAI9zEBIOoyP3tZpuA?authuser=0
tags:
  - Mac
  - DevEnv
  - kywk
sidebar_position: 1
date_created: 2022-08-13
date_updated: 2025-06-01
---

# [Mac] 開發環境建構 2025.Jun

重灌電腦最麻煩的就是還原設定檔, 雖然 Mac 有 TimeMachine 可無痛轉移, 而個人癖好還是喜歡重新檢視與安裝設定.
越來越多軟體可以將該軟體配置設定存在雲端, 不但保持多台電腦間同步, 重灌後只需登入帳號就可還原配置,

而大部分 CLI 工具配置檔存放於家目錄下的隱藏檔 (.files), 裝置間的同步, 我是透過 Dropbox.
檔案搬到 Dropbox 資料夾下, 再建立 Symbolic Link, 就可透過 Dropbox 來同步設定檔.

重灌電腦要安裝設定環境, 僅需透過 shell script 安裝軟體與建立 Symbolic Link, 相當無痛.

<!-- more -->

## CLI Environment

### Ghostty/iTerm2

[[Terminals]] / [[Ghostty]]

```shell
brew install iterm2 ghostty
```

### zsh/zinit/chezmoi

[[zinit vs oh-my-zsh]] 不知看了那邊文章(影片?)後, 已由 oh-my-zsh 轉為擁抱 zinit.
Dropbox 同步後, 只需將 `~/.zshrc` link 到 `Dropbox/dotfiles/zsh/zshrc`, 打開終端機就會自動安裝插件和恢復配置了.

```shell
ln -s ~/Dropbox/dotfiles/zsh/zshrc ~/.zshrc
```

- [ ] 整理文章時, ChatGPT 又扔出 `chezmoi`, 日後花時間了解.

### Powerline Font

```shell
brew install font-fira-code-nerd-font font-fira-code font-fira-mono font-fira-sans
brew install font-source-code-pro
brew install font-hack-nerd-font
```

## Base Environment

### Docker runtime

1. [**OrbStack**](https://orbstack.dev) _Personal, non-commercial use_
2. [Docker Desktop](https://www.docker.com/products/docker-desktop/) _Personal, non-commercial use_
3. [[Docker CLI on macOS]]

### Brew formulae

```shell
brew install git tig gitui git-delta zsh-completion tmux ncdu htop lesspipe sshtrix tldr diff-so-fancy fd ripgrep rclone thefuck ag svn moreutils asdf ansifilter fzf direnv
```

See Also: [[Awesome CLI]]

## Program Language

### Node.js

**[Node.js](https://nodejs.org/)**

[[Volta Get Started]]

### Go

```shell
brew install go
```

## IDE & GUI Tools

### VSCode

```shell
brew install --cask visual-studio-code
```

### GoLand / IntelliJ-IDEA

```shell
brew install --cask goland intellij-idea
```

### Others

**[Fork](https://git-fork.com/)**

Fork - a fast and friendly git client for Mac

```shell
brew install fork
```

**[Bruno](https://www.usebruno.com/)**

The Collaboration Platform for API Development.

```shell
brew install bruno
```

_See Also: [[Postman Alternative]]_

**[Sequel Pro](http://www.sequelpro.com/)**

Sequel Pro is a fast, easy-to-use Mac database management application for working with MySQL databases.

```shell
brew install sequel-pro
```

**[TablePlus](https://tableplus.com)**

Modern, Native Tool for Database Management.

```shell
brew install tableplus
```

**[Redis Desktop Manager](https://rdm.dev)**

Redis GUI management tool for Windows, Mac OS X, Ubuntu and Debian.

```shell
brew install --cask another-redis-desktop-manager
```

**[Robo3T](https://robomongo.org)**

Robo 3T. Free, open-source MongoDB GUI

```shell
brew install tableplus
```

## See Also

### 遺珠

以下是曾為個人熱愛, 但因故越來越少用的軟體. 暫列於此...

- [SourceTree](http://sourcetreeapp.com/)  
  Free Mercurial and Git Client for Windows and Mac
- [GitKraken](https://www.gitkraken.com/)  
  The downright luxurious Git client, for Windows, Mac & Linux

### Reference

**Zsh**

- [让你的 Mac 提前用上 macOS Catalina 的 Shell——Oh My Zsh 配置指南 - 少数派](https://sspai.com/post/55176)

**Mac Dev**

- [How to set up your Mac for Web Development – freeCodeCamp.org](https://goo.gl/ZDYqar)
- [homebrew - Mac OS X Yosemite 10.10 開発環境構築 - Qiita](http://goo.gl/XOrSV6)
  - [Python Development Environment on Mac OS X Mavericks 10.9 | Hacker Codex](http://goo.gl/8JkuvS)
  - [Set Up Python and Install Django on Mac OS X Lion 10.7 | Hacker Codex](http://goo.gl/5yhNGk)
- [Setting Up a Mac Dev Machine From Zero to Hero With Dotfiles - Tuts+ Code Tutorial](http://goo.gl/YkCvoT)
- [MacOS 編輯器快捷建設定, short key of editor](http://goo.gl/gSnCRv)
- [2018 最新 MacBook 必裝程式與設定 – Ryan Hsu – Medium](https://goo.gl/YZfREq)
