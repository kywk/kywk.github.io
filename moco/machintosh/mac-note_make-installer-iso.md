---
title: "Note: 製作 macOS 安裝 ISO"
description: make installer ISO
tags:
  - Mac
sidebar_position: 60
hide_table_of_contents: true
date_created: 2021-04-06T11:18:48+08:00
image: https://i.imgur.com/mErPwqL.png
---

[Mac] 製作 macOS 安裝 ISO 檔
==========================

Apple 官方有 [如何製作 macOS 啟動安裝程式](https://support.apple.com/zh-hk/HT201372) 的詳盡說明.
在這篇說明中並沒有明指特定開機媒體, 可以為任何可掛載的裝置.
網路上有不少如何 [製作 macOS 系統安裝隨身碟](https://mrmad.com.tw/how-to-macos-catalina-usb-installer) 的文章,
主要步驟和指令也和官方一樣, 只是更詳盡的說明如格式化或命名 USB 隨身碟, 避免初學者混淆犯錯.

製作 macOS installer ISO 基本概念為, 建立一個 dmg 檔後掛載, 
把下載的 macOS installer 透過官方 `createinstallmedia` 指令安裝到剛剛掛載的磁碟,
卸載後再把 dmg 檔轉為 ISO 格式.

流程與指令如後:

1.  建立一個 13GB 大小的 dmg 檔，存在 /tmp 目錄  
    macOS Big Sur 來講, 大小約 12.5GB.
    以 `hdiutil` 指令來產生一個 dmg檔.
    ``` shell
    $ hdiutil create -o /tmp/bigSur -size 13000m -layout SPUD -fs HFS+J
    ```
2.  掛載 dmg 檔  
    ``` shell
    $ hdiutil attach /tmp/bigSur.dmg -noverify -mountpoint /Volumes/install_build
    ```
3.  將安裝程式轉到 volume  
    透過官方的 `createinstallmedia` 指令製作 installer media.
    ``` shell
    $ cd /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources
    $ sudo ./createinstallmedia --volume /Volumes/install_build
    ```
4.  卸載 volume
    ``` shell
    $ umount /Volumes/install_build
    ```
5.  將 dmg 轉為 cdr 格式
    ``` shell
    $ hdiutil convert /tmp/bigSur.dmg -format UDTO -o /tmp/bigSur
    $ mv /tmp/bigSur.cdr /tmp/bigSur.iso
    ```

在 tmp 目錄裡, 雖然已經轉成 iso 檔, 但 dmg 檔還是會留著.
可自行評估空間決定是否需要留著 dmg 檔.

_Reference_

-   [將下載在電腦裡的macOS 安裝程式轉成 iso檔 - 彼得潘的 Swift iOS App 開發教室 - Medium](https://medium.com/彼得潘的-swift-ios-app-開發教室/將下載在電腦裡的macos-安裝程式轉成-iso檔-f4b8c59ebdc6)
-   [[macOS]製作 macOS Big Sur 11.0 系統安裝映像檔(ISO、DMG) - 科技阿宅王](https://www.tokfun.net/os/mac/make-macos-big-sur-installer-iso-dmg/)
