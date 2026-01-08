---
title: homebrew-bundle
description: homebrew-bundle
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - CLI
  - homebrew
sidebar_position: 5
date_created: 2024-12-22T00:00:00.000Z
date_updated: 2024-12-22T00:00:00.000Z
slug: /utilities/cli/homebrew-bundle/
---

---
title: Homebrew Bundle
description: homebrew-bundle
image: >
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - CLI
  - homebrew
sidebar_position: 5
date_created: 2024-12-22T00:00:00.000Z
date_updated: 2024-12-22T00:00:00.000Z
slug: /utilities/cli/homebrew-bundle/
---

# Homebrew Bundle

> [homebrew-bundle](https://github.com/Homebrew/homebrew-bundle) 是 Homebrew 的官方擴充套件，提供類似 package.json 的套件管理功能。

Homebrew Bundle 讓你可以將所有需要的套件定義在 `Brewfile` 中，實現一鍵安裝和環境同步。特別適合新機器設定和團隊開發環境標準化。

## Requirement

- [Homebrew](https://github.com/Homebrew/brew) (on macOS or [Linux](https://docs.brew.sh/Homebrew-on-Linux)) for installing dependencies.
- [Homebrew Cask](https://github.com/Homebrew/homebrew-cask) is optional and used for installing Mac applications.
- [mas-cli](https://github.com/mas-cli/mas) is optional and used for installing Mac App Store applications.
- [Whalebrew](https://github.com/whalebrew/whalebrew) is optional and used for installing Whalebrew images.
- [Visual Studio Code](https://code.visualstudio.com/) is optional and used for installing Visual Studio Code extensions.

## 備份方式

```
brew bundle dump --describe --force --file="~/Desktop/Brewfile"
```

- --describe：为列表中的命令行工具加上说明性文字。
- --force：直接覆盖之前生成的Brewfile文件。如果没有该参数，则询问你是否覆盖。
- --file="~/Desktop/Brewfile"：在指定位置生成文件。如果没有该参数，则在当前目录生成 Brewfile 文件。

## 還原

```
brew bundle --file="~/Desktop/Brewfile"
```

## See Also

- [macOS使用homebrew-bundle优雅的备份和恢复软件列表 \| HelloDog](https://wsgzao.github.io/post/homebrew-bundle/)
