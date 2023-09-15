---
title: "PowerShell: Path and LiteralPath"
date: 2021-04-15T13:24:47+08:00
images: ["https://lh3.googleusercontent.com/pw/ACtC-3dpAZLzoFBWAdfC1_58cWw8FxMIrCgD_bcbVcffosQvj89lSmbVEU_t8h5MIMabQq9DZPqF9GxQYp7J3z-1o_wit_O9fkB8nupsDi_lPlsRZr5b50bflIBcAQ9lue9YRdtBUh4ydu7GGSBFupa0sv5FGA=w800-no?authuser=0"]
categories: ["powershell"]
tags: ["cli", "powershell"]
toc: false
---

在 [PowerShell: How to Zip (and Unzip) Files](ps_zip-archive.md) 文中提及, 
遇到 `Copy-Item` 使用 `-Path` 遇到中文檔名時出現錯誤, 需改用 `-LiteralPath` 才成功.

所以會想到嘗試使用 `-LiteralPath`, 
主要是在 [PowerShell 壓縮與解壓縮 Zip 壓縮檔教學與範例 - Office 指南](https://officeguide.cc/powershell-compress-uncompress-zip-file-tutorial-examples/)
這篇看到: 「通常在大部分的情況下使用 -Path 即可，當遇到比較奇怪的檔名時，才會需要用到 -LiteralPath。」
結果換成 `-LiteralPath` 就成功了.

好奇查了一下兩者差別.

理解無誤的話, 簡單來說 `-LiteralPath` 直接把後面接的字串當作完整路徑字元. 
而 `-Path` 後面的字串, 可以是環境變數, 程式參數或表示式,
PowerShell 會邊查找檔案系統邊對應字串參數. 如:

``` powershell
-Path `"$somepath\$($_.basename).*`"
```

就因如此, 中文檔名對 `-Path` 來說可能有字元判讀上的錯誤, 導致失敗.

以上述定義來看的話, 其實大多時候應該是要配合 `-LiteralPath` 參數來使用才是.
[-Path vs -LiteralPath : PowerShell](https://www.reddit.com/r/PowerShell/comments/f6zlbp/path_vs_literalpath/) 
這篇也有人回:

{{% blockquote %}}
i always try to use -LiteralPath. i have too many files or dirs that use [] in the names. [grin]
generally speaking, i would avoid -Path unless i am sure i have need for what it does - allow a bit of waffling on just what the actual path used will turn out to be. i really prefer to KNOW that my code will work on the exact path i give it ... unless i want some other behavior.
{{% /blockquote %}}

看來 PowerShell 強大之餘, 坑還是不少. 筆記之.

_Reference_
-   [Powershell -LiteralPath with wildcard - Stack Overflow](https://stackoverflow.com/questions/60700747/powershell-literalpath-with-wildcard)
-   [-Path vs -LiteralPath : PowerShell](https://www.reddit.com/r/PowerShell/comments/f6zlbp/path_vs_literalpath/)
