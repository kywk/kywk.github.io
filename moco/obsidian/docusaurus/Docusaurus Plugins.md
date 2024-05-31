---
title: Plugins
description: Docusaurus Plugins 筆記
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Docusaurus
  - kywk
sidebar_position: 20
sidebar_label: Plugins Usage
#hide_table_of_contents: true
created: 2024-05-24
updated: 2024-05-24
history:
  - 2024-05-24 Init
---

# [Docusaurus] Plugin 使用筆記

## remark-wiki-link

[[Wikilink in Docusaurus:remark-wiki-link]] 可以支援 `[[Document Filename:Display Title]]` 這樣的 Wili 內部文件連結語法.

因 Obsidian 也是以 Wiki-Link 語法作為筆記文章間的關聯, 整合 Obsidian/Docusaurus 一起使用時,
讓 Docusaurus 直接使用 Wiki-Link 語法產生連結是相當有用的.

比起 `[Title](URL)` 形式的 Markdown Link, Wiki-Link 還有個好處是不需指明檔案絕對位置, 在產出文件網站時動態搜尋文件,
若重構資料夾結構或搬移檔案, 較不會造成連結失效.

## remark-oembed

[remark-oembed](https://github.com/sergioramos/remark-oembed) Converts URLs surrounded by newlines into embeds that are loaded asynchronously.

把獨立一行的 影片/圖片... URL 轉換成嵌入式格式, 顯示閱讀上較為近人.
