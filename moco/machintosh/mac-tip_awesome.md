---
title: "Tip: 實用小技巧"
description: macOS tips
tags: [Mac, Tips]

sidebar_position: 10
#sidebar_label: Easy
#sidebar_class_name: green

hide_table_of_contents: true

created: 2023-01-02
updated: 2023-01-02
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[Mac] macOS 實用小技巧與工具
=========================

Setting
-------

### Mac 會自己改變 Desktop 位置的問題 ###

System Preferences > Mission Control
Uncheck Automatically rearrange Spaces based on most recent use.

![](https://i.stack.imgur.com/wYI6I.png)

Ref: [Mac 會自己改變 Desktop 位置的問題 – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2023/01/31/11048/mac-會自己改變-desktop-位置的問題/)
     [macos - How to prevent Mac from changing the order of Desktops/Spaces - Ask Different](https://apple.stackexchange.com/questions/214348/how-to-prevent-mac-from-changing-the-order-of-desktops-spaces)


### Finder 讓資料夾自動排列在上方 ###

打開 Finder 上方偏好設定

![](https://pocket-image-cache.com//filters:format(jpg):extract_focal()/https%3A%2F%2Fi0.wp.com%2Fsteachs.com%2Fwp-content%2Fuploads%2F2023%2F02%2F13.png%3Fresize%3D1418%252C938%26ssl%3D1)

進到進階頁籤, 建議勾選:
- 顯示所有檔案副檔名
- 將檔案夾保留在最上方（二個都勾起來）
這樣之後在 Finder 中查看檔案時, 資料夾就會自動排序在上方囉.

![](https://pocket-image-cache.com//filters:format(jpg):extract_focal()/https%3A%2F%2Fi0.wp.com%2Fsteachs.com%2Fwp-content%2Fuploads%2F2023%2F02%2F14.png%3Fresize%3D756%252C758%26ssl%3D1)

Ref: [macOS 新手使用必學的五個小技巧，操作更加順手 | 就是教不落 - 給你最豐富的 3C 資訊、教學網站](https://steachs.com/archives/61740)



Terminal & CLI
--------------

### 找出被佔用的 IP 及port find IP port usage

Mac 是Unix-like 系統, 可在 terminal 使用 `lsof -n -i | grep LISTEN` 找出系統中正被使用的 port IP 及使用的程序.

如果要找出特定port號是否有被使用, 使用 `lsof -n -i:<port> | grep LISTEN`. port 為要查詢的port號。

``` bash
lsof -n -i | grep LISTEN
lsof -n -i:<port> | grep LISTEN
```

Ref: [Mac 找出被佔用的IP及port find IP port usage](https://matthung0807.blogspot.com/2019/11/mac-find-network-port-usage.html)



Shell script
------------

### Check Operating System is Mac

``` bash
if [[ $OSTYPE == 'darwin'* ]]; then
  echo 'macOS'
fi
```

Ref: [Bash: Check Operating System is Mac](https://remarkablemark.org/blog/2020/10/31/bash-check-mac/)



See Also
--------

- [提高 Mac 生產力的高效小技巧！有些小彩蛋不說還真不知道哩 ~ 🥸 - YouTube](https://www.youtube.com/watch?v=uhQSCPDSxk4)
- [10 MUST-KNOW Macbook Tips for Productivity! - YouTube](https://www.youtube.com/watch?v=5XfR6xBBXhw)
