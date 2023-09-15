---
title: "小米筆電 Pro 15.6 2018 安裝黑蘋果 Big Sur 紀錄"
date: 2021-04-04T15:07:52+08:00
images: []
categories: ["hackintosh"]
tags: ["hackintosh"]
toc: false
draft: true
---

筆電配置
-------

| Specifications      | Detail                                     |
|:-------------------:|:-------------------------------------------|
| Computer model      | Xiaomi NoteBook Pro 15.6'' (MX150)         |
| Processor           | Intel Core i7-8550U Processor              |
| Memory              | 16GB Samsung DDR4 2400MHz                  |
| Hard Disk           | Samsung NVMe SSD Controller PM961          |
| Integrated Graphics | Intel UHD Graphics 620                     |
| Monitor             | BOE NV156FHM-N61 FHD 1920x1080 (15.6 inch) |
| Sound Card          | Realtek ALC298 (layout-id: 30/99)          |
| Wireless Card       | Intel Wireless-AC 8265                     |
| Trackpad            | ETD2303                                    |
| SD Card Reader      | Realtek RTS5129 / RTS5250S                 |



軟體與前置準備
------------

-   [macOS Big Sur 鏡像](https://download.shaoxingshare.com/t/l0mvW0M1gx)
    -   [製作 Big Sur ISO](https://kywk.github.io/moco/posts/tool/macos_make-installer-iso/)
    -   [balenaEtcher - Flash OS images to SD cards & USB drives](https://www.balena.io/etcher/)
-   [acidanthera/OpenCorePkg: OpenCore bootloader](https://github.com/acidanthera/OpenCorePkg)
    -   [OpenCore Install Guide](https://dortania.github.io/OpenCore-Install-Guide/)
-   [MiBook Pro EFI](https://github.com/daliansky/XiaoMi-Pro-Hackintosh)



製作 USB 引導與安裝碟
------------------



安裝系統
-------


脫離 USB 啟動
------------




See also
--------

### Reference ###

-   [daliansky/XiaoMi-Pro-Hackintosh: XiaoMi NoteBook Pro Hackintosh](https://github.com/daliansky/XiaoMi-Pro-Hackintosh)
-   黑果小兵 TG 群安装镜像
    -   [主线 https://download.shaoxingshare.com/t/l0mvW0M1gx](https://download.shaoxingshare.com/t/l0mvW0M1gx)
    -   [备用 https://download.shaoxingshare.com/t/6GpM2WdLWR](https://download.shaoxingshare.com/t/6GpM2WdLWR)
    -   [EFI共享 https://download.shaoxingshare.com/t/9jkMKzv21y](https://download.shaoxingshare.com/t/9jkMKzv21y)
    -   [balenaEtcher https://download.shaoxingshare.com/t/Kn0vg9dz47](https://download.shaoxingshare.com/t/Kn0vg9dz47)
    -   [驱动仓库 https://download.shaoxingshare.com/t/opEvD3BRkW](https://download.shaoxingshare.com/t/opEvD3BRkW)
    -   [软件共享 https://download.shaoxingshare.com/t/qLEMqWB4lA](https://download.shaoxingshare.com/t/qLEMqWB4lA)
-   教學與分享
    -   [【最新黑苹果】Big Sur/Win双系统-小米笔记本pro/gtx 安装教程 精通时间管理-CSDN博客](https://blog.csdn.net/weixin_43912833/article/details/107308745)
    -   [小米笔记本电脑Ruby-15.6 2019款【完美黑苹果Mac OS Big Sur】l992625380的博客-CSDN博客](https://blog.csdn.net/l992625380/article/details/109597900)
    -   [【黑蘋果】幸運不再 - 大遷徙時代來臨：Clover -> OpenCore @ －Ben's PHOTO－ :: 痞客邦 ::](https://benjenq.pixnet.net/blog/post/47433356-幸運不再---大遷徙時代來臨：clover--%3E-opencore)
