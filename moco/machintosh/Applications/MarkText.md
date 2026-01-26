---
title: MarkText
description: 開源 WYSIWYG Markdown 編輯器
tags:
  - Mac
  - Markdown
sidebar_position: 20
hide_table_of_contents: true
date_created: 2024-04-24
image: https://lh3.googleusercontent.com/pw/ACtC-3cYYtkzJjo_oG7Gzqq8T8XQm4V_qLE3wGWVKOahp6YT4lo-on60NJmjrkkatnizX1b-uID-MCM2ztsXH9z27cMRtql3PA5cpYZYbMfSPuM5Yh3MmqnjnnXYkTg6vtIiBL5SGAQRRAI9zEBIOoyP3tZpuA?authuser=0
slug: /machintosh/applications/marktext/
---

# [MacApps] MarkText

想找一個 Open Source、可商業使用的 WYSIWYG Markdown 編輯器在公司電腦，找了一圈後覺得 [MarkText](https://github.com/marktext/marktext) 最符合自己需求。

> MarkText is an MIT licensed open source project, and the latest version will always be downloadable for free from the GitHub release page. MarkText is still in development, and its development is inseparable from all sponsors.

## 安裝

```bash
brew install --cask marktext
```

## 問題排除

Apple M1 系列安裝後會出現套件損毀訊息，需執行以下指令修復：

```bash
xattr -cr /Applications/MarkText.app
```

參考資料：
- [Cannot install MarkText 0.17.0rc2-arm64 on M1 MacBook Air · Issue #2983](https://github.com/marktext/marktext/issues/2983)
