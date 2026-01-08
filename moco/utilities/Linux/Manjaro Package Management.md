---
title: 'Manjaro 套件管理完整指南'
description: 'Manjaro Linux 套件管理系統詳細說明，包含 Pamac、Pacman、Yay、AUR 等工具使用'
tags:
  - Linux/Manjaro
  - Linux
  - Package Management
date_created: 2024-12-19T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AM-JKLW7hPZ9Hjx3TMb2mo5O21FMrQ3-GDHI0YfAdwBcjcSr9XIkGswayNGGub1aY2JXnCDn1SWxvX9OKFSW1vpEr4X5qIa7vE7L8u65_RIs1mVcUR8rhzfA6Tw-zU6bdBIpBeItDDGS-RCWEuINuyzUFF0-xA=w800-no?authuser=0
slug: /utilities/linux/manjaro-package-management/
---

# Manjaro 套件管理完整指南

Manjaro 提供多種套件管理方式，本指南詳細介紹各種工具的特點、使用方法和最佳實踐。

## 套件管理概述

### Manjaro vs Arch 套件庫

Manjaro 並不直接使用 Arch Linux 的套件庫，而是維護自己的軟體倉庫：

**Manjaro 套件庫特點**：
- 經過額外測試，穩定性更高
- 更新速度較 Arch 稍慢（通常延遲 1-2 週）
- 與 Arch 套件完全相容
- 提供三個分支：Stable、Testing、Unstable

**套件來源優先級**：
1. **Manjaro 官方倉庫** - 最穩定，推薦日常使用
2. **AUR (Arch User Repository)** - 社群維護，軟體最新最全
3. **Flatpak/Snap** - 通用格式，沙盒化運行

## Pamac - 官方套件管理器

### 圖形界面 (GUI)

Pamac 是 Manjaro 的預設套件管理器，提供直觀的圖形界面：

**主要功能**：
- 瀏覽和搜尋套件
- 一鍵安裝/移除軟體
- 系統更新管理
- AUR 支援（需手動啟用）
- 套件依賴關係顯示

**啟用 AUR 支援**：
1. 開啟 Pamac → `偏好設定`
2. 切換到 `第三方` 分頁
3. 勾選 `啟用 AUR 支援`
4. 勾選 `檢查 AUR 更新`

### 命令列界面 (CLI)

```bash
# 更新套件資料庫
pamac update

# 搜尋套件
pamac search firefox

# 安裝套件
pamac install firefox

# 移除套件
pamac remove firefox

# 列出已安裝套件
pamac list -i

# 清理套件快取
pamac clean

# 從 AUR 安裝
pamac build yay
```

## Pacman - Arch 原生套件管理器

### 基本操作

```bash
# 更新系統
sudo pacman -Syu

# 安裝套件
sudo pacman -S firefox

# 移除套件
sudo pacman -R firefox

# 移除套件及其依賴
sudo pacman -Rs firefox

# 搜尋套件
pacman -Ss firefox

# 查看套件資訊
pacman -Si firefox

# 列出已安裝套件
pacman -Q

# 查找檔案屬於哪個套件
pacman -Qo /usr/bin/firefox
```

### 進階操作

```bash
# 清理套件快取
sudo pacman -Sc

# 移除孤立套件
sudo pacman -Rs $(pacman -Qtdq)

# 降級套件
sudo pacman -U /var/cache/pacman/pkg/package-old-version.pkg.tar.xz

# 忽略特定套件更新
# 編輯 /etc/pacman.conf，添加：
# IgnorePkg = firefox

# 強制重新安裝
sudo pacman -S firefox --overwrite '*'
```

## Yay - AUR 輔助工具

### 安裝 Yay

```bash
# 方法一：使用 pamac
pamac install yay

# 方法二：從 AUR 手動編譯
sudo pacman -S git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

### 基本使用

```bash
# 更新系統（包含 AUR）
yay

# 搜尋套件（官方倉庫 + AUR）
yay firefox

# 安裝 AUR 套件
yay -S google-chrome

# 僅更新 AUR 套件
yay -Sua

# 移除套件
yay -R package-name

# 清理不需要的依賴
yay -Yc
```

### 進階配置

```bash
# 編輯 yay 配置
yay --save --answerdiff None --answerclean None --removemake

# 查看 yay 統計資訊
yay -Ps

# 顯示套件統計
yay -Qi package-name
```

## AUR (Arch User Repository)

### 什麼是 AUR

AUR 是 Arch Linux 社群維護的軟體倉庫：

**優點**：
- 軟體數量龐大（80,000+ 套件）
- 更新迅速，通常包含最新版本
- 社群活躍，問題回報快速

**風險**：
- 社群維護，安全性相對較低
- 需要編譯安裝，耗時較長
- 可能存在惡意程式碼

### 安全使用 AUR

```bash
# 1. 檢查 PKGBUILD 檔案
yay -G package-name
cd package-name
less PKGBUILD

# 2. 檢查套件維護者
yay -Si package-name

# 3. 查看套件評論和投票
# 訪問 https://aur.archlinux.org/packages/package-name

# 4. 使用沙盒環境（進階）
sudo pacman -S bubblewrap
yay --batchinstall --sudoloop
```

### 常用 AUR 套件

```bash
# 開發工具
yay -S visual-studio-code-bin
yay -S google-chrome
yay -S discord
yay -S slack-desktop

# 系統工具
yay -S timeshift
yay -S stacer
yay -S bleachbit

# 媒體工具
yay -S spotify
yay -S obs-studio-git
```

## Flatpak 支援

### 安裝 Flatpak

```bash
# 安裝 Flatpak
sudo pacman -S flatpak

# 添加 Flathub 倉庫
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# 重新啟動系統以完成設置
```

### 基本操作

```bash
# 搜尋應用程式
flatpak search firefox

# 安裝應用程式
flatpak install flathub org.mozilla.firefox

# 運行應用程式
flatpak run org.mozilla.firefox

# 列出已安裝應用程式
flatpak list

# 更新應用程式
flatpak update

# 移除應用程式
flatpak uninstall org.mozilla.firefox
```

## Snap 支援

### 安裝 Snap

```bash
# 安裝 snapd
sudo pacman -S snapd

# 啟用 snapd 服務
sudo systemctl enable --now snapd.socket

# 創建符號連結
sudo ln -s /var/lib/snapd/snap /snap

# 安裝 Snap Store（可選）
sudo snap install snap-store
```

### 基本操作

```bash
# 搜尋 snap 套件
snap find firefox

# 安裝 snap 套件
sudo snap install firefox

# 列出已安裝 snap
snap list

# 更新 snap 套件
sudo snap refresh

# 移除 snap 套件
sudo snap remove firefox
```

## 套件管理最佳實踐

### 日常維護

```bash
# 每日更新檢查
pamac update || yay

# 每週清理
sudo pacman -Sc
yay -Yc
flatpak uninstall --unused

# 每月完整清理
sudo pacman -Scc
sudo journalctl --vacuum-time=1month
```

### 系統備份

```bash
# 備份已安裝套件列表
pacman -Qqe > pkglist.txt
pacman -Qqm > aurlist.txt

# 恢復套件（新系統）
sudo pacman -S --needed - < pkglist.txt
yay -S --needed - < aurlist.txt
```

### 故障排除

**套件衝突**：
```bash
# 查看衝突詳情
sudo pacman -S package-name --debug

# 強制覆蓋檔案
sudo pacman -S package-name --overwrite '*'
```

**損壞的套件資料庫**：
```bash
# 重建套件資料庫
sudo rm /var/lib/pacman/db.lck
sudo pacman-db-upgrade
sudo pacman -Sy
```

**AUR 編譯失敗**：
```bash
# 清理編譯快取
yay -Scc

# 重新下載 PKGBUILD
yay -G package-name --force
```

## 效能優化

### 平行下載

編輯 `/etc/pacman.conf`：
```ini
# 啟用平行下載
ParallelDownloads = 5

# 啟用彩色輸出
Color

# 顯示套件大小
VerbosePkgLists
```

### 鏡像站優化

```bash
# 安裝 reflector
sudo pacman -S reflector

# 自動選擇最快鏡像站
sudo reflector --country Taiwan,Japan,Korea --age 12 --protocol https --sort rate --save /etc/pacman.d/mirrorlist

# 設定自動更新鏡像站
sudo systemctl enable reflector.timer
```

## 參考資源

### 官方文件
- [Manjaro Wiki - Package Management](https://wiki.manjaro.org/index.php/Package_Management)
- [Arch Wiki - Pacman](https://wiki.archlinux.org/title/Pacman)
- [AUR 官方網站](https://aur.archlinux.org/)

### 社群資源
- [Manjaro 論壇](https://forum.manjaro.org/)
- [AUR 安全指南](https://wiki.archlinux.org/title/Arch_User_Repository#Installing_and_upgrading_packages)
- [Flatpak 官方文件](https://docs.flatpak.org/)