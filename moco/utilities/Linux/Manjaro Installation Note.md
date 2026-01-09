---
title: Manjaro Linux 安裝指南
description: Manjaro Linux 系統安裝與初始設定完整指南
tags:
  - Linux/Manjaro
  - Linux
  - Installation
date_created: 2022-05-11T04:01:39.000Z
date_updated: 2024-12-19T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AM-JKLU2Ot2TyON1chUA-Qw7qj-OQSRMYNin7jsJsUa3E_jwqq1JbwTZZckUtJmNZmqxY5M4egm-ryt4g3Ope_0EqHBrCDSEHmcy-goHRzWh-ZgguUoy1XKpyS1DNx8aV92vAkAM0zZOW6EZR4KS3W1DClQKhw=w800-no?authuser=0
slug: /utilities/linux/manjaro-installation-note/
---

# Manjaro Linux 安裝指南

> **更新說明**: 本文基於 2022 年的安裝經驗，部分內容可能需要根據最新版本調整。

Manjaro 是基於 Arch Linux 的用戶友好發行版，提供了 Arch 的強大功能同時降低了使用門檻。本指南記錄完整的安裝與初始設定流程。

## 系統需求

### 硬體需求
- **處理器**: 64位元 x86 處理器
- **記憶體**: 最少 2GB RAM（建議 4GB 以上）
- **儲存空間**: 最少 30GB 可用空間
- **顯示卡**: 支援 1024x768 解析度

### 測試環境
本文基於以下硬體環境測試：
- **機型**: ThinkPad T470
- **處理器**: Intel i7-7500U
- **記憶體**: 16GB DDR4
- **儲存**: 128GB + 256GB SSD
- **其他**: 雙電池配置

## 選擇 Manjaro 的原因

### 優勢特點
1. **基於 Arch Linux**: 享有 Arch 的強大功能和豐富軟體庫
2. **用戶友好**: 提供圖形化安裝程式和預配置桌面環境
3. **滾動更新**: 持續獲得最新軟體版本
4. **硬體支援**: 優秀的硬體相容性和驅動支援
5. **多桌面選擇**: 提供 Xfce、KDE、GNOME 等版本

### 與其他發行版比較
經過 Xubuntu 22.04、elementary OS 6.1 等多個發行版測試後，Manjaro 在以下方面表現突出：
- 硬體驅動自動識別（WiFi、藍牙、顯卡）
- 系統資源使用效率
- 桌面環境穩定性
- 軟體安裝便利性

## 安裝前準備

### 下載 ISO 映像
1. 前往 [Manjaro 官網](https://manjaro.org/download/)
2. 選擇桌面環境版本（推薦 Xfce 版本）
3. 下載對應的 ISO 檔案
4. 驗證檔案完整性（建議）

### 製作安裝媒體
```bash
# Linux 環境下使用 dd 指令
sudo dd if=manjaro-xfce-21.3.7-stable-x86_64.iso of=/dev/sdX bs=4M status=progress

# 或使用 Rufus (Windows) / Etcher (跨平台)
```

### 備份重要資料
- 備份現有系統的重要檔案
- 記錄現有系統的網路設定
- 準備必要的驅動程式（如有需要）

## 安裝流程

### 1. 開機設定
1. 插入安裝媒體並重新開機
2. 進入 BIOS/UEFI 設定開機順序
3. 選擇從 USB 裝置開機
4. 進入 Manjaro Live 環境

### 2. Live 環境測試
在正式安裝前，建議先在 Live 環境中測試：
- 網路連線功能
- 硬體驅動狀況（WiFi、藍牙、顯卡）
- 音效輸出
- 外接裝置識別

### 3. 執行安裝程式
1. 點擊桌面上的「Install Manjaro」圖示
2. 選擇安裝語言（繁體中文）
3. 設定時區和鍵盤配置
4. 配置磁碟分割
5. 建立使用者帳戶
6. 確認安裝設定並開始安裝

### 4. 磁碟分割建議
```
/boot/efi  - 512MB   (FAT32, UEFI 系統)
/          - 30GB+   (ext4, 根目錄)
/home      - 剩餘空間 (ext4, 使用者目錄)
swap       - 2-8GB   (依記憶體大小調整)
```

## 安裝後初始設定

### 1. 系統更新
```bash
# 更新系統套件
sudo pacman -Syu

# 或使用 pamac
pamac update
```

### 2. 顯示設定調整
對於高解析度螢幕，可能需要調整 DPI 設定：
1. 開啟 `設定管理員` > `外觀`
2. 在 `字型` 分頁調整 DPI 值
3. 建議從預設 96 調整至 120-128

### 3. 輸入法安裝
```bash
# 安裝 fcitx5 輸入法框架
sudo pacman -S fcitx5 fcitx5-chinese-addons fcitx5-gtk fcitx5-qt

# 設定環境變數
echo 'export GTK_IM_MODULE=fcitx' >> ~/.xprofile
echo 'export QT_IM_MODULE=fcitx' >> ~/.xprofile
echo 'export XMODIFIERS=@im=fcitx' >> ~/.xprofile
```

### 4. 常用軟體安裝
```bash
# 開發工具
sudo pacman -S git vim code firefox

# 多媒體工具
sudo pacman -S vlc gimp audacity

# 辦公軟體
sudo pacman -S libreoffice-fresh
```

## 硬體相容性

### 已測試正常運作
- ✅ Intel 整合顯卡
- ✅ WiFi 連線 (Intel AC 7265)
- ✅ 藍牙功能
- ✅ 音效輸出/輸入
- ✅ USB 3.0 連接埠
- ✅ HDMI 外接螢幕
- ✅ 電池電源管理

### 尚未測試
- ❓ 指紋辨識器
- ❓ SD 卡讀卡機
- ❓ 4G/LTE 模組（如有配置）

## 疑難排解

### 常見問題

**WiFi 無法連線**:
```bash
# 檢查網路介面
ip link show

# 重啟網路服務
sudo systemctl restart NetworkManager
```

**音效無輸出**:
```bash
# 安裝 PulseAudio 控制工具
sudo pacman -S pavucontrol

# 檢查音效裝置
aplay -l
```

**顯示異常**:
```bash
# 重新產生 X11 設定
sudo nvidia-xconfig  # NVIDIA 顯卡
# 或
sudo Xorg -configure  # 其他顯卡
```

## 後續設定

安裝完成後，建議參考以下文章進行進階設定：

- [[Manjaro Package Management|套件管理完整指南]] - 詳細的套件管理說明
- [[Xfce Customization|Xfce 桌面客製化]] - 桌面環境美化設定
- [[Xfce MacOS Looks|Xfce macOS 風格設定]] - macOS 風格主題配置
- [[Linux Commands Reference|Linux 基礎指令參考]] - 常用指令手冊
- [[Linux System Maintenance|Linux 系統維護]] - 系統維護最佳實踐

## 參考資源

### 官方文件
- [Manjaro Wiki](https://wiki.manjaro.org/)
- [Manjaro 論壇](https://forum.manjaro.org/)
- [Arch Wiki](https://wiki.archlinux.org/) - 深度技術參考

### 社群資源
- [Manjaro 初次使用報告](https://archer1609wp.wordpress.com/2018/04/29/manjaro-first-look/)
- [Linux 桌面環境比較](https://itsfoss.com/best-linux-desktop-environments/)
