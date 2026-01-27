---
title: Value Defaults
description: 'Spring Core Basics: Value Defaults'
tags:
  - SpringBoot
  - Tutorial
  - SpringBoot/CoreBasics
  - SpringBoot/Properties
date_created: 2023-08-23T00:00:00.000Z
date_updated: 2023-08-23T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/spring-boot/spring/spring-value-defaults/
---

[Spring] @Value Defaults
========================

> Src: [Using Spring @Value with Defaults | Baeldung](https://www.baeldung.com/spring-value-defaults)  
> Noted: 2023-08-23

Overview
--------

Spring's _@Value_ annotation provides a convenient way to inject property values into components. 
It's also quite useful to __provide sensible defaults for cases where a property may not be present__ 
— how to specify a default value for the @Value Spring annotation.


## 基本語法

### 字串預設值

設定字串屬性預設值的基本語法：

```java 
@Value("${some.key:my default value}")
private String stringWithDefaultValue;
```

如果 some.key 無法解析，stringWithDefaultValue 將被設定為預設值 "my default value"。

同樣地，我們可以設定空字串作為預設值：

```java
@Value("${some.key:}")
private String stringWithBlankDefaultValue;
```

> **重要**：@Value 註解中 `:` 後面即為預設值。
> 沒有給任何值的話並不為 `null`，而是根據不同物件類型有不同的預設內容。
> 對於 String 類型，預設值會是空字串 `""`。

### 基本類型預設值

對於 boolean 和 int 等基本類型，我們使用字面值：

```java 
@Value("${some.key:true}")
private boolean booleanWithDefaultValue;

@Value("${some.key:42}")
private int intWithDefaultValue;
```

如果需要，我們可以使用包裝類型 Boolean 和 Integer 來取代。

### 陣列預設值

我們也可以將逗號 `,` 分隔的值列表注入到陣列中：

```java
@Value("${some.key:one,two,three}")
private String[] stringArrayWithDefaults;

@Value("${some.key:1,2,3}")
private int[] intArrayWithDefaults;
```

在上面的第一個範例中，值 one、two 和 three 作為預設值注入到 stringArrayWithDefaults 中。


## 使用 SpEL 表達式

我們也可以使用 Spring Expression Language (SpEL) 來指定表達式和預設值。

在下面的範例中，我們期望 some.system.key 被設定為系統屬性，
如果沒有設定，我們希望使用 "my default system property value" 作為預設值：

```java
@Value("#{systemProperties['some.key'] ?: 'my default system property value'}")
private String spelWithDefaultValue;
```

### SpEL 預設值的優勢

- **更強大的表達式**：可以使用複雜的邏輯運算
- **動態計算**：可以在運行時計算預設值
- **安全存取**：使用 Elvis 運算子 `?:` 避免 null 值

### 實用範例

```java
// 根據環境設定不同的預設值
@Value("#{systemProperties['env'] == 'prod' ? 'production-default' : 'dev-default'}")
private String environmentDefault;

// 從其他 Bean 獲取預設值
@Value("#{configService.getDefaultTimeout() ?: 30000}")
private long timeoutMs;

// 複雜的條件判斷
@Value("#{systemProperties['debug'] != null and systemProperties['debug'] == 'true' ? 'DEBUG' : 'INFO'}")
private String logLevel;
```


## 總結

Spring @Value 註解中的格式規範類似 YAML，使用 `,` 區隔陣列元素，非必要並無須特別加上 `""` 等符號。
但若字串中有混雜特殊字元等導致誤判，可利用 `'` 單引號來定義字串。

### 最佳實踐

1. **始終提供預設值**：避免應用程式因缺少配置而失敗
2. **使用有意義的預設值**：預設值應該是合理的備用選項
3. **文件化預設值**：在代碼或配置文件中說明預設值的意義
4. **環境特定配置**：不同環境使用不同的預設值

### 常見錯誤

```java
// 錯誤：沒有預設值，可能導致應用程式失敗
@Value("${database.url}")
private String databaseUrl;

// 正確：提供合理的預設值
@Value("${database.url:jdbc:h2:mem:testdb}")
private String databaseUrl;

// 錯誤：預設值不合理
@Value("${server.port:}")
private int serverPort;

// 正確：提供有意義的預設值
@Value("${server.port:8080}")
private int serverPort;
```

本文介紹了如何為我們希望使用 Spring @Value 註解注入的屬性設定預設值。

如常，本文中使用的所有代碼範例都可以在 [GitHub 專案][GitHub project] 中找到。


See Also
--------

- [GitHub project][GitHub project]
- [[Spring Value Annotation|@Value Annotation]]


[GitHub project]: https://github.com/eugenp/tutorials/tree/master/spring-boot-modules/spring-boot-properties-2
