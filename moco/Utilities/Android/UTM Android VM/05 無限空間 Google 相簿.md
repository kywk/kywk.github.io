---
title: 無限空間 Google 相簿
description: Pixel 2016 原尺寸無限備份資格的原理、PixelOS GSI 為何開箱即用，以及驗證方式與限制
tags:
  - Android
  - Google Photos
  - PixelOS
  - GSI
  - Pixel
sidebar_position: 50
sidebar_label: 無限空間 Google 相簿
date_created: 2026-09-24T00:00:00.000Z
date_updated: 2026-09-24T00:00:00.000Z
---

# 無限空間 Google 相簿

在自架 Android 環境想要「無限空間 Google 相簿」，關鍵不是 root 或 Magisk，而是**選對 ROM**——因為用戶端資格來自 ROM 打包的系統 feature，不是後天偽裝。

## 資格

免費**原尺寸**無限備份目前只保留給 **2016 年第一代 Pixel / Pixel XL**（sailfish / marlin）。資格綁定**帳號**、由 Google 伺服器端認定。Pixel 2～5 只有「節省模式」無限；Pixel 6 之後沒有。

## 用戶端判斷

Google 相簿看的是系統 feature `com.google.android.apps.photos.NEXUS_PRELOAD`（大小寫兩個），由 ROM 的 sysconfig 宣告：

    /system/product/etc/sysconfig/pixel_2016_exclusive.xml

只要 ROM 有這個檔案，系統就會宣告該 feature。

## PixelOS 開箱即用

PixelOS 打包了 Pixel 各世代專屬設定，`pixel_2016_exclusive.xml` 包含在內（已直接從映像解出確認）。**不需要 root、Magisk 或 build.prop 偽裝。**

> [!note]
> 本系列的 PixelOS 16.2 GSI 是**精簡 GApps**，沒預載 Google 相簿。從 **Play Store 安裝 Google Photos** 即可——`NEXUS_PRELOAD` 是 ROM 層級 feature，不是綁在 APK 上。

## 把本機照片匯入並上傳

Google Photos 只掃 **Android 自己的媒體庫（MediaStore）**，**看不到 SMB／HTTP 網路共享**。所以本機照片要先推進 Android 內部儲存（不是丟進共享資料夾）：

```sh
ADB=~/workspace/PixelOS-ARM/platform-tools/adb
$ADB -s 127.0.0.1:5555 shell mkdir -p /sdcard/DCIM/FromMac
$ADB -s 127.0.0.1:5555 push ~/Pictures/2026-trip/. /sdcard/DCIM/FromMac/
# 觸發媒體掃描，Google Photos 才看得到
$ADB -s 127.0.0.1:5555 shell content call --uri content://media/external \
  --method scan_file --arg /sdcard/DCIM/FromMac/<檔名>
```

`~/workspace/PixelOS-ARM/tools/push-photos.sh <本機資料夾> [資料夾名]` 會把上面三步一次做完。

然後在 Android 上：

1. Play Store 安裝 **Google Photos**。
2. Google 相簿 → 個人檔案 → 備份 → **備份裝置資料夾** → 開啟該資料夾（例如 `FromMac`）。
3. 照片上傳後即套用原尺寸無限備份。

> [!note]
> 「推進 MediaStore、Google Photos 出現該裝置資料夾」已實測確認；**實際上傳與無限備份的顯示需登入你自己的 Google 帳號後確認**。

## 驗證

登入 Google 帳號後，開 Google 相簿 → 個人檔案 → 備份，確認畫質為**原尺寸**且不佔用帳號空間；或備份一張新照片，確認顯示「此項目不會佔用你的帳戶儲存空間」。沒看到就清相簿 App 資料、重開機再看。

## 其他作法（未驗證）

以下作法適用於 ROM 本身沒帶 `NEXUS_PRELOAD` 的情況，但**本系列未實際驗證**，僅列出來源方向：

| 作法 | 說明 | 注意 |
| --- | --- | --- |
| Magisk 模組 | 例如 PixelifyPhotos、GPhotos-Unlimited，把 sysconfig XML 與 props 掛進系統 | 需 root；模組需維護 |
| ReVanced 版 Google 相簿 | 直接 patch APK，偽裝成 Pixel XL 並改走 GmsCore | 需 GmsCore |
| build.prop 偽裝 | 手改 `ro.product.model=Pixel`、`ro.product.brand=Google` 等 | 影響 Play Integrity；不保證有效 |

x86 路線的 BlissOS + OpenGApps 屬此類：OpenGApps 只含 Google 應用，未確認是否含 Pixel 2016 專屬 sysconfig，若要無限相簿可能得靠上表作法（**未驗證**）。

相較之下，選一個本來就打包 Pixel 2016 設定的 ROM（如本系列的 PixelOS）是最乾淨的做法。

## 限制

> [!warning]
> 這是 **Google 帳戶／伺服器端條件**，ROM 只能提供用戶端 feature。Google 隨時可能調整或終止，不要當成唯一備份策略。
