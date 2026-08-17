---
title: Let's Volta
description: Volta Get Started
tags:
  - Node.js
  - JavaScript
sidebar_position: 60
hide_table_of_contents: true
date_created: 2025-05-30T00:00:00.000Z
date_updated: 2025-05-30T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

# [Node.js] Volta Get Started

安裝與設定 Volta 十分簡單，它是為現代 Node.js 開發而設計的「零配置」工具。以下是 **Volta 安裝與設定的完整指南**，涵蓋 macOS、Linux、Windows，以及常見用法。

---

## 🚀 Volta 安裝步驟

### 🔹 macOS / Linux

打開終端機，執行以下指令：

```bash
curl https://get.volta.sh | bash
```

或使用 `wget`：

```bash
wget https://get.volta.sh -O - | bash
```

安裝完後，重新打開終端機，或手動加載 shell 設定檔（例如 `.bashrc`、`.zshrc`）中的 Volta 初始化腳本（安裝腳本已自動加入）：

```bash
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
```

Volta 自動會幫你將 node、npm 等工具裝在 `~/.volta` 下。

### 🧪 驗證 Volta 是否正常工作

執行以下指令：

```bash
volta --version         # 應顯示 volta 的版本
volta install node      # 安裝 Node.js
node -v                 # 顯示 node 版本
```

現在已可以使用 Volta 安裝和管理 `node`, `npm`, `yarn`，以及鎖定特定版本於專案中。

### zinit

`Volta` 和 `zinit`（Zsh 的高性能插件管理器）可以很好地搭配，只要你確保 Volta 的環境變數在 `zinit` 載入完成後正確設置即可。以下是最建議的整合方式與注意事項。

- **Volta 不需要 zinit 載入它作為 plugin**，它是安裝在 `$HOME/.volta` 中的獨立 binary manager。
- **你需要做的只是：在 zinit 初始化完成後設定 `VOLTA_HOME` 與 `PATH`。**

```zsh
# --- zinit 初始化區塊 ---
# 建議使用官方推薦初始化方式
if [[ ! -f ~/.zinit/bin/zinit.zsh ]]; then
  mkdir -p ~/.zinit
  git clone https://github.com/zdharma-continuum/zinit.git ~/.zinit/bin
fi
source ~/.zinit/bin/zinit.zsh

# 載入你常用的 zinit plugins...
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-syntax-highlighting

# --- Volta 環境設定（放在 zinit 後面）---
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
```

---

## ⚙️ 基本使用

### ✅ 安裝 Node.js

```bash
volta install node
```

這會安裝最新穩定版 Node.js 並讓它成為全域預設版本。

### ✅ 安裝指定版本

```bash
volta install node@18
```

### ✅ 固定專案使用版本（在專案根目錄執行）

```bash
volta pin node@18
```

這會在 `package.json` 自動加入：

```json
"volta": {
  "node": "18.0.0"
}
```

同樣適用於 `npm`, `yarn`, `pnpm`：

```bash
volta install yarn
volta pin yarn@1.22.19
```

### ✅ 自動版本切換（開箱即用）

Volta 會根據每個專案的 `package.json` 或 `.node-version` 自動切換對應 Node.js 版本，不需額外設定。

### 🔧 附加技巧：讓 `zinit` 幫你載入 `.node-version`（可選）

雖然 Volta 本身已支援 `.node-version` 自動切換，但若你使用 `direnv` + `zinit` 搭配開發專案，也可以這樣整合：

```zsh
# zinit 載入 direnv plugin（可選）
zinit light direnv/direnv
eval "$(direnv hook zsh)"
```

這樣你進入專案資料夾時，Volta 自動使用 `.node-version` 或 `package.json` 指定的 node 版本。

---

## 🧪 常見指令速查

| 功能                 | 指令                                      |
| -------------------- | ----------------------------------------- |
| 安裝 Node.js         | `volta install node`                      |
| 安裝特定版本         | `volta install node@18.16.0`              |
| 安裝 npm/yarn        | `volta install npm`, `volta install yarn` |
| 設定預設版本（全域） | `volta install node@18`                   |
| 釘選版本（專案內）   | `volta pin node@18`                       |
| 移除版本             | `volta uninstall node`                    |
| 查看已安裝項目       | `volta list`                              |
| 查看目前使用版本     | `node -v`、`npm -v`                       |

---

## 📦 小技巧

- 若你有 `.node-version` 或 `.nvmrc`，Volta 會優先使用這些版本資訊。
- 支援 `volta install <binary>`：如 `eslint`, `typescript`，Volta 會幫你管理全域 CLI 工具並鎖定版本，保證專案一致性。
- 建議將 `node_modules/.bin` 移出 `PATH`，以避免和 Volta 的 shims 衝突。

---

## ❓Q\&A

**Q: Volta 和 nvm 有衝突嗎？**
A: 有，建議不要同時使用。安裝 Volta 時可移除 `.bashrc/.zshrc` 中與 nvm 有關的設定。

**Q: Volta 支援 monorepo 嗎？**
A: 是的，會根據每個專案資料夾自動切換版本。

---

## See Also

- [Volta - The Hassle-Free JavaScript Tool Manager](https://volta.sh/)
- [I’ve switched from NVM to Volta. This is Why - DEV Community](https://dev.to/pierre/switch-from-nvm-to-volta-384a)

_assisted by ChatGPT_
