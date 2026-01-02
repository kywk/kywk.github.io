---
title: Awesome CLI
tags:
  - Awesome
  - CLI
sidebar_position: 0
slug: /utilities/cli/awesome-cli/
---

# Awesome CLI Resources

現代化 CLI 工具集合，取代傳統 Unix 工具，已整合到 dotfiles 專案中。

## 系統監控和檔案管理

### 現代化替代品

- **btop** - 取代 htop，更美觀的系統監控
- **eza** - 取代 ls，支援彩色和圖示
- **bat** - 取代 cat，語法高亮和行號
- **ripgrep** - 取代 grep，更快的文字搜尋
- **fd** - 取代 find，更直覺的檔案搜尋
- [[zoxide]] - 取代 cd，智能目錄跳轉

## 互動式工具

- [[fzf]] - 模糊搜尋器，支援檔案、歷史、程序搜尋
- **direnv** - 目錄環境變數管理
- **tldr** - 簡化版 man pages
- **jq** - JSON 處理工具

## Git 工具

- **tig** - 文字界面 Git 瀏覽器
- **gitui** - Rust 編寫的 Git TUI
- **git-delta** - Git diff 輸出美化

## 安裝方式

### 使用 dotfiles 一鍵安裝

```bash
# 自動安裝所有現代 CLI 工具
cd ~/.files && ./bin/setup-devenv.sh
```

### 手動安裝

```bash
# 系統監控和檔案管理
brew install btop eza bat ripgrep fd zoxide

# 互動式工具
brew install fzf direnv tldr jq

# Git 工具
brew install tig gitui git-delta
```

## Tips & Trick

- [wc -l 在 Linux 與 macOS 上輸出的格式不同 – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2024/10/29/12051/wc-l-%e5%9c%a8-linux-%e8%88%87-macos-%e4%b8%8a%e8%bc%b8%e5%87%ba%e7%9a%84%e6%a0%bc%e5%bc%8f%e4%b8%8d%e5%90%8c/)

## 相關資源

- [[Dotfiles Management]] - 完整的 dotfiles 管理系統
- [[Zinit]] - Zsh 插件管理器
- [[Mac DevEnv Setup]] - macOS 開發環境建構

## See Also

- [8 Command Line Tools that will Change Your Terminal Experience - YouTube](https://www.youtube.com/watch?v=CbMbGV9GT8I&t=10s)
- [Modern Unix - GitHub](https://github.com/ibraheemdev/modern-unix)
- [Awesome CLI Apps - GitHub](https://github.com/agarrharr/awesome-cli-apps)

<!--

-->
