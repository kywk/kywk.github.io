---
title: SSH key & config
description: SSH key & config
tags:
  - CLI
  - Git
sidebar_position: 50
hide_table_of_contents: true
date_created: 2023-01-02T09:31:07.000Z
image: 'https://i.imgur.com/mErPwqL.png'
slug: /utilities/cli/ssh-config/
---

# [SSH] .ssh/config & id_rsa

## .ssh/config

SSH config 可以簡化 SSH 連線時的指令, 除了 CLI 下使用方便外,
CI/CD 配合適當的 config 也可以大幅簡化管理的複雜度.

SSH

```ssh_config
Host alias-name                          # 用來連線的 alias 名稱
    HostName server.name                 # host domain 或 ip
    Port port-number                     # host 的 SSH port
    IdentitiesOnly yes                   # 使用指定的 key
    IdentityFile ~/.ssh/private_ssh_file # 指定 pem 或 pub 的 key 路徑
    User username-on-remote-machine      # (選填)登入 SSH 的 username，
                                         #  只連 git 的話，可以不必要
    ForwardX11 yes                       # (選填) 啟用回傳 GUI
```

設定好後, ssh 指令可以由

```bash
ssh user@hostname.domain.name -P port -i path-to-key
```

簡化為

```bash
ssh alias-name
```

## ssh key

...TBD...

## GitHub SSH key

透過 CLI 存取個人 GitHub repository 時常會設定 SSH Keys.
而若要用兩個不同使用者身分存取專案, GitHub 不允許使用同一把 Key.
必須為個別使用者建立獨立 ssh key 並上傳設定.

這情況下, ssh alias 就變得方便了.

1. 依使用者身分設定對應的 SSH host alias 與 IdentityFile

   ```.ssh/config
   Host kywk.github
       Hostname ssh.github.com
       User git
   	IdentityFile ~/.ssh/kywk_rsa

   Host cow.github
   	Hostname ssh.github.com
       User git
   	IdentityFile ~/.ssh/cow_rsa
   ```

   如此一來, 相同主機透過不同 alias 可以指定不同登入帳號及對應的 Key, 使用上相當便利.
   如: `ssh kywk.github` 就是使用 kywk_rsa 這把 key 來登入 ssh.github.com.

2. 不同的 git repository 中, 對應的 remote 修改為

   ```.git/config
   [remote "origin"]
   	url = git@kywk.github:kywk/kywk.github.io.git
   	fetch = +refs/heads/*:refs/remotes/origin/*
   ```

   ```.git/config
   [remote "origin"]
   	url = git@cow.github:cow/sandbox.git
   	fetch = +refs/heads/*:refs/remotes/origin/*
   ```

設置完後, 相同電腦存取不同 Github 帳號的專案, 和一般操作並無太不同.

## See Also

- [增進 SSH 使用效率 - ssh_config · 完全用 GNU/Linux 工作](https://chusiang.gitbooks.io/working-on-gnu-linux/content/20.ssh_config.html)
- [How to setup SSH config ：使用 SSH 設定檔簡化指令與連線網址 | by awonwon | 浦島太郎的水族缸 | Medium](https://medium.com/%E6%B5%A6%E5%B3%B6%E5%A4%AA%E9%83%8E%E7%9A%84%E6%B0%B4%E6%97%8F%E7%BC%B8/how-to-setup-ssh-config-%E4%BD%BF%E7%94%A8-ssh-%E8%A8%AD%E5%AE%9A%E6%AA%94-74ad46f99818)
