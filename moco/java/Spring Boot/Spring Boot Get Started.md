---
title: Get Started
description: 'Spring Boot: Get Started'
tags:
  - SpringBoot
  - Beginner
sidebar_position: 10
hide_table_of_contents: true
date_created: 2023-02-24T00:00:00.000Z
date_updated: 2023-03-24T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/spring-boot/spring-boot-get-started/
---

# Spring Boot Get Started

## 什麼是 Spring Boot

Spring Boot 是基於 Spring Framework 的快速應用程式開發框架，旨在簡化 Spring 應用程式的初始設定和開發過程。它提供了“約定優於配置”的方法，讓開發者可以快速建立獨立的、生產級別的 Spring 應用程式。

### 主要優勢

- **快速開發**：減少繁瑣的配置，專注於業務邏輯
- **獨立運行**：內嵌 Web 伺服器，無需外部部署
- **自動配置**：根據 classpath 自動配置 Spring 功能
- **生產就緒**：內建監控、健康檢查等功能
- **無程式碼生成**：不需要 XML 配置或程式碼生成

## 快速開始

### 1. 使用 Spring Initializr

最簡單的方式是使用 [Spring Initializr](https://start.spring.io/) 來建立專案：

1. 造訪 [https://start.spring.io/](https://start.spring.io/)
2. 選擇專案設定：
   - **Project**: Maven Project
   - **Language**: Java
   - **Spring Boot**: 3.2.x (最新穩定版)
   - **Group**: com.example
   - **Artifact**: demo
   - **Packaging**: Jar
   - **Java**: 17 或 21
3. 添加依賴：
   - Spring Web
   - Spring Boot DevTools
4. 點擊 "Generate" 下載專案

### 2. 專案結構

下載後的專案結構如下：

```
demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       └── DemoApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   └── test/
│       └── java/
│           └── com/example/demo/
│               └── DemoApplicationTests.java
├── pom.xml
└── mvnw, mvnw.cmd
```

### 3. 主程式類別

`DemoApplication.java` 是應用程式的入口點：

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

`@SpringBootApplication` 註解等同於：
- `@Configuration`：標記為配置類別
- `@EnableAutoConfiguration`：啟用自動配置
- `@ComponentScan`：啟用元件掃描

### 4. 建立第一個 Controller

在 `com.example.demo` 包下建立 `HelloController.java`：

```java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @GetMapping("/")
    public String hello() {
        return "Hello, Spring Boot!";
    }
    
    @GetMapping("/api/greeting")
    public String greeting() {
        return "Welcome to Spring Boot API!";
    }
}
```

### 5. 運行應用程式

有多種方式可以運行 Spring Boot 應用程式：

#### 方式 1：使用 Maven
```bash
./mvnw spring-boot:run
```

#### 方式 2：使用 IDE
直接運行 `DemoApplication.java` 的 main 方法

#### 方式 3：打包後運行
```bash
./mvnw clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### 6. 測試應用程式

應用程式啟動後，開啟瀏覽器造訪：

- [http://localhost:8080/](http://localhost:8080/) - 顯示 "Hello, Spring Boot!"
- [http://localhost:8080/api/greeting](http://localhost:8080/api/greeting) - 顯示 "Welcome to Spring Boot API!"

## 常用配置

### application.properties

在 `src/main/resources/application.properties` 中配置應用程式：

```properties
# 伺服器埠
 server.port=8080

# 應用程式名稱
spring.application.name=demo

# 日誌級別
logging.level.com.example.demo=DEBUG
logging.level.org.springframework.web=INFO

# 資料庫配置（使用 H2 內嵍資料庫）
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.h2.console.enabled=true
```

### 或使用 application.yml

```yaml
server:
  port: 8080

spring:
  application:
    name: demo
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
  h2:
    console:
      enabled: true

logging:
  level:
    com.example.demo: DEBUG
    org.springframework.web: INFO
```

## 常用 Starters

在 `pom.xml` 中添加常用的 Spring Boot Starters：

```xml
<dependencies>
    <!-- Web 開發 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- 資料庫存取 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- H2 資料庫 -->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- 開發工具 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>
    
    <!-- 測試 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

## 下一步

完成基本設定後，可以繼續學習：

1. **資料庫整合**：使用 Spring Data JPA 進行資料存取
2. **REST API 開發**：建立 RESTful Web Services
3. **安全性**：整合 Spring Security
4. **測試**：編寫單元測試和整合測試
5. **部署**：打包和部署應用程式

## 常見問題

### Q: 為什麼選擇 Spring Boot？

A: Spring Boot 提供了以下優勢：
- 減少配置複雜度
- 快速原型開發
- 內建生產級功能
- 強大的生態系統支援

### Q: Spring Boot vs Spring Framework 有什麼差別？

A: 
- **Spring Framework**：核心框架，需要手動配置
- **Spring Boot**：基於 Spring Framework，提供自動配置和約定

### Q: 如何選擇 Java 版本？

A: 建議使用 LTS 版本：
- Java 17 (目前最穩定的 LTS)
- Java 21 (最新的 LTS)
- 避免使用 Java 8（已過時）





See Also
--------

- [Getting Started | Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
- [從無到有上手你的第一個 Spring Boot 應用程式 | The Will Will Web](https://blog.miniasp.com/post/2022/09/19/Spring-Boot-Quick-Start-From-Scratch)
- [30天帶你潮玩Spring Boot Zone :: 第 11 屆 iThome 鐵人賽](https://ithelp.ithome.com.tw/users/20119569/ironman/2159)
- [Spring Boot 初學用法介紹 - HackMD](https://hackmd.io/@bingdoal/SkNK5YWPw)

