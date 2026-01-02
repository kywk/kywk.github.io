---
title: 'Xfce: macOS looks'
description: setup Xfce looks like macOS
tags:
  - Linux/Xfce
  - kywk
hide_table_of_contents: true
date_created: 2022-11-07T04:01:39.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AM-JKLU2Ot2TyON1chUA-Qw7qj-OQSRMYNin7jsJsUa3E_jwqq1JbwTZZckUtJmNZmqxY5M4egm-ryt4g3Ope_0EqHBrCDSEHmcy-goHRzWh-ZgguUoy1XKpyS1DNx8aV92vAkAM0zZOW6EZR4KS3W1DClQKhw=w800-no?authuser=0
slug: /utilities/linux/xfce-macos-looks/
---

[Xfce] 桌面 macOS 化設定記錄
==========================

> 並不認為模仿 macOS 打造桌面就是美化, 就比較潮.
> 但 macOS 在多平台之間的主要工作環境, 讓其他環境接近 macOS, 
> 確實能平順轉換作業, 適當提升工作效率.

### Theme ###

-   WM Theme: WhiteSur-Dark
-   GTK Theme: WhiteSur-Dark [GTK2]
-   Icon Theme: WhiteSur-dark
-   Font: San Francisco Display 10

### Plank ###

[Plank](https://wiki.archlinux.org/title/Plank) 
是一款輕量的 Dock 工具列軟體. 可以直接用 pamac / pacman 安裝.  
``` shell
sudo pacman -S plank
```

![](https://lh3.googleusercontent.com/pw/AM-JKLVJ3nnQv20K369On9E36TpvnvP3X-NC2HVNa3IIt0wqD0SN2AZrlB5iUayt0qtrmT8e8xU3sIKbeUda_Xa08qNc3sPkq8oZDIwLG2ecj3zQIFGcyHm6MxRU1zZRiTH9dxOqXz7PzmRRrZ03Z269nPaH_g=w800-no?authuser=0)

### Vala-Appmenu ###

[Vala-Appmenu](https://aur.archlinux.org/pkgbase/vala-panel-appmenu-xfce-git) 
是模仿 macOS 頂部工具列, 可在 xfce panel 上顯示應用程式選單的程式. 

``` shell
# Install Vala-Appmenu manjaro/arch : 
pamac build vala-panel-appmenu-common-git vala-panel-appmenu-registrar-git vala-panel-appmenu-xfce-git 
sudo pacman -S appmenu-gtk-module 
# Execute this command after enable vala-appmenu: 
xfconf-query -c xsettings -p /Gtk/ShellShowsMenubar -n -t bool -s true 
xfconf-query -c xsettings -p /Gtk/ShellShowsAppmenu -n -t bool -s true 
```

### Ulauncher ###

[ulauncher](https://ulauncher.io/) 是類似 macOS Spotlight 的搜尋框.  
``` shell
pamac build ulauncher
```

![](https://lh3.googleusercontent.com/pw/AM-JKLXGwPfPjhJrQCJwGhpDcuVomj8oF4H6yMj4Vf0dBlWJy_bUbKD1n4GpxtuBTTXstuKwsM0ErkQQqwJqtvaZk5aH4QR4rvRRWztgJ2e2oLFru2aP8wBhEGHznbGpnmx0qLcTV91icv4b_H0KxL5c5zm_iQ=w600-no?authuser=0)

### 成果 ###

教學影片做的相當不錯, 章節清楚.   
可依照影片教學一步步執行, 依個人習慣喜好調整設定.
更可在了解每個軟體功能後, 依實際需求決定是否安裝.
如: Comice Control center / Conky / LightDM-Webkit2-Greeter / ...
不符合我的實際需求, 就沒安裝了.

![](https://lh3.googleusercontent.com/pw/AM-JKLWYCuBay2uL2Uh_3Y_cj-yHeiY02-EI6pn-KaXeyhiuKKNAe9Pty81cAdkMBIxzpCjUXoZ6oqp710pAqDu8JmgtUU-QB6inhIiO2fIvfwATxP_tcIzMJfBHO32UfEsVwywqsMUgPF158yuWBz6_h4pnDA=w800-no?authuser=0)



See Also
--------

