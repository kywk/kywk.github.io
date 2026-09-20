---
title: 'Util: Cron & LaunchDaemon'
description: macOS 定時自動化排程設定指南（Crontab 與 LaunchDaemon 機制詳解）
tags:
  - Mac
  - Tips
  - Automation
  - CLI
sidebar_position: 32
hide_table_of_contents: false
date_created: 2026-09-03T00:00:00.000Z
---

# [Mac] macOS 定時排程全攻略：Crontab 與 LaunchDaemon

在 macOS 系統中設定定時執行任務（如每 30 分鐘執行一次腳本、定期備份、定時健康檢查等），常見的方式有傳統的 `crontab` 以及 macOS 原生的 `launchd`（LaunchDaemon / LaunchAgent）。

本文整理兩種方式的運作機制差異、開機未登入狀態下的執行策略，以及實作步驟。

---

## 機制比較：哪種方式適合你？

macOS 底層由 `launchd` 接管所有行程管理，官方已將傳統 `cron` 標記為舊機制（Deprecated）。

| 機制 | 設定位置 | 執行身分 | 使用者未登入時是否執行？ | 適用場景 |
| :--- | :--- | :--- | :--- | :--- |
| **User Crontab** | `crontab -e` | 一般使用者 | ❌ 否（受限於使用者 session） | 個人登入期間的簡單週期任務 |
| **Root Crontab** | `sudo crontab -e` | root | ⚠️ 部分支援（需 cron 服務常駐） | 習慣 Linux crontab 語法的系統排程 |
| **LaunchAgent** | `~/Library/LaunchAgents/` | 當前使用者 | ❌ 否（僅在 GUI 登入後執行） | 與桌面、通知或使用者檔案相關任務 |
| **LaunchDaemon** ⭐ | `/Library/LaunchDaemons/` | root / 指定使用者 | ✅ **是（開機即在系統底層運行）** | **系統級背景服務、無人值守排程** |

> [!NOTE]
> **為什麼「開機未登入」推薦 LaunchDaemon？**
> LaunchDaemon 由 macOS 系統根行程（PID 1）直接管理。電腦只要開機通電，無需任何使用者在登入畫面輸入密碼，排程就會準時觸發，且不易受 macOS TCC（權限防護）干擾。

---

## 範例情境說明

假設我們有一個簡單的測試腳本 `/usr/local/bin/hello_task.sh`，目標是**每 30 分鐘自動執行一次**，並記錄執行日誌。

### 準備示範腳本

建立範例腳本 `/usr/local/bin/hello_task.sh`：

```bash
sudo tee /usr/local/bin/hello_task.sh << 'EOF'
#!/bin/bash

NOW=$(date "+%Y-%m-%d %H:%M:%S")
echo "[${NOW}] Hello World: Task executed successfully."
EOF

# 賦予可執行權限
sudo chmod +x /usr/local/bin/hello_task.sh
```

---

## 方案一：使用 macOS 原生 LaunchDaemon（⭐ 推薦）

### 步驟 1：建立 plist 設定檔

在 `/Library/LaunchDaemons/` 底下建立屬性列表檔案（以 `com.example.hellotask.plist` 為例）：

```bash
sudo tee /Library/LaunchDaemons/com.example.hellotask.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.example.hellotask</string>
    
    <!-- 執行的程式與參數 -->
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>/usr/local/bin/hello_task.sh</string>
    </array>
    
    <!-- 間隔時間（秒）：1800 秒 = 30 分鐘 -->
    <key>StartInterval</key>
    <integer>1800</integer>
    
    <!-- 載入服務時立即先執行一次（可選） -->
    <key>RunAtLoad</key>
    <true/>
    
    <!-- 標準輸出與錯誤日誌路徑 -->
    <key>StandardOutPath</key>
    <string>/var/log/hello_task.log</string>
    <key>StandardErrorPath</key>
    <string>/var/log/hello_task_err.log</string>
</dict>
</plist>
EOF
```

### 步驟 2：設定權限並載入服務

LaunchDaemon 要求設定檔擁有者必須是 `root:wheel`，且權限必須為 `644`：

```bash
# 1. 修正權限
sudo chown root:wheel /Library/LaunchDaemons/com.example.hellotask.plist
sudo chmod 644 /Library/LaunchDaemons/com.example.hellotask.plist

# 2. 載入並啟用排程
sudo launchctl load -w /Library/LaunchDaemons/com.example.hellotask.plist
```

### 步驟 3：驗證與管理

#### 檢查服務狀態
```bash
sudo launchctl list | grep hellotask
```
輸出格式範例：
```text
-    0    com.example.hellotask
```
* **第一欄（PID）**：顯示 `-` 表示該任務為間隔觸發型排程，執行完畢即退出等待下一次觸發。
* **第二欄（Status）**：`0` 代表上次執行成功；非 `0` 代表上次執行時腳本返回的 Exit Code。
* **第三欄（Label）**：服務標籤名稱。

#### 查看日誌輸出
```bash
cat /var/log/hello_task.log
```

#### 停止與移除排程
```bash
# 卸載排程
sudo launchctl unload -w /Library/LaunchDaemons/com.example.hellotask.plist

# 刪除設定檔
sudo rm /Library/LaunchDaemons/com.example.hellotask.plist
```

---

## 方案二：使用 Root Crontab

如果偏好使用標準 Cron 表達式，且希望在未登入狀態下依然執行，**必須使用 Root 權限的 Crontab**。

### 步驟 1：編輯 Root Crontab
```bash
sudo crontab -e
```

### 步驟 2：設定排程
在編輯器中加入排程規則（每 30 分鐘執行一次）：

```cron
# 每 30 分鐘執行一次
*/30 * * * * /usr/local/bin/hello_task.sh >> /var/log/hello_task.log 2>&1
```

> **常用 Cron 表達式速查**：
> - `*/30 * * * *`：每 30 分鐘
> - `0 * * * *`：每整點
> - `0 2 * * *`：每天凌晨 2:00
> - `0 9 * * 1-5`：每週一至週五早上 9:00

### 步驟 3：確認排程清單
```bash
sudo crontab -l
```

---

## 進階技巧與注意事項

### 1. 固定時間觸發（Calendar Interval）
若希望像 Cron 指定「每天固定時分」而非間隔秒數，可在 plist 中使用 `StartCalendarInterval`：

```xml
<!-- 每天 03:30 執行 -->
<key>StartCalendarInterval</key>
<dict>
    <key>Hour</key>
    <integer>3</integer>
    <key>Minute</key>
    <integer>30</integer>
</dict>
```

### 2. 環境變數（PATH）問題
LaunchDaemon 預設的 `PATH` 非常精簡（通常僅 `/usr/bin:/bin:/usr/sbin:/sbin`）。若腳本需使用 Homebrew 工具（如 `/opt/homebrew/bin` 或 `/usr/local/bin`），建議在 plist 中補齊 `EnvironmentVariables`：

```xml
<key>EnvironmentVariables</key>
<dict>
    <key>PATH</key>
    <string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
</dict>
```

### 3. Mac 休眠（Sleep）影響
* 當 Mac 進入深度休眠時，CPU 會暫停運作。
* `launchd` 的特性：若休眠期間錯過了觸發時間，Mac **在喚醒後會自動補執行一次**錯過的任務。

---

## Agent Prompt 快速設定模版

將以下 Prompt 複製給 AI Agent，即可讓 Agent 自動為任何腳本建立對應的 LaunchDaemon 定時排程：

```markdown
請幫我在 macOS 上為腳本 `<腳本完整路徑，例如：/usr/local/bin/my_script.sh>` 設定每 `<時間間隔，例如：30 分鐘>` 自動執行的背景定時任務。

請遵循以下要求：
1. 採用 macOS 系統級 LaunchDaemon（位於 `/Library/LaunchDaemons/com.<識別名稱>.plist`），確保即使「電腦開機但未登入任何帳號」時依然能定時執行。
2. 設定 `StartInterval` 為 `<秒數，例如：1800>`，並加入 `RunAtLoad: true` 與標準輸出/錯誤日誌設定（輸出至 `/var/log/<名稱>.log`）。
3. 確保設定檔權限為 `root:wheel 644`，並產生載入指令 (`launchctl load -w`) 與狀態驗證指令 (`launchctl list`)。
4. 示範或產出時請使用安全且通用的環境變數設定。
```

---

## 相關連結

- [[Mac Tips and Tricks]] - macOS 實用技巧與工具
- [[Mac Location Changer]] - 自動依 Wi-Fi 切換網路位置
- [[Awesome Machintosh]] - macOS 相關資源整理
- [Apple Developer - Creating Launch Daemons and Agents](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html)
