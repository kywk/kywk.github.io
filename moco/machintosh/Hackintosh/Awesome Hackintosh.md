---
sidebar_position: 0
title: Awesome Hackintosh
description: Hackintosh 相關資源、工具與社群整理
tags:
  - Awesome
  - Hackintosh
slug: /machintosh/hackintosh/awesome-hackintosh/
---

# Awesome Hackintosh Resources

精選 Hackintosh 相關的優質資源、工具、驅動程式與社群連結。

## 官方資源

### 安裝指南

- [Hackintosh.com](https://hackintosh.com/) - Hackintosh 安裝指南與教學
- [Dortania's OpenCore Install Guide](https://dortania.github.io/OpenCore-Install-Guide/) - OpenCore 官方安裝指南
- [OpenCore Legacy Patcher](https://dortania.github.io/OpenCore-Legacy-Patcher/) - 舊 Mac 安裝新系統工具
- [OpenCore Post-Install](https://dortania.github.io/OpenCore-Post-Install/) - OpenCore 安裝後設定指南

### 文件與規範

- [OpenCore Configuration](https://dortania.github.io/docs/latest/Configuration.html) - OpenCore 配置文件說明
- [ACPI Specification](https://uefi.org/specifications) - ACPI 規範文件

## 引導程式

### OpenCore

- [OpenCore](https://github.com/acidanthera/OpenCorePkg) - 現代化的 Hackintosh 引導程式
- [OpenCore Auxiliary Tools](https://github.com/ic005k/OCAuxiliaryTools) - OpenCore 配置工具
- [OpenCore Configurator](https://mackie100projects.altervista.org/opencore-configurator/) - OpenCore 圖形化配置工具

### Clover

- [Clover](https://github.com/CloverHackyColor/CloverBootloader) - 傳統 Hackintosh 引導程式
- [Clover Configurator](https://mackie100projects.altervista.org/download-clover-configurator/) - Clover 配置工具

## 工具程式

### 配置工具

- [ProperTree](https://github.com/corpnewt/ProperTree) - 跨平台 Plist 編輯器
- [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS) - SMBIOS 生成工具
- [SSDTTime](https://github.com/corpnewt/SSDTTime) - SSDT 自動生成工具
- [MountEFI](https://github.com/corpnewt/MountEFI) - EFI 分區掛載工具

### USB 製作工具

- [gibMacOS](https://github.com/corpnewt/gibMacOS) - macOS 安裝程式下載工具
- [MakeInstallmacOS](https://github.com/corpnewt/MakeInstallmacOS) - macOS 安裝碟製作工具
- [balenaEtcher](https://www.balena.io/etcher/) - USB 映像寫入工具

### 診斷工具

- [Hackintool](https://github.com/benbaker76/Hackintool) - Hackintosh 綜合工具
- [IORegistryExplorer](https://github.com/utmapp/IORegistryExplorer) - IO Registry 查看工具
- [gfxutil](https://github.com/acidanthera/gfxutil) - 設備路徑查詢工具

## 驅動程式 (Kexts)

### 核心驅動

- [Lilu](https://github.com/acidanthera/Lilu) - 核心擴展補丁平台
- [VirtualSMC](https://github.com/acidanthera/VirtualSMC) - SMC 模擬器
- [WhateverGreen](https://github.com/acidanthera/WhateverGreen) - 顯示卡驅動補丁

### 音效驅動

- [AppleALC](https://github.com/acidanthera/AppleALC) - 原生音效卡驅動
- [VoodooHDA](https://sourceforge.net/projects/voodoohda/) - 通用音效驅動

### 網路驅動

- [AirportItlwm](https://github.com/OpenIntelWireless/itlwm) - Intel 無線網卡驅動
- [IntelBluetoothFirmware](https://github.com/OpenIntelWireless/IntelBluetoothFirmware) - Intel 藍牙驅動
- [RealtekRTL8111](https://github.com/Mieze/RTL8111_driver_for_OS_X) - Realtek 有線網卡驅動
- [LucyRTL8125Ethernet](https://github.com/Mieze/LucyRTL8125Ethernet) - Realtek 2.5G 網卡驅動

### 輸入設備驅動

- [VoodooPS2](https://github.com/acidanthera/VoodooPS2) - PS/2 鍵盤滑鼠驅動
- [VoodooI2C](https://github.com/VoodooI2C/VoodooI2C) - I2C 觸控板驅動
- [VoodooInput](https://github.com/acidanthera/VoodooInput) - 輸入設備支援

### USB 驅動

- [USBToolBox](https://github.com/USBToolBox/tool) - USB 端口映射工具
- [USBMap](https://github.com/corpnewt/USBMap) - USB 端口配置工具

### 其他驅動

- [NVMeFix](https://github.com/acidanthera/NVMeFix) - NVMe SSD 電源管理
- [CPUFriend](https://github.com/acidanthera/CPUFriend) - CPU 電源管理
- [BrightnessKeys](https://github.com/acidanthera/BrightnessKeys) - 亮度調節按鍵支援

## ACPI 補丁

### SSDT 範例

- [SSDT-PLUG](https://dortania.github.io/Getting-Started-With-ACPI/Universal/plug.html) - CPU 電源管理
- [SSDT-EC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) - 嵌入式控制器修復
- [SSDT-PNLF](https://dortania.github.io/Getting-Started-With-ACPI/Laptops/backlight.html) - 筆電背光控制
- [SSDT-AWAC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/awac.html) - 系統時鐘修復

### ACPI 工具

- [MaciASL](https://github.com/acidanthera/MaciASL) - ACPI 編輯器
- [iasl](https://acpica.org/downloads) - ACPI 編譯器

## 社群與論壇

### 國際社群

- [tonymacx86](https://www.tonymacx86.com/) - 最大的 Hackintosh 社群論壇
- [InsanelyMac](https://www.insanelymac.com/) - Hackintosh 討論區
- [r/hackintosh](https://www.reddit.com/r/hackintosh/) - Reddit Hackintosh 社群
- [OSx86 Project](https://www.osx86project.org/) - Hackintosh 專案資源

### 中文社群

- [遠景論壇 Hackintosh 版](http://bbs.pcbeta.com/forum-559-1.html) - 中文 Hackintosh 論壇
- [黑果小兵](https://blog.daliansky.net/) - 中文 Hackintosh 部落格
- [XJN's Blog](https://blog.xjn819.com/) - Hackintosh 教學部落格

### Discord 伺服器

- [r/Hackintosh Paradise](https://discord.gg/u8V7N5C) - Reddit Hackintosh Discord
- [AMD OS X](https://discord.gg/EfCYAJW) - AMD Hackintosh 專用

## 硬體相容性

### CPU

- [Intel CPU 支援列表](https://dortania.github.io/OpenCore-Install-Guide/macos-limits.html#cpu-support) - Intel CPU 相容性
- [AMD CPU 支援](https://github.com/AMD-OSX/AMD_Vanilla) - AMD Hackintosh 補丁

### 顯示卡

- [GPU Buyers Guide](https://dortania.github.io/GPU-Buyers-Guide/) - 顯示卡選購指南
- [WhateverGreen FAQ](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md) - Intel 核顯設定

### 主機板

- [Motherboard Support](https://dortania.github.io/OpenCore-Install-Guide/macos-limits.html#motherboard-support) - 主機板相容性

## 學習資源

### 影片教學

- [TechNolli](https://www.youtube.com/@TechNolli) - Hackintosh 教學頻道
- [Techno Tim](https://www.youtube.com/@TechnoTim) - 技術教學頻道

### 部落格

- [Dortania Blog](https://dortania.github.io/) - OpenCore 官方部落格
- [Hackintosh Guide](https://hackintosh.gitbook.io/) - Hackintosh 指南

## 常見問題

### 疑難排解

- [OpenCore Troubleshooting](https://dortania.github.io/OpenCore-Install-Guide/troubleshooting/troubleshooting.html) - OpenCore 疑難排解
- [Common Issues](https://dortania.github.io/OpenCore-Post-Install/universal/issues.html) - 常見問題解決

### 更新指南

- [Updating OpenCore](https://dortania.github.io/OpenCore-Post-Install/universal/update.html) - OpenCore 更新指南
- [macOS Updates](https://dortania.github.io/OpenCore-Post-Install/universal/oc2hdd.html) - macOS 系統更新

## See Also

- [[Catalina on MBA 2011]] - MacBook Air 2011 安裝 Catalina 教學
- [[Mount EFI]] - 掛載 EFI 磁區方式
- [[Awesome Machintosh]] - macOS 相關資源整理
