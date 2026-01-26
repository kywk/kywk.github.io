---
title: 'Util: Location Changer'
description: 根據 Wi-Fi 名稱自動切換 macOS 網路位置
tags:
  - Mac
  - Tips
  - Network
sidebar_position: 30
hide_table_of_contents: true
date_created: 2022-08-24T16:00:00.000Z
image: 'https://i.imgur.com/mErPwqL.png'
slug: /machintosh/mac-location-changer/
---

# [Mac] 自動依 Wi-Fi 名稱更改網路位置

LocationChanger 是一個自動根據 Wi-Fi 網路名稱切換 macOS 網路位置的工具，適合經常在不同網路環境（如家裡、公司、咖啡廳）工作的使用者。

## 使用場景

- **家裡**：自動切換到家用網路設定（如特定 DNS、代理設定）
- **公司**：自動套用公司網路配置（如企業代理、VPN）
- **咖啡廳**：使用公共網路安全設定

## 安裝

### 自動安裝（推薦）

使用官方安裝腳本：

```bash
curl -L https://github.com/eprev/locationchanger/raw/master/locationchanger.sh | bash
```

### 手動安裝

1. 下載 locationchanger 執行檔
2. 複製到系統路徑：

```bash
sudo cp locationchanger /usr/local/bin/
sudo chmod +x /usr/local/bin/locationchanger
```

3. 建立 LaunchAgent：

```bash
mkdir -p ~/Library/LaunchAgents
cp LocationChanger.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/LocationChanger.plist
```

## 配置

### 建立網路位置

首先在 macOS 中建立不同的網路位置：

1. 開啟「系統偏好設定」>「網路」
2. 點選「位置」下拉選單 >「編輯位置」
3. 點選「+」新增位置（如：Home、Office、Public）
4. 為每個位置設定對應的網路配置

### 配置 LocationChanger

編輯配置檔 `~/.locations/locations.conf`：

```bash
mkdir -p ~/.locations
vim ~/.locations/locations.conf
```

配置範例：

```
# 格式：Wi-Fi SSID = 網路位置名稱

# 家裡網路
MyHomeWiFi = Home
MyHomeWiFi-5G = Home

# 公司網路
CompanyWiFi = Office
CompanyWiFi-Guest = Office

# 咖啡廳或公共場所
Starbucks = Public
7-11_Free_WiFi = Public

# 預設位置（當 Wi-Fi 名稱不在列表中時）
* = Automatic
```

### 配置說明

- 每行一個規則，格式為 `SSID = Location`
- 支援多個 SSID 對應同一個位置
- `*` 表示預設位置（萬用字元）
- 井號 `#` 開頭為註解

## 使用方式

### 自動切換

安裝並配置完成後，LocationChanger 會在背景自動運行。當連接到不同的 Wi-Fi 網路時，會自動切換到對應的網路位置。

### 手動測試

測試配置是否正確：

```bash
locationchanger
```

### 查看日誌

檢查運行日誌：

```bash
tail -f ~/Library/Logs/LocationChanger.log
```

## 進階設定

### 執行自訂腳本

LocationChanger 支援在切換位置時執行自訂腳本。建立腳本檔案：

```bash
vim ~/.locations/on-location-change.sh
```

範例腳本：

```bash
#!/bin/bash

LOCATION="$1"
SSID="$2"

case "$LOCATION" in
    "Home")
        # 家裡網路的額外設定
        echo "Connected to home network"
        # 啟動某些服務
        ;;
    "Office")
        # 公司網路的額外設定
        echo "Connected to office network"
        # 連接 VPN
        ;;
    "Public")
        # 公共網路的安全設定
        echo "Connected to public network"
        # 啟用防火牆
        ;;
esac
```

設定執行權限：

```bash
chmod +x ~/.locations/on-location-change.sh
```

### 停用自動切換

暫時停用 LocationChanger：

```bash
launchctl unload ~/Library/LaunchAgents/LocationChanger.plist
```

重新啟用：

```bash
launchctl load -w ~/Library/LaunchAgents/LocationChanger.plist
```

## 移除

完整移除 LocationChanger：

```bash
# 停用並移除 launch agent
launchctl unload -w ~/Library/LaunchAgents/LocationChanger.plist
rm ~/Library/LaunchAgents/LocationChanger.plist

# 移除執行檔
sudo rm /usr/local/bin/locationchanger

# 移除配置檔
rm -rf ~/.locations

# 移除日誌
rm ~/Library/Logs/LocationChanger.log
```

## 疑難排解

### 無法自動切換

檢查 LaunchAgent 是否正常運行：

```bash
launchctl list | grep LocationChanger
```

### 配置不生效

1. 檢查配置檔格式是否正確
2. 確認網路位置名稱與系統設定一致
3. 查看日誌檔案排查問題

### 權限問題

確保 locationchanger 有執行權限：

```bash
ls -l /usr/local/bin/locationchanger
```

## 替代方案

如果 LocationChanger 不符合需求，可以考慮：

- **ControlPlane** - 更強大的自動化工具（已停止開發）
- **自訂 Shell 腳本** - 使用 `networksetup` 命令自行撰寫
- **Hammerspoon** - 使用 Lua 腳本自動化

## 參考資料

- [eprev/locationchanger - GitHub](https://github.com/eprev/locationchanger/)
- [Mac OS 自動根據 Wi-Fi 名字改變網路位置](https://razeen.me/posts/auto-change-network-location-base-on-name-of-wifi/)
- [networksetup 命令說明](https://ss64.com/osx/networksetup.html)
