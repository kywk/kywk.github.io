---
title: 'UTM Android VM：硬碟開機與主機資料共享'
description: 在 macOS 的 UTM/QEMU 中以 BlissOS 硬碟映像開機，並以 200 GiB 資料碟保存 Android App 與檔案
tags:
  - Android
  - UTM
  - QEMU
  - SMB
  - ADB
date_created: 2026-08-31T00:00:00+08:00
date_updated: 2026-09-01T08:05:00+08:00
---

# UTM Android VM：硬碟開機與主機資料共享

## 最終結論

目前這台 Intel Mac 的 UTM 5.0.4 在 BlissOS Installer 的 framebuffer/鍵盤輸入上不穩定：安裝器會花屏，dialog 的按鍵也不一定能送到客體。因此最後採用的可用方案是：

1. 將已驗證可開機的 BlissOS OpenGApps ISO 內容寫成一顆 32 GiB 硬碟映像。
2. UTM 不再掛載 CD/ISO，而是由這顆硬碟映像開機。
3. 另外掛載 200 GiB ext4 qcow2，透過 DATA=/dev/sdb 掛成 Android 的 /data。

這不是傳統 Installer 將 system.sfs 展開到 ext4 分割區的安裝格式；但它達成同一個實際目的：VM 從硬碟開機，App、設定及使用者檔案寫入 200 GiB 的持久化 /data，重開機後不會像純 Live RAM 模式一樣消失。

系統映像本身是 ISO9660 內容，Android 以唯讀方式使用；App 與檔案的可寫空間在第二顆資料碟。SMB 是主機檔案共享，不會被 Android「設定 → 儲存空間」算成內部磁碟。

## 最終 VM 設定

- VM：PixelExperience Android 10 x86_64 (UTM)
- UUID：261A7C35-F029-42A2-9FF0-F7558021C4CF
- Bundle：/Users/kywk/Library/Containers/com.utmapp.UTM/Data/Documents/PixelExperience Android 10 x86_64 (UTM).utm
- Backend：QEMU
- Architecture：x86_64
- CPU：4 cores
- Memory：4096 MiB
- Network：Shared，e1000
- Display：VGA
- Boot：order=c
- USB keyboard：已加入 usb-kbd
- CD/ISO：正常啟動時不掛載

設定檔：

    /Users/kywk/Library/Containers/com.utmapp.UTM/Data/Documents/PixelExperience Android 10 x86_64 (UTM).utm/config.plist

Drive 順序必須保持如下：

| Drive | 檔案 | 客體用途 |
| --- | --- | --- |
| IDE 0 | BlissOS-system-persistent.img | BlissOS 硬碟開機映像，約 32 GiB |
| IDE 1 | 724F2713-EBF4-49C5-97E1-02D9EF27CB57.qcow2 | 200 GiB ext4 /data |

QEMU 實際命令已確認使用兩個 ide-hd，沒有 ide-cd；第一顆使用 -boot order=c 開機。

## 正式檔案

### 硬碟開機系統映像

    /Users/kywk/Library/Containers/com.utmapp.UTM/Data/Documents/PixelExperience Android 10 x86_64 (UTM).utm/Data/BlissOS-system-persistent.img

- apparent size：32 GiB
- 內容來源：BlissOS 14.10.3 x86_64 OpenGApps
- 形式：isohybrid raw disk image
- 不要刪除、重新格式化或用 mkfs 處理此檔案

### 200 GiB 資料碟

    /Users/kywk/Library/Containers/com.utmapp.UTM/Data/Documents/PixelExperience Android 10 x86_64 (UTM).utm/Data/724F2713-EBF4-49C5-97E1-02D9EF27CB57.qcow2

- 虛擬容量：約 200 GiB（Android 約看到 196 GiB）
- 客體裝置：/dev/block/sdb
- 檔案系統：ext4
- Label：UTM_DATA
- Filesystem UUID：30e16d4e-9652-4ba1-8a60-42ad8f4ef939
- 用途：Android /data、App、設定、Download 及使用者檔案

這顆碟已使用過，絕對不要再次執行 mkfs.ext4；那會清除所有 App 與檔案。

### 官方來源備份

    /Users/kywk/Library/Containers/com.utmapp.UTM/Data/Documents/PixelExperience Android 10 x86_64 (UTM).utm/Data/Bliss-v14.10.3-x86_64-OFFICIAL-opengapps-20241012-utm-bochs-hwaccel0.iso

這只是來源備份，不是正常開機時掛載的 CD。正式 VM 使用的是 BlissOS-system-persistent.img。

## 啟動方式

1. 開啟 UTM：open -a UTM
2. 選取 PixelExperience Android 10 x86_64 (UTM)。
3. 按 Start。
4. 正常情況下會直接由硬碟映像進入 BlissOS 開機動畫，不需要選 ISO 或 Installation。

若曾手動修改 config.plist，先停止 VM，再完全關閉並重新開啟 UTM，因為 UTM 可能保留舊的設定快取。

## 200 GiB /data 的意義

硬碟映像內的 Live 開機項目含有：

    DATA=/dev/sdb

BlissOS initrd 會把 /dev/sdb 的 ext4 掛到 Android /data。因此：

- 安裝的 APK、App 設定及快取會保存。
- /storage/emulated/0 通常對應 /data/media/0，也會使用這顆資料碟。
- 下載到 Download 的檔案會保存。
- Android 系統檔案仍來自唯讀的 system image，不能把 SMB 或資料碟誤當成可更新 /system 的分割區。

若能進入客體 root shell，可用以下命令確認：

    df -h /data
    mount | grep -E ' /data |sdb'

預期會看到 /dev/block/sdb 的 ext4 掛載，而不是 tmpfs。不要再手動把它掛到 /mnt/utm-data 取代 /data；那是先前 Live 模式的測試方式，會讓 Android framework 不把它當成 App data。

## 透過 SMB 共享主機資料夾

主機端共享資料夾：

    /Users/kywk/workspace/PixelExperience/share

SMB 參數：

- Server：192.168.64.1
- Port：445
- Share：PixelExperienceShare
- Username：kywk
- Password：主機 macOS 使用者 kywk 的登入密碼
- Domain：留白；若 App 必填可試 WORKGROUP
- URL：smb://192.168.64.1/PixelExperienceShare

在 Android 中使用支援 SMB 的檔案管理器：

1. 新增網路位置或 LAN/SMB 連線。
2. 輸入 smb://192.168.64.1/PixelExperienceShare。
3. 選擇帳號密碼登入，不要選 Guest/Anonymous。
4. 需要讓一般 App 使用檔案時，先在檔案管理器中複製到 Android 的 Download，或使用 Android 的檔案選擇器授權給該 App。

在客體內不要使用 127.0.0.1 連主機；那代表 Android 自己。主機的 UTM Shared 網路位址是 192.168.64.1，客體 IP 則可能每次不同。

SMB 是檔案共享，不會增加 Android 設定頁顯示的內部容量；真正提供持久化 App 空間的是 DATA=/dev/sdb 的 200 GiB 資料碟。

主機端可檢查 SMB port：

    nc -z -v 192.168.64.1 445

## ADB 傳檔（選用）

最後一次驗證時，VM 的網路已回應 192.168.64.3，但 ADB TCP 5555 尚未啟用；因此不要把 ADB 當成目前唯一的傳檔方式，SMB 檔案管理器是較直接的方案。

若取得 Android root shell，可暫時啟用 ADB TCP：

    setprop service.adb.tcp.port 5555
    stop adbd
    start adbd
    ip -4 addr show

在 macOS：

    /usr/local/bin/adb connect <guest-ip>:5555
    /usr/local/bin/adb devices

傳送到持久化 Download：

    /usr/local/bin/adb -s <guest-ip>:5555 push "/path/to/file.apk" /sdcard/Download/
    /usr/local/bin/adb -s <guest-ip>:5555 shell ls -l /sdcard/Download/

若直接 push 到資料碟遇到 remote fchown failed，先推到暫存再由客體複製：

    /usr/local/bin/adb -s <guest-ip>:5555 push "/path/to/file.apk" /data/local/tmp/file.apk
    /usr/local/bin/adb -s <guest-ip>:5555 shell cp /data/local/tmp/file.apk /data/media/0/Download/file.apk

## 已驗證與未宣稱的部分

已驗證：

- UTM/QEMU 實際從 BlissOS-system-persistent.img 開機。
- 正常啟動時沒有掛載 CD/ISO。
- 200 GiB qcow2 被 QEMU 掛載為第二顆磁碟，首次開機實際寫入約 1.96 GiB，表示客體正在使用持久化資料碟。
- 硬碟開機畫面可進入正常 BlissOS 開機動畫，不再是先前的 VGA 花屏。

尚未在這次最後啟動中以 ADB 或截圖獨立確認的項目：

- sys.boot_completed=1、Launcher/SystemUI 存活狀態。
- Play Store、Google Photos 的實際操作。
- ADB TCP 服務。

官方 OpenGApps 來源包含 Google 相關元件，但 Google Photos 的功能及帳戶資格仍要在 Android 內實際登入後確認；Pixel 第一代的無限相簿資格是 Google 帳戶/伺服器端條件，不能由 ROM 或 build.prop 保證。

## 清理原則

目前 UTM Data 只保留：

- BlissOS-system-persistent.img
- 724F2713-EBF4-49C5-97E1-02D9EF27CB57.qcow2
- 官方來源 ISO 備份

本次排錯用的空白 qcow2、客製化安裝 ISO、kernel/initrd 已移到可恢復的封存目錄：

    /private/tmp/utm-retired-20260901/

不要把封存檔重新掛回 VM，也不要把舊的 0F42394C-4835-480E-9515-D27E23364B0A.qcow2 當成系統碟；它只是未使用的空白檔。

日後要備份 200 GiB 資料碟，先停止 VM，再複製 qcow2。不要在 VM 執行時複製，以免備份處於不一致狀態。
