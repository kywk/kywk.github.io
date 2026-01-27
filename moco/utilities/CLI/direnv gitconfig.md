---
title: direnv + gitconfig
description: direnv + gitconfig
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - CLI
sidebar_position: 10
hide_table_of_contents: false
date_created: 2025-06-06T00:00:00.000Z
date_updated: 2025-06-06T00:00:00.000Z
slug: /utilities/cli/direnv-gitconfig/
---

# direnv + gitconfig

> 工作上遇到同一個 Host (如 GitHub) 的不同專案, 需搭配不同 ssh key, 過去會修改 `.git/config` 的 remote host 名字, 並搭配 `.ssh/config` 的設定. 
> 在了解 direnv 和 gitconfig 的過程, 發覺還有更好的作法...

使用 `direnv` 搭配每個專案自己的 `.gitconfig`，透過 `core.sshCommand` 來自訂專案使用的 SSH 設定， **無需 alias `ssh` 或全局改動**。

---

## ✅ 方法總結：`direnv` + `GIT_CONFIG_GLOBAL` + `sshCommand`

1. **為每個專案建立自己的 `.gitconfig`**：

```ini
[user]
  name = Alice ProjectA
  email = alice@project-a.com

[core]
  sshCommand = ssh -F ~/.ssh/config.project-a
```

2. **在該專案目錄放 `.envrc`**：

```bash
export GIT_CONFIG_GLOBAL=$PWD/.gitconfig
```

3. **啟用 direnv**：

```bash
direnv allow
```

這樣當你進入該目錄時：

- Git 會使用該目錄的 `.gitconfig`
- `.gitconfig` 中的 `core.sshCommand` 指定了對應的 SSH config 檔案
- SSH 的 IdentityFile 就根據這個檔案走

---

## 🔍 為什麼這做法很乾淨？

- 不動用全域 `.ssh/config`（可保留單純）
- 不需要修改 `.zshrc` 或 `alias ssh=...`
- 所有設定留在專案中，更可維護 & 可攜

---

## 🧪 實際效果示例

```bash
# 進入 ~/work/project-a/
$ git clone git@github.com:your-org/project-a.git
# => 使用 ~/.ssh/config.project-a 中設定的私鑰自動連接
```

---

## 🛠️ 延伸技巧（可選）

如果你還想要「同時動態切換 gitconfig + node + 環境變數」，可以這樣寫 `.envrc`：

```bash
use node 20
export GIT_CONFIG_GLOBAL=$PWD/.gitconfig
export SSH_AUTH_SOCK="$XDG_RUNTIME_DIR/ssh-agent.socket"
```

---

## See Also
- [How I configure my Git identities \| Hacker News](https://news.ycombinator.com/item?id=42233524)
	- [Git 的 hasconfig:remote.\*.url: – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2024/11/25/12100/git-的-hasconfigremote-url/)

_Assisted by ChatGPT_
