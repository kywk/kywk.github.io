---
title: MSSQL Server Installation
tags:
  - Database
  - SQL/MSSQL
image: >-
  https://lh3.googleusercontent.com/pw/ACtC-3cYYtkzJjo_oG7Gzqq8T8XQm4V_qLE3wGWVKOahp6YT4lo-on60NJmjrkkatnizX1b-uID-MCM2ztsXH9z27cMRtql3PA5cpYZYbMfSPuM5Yh3MmqnjnnXYkTg6vtIiBL5SGAQRRAI9zEBIOoyP3tZpuA?authuser=0
sidebar_position: 50
date_created: 2025-01-21T00:00:00.000Z
slug: /techstack/database/mssql-server-installation/
---

# MSSQL Server Installation

Microsoft SQL Server 在不同平台的安裝指南。

## 安裝方式

### Docker (推薦)

使用 Docker 是在 macOS 和 Linux 上運行 SQL Server 的最佳方式。

```bash
# 拉取 SQL Server 2022 鏡像
docker pull mcr.microsoft.com/mssql/server:2022-latest

# 運行 SQL Server 容器
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<YourStrong@Passw0rd>" \
   -p 1433:1433 --name sqlserver --hostname sqlserver \
   -d mcr.microsoft.com/mssql/server:2022-latest
```

### Windows

1. 下載 [SQL Server Developer Edition](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
2. 執行安裝程式
3. 選擇安裝類型（基本、自訂或下載媒體）

## macOS 安裝注意事項

### Apple Silicon (M1/M2/M3) 支援

SQL Server 2022 已原生支援 ARM64 架構：

```bash
# 使用 ARM64 鏡像
docker pull mcr.microsoft.com/mssql/server:2022-latest
```

### Intel Mac

使用標準 x64 鏡像即可。

## 連線設定

### 使用 Azure Data Studio

1. 下載並安裝 [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio)
2. 建立新連線：
   - Server: `localhost,1433`
   - Authentication: `SQL Login`
   - User name: `sa`
   - Password: 您設定的密碼

### 使用 sqlcmd

```bash
# 安裝 sqlcmd
brew install sqlcmd

# 連線到 SQL Server
sqlcmd -S localhost,1433 -U sa -P '<YourStrong@Passw0rd>'
```

## See Also

### 官方文件
- [SQL Server on Linux documentation](https://docs.microsoft.com/en-us/sql/linux/)
- [Run SQL Server container images with Docker](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker)

### 中文教學
- [在 macOS（Silicon）上執行 SQL Server – 研蘋果](https://www.chainhao.com.tw/sqlserver_for_mac_silicon/)
- [Mac M1 download MSSQL via Docker - HackMD](https://hackmd.io/@katydu/HkxtoWItGj)
- [Running Mssql Server in Your Mac M1/M2/M3 Using Docker - Bonus Secret at the End | Appsmith Community Portal](https://community.appsmith.com/tutorial/running-mssql-server-your-mac-m1m2m3-using-docker-bonus-secret-end)

### 相關工具
- [[Awesome Database GUI Client]] - GUI 管理工具比較
- [Azure Data Studio Download](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio)
