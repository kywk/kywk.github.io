---
title: Android Emulator 與 PixelOS GSI PoC 失敗記錄
description: Apple Silicon 上以 Android 16 ARM64 AVD 載入 PixelOS 16.2 GSI 的對照測試、第一階段掛載失敗證據與選型結論
tags:
  - Android
  - Emulator
  - AVD
  - GSI
  - PixelOS
  - ARM
sidebar_position: 60
sidebar_label: Emulator：PixelOS GSI PoC
date_created: 2026-09-29T00:00:00.000Z
date_updated: 2026-09-29T00:00:00.000Z
---

# Android Emulator 與 PixelOS GSI PoC 失敗記錄

**結論：在這次測試的 Android 16 ARM64 AVD 中，直接用 `-system` 載入 PixelOS 16.2 raw GSI，無法開機，也無法取得 ADB。** 失敗點在 Android 第一階段掛載：AVD 的 ramdisk 要求 `super` 分割區，原始 GSI 卻是一個 ext4 system 檔案系統。這是特定版本、特定映像與低改造做法的實測結果，不能推論所有 Emulator 或重新封裝後的映像都無法使用。

這次 PoC 要回答的是：能否在 Apple Silicon Mac 上，保留官方 Android Emulator 的 ADB／操作便利性，只替換 system 映像，就得到可開機的 PixelOS？原本的 [[03 arm64 方案：PixelOS GSI 虛擬機]] 使用 UTM 加 LineageOS virtio 宿主，開機鏈與這次 AVD 不同。

## 測試環境與判定方式

| 項目 | 本次使用 |
| --- | --- |
| 主機 | Apple Silicon `arm64`，macOS 27.0（26A428） |
| Emulator | 37.1.11.0；Hypervisor.Framework 加速檢查通過 |
| AVD | `PixelOS_GSI_PoC`，Pixel 8 裝置設定、4 vCPU、10 GB userdata |
| 官方基線映像 | Android 16／API 36 Google APIs ARM64-v8a，revision 7 |
| 待測映像 | PixelOS 16.2 ARM64 A/B GSI，2026-06-28；raw ext4，3,577,262,080 bytes |
| GSI SHA-256 | `cd2d8025c28a46b9131832676e9619fabf261b34e21abc0b2756cff675145faf`；測前、測後一致 |

成功門檻是 Android 完成開機，而且 `adb devices` 顯示 `device`、`adb shell` 可用。基線與 GSI 使用相同 AVD，先確認官方映像能開機，再測替換後的結果。PoC 全程以無畫面模式執行；因此即使基線通過，也沒有做 GUI 驗收。

## 對照結果

| 測試 | 結果 | 證據 |
| --- | --- | --- |
| 官方 Android 16 ARM64 映像 | **PASS** | 約 60 秒開機；`emulator-5580 device`、`adb shell id` 回 `uid=2000(shell)`、`sys.boot_completed=1` |
| 直接以 `-system` 指向 PixelOS raw GSI | **FAIL** | 已確認 QEMU 的 system 磁碟實際以 PixelOS GSI 為 backing file；第一階段找不到 `super`，沒有 ADB |
| GPT 包裝測試：單一 `system` 分割區 | **FAIL** | PixelOS ext4 內容逐位元組相同；ramdisk 所要求的 virtio-mmio `system` 裝置路徑不存在 |
| 其他 Google GSI 對照、GUI | **NOT_RUN** | 目前失敗發生在掛載 system 前，未進入 ROM 功能測試；本次全程無畫面 |

### 直接載入 raw GSI

決定性測試使用 `-system`、AVD 原有的 `-encryption-key` 與 `-writable-system`。後者很重要：先前未加 `-writable-system` 的嘗試，Emulator 診斷資訊雖列出外部映像路徑，QEMU 實際 system 磁碟卻仍指向官方映像，不能拿來判斷 GSI。這次以 `qemu-img info --backing-chain` 檢查 copy-on-write 磁碟，確認 backing file 是 PixelOS 原始 GSI 後，才採計結果。

開機記錄的關鍵訊息：

```text
partition(s) not found after polling timeout: super
Failed to create devices required for first stage mount
InitFatalReboot: signal 6
```

官方 AVD 的 system 映像是含 `vbmeta`、`super` 分割區的 GPT 磁碟；這份 PixelOS GSI 是 raw ext4。直接替換不能產生 ramdisk 所需的 `super`，Android 因而在掛載 system 前中止。

### 有界限的格式測試

為排除「只因 raw ext4 沒有分割表」這個因素，另將**未改動內容**的 GSI 包成 GPT 磁碟，內含一個 `system` 分割區；GPT CRC 與內部 payload SHA-256 都通過檢查。以 `-feature -DynamicPartition`、`-writable-system` 啟動後，也確認 QEMU 實際讀取此包裝映像，但 ramdisk 改要求：

```text
/dev/block/platform/a003800.virtio_mmio/by-name/system
Failed to mount /system: No such file or directory
```

因此，改一層分割表仍不足以讓這個 AVD 找到預期的裝置。下一步若要研究，得處理相容的 dynamic `super` 配置或修改開機鏈／ramdisk，已超出「直接換映像」的 PoC 範圍。`-partition-size` 調的是 userdata 空間，不能補出缺少的 `super` 分割區。

## 下次實驗要先確認的事

1. **先跑官方基線。** 首次基線因專案內 SDK 缺少 `platform-tools` 而中止；補裝後重跑才通過。沒有成功基線，就無法把後續失敗歸因到 GSI。
2. **檢查 QEMU 實際載入的磁碟。** `-system` 路徑出現在 Emulator 診斷資訊，不代表客體真的讀到該映像；這次需搭配 `-writable-system`，再用 `qemu-img info --backing-chain` 確認 backing file。
3. **依開機階段判斷下一步。** 看到 `super` 或 `/system` 裝置缺失，先處理分割配置與 ramdisk 路徑；此時測 App、Google 服務或圖形介面還無法回答相容性問題。

## 從失敗得到的選型結論

官方 Emulator 的 ARM64 基線正常，說明 SDK、硬體加速與 ADB 通道本身可用；PixelOS 測試沒有走到 framework 啟動，因此**不能**據此判斷 AVB、VINTF、SELinux、APEX、圖形顯示或 Google 服務是否相容。未執行 Google GSI 對照，也不能宣稱已證明所有 GSI 都會失敗。

對「少改造、直接替換 system」的目標，本次判定 **NOT_PRACTICAL**。若目標是繼續使用這份 PixelOS GSI，可參考 [[03 arm64 方案：PixelOS GSI 虛擬機]] 的 UTM／LineageOS virtio 流程；那條路線的宿主與 GRUB 已提供自己的 GSI 開機方式，這篇 Emulator 失敗記錄不改變其既有驗證範圍。

## 原始證據

完整命令、退出碼、映像雜湊與記錄保存在本機 `~/workspace/pixel-rom/results.md`；重點記錄是 `logs/baseline-emulator.log`、`logs/baseline-properties.txt`、`logs/baseline-shell-id.txt`、`logs/pixelos-emulator.log` 與 `logs/pixelos-gpt-writable-no-dynamic.log`。基線啟動腳本退出碼 **0**；兩次 PixelOS 啟動腳本各為 **1**。原始 PixelOS GSI 與既有 UTM 虛擬機未因本次 PoC 修改。
