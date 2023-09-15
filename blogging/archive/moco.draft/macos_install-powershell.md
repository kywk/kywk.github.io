---
title: "在 macOS 上安裝 PowerShell"
date: 2021-05-20T17:07:15+08:00
images: ["https://lh3.googleusercontent.com/pw/ACtC-3fmdaCe56gBA8EKmSB8MLan_nbM6KvOfpVFDwW_bizCE6hVG5yrCTST2RDSlh5WMARdGfOgJTwCaGa8y_8rQzg75TRBB3baFolhWK_7dMMYKO9N1EfrG3VAMRK799nvnM5rLFe-heuxL4af63JdSfOC_w=w800-no?authuser=0"]
categories: ["macos"]
tags: ["macos", "powershell", "cli"]
toc: false
---

> 這篇基本上沒啥技術價值, 只是沒想到自己會有在 macOS 上安裝 PowerShell 的這一天. 純紀錄之...

專案需求中需編寫些較為複雜的 PowerShell 腳本, 
在 Windows 環境下開發了一會有些不習慣, 
印象中 PowerShell Open Source 後有發行 macOS/Linux 版.
所以在 macOS 上安裝了 PowerShell 來測試腳本.


### Homebrew ###

微軟官方文件有提供幾種方法來安裝 PowerShell, 選擇最無腦的 Homebrew.

``` shell
$ brew install --cask powershell
```

安裝後確認是否可執行

``` shell
$ pwsh
```

![](https://lh3.googleusercontent.com/pw/ACtC-3cHo2FGRm1W3nVq6btEU-QpJdPR25Af3cQow3IbljntrSiS7Qjby-OKUZ_s6KY5lwAH2CEvSRVaLUfJFKFQfioywdvkYmwY1xg9xJPpRanbYm2ZshkBH3g2SwtpzgpNdam3GfGYwYOIcnfv89YRyYsJOA=w810-h628-no?authuser=0)


### See also ###

安裝完成後, 若需修改與配置環境或使用者設定檔, 官網有說明與介紹, 前往參考:
[在 macOS 上安裝 PowerShell - PowerShell | Microsoft Docs](https://docs.microsoft.com/zh-tw/powershell/scripting/install/installing-powershell-core-on-macos?view=powershell-7.1)
