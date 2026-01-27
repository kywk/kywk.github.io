---
title: Maestral
description: 開源 Dropbox 客戶端 Maestral
image: https://lh3.googleusercontent.com/pw/ACtC-3cYYtkzJjo_oG7Gzqq8T8XQm4V_qLE3wGWVKOahp6YT4lo-on60NJmjrkkatnizX1b-uID-MCM2ztsXH9z27cMRtql3PA5cpYZYbMfSPuM5Yh3MmqnjnnXYkTg6vtIiBL5SGAQRRAI9zEBIOoyP3tZpuA?authuser=0
tags:
  - Mac
  - Dropbox
date_created: 2023-01-21
slug: /machintosh/applications/maestral/
---

# [Mac] Maestral, Open source Dropbox client

> [Maestral](https://maestral.app/) is a lightweight Dropbox client for macOS and Linux. It provides powerful command line tools, supports gitignore patterns to exclude local files from syncing and allows syncing multiple Dropbox accounts.

用過多個雲端硬碟服務，檔案同步和 30 天歷史紀錄這兩點，Dropbox 還是優勝其他家。被 Dropbox 養套殺許久，但後期 Dropbox Desktop 程式的一些功能修改，卻是遲遲未被殺的原因。

Dropbox 在 symbolic link 和選擇性不同步檔案處理方式的改變，透過 Dropbox 同步專案時，程式套件和編譯輸出的檔案也被迫同步，不是我想要的。

近來壓垮駱駝最後一根稻草是 macOS 版 Dropbox 路徑被強迫改為 `~/Library/CloudStorage/Dropbox`，且無法自訂修改。對習慣用 CLI 操作來說，有些擾民。

比較其他家雲端服務的同時，意外發現 **Maestral**。

Maestral 是 [Open Source](https://github.com/samschott/maestral) 的 Dropbox 客戶端。初步試用後決定用它取代 Dropbox 官方 Desktop App。

```
brew install maestral
```

## Features

### CLI 模式

直接從 [CLI 命令](https://maestral.app/cli) 查看和還原先前的檔案版本、建立和撤銷共享連結、即時查看所有同步活動。

### 多用戶支援

CLI 允許配置無限數量的 Dropbox 帳戶。只需在連結新帳戶時傳遞新的配置名稱。

### .mignore 支援

透過在 Dropbox 根目錄放置 `.mignore` 檔案，使用模式匹配排除本地項目不同步。

### 無裝置數量限制

Maestral 不是官方 Dropbox App，因此不計入 Basic Dropbox 帳戶的三台裝置限制。

### 缺點

初步使用發現的缺點大概是初始同步時比官方 App 來得慢，且不支援 LAN sync。其他幾乎沒有什麼缺點，是個取代官方 App 的好工具。
