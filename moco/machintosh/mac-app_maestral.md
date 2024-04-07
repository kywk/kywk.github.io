---
title: "App: Maestral"
description: Open source Dropbox client, Maestral
tags:
  - Mac
  - Dropbox
sidebar_position: 20
date_created: 2023-01-21T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/ACtC-3cYYtkzJjo_oG7Gzqq8T8XQm4V_qLE3wGWVKOahp6YT4lo-on60NJmjrkkatnizX1b-uID-MCM2ztsXH9z27cMRtql3PA5cpYZYbMfSPuM5Yh3MmqnjnnXYkTg6vtIiBL5SGAQRRAI9zEBIOoyP3tZpuA?authuser=0
---

[Mac] Maestral, Open source Dropbox client
==========================================

> [Maestral](https://maestral.app/) is a lightweight Dropbox client for macOS and Linux. It provides powerful command line tools, supports gitignore patterns to exclude local files from syncing and allows syncing multiple Dropbox accounts.

用過多個雲端硬碟服務, 檔案同步和 30 天歷史紀錄這兩點, Dropbox 還是熱勝其他家.
被 Dropbox 養套了許久, 但後期 Dropbox Desktop 程式的一些功能修改, 卻是遲遲未被殺的原因.

Dropbox 在 symbolic link 和選擇性不同步檔案處理方式的改變, 
透過 Dropbox 同步專案時, 程式套件和編譯輸出的檔案也被迫同步, 不是我想要的. 

近來壓垮駱駝最後一根稻草是 macOS 版 Dropbox 路徑被強迫改為 `~/Library/CloudStorage/Dropbox`. 
且無法自訂修改. 對習慣用 CLI 操作來說, 有些擾民.

比較其他家雲端服務的同時, 意外發現 __Maestral__.

Maestral 是 [Open Source](https://github.com/samschott/maestral) 的 Dropbox client.
初步試用後決定用他取代 Dropbox 官方 Desktop App. 

```
brew install maestral
```


Features
--------

### CLI mode ###

View and restore previous file versions, Create and revoke shared links, 
See a live view of all sync activity Directly from the [CLI commands](https://maestral.app/cli).

### Multi-user ###

The CLI allows configuring an unlimited number of Dropbox accounts. Just pass a new config name when linking a new account.

### .mignore ###

Exclude local items from syncing by placing an .mignore file in the Dropbox root with patterns matching any number of items.


### Unlimited number of devices ###

Maestral is not an official Dropbox App. It therefore does not count towards the three devices limit for Basic Dropbox accounts.

### CROS ###

初步使用發現的缺點大概是初始同步時比官方 App 來得慢, 且不支援 Lan sync. 
其他幾乎沒有什麼缺點, 是個取代官方 App 的好工具.
