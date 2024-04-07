---
title: "Hackintosh: 掛載 EFI 磁區"
description: Mount EFI
tags:
  - Mac
  - Hackintosh
sidebar_position: 90
hide_table_of_contents: true
date_created: 2021-05-14T14:56:41+08:00
image: https://lh3.googleusercontent.com/pw/ACtC-3fnLstA2rsbmbt0hI7IWqhfzOU17UzGFO6pEIfoC2_x_l526rOlZ3_p4RbWvVFWlT6uMlnPMzjCSxDILtn7Er5Ch0JPYJReE0BhmCXqJh6TsqrygLrL17dcz1Dyq3eJ7MZhHDqQhvWbX3zJvneD1CRanA=w800-no?authuser=0
---

[Mac] 掛載 EFI 磁區方式
=====================


EFI 系統磁區
-----------

EFI系統磁碟分割區是什麼?

> EFI 系統分割區是一個 FAT 或 FAT32 格式的磁碟分割區. UEFI 韌體可從 ESP 加載 EFI 啟動程式或者 EFI 應用程式.
> 
> [維基百科](https://zh.wikipedia.org/zh-tw/統一可延伸韌體介面)

EFI 分割區有什麼? 它包含了 4 個主要部分：啟動程式, 裝置驅動程式, 系統工具套件, 資料檔.
黑蘋果能正確在非官方機型上執行, 主要就是透過 EFI 提供相容於官方機型的驅動程式.

而 EFI 磁區雖然只是個標準的 FAT/FAT32 分割區, 但在 macOS 預設是不會被掛載的.
很多黑蘋果設定工具會提供掛載 EFI 磁區的功能.

但畢竟 EFI 磁區就是個標準的 FAT/FAT32 磁區, macOS 內建的 `diskutil` 就可以掛載 EFI 磁區了.


diskutil
--------

diskutil 是 macOS 內建的 CLI 工具之一. 
macOS 上跟磁碟操作相關軟體, 雖有著不同 UI 設計與操作流程外, 
底層大多是呼叫 diskutil 來完成磁碟控制動作.

__找出 EFI 磁區__

``` shell
$ diskutil list
```

上述指令會列出所有的磁碟機與分割, 這裡的磁碟機不僅是實體硬碟, 也包含虛擬硬碟區.
若有已掛載的 dmg 檔, 也會成列出來.

![](https://lh3.googleusercontent.com/pw/ACtC-3efwBMRjxRXpq_kljt8z-wfD6Eu5KSBvoA1URPrJk_HvCn9Uu86QndonRL52vvHJW1HTm_3pQsaKoELES87vsszgGCjCKjUhnVfhEn3tzUooooZDfONSZgVTt3iXtVNVS0lHqIAIA6w-WaPYfB1w5QdfQ=w576-h241-no?authuser=0)

標準 `GUID_partition_scheme` 分割的磁碟, 會包含一個 EFI 磁區和其他磁區.
記住 EFI 磁區最後面的識別代碼.

__掛載 EFI 磁區__

``` shell
$ sudo diskutil mount <EFI_IDENTIFIER>
```

這個指令會掛載 macOS 所支援的檔案系統, 預設掛載到 `/Volume/PARTITION_NAME` 資料夾.
EFI 磁區為 FAT/FAT32 檔案系統, 是 macOS 預設支援的格式, 所以會被掛載到 `/Volume/EFI`.

![](https://lh3.googleusercontent.com/pw/ACtC-3d4IQyZxA_CSiDhyw_aj4s2wRmsmrnYs2LsC0HlpC2Sf-lPxYTxaczp84XdWeHlRpkekyCd_PFrAtnks3EWiTa1spZTZuKJ2hc8eB-WCcFLQqHRFuUZfBUYhaPFMjFUoU1eEkOAl8WGWHJxMTmNsHF5Lg=w463-h95-no?authuser=0)

掛載完後就可以用任何工具去處理 EFI 的設定配置檔了.


See Also
--------

-   [MacOS 磁碟管理工具 diskutil 介紹](https://www.itread01.com/content/1546611722.html)
