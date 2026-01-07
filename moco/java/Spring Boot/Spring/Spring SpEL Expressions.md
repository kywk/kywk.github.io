---
title: SpEL expressions
description: 'Spring: SpEL expressions'
tags:
  - SpringBoot
  - Tutorial
sidebar_position: 10
date_created: 2023-08-20T00:00:00.000Z
date_updated: 2023-08-20T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/spring-boot/spring/spring-spel-expressions/
---

# Spring Expression Language (SpEL)

## Overview

Spring Expression Language (SpEL) 是 Spring Framework 的核心功能之一，提供了強大的表達式語言來在運行時查詢和操作物件圖。SpEL 支援呼叫方法、存取屬性、呼叫建構子等功能。

### 主要特色

- **動態表達式評估**：在運行時動態計算表達式
- **豐富的操作符**：支援算術、邏輯、關係等操作符
- **方法呼叫**：可以呼叫物件的方法
- **屬性存取**：存取物件的屬性和欄位
- **集合操作**：支援 List、Map 等集合的操作
- **條件表達式**：支援三元運算子和 Elvis 運算子

## 基本語法

### 字面值 (Literals)

```java
// 字串字面值
@Value("#{'Hello World'}")
private String greeting;

// 數值字面值
@Value("#{42}")
private int number;

// 布林字面值
@Value("#{true}")
private boolean flag;
```

### 屬性存取

```java
// 存取系統屬性
@Value("#{systemProperties['java.version']}")
private String javaVersion;

// 存取環境變數
@Value("#{systemEnvironment['PATH']}")
private String path;

// 存取 Bean 屬性
@Value("#{userService.currentUser.name}")
private String currentUserName;
```

### 方法呼叫

```java
// 呼叫字串方法
@Value("#{'Hello World'.toUpperCase()}")
private String upperCaseGreeting;

// 呼叫 Bean 方法
@Value("#{userService.getUserCount()}")
private int userCount;

// 鏈式方法呼叫
@Value("#{userService.getCurrentUser().getName().toUpperCase()}")
private String upperCaseUserName;
```

## 運算子

### 算術運算子

```java
@Value("#{10 + 5}")
private int addition;  // 15

@Value("#{10 - 5}")
private int subtraction;  // 5

@Value("#{10 * 5}")
private int multiplication;  // 50

@Value("#{10 / 5}")
private int division;  // 2

@Value("#{10 % 3}")
private int modulus;  // 1
```

### 比較運算子

```java
@Value("#{10 > 5}")
private boolean greater;  // true

@Value("#{10 < 5}")
private boolean less;  // false

@Value("#{10 == 10}")
private boolean equal;  // true

@Value("#{10 != 5}")
private boolean notEqual;  // true
```

### 邏輯運算子

```java
@Value("#{true and false}")
private boolean andResult;  // false

@Value("#{true or false}")
private boolean orResult;  // true

@Value("#{not true}")
private boolean notResult;  // false
```

## 條件表達式

### 三元運算子

```java
@Value("#{userService.isLoggedIn() ? 'Welcome' : 'Please login'}")
private String welcomeMessage;

@Value("#{systemProperties['env'] == 'prod' ? 'production' : 'development'}")
private String environment;
```

### Elvis 運算子 (?:)

```java
// 如果左邊為 null，則使用右邊的值
@Value("#{userService.getCurrentUser()?.name ?: 'Anonymous'}")
private String userName;

@Value("#{systemProperties['custom.property'] ?: 'default-value'}")
private String customProperty;
```

## 集合操作

### List 操作

```java
// 建立 List
@Value("#{{'apple', 'banana', 'orange'}}")
private List<String> fruits;

// 存取 List 元素
@Value("#{fruits[0]}")
private String firstFruit;

// List 大小
@Value("#{fruits.size()}")
private int fruitsCount;
```

### Map 操作

```java
// 建立 Map
@Value("#{{'key1': 'value1', 'key2': 'value2'}}")
private Map<String, String> configMap;

// 存取 Map 值
@Value("#{configMap['key1']}")
private String configValue;

// 安全存取（避免 null）
@Value("#{configMap['nonexistent'] ?: 'default'}")
private String safeConfigValue;
```

### 集合篩選

```java
// 篩選集合元素
@Value("#{numbers.?[#this > 10]}")
private List<Integer> numbersGreaterThanTen;

// 篩選第一個符合條件的元素
@Value("#{users.^[age > 18]}")
private User firstAdultUser;

// 篩選最後一個符合條件的元素
@Value("#{users.$[age > 18]}")
private User lastAdultUser;
```

## 實際應用範例

### 配置檔案處理

```java
@Component
public class DatabaseConfig {
    
    // 根據環境選擇不同的資料庫 URL
    @Value("#{systemProperties['env'] == 'prod' ? '${db.prod.url}' : '${db.dev.url}'}")
    private String databaseUrl;
    
    // 動態計算連線池大小
    @Value("#{T(java.lang.Runtime).getRuntime().availableProcessors() * 2}")
    private int connectionPoolSize;
    
    // 條件性啟用功能
    @Value("#{systemProperties['feature.enabled'] != null and systemProperties['feature.enabled'] == 'true'}")
    private boolean featureEnabled;
}
```

### Bean 方法呼叫

```java
@Component
public class NotificationService {
    
    // 根據使用者偏好選擇通知方式
    @Value("#{userPreferenceService.getNotificationMethod()}")
    private String notificationMethod;
    
    // 動態計算快取過期時間
    @Value("#{cacheConfigService.getBaseTimeout() * 1000}")
    private long cacheTimeoutMs;
}
```

### 複雜條件邏輯

```java
@Component
public class SecurityConfig {
    
    // 複雜的安全性檢查
    @Value("#{securityService.isSecureMode() and (userService.getCurrentUser()?.role == 'ADMIN' or systemProperties['debug.mode'] == 'true')}")
    private boolean allowAdminAccess;
    
    // 動態權限檢查
    @Value("#{userService.getCurrentUser()?.permissions?.contains('READ_SENSITIVE_DATA') ?: false}")
    private boolean canReadSensitiveData;
}
```

## 進階功能

### 類型操作 (T operator)

```java
// 呼叫靜態方法
@Value("#{T(java.lang.Math).random()}")
private double randomNumber;

// 存取靜態欄位
@Value("#{T(java.lang.Integer).MAX_VALUE}")
private int maxInteger;

// 建立新物件
@Value("#{new java.util.Date()}")
private Date currentDate;
```

### 變數定義

```java
// 在表達式中定義變數
@Value("#{#user = userService.getCurrentUser(); #user != null ? #user.name : 'Guest'}")
private String displayName;
```

## 最佳實踐

### 1. 錯誤處理

```java
// 使用 Elvis 運算子避免 null
@Value("#{userService.getCurrentUser()?.email ?: 'no-email@example.com'}")
private String userEmail;

// 使用條件檢查
@Value("#{systemProperties['config.value'] != null ? systemProperties['config.value'] : 'default'}")
private String configValue;
```

### 2. 效能考量

```java
// 避免複雜的運算，考慮快取結果
@Value("#{@cacheService.getExpensiveCalculation()}")
private String cachedResult;
```

### 3. 可讀性

```java
// 複雜表達式考慮拆分為多個步驟
@Value("#{#isProduction = systemProperties['env'] == 'prod'; #isProduction ? '${prod.config}' : '${dev.config}'}")
private String environmentConfig;
```


See Also
--------

- [6. Spring Expression Language (SpEL)](https://docs.spring.io/spring-framework/docs/3.0.x/reference/expressions.html)
