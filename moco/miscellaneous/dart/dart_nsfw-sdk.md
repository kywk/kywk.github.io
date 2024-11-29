---
title: NSFW SDK
description: "Dart: NSFW SDK"
tags:
  - Dart
  - Backend
  - Flutter
hide_table_of_contents: true
date_created: 2022-11-01T00:00:00+08:00
cover: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[Dart] NSFW SDK
===============

因應必然要跟上的數位轉型需求, 公司決定採用 Flutter 進行新 App 的開發.
但因舊系統 API 各方面開發設計都有極大問題, 團隊歷經討論後, 決議不讓新 App 直接介接舊系統.

理想上是建立新 Web Service, 對客戶端提供全新 API, 
對內依需求介接舊 API 服務或直接存取內部資源皆可.
礙於總總政治管理角力等, 新 Web Servoces 建置可能遙遙無期,
折衷方案則是用 Dart 開發客戶端 SDK, 提供標準 Web Services 接口,
代理 Flutter App 呼叫舊系統 API, 轉換整理資料後提供 JSON 給客戶端. 

腦洞大開的想法是, 既然整理資料的元件都寫好了, 有沒有機會那天建構 Web Services 時, 
可以直接沿用這些程式元件. __Dart 能否拿來開發 Web Server?__ 




See Also
--------

