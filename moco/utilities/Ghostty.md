---
title: "Terminal: Ghostty"
description: Ghostty is a fast, feature-rich, and cross-platform terminal emulator that uses platform-native UI and GPU acceleration.
tags:
  - Utility
  - Terminal
hide_table_of_contents: true
date_created: 2025-01-16
date_updated: 2025-01-16
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

# 👻 [Ghostty](https://ghostty.org/) terminal w/ native UI and GPU acceleration.

## Introduction

Ghostty 是由 Mitchell Hashimoto 開發的現代終端模擬器，專注於效能和跨平台支援。主要特色包括：

- **GPU 加速渲染** - 利用 GPU 提供流暢的文字渲染
- **原生 UI** - 在每個平台使用原生 UI 框架
- **高效能** - 針對速度和記憶體使用最佳化
- **跨平台** - 支援 macOS、Linux 和 Windows
- **現代功能** - 支援 Unicode、真彩色、字體連字等

## Config

Ghostty 使用簡潔的配置檔案格式：

```toml
# ~/.config/ghostty/config

# 字體設定
font-family = "JetBrains Mono"
font-size = 14

# 主題配置
theme = "catppuccin-mocha"

# 視窗設定
window-padding-x = 10
window-padding-y = 10

# 效能設定
macos-non-native-fullscreen = true
```

### 主要配置選項

**字體與外觀**：
```toml
font-family = "Fira Code"
font-size = 13
font-feature = ["liga", "calt"]
cursor-style = "block"
```

**色彩主題**：
```toml
# 使用內建主題
theme = "tokyo-night"

# 或自訂色彩
background = "#1a1b26"
foreground = "#c0caf5"
```

### KeyBinding

自訂快速鍵配置：

```toml
# 分頁管理
keybind = "cmd+t=new_tab"
keybind = "cmd+w=close_surface"
keybind = "cmd+shift+left=previous_tab"
keybind = "cmd+shift+right=next_tab"

# 分割視窗
keybind = "cmd+d=new_split:right"
keybind = "cmd+shift+d=new_split:down"

# 字體大小調整
keybind = "cmd+plus=increase_font_size:1"
keybind = "cmd+minus=decrease_font_size:1"
keybind = "cmd+0=reset_font_size"
```

## 安裝與使用

### macOS 安裝

```bash
# 使用 Homebrew
brew install --cask ghostty

# 或下載官方 DMG
# https://ghostty.org/download
```

### 基本使用

1. **啟動** - 從應用程式資料夾或命令列啟動
2. **配置** - 編輯 `~/.config/ghostty/config`
3. **重載** - 配置變更會自動生效

## See Also

- [Ghostty](https://ghostty.org/)
	- [Ghostty 👻 – Mitchell Hashimoto](https://mitchellh.com/ghostty)
	- [GitHub - ghostty-org/ghostty: 👻 Ghostty is a fast, feature-rich, and cross-platform terminal emulator that uses platform-native UI and GPU acceleration.](https://github.com/ghostty-org/ghostty)
- 
