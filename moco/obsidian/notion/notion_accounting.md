---
title: 記帳
description: Notes of Moo Cow
tags:
  - Notion
  - Accounting
  - kywk
hide_table_of_contents: false
date_created: 2024-04-16
date_updated: 2024-04-19
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

# [Notion] 用 Notion 記帳

## 前言 / 廢言

會想用 Notion 是在 Youtube 滑到 [我用 Notion 打通 iPhone 快捷指令，做了一个免费的记账 APP。 - YouTube](https://www.youtube.com/watch?v=TO7HfjW3A-M) 這影片. 仔細看完後覺得是個不錯的想法, 便著手打造自己的 Notion 記帳資料庫.

### Why Notion

選用 Notion 而不用 Obsidian 主要兩點.

**線上同步**
記帳需要手機隨時同步, 目前我的 Obsidian 使用以 local storage 加上雲端磁碟來作為裝置間同步, 若同步頻率過於頻繁偶爾會發生檔案衝突的問題.
這問題在單篇筆記還好手動排除, 若是記帳的逐條紀錄, 失誤率可能會過高.

**累計加總計算**
雖然 Obsidian 有些外掛可以模擬 Notion Database 的功能, 但其背後仍以 Obsidian 文件作為資料庫來源. 每日的記帳的統計需求有效能低落的疑慮.

## Requirement

幾個個人需求如下:

### Keep it simple

如同 [我用 Notion 打通 iPhone 快捷指令，做了一个免费的记账 APP。 - YouTube](https://www.youtube.com/watch?v=TO7HfjW3A-M) 影片中所提, 單純記帳其實很簡單, 不該放入太多投資理財功能進來.
雖然個人仍有其他帳務需求, 但仍會秉持 **Keep it simple** 核心概念來設計帳務資料庫與樣板.

### 分離帳戶

日前使用 [AndroMoney](#) 當記帳軟體時, 很喜歡裡面的帳戶功能. 可以建立錢包 / 信用卡 / 銀行 / ... 等多個帳戶, 記帳時紀錄從哪個帳戶支出開銷, 並紀錄帳戶間的轉帳資訊.
可以統計不同帳戶的支出狀況, 在信用卡的管理使用上很是方便.

### 預算管理

這部份是從 [手機記帳💰 如何用 Notion APP 每日記帳 & 預算法則 | Notion 分享 - YouTube](https://www.youtube.com/watch?v=iNT2ptIJE9E) 偷來的概念.
覺得有預算控管的分類, 的確可以更有效了解自己開支是否浪費.

### 總覽 / 檢視面板

## Database

- [[Expense]]
- [[Incoming]]
- [[Transfer]]
- [[Budgeting]]
- [[Accounts]]

## Dashboard

- [[Finance Summary]]
- [[Monthly / Yearly Review]]

## API Integration

- [[API to add an expense record]]

## See Also

### 後記

這次的 reference 都為 Youtube 影片...

曾幾何時, Youtube 上 20 分鐘的影片已經成了長影片, 更多的是不知所云的三物而圖文為主的部落格幾乎完全失利了. 除了專業技術文章外, 稍微普羅大眾一點的資訊都只能從影片上找教學.

但老派如我, 仍覺得文章閱讀非但較清楚, 還能依自己的速度和需求快轉或停留, 就像個人仍比較喜歡漫畫甚過動畫, 小說勝過翻拍電影一樣.

### Refs

- [手機記帳💰 如何用 Notion APP 每日記帳 & 預算法則 | Notion 分享 - YouTube](https://www.youtube.com/watch?v=iNT2ptIJE9E)
- [如何透過Notion記帳💰？免費記帳模板 - YouTube](https://www.youtube.com/watch?v=KfLgQTPpl1Y)

### TODO

### Notion document design

- [x] Database schema & relationship 📅 2024-04-18 ✅ 2024-04-18
- [ ] 開支 summary dashboard 📅 2024-10-23
- [ ] 帳戶 summary dashboard 📅 2024-10-24
- [ ] 年 / 月報表 📅 2024-10-29

### Notion accounting 文章

- [ ] Keep it simple 📅 2024-10-21
- [ ]  分離帳戶 / 預算控制
- [ ] Dashboard

### Next Step

- [ ] API integration
- [ ] Telegram bot
