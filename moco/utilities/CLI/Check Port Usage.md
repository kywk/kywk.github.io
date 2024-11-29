---
title: IP/Port usage
description: find IP port usage
cover: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - CLI
hide_table_of_contents: true
date_created: 2024-05-30
---

# [CLI] 找出被佔用的 IP 及 Port

Unix-like 系統可在 terminal 使用 `lsof -n -i | grep LISTEN` 找出系統中正被使用的 port IP 及使用的程序.

如果要找出特定 port 號是否有被使用, 使用 `lsof -n -i:<port> | grep LISTEN`. port 為要查詢的port號

```bash
lsof -n -i | grep LISTEN
lsof -n -i:<port> | grep LISTEN
```

Ref: [Mac 找出被佔用的IP及port find IP port usage](https://matthung0807.blogspot.com/2019/11/mac-find-network-port-usage.html)
