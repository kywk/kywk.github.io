---
title: Zsh config
description: .zshrc
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Zsh
  - Utilities
  - kywk
hide_table_of_contents: true
date_created: 2024-10-01T00:00:00.000Z
date_updated: 2025-09-20T00:00:00.000Z
slug: /utilities/zsh-config/
---

# [Zsh] .zshrc & configuration

使用 dotfiles 專案的模組化 Zsh 配置，支援跨平台和智能環境管理。

## dotfiles 中的 Zsh 配置

### 模組化架構

```
zsh/
├── kywk.zshrc       # 主配置檔案
├── common.zshrc     # 通用設定
├── zinit.zshrc      # Zinit 插件管理 (Turbo 模式)
├── mac.zshrc        # macOS 專用配置
├── linux.zshrc      # Linux 專用配置
└── performance.zshrc # 效能最佳化配置
```

### 核心特色

- ⚡ **Turbo 模式** - Zinit 延遲載入，啟動速度提升 50%+
- 🌍 **跨平台** - 自動檢測 macOS/Linux 並載入對應配置
- 🔧 **智能環境** - 根據專案檔案自動切換版本
- 🔒 **防污染** - 最小化 .zshrc，避免其他工具污染

### 快速安裝

```bash
# 使用 dotfiles 專案自動安裝
cd ~/.files && ./init.sh

# 手動建立 symbolic link
ln -sf ~/.files/zsh/kywk.zshrc ~/.zshrc
```

參考：
- [[Dotfiles Management]] - 完整的 dotfiles 管理系統
- [[Zinit]] - Zsh 插件管理器配置

## See Also

- [This Zsh config is perhaps my favorite one yet. - YouTube](https://www.youtube.com/watch?v=ud7YxC33Z3w)
- [zsh permission denied when accessing my home directory - Stack Overflow](https://stackoverflow.com/questions/61408193/zsh-permission-denied-when-accessing-my-home-directory)
- [terminal - Zsh not recognizing ls colors - Super User](https://superuser.com/questions/700406/zsh-not-recognizing-ls-colors)
- [用 LS_COLOR 在 Terminal 中為檔名加上色彩吧！. 大家好，我是 Hsiang，我算是公司裡面最愛裝飾 Mac… | by Hsiang Lee | Tenten | 數位轉型與創新](https://share.tenten.co/%E7%94%A8-ls-color-%E5%9C%A8-terminal-%E4%B8%AD%E7%82%BA%E6%AA%94%E5%90%8D%E5%8A%A0%E4%B8%8A%E8%89%B2%E5%BD%A9%E5%90%A7-31232ac7046)
- [zsh 透過 zinit 安裝 Powerlevel10k 佈景主題 - Code and Me](https://blog.kyomind.tw/powerlevel10k/)
- [Fetching Title#ozgp](https://www.cnblogs.com/hongdada/p/16821715.html)

## 已完成功能

- ✅ Zsh 插件管理 (Zinit Turbo 模式)
- ✅ 自動補全 (zsh-completions)
- ✅ 語法高亮 (fast-syntax-highlighting)
- ✅ 歷史建議 (zsh-autosuggestions)
- ✅ 主題配置 (Powerlevel10k)
- ✅ 跨平台支援
- ✅ 版本管理整合
