---
title: Tips & Tricks
description: macOS 實用技巧與設定指南
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Mac
  - Tips
sidebar_position: 5
date_created: 2023-01-02T00:00:00.000Z
date_updated: 2025-01-20T00:00:00.000Z
slug: /machintosh/mac-tips-and-tricks/
---

# [Mac] macOS 實用小技巧與工具

## 系統設定

### 修正 Mac 自動調整 Desktop 順序

macOS 預設會根據使用頻率自動調整虛擬桌面順序，對習慣固定順序的使用者來說相當困擾。

**設定方式**：

1. 開啟「系統偏好設定」>「Mission Control」
2. 取消勾選「根據最近的使用情況自動重新排列空間」

![](https://i.stack.imgur.com/wYI6I.png)

參考資料：
- [Mac 會自己改變 Desktop 位置的問題](https://blog.gslin.org/archives/2023/01/31/11048/mac-會自己改變-desktop-位置的問題/)
- [How to prevent Mac from changing the order of Desktops/Spaces](https://apple.stackexchange.com/questions/214348/how-to-prevent-mac-from-changing-the-order-of-desktops-spaces)

### 設定自動開機/關機排程

macOS 內建排程功能，可設定自動開機、關機、睡眠或重新啟動。

**設定方式**：

1. 開啟「系統偏好設定」>「節能」
2. 點選「排程」按鈕
3. 設定開機和關機時間

參考資料：
- [MacOS 教學 - 如何設定自動開機／關機排程？](https://steachs.com/archives/73229)

### 顯示隱藏檔案

快速切換顯示/隱藏系統隱藏檔案：

```bash
# 顯示隱藏檔案
defaults write com.apple.finder AppleShowAllFiles TRUE
killall Finder

# 隱藏檔案
defaults write com.apple.finder AppleShowAllFiles FALSE
killall Finder
```

或使用快捷鍵：`Command` + `Shift` + `.`

### 截圖設定

修改截圖預設儲存位置：

```bash
# 設定截圖儲存位置
defaults write com.apple.screencapture location ~/Pictures/Screenshots
killall SystemUIServer

# 取消截圖陰影效果
defaults write com.apple.screencapture disable-shadow -bool true
killall SystemUIServer
```

## Finder 技巧

### 讓資料夾排列在最上方

**設定方式**：

1. 開啟 Finder 偏好設定（`Command` + `,`）
2. 進到「進階」頁籤
3. 勾選以下選項：
   - 顯示所有檔案副檔名
   - 在名稱排序時將檔案夾保留在最上方（兩個都勾選）

![](https://pocket-image-cache.com//filters:format(jpg):extract_focal()/https%3A%2F%2Fi0.wp.com%2Fsteachs.com%2Fwp-content%2Fuploads%2F2023%2F02%2F14.png%3Fresize%3D756%252C758%26ssl%3D1)

參考資料：
- [macOS 新手使用必學的五個小技巧](https://steachs.com/archives/61740)

### 快速前往資料夾

在 Finder 中按 `Command` + `Shift` + `G`，輸入路徑快速前往：

```
~/Library
/usr/local
/etc
```

### 顯示路徑列

在 Finder 中顯示完整路徑：

```bash
# 方法一：選單列
# 檢視 > 顯示路徑列

# 方法二：快捷鍵
# Option + Command + P
```

### 複製檔案路徑

選取檔案後按 `Option` + `Command` + `C` 複製完整路徑。

## 鍵盤快捷鍵

### 系統快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Command` + `Space` | 開啟 Spotlight |
| `Command` + `Tab` | 切換應用程式 |
| `Command` + `` ` `` | 同應用程式視窗切換 |
| `Command` + `Q` | 關閉應用程式 |
| `Command` + `W` | 關閉視窗 |
| `Command` + `H` | 隱藏視窗 |
| `Command` + `M` | 最小化視窗 |
| `Control` + `Command` + `Q` | 鎖定螢幕 |

### Finder 快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Command` + `N` | 新增 Finder 視窗 |
| `Command` + `Shift` + `N` | 新增資料夾 |
| `Command` + `Delete` | 移至垃圾桶 |
| `Command` + `Shift` + `Delete` | 清空垃圾桶 |
| `Command` + `I` | 顯示簡介 |
| `Command` + `D` | 複製檔案 |
| `Space` | 快速查看 |

### 截圖快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Command` + `Shift` + `3` | 全螢幕截圖 |
| `Command` + `Shift` + `4` | 區域截圖 |
| `Command` + `Shift` + `5` | 截圖工具列 |
| `Command` + `Shift` + `6` | Touch Bar 截圖 |

## Shell 腳本技巧

### 檢查作業系統

```bash
if [[ $OSTYPE == 'darwin'* ]]; then
  echo 'macOS'
fi
```

參考資料：
- [Bash: Check Operating System is Mac](https://remarkablemark.org/blog/2020/10/31/bash-check-mac/)

### 檢查端口使用

```bash
# 檢查特定端口
lsof -i :8080

# 檢查所有監聽端口
lsof -i -P | grep LISTEN

# 使用 netstat
netstat -an | grep LISTEN
```

### 批次重新命名

```bash
# 使用 rename 工具
brew install rename

# 批次替換檔名
rename 's/old/new/' *.txt

# 批次加入前綴
rename 's/^/prefix_/' *.jpg
```

### 查找大檔案

```bash
# 查找大於 100MB 的檔案
find . -type f -size +100M

# 列出目錄大小並排序
du -sh * | sort -hr | head -10
```

## 效能優化

### 清理系統快取

```bash
# 清理 DNS 快取
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# 清理系統快取
sudo rm -rf /Library/Caches/*
rm -rf ~/Library/Caches/*
```

### 重建 Spotlight 索引

```bash
# 停用 Spotlight
sudo mdutil -a -i off

# 刪除索引
sudo rm -rf /.Spotlight-V100

# 重新啟用
sudo mdutil -a -i on
```

### 重置 NVRAM/PRAM

開機時按住 `Option` + `Command` + `P` + `R`，直到聽到第二次開機聲。

### 重置 SMC

**MacBook（可拆卸電池）**：
1. 關機
2. 拆下電池
3. 按住電源鍵 5 秒
4. 裝回電池並開機

**MacBook（內建電池）**：
1. 關機
2. 按住 `Shift` + `Control` + `Option` + 電源鍵 10 秒
3. 放開所有按鍵後開機

## 安全與隱私

### 檢查檔案簽名

```bash
# 檢查應用程式簽名
codesign -dv --verbose=4 /Applications/App.app

# 驗證簽名
spctl -a -v /Applications/App.app
```

### 移除檔案隔離屬性

```bash
# 移除單一檔案的隔離屬性
xattr -d com.apple.quarantine file.app

# 遞迴移除整個目錄
xattr -dr com.apple.quarantine /path/to/directory
```

### 檢查開機項目

```bash
# 列出 LaunchAgents
ls ~/Library/LaunchAgents/

# 列出 LaunchDaemons
ls /Library/LaunchDaemons/
```

## 網路工具

### 查看網路資訊

```bash
# 查看 IP 位址
ipconfig getifaddr en0

# 查看所有網路介面
ifconfig

# 查看路由表
netstat -nr
```

### 測試網路連線

```bash
# Ping 測試
ping -c 5 google.com

# Traceroute
traceroute google.com

# DNS 查詢
nslookup google.com
dig google.com
```

### 網路速度測試

```bash
# 安裝 speedtest-cli
brew install speedtest-cli

# 執行測試
speedtest-cli
```

## 實用工具

### 文字處理

```bash
# 批次轉換編碼
iconv -f BIG5 -t UTF-8 input.txt > output.txt

# 計算檔案行數
wc -l file.txt

# 搜尋文字
grep -r "search term" /path/to/directory
```

### 壓縮與解壓縮

```bash
# 建立 zip 壓縮檔
zip -r archive.zip folder/

# 解壓縮 zip
unzip archive.zip

# 建立 tar.gz
tar -czf archive.tar.gz folder/

# 解壓縮 tar.gz
tar -xzf archive.tar.gz
```

## 參考資料

### 影片教學

- [提高 Mac 生產力的高效小技巧！](https://www.youtube.com/watch?v=uhQSCPDSxk4)
- [10 MUST-KNOW Macbook Tips for Productivity!](https://www.youtube.com/watch?v=5XfR6xBBXhw)
- [10 AWESOME MacBook tips I bet you didn't know!](https://www.youtube.com/watch?v=Hb7bAkgDxHE)

### 相關文章

- [[Mac Apps Setup]] - Mac 應用程式安裝清單
- [[Mac Development Environment Setup]] - Mac 開發環境建置
- [[Awesome Machintosh]] - macOS 相關資源整理
