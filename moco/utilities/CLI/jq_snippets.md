---
title: ./jq
description: command-line JSON processor.
tags:
  - CLI
hide_table_of_contents: true
date_created: 2023-08-10
date_update: 2023-08-10
cover: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[CLI]  [./jq](https://jqlang.github.io/jq/)
==========

Usage
-----



Trick & Tips
----

- 在 BASH script 使用 jq 時, 若是透過 `VAR=jq '.["foo"]'` 來設定變數為 jq parse 結果, 字串值 `"example"` 是代表 `'"example"'` 而非 `'example'`
	- 承上, 若 jq 查不到資料的 null 實際上代表 `'null'`
	- 這是由於 BASH script 是利用一個字串去接收 jq 查詢結果的 stdout 所導致


See Also
--------

### Ref:

- [jq 實戰教學 - MyApollo](https://myapollo.com.tw/blog/jq-by-example/)
- [jq : 命令列json處理工具. jq是一個command line的JSON處理器。 | by Evan | evan.fang | Medium](https://medium.com/evan-fang/jq-%E5%91%BD%E4%BB%A4%E5%88%97json%E8%99%95%E7%90%86%E5%B7%A5%E5%85%B7-a553c8940ef5)