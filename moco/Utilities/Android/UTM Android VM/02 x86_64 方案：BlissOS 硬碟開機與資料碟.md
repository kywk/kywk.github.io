---
title: 'x86_64 方案：BlissOS 硬碟開機與資料碟'
description: 在 macOS 的 UTM/QEMU 中以 BlissOS 硬碟映像開機，並以 200 GiB 資料碟保存 Android App 與檔案
tags:
  - Android
  - UTM
  - QEMU
  - x86
  - BlissOS
  - SMB
  - ADB
sidebar_position: 20
sidebar_label: x86_64：BlissOS 硬碟開機
date_created: 2026-08-31T00:00:00.000Z
date_updated: 2026-09-24T00:00:00.000Z
---

# x86_64 方案：BlissOS 硬碟開機與資料碟

**Intel Mac** 路線：客體 x86_64，可用 HVF 原生虛擬化。Apple Silicon 請看 [[03 arm64 方案：PixelOS GSI 虛擬機]]。

## 做法

BlissOS Installer 在 UTM 5.0.4 上花屏、鍵盤送不進去，所以不走安裝器，改用：

1. 把已驗證可開機的 BlissOS OpenGApps ISO 內容寫成一顆 32 GiB 硬碟映像。
2. UTM 不掛 CD/ISO，直接由硬碟映像開機。
3. 另掛 200 GiB ext4 qcow2，用 `DATA=/dev/sdb` 掛成 Android 的 `/data`（BlissOS initrd 讀此參數決定 `/data` 裝置）。

## VM 設定

- 名稱：PixelExperience Android 10 x86_64 (UTM)
- 架構：x86_64 ／ CPU 4 cores ／ Memory 4096 MiB
- 網路：Shared，e1000 ／ 顯示：VGA ／ Boot：`order=c`
- USB keyboard 已加入 usb-kbd ／ 正常啟動不掛 CD/ISO

Drive 順序：

| Drive | 檔案 | 客體用途 |
| --- | --- | --- |
| IDE 0 | `BlissOS-system-persistent.img` | 開機映像，約 32 GiB |
| IDE 1 | `724F2713-EBF4-49C5-97E1-02D9EF27CB57.qcow2` | 200 GiB ext4 `/data` |

## 檔案

皆在 `<VM>.utm/Data/` 下：

- `BlissOS-system-persistent.img` — 來源為 BlissOS 14.10.3 x86_64 OpenGApps，isohybrid raw 格式。不要刪除、格式化或 mkfs。
- `724F2713-EBF4-49C5-97E1-02D9EF27CB57.qcow2` — ext4（Label `UTM_DATA`），客體 `/dev/block/sdb`。已使用過，**不要再 mkfs**。
- `Bliss-v14.10.3-x86_64-OFFICIAL-opengapps-20241012-utm-bochs-hwaccel0.iso` — 來源備份，正常啟動不掛載。

## 啟動

1. `open -a UTM` → 選 VM → Start，直接進入 BlissOS 開機動畫。
2. 改過 `config.plist` 的話，先停 VM 再**完全重開 UTM**（UTM 會快取舊設定，不重開改了也沒用）。

## `/data` 確認

開機參數含 `DATA=/dev/sdb`，initrd 會把第二顆碟掛到 Android `/data`。客體 root shell 確認：

```sh
df -h /data
mount | grep -E ' /data |sdb'
```

應看到 `/dev/block/sdb` 的 ext4 掛載，而非 tmpfs。App、設定、Download 都寫進這顆碟。

## 與主機共享檔案

主機資料夾 `/Users/kywk/workspace/PixelExperience/share`，本 VM 網路模式為 UTM **Shared Network**，主機位址 **192.168.64.1**（客體勿用 `127.0.0.1`，那是自己）。

完整步驟見 [[04 與主機共享檔案]]。

## ADB 傳檔

```sh
setprop service.adb.tcp.port 5555   # 客體 root shell，先啟用 ADB TCP
stop adbd
start adbd

adb connect <guest-ip>:5555
adb -s <guest-ip>:5555 push file.apk /sdcard/Download/
```

遇到 `remote fchown failed` 先推暫存再複製：

```sh
adb -s <guest-ip>:5555 push file.apk /data/local/tmp/file.apk
adb -s <guest-ip>:5555 shell cp /data/local/tmp/file.apk /data/media/0/Download/file.apk
```

## 已驗證

- 從 `BlissOS-system-persistent.img` 開機，無 CD/ISO。
- 資料碟被掛為第二顆磁碟，首次開機即寫入約 1.96 GiB，持久化 `/data` 生效。
- 正常進入 BlissOS 開機動畫（原 VGA 花屏已解決）。

> [!warning]
> Google Photos 功能及帳戶資格需在 Android 內登入後確認；Pixel 第一代無限相簿資格是伺服器端條件，不能由 ROM 保證。詳見 [[05 無限空間 Google 相簿]]。

## 備份

備份 200 GiB 資料碟前先**停止 VM**，再複製 qcow2。執行中複製會得到不一致的備份。
