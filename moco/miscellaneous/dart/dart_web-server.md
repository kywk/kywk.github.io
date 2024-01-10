---
title: "Web server"
description: "Dart: Web Server"
tags: [Dart, Backend]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

hide_table_of_contents: true

created: 2022-10-30T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[Dart] Web Server Framework
===========================

Dart 語言伴隨 Flutter 面市, 多數是用來開發 Flutter App 使用.
隨著 Flutter 越趨受歡迎, Flutter App 越來越多元, 背後的 Dart 語言生態也逐漸豐富.

那, __Dart 能否拿來開發 Web Server?__ 


Performance
-----------

Dart Web Server 效能表現上如何?

- [Dart vs Node.js: compare performance on HTTP server implementations / Sudo Null IT News](https://sudonull.com/post/6170-Dart-vs-Nodejs-compare-performance-on-HTTP-server-implementations)
- [Dart vs Go REST Server Performance Comparison Study •](https://www.nequalsonelifestyle.com/2022/02/12/dart-vs-go-rest-server-performance-study/)

從這兩篇來看, 效能雖比不上 Go, 但也和 Node.js 不相上下.
這樣的效能表現是相當的好消息.

內部轉型推動上, 
1. Flutter App 端 Dart SDK 先行開發使用, 介接舊系統服務.
2. 日後新建 Web Server 時, 原 Dart 元件轉移到後端,
3. 最終評估是否需要用 Go 或其他語言, 不介接舊系統, 重新開發 Web Server.


Framework
---------

效能問題解決了, 那 Dart 是否有和 Go / Node.js 一樣方便的後端框架呢?

- [Dart REST Server Framework Performance Comparison Study •](https://www.nequalsonelifestyle.com/2022/02/11/dart-rest-server-framework-performance-study/)
- [10 Open-source Dart Web server Frameworks](https://medevel.com/10-dart-web-frameworks/)

| Project                                              |   updated    | stars | forks |  status  | license  |
| ---------------------------------------------------- | :----------: | :---: | :---: | :------: | :------: |
| [Conduit](https://github.com/conduit-dart/conduit)   | Oct 30, 2022 |  294  |  274  |          |  BSD-2   |
| [Aqueduct](https://github.com/stablekernel/aqueduct) | Sep 1, 2020  | 2.4k  |  274  | archived |  BSD-2   |
| [Lucifer](https://github.com/salkuadrat/lucifer)     | Dec 16, 2021 |  18   |   1   |    -     |   MIT    |
| [Jaguar](https://github.com/Jaguar-dart/jaguar)      | Apr 9, 2022  |  443  |  32   |          |    -     |
| [Stream](https://github.com/rikulo/stream)           | Oct 18, 2022 |  220  |  22   |          | Apache-2 |
| [Alfred](https://github.com/rknell/alfred)           | Aug 19, 2022 |  420  |  23   |          |   MIT    |
| [Start](https://github.com/lvivski/start)            | May 12, 2021 |  520  |  51   |    -     |   MIT    |
| [Vane](https://github.com/Scorpiion/Vane)            | May 18, 2021 |  55   |  18   |    -     |  BSD-3   |
| [Angel](https://github.com/angel-dart/angel)         | Apr 27, 2021 | 1.1k  |  73   | archived |   MIT    |
| [Shelf](https://github.com/dart-lang/shelf)          | Oct 26, 2022 |  677  |  111  |          |  BSD-3   |

_Updated: Oct 30, 2022_

畢竟 Dart 主要生態不在後端開發, 相關框架遠比不上 Go / Node.js 一樣多元, 
但從以上社群參考發展而來的框架看來還夠用. 

可惜早期開發, 使用者和社群最活躍的 [Aqueduct](https://aqueduct.io/) 和 [Angle](https://angel-dart.dev/) 陸續不再維護.
幸運的是 Conduit 繼承了 Aqueduct 繼續開發, 另外也有 Sheif 這樣輕快的框架. 
考量專案更新活躍度, 考慮從 Conduit / Sheif 中擇一當作服務器框架.


Conduit
-------


Shelf
-----



See Also
--------

- [10 Open-source Dart Web server Frameworks](https://medevel.com/10-dart-web-frameworks/)
- [Top Flutter and Dart Backend, Web Server and Web Frameworks | Flutter Gems](https://fluttergems.dev/web-server/)
- [Conduit: A modern Dart server framework](https://www.theconduit.dev/)
- [Angel - Dart on the Server](https://angel-dart.dev/)
