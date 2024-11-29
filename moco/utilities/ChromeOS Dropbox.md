---
title: "ChromeOS: Dropbox"
description: Use Dropbox in ChromeOS
tags:
  - ChromeOS
  - Dropbox
image: https://i.imgur.com/mErPwqL.png
date_created: 2022-10-17T00:00:00+08:00
date_update: 2022-10-17T00:00:00+08:00
---

[ChromeOS] Dropbox HowTos
=========================

拿了台舊筆電安裝 ChromeOS Flex, 初步使用還滿意. 
越來越多需求多習管在 WebApp 進行, 本地端 App 需求低下, ChromeOS 確實不賴.

明顯感受是 [vscode.dev](https://vscode.dev), 滿足了使用 ChromeOS 時偶爾需要的開發需求.
而在 ChromeOS 環境下, 存取 Dropbox 方式有以下幾種:


ChromeOS
--------

### Dropbox App ###

Dropbox 官方推薦安裝 _Android 版 Dropbox 應用程式_.
說明如下: [將 Dropbox 新增至 Chromebook 的「檔案」應用程式 - Dropbox](https://help.dropbox.com/zh-tw/integrations/google-files-app).

官方應該最保險也是支援最完善的使用方式, 但可惜並不是所有 Chromebook 都能安裝 Android App,
無法安裝 Android App 的 ChromeOS Flex 就無法透過這種方式存取 Dropbox 了.

### File System for Dropbox ###

[File System for Dropbox](https://chrome.google.com/webstore/detail/file-system-for-dropbox/hlffpaajmfllggclnjppbblobdhokjhe?utm_source=chrome-app-launcher)
是非官方推出的 ChromeOS extension. 
利用 ChromeOS File System API 介接了 Dropbox 的存取, 安裝後可在 Files.App 中看到 Dropbox 網路磁碟, 即可如同使用 Google Drive 一樣使用 Dropbox 了.

![](https://lh3.googleusercontent.com/pw/AL9nZEVtofIuS_MOrk6y6a2RHGcjM-F457epHztjeGVas-8q2InC0JcPlmjHLHy-HFm7mCUdEahhV9XhrOXqI4t-jGxB9xh0B9yizZ62Lpy3lStJa8XUF_iLdvEjGOt5p0w--_QWbTwwHKFhXo7cX3ccjSWRRQ=w896-no?authuser=0)

_File System for Dropbox_ 除了可以讓 ChromeOS Flex 等無法使用 Android App 的 Chromebook 方便存取 Dropbox 外,
更因他是利用第三方 Application API 方式存取 Dropbox, 不受一個帳號只能連結三個裝置的限制, 
對免費仔來說, 算是個福音.

目前來說是個不錯的選擇, 最大的疑慮是非官方維護, 不知道隨著版本迭代, 何時會 EOS.


LinuxBox
--------

ChromeOS 內建支援 LinuxBos 以後, 使用者可以在 ChromeOS 中使用 Linux 原生軟體, 生態系變得豐富多了.

前述 _File System for Dropbox_ 目前尚未支援 Share with Linux, 要在 LinuxBox 下存取 Dropbox 有以下方法.

### Headless CLI ###

ChromeOS 的 LinuxBox 是個 Debian container, 使用上和一般 Debian 一樣.
可參考 [Dropbox Headless CLI](dropbox_headless-cli.md) 方式設置 dropbox service 來同步檔案.

### rclone ###

若沒有即時同步需求時, 亦可利用 [rclone](../cli/rclone_dropbox.md) 的方式, 手動同步 Dropbox 和本地端檔案.
設定好相關環境與配置, 手動同步專案資料夾其實還算相當方便.


See Also
--------
