---
title: Tip & Trick
description: macOS tips
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Mac
  - Tips
sidebar_position: 5
hide_table_of_contents: true
date_created: 2023-01-02T00:00:00.000Z
date_updated: 2025-01-06T00:00:00.000Z
slug: /machintosh/mac-tip-n-trick/
---

# [Mac] macOS 實用小技巧與工具

## Setting

### DO THOSE STEP FIRST

### 修正 Mac 自動調整 Desktop 順序

System Preferences > Mission Control
Uncheck Automatically rearrange Spaces based on most recent use.

![](https://i.stack.imgur.com/wYI6I.png)

- [Mac 會自己改變 Desktop 位置的問題 – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2023/01/31/11048/mac-會自己改變-desktop-位置的問題/)
- [macos - How to prevent Mac from changing the order of Desktops/Spaces - Ask Different](https://apple.stackexchange.com/questions/214348/how-to-prevent-mac-from-changing-the-order-of-desktops-spaces)

###  Built-in feature

- [MacOS教學 - 如何設定自動開機／關機排程？ \| 就是教不落 - 給你最豐富的 3C 資訊、教學網站](https://steachs.com/archives/73229)
- 

## Finder

### 讓資料夾排列在 Finder 上方

打開 Finder 上方偏好設定

![](<https://pocket-image-cache.com//filters:format(jpg):extract_focal()/https%3A%2F%2Fi0.wp.com%2Fsteachs.com%2Fwp-content%2Fuploads%2F2023%2F02%2F13.png%3Fresize%3D1418%252C938%26ssl%3D1>)

進到進階頁籤, 建議勾選:

- 顯示所有檔案副檔名
- 將檔案夾保留在最上方（二個都勾起來）
  這樣之後在 Finder 中查看檔案時, 資料夾就會自動排序在上方囉.

![](<https://pocket-image-cache.com//filters:format(jpg):extract_focal()/https%3A%2F%2Fi0.wp.com%2Fsteachs.com%2Fwp-content%2Fuploads%2F2023%2F02%2F14.png%3Fresize%3D756%252C758%26ssl%3D1>)

Ref: [macOS 新手使用必學的五個小技巧，操作更加順手 | 就是教不落 - 給你最豐富的 3C 資訊、教學網站](https://steachs.com/archives/61740)

## Shell Script

### Check Operating System is Mac

```bash
if [[ $OSTYPE == 'darwin'* ]]; then
  echo 'macOS'
fi
```

Ref: [Bash: Check Operating System is Mac](https://remarkablemark.org/blog/2020/10/31/bash-check-mac/)

### Unix CLI tips

- [[Check Port Usage]]

## See Also

- [提高 Mac 生產力的高效小技巧！有些小彩蛋不說還真不知道哩 ~ 🥸 - YouTube](https://www.youtube.com/watch?v=uhQSCPDSxk4)
- [10 MUST-KNOW Macbook Tips for Productivity! - YouTube](https://www.youtube.com/watch?v=5XfR6xBBXhw)
- [10 AWESOME MacBook tips I bet you didn’t know! - YouTube](https://www.youtube.com/watch?v=Hb7bAkgDxHE)
