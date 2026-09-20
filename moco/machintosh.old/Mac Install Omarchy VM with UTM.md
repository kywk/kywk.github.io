---
title: 'Note: 透過 UTM 在 Apple Silicon Mac 安裝 Omarchy'
description: 在 Apple Silicon MacBook 上使用 UTM 與 omarchy-aarch64-image 安裝 Omarchy 虛擬機的完整指南
tags:
  - Mac
  - Virtualization
  - Linux
sidebar_position: 64
date_created: 2026-09-18T00:00:00.000Z
---

# [Mac] 透過 UTM 安裝 Omarchy 虛擬機

[Omarchy](https://omarchy.org/) 是 DHH（Ruby on Rails 作者）打造的 Arch Linux 桌面環境，內建 Hyprland、Waybar 等現代化 Wayland 工具。在 Apple Silicon Mac 上，可以透過社群維護的 [riverscn/omarchy-aarch64-image](https://github.com/riverscn/omarchy-aarch64-image) 專案，直接取得預先打包好的 UTM 虛擬機映像檔，免去手動安裝 Arch Linux 的過程。

這篇紀錄在 Apple Silicon MacBook（M1 / 8GB RAM）上，使用 [UTM](https://mac.getutm.app/) 安裝並調整 Omarchy 虛擬機的完整流程。

## 安裝 UTM

UTM 是 macOS 上開源的虛擬機軟體，透過套件管理工具 Homebrew 即可安裝（若已安裝可跳過）：

```shell
brew install --cask utm
```

安裝成功後確認版本：

```shell
ls /Applications | grep -i utm
# UTM.app
```

## 一鍵安裝 Omarchy 映像檔

omarchy-aarch64-image 專案的 [Releases 頁面](https://github.com/riverscn/omarchy-aarch64-image/releases) 提供一鍵安裝指令。以撰文時的最新版 `v4.0.3-virt.1` 為例，打開 Terminal 執行：

```shell
/bin/bash -o pipefail -c 'curl -fsSL https://github.com/riverscn/omarchy-aarch64-image/releases/latest/download/install-Omarchy-virt.command | /bin/bash'
```

**需求**：至少 12 GB 的可用磁碟空間（下載與解壓縮過程所需的緩衝）。

這個指令會：
1. 下載最新的小型安裝腳本
2. 依序下載所有分割的映像檔（`Omarchy-virt.utm.zip.part-*`，單檔均低於 GitHub 單檔大小限制）
3. 逐一驗證 SHA-256 digest
4. 重組並安裝為 `~/Downloads/Omarchy-virt.utm`
5. 自動用 UTM 開啟這個 `.utm` bundle

安裝完成會顯示：

```
Installed and personalized: /Users/kywk/Downloads/Omarchy-virt.utm
UTM will create clean EFI variable storage on first launch.
```

也可以指定映像檔的放置目錄（預設為 `~/Downloads`）：

```shell
/bin/bash -o pipefail -c 'curl -fsSL https://github.com/riverscn/omarchy-aarch64-image/releases/latest/download/install-Omarchy-virt.command | /bin/bash -s -- "$1"' _ "/path/for/virtual-machines"
```

### GUI 版安裝方式

若偏好圖形介面操作，可從 Release 的 Assets 區下載 `Install-Omarchy-virt.zip`，解壓縮後執行 `install-Omarchy-virt.command`。若 macOS 擋下下載的指令檔，對它 **Control-click → Open** 並確認一次即可。

> 注意：不要手動下載編號的 `Omarchy-virt.utm.zip.part-*` 檔案，它們會由安裝器自動抓取。

### 安全性

每個安裝都會產生新的 VM UUID、磁碟 UUID 與本地管理 MAC 地址。Release 特意不含 EFI 變數儲存，UTM 首次啟動會建立乾淨的 EFI 副本，不會沿用打包者的韌體狀態或開機選單。

## 調整虛擬機硬體資源

映像檔預設的硬體設定不一定適合宿主機，以 8GB RAM 的 MacBook 為例，建議給 VM 一半的資源：

| 項目 | 建議值 | 原因 |
|------|--------|------|
| CPU 核心數 | 4 | M1 有 8 核心，留一半給 macOS |
| 記憶體 | 4096 MB | 宿主 8GB 時的安全上限，勿超過 6GB |
| 顯示 | VirtIO-GPU | 映像已是 `-virt` 版，內建 virtio 驅動 |
| 磁碟 | 保持映像預設 | qcow2 格式，動態成長 |

檢查 `.utm` bundle 內的設定檔：

```shell
plutil -p ~/Downloads/Omarchy-virt.utm/config.plist | grep -E 'CPUCount|MemorySize'
```

### 修改 CPU 核心數

UTM 讀取的是 `System` 字典底下的 `CPUCount`。預設值為 `0`（代表吃滿全部核心），建議明確的一半：

```shell
plutil -replace System.CPUCount -integer 4 ~/Downloads/Omarchy-virt.utm/config.plist
```

套件內外層各有一份 `CPUCount`，也可以一併更新：

```shell
plutil -replace CPUCount -integer 4 ~/Downloads/Omarchy-virt.utm/config.plist
```

記憶體 `System.MemorySize` 預設已是 4096 MB，若在 RAM 更充裕的機器上要調整，方式相同：

```shell
plutil -replace System.MemorySize -integer 8192 ~/Downloads/Omarchy-virt.utm/config.plist
```

也可以透過 UTM 圖形介面調整：選 VM → 右鍵 **Edit** → **System** 分頁。

### 重新啟動 UTM 讓設定生效

如果修改設定檔時 UTM 正在執行，先離開再重新開啟：

```shell
osascript -e 'quit app "UTM"'
open ~/Downloads/Omarchy-virt.utm
```

## 映像內建的最佳化

`Omarchy-virt.utm` 本身已針對 Apple Silicon 做好 virt 裝置配置：

- **磁碟**：`omarchy-aarch64-virt.qcow2`，VirtIO 介面
- **網卡**：`virtio-net-pci`，Shared 網路模式
- **顯示**：`virtio-gpu-gl-pci` 硬體加速
- **Hypervisor**：QEMU + Hypervisor.framework（HVF）加速
- **UEFI 開機** + 氣球裝置（Balloon Device）動態調整記憶體

## 首次開機設定

在 UTM 中啟動 `Omarchy-virt` VM，首次開機會要求完成：

1. 擁有者（使用者帳號）設定
2. 鍵盤配置
3. Git 設定
4. 主機名稱
5. 時區

完成後即可進入 Omarchy 桌面。

## 宿主目錄分享

若要在虛擬機內存取 Mac 的檔案：

1. **VM 关机狀態下**，在 UTM 設定中選擇共享目錄並使用 **VirtFS**
2. 完成首次開機的擁有者設定後，共享目錄會以 `~/Hostshare` 出現在 Omarchy 內，guest 使用者的 UID/GID 會自動映射
3. `/mnt/hostshare` 是原始的 9p 掛載點，僅供診斷用途

## 疑難排解

### 磁碟空間不足

安裝需要至少 12 GB 緩衝空間，先確認可用空間：

```shell
df -h / | tail -1
```

### 下載中斷

一鍵安裝腳本可重複執行，會重新下載並驗證所有分割檔，不會產生殘留的損壞映像。

### 修改 config.plist 未生效

確認修改的是 UTM 實際引用的 bundle。若 UTM 已匯入虛擬機（放在 `~/Library/Containers/com.utmapp.UTM/Data/Documents/`），要改容器內的設定檔；透過 `open` 開啟外部 bundle 則直接改原位置。修改後重啟 UTM。

### VM 佔用資源過多導致 Mac 卡頓

降低 `System.CPUCount` 與 `System.MemorySize`，建議保留一半核心與一半記憶體給 macOS。

## 參考資料

- [riverscn/omarchy-aarch64-image - Releases](https://github.com/riverscn/omarchy-aarch64-image/releases) - 映像檔專案
- [Omarchy 官方網站](https://omarchy.org/) - Omarchy 桌面環境
- [UTM 官方網站](https://mac.getutm.app/) - macOS 上的虛擬機軟體

## See Also

- [[Mac Make Installer ISO]] - 製作 macOS 安裝 ISO
- [[Awesome Machintosh]] - Machintosh 資源總覽
