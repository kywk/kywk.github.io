---
title: "PowerShell: How to Zip (and Unzip) Files"
date: 2021-04-14T11:45:28+08:00
images: ["https://lh3.googleusercontent.com/pw/ACtC-3cPqSgsILVWQUJLUO-B39cp4gUhiMB-BSO7R0u1j5ce7Zsc8xvuTeMsxNwE_pvNj7BDkE1MZ2t_nRgJebUtxx2-MKXstRulc9N44FSZbOOaN91_WMer6PA8XjwA75P8E7aUWLZaQUi-oSAKMYz_ao1ncw=w760-h428-no?authuser=0"]
categories: ["powershell"]
tags: ["cli", "powershell"]
toc: false
---

專案的佈署腳本中, 通常會存在複製程式碼到特定資料夾的步驟.
這次遇到的問題是複製中文檔名時發生錯誤.

```
88Copy-Item : �e���L�k�ƻs���{�����������ءC
89���� �u��:1 �r��:1
90+ Copy-Item -Path F:_emp\BIN\* -Destination F:\xxx\xxx ...
91+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
92    + CategoryInfo          : InvalidArgument: (F:_emp\BIN\_theme:String) [Copy-Item]�APSArgumentExceptio
93    n
94    + FullyQualifiedErrorId : CopyContainerItemToLeafError,Microsoft.PowerShell.Commands.CopyItemCommand
```

然而同一份 gitlab.yml 檔, 有時成功有時失敗. 也許和不同 runner 有關, 
加上發案方的許多防火牆限制, 都讓追查問題相當困難.

實話說 Windows 的編碼問題, 對於長期習慣在 UNiX (macOS, Linux) 下工作人來說, 有些一頭霧水.
雖然這次的情況, 是個契機去好好了解與學習 Windows 與 PowerShell 下如何處理與避免編碼問題.
可惜恰好遇上繁忙, 無法慢慢去釐清與學習了解.

Workaround 的解法是, 在 CI/CD Pipeline 編譯成功之後, 把檔案壓縮打包.
後續再解壓縮來佈署.

在 PowerShell 5.0 以後可透過 [Compress-Archive](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.archive/compress-archive) 和 [Expand-Archive](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.archive/expand-archive) 
來壓縮和解壓縮 Zip 檔案. 常用簡單命令如後:

__建立 Zip 壓縮檔__

``` powershell
# 建立 Zip 壓縮檔
$ Compress-Archive -Path D:\MyFolder -DestinationPath D:\MyArchive.zip
```

這樣 PowerShell 就會將 `D:\MyFolder` 這整個目錄壓縮成 `D:\MyArchive.zip` 這個壓縮檔.  
如果要分開指定多個檔案, 可以用逗號分隔:

``` powershell
# 壓縮多個檔案
$ Compress-Archive -Path D:\MyFolder\MyFile.docx, D:\MyFolder\MyImg.jpg -DestinationPath D:\MyArchive.zip
```

__強制覆蓋舊檔__

在建立壓縮檔時, 目標的 Zip 壓縮檔已經存在的話, `Compress-Archive` 就會顯示錯誤訊息.
加上 `-Force` 可以強制覆蓋舊的 Zip 壓縮檔.

``` powershell
# 強制建立 Zip 壓縮檔
Compress-Archive -Path D:\MyFolder -Force -DestinationPath D:\MyArchive.zip
```

__更新壓縮檔__

和強制覆蓋不同, 若加上 `-Update` 參數則可更新原有壓縮檔的內容. 
PowerShell 會比對 `D:\MyArchive.zip` 與 `D:\MyFolder\*.txt` 中的檔案, 將有更新的檔案加入 `D:\MyArchive.zip` 壓縮檔中, 若有新增的檔案也會一併加入.

``` powershell
# 更新壓縮檔
Compress-Archive -Path D:\MyFolder\*.txt -Update -DestinationPath D:\MyArchive.zip
```

__壓縮層級__

壓縮層級會影響壓縮所耗費的時間以及所產生的壓縮檔大小.
可以使用 `-CompressionLevel` 來指定壓縮層級.
可用的選項如下:

| 層級           | 說明                               |
|:-------------:|:-----------------------------------|
| NoCompression | 不要進行壓縮. 速度最快, 檔案最大.       |
| Fastest       | 使用快速的方式壓縮, 會產生較大的壓縮檔.  |
| Optimal       | 最佳壓縮, 產生的壓縮檔較小. 為預設模式. |

__解壓縮 Zip 檔__

使用 Expand-Archive 指令：

``` powershell
# 解壓縮 Zip 檔
Expand-Archive -Path D:\MyArchive.Zip -DestinationPath D:\Output
```

執行之後就會將 `D:\MyArchive.Zip` 解壓縮至 `D:\Output` 目錄中. 如果 `D:\Output` 目錄不存在的話, 解壓縮時它會自動建立.


_後記更新_

最後發現, 和中文檔名一點關係也沒. 

簡單來說, 在 PowerShell 下使用 `Copy-Item` 時, 
最好是搭配 `-LiteralPath` 而非 `-Path` 已避免錯誤.
至於原因, 暫時無力追蹤理解. 
請先參考 [Copy-Item 官方說明](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/copy-item) 自行求解.


_Reference_

-   [Microsoft.PowerShell.Archive Module - PowerShell | Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.archive/)
-   [PowerShell 壓縮與解壓縮 Zip 壓縮檔教學與範例 - Office 指南](https://officeguide.cc/powershell-compress-uncompress-zip-file-tutorial-examples/)
-   [How to Zip (and Unzip) Files Using PowerShell](https://www.howtogeek.com/670314/how-to-zip-and-unzip-files-using-powershell/)
