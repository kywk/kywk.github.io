---
title: SrcTree Structure
description: 'Spring Boot: Code & Folder Structure'
tags:
  - SpringBoot
  - Beginner
sidebar_position: 10
hide_table_of_contents: true
date_created: 2023-03-15T00:00:00.000Z
date_updated: 2023-03-15T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/spring-boot/spring-boot-source-tree/
---

# Spring Boot 專案結構與組織方式

## 概述

Spring Boot 應用程式開發依賴 Spring Framework 的註解 (Annotation) 自動找尋載入各個功能元件與定義設定。由於 Spring 框架會自動掃描，所以專案目錄結構反而沒有特別規定或制式結構。

### 重要原則

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

`@SpringBootApplication` 註解是多個註解的組合，預設所有的 `@Controller`、`@Service`、`@Repository` 等 Spring 相關的註解只能使用在與**主程式類別同目錄或子目錄**下，才能被 Spring 掃描到。

## 專案結構組織方式

在專案開發管理上，通常有兩種主要的組織方式：

### 1. 按功能組織 (By Feature) - **推薦**

在這種方法中，所有與特定功能相關的類別都放在同一個包中。

```
com.example.demo
├── DemoApplication.java
├── config/
│   ├── SecurityConfig.java
│   └── DatabaseConfig.java
├── customer/
│   ├── Customer.java
│   ├── CustomerController.java
│   ├── CustomerService.java
│   ├── CustomerRepository.java
│   └── dto/
│       ├── CustomerRequest.java
│       └── CustomerResponse.java
├── order/
│   ├── Order.java
│   ├── OrderController.java
│   ├── OrderService.java
│   ├── OrderRepository.java
│   └── dto/
│       ├── OrderRequest.java
│       └── OrderResponse.java
└── common/
    ├── exception/
    │   ├── GlobalExceptionHandler.java
    │   └── BusinessException.java
    └── util/
        └── DateUtils.java
```

#### 優點：
- **易於維護**：找到需要修改的類別很容易
- **模組化**：刪除特定子包即可移除整個功能
- **測試友好**：測試和重構更容易
- **獨立部署**：功能可以單獨發佈
- **團隊協作**：不同團隊成員可以專注於不同功能模組

### 2. 按層組織 (By Layer)

另一種方式是按層級放置類別，即所有控制器放在 controllers 包中，服務放在 services 包中。

```
com.example.demo
├── DemoApplication.java
├── controller/
│   ├── CustomerController.java
│   └── OrderController.java
├── service/
│   ├── CustomerService.java
│   └── OrderService.java
├── repository/
│   ├── CustomerRepository.java
│   └── OrderRepository.java
├── model/
│   ├── Customer.java
│   └── Order.java
├── dto/
│   ├── CustomerRequest.java
│   ├── CustomerResponse.java
│   ├── OrderRequest.java
│   └── OrderResponse.java
└── config/
    ├── SecurityConfig.java
    └── DatabaseConfig.java
```

#### 缺點：
- **難以模組化**：功能或模組無法單獨發佈
- **維護困難**：難以定位與特定功能相關的類別
- **重構複雜**：對特定功能進行重構困難，因為相關類別分散在各層

## 實際專案結構範例

### 小型專案結構

```
src/main/java/com/example/demo/
├── DemoApplication.java
├── config/
│   ├── SecurityConfig.java
│   └── WebConfig.java
├── controller/
│   └── HomeController.java
├── service/
│   └── UserService.java
├── repository/
│   └── UserRepository.java
├── model/
│   └── User.java
└── dto/
    ├── UserRequest.java
    └── UserResponse.java
```

### 中大型專案結構 (推薦)

```
src/main/java/com/example/ecommerce/
├── EcommerceApplication.java
├── config/
│   ├── SecurityConfig.java
│   ├── DatabaseConfig.java
│   └── CacheConfig.java
├── user/
│   ├── User.java
│   ├── UserController.java
│   ├── UserService.java
│   ├── UserRepository.java
│   └── dto/
│       ├── UserRegistrationRequest.java
│       ├── UserProfileResponse.java
│       └── UserUpdateRequest.java
├── product/
│   ├── Product.java
│   ├── ProductController.java
│   ├── ProductService.java
│   ├── ProductRepository.java
│   ├── category/
│   │   ├── Category.java
│   │   ├── CategoryService.java
│   │   └── CategoryRepository.java
│   └── dto/
│       ├── ProductRequest.java
│       └── ProductResponse.java
├── order/
│   ├── Order.java
│   ├── OrderItem.java
│   ├── OrderController.java
│   ├── OrderService.java
│   ├── OrderRepository.java
│   ├── payment/
│   │   ├── PaymentService.java
│   │   └── PaymentProvider.java
│   └── dto/
│       ├── OrderRequest.java
│       └── OrderResponse.java
└── common/
    ├── exception/
    │   ├── GlobalExceptionHandler.java
    │   ├── BusinessException.java
    │   └── ResourceNotFoundException.java
    ├── util/
    │   ├── DateUtils.java
    │   └── ValidationUtils.java
    └── constant/
        └── AppConstants.java
```

## 資源檔案結構

```
src/main/resources/
├── application.yml                 # 主配置檔
├── application-dev.yml             # 開發環境配置
├── application-prod.yml            # 生產環境配置
├── application-test.yml            # 測試環境配置
├── db/
│   ├── migration/
│   │   ├── V1__Create_user_table.sql
│   │   └── V2__Create_product_table.sql
│   └── data/
│       └── test-data.sql
├── static/                         # 靜態資源
│   ├── css/
│   ├── js/
│   └── images/
├── templates/                      # 模板檔案
│   ├── index.html
│   └── error.html
└── messages/                       # 國際化資源
    ├── messages.properties
    ├── messages_en.properties
    └── messages_zh_TW.properties
```

## 測試結構

```
src/test/java/com/example/demo/
├── DemoApplicationTests.java
├── user/
│   ├── UserControllerTest.java
│   ├── UserServiceTest.java
│   └── UserRepositoryTest.java
├── product/
│   ├── ProductControllerTest.java
│   └── ProductServiceTest.java
└── integration/
    ├── UserIntegrationTest.java
    └── ProductIntegrationTest.java
```

## 最佳實踐建議

### 1. 命名約定

- **包名**：使用小寫、單數、簡潔的名稱
- **類別名**：使用 PascalCase，加上適當的後綴
  - Controller: `UserController`
  - Service: `UserService`
  - Repository: `UserRepository`
  - DTO: `UserRequest`, `UserResponse`

### 2. 分層架構

```java
// Controller 層 - 處理 HTTP 請求
@RestController
@RequestMapping("/api/users")
public class UserController {
    // 僅處理 HTTP 相關邏輯
}

// Service 層 - 業務邏輯
@Service
@Transactional
public class UserService {
    // 業務邏輯處理
}

// Repository 層 - 資料存取
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 資料存取方法
}
```

### 3. 配置管理

```java
// 將配置集中管理
@Configuration
@EnableConfigurationProperties({DatabaseProperties.class, CacheProperties.class})
public class AppConfig {
    // 配置 Bean
}

@ConfigurationProperties(prefix = "app.database")
@Data
public class DatabaseProperties {
    private String url;
    private String username;
    private String password;
}
```

### 4. 異常處理

```java
// 全局異常處理
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException ex) {
        // 處理業務異常
    }
}

// 自訂異常
public class BusinessException extends RuntimeException {
    private final String errorCode;
    // 異常實作
}
```

## 總結

相對於其他框架常見的 controller/model/middleware 等目錄結構，在 Spring Boot 下，若功能耦合性低，**依各功能需求來設計專案目錄結構**是更適合的方式。

### 選擇建議：

- **小型專案** (少於 10 個類別)：可以使用按層組織
- **中大型專案**：強烈建議使用按功能組織
- **微服務架構**：每個服務都應該按功能組織

這樣的組織方式能夠提高代碼的可維護性、可測試性和團隊協作效率。



See Also
--------

- [Spring Boot - Code Structure - GeeksforGeeks](https://www.geeksforgeeks.org/spring-boot-code-structure/)
- [Spring Boot Project - Code & Folder Structure and Best Practices](https://studygyaan.com/spring-boot/spring-boot-project-folder-structure-and-best-practices)

