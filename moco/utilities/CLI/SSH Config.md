---
title: SSH key & config
description: SSH key & config
tags:
  - CLI
  - Git
sidebar_position: 50
hide_table_of_contents: true
date_created: 2023-01-02T09:31:07.000Z
image: "https://i.imgur.com/mErPwqL.png"
slug: /utilities/cli/ssh-config/
---

# SSH 配置與金鑰管理

SSH 配置檔案可以大幅簡化 SSH 連線指令，提升開發效率，特別適合管理多個伺服器和 Git 帳號。

## SSH Config 基礎

### 配置檔案位置

```bash
# 使用者配置檔案
~/.ssh/config

# 系統全域配置檔案
/etc/ssh/ssh_config
```

### 基本語法

```ssh_config
Host alias-name                          # 用來連線的 alias 名稱
    HostName server.name                 # host domain 或 ip
    Port 22                              # SSH 連接埠 (預設 22)
    User username                        # 登入使用者名稱
    IdentitiesOnly yes                   # 只使用指定的金鑰
    IdentityFile ~/.ssh/private_key      # 指定私鑰路徑
    ForwardX11 yes                       # 啟用 X11 轉發 (GUI 應用)
    ServerAliveInterval 60               # 保持連線間隔
    ServerAliveCountMax 3                # 最大重試次數
```

### 連線簡化效果

```bash
# 原始複雜指令
ssh user@hostname.domain.name -p 2222 -i ~/.ssh/custom_key

# 簡化後指令
ssh alias-name
```

## 實用配置範例

### 基本伺服器配置

```ssh_config
# 開發伺服器
Host dev-server
    HostName dev.example.com
    User developer
    Port 2222
    IdentityFile ~/.ssh/dev_server_key

# 生產伺服器
Host prod-server
    HostName prod.example.com
    User admin
    IdentityFile ~/.ssh/prod_server_key
    StrictHostKeyChecking yes
```

### 跳板機配置

```ssh_config
# 跳板機
Host bastion
    HostName bastion.company.com
    User jump-user
    IdentityFile ~/.ssh/bastion_key

# 透過跳板機連接內網伺服器
Host internal-server
    HostName 192.168.1.100
    User admin
    ProxyJump bastion
    IdentityFile ~/.ssh/internal_key
```

### 萬用字元配置

```ssh_config
# 所有 .dev 網域使用相同設定
Host *.dev
    User developer
    IdentityFile ~/.ssh/dev_key
    StrictHostKeyChecking no

# 所有 AWS EC2 實例
Host ec2-*
    User ec2-user
    IdentityFile ~/.ssh/aws_key.pem
    StrictHostKeyChecking no
```

## GitHub 多帳號管理

### 問題背景

透過 CLI 存取 GitHub repository 時，若需要使用不同帳號，GitHub 不允許使用相同的 SSH 金鑰。必須為每個帳號建立獨立的 SSH 金鑰。

### 解決方案

#### 1. 建立多個 SSH 金鑰

```bash
# 個人帳號金鑰
ssh-keygen -t ed25519 -C "personal@email.com" -f ~/.ssh/github_personal

# 工作帳號金鑰
ssh-keygen -t ed25519 -C "work@company.com" -f ~/.ssh/github_work
```

#### 2. 配置 SSH Config

```ssh_config
# 個人 GitHub 帳號
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_personal
    IdentitiesOnly yes

# 工作 GitHub 帳號
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_work
    IdentitiesOnly yes
```

#### 3. 修改 Git Remote URL

```bash
# 個人專案
git remote set-url origin git@github-personal:username/personal-repo.git

# 工作專案
git remote set-url origin git@github-work:company/work-repo.git
```

#### 4. 測試連線

```bash
# 測試個人帳號
ssh -T github-personal

# 測試工作帳號
ssh -T github-work
```

## 進階配置選項

### 安全性設定

```ssh_config
Host secure-server
    HostName secure.example.com
    User admin
    IdentityFile ~/.ssh/secure_key

    # 安全性選項
    StrictHostKeyChecking yes
    VerifyHostKeyDNS yes
    HashKnownHosts yes

    # 加密選項
    Ciphers aes256-gcm@openssh.com,aes128-gcm@openssh.com
    MACs hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com
    KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512
```

### 效能最佳化

```ssh_config
Host fast-server
    HostName fast.example.com
    User speeduser

    # 連線最佳化
    Compression yes
    ServerAliveInterval 60
    ServerAliveCountMax 3
    TCPKeepAlive yes

    # 連線重用
    ControlMaster auto
    ControlPath ~/.ssh/sockets/%r@%h-%p
    ControlPersist 600
```

### 埠轉發設定

```ssh_config
Host tunnel-server
    HostName tunnel.example.com
    User tunneluser

    # 本地埠轉發 (將本地 8080 轉發到遠端 80)
    LocalForward 8080 localhost:80

    # 遠端埠轉發 (將遠端 9000 轉發到本地 3000)
    RemoteForward 9000 localhost:3000

    # 動態埠轉發 (SOCKS 代理)
    DynamicForward 1080
```

## SSH 金鑰管理

### 金鑰類型選擇

```bash
# Ed25519 (推薦，安全且快速)
ssh-keygen -t ed25519 -C "your-email@example.com"

# RSA 4096 位元 (相容性好)
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# ECDSA (較新的橢圓曲線)
ssh-keygen -t ecdsa -b 521 -C "your-email@example.com"
```

### 金鑰安全管理

```bash
# 設定金鑰檔案權限
chmod 600 ~/.ssh/private_key
chmod 644 ~/.ssh/private_key.pub
chmod 700 ~/.ssh

# 使用 ssh-agent 管理金鑰
ssh-add ~/.ssh/private_key

# 列出已載入的金鑰
ssh-add -l

# 移除所有金鑰
ssh-add -D
```

### 金鑰密碼保護

```bash
# 建立有密碼保護的金鑰
ssh-keygen -t ed25519 -C "secure-key@example.com" -f ~/.ssh/secure_key

# 修改現有金鑰密碼
ssh-keygen -p -f ~/.ssh/existing_key

# 移除金鑰密碼
ssh-keygen -p -f ~/.ssh/existing_key -N ""
```

## 實用技巧

### 連線診斷

```bash
# 詳細連線資訊
ssh -v username@hostname

# 更詳細的除錯資訊
ssh -vvv username@hostname

# 測試配置檔案
ssh -F ~/.ssh/config -T git@github.com
```

### 批次操作

```bash
# 在多台伺服器執行相同指令
for host in server1 server2 server3; do
    ssh $host "uptime"
done

# 使用 parallel-ssh
parallel-ssh -h hosts.txt "df -h"
```

### 檔案傳輸最佳化

```ssh_config
Host file-server
    HostName files.example.com
    User fileuser

    # 檔案傳輸最佳化
    Compression yes
    CompressionLevel 6

    # 大檔案傳輸
    ServerAliveInterval 30
    ServerAliveCountMax 6
```

## 安全最佳實踐

### 1. 金鑰管理

- 定期輪換 SSH 金鑰
- 使用強密碼保護私鑰
- 不同服務使用不同金鑰
- 備份重要金鑰

### 2. 配置安全

```ssh_config
# 全域安全設定
Host *
    # 禁用不安全的認證方式
    PasswordAuthentication no
    ChallengeResponseAuthentication no

    # 使用安全的加密演算法
    Ciphers aes256-gcm@openssh.com,aes128-gcm@openssh.com

    # 嚴格主機金鑰檢查
    StrictHostKeyChecking ask

    # 雜湊已知主機
    HashKnownHosts yes
```

### 3. 監控與稽核

```bash
# 檢查 SSH 連線日誌
sudo tail -f /var/log/auth.log | grep ssh

# 檢查失敗的登入嘗試
sudo grep "Failed password" /var/log/auth.log

# 檢查成功的登入
sudo grep "Accepted" /var/log/auth.log
```

## 疑難排解

### 常見問題

```bash
# 權限問題
chmod 700 ~/.ssh
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/id_*
chmod 644 ~/.ssh/id_*.pub

# 清除已知主機
ssh-keygen -R hostname

# 重新產生主機金鑰
sudo ssh-keygen -A
```

### 連線問題診斷

```bash
# 檢查 SSH 服務狀態
sudo systemctl status ssh

# 檢查防火牆設定
sudo ufw status
sudo iptables -L

# 檢查 DNS 解析
nslookup hostname
dig hostname
```

## See Also

- [[direnv gitconfig]] - 結合 direnv 的 Git 配置管理
- [[Awesome CLI]] - 現代化 CLI 工具集合
- [SSH Config 官方文檔](https://man.openbsd.org/ssh_config)
- [GitHub SSH 設定指南](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## See Also

- [增進 SSH 使用效率 - ssh_config · 完全用 GNU/Linux 工作](https://chusiang.gitbooks.io/working-on-gnu-linux/content/20.ssh_config.html)
- [How to setup SSH config ：使用 SSH 設定檔簡化指令與連線網址 | by awonwon | 浦島太郎的水族缸 | Medium](https://medium.com/%E6%B5%A6%E5%B3%B6%E5%A4%AA%E9%83%8E%E7%9A%84%E6%B0%B4%E6%97%8F%E7%BC%B8/how-to-setup-ssh-config-%E4%BD%BF%E7%94%A8-ssh-%E8%A8%AD%E5%AE%9A%E6%AA%94-74ad46f99818)
