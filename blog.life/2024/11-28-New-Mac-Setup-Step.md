---
title: Yet Another Macbook
tags:
  - Machintosh
authors: kywk
hide_table_of_contents: true
image: https://lh3.googleusercontent.com/pw/ACtC-3dctjoKSszhdu7OFFUmtd-eRmtxUAIxStWh7m3eW8Qy4iXLueXBb-3n_AmYxWpfIrQWGc5He2WVeunoRe0ULT5MnjeqBY5aknTj-sCoNU7Rdg4ndP4GDvOk-5Kv7vIP5NIE8TaEJSrB2ip4Qkf8Dbi-Ig=w800-no?authuser=0
---

# Yet Another Macbook

紀錄新購入 Macbook Air 安裝設定流程.

1.  Homebrew, 所有軟體第一步
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
2.  Dropbox, 安裝 maestral, 等候同步完成
    ```
    brew install maestral
    ```
3.  terminal/console 設定
    - 本步驟所有軟體與
      ```
      brew install iterm2 fzf
      brew install font-fira-code-nerd-font font-fira-code font-fira-mono font-fira-sans
      brew install font-source-code-pro
      brew install font-hack-nerd-font
      ```
    - 打開 iTerm2, 匯入設定與色卡後重啟, 進行 Shell 設定
      ```
      ln -sfF Dropbox/config/dotfiles .files
      ln -sfF .files/zsh/mac.zshrc .zshrc
      ln -sfF .files/zsh/mac.zprofile .zprofile
      mkdir .local
      touch .local/develop.sh
      touch .local/local.sh
      ```
    - 重開 iTerm2, 自動進行 zinit 相關套件下載與 p10k config
4.  Mac 環境設定
    - Safari / Dock / Hot corners
5.  其他軟體安裝與設定

_Ref: [Setup: App 安裝紀錄 | kywk.me](https://kywk.github.io/moco/machintosh/Applications/Mac%20Apps%20Setup/)_
