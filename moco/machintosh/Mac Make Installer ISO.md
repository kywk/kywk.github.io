---
title: 'Note: 製作 macOS 安裝 ISO'
description: 製作 macOS 安裝 ISO 映像檔的完整指南
tags:
  - Mac
  - ISO
sidebar_position: 60
hide_table_of_contents: true
date_created: 2021-04-06T03:18:48.000Z
image: 'https://i.imgur.com/mErPwqL.png'
slug: /machintosh/mac-make-installer-iso/
---

# [Mac] 製作 macOS 安裝 ISO 檔

Apple 官方有 [如何製作 macOS 啟動安裝程式](https://support.apple.com/zh-tw/HT201372) 的詳盡說明。在這篇說明中並沒有明指特定開機媒體，可以為任何可掛載的裝置。

網路上有不少如何 [製作 macOS 系統安裝隨身碟](https://mrmad.com.tw/how-to-macos-catalina-usb-installer) 的文章，主要步驟和指令也和官方一樣，只是更詳盡的說明如格式化或命名 USB 隨身碟，避免初學者混淆犯錯。

## 製作原理

製作 macOS installer ISO 的基本概念：

1. 建立一個 DMG 檔後掛載
2. 把下載的 macOS installer 透過官方 `createinstallmedia` 指令安裝到剛剛掛載的磁碟
3. 卸載後再把 DMG 檔轉為 ISO 格式

## 製作步驟

### 1. 建立 DMG 檔

建立一個 13GB 大小的 DMG 檔，存在 `/tmp` 目錄。

macOS Big Sur 來說，大小約 12.5GB。使用 `hdiutil` 指令來產生 DMG 檔：

```shell
hdiutil create -o /tmp/BigSur -size 13000m -layout SPUD -fs HFS+J
```

**參數說明**：
- `-o`: 輸出檔案路徑
- `-size`: 映像檔大小（單位：m = MB）
- `-layout`: 分割區配置（SPUD = Single Partition - Apple Partition Map）
- `-fs`: 檔案系統（HFS+J = HFS Plus with Journaling）

### 2. 掛載 DMG 檔

```shell
hdiutil attach /tmp/BigSur.dmg -noverify -mountpoint /Volumes/install_build
```

**參數說明**：
- `-noverify`: 跳過驗證以加快速度
- `-mountpoint`: 指定掛載點

### 3. 製作安裝媒體

透過官方的 `createinstallmedia` 指令製作 installer media：

```shell
cd /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources
sudo ./createinstallmedia --volume /Volumes/install_build
```

執行過程中會顯示進度，完成後會看到類似以下訊息：

```
Erasing disk: 0%... 10%... 20%... 100%
Copying to disk: 0%... 10%... 20%... 100%
Making disk bootable...
Install media now available at "/Volumes/Install macOS Big Sur"
```

### 4. 卸載磁碟

```shell
hdiutil detach /Volumes/Install\ macOS\ Big\ Sur
```

或使用：

```shell
umount /Volumes/Install\ macOS\ Big\ Sur
```

### 5. 轉換為 ISO 格式

將 DMG 轉為 CDR 格式，再重新命名為 ISO：

```shell
hdiutil convert /tmp/BigSur.dmg -format UDTO -o /tmp/BigSur
mv /tmp/BigSur.cdr /tmp/BigSur.iso
```

**格式說明**：
- `UDTO`: DVD/CD master format
- CDR 格式實際上就是 ISO 格式，只是副檔名不同

## 不同 macOS 版本

### macOS Ventura (13.x)

```shell
hdiutil create -o /tmp/Ventura -size 14000m -layout SPUD -fs HFS+J
hdiutil attach /tmp/Ventura.dmg -noverify -mountpoint /Volumes/install_build
sudo /Applications/Install\ macOS\ Ventura.app/Contents/Resources/createinstallmedia --volume /Volumes/install_build
hdiutil detach /Volumes/Install\ macOS\ Ventura
hdiutil convert /tmp/Ventura.dmg -format UDTO -o /tmp/Ventura
mv /tmp/Ventura.cdr /tmp/Ventura.iso
```

### macOS Monterey (12.x)

```shell
hdiutil create -o /tmp/Monterey -size 13000m -layout SPUD -fs HFS+J
hdiutil attach /tmp/Monterey.dmg -noverify -mountpoint /Volumes/install_build
sudo /Applications/Install\ macOS\ Monterey.app/Contents/Resources/createinstallmedia --volume /Volumes/install_build
hdiutil detach /Volumes/Install\ macOS\ Monterey
hdiutil convert /tmp/Monterey.dmg -format UDTO -o /tmp/Monterey
mv /tmp/Monterey.cdr /tmp/Monterey.iso
```

### macOS Catalina (10.15)

```shell
hdiutil create -o /tmp/Catalina -size 9000m -layout SPUD -fs HFS+J
hdiutil attach /tmp/Catalina.dmg -noverify -mountpoint /Volumes/install_build
sudo /Applications/Install\ macOS\ Catalina.app/Contents/Resources/createinstallmedia --volume /Volumes/install_build
hdiutil detach /Volumes/Install\ macOS\ Catalina
hdiutil convert /tmp/Catalina.dmg -format UDTO -o /tmp/Catalina
mv /tmp/Catalina.cdr /tmp/Catalina.iso
```

## 建議磁碟大小

| macOS 版本 | 建議大小 |
|-----------|---------|
| Ventura (13.x) | 14GB |
| Monterey (12.x) | 13GB |
| Big Sur (11.x) | 13GB |
| Catalina (10.15) | 9GB |
| Mojave (10.14) | 7GB |

## 清理暫存檔

在 `/tmp` 目錄裡，雖然已經轉成 ISO 檔，但 DMG 檔還是會留著。可自行評估空間決定是否需要刪除 DMG 檔：

```shell
# 刪除 DMG 檔
rm /tmp/BigSur.dmg

# 或保留 DMG 檔以便日後使用
```

## 使用 ISO 檔

### 在虛擬機中使用

製作好的 ISO 檔可以在虛擬機軟體中使用：

- **VMware Fusion** - 直接掛載 ISO 檔
- **Parallels Desktop** - 選擇 ISO 檔作為安裝來源
- **VirtualBox** - 在儲存設定中掛載 ISO

### 燒錄到 USB

也可以將 ISO 檔燒錄到 USB 隨身碟：

```shell
# 查看 USB 裝置
diskutil list

# 卸載 USB（假設是 disk2）
diskutil unmountDisk /dev/disk2

# 燒錄 ISO
sudo dd if=/tmp/BigSur.iso of=/dev/rdisk2 bs=1m

# 彈出 USB
diskutil eject /dev/disk2
```

## 疑難排解

### 空間不足

如果 `/tmp` 空間不足，可以改用其他目錄：

```shell
hdiutil create -o ~/Desktop/BigSur -size 13000m -layout SPUD -fs HFS+J
```

### 權限問題

確保有足夠權限執行 `createinstallmedia`：

```shell
sudo ./createinstallmedia --volume /Volumes/install_build
```

### 找不到安裝程式

確認安裝程式位置：

```shell
ls /Applications/Install*.app
```

## 參考資料

- [如何製作 macOS 啟動安裝程式](https://support.apple.com/zh-tw/HT201372) - Apple 官方文件
- [將下載在電腦裡的 macOS 安裝程式轉成 ISO 檔](https://medium.com/彼得潘的-swift-ios-app-開發教室/將下載在電腦裡的macos-安裝程式轉成-iso檔-f4b8c59ebdc6)
- [製作 macOS Big Sur 11.0 系統安裝映像檔](https://www.tokfun.net/os/mac/make-macos-big-sur-installer-iso-dmg/)

## See Also

- [[Mac Remove Installer DMG]] - 刪除安裝映像檔的方法
- [[Awesome Hackintosh]] - Hackintosh 相關資源
