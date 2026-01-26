---
title: "Terminals"
description: macOS 終端機軟體比較與選擇指南
image: https://lh3.googleusercontent.com/pw/ACtC-3cYYtkzJjo_oG7Gzqq8T8XQm4V_qLE3wGWVKOahp6YT4lo-on60NJmjrkkatnizX1b-uID-MCM2ztsXH9z27cMRtql3PA5cpYZYbMfSPuM5Yh3MmqnjnnXYkTg6vtIiBL5SGAQRRAI9zEBIOoyP3tZpuA?authuser=0
tags:
  - Mac
  - DevEnv
sidebar_position: 20
date_created: 2025-05-31
date_updated: 2025-05-31
slug: /machintosh/develop/terminals/
---

# [Mac] 終端機軟體比較

在 macOS 上，有許多優秀的終端機軟體可供選擇，不同的使用者會根據自己的需求（例如：開發、系統管理、美觀、效率等）來選擇合適的工具。以下是幾個常見的終端機軟體比較：

## macOS 內建 Terminal.app

優點：
- 無需安裝，隨系統附帶
- 輕量、穩定
- 支援基本的 tab 管理和顏色自定義

缺點：
- 功能較簡單，缺乏進階特性
- 不支援分頁、分窗格
- 自訂程度不高

適合：基本使用者或偶爾使用者。

## iTerm2

優點：
- 免費且開源
- 支援 split pane（分窗格）、hotkey window、trigger、search 等強大功能
- 高度可自訂：外觀、快捷鍵、字體、profile
- 支援 zmodem、clipboard history、autocomplete
- 優秀的 color rendering，適合長時間使用

缺點：
- 功能多，設定較複雜
- 啟動稍慢於內建 Terminal

適合：程式開發者、進階用戶、需要高效率工作流的使用者。

## Warp Terminal

現代化新選擇

優點：
- UI 現代化，有命令區塊與輸出區分
- 內建 command palette、自動補全、GPT 整合
- 支援分頁、多欄位、command history
- 使用 Rust 開發，效能佳

缺點：
- 雖然免費，但需註冊帳號（某些功能需要登入）
- 功能仍在開發中，部分行為與傳統 Terminal 不完全一致
- 不完全開源（截至目前為止）

適合：追求現代 UX/UI 的開發者，或習慣 VSCode-style 使用體驗的使用者。

## WezTerm

優點：
- 使用 GPU 加速，效能佳
- 支援多平台（macOS/Linux/Windows）
- 高度可自定義（Lua 腳本設定）
- 支援 tab、pane、多會話、多字體（Ligature、Emoji 支援好）

缺點：
- 設定檔為 Lua，需要一定技術門檻
- 沒有 GUI 設定介面

適合：喜歡自訂、追求效能與美觀的技術用戶。

## Alacritty

優點：
- 超快，使用 GPU rendering
- 輕量、專注效能與簡潔
- 跨平台

缺點：
- 功能較少（無分窗格、tab、scrollback search 等需外部整合）
- YAML 設定檔需手動編輯
- 無 GUI 設定介面

適合：注重極致效能與極簡風格的用戶。

## Ghostty

開發者：前 Warp 團隊成員（由 Mitchell Hashimoto 發起）

特點：
- 使用 GPU 加速（Metal）
- 原生 macOS App，支援 TrueColor、ligatures
- 使用 Rust 開發，效能優異
- 終端介面極簡、類似 Alacritty，但支援更多 macOS 特性（如 Secure Keyboard Entry）

缺點：
- 開發中（截至 2025 還在頻繁更新中）
- GUI/自訂功能還在成長中，設定目前偏手動

適合：想要極速且原生感的使用者。

## Kitty

開發語言：C + Python

特點：
- GPU 加速終端機
- 支援分窗格、多 session
- 高度自訂（支援 Kitty 自家圖形協議，可內嵌圖片/圖表）
- 支援 ligatures、emoji
- 使用配置檔方式設定

缺點：
- GUI 設定介面缺乏，需手動設定
- 開始使用需一點時間適應 Kitty-specific 的概念（如 `kitten` plugins）

適合：開發者、文字美觀需求高者（如 DevOps、資料科學家）。

## Tabby

技術基礎：Electron（類似 VSCode）

特點：
- UI 現代、可用 GUI 設定與 plugin
- 類似 VSCode 的 Plugin 架構，擴充性強
- 預設支援多會話、SSH、分頁、主題、字型管理

缺點：
- Electron 架構佔用記憶體較多
- 效能比不上純原生或 GPU 渲染終端

適合：喜歡 GUI 設定、可視化的用戶（或習慣 VSCode 的人）。

## 比較總表

| 軟體 | 分窗格 | GPU 加速 | 自訂性 | UI 現代化 | 開源 | 特殊優勢 | 適合對象 |
|------|--------|----------|--------|-----------|------|----------|----------|
| Terminal | 否 | 否 | 低 | 否 | ✅ | 系統預載 | 基本使用者 |
| iTerm2 | ✅ | 否 | 高 | 傳統 | ✅ | 功能強、穩定 | 專業開發者 |
| Warp | ✅ | ✅ | 中 | ✅ 現代化 | ❌ | GPT 整合、區塊命令 | 新世代開發者 |
| WezTerm | ✅ | ✅ | 高 (Lua) | 中 | ✅ | 跨平台、極佳字型渲染 | 技術進階用戶 |
| Alacritty | ❌ | ✅ | 中 (YAML) | 否 | ✅ | 極速、極簡 | 效能極簡主義者 |
| Ghostty | ❌ | ✅ | 中 | 中 | ✅ | macOS 原生感、速度極快 | macOS 開發者、效能取向 |
| Kitty | ✅ | ✅ | 高 | 中 | ✅ | 支援圖片、圖表、ligature | DevOps、資料科學工作者 |
| Tabby | ✅ | ❌ (Electron) | 高 (GUI) | ✅ 現代化 | ✅ | Plugin 架構、圖形化設定界面 | 喜歡 VSCode 的 GUI 使用者 |

## 總結建議

| 使用情境 | 推薦軟體 |
|----------|----------|
| 想快速開 terminal 做簡單事情 | Terminal.app |
| 進階使用者想全面掌控功能 | iTerm2, WezTerm |
| 要現代 UI + 高效率工作流 | Warp, Tabby |
| 在意字型顯示和 GPU 效能 | Kitty, WezTerm, Ghostty |
| 追求極簡與超快啟動速度 | Alacritty, Ghostty |

## See Also

- [alacritty/alacritty: A cross-platform, OpenGL terminal emulator.](https://github.com/alacritty/alacritty)
- [Ghostty Terminal](https://ghostty.org/)
- [Kitty Terminal](https://sw.kovidgoyal.net/kitty/)
- [WezTerm](https://wezfurlong.org/wezterm/)

---

_assisted by ChatGPT_
