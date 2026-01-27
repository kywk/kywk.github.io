---
title: Zed usage note
description: Zed usage note
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Utilities
  - Zed
hide_table_of_contents: true
date_created: 2024-08-25T00:00:00.000Z
date_updated: 2024-08-25T00:00:00.000Z
slug: /utilities/zed-usage-note/
---

# [Zed] 使用與設定筆記

Zed 是由 Atom 原團隊開發的現代程式碼編輯器，專注於效能和協作功能。

## 核心特色

- ⚡ **極致效能** - Rust 編寫，GPU 加速渲染
- 🤝 **即時協作** - 內建多人協作編輯功能
- 🎯 **簡潔設計** - 最小化 UI，專注於程式碼
- 🔧 **智能補全** - 內建 LSP 支援和 AI 輔助
- 🌍 **跨平台** - 支援 macOS、Linux 和 Windows

## Setting

### 基本配置

```json
// ~/.config/zed/settings.json
{
  "theme": "One Dark",
  "buffer_font_family": "JetBrains Mono",
  "buffer_font_size": 14,
  "ui_font_size": 16,
  "tab_size": 2,
  "soft_wrap": "editor_width",
  "show_whitespaces": "selection",
  "relative_line_numbers": true
}
```

### 語言特定設定

```json
{
  "languages": {
    "JavaScript": {
      "tab_size": 2,
      "hard_tabs": false
    },
    "Python": {
      "tab_size": 4,
      "format_on_save": "on"
    },
    "Markdown": {
      "soft_wrap": "preferred_line_length",
      "preferred_line_length": 80
    }
  }
}
```

### 快速鍵配置

```json
// ~/.config/zed/keymap.json
[
  {
    "bindings": {
      "cmd-t": "file_finder::Toggle",
      "cmd-shift-p": "command_palette::Toggle",
      "cmd-/": "editor::ToggleComments",
      "cmd-d": "editor::SelectNext",
      "cmd-shift-l": "editor::SelectAllMatches"
    }
  }
]
```

## 實用功能

### 多游標編輯

- `Cmd+D` - 選取下一個相同文字
- `Cmd+Shift+L` - 選取所有相同文字
- `Alt+Click` - 添加游標

### 檔案導航

- `Cmd+T` - 快速開啟檔案
- `Cmd+Shift+T` - 重新開啟關閉的檔案
- `Cmd+P` - 命令面板

### 協作功能

```bash
# 建立協作房間
zed --collaborate

# 加入協作房間
zed --join <room-id>
```

## 擴充功能

### 推薦擴充

- **Vim Mode** - Vim 鍵位支援
- **Git Integration** - Git 狀態顯示
- **Language Servers** - 各語言 LSP 支援
- **Themes** - 額外主題包

### 安裝擴充

```bash
# 透過命令面板安裝
# Cmd+Shift+P -> "Extensions: Install"
```

## 效能最佳化

### 大型專案設定

```json
{
  "file_scan_exclusions": [
    "**/node_modules",
    "**/.git",
    "**/target",
    "**/build"
  ],
  "git": {
    "git_gutter": "tracked_files"
  }
}
```

## TODOs

- [ ] 深入研究 AI 輔助功能
- [ ] 測試大型 monorepo 專案效能
- [ ] 評估取代 VSCode 的可行性
- [ ] 建立團隊協作工作流程
- [ ] 自訂主題和配色方案
