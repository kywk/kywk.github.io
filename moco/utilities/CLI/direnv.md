---
title: direnv
description: direnv
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - CLI
sidebar_position: 10
hide_table_of_contents: false
date_created: 2025-06-06
date_updated: 2025-06-06
---
# direnv

`direnv` 是一個強大的 CLI 工具，專門用來在進入某個目錄時自動載入（或移除）該目錄下定義的環境變數。這在開發多個專案、使用多種語言與工具時非常有用，可以讓每個專案擁有獨立的環境設定，**不需要手動切換或覆蓋環境變數**。

---

## 🌱 direnv 是什麼？

簡單說，`direnv` 會自動載入並執行每個資料夾中的 `.envrc` 檔案，裡面可以設定環境變數或執行 shell 命令。當你離開這個資料夾時，它會「卸載」這些設定，回到原始環境。

---

## 🔧 安裝 direnv

### macOS 安裝：

```bash
brew install direnv
```

### 加入 shell（以 zsh 為例）：

在你的 `~/.zshrc` 加入：

```zsh
eval "$(direnv hook zsh)"
```

重新啟動 shell 或執行 `source ~/.zshrc`。

---

## 📁 使用情境範例

### 📦 1. **每個專案使用不同的 Python/Node/Go 版本**

假設你在某個專案使用 Python 3.11，另一個使用 Python 3.8：

```bash
# 在每個專案資料夾中新增 .envrc：
echo 'layout python python3.11' > .envrc
direnv allow
```

或者使用 pyenv 管理：

```bash
echo 'export PYENV_VERSION=3.11.3' > .envrc
direnv allow
```

---

### ☁️ 2. **為每個專案設定獨立的 API Key、環境變數**

```bash
# .envrc
export AWS_ACCESS_KEY_ID="xxx"
export AWS_SECRET_ACCESS_KEY="yyy"
export DATABASE_URL="postgres://user:pass@localhost:5432/db"
```

這樣你只要 `cd` 到該資料夾，變數就會自動載入；離開就會清除。

---

### 🧪 3. **自動啟動虛擬環境 / docker / 開發服務**

```bash
# .envrc
layout python
poetry shell

# 或者
docker compose up -d
```

這樣當你 `cd` 進專案目錄時，開發環境就自動啟動，非常適合微服務開發。

---

### 🪄 4. **整合 Node.js（透過 fnm、nvm）**

```bash
# .envrc
use node 18
```

> 需搭配 `fnm` 或 `asdf`，這些工具可自動在專案中切換 node 版本。

---

## ⚠️ 安全性提醒

當你第一次在某個目錄加 `.envrc`，你必須明確執行：

```bash
direnv allow
```

這是為了安全，防止惡意 `.envrc` 自動執行。

---

## ✅ 總結

| 使用情境                              | 為什麼用 direnv                                   |
| ------------------------------------- | ------------------------------------------------- |
| 多專案、多環境開發                    | 自動切換環境變數，避免污染全域設定                |
| 使用多種版本管理工具（如 pyenv, nvm） | 自動套用專案中指定的版本                          |
| 團隊專案需一致開發環境設定            | `.envrc` 可版控（建議搭配 `.envrc.local` 管機密） |
| 減少 shell 指令疲勞                   | 不再手動 `source` 環境檔或啟動 venv               |

---

_Assisted by ChatGPT_
