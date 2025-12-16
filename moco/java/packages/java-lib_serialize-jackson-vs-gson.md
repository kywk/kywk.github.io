---
title: Jackson VS Gson
description: "PKG: Jackson VS Gson"
tags:
  - Java
  - Package
hide_table_of_contents: false
date_created: 2024-04-24
date_updated: 2024-04-30
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

# [Java] Jackson VS Gson

團隊討論著要選用 [Jackson](https://github.com/FasterXML/jackson) 還是 [Gson](https://github.com/google/gson) 當作專案主要的序列化/反序列化套件, 節錄這篇筆記.

另有筆記個別紀錄 [[java-lib_serialize-jackson|Jackson]] 和 [[java-lib_serialize-gson|Gson]] 介紹和使用,
本篇著重兩個的比較, 包括功能異同 / 效能資訊 / 開發的坑等等...

## Conclusion

先說結論, 團隊最終選擇 **Gson**. 和功能效能等其他原因無關, 單純因為既有專案中, 使用 Gson 的較多.

團隊運行決策中, 很多考量無法僅參考客觀因素, 各種主觀意見和歷史背景都會影響討論決策.

**沒有對錯, 都是取捨.**

## Annoatation schema compare

## Features

### Alias

### JsonUnwrapped

## See Also

- [@JsonProperty和@SerializedName对比\_@serializedname @jsonproperty-CSDN博客](https://blog.csdn.net/VIP_WangSai/article/details/103295717)
-
