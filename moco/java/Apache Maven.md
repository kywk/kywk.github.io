---
title: Apache Maven
description: Apache Maven
tags:
  - Java
  - SDK
sidebar_position: 20
date_created: 2023-02-24T00:00:00.000Z
date_updated: 2023-02-24T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/apache-maven/
---

# Apache Maven 完整指南

## 什麼是 Apache Maven

Apache Maven 是一個強大的專案管理和理解工具，主要用於 Java 專案（也支援 C#、Ruby、Scala 等語言）。Maven 提供了一個統一的專案結構、依賴管理和建置生命週期管理。

### 主要特色

- **依賴管理**：自動下載和管理專案依賴
- **標準化結構**：提供統一的專案目錄結構
- **建置生命週期**：定義清晰的建置階段
- **外掛程式支援**：豐富的外掛程式生態系統
- **整合性**：與 IDE 和 CI/CD 工具的良好整合

## 安裝方式

### 方法 1：使用包管理器（推薦）

#### macOS
```bash
# 使用 Homebrew
brew install maven

# 驗證安裝
mvn -version
```

#### Windows
```powershell
# 使用 Chocolatey
choco install maven

# 使用 Scoop
scoop install maven
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install maven

# CentOS/RHEL
sudo yum install maven

# Fedora
sudo dnf install maven
```

### 方法 2：手動安裝

1. 從 [Maven 官網](https://maven.apache.org/download.cgi)下載 [Binary tar.gz archive](https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz)

2. 解壓到指定目錄：
   ```bash
   tar -xzf apache-maven-3.9.6-bin.tar.gz
   sudo mv apache-maven-3.9.6 /opt/maven
   ```

3. 設定環境變數：
   ```bash
   export MAVEN_HOME=/opt/maven
   export PATH=$MAVEN_HOME/bin:$PATH
   ```

4. 驗證安裝：
   ```bash
   mvn -version
   ```

   應該看到類似以下輸出：
   ```
   Apache Maven 3.9.6 (bc0240f3c744dd6b6ec2920b3cd08dcc295161ae)
   Maven home: /opt/maven
   Java version: 17.0.9, vendor: Eclipse Adoptium
   Java home: /usr/lib/jvm/temurin-17-jdk
   Default locale: en_US, platform encoding: UTF-8
   OS name: "linux", version: "5.15.0", arch: "amd64", family: "unix"
   ```

## Maven 核心概念

### POM (Project Object Model)

POM 是 Maven 的核心，定義在 `pom.xml` 檔案中：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <!-- 專案座標 -->
    <groupId>com.example</groupId>
    <artifactId>my-project</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>
    
    <!-- 專案資訊 -->
    <name>My Project</name>
    <description>A sample Maven project</description>
    <url>https://example.com/my-project</url>
    
    <!-- 屬性定義 -->
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <junit.version>5.10.1</junit.version>
    </properties>
    
    <!-- 依賴管理 -->
    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>${junit.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <!-- 建置配置 -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### 專案座標 (Coordinates)

- **groupId**：組織或公司的唯一識別符
- **artifactId**：專案的唯一名稱
- **version**：專案版本號
- **packaging**：打包方式（jar, war, pom 等）

## 常用命令

### 基本命令

```bash
# 清理專案
mvn clean

# 編譯專案
mvn compile

# 執行測試
mvn test

# 打包專案
mvn package

# 安裝到本地倉庫
mvn install

# 部署到遠端倉庫
mvn deploy
```

### 組合命令

```bash
# 清理並編譯
mvn clean compile

# 清理、測試並打包
mvn clean test package

# 完整建置流程
mvn clean install

# 跳過測試的打包
mvn clean package -DskipTests
```

### 依賴管理命令

```bash
# 查看依賴樹
mvn dependency:tree

# 分析依賴
mvn dependency:analyze

# 下載依賴到本地
mvn dependency:go-offline

# 查看依賴路徑
mvn dependency:build-classpath

# 解決依賴衝突
mvn dependency:resolve
```

## 專案結構

### 標準目錄結構

```
my-project/
├── pom.xml                    # Maven 配置檔
├── src/
│   ├── main/
│   │   ├── java/              # Java 原始碼
│   │   │   └── com/example/
│   │   │       └── App.java
│   │   ├── resources/         # 資源檔案
│   │   │   ├── application.properties
│   │   │   └── logback.xml
│   │   └── webapp/            # Web 資源（WAR 專案）
│   └── test/
│       ├── java/              # 測試程式碼
│       │   └── com/example/
│       │       └── AppTest.java
│       └── resources/         # 測試資源
├── target/                    # 建置輸出目錄
│   ├── classes/
│   ├── test-classes/
│   └── my-project-1.0.0.jar
└── .mvn/                      # Maven Wrapper
    ├── wrapper/
    │   ├── maven-wrapper.jar
    │   └── maven-wrapper.properties
    ├── mvnw                   # Unix Maven Wrapper
    └── mvnw.cmd               # Windows Maven Wrapper
```

## 依賴管理

### 依賴定義

```xml
<dependencies>
    <!-- 編譯時依賴 -->
    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-lang3</artifactId>
        <version>3.14.0</version>
    </dependency>
    
    <!-- 測試依賴 -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.1</version>
        <scope>test</scope>
    </dependency>
    
    <!-- 運行時依賴 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
        <scope>runtime</scope>
    </dependency>
    
    <!-- 提供時依賴（由容器提供） -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

### 依賴範圍 (Scope)

- **compile**：預設範圍，編譯和運行時都需要
- **test**：僅測試時需要
- **runtime**：運行時需要，編譯時不需要
- **provided**：編譯時需要，運行時由容器提供
- **system**：類似 provided，但需明確指定 JAR 檔案位置

### 版本管理

```xml
<!-- 使用屬性管理版本 -->
<properties>
    <spring.version>6.1.2</spring.version>
    <junit.version>5.10.1</junit.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>${spring.version}</version>
    </dependency>
</dependencies>

<!-- 依賴管理 -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-framework-bom</artifactId>
            <version>${spring.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

## 建置生命週期

### 預設生命週期階段

1. **validate** - 驗證專案結構
2. **compile** - 編譯原始碼
3. **test** - 執行單元測試
4. **package** - 打包編譯後的程式碼
5. **verify** - 執行整合測試
6. **install** - 安裝到本地倉庫
7. **deploy** - 部署到遠端倉庫

### 常用外掛程式

```xml
<build>
    <plugins>
        <!-- 編譯外掛程式 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.11.0</version>
            <configuration>
                <source>17</source>
                <target>17</target>
            </configuration>
        </plugin>
        
        <!-- 測試外掛程式 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.2.2</version>
        </plugin>
        
        <!-- JAR 打包外掛程式 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <version>3.3.0</version>
            <configuration>
                <archive>
                    <manifest>
                        <mainClass>com.example.App</mainClass>
                    </manifest>
                </archive>
            </configuration>
        </plugin>
        
        <!-- 執行外掛程式 -->
        <plugin>
            <groupId>org.codehaus.mojo</groupId>
            <artifactId>exec-maven-plugin</artifactId>
            <version>3.1.1</version>
            <configuration>
                <mainClass>com.example.App</mainClass>
            </configuration>
        </plugin>
    </plugins>
</build>
```

## Profile 環境管理

```xml
<profiles>
    <!-- 開發環境 -->
    <profile>
        <id>dev</id>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
        <properties>
            <env>development</env>
            <database.url>jdbc:h2:mem:testdb</database.url>
        </properties>
    </profile>
    
    <!-- 生產環境 -->
    <profile>
        <id>prod</id>
        <properties>
            <env>production</env>
            <database.url>jdbc:mysql://prod-server:3306/mydb</database.url>
        </properties>
    </profile>
</profiles>
```

使用特定 Profile：
```bash
mvn clean package -Pprod
```

## 最佳實踐

### 1. 版本管理

```xml
<!-- 使用屬性管理版本號 -->
<properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    
    <!-- 依賴版本 -->
    <spring-boot.version>3.2.1</spring-boot.version>
    <junit.version>5.10.1</junit.version>
</properties>
```

### 2. 依賴管理

```xml
<!-- 使用 BOM 管理依賴版本 -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>${spring-boot.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

### 3. 外掛程式管理

```xml
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```

## 常見問題解決

### 1. 依賴下載失敗

```bash
# 清理本地倉庫
rm -rf ~/.m2/repository

# 重新下載依賴
mvn clean install -U

# 使用不同的倉庫鏡像
mvn clean install -Dmaven.repo.remote=https://repo1.maven.org/maven2
```

### 2. 編譯錯誤

```bash
# 檢查 Java 版本
java -version
javac -version

# 檢查 Maven 配置
mvn help:effective-pom

# 使用詳細輸出
mvn clean compile -X
```

### 3. 測試失敗

```bash
# 執行單一測試
mvn test -Dtest=AppTest

# 跳過測試
mvn clean package -DskipTests

# 僅編譯測試但不執行
mvn clean package -Dmaven.test.skip=true
```

## Maven Wrapper

Maven Wrapper 讓專案可以不依賴系統安裝的 Maven：

```bash
# 生成 Maven Wrapper
mvn wrapper:wrapper

# 使用 Maven Wrapper
./mvnw clean install    # Unix/Linux/macOS
mvnw.cmd clean install  # Windows
```



See Also
--------

- [Maven – Welcome to Apache Maven](https://maven.apache.org/)
- [重新認識 Apache Maven 建置與套件管理工具 | The Will Will Web](https://blog.miniasp.com/post/2022/09/06/Understanding-Apache-Maven-build-tool)
