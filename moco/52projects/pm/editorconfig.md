---
#id: editorconfig
title: Editor Config
description: Editor Config
tags: [PM, DevEnv]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

#hide_table_of_contents: true

created: 2022-08-13T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

Editor Config
=============

資訊圈有諸多爭論不休的議題, 各有擁簇支持者. 
如老派長久以來的 Linux VS FreeBSD / Vim VS Emacs / Tab VS Space / ... 等等,
近代可能還有 Sublime Text VS Atom VS VS Code 等.

其中和專案管理較為相關的應該是 Tab VS Space 了. 
專案越趨龐大後, 人多手雜, 每個人開發環境不太一樣, 使用的 IDE 也是五花八門.
只要能正確完成開發測試, 或許工程師各自使用何種系統, 何種編輯器對專案較無影響.

而 Tab 和 Space 的混用, 或各自習慣的縮排長度不同, 會讓專案程式碼變得混亂.
寫 code 的習慣怪僻也是一堆, 如果任由其自由發展, 到最後整個 code base 你都會不忍直視.

[EditorConfig.org 推動的 EditorConfig](https://editorconfig.org/) 就是為了解決類似問題的插件.
只要編輯器支援, 在專案中加入 `.editorconfig` 檔. 即可配置專案中檔案風格,
諸如縮排方式, 縮排長度, EOL 字元...等. 
開啟檔案或存檔時, 編輯器會自動依設定轉換程式編輯風格, 確保專案檔案風格皆相同.



.editorconfig
-------------

`.editorconfig` 是 INI 格式的檔案, 由 __section__ 跟 __properties__ 組成的設定格式:

-   section
    -   被套用的檔案路徑跟副檔名, 例如 .py .jc .java 格式檔
    -   舉例來說若要指定專案目錄底下的所有 .js 檔與 .py 檔可以輸入 `[*.{js,py}]`
-   properties
    -   適用於相對 section 的規範範設定
    -   常見的設定如後

### Properties ###

The values are case insensitive. They will be lowercased by the core library.

-   `indent_style` tab | space  
    -   Indentation Style
-   `indent_size` an integer | tab  
    -   Indentation Size (in single-spaced characters)
-   `tab_width` a positive integer  
    -   width of a single tabstop character 
    -   defaults indent_size when indent_size is a number
-   `end_of_line` lf | crlf |cr
    -   line ending file format (Unix, DOS, Mac)
    -   if you want to use native line endings between different operating systems it is better not to set this option and leave that task to the VCS! In the future we might add a value like native for this scenario (cf #226).
-   `charset` latin1 | utf-8 | utf-16be | utf-16le | utf-8-bom
    -   file character encoding
    -   see [Character Set Support](https://github.com/editorconfig/editorconfig/wiki/Character-Set-Support)
-   `trim_trailing_whitespace` true | false
    -   whether whitespace is removed from the end of lines
    -   `true`: remove any whitespace characters preceding newline characters
    -   `false`: ensure the editor keeps whitespace characters
-   `insert_final_newline` true | false
    -   whether file should end with a newline

除了上列常見的屬性外, 語言或編輯器還有許多額外的規範設定, 詳情可見:  
- [EditorConfig Properties](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties) / 
- [.NET 程式碼樣式規則選項 - .NET | Microsoft Docs](https://docs.microsoft.com/zh-tw/dotnet/fundamentals/code-analysis/code-style-rule-options) / 
- [EditorConfig | IntelliJ IDEA](https://www.jetbrains.com/help/idea/editorconfig.html)

### Example ###

```ini title=".editorconfig"
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

# Use 4 spaces for the Python files
[*.py]
indent_size = 4
max_line_length = 80

# The JSON files contain newlines inconsistently
[*.json]
insert_final_newline = ignore

# Minified JavaScript files shouldn't be changed
[**.min.js]
indent_style = ignore
insert_final_newline = ignore

# Makefiles always use tabs for indentation
[Makefile]
indent_style = tab

# Batch files use tabs for indentation
[*.bat]
indent_style = tab

[*.md]
trim_trailing_whitespace = false
```



Editor Support
--------------

常見的編輯器幾乎都有支援, 簡單列出部份如下:

-   JetBrain’s IDEs, including PhpStorm, and WebStorm
-   Atom
-   Sublime Text
-   Emacs & Vim
-   gEdit, jEdit, & Notepad++
-   textmate
-   Visual Studio / VS Code
-   Xcode



小結
----

其實該不該用 EditorConfig 其實也有各自支持者, 
有一派認為使用 EditorConfig 能讓專案維持一致編排效果, 管理上較為方便.

另一派卻覺得每個人有自己習慣喜好的配置, 強迫每個人都用一樣配置過於王道.
要維持專案的一致性, 可以透過 Git Hook 來作到 commit 前的檢查與轉換, 
工程師仍可用自己習慣的配置來編輯.

各有對錯好壞, 專案開始前團隊先確認協調好管理方式才是正解.

GitHub 有針對各語言, 編輯器, 環境系統整理了 [.gitignore template](https://github.com/github/gitignore).
仿效 .gitignore, 
開了個 [.editorconfig collection](https://github.com/kywk/editorconfig) 專案來整理各語言常用的 `.editorconfig`



See Also
--------

-   [Projects Using EditorConfig](https://github.com/editorconfig/editorconfig/wiki/Projects-Using-EditorConfig)
-   [[Day-15] Editor Config自訂編輯與設定 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10193754)
-   [EditorConfig 快速使用指南 | How-To | Editor 編輯者 #8 | by Aaron Huang | Medium](https://medium.com/@aar0nTw/5ad3dd6d1e92)
