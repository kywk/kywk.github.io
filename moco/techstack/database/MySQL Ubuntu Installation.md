---
title: MySQL Ubuntu Installation
description: Ubuntu 20.04/22.04 LTS 安裝 MySQL Server 完整指南
tags:
  - Infrastructure
  - Linux/Ubuntu
  - Database
  - SQL/MySQL
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
sidebar_position: 30
date_created: 2022-09-20T16:00:00.000Z
date_updated: 2025-01-13T00:00:00.000Z
slug: /techstack/database/mysql-ubuntu-installation/
---

# MySQL Ubuntu Installation

Ubuntu 20.04/22.04 LTS 安裝 MySQL Server 完整指南，包含安全性設定與疑難排解。

## 前言

雖然現代開發環境多使用 Docker 運行 MySQL，但在某些情況下仍需要在主機或 VM 上直接安裝 MySQL。本文提供完整的安裝與設定流程。

## 系統需求

- Ubuntu 20.04 LTS 或 22.04 LTS
- sudo 權限
- 至少 1GB 可用磁碟空間
- 穩定的網路連線

## 安裝 MySQL

### 安裝步驟

除非要安裝其他社群維護 (Ex: MariaDB) 或特別版本的 MySQL (Ex: AliSQL)，否則在 Ubuntu 上安裝 MySQL，直接透過 apt 安裝即可。

```bash
# 更新套件清單並安裝 MySQL
sudo apt update && sudo apt install mysql-server
```

當提示安裝 MySQL 套件時，按 `y` `ENTER` 確定安裝。

### 確認服務狀態

MySQL 安裝完成後，檢查 MySQL 服務是否正在運行。

```bash
sudo systemctl status mysql
# 或使用舊版指令
sudo service mysql status
```

服務正常運行時，會顯示綠色的 `Active (running)` 狀態：

```txt
● mysql.service - MySQL Community Server
     Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2021-09-08 07:16:49 UTC; 18s ago
   Main PID: 32713 (mysqld)
     Status: "Server is operational"
      Tasks: 38 (limit: 4705)
     Memory: 356.6M
     CGroup: /system.slice/mysql.service
             └─32713 /usr/sbin/mysqld
Sep 08 07:16:48 ubuntu-20 systemd[1]: Starting MySQL Community Server...
Sep 08 07:16:49 ubuntu-20 systemd[1]: Started MySQL Community Server.
```

## 安全性設定

`mysql_secure_installation` 是 MySQL 官方提供的安全性設定工具，建議在生產環境中使用。

```bash
sudo mysql_secure_installation
```

如果已經設置 root 密碼，會提示輸入密碼。

### 1. 驗證密碼外掛程式

```
Securing the MySQL server deployment.
Connecting to MySQL using a blank password.
VALIDATE PASSWORD PLUGIN can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD plugin?
Press y|Y for Yes, any other key for No:
```

是否設定驗證密碼外掛程式 (VALIDATE PASSWORD PLUGIN)。
除非想要強制執行嚴格的密碼規則，否則不建議啟用。

**建議**: 直接按 `ENTER` 跳過。

### 2. root 密碼設定

如果沒有設置過 root 密碼，會要求設置密碼：

```
Please set the password for root here.
New password:
Re-enter new password:
```

如果已有 root 密碼，會詢問是否更改密碼。

```
Using existing password for root.
Change the password for root ? ((Press y|Y for Yes, any other key for No) :
```

#### 疑難排解: 無法設定 root 密碼

因版本預設配置不同，設定 root 密碼時可能會出現錯誤：

```
... Failed! Error: SET PASSWORD has no significance for user 'root'@'localhost' 
as the authentication method used doesn't store authentication data in the MySQL server. 
Please consider using ALTER USER instead if you want to change authentication parameters.
```

**解決方法**:
1. 中斷 `mysql_secure_installation` 流程
2. 直接透過 MySQL client 設定 root 密碼
3. 重新執行 `mysql_secure_installation`

```bash
# 進入 MySQL
sudo mysql

# 設定 root 密碼
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<your_strong_password>';
FLUSH PRIVILEGES;
EXIT;
```

### 3. 移除匿名使用者

```
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) :
```

**建議**: `y` `ENTER` 移除匿名使用者。

### 4. 禁止遠端 root 登入

```
Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) :
```

**建議**: `y` `ENTER` 禁止遠端 root 登入，可防止機器人和駭客嘗試猜測 root 密碼。

### 5. 移除測試資料庫

```
By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.

Remove test database and access to it? (Press y|Y for Yes, any other key for No) :
```

**建議**: `y` `ENTER` 移除測試資料庫。

### 6. 重新載入權限表

```
Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) :
```

**建議**: `y` `ENTER` 重新載入權限表 (Privilege Tables)。

## 驗證安裝

完成安全性設定後，測試 MySQL 是否正常運作。

### 使用 mysqladmin 檢查版本

```bash
sudo mysqladmin -p -u root version
```

mysqladmin  Ver 8.0.26-0ubuntu0.20.04.2 for Linux on x86_64 ((Ubuntu))
Copyright (c) 2000, 2021, Oracle and/or its affiliates.
Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.
Server version          8.0.26-0ubuntu0.20.04.2
Protocol version        10
Connection              Localhost via UNIX socket
UNIX socket             /var/run/mysqld/mysqld.sock
Uptime:                 6 min 23 sec
Threads: 2  Questions: 11  Slow queries: 0  Opens: 130  Flush tables: 3  Open tables: 49  Queries per second avg: 0.028
```

出現版本資訊後，表示已經成功在 Ubuntu 上安裝和配置了 MySQL。

### 登入 MySQL

```bash
# 使用 root 使用者登入
mysql -u root -p

# 或使用 sudo
sudo mysql
```

### 基本測試指令

```sql
-- 查看資料庫清單
SHOW DATABASES;

-- 查看使用者清單
SELECT User, Host FROM mysql.user;

-- 離開 MySQL
EXIT;
```

## 後續設定

服務安裝完成後，參考 [[MySQL Setup]] 繼續進行：
- 新增資料庫使用者
- 資料庫建立與權限設定
- 效能調校與優化

## See Also

### 官方文件
- [MySQL APT Repository](https://dev.mysql.com/downloads/repo/apt/)
- [MySQL Installation Guide](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/)

### 中文教學
- [[教學][Ubuntu 架站] 在 Ubuntu 20.04 上安裝 MySQL Server | 優程式](https://ui-code.com/archives/293)

### 疑難排解
- [MySQL installation on Ubuntu 20.04 error when using mysql_secure_installation - Stack Overflow](https://stackoverflow.com/questions/72103302/mysql-installation-on-ubuntu-20-04-error-when-using-mysql-secure-installation)

### 相關文章
- [[MySQL Setup]] - MySQL 基本設定
- [[Awesome MySQL]] - MySQL 資源整理
- [[Awesome Database GUI Client]] - GUI 管理工具

### 替代方案
- [MariaDB Foundation - MariaDB.org](https://mariadb.org)
- [alibaba/AliSQL: AliSQL is a MySQL branch originated from Alibaba Group](https://github.com/alibaba/AliSQL)
