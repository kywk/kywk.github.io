---
sidebar_position: 0
title: Awesome Spring Boot
tags:
  - SpringBoot
  - Awesome
slug: /java/spring-boot/awesome-spring-boot/
---

# Awesome Spring Boot Resources

## 官方資源

### [Spring Boot](https://spring.io/projects/spring-boot)

Spring Boot 是基於 Spring Framework 的快速應用程式開發框架，提供了自動配置、內嵌伺服器等功能，大幅簡化了 Spring 應用程式的開發和部署。

**核心特色：**
- **自動配置**：根據 classpath 自動配置 Spring 應用程式
- **內嵌伺服器**：內建 Tomcat、Jetty 或 Undertow
- **生產就緒**：提供監控、健康檢查等生產環境功能
- **無程式碼生成**：不需要 XML 配置
- **微服務友好**：適合構建微服務架構

**重要連結：**
- [GitHub - spring-projects/spring-boot](https://github.com/spring-projects/spring-boot)
- [Spring Initializr](https://start.spring.io/) - 快速生成 Spring Boot 專案

### 官方文件

#### [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/index.html)

- [Getting Started](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html) - 入門指南
- [Using Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html) - 使用指南
- [Spring Boot Features](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html) - 功能特色
- [Production-ready Features](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html) - 生產環境功能

#### [Spring Guides](https://spring.io/guides)

- [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/) - 基礎教學
- [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/) - REST API 開發
- [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/) - 資料庫存取
- [Building a Guide with VS Code](https://spring.io/guides/gs/guides-with-vscode/) - VS Code 開發環境

## 學習資源

### 中文教學

- [Java | The Will Will Web](https://blog.miniasp.com/category/Java) - 保哥的 Java 技術分享
- [30天帶你潮玩Spring Boot](https://ithelp.ithome.com.tw/users/20119569/ironman/2159) - iThome 鐵人賽系列
- [Spring Boot 初學用法介紹](https://hackmd.io/@bingdoal/SkNK5YWPw) - HackMD 教學文件

### 英文資源

- [Baeldung Spring Boot Tutorials](https://www.baeldung.com/spring-boot) - 深入的技術教學
- [Spring Boot Official Samples](https://github.com/spring-projects/spring-boot/tree/main/spring-boot-samples) - 官方範例程式
- [Awesome Spring Boot](https://github.com/stunstunstun/awesome-spring-boot) - GitHub 資源整理

## 開發工具

### IDE 支援

- **IntelliJ IDEA**：Spring Boot 專案支援、自動完成、除錯功能
- **Visual Studio Code**：Spring Boot Extension Pack
- **Eclipse**：Spring Tools 4 (ST4)

### 建置工具

- **Maven**：spring-boot-starter-parent、spring-boot-maven-plugin
- **Gradle**：Spring Boot Gradle Plugin

### 監控與管理

- **Spring Boot Actuator**：應用程式監控和管理
- **Spring Boot Admin**：視覺化管理介面
- **Micrometer**：應用程式指標收集

## 常用 Starters

| Starter | 用途 | 包含的主要依賴 |
|---------|------|----------------|
| `spring-boot-starter-web` | Web 應用程式開發 | Spring MVC, Tomcat, Jackson |
| `spring-boot-starter-data-jpa` | JPA 資料存取 | Hibernate, Spring Data JPA |
| `spring-boot-starter-security` | 安全性功能 | Spring Security |
| `spring-boot-starter-test` | 測試功能 | JUnit, Mockito, AssertJ |
| `spring-boot-starter-actuator` | 生產監控 | Actuator endpoints |
| `spring-boot-starter-data-redis` | Redis 支援 | Lettuce, Spring Data Redis |

## 最佳實踐

### 專案結構

```
src/main/java/
├── com.example.demo/
│   ├── DemoApplication.java          # 主程式類別
│   ├── controller/                   # 控制器層
│   ├── service/                      # 服務層
│   ├── repository/                   # 資料存取層
│   ├── model/                        # 實體類別
│   └── config/                       # 配置類別
src/main/resources/
├── application.yml                   # 應用程式配置
├── static/                          # 靜態資源
└── templates/                       # 模板檔案
```

### 配置管理

- 使用 `application.yml` 或 `application.properties`
- 利用 Profile 管理不同環境配置
- 使用 `@ConfigurationProperties` 進行類型安全的配置綁定

### 安全性

- 啟用 Spring Security
- 使用 HTTPS
- 實施適當的認證和授權機制
- 定期更新依賴套件


See Also
--------

