---
title: "Ubuntu Setup"
description: Ubuntu 20.04 LTS 安裝 MySQL Server
tags: [Infra, Linux/Ubuntu, SQL/MySQL]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

#hide_table_of_contents: true

created: 2022-09-21T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[MySQL] Ubuntu 20.04 LTS 安裝 MySQL Server
===========================================

> 開發環境幾乎都已經改用 docker 在跑 MySQL 了, 
> 偶爾還是會遇到需要在主機 / VM 上安裝 MySQL 的情況.
> 隨著版本迭代, 過去設定方式雖不見得不適用, 但可能有更建議的設定工具, 簡單紀錄.

_本文主要參考 [[教學][Ubuntu 架站] 在 Ubuntu 20.04 上安裝 MySQL Server | 優程式](https://ui-code.com/archives/293), 
並補充一些問題排除_


安裝 MySQL
---------

除非要安裝其他社群維護 (Ex: mariadb) 或特別版本的 MySQL (Ex: AliSQL...), 
否則在 Ubuntu 20.04 上安裝 MySQL, 直接透過 apt 安裝即可.

``` shell
sudo apt update && sudo apt install mysql-server
```
當提示安裝 MySQL 套件時, 按 `y` `ENTER` 確定安裝.

### 確認服務正常 ###

MySQL 完成後, 可以檢查 MySQL 服務是否正在運行.

``` shell
sudo service mysql status
```
服務正常運行的話, 會看到如下所示的綠色 Active 狀態.

``` txt
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


設定安全性（Security）
-------------------

`mysql_secure_installation` 是官方建議為 MySQL Server 配置安全性的小工具.

``` shell
sudo mysql_secure_installation
```

如果已經有設置了 root 密碼, 會提示在此處輸入密碼.

### 驗證密碼插件 ###

```
Securing the MySQL server deployment.
Connecting to MySQL using a blank password.
VALIDATE PASSWORD PLUGIN can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD plugin?
Press y|Y for Yes, any other key for No: 
```

是否要設定驗證密碼插件 (VALIDATE PASSWORD PLUGIN). 
除非想要強制執行嚴格的密碼規則, 不然這並不是真正需要的.

如果不想設置驗證密碼插件的話, 直接按 `ENTER`.

### root 密碼 ###

如果沒有設置過 root 密碼, 會要求設置密碼:
```
Please set the password for root here.
New password: 
Re-enter new password: 
```

如果已有 root 密碼, 會詢問是否更改密碼.
```
Using existing password for root.
Change the password for root ? ((Press y|Y for Yes, any other key for No) :
```

#### 無法設定 root 密碼 ####

因版本預設配置不同, 設定 root 密碼時可能會出現錯誤

> ... Failed! Error: SET PASSWORD has no significance for user 'root'@'localhost' as the authentication method used doesn't store authentication data in the MySQL server. Please consider using ALTER USER instead if you want to change authentication parameters.

遇到這情況先中斷 `mysql_secure_installation` 流程, 
在主機上直接透過 MySQL client 進去設定 root 密碼再重新執行 `mysql_secure_installation`.

```
$ sudo mysql

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by 'mynewpassword';
```
Ref: [MySQL installation on Ubuntu 20.04 error when using mysql_secure_installation - Stack Overflow](https://stackoverflow.com/questions/72103302/mysql-installation-on-ubuntu-20-04-error-when-using-mysql-secure-installation)

### 匿名用戶 ###

```
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) : 
```
`y` `ENTER` 刪除匿名用戶.

### 禁止遠端 root 登錄 ###

```
Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) : 
```
`y` `ENTER` 禁止遠端 root 登錄, 可防止機器人和駭客嘗試猜測 root 密碼.

### 刪除測試資料庫 ###

```
By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.

Remove test database and access to it? (Press y|Y for Yes, any other key for No) : 
```
`y` `ENTER` 刪除測試資料庫.

### 重新載入權限表 ###

```
Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) :
```
`y` `ENTER` 重新載入權限表 (Privilege Tables).

### 確認服務運作 ###

完成後, 即可測試 MySQL 是否正常運作.
以下登錄 MySQL Server 並運行 version 命令.
```
sudo mysqladmin -p -u root version

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
出現版本資訊後, 表示已經成功地在 Ubuntu 20.04 上安裝和配置了 MySQL.



新建管理使用者
-----------

...TBD...



See Also
--------

- [[教學][Ubuntu 架站] 在 Ubuntu 20.04 上安裝 MySQL Server | 優程式](https://ui-code.com/archives/293)
- [MySQL installation on Ubuntu 20.04 error when using mysql_secure_installation - Stack Overflow](https://stackoverflow.com/questions/72103302/mysql-installation-on-ubuntu-20-04-error-when-using-mysql-secure-installation)
- [MariaDB Foundation - MariaDB.org](https://mariadb.org)
- [alibaba/AliSQL: AliSQL is a MySQL branch originated from Alibaba Group. Fetch document from Release Notes at bottom](https://github.com/alibaba/AliSQL)
