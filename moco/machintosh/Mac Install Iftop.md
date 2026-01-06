---
title: 'Note: iftop 安裝失敗解決'
description: install iftop
tags:
  - Mac
sidebar_position: 60
hide_table_of_contents: true
date_created: 2020-12-07T08:48:04.000Z
image: >-
  https://lh3.googleusercontent.com/pw/ACtC-3fnLstA2rsbmbt0hI7IWqhfzOU17UzGFO6pEIfoC2_x_l526rOlZ3_p4RbWvVFWlT6uMlnPMzjCSxDILtn7Er5Ch0JPYJReE0BhmCXqJh6TsqrygLrL17dcz1Dyq3eJ7MZhHDqQhvWbX3zJvneD1CRanA=w800-no?authuser=0
slug: /machintosh/mac-install-iftop/
---

[Mac] iftop 安裝失敗與解決方式
===========================

測試 Rclone 伺服機端傳輸時發覺 macOS 並無 iftop 指令, 習慣性地用 brew 安裝了.

<!-- more -->

```
$ brew install iftop
...
...
iftop requires root privileges so you will need to run `sudo iftop`.
You should be certain that you trust any software you grant root privileges.
```

安裝完成後提示 iftop 這個指令需要用 root 權限執行.

然而使用 sudo iftop 之後卻出現 command not found 的錯誤.

```
$sudo iftop
sudo: iftop: command not found
```

上網查了查, 看到這篇 [一次macbook安装iftop失败的经历及解决方式_偷懒的加菲-CSDN博客](https://blog.csdn.net/hl449006540/article/details/86753227)  
跟著該文敘述一一確認後, 發覺我電腦上只存在著 sbin 不在 path 環境變數的問題.

```
$ sudo vim /etc/paths
```

打開後發覺裡面有 `/usr/local/bin`, 但沒有 `/usr/local/sbin`.  
手動把 `/usr/local/sbin` 加入, 存檔, 重啟終端機.

![](https://lh3.googleusercontent.com/pw/ACtC-3dGa69B3UVBKt_TYzNt4-nTxPn8WbSfDK1nVlQ7PXOXDIwwV9pQbliqr6_vH69TMj-FOUY26BG_CiFLDHo6pXTGOE6dtYMESpYQD-8jucaCbnZ3qObEMzdsFbm62I_Omdvzz-Q_unLNo2CVRxQPkyDsAw=w1208-h894-no?authuser=0)

成功.
紀錄之.
