---
title: Docker CLI on macOS
description: docker CLI on macOS
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Docker
  - Mac
sidebar_label: Docker CLI
date_created: 2024-04-18T00:00:00.000Z
date_updated: 2024-05-24T00:00:00.000Z
---

# Docker CLI on macOS

在 macOS 上使用 Docker CLI 而不依賴 Docker Desktop 的完整指南，適合商業環境或希望使用輕量化解決方案的開發者。

## 背景與動機

Docker Inc 宣布 Docker Desktop 商業使用不再免費，對企業開發造成影響。主要替代方案包括：

1. **付費使用** Docker Desktop
2. **改用 Podman** - 開源容器引擎
3. **使用 Docker CLI + Colima** - 本文重點

> 重要提醒：授權變更只影響 Docker Desktop 產品，CLI 介面對所有使用者仍然免費。

### 為什麼選擇 Docker CLI + Colima？

- **成本考量**：完全免費的開源解決方案
- **相容性**：與現有 CI/CD 流程完全相容
- **雲端整合**：多數雲端服務仍提供 Docker 環境
- **輕量化**：比 Docker Desktop 更節省系統資源

## Install docker

macOS 上可以直接用 [homebrew](https://brew.sh) 來安裝 docker.

除了 docker 外, 還需要安裝 docker-credential-helper,
credential helper 可以用 macOS Keychain 來儲存遠端 repo credential,

```bash
brew install docker docker-credential-helper
```

上面指令安裝了 docker cli 命令程式, 安裝完成後可以看到有 docker 指令不會 `command not found`, 但 `docker ps` 仍找不到相關 daemon.

![](https://lh3.googleusercontent.com/pw/AP1GczO-23wgMRr9aSLUDrRmwJl3WFnvX6wEdgaZdsBv_w_fJjHoCDJoe3VQLnMNt9QbxaRsmvFpSSCMxEkZiImMBJzD1IxnZfPA9l3aAgWi7gNqhhvXAmtQpx3xoGIrFeWJv7m0_0GSH-BsHtX4XW-w1wVr_g=w654-h163-s-no-gm?authuser=0)

![](https://lh3.googleusercontent.com/pw/AP1GczPXWIM0IiOuJGrLrs4yzpTdn7mZ0knRgAp-3RmxLzJhqT-3znB1WPwn8dN7eIpiw4hw5b_jSr2U8v8AWZ3LAjj3MeddOSx451abJPZqX0loAhydL0T--CQP74wzfLp5g8tsQk6OxPMmSJ7E3diVrqlTOw=w654-h81-s-no-gm?authuser=0)

## Install colima

真正重要的是提供 contrainer runtime 的服務, macOS 上可選用目前開源且免費的 [Colima](https://github.com/abiosoft/colima)

```bash
brew install colima
```

![](https://lh3.googleusercontent.com/pw/AP1GczOuvsu8P8FfdCYV1dEA5vA5W35wagvPNJe_5XEpB96nvEDNBGr2nHmEJiJj8PaTY9Bhd5PatKAtgt0xMHv5OSf43mm3SptA4qjtvdmQv3ecl9vavn4KdLvlY31NrhLSkFMDepPmkzRfFLqIac02any8Xw=w598-h76-s-no-gm?authuser=0)

從套件相依性可以看到 colima 是以 qemu 核心建構的虛擬框架, 集成許多 open source 專案提供的 container runtime service.

### Using colima

安裝完成後把服務啟動

```bash
colima start
```

第一次啟動時需要下載 qemu 影像檔, 靜待下載安裝即可.

![](https://lh3.googleusercontent.com/pw/AP1GczPOhlqm1L6k2Ksnm5A6_juSnDo8ObrqsgFA9itRQ6YZKlTue0nGRbez2zlSj8kOh_8k_7W2L4KmPZtegc3goI4XWrCOebU50On4T6w2qQDLZ4x8dtINXN6iYwE5NcpIGTqOg8U6vTzN9ByS9AMfmdF3pQ=w1556-h366-s-no-gm?authuser=0)

![](https://lh3.googleusercontent.com/pw/AP1GczPWGOO26EvSiympH0YrQ2CzxTYS4oNdhsvT8zfiD5T_53CoBpYLW7EfZWhEPeNnmbIFPwHeSvS1qgS7fg6uwFfsLQKgUW1GJEJS6uwdlrTvtzB7JRbJZDvjfSILx9zDKydIIeMCyQ1TVg4EOZDudJhzAg=w778-h112-s-no-gm?authuser=0)

服務正常啟動的狀態

![](https://lh3.googleusercontent.com/pw/AP1GczMqTPzYibKw3AYlc_PhV75atKvO6WqTMDsfm6lAa0XhXxQELnvRt2VhaidOLmCM6x-wokfxYk7ZRz38CDJ81H6ZDWGtgsqiCAh3c35YkG9hXtlwnWkHx9EQxtqhAN4dKzMlcdjMAoBvz82cpPGPEMfDNg=w778-h112-s-no-gm?authuser=0)

### colima services

若想讓 colima 服務常駐, 重新開機後能自動啟動, 可利用 `brew services`

```bash
brew services start colima
```

## Docker CLI plugin

### Buildx

[buildx](https://github.com/docker/buildx) is a Docker CLI plugin for extended build capabilities with [BuildKit](https://github.com/moby/buildkit).

1. [Manual download](https://github.com/docker/buildx?tab=readme-ov-file#manual-download) buildx binary from [release](https://github.com/docker/buildx/releases/)
2. Rename the relevant binary to `docker-buildx`
3. Copy it to the destination `$HOME/.docker/cli-plugins`
4. Enjoy it

## See Also

### Colima

> Colima means Containers in [Lima](https://github.com/lima-vm/lima).
> Since Lima is aka Linux on Mac. By transitivity, Colima can also mean Containers on Linux on Mac.

Colima 額外還支援 Kubernetes 基礎建設, 再另找時間好好研究.

### Refs:

- [How to use Docker without Docker Desktop on MacOS 📦 - DEV Community](https://dev.to/elliotalexander/how-to-use-docker-without-docker-desktop-on-macos-217m)
- [How to use Docker without Docker Desktop on MacOS | how.wtf](https://how.wtf/how-to-use-docker-without-docker-desktop-on-macos.html)
