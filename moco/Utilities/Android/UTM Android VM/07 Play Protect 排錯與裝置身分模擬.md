---
title: Play Protect 排錯與裝置身分模擬
description: UTM PixelOS GSI 未認證攔截的排錯記錄，含 Samsung Tab S7+ 與 Pixel 相簿分別模擬、Google 資料重設、實測證據與還原方式
tags:
  - Android
  - UTM
  - PixelOS
  - GSI
  - Play Protect
  - Google Photos
  - ADB
sidebar_position: 70
sidebar_label: Play Protect：排錯與身分模擬
date_created: 2026-09-30T00:00:00.000Z
date_updated: 2026-09-30T00:00:00.000Z
---

# Play Protect 排錯與裝置身分模擬

**2026-09-30 的進展：套用 Samsung Tab S7+ 身分，並清除四個 Google 程式的舊資料後，Play 商店與 Google 相簿恢復開啟。** 相簿備份初始頁顯示原始畫質、不計入儲存空間配額；目前仍需完成 Google 帳號重新驗證，才能測試實際上傳及重開機後是否持續可用。

本篇接續 [[03 arm64 方案：PixelOS GSI 虛擬機]]，記錄這台 UTM／LineageOS virtio 宿主的排錯。這是「身分修改＋Google 資料重設」的合併實驗，**尚不能證明只換 Samsung 型號就有效，也未確認正式認證與無限備份已成功**。相簿優惠規則與驗收方式見 [[05 無限空間 Google 相簿]]。

## 環境與症狀

| 項目 | 本次環境 |
| --- | --- |
| 主機 | Apple Silicon M1，8 GB RAM |
| 虛擬機 | UTM 4.7.5，4 vCPU、2560 MB RAM |
| kernel／vendor | LineageOS 23.2，Android 16，`virtio_arm64only` |
| system | PixelOS 16.2 ARM64 A/B GSI，2026-06-28 |
| Google 服務 | GMS、Play 商店與 GSF 已安裝，Google 相簿另行安裝 |
| ADB | 主機 `127.0.0.1:5555`，user build，無法 `adb root`／`adb remount` |

商店與相簿啟動後都出現「這部裝置未通過 Play 安全防護認證」。用 `dumpsys activity` 查到的前景活動包含：

```text
com.google.android.gms.gmscompliance.ui.UncertifiedDeviceActivity
```

網路已連線、時間正常，Google 程式仍在。這與 `/data` 加密金鑰損毀、商店與帳號選項一起消失的症狀不同，不能直接套用清空整個資料碟的修復。

### 三件事要分別驗證

| 項目 | 判定方式 |
| --- | --- |
| Play Protect 裝置認證 | 商店 → 設定 → 關於；另記錄程式是否被未認證活動攔截 |
| Play Integrity | 應用程式取得的完整性 verdict，與裝置認證或相簿配額不能畫等號 |
| 相簿無限備份 | 備份頁、已上傳新項目的詳細資訊，以及必要的容量對照 |

Google 官方指出裝置認證與 Play Protect 的有害程式掃描是不同功能；關閉掃描不會解決未認證問題。見 [Google 裝置認證說明](https://support.google.com/android/answer/7165974?hl=en)。

## 先前嘗試與結果

| 日期／操作 | 結果 |
| --- | --- |
| 9/29：核對網路、時間與 GApps | 未發現缺少服務或連線問題 |
| 使用 GSF Android ID 在 Google 登錄 | 網頁接受登錄，但重啟後商店與相簿仍被攔截 |
| 清除商店、GMS 快取 | 仍被攔截 |
| 清除商店應用程式資料 | 仍被攔截 |
| 修復 PixelOS PIF 自動更新的空值錯誤 | 能取回並保存 PIF JSON，重開機後錯誤不再出現；攔截仍在 |
| 9/30：Samsung 型號與品牌先生效，指紋仍為 VirtIO | 未完成一致的身分模擬 |
| 修正開機腳本，完整套用 Samsung 身分與手動 PIF | 清除舊資料前仍被攔截 |
| 再清除商店、GMS、GSF、相簿資料 | 商店首頁與相簿初始頁可開啟；相簿顯示原始畫質、不計配額 |

GSF ID 是 Google 服務框架的識別碼；`settings get secure android_id` 的值不能直接當成 GSF ID。本次 user build 無法以 root 讀取 `gservices.db`，最後以 Google Find Hub 的裝置資料取得 GSF ID，再於 [未認證裝置登錄頁](https://www.google.com/android/uncertified/) 提交。文章不公開實際識別碼。清除 GSF 資料可能更換 ID，原登錄也不能假設仍對應重設後的裝置。

### PIF 空值錯誤

此版本 `AttestationService` 在 `fetched_pif` 尚未建立時，呼叫 `savedProps.equals(props)` 會產生 `NullPointerException`。當次先給它一個合法、非 null 的 JSON：

```sh
ADB=~/workspace/PixelOS-ARM/platform-tools/adb
"$ADB" -s 127.0.0.1:5555 shell settings put secure fetched_pif '{}'
```

之後自動更新寫入有效的 PIF JSON，且正常重開機後仍保留。這只修復自動更新路徑，不等於裝置通過認證。原始邏輯見 [PixelOS AttestationService](https://github.com/PixelOS-AOSP/android_frameworks_base/blob/sixteen-qpr2/services/core/java/com/android/server/custom/AttestationService.java)。

## 為什麼只改 build.prop 不夠

原本全域型號是 `VirtIO arm64-only`，指紋為：

```text
VirtIO/lineage_virtio_arm64only/virtio_arm64only:16/BP4A.251205.006/eng.root:user/test-keys
```

GSI 的 `/system/bin/rw-system.sh` 在 `post-fs` 階段執行，會把 vendor 指紋複製到全域、system、product、system_ext 與 bootimage 屬性。例如：

```sh
copyprop ro.build.fingerprint ro.vendor.build.fingerprint
copyprop ro.product.build.fingerprint ro.vendor.build.fingerprint
```

因此，第一輪修改 `/system/product/etc/build.prop` 後，型號已是 `SM-T970`，但全域指紋仍被改回 VirtIO。若只看設定頁型號，會誤認為完整模擬已生效。

## 本次採用的身分配置

| 範圍 | 模擬身分 | 實作 |
| --- | --- | --- |
| 系統全域型號／品牌／裝置名稱與主要指紋 | Samsung Tab S7+，`SM-T970` | product build.prop 與 rw-system.sh |
| Google 商店與 GMS unstable 程序的 Java Build 欄位 | Samsung Tab S7+ | PixelOS 的手動 `pif_data` |
| Google 相簿程序 | 第一代 Pixel，`sailfish` | PixelOS 內建 PropImitationHooks |

Samsung 指紋取自 [MagiskHide Props Config 的公開清單](https://github.com/Magisk-Modules-Repo/MagiskHidePropsConf/blob/master/common/prints.sh)：

```text
samsung/gts7xlwifixx/gts7xlwifi:11/RP1A.200720.012/T970XXU1BUAA:user/release-keys
```

這是歷史清單中的公開 stock 指紋，**不是硬體認證憑證，也不能保證目前仍可取得任何完整性 verdict**。本次保留真實 Android 16 的全域 SDK／API、CPU ABI 與 kernel/vendor 驅動；手動 PIF 則把相關 Google 程序的 Build 身分設成 Samsung，包括 `VERSION.RELEASE=11`。這是模擬實驗，並未把客體改裝成 Samsung 韌體。

### 1. 離線修改 system 映像

先正常關閉客體，再正常退出 UTM，確認 `QEMULauncher` 已結束，才以 `debugfs` 修改 raw ext4 的 `system.img`。避免在 UTM 開著時替換或搬動磁碟。

本次修改：

- `/system/product/etc/build.prop`：加入 Samsung 的 model、brand、manufacturer、name、device 與 fingerprint；同時設定各分割區的 product 身分屬性。
- `/system/bin/rw-system.sh`：在既有硬體 workaround 後追加 `resetprop_phh -n`，覆寫全域身分，以及 system/product/system_ext/bootimage 指紋，避免被前面的 vendor 複製步驟蓋回去。
- 保留檔案模式與 SELinux 標籤：build.prop 為 `system_file`，rw-system.sh 為 `phhsu_exec`。
- 修改後用 `e2fsck -fn` 檢查，檔案系統通過。

本次產出的原檔、Samsung 版本及 debugfs 命令檔，保存在專案 `diagnostics/2026-09-30-spoof/`。以下是**依賴該次已產生命令檔的操作**，不是可直接套用到任意 GSI 的安裝腳本；必須先確認版本、檔案與備份。

```sh
cd ~/workspace/PixelOS-ARM
DBG=/opt/homebrew/opt/e2fsprogs/sbin/debugfs
IMG=LineageOS_on_arm64.utm/Data/system.img
"$DBG" -w -f diagnostics/2026-09-30-spoof/patch.debugfs "$IMG"
"$DBG" -w -f diagnostics/2026-09-30-spoof/patch-rw.debugfs "$IMG"
/opt/homebrew/opt/e2fsprogs/sbin/e2fsck -fn "$IMG"
```

### 2. 套用 Google 程序的手動 PIF

當次 `pif-samsung.json` 包含 manufacturer、model、brand、product、device、fingerprint、build ID、incremental、type、tags 與 version.release。JSON 檔案與系統身分需一致；使用 Python 參數陣列及 shell 引號傳入，避免 JSON 被 ADB shell 拆開：

```sh
cd ~/workspace/PixelOS-ARM
python3 - <<'PY'
import json, shlex, subprocess
from pathlib import Path
value = json.loads(Path('diagnostics/2026-09-30-spoof/pif-samsung.json').read_text())
subprocess.run([
    'platform-tools/adb', '-s', '127.0.0.1:5555', 'shell',
    'settings put secure pif_data ' + shlex.quote(json.dumps(value)),
], check=True)
PY
```

PixelOS 對相簿另有專屬處理，不會用這份 Samsung PIF 取代相簿的 Pixel 模擬。原始碼見 [PropImitationHooks](https://github.com/PixelOS-AOSP/android_frameworks_base/blob/sixteen-qpr2/core/java/com/android/internal/util/PropImitationHooks.java)。本次日誌確認相簿讀到：

```text
MODEL=Pixel
DEVICE=sailfish
FINGERPRINT=google/sailfish/sailfish:10/QP1A.191005.007.A3/5972272:user/release-keys
```

### 3. 重設舊 Google 資料

> [!warning]
> 下列命令會清除四個應用程式的資料、權限與設定，可能要求重新登入或驗證 Google 帳號。GSF ID 可能改變。本次已先取得可清除 VM 資料的同意；一般環境不能當成無影響的清快取指令。

```sh
ADB=~/workspace/PixelOS-ARM/platform-tools/adb
"$ADB" -s 127.0.0.1:5555 shell pm clear com.android.vending
"$ADB" -s 127.0.0.1:5555 shell pm clear com.google.android.gms
"$ADB" -s 127.0.0.1:5555 shell pm clear com.google.android.gsf
"$ADB" -s 127.0.0.1:5555 shell pm clear com.google.android.apps.photos
```

當次四次均回覆 `Success`。未清空整個 `/data`、未重建 metadata 分割區，也未修改 9/24 的完整 VM 備份。Google 帳號名稱仍保留，但相簿接著要求重新驗證身分。

## 結果與驗收進度

| 驗收項目 | 2026-09-30 結果 |
| --- | --- |
| 系統 Samsung 型號／品牌／指紋 | 已核對 getprop |
| 商店程序 Samsung Build 身分 | 已核對 PropImitationHooks 日誌 |
| 相簿程序 Pixel 第一代身分 | 已核對 PropImitationHooks 日誌 |
| 商店載入首頁 | 已確認 AssetBrowserActivity 與實際首頁內容 |
| 相簿不再被未認證活動攔截 | 已確認 HomeActivity 與備份初始頁 |
| 相簿原始畫質／不計配額文案 | 已出現 |
| 商店設定顯示正式「已認證」 | 尚未核對 |
| Google 帳號重新驗證 | 待使用者完成 |
| 新圖片上傳成功且不計配額 | 尚未完成 |
| 正常重開機後仍能使用 | 尚未完成 |

下一步使用客體 `/sdcard/DCIM/PixelOS-backup-test-20260930.png` 作為測試檔：3,147,857 bytes，由程式產生、不含個人資料。登入後先確認備份完成與該項目的配額資訊，再正常重開機重測。不能僅憑初始頁文案宣告無限備份已成功。

## 還原方式

正常關閉 VM、退出 UTM 並確認沒有 QEMU 程序使用磁碟後，從專案根目錄執行：

```sh
cd ~/workspace/PixelOS-ARM
/opt/homebrew/opt/e2fsprogs/sbin/debugfs -w \
  -f diagnostics/2026-09-30-spoof/restore.debugfs \
  LineageOS_on_arm64.utm/Data/system.img
/opt/homebrew/opt/e2fsprogs/sbin/e2fsck -fn \
  LineageOS_on_arm64.utm/Data/system.img
```

開機後移除手動 PIF 與本次除錯日誌設定：

```sh
ADB=~/workspace/PixelOS-ARM/platform-tools/adb
"$ADB" -s 127.0.0.1:5555 shell settings delete secure pif_data
"$ADB" -s 127.0.0.1:5555 shell setprop log.tag.PropImitationHooks INFO
```

還原命令恢復兩個系統檔案，**不會恢復已清除的 Google 應用程式資料**。需要完整恢復時，另評估既有的 9/24 VM 備份。

## 本機證據

當次完整記錄位於 `~/workspace/PixelOS-ARM/diagnostics/2026-09-30-spoof/`：

- `README.md`：操作、已知結果與待驗證項目。
- `product-build.prop.original`、`rw-system.sh.original`：修改前內容。
- `product-build.prop.samsung`、`rw-system.sh.samsung`、`pif-samsung.json`：當次模擬設定。
- `patch.debugfs`、`patch-rw.debugfs`、`restore.debugfs`：離線修改與還原命令。
- `photos-unlimited-onboarding.png`：相簿原始畫質、不計配額的初始頁截圖。

此結果只涵蓋這組 UTM、vendor 與 GSI。後續 Google 服務更新或認證資料更新可能改變結果；不能把它當成所有 GSI／模擬器都能使用的保證。
