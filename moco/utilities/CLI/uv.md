---
title: uv
description: 由 Rust 打造的超高速 Python 套件管理工具
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags: [CLI, Python]
sidebar_position: 10
hide_table_of_contents: true
date_created: 2026-07-26
date_updated: 2026-07-26
slug: /utilities/cli/uv/
---

# uv

## Overview

[uv](https://github.com/astral-sh/uv) 是由 [Astral](https://astral.sh/) 團隊（同時也是 [ruff](https://github.com/astral-sh/ruff) linter 的開發者）以 Rust 打造的 Python 套件與專案管理工具。相較於傳統的 pip，uv 的速度快上 10-100 倍，並且提供了一站式的 Python 開發體驗：套件安裝、虛擬環境管理、Python 版本管理、專案管理、腳本執行等功能一應俱全。

uv 的設計理念是成為 Python 生態系的「Cargo」——一個統一、快速、可靠的工具鏈。

## Install

```bash
# macOS / Linux (推薦)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Homebrew
brew install uv

# pip (不推薦，但可用)
pip install uv
```

安裝完成後可驗證：

```bash
uv --version
```

## Basic Usage

### 虛擬環境管理

```bash
# 建立虛擬環境（預設 .venv 目錄）
uv venv

# 指定 Python 版本建立
uv venv --python 3.13

# 啟用虛擬環境
source .venv/bin/activate
```

### pip 相容模式（Drop-in Replacement）

uv 可直接替代 pip 使用，語法幾乎相同：

```bash
# 安裝套件
uv pip install flask requests

# 從 requirements.txt 安裝
uv pip install -r requirements.txt

# 編譯鎖定版本（類似 pip-compile）
uv pip compile requirements.in -o requirements.txt

# 同步環境
uv pip sync requirements.txt
```

### Python 版本管理

```bash
# 安裝指定版本的 Python
uv python install 3.13

# 列出可用版本
uv python list

# 固定專案使用的 Python 版本
uv python pin 3.12
```

### 腳本執行

```bash
# 直接執行腳本（自動建立臨時環境、安裝依賴）
uv run script.py

# 指定額外依賴執行
uv run --with requests script.py
```

## Project Management

uv 提供完整的專案生命週期管理：

```bash
# 初始化新專案（產生 pyproject.toml）
uv init my-project
cd my-project

# 新增依賴
uv add flask
uv add pytest --dev

# 移除依賴
uv remove flask

# 同步環境（根據 uv.lock 安裝所有依賴）
uv sync

# 執行專案指令
uv run python main.py
uv run pytest
```

### 工具執行（類似 pipx）

```bash
# 全域安裝 CLI 工具
uv tool install ruff
uv tool install black

# 一次性執行（不安裝，類似 npx）
uvx ruff check .
uvx black --check .
```

## Comparison

| 特性 | uv | pip | poetry | pipx | conda |
|------|-----|-----|--------|------|-------|
| 安裝速度 | ⚡ 極快 (Rust) | 慢 | 中等 | 中等 | 慢 |
| 依賴解析 | ✅ 確定性 resolver | ❌ 較弱 | ✅ 完整 | N/A | ✅ 完整 |
| 虛擬環境 | ✅ 內建 | ❌ 需 venv | ✅ 內建 | ✅ 隔離 | ✅ 內建 |
| Lock file | ✅ uv.lock | ❌ 無 | ✅ poetry.lock | N/A | ❌ 無 |
| Python 版本管理 | ✅ | ❌ | ❌ | ❌ | ✅ |
| 資料科學 | 有限 | 有限 | 有限 | N/A | ✅ 最佳 |

- **uv vs pip**：速度快 100 倍，內建確定性 resolver，支援 lock file
- **uv vs poetry**：速度更快、lock 格式更簡潔、額外支援 Python 版本管理
- **uv vs pipx**：`uv tool install` 完全取代 pipx，且 `uvx` 提供一次性執行
- **uv vs conda**：uv 專注於純 Python 套件管理，不處理 C/Fortran 二進位依賴；資料科學重度使用者仍建議 conda

## See Also

- [uv 官方文件](https://docs.astral.sh/uv/)
- [uv GitHub](https://github.com/astral-sh/uv)
- [Astral 官網](https://astral.sh/)
- [ruff - Python Linter](/utilities/cli/ruff/)
