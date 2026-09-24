---
title: 'arm64 方案：PixelOS GSI 虛擬機'
description: 在 Apple Silicon Mac 的 UTM 上用 LineageOS 23.2 virtio 虛擬機開機 PixelOS 16.2 GSI，含 GRUB 預設項目、metadata 加密分割區與排錯記錄
tags:
  - Android
  - UTM
  - QEMU
  - ARM
  - GSI
  - PixelOS
  - LineageOS
  - ADB
sidebar_position: 30
sidebar_label: arm64：PixelOS GSI 虛擬機
date_created: 2026-09-24T00:00:00.000Z
date_updated: 2026-09-24T00:00:00.000Z
---

# arm64 方案：PixelOS GSI 虛擬機

**Apple Silicon** 路線：主機與客體同為 aarch64，可用 HVF 原生虛擬化。Intel Mac 請看 [[02 x86_64 方案：BlissOS 硬碟開機與資料碟]]。

## 組合

GSI（只含 system 分割區）需要宿主提供 kernel 與 vendor，本路線的組合是：

- **LineageOS 23.2 `virtio_arm64only` UTM 虛擬機**（Android 16）：提供 kernel、vendor HAL、開機流程與 GRUB 選單。
- **PixelOS 16.2 GSI（arm64）**：提供 system，即實際看到的 ROM。

> [!warning]
> `virtio_*` 不是 LineageOS 官方建置伺服器產出的目標，屬社群維護。

## 材料

| 角色 | 來源 | 檔案 |
| --- | --- | --- |
| 宿主虛擬機 | jqssun/android-lineage-qemu | `UTM-VM-lineage-23.2-20260917-jqssun-virtio_arm64only.zip`（約 1.1 GB） |
| GSI | Doze-off/PixelOS_GSI_treble | `PixelOS-16.2-GSI_treble_arm64-ab-20260628.img.xz`（約 1.4 GB） |

**宿主是 Android 16，GSI 就必須是 Android 16 以上**（PixelOS 16.2 對 LineageOS 23.2 剛好同版）。

## 建立步驟

### 1. 匯入虛擬機

解壓得到 `LineageOS_on_arm64.utm`，雙擊匯入 UTM。磁碟配置：

| 磁碟 | 大小 | 內容 |
| --- | --- | --- |
| `vda.qcow2` | 5 GiB | GPT + ESP（GRUB）+ LineageOS 分割區 |
| `vdb.qcow2` | 16 GiB → 64 GiB | `/data`（原廠 16 GiB，放大步驟見 6） |

### 2. 掛 GSI 為第三顆 VirtIO 磁碟

解壓 `.img.xz` 得 `system.img`（約 3.33 GiB，raw ext4），放進虛擬機 `Data/` 目錄，在 `config.plist` 加：

```xml
<dict>
    <key>Identifier</key><string>vdc</string>
    <key>ImageName</key><string>system.img</string>
    <key>ImageType</key><string>Disk</string>
    <key>Interface</key><string>VirtIO</string>
    <key>InterfaceVersion</key><integer>1</integer>
    <key>ReadOnly</key><false/>
</dict>
```

客體會看到 `/dev/block/vdc`。

### 3. UTM 設定

- **Memory / CPU**：原廠 2 GiB / 2 cores；PixelOS + GApps 建議 **2.5–3 GiB / 4 cores**。注意不要超過主機實體記憶體的一半——8 GB 主機若給到 6 GiB，macOS 會瘋狂換頁，UTM 畫面會凍結在開機動畫（`utmctl status` 卡在 `starting`）。
- **Renderer Backend**：UTM → Settings → Display → **`ANGLE (OpenGL)`**。若是 `ANGLE (Metal)`，Android 開完機**不會有畫面**。

### 4. GRUB：把 GSI 設成預設開機項目

GRUB 設定在 `vda.qcow2` 內的 ESP（`/boot/grub/grub.cfg`）。關閉 UTM 後離線掛載修改：

```sh
qemu-img convert -O raw vda.qcow2 vda.raw
hdiutil attach -nomount -imagekey diskimage-class=CRawDiskImage vda.raw
diskutil mount /dev/diskN s1        # EFI 分割區，FAT32
```

把預設項目指到 GSI（`--id android-virtio_common-gsifromvdc`），並在該 menuentry 的 kernel cmdline 加 `androidboot.insecure_adb=1`：

```sh
set grub_android_default="advancedoptions-virtio_common>android-virtio_common-gsifromvdc"
if [ ! "$grub_timeout" ]; then
	set grub_timeout=5
fi
```

改完卸載、轉回 qcow2。開機後 GRUB 停留約 5 秒，預設即 PixelOS。

### 5. `/metadata` 必須是有效的 ext4

**此步是成敗關鍵。** GSI 的 fstab 會把 `metadata` 分割區（vda4，32 MiB）掛到 `/metadata`，但**不會自動格式化它**；而 Android 的 `/data` 加密（metadata encryption）金鑰存放在：

    /metadata/vold/metadata_encryption/key

若分割區是空的或殘留舊金鑰，症狀是 `init_user0_failed` → 自動重開進 recovery：

```sh
qemu-img convert -O raw vda.qcow2 vda.raw
dd if=vda.raw of=meta.img bs=512 skip=8916992 count=65536   # metadata 分割區
mke2fs -t ext4 -b 4096 -m 0 -F meta.img
dd if=meta.img of=vda.raw bs=512 seek=8916992 conv=notrunc
qemu-img convert -O qcow2 vda.raw vda.qcow2

qemu-img create -f qcow2 vdb.qcow2 64G                      # 清空 /data（同時放大到 64 GiB）
```

重建後 vold 會把金鑰寫進去，之後**重開機也能正常解密**。

> [!warning]
> **務必正常關機，不要硬殺 QEMU。** 硬殺（`pkill`、強制結束 UTM、直接關視窗）會損毀金鑰狀態，
> 下次開機重演 `init_user0_failed`，`/data` 只能清空重建。用虛擬機內電源選單關機，
> 或 `utmctl stop <uuid> --request`；直跑 QEMU 時用 monitor 的 `quit`。

### 6. 把 `/data` 放大到 64 GiB

原廠 `vdb.qcow2` 只有 16 GiB。**只放大虛擬磁碟沒有用**——`qemu-img resize vdb.qcow2 64G`
之後 Android 不會自動擴充裡面的 ext4，而上游的補救路徑幾乎都被堵住：

- `/data` 是 metadata 加密，主機離線讀不到 ext4 superblock，無法在 macOS 上 `resize2fs`
- GSI 是 user build：`adb root` 不可用，`/system/bin` 也沒有 `resize2fs`
- recovery 的 adb 需要授權，且同樣沒有 `resize2fs`

因此**唯一可行的是重建 `/data`**，讓 Android 首次開機重新格式化（會清空資料）：

```sh
qemu-img create -f qcow2 vdb.qcow2 64G
```

重建後接著做步驟 5 的 `/metadata` 重建，GSI 會在首次開機重新建立金鑰。

### 7. GApps

此 GSI 是**精簡 GApps**：內含 GMS、Play 商店、Google 服務框架與 Google 設定精靈（所以開機精靈有登入 Google 帳號步驟）；相簿、Gmail、Maps 等使用者 App 需自行從 Play Store 安裝。

若 Play 商店與 Google 帳號選項同時消失，不是 ROM 缺 GApps，而是 `/data` 損毀：`keystore2` 會 SIGABRT，依賴 keystore 的 GMS 跟著失效。修復 `/data`（上一步）即恢復。

## 啟動

UTM Start 後 GRUB 預設即 PixelOS。設定精靈依序為：選擇地區 → 複製裝置 → 正在準備裝置 → 登入 Google 帳號 → Google 服務；走完主畫面出現 Play 商店。

## ADB

```sh
adb connect 127.0.0.1:5555
adb devices
```

限制：此 GSI 是 user build，`adb root`／`adb remount` 不可用。要能 `adb shell`，客體必須先在「開發人員選項 → USB 偵錯」開啟；未開啟時 `adb devices` 仍顯示 `device`，但 shell 會回 `error: closed`。GRUB cmdline 已帶 `androidboot.insecure_adb=1`，不會跳授權對話框。

## 與主機共享檔案

本 VM 網路是 UTM **Emulated VLAN**，客體 `10.0.2.15`、**主機 `10.0.2.2`**（不是 Shared 模式的 `192.168.64.1`）。

完整方式（macOS SMB、HTTP、ADB、兩種網路模式位址對照）見 [[04 與主機共享檔案]]。

## 已知限制

- `virtio_*` 沒有 OTA，更新只能換映像。
- 換 GSI 要挑 Android 版本 >= 宿主。
- 精簡 GApps：Google 相簿等 App 需自行安裝（資格不受影響，見 [[05 無限空間 Google 相簿]]）。

## 檔案位置

- 虛擬機：`~/workspace/PixelOS-ARM/LineageOS_on_arm64.utm`
- GSI 映像：`~/workspace/PixelOS-ARM/LineageOS_on_arm64.utm/Data/system.img`
- 下載備份與排錯工具：`~/workspace/PixelOS-ARM/`（UTM VM zip、GSI xz、`tools/`）
