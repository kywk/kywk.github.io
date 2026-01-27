---
title: OpenJDK
description: OpenJDK
tags:
  - Java
  - SDK
sidebar_position: 20
date_created: 2023-02-24
date_updated: 2023-02-24
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

# OpenJDK 安裝與管理指南

## 什麼是 OpenJDK

OpenJDK (Open Java Development Kit) 是 Java 程式語言的開源實作，由 Oracle 主導開發並由 Java 社群維護。它是 Oracle JDK 的基礎，並且完全免費使用。

### OpenJDK vs Oracle JDK

| 特性 | OpenJDK | Oracle JDK |
|------|---------|------------|
| 授權 | GPL v2 + Classpath Exception | 商業授權 |
| 費用 | 免費 | 商業使用需付費 |
| 支援 | 社群支援 | Oracle 官方支援 |
| 更新頻率 | 每 6 個月 | 每 6 個月 |
| 效能 | 相同 | 相同 |

## 版本選擇建議

### LTS 版本（推薦）

- **Java 21 LTS** (2023年9月) - 最新 LTS，支援到 2031年
- **Java 17 LTS** (2021年9月) - 目前主流，支援到 2029年
- **Java 11 LTS** (2018年9月) - 較舊但穩定，支援到 2026年

### 非 LTS 版本

- Java 22, 23, 24... - 僅6個月支援，不建議生產環境使用

## 安裝方式

### macOS 安裝

#### 方法 1：使用 Homebrew（推薦）

```bash
# 安裝最新 OpenJDK
brew install openjdk

# 安裝特定版本
brew install openjdk@21
brew install openjdk@17
brew install openjdk@11

# 驗證安裝
java -version
javac -version
```

#### 方法 2：使用 Azul Zulu（Apple Silicon 推薦）

在 Apple Silicon 架構下開發 Java，社群與部分框架官方推薦使用 Homebrew 安裝由 Azul 所發佈，名為 Zulu 的 OpenJDK 版本。這個版本同時支援 Intel 和 Apple Silicon 晶片，在 Apple Silicon 架構的 Mac 上編譯時，比起其他 JDK 版本有明顯效能優勢。

```bash
# 添加 Homebrew Cask 倉庫
brew tap homebrew/cask-versions

# 安裝 Azul Zulu OpenJDK
brew install --cask zulu21     # Java 21
brew install --cask zulu17     # Java 17
brew install --cask zulu11     # Java 11
brew install --cask zulu8      # Java 8
```

### Windows 安裝

#### 方法 1：使用 Chocolatey

```powershell
# 安裝 Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# 安裝 OpenJDK
choco install openjdk21
choco install openjdk17
choco install openjdk11
```

#### 方法 2：使用 Scoop

```powershell
# 安裝 Scoop
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# 安裝 OpenJDK
scoop bucket add java
scoop install openjdk21
scoop install openjdk17
scoop install openjdk11
```

### Linux 安裝

#### Ubuntu/Debian

```bash
# 更新套件列表
sudo apt update

# 安裝 OpenJDK
sudo apt install openjdk-21-jdk
sudo apt install openjdk-17-jdk
sudo apt install openjdk-11-jdk
```

#### CentOS/RHEL/Fedora

```bash
# CentOS/RHEL
sudo yum install java-21-openjdk-devel
sudo yum install java-17-openjdk-devel
sudo yum install java-11-openjdk-devel

# Fedora
sudo dnf install java-21-openjdk-devel
sudo dnf install java-17-openjdk-devel
sudo dnf install java-11-openjdk-devel
```

## 多版本管理

當開發不同專案需要不同版本的 JDK 時，可以在電腦安裝多個 OpenJDK 版本，透過環境變數來決定使用版本。

### macOS/Linux 版本切換

在 `~/.bashrc` 或 `~/.zshrc` 中添加：

```bash
# OpenJDK 版本管理
export JAVA_8_HOME=$(/usr/libexec/java_home -v1.8)
export JAVA_11_HOME=$(/usr/libexec/java_home -v11)
export JAVA_17_HOME=$(/usr/libexec/java_home -v17)
export JAVA_21_HOME=$(/usr/libexec/java_home -v21)

# 快速切換命令
alias java8='export JAVA_HOME=$JAVA_8_HOME && echo "Switched to Java 8"'
alias java11='export JAVA_HOME=$JAVA_11_HOME && echo "Switched to Java 11"'
alias java17='export JAVA_HOME=$JAVA_17_HOME && echo "Switched to Java 17"'
alias java21='export JAVA_HOME=$JAVA_21_HOME && echo "Switched to Java 21"'

# 預設使用 Java 17
java17

# 顯示目前 Java 版本
alias javaversion='java -version'
```

### 使用範例

```bash
# 切換到 Java 21
java21

# 切換到 Java 11
java11

# 查看目前版本
javaversion

# 查看所有安裝的 Java 版本
/usr/libexec/java_home -V
```

### Windows 版本切換

建立批次檔案來切換版本：

```batch
@echo off
REM java21.bat
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.1.12-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%
echo Switched to Java 21
java -version
```

## 環境變數配置

### 必要的環境變數

```bash
# JAVA_HOME - 指向 JDK 安裝目錄
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk

# PATH - 將 JDK bin 目錄加入 PATH
export PATH=$JAVA_HOME/bin:$PATH

# CLASSPATH - Java 類別路徑（可選）
export CLASSPATH=.:$JAVA_HOME/lib/tools.jar
```

### 驗證安裝

```bash
# 查看 Java 版本
java -version

# 查看編譯器版本
javac -version

# 查看 JAVA_HOME
echo $JAVA_HOME

# 查看所有 Java 相關工具
which java
which javac
which jar
```

## 常見問題解決

### 1. 找不到 java 命令

```bash
# 查看是否安裝
which java

# 查看 PATH 設定
echo $PATH

# 重新載入環境變數
source ~/.bashrc  # 或 ~/.zshrc
```

### 2. JAVA_HOME 設定錯誤

```bash
# 查看所有安裝的 Java
/usr/libexec/java_home -V  # macOS
update-alternatives --list java  # Linux

# 設定正確的 JAVA_HOME
export JAVA_HOME=$(/usr/libexec/java_home -v17)  # macOS
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk  # Linux
```

### 3. 版本衝突

```bash
# 移除舊版本
sudo apt remove openjdk-8-jdk  # Linux
brew uninstall openjdk@8       # macOS

# 清理環境變數
unset JAVA_HOME
source ~/.bashrc
```

## 效能調優

### JVM 參數調優

```bash
# 設定 JVM 參數
export JAVA_OPTS="-Xmx2g -Xms1g -XX:+UseG1GC"

# 啟用 JIT 編譯器優化
export JAVA_OPTS="$JAVA_OPTS -XX:+TieredCompilation"

# 啟用垃圾回收日誌
export JAVA_OPTS="$JAVA_OPTS -XX:+PrintGC -XX:+PrintGCDetails"
```

### 開發環境優化

```bash
# 加快編譯速度
export MAVEN_OPTS="-Xmx1024m -XX:+TieredCompilation -XX:TieredStopAtLevel=1"

# 使用並行編譯
export MAKEFLAGS="-j$(nproc)"  # Linux
export MAKEFLAGS="-j$(sysctl -n hw.ncpu)"  # macOS
```

## 相關工具

### JDK 內建工具

- `java` - Java 應用程式啟動器
- `javac` - Java 編譯器
- `jar` - JAR 檔案管理工具
- `javadoc` - 文件生成工具
- `jdb` - Java 除錯器
- `jconsole` - JVM 監控工具
- `jvisualvm` - 視覺化性能分析工具

### 第三方版本管理工具

- [SDKMAN!](https://sdkman.io/) - 多版本 JDK 管理
- [jEnv](https://www.jenv.be/) - Java 環境管理
- [Jabba](https://github.com/shyiko/jabba) - Java 版本管理器
