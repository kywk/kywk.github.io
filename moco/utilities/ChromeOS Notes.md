---
title: 'ChromeOS: Notes'
description: ChromeOS 設定與使用筆記
tags:
  - ChromeOS
  - Linux
  - Development
image: 'https://i.imgur.com/mErPwqL.png'
hide_table_of_contents: true
date_created: 2022-10-19T16:00:00.000Z
date_updated: 2024-12-26T00:00:00.000Z
slug: /utilities/chromeos-notes/
---

# [ChromeOS] 設定與使用筆記

ChromeOS 作為輕量級作業系統的完整使用指南，涵蓋桌面設定、開發環境建構等實用技巧。

## 🖥️ 桌面環境設定

### Dropbox 整合

在 ChromeOS 上使用 Dropbox 可參考：[[ChromeOS Dropbox]]

### 中文輸入法

**注音輸入設定**：
1. 開啟 `Settings` > `Advanced` > `Languages and inputs`
2. 選擇 `Inputs and keyboards` > `Add input methods`
3. 搜尋並新增「注音輸入法」
4. 使用 `Ctrl + Space` 切換輸入法

> 💡 **提示**：後期版本的 ChromeOS 已內建完整的中文輸入支援

## 🛠️ 開發環境建構

### Linux 容器啟用

**官方文件**：[Linux on ChromeOS | ChromeOS for developers](https://chromeos.dev/en/linux)

ChromeOS 2019 年後內建 Linux 容器支援（基於 Debian）：

**啟用步驟**：
1. `Settings` > `Advanced` > `Developers`
2. 啟用 `Linux development environment`
3. 分配儲存空間（建議 10GB+）
4. 等待容器下載和初始化

**檔案系統整合**：
- `Files` 應用程式中會出現 `Linux files` 資料夾
- 可設定 `Share with Linux` 讓 Linux 存取 ChromeOS 檔案
- 支援 Google Drive、Dropbox 等雲端儲存整合

**軟體安裝**：
```bash
# 更新套件清單
sudo apt update && sudo apt upgrade

# 安裝開發工具
sudo apt install git curl wget vim

# 安裝程式語言環境
sudo apt install python3 nodejs npm
```

### 終端機客製化

#### Shell 環境升級

**安裝 Zsh + Oh-My-Zsh**：
```bash
# 安裝 Zsh
sudo apt install zsh

# 安裝 Oh-My-Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 設為預設 Shell
chsh -s $(which zsh)
```

參考：[自定义 Chrome OS Linux 终端](https://devpress.csdn.net/linux/62ed087689d9027116a11cba.html)

#### Fira Code 字體設定

**在 ChromeOS 終端機中啟用 Fira Code**：

1. 開啟終端機
2. 按 `Ctrl + Shift + J` 開啟 JavaScript Console
3. 執行以下命令：

```javascript
// 設定字體家族
term_.prefs_.set('font-family', '"Fira Code", Cousine, "Roboto Mono", "Source Code Pro", monospace');

// 啟用字體特性（連字等）
term_.prefs_.set('user-css-text', "x-row { font-feature-settings: 'liga', 'calt', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07'; text-rendering: optimizeLegibility; }");

// 載入 Fira Code CSS
term_.prefs_.set('user-css', 'https://cdn.jsdelivr.net/npm/firacode@latest/distr/fira_code.min.css');
```

**相關資源**：
- [ChromeOS Terminal · FiraCode Wiki](https://github.com/tonsky/FiraCode/wiki/ChromeOS-Terminal)
- [Powerline Web Fonts for Chromebook](https://github.com/wernight/powerline-web-fonts)

### 開發工具選擇

#### 線上 IDE

**VSCode Web 版**：
- 網址：[vscode.dev](https://vscode.dev/)
- 優點：功能完整、擴充支援、GitHub 整合
- 缺點：快速鍵可能與 Chrome 衝突

**其他選擇**：
- **GitHub Codespaces** - 雲端開發環境
- **Gitpod** - 基於瀏覽器的 IDE
- **Replit** - 線上協作開發平台

#### 本地開發工具

```bash
# 安裝 VSCode (Linux 版)
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install code
```

## 💡 使用心得

### 效能表現

**硬體需求**：
- 測試環境：m3-6Y30 / 4GB RAM
- 表現：多分頁瀏覽順暢，輕度開發無壓力
- 建議：8GB+ RAM 可獲得更好體驗

### 適用場景

**✅ 適合**：
- 網頁瀏覽和文書處理
- 輕量級程式開發
- 雲端服務重度使用者
- 教育和辦公環境

**❌ 限制**：
- 大型軟體開發專案
- 影音編輯等重度作業
- 特定專業軟體需求

### ChromeOS Flex

ChromeOS Flex 讓舊電腦重獲新生：
- 免費安裝在現有硬體
- 適合淘汰的 Windows/Mac 設備
- 提供接近原生 ChromeOS 體驗

> 📝 **編寫說明**：本文全程在 ChromeOS 環境下完成編寫和發佈

## 🔗 相關資源

### 官方文件
- [ChromeOS for Developers](https://chromeos.dev/)
- [Linux on ChromeOS](https://chromeos.dev/en/linux)

### 社群資源
- [r/ChromeOS](https://www.reddit.com/r/chromeos/) - Reddit 社群
- [在 Chrome OS 下玩 Linux](http://eshensh.net/blog/2020-10-13_00-20)
- [Linux apps on ChromeOS in 2022](https://www.xda-developers.com/linux-apps-chrome-os/)

### 相關文章
- [[ChromeOS Dropbox]] - Dropbox 整合方案
- [[Awesome Utilities]] - 實用工具整理
