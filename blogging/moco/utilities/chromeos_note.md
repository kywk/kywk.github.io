---
#id: chromeos_note
title: "ChromeOS: Notes"
description: "Dropbox setup & usage notes"
tags: [ChromeOS]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

hide_table_of_contents: true

date: 2022-10-20T00:00:00+08:00
image: https://i.imgur.com/mErPwqL.png
---

[ChromeOS] Setup / Usage Notes
==============================

Desktop
-------

在 ChromeOS 上使用 Dropbox 可參考: [Dropbox HowTos](./chromeos_dropbox.md)

注音輸入在後期的 ChromeOS 上已有內建, 
從 `Settings` > `Advanced` > `Languages amd inputs` > `Inputs and keeyboards` > `Add input methods` 
找到注音輸入並新增即可.


Development
-----------

### Linux on ChromeOS ###

[Linux on ChromeOS | ChromeOS for developers](https://chromeos.dev/en/linux)
ChromeOS 2019 年後開始內建支援 Linux 容器. 
只要在設定裡面去啟用 Linux. 並分配使用空間即可.

啟用後, 在 `Files` 裡面會看到 `Linux files` 資料夾, 可在 ChromeOS 下存取 Linux Box 裡面的檔案.
同時在 `Files` 裡面也可以設定 `Share with Linux`, 讓 Linux 下可以存取 ChromeOS / Google Drive / .. 等檔案.

內建的 Linux 容器是 debian 系統, 軟體安裝使用大致和一般 debian 相去不遠.
而在 Linux 容器安裝的程式, 也可以在 ChromeOS 下使用. 整合的相當完善.

- [在 Chrome OS 下玩 Linux | 易玄的空間](http://eshensh.net/blog/2020-10-13_00-20)
- [Linux apps on ChromeOS in 2022: A complete guide](https://www.xda-developers.com/linux-apps-chrome-os/)


### Termnal ###

#### Zsh + Oh-My-Zsh ####

- [自定义 Chrome OS Linux 终端_weixin_0010034-DevPress官方社区](https://devpress.csdn.net/linux/62ed087689d9027116a11cba.html)

#### Fira Font ####

In the terminal:

1. Use the keyboard shortcut `CTRL` + `SHIFT` + `J` to open the JavaScript Console.
2. Copy & paste the following 3 commands:

```
term_.prefs_.set('font-family', '"Fira Code", Cousine, "Roboto Mono", "Source Code Pro", monospace');
term_.prefs_.set('user-css-text', "x-row { font-feature-settings: 'liga', 'calt', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07'; text-rendering: optimizeLegibility; }")
term_.prefs_.set('user-css', 'https://cdn.jsdelivr.net/npm/firacode@latest/distr/fira_code.min.css')
```

- [ChromeOS Terminal · tonsky/FiraCode Wiki · GitHub](https://github.com/tonsky/FiraCode/wiki/ChromeOS-Terminal)
- [Chrome devtools instructions · tonsky/FiraCode Wiki · GitHub](https://github.com/tonsky/FiraCode/wiki/Chrome-devtools-instructions)
- [GitHub - wernight/powerline-web-fonts: Powerline Web Fonts for Chromebook](https://github.com/wernight/powerline-web-fonts)


### IDE ###

暫時使用線上版 [vscode.dev](https://vscode.dev/) 作為編輯器, 
作為一個臨時方案, 基本需求都還能滿足.

最大的問題在一些快速鍵組合, 會和 Chrome 或 Chrome extension 衝突,
這部分仍適應中...



See Also
--------

ChromeOS Flex 發佈後, _如何安裝 ChromeOS Flex 讓老電腦重生_ 之類的教學雨後春筍般.
實際使用後覺得 ChromeOS 確實厲害, m3-6Y30 / 4G 的筆電竟然順跑, 分頁開了一堆也不至於嚴重 lag.

_本篇全在 ChromeOS 下編寫完成與發佈_

一般使用上手輕鬆, 設定安裝後, 除了上網機外, 也可臨時充當開發機使用, 相當便利.


- [ChromeOS | ChromeOS for developers](https://chromeos.dev/)
- [r/ChromeOS](https://www.reddit.com/r/chromeos/)
