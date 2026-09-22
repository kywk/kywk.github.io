---
title: Obsidian Hot Keys
description: 目前 vault 的自訂快捷鍵與使用方式
image: 'https://i.imgur.com/mErPwqL.png'
tags:
  - Obsidian
  - Hot Keys
  - 快速鍵
sidebar_position: 30
sidebar_label: 自訂快捷鍵
date_created: 2024-04-07T00:00:00.000Z
date_updated: 2026-09-22T00:00:00.000Z
---

# [Obsidian] 自訂快捷鍵

本頁只記錄 `.obsidian/hotkeys.json` 目前存在的自訂快捷鍵。Obsidian 的預設快捷鍵不列在這裡，避免把「預設行為」誤當成 vault 的個人配置。

## 目前的自訂快捷鍵

| 指令 | 設定檔中的按鍵 | macOS 顯示 |
| --- | --- | --- |
| Toggle left sidebar | `Alt + ArrowLeft` | `⌥ ←` |
| Toggle right sidebar | `Alt + ArrowRight` | `⌥ →` |
| Swap line down | `Alt + Mod + ArrowDown` | `⌥ ⌘ ↓` |
| Swap line up | `Alt + Mod + ArrowUp` | `⌥ ⌘ ↑` |

在 macOS 中，Obsidian 的 `Mod` 代表 Command（`⌘`）；在 Windows／Linux 通常會對應 Control（`Ctrl`）。

## 使用情境

### 收合側邊欄

- `⌥ ←`：收合或展開左側邊欄。
- `⌥ →`：收合或展開右側邊欄。

這兩組快捷鍵適合在閱讀或寫作時快速騰出主編輯區空間。

### 調整列表順序

在編輯器中：

- `⌥ ⌘ ↓`：將目前行往下移。
- `⌥ ⌘ ↑`：將目前行往上移。

這兩組快捷鍵主要用於調整 Markdown 清單與段落順序。

## 設定檔位置

```text
.obsidian/hotkeys.json
```

修改快捷鍵後，應重新檢查是否與外掛快捷鍵衝突；目前設定檔沒有另外登錄 Templater、QuickAdd、Calendar 或 Tasks 的自訂快捷鍵。

## 如何新增快捷鍵

1. 開啟 Obsidian 設定。
2. 進入 **Hotkeys**。
3. 搜尋指令名稱。
4. 點選加號並按下新的組合鍵。
5. 儲存後回到本頁，確認 `.obsidian/hotkeys.json` 與文件一致。

## 相關文章

- [[my Obsidian]] - 個人 vault 配置
- [[Obsidian Daily Notes]] - 日記與模板
- [[Obsidian Plugins Overview]] - 外掛啟用狀況
