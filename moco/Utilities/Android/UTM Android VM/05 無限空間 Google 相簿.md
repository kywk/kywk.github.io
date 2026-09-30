---
title: 無限空間 Google 相簿
description: 第一代 Pixel 的無限原始畫質備份規則、PixelOS 的 feature 與裝置模擬，以及 UTM 實測進度、驗證方式與限制
tags:
  - Android
  - Google Photos
  - PixelOS
  - GSI
  - Pixel
sidebar_position: 50
sidebar_label: 無限空間 Google 相簿
date_created: 2026-09-24T00:00:00.000Z
date_updated: 2026-09-30T00:00:00.000Z
---

# 無限空間 Google 相簿

在自架 Android 環境測試「無限空間 Google 相簿」，需要分別確認 **Google 服務可用、相簿辨識的裝置身分，以及上傳後的容量計算**。ROM 帶有 Pixel feature 或畫面顯示無限空間，都不能單獨證明伺服器會把新上傳項目排除於配額之外。

> [!note]
> **2026-09-30 實測進度：** UTM 的商店與相簿已恢復開啟，相簿備份初始頁顯示「原始畫質、不計入儲存空間配額」。目前停在 Google 帳號重新驗證；實際上傳、不計容量及重開機後持續可用仍待驗證。排錯細節見 [[07 Play Protect 排錯與裝置身分模擬]]。

## 資格

依 [Google 官方 Pixel 備份說明](https://support.google.com/pixelphone/answer/6220791?co=GENIE.Platform%3DAndroid&hl=en)（2026-09-30 查核），**第一代 Pixel / Pixel XL**（sailfish / marlin）享有免費原始畫質無限備份。Pixel 2、3 的原始畫質優惠期限已過；Pixel 3a～5 的免費無限優惠適用於節省儲存空間畫質。

優惠與使用的裝置及備份方式有關，不能寫成「登入同一帳號，所有裝置都自動取得無限空間」。上述官方規則也未保證 VirtIO 虛擬機或裝置身分模擬符合資格。

## 用戶端判斷

本次映像包含的用戶端線索之一是系統 feature `com.google.android.apps.photos.NEXUS_PRELOAD`（大小寫兩個），由 ROM 的 sysconfig 宣告：

    /system/product/etc/sysconfig/pixel_2016_exclusive.xml

系統會解析 sysconfig 中的有效 feature 宣告；檔案存在與 feature 可查到，只能確認用戶端設定，不能證明上傳不計配額。

## PixelOS 的 feature 與相簿身分模擬

本次 PixelOS 16.2 GSI 包含 `pixel_2016_exclusive.xml`（已直接從映像解出確認），但它的行為不只來自 XML。PixelOS 的 [PropImitationHooks 原始碼](https://github.com/PixelOS-AOSP/android_frameworks_base/blob/sixteen-qpr2/core/java/com/android/internal/util/PropImitationHooks.java) 也會對 `com.google.android.apps.photos` 單獨設定第一代 Pixel 的 `Build` 欄位，並調整相簿查詢到的 Pixel feature。

2026-09-30 的客體日誌確認相簿讀到 `MODEL=Pixel`、`DEVICE=sailfish` 及第一代 Pixel 的指紋；同時，系統與商店使用 Samsung 身分。這是**分別對程式模擬裝置身分**，不能以系統設定頁的型號推斷相簿讀到的值。

此版本相簿身分模擬不需要另裝 Magisk；但本 VM 曾因未認證而無法使用 Google 程式，仍需額外排錯，不能稱為開箱即完成無限備份。

> [!note]
> 本系列的 PixelOS 16.2 GSI 是**精簡 GApps**，沒預載 Google 相簿。需另外安裝 Google Photos；ROM 宣告的 feature 與相簿身分模擬仍需搭配實際登入及備份測試。

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
3. 先備份一張新測試圖片，確認原始畫質及不計配額，再匯入大量照片。

> [!note]
> 「推進 MediaStore、Google Photos 出現該裝置資料夾」已實測確認；**實際上傳與無限備份的顯示需登入你自己的 Google 帳號後確認**。

## 驗證

登入 Google 帳號後，按下列順序驗證：

1. Play 商店 → 個人檔案 → 設定 → 關於，記錄 Play Protect 認證狀態；商店能開啟不等於狀態已是「已認證」。
2. Google 相簿 → 個人檔案 → 備份，確認原始畫質及不計配額說明。
3. 上傳一張從未備份過的新測試圖片，等待備份完成；查看該項目的備份詳細資料，核對品質及是否計入帳戶儲存空間。
4. 必要時對照網頁端項目資訊與帳戶用量；總用量可能延遲更新，不能只用短時間的容量差判定。
5. 正常重開機，再確認 Google 程式與備份仍可使用。

本次已放入 `/sdcard/DCIM/PixelOS-backup-test-20260930.png`（3,147,857 bytes，程式產生、不含個人資料），**尚未完成上傳驗證**。如果要清除相簿資料重新測試，先確認備份設定與本機檔案；重設會清除程式狀態，可能需要重新登入。

## 其他作法（未驗證）

以下是其他 ROM 可能採用的方向；這些模組與修改版 APK **未在本系列實測**，也不代表能解決目前的 Google 服務認證攔截：

| 作法 | 說明 | 注意 |
| --- | --- | --- |
| Magisk 模組 | 例如 PixelifyPhotos、GPhotos-Unlimited，把 sysconfig XML 與 props 掛進系統 | 需 root；模組需維護 |
| ReVanced 版 Google 相簿 | 直接 patch APK，偽裝成 Pixel XL 並改走 GmsCore | 需 GmsCore |
| build.prop 偽裝 | 手改 `ro.product.model=Pixel`、`ro.product.brand=Google` 等 | 影響 Play Integrity；不保證有效 |

x86 路線的 BlissOS + OpenGApps 屬此類：OpenGApps 只含 Google 應用，未確認是否含 Pixel 2016 專屬 sysconfig，若要無限相簿可能得靠上表作法（**未驗證**）。

本次採用 PixelOS 內建的相簿模擬，並另外處理系統／Google 服務身分及舊認證資料，過程見 [[07 Play Protect 排錯與裝置身分模擬]]。

## 限制

> [!warning]
> ROM 可提供用戶端 feature 與身分模擬；優惠是否套用仍需以實際上傳結果為準。正式裝置認證、Play Integrity 與相簿配額是不同驗證項目，不能互相代替。Google 的判定可能改變，不要當成唯一備份策略。
