---
title: Jackson
description: Serialize with Jackson
tags:
  - Java
  - Package
hide_table_of_contents: true
date_created: 2024-04-24T00:00:00.000Z
date_updated: 2024-04-24T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/packages/java-jackson-serialize/
---

# [Java] Serialize with Jackson

## Introduction

Jackson 是 Java 生態系統中最受歡迎的 JSON 處理函式庫之一，由 FasterXML 組織開發。它提供了高效能的 JSON 序列化和反序列化功能，並且是 Spring Boot 的預設 JSON 處理器。

### 主要特色

- **高效能**：在大多數情況下比 Gson 更快
- **功能豐富**：支援 JSON、XML、YAML 等多種格式
- **Spring 整合**：Spring Boot 內建支援
- **註解豐富**：提供大量註解來控制序列化行為
- **模組化設計**：核心、註解、資料綁定等模組分離

## 基本用法

### 簡單物件序列化

```java
// 建立 ObjectMapper 實例
ObjectMapper mapper = new ObjectMapper();

// 物件轉 JSON
Person person = new Person("John", 30);
String json = mapper.writeValueAsString(person);

// JSON 轉物件
Person personFromJson = mapper.readValue(json, Person.class);
```

### 集合處理

```java
// List 序列化
List<Person> people = Arrays.asList(
    new Person("John", 30),
    new Person("Jane", 25)
);
String json = mapper.writeValueAsString(people);

// List 反序列化
List<Person> peopleFromJson = mapper.readValue(json, 
    new TypeReference<List<Person>>(){});
```

## 常用註解

### @JsonProperty

```java
public class User {
    @JsonProperty("user_name")
    private String userName;
    
    @JsonProperty("user_id")
    private Long userId;
}
```

### @JsonAlias

```java
public class User {
    @JsonAlias({"user_name", "username", "name"})
    private String userName;  // 可以接受多種字段名稱
}
```

### @JsonIgnore 和 @JsonIgnoreProperties

```java
@JsonIgnoreProperties({"password", "internalId"})
public class User {
    private String name;
    
    @JsonIgnore
    private String password;
    
    private String internalId;
}
```

### @JsonFormat

```java
public class Event {
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date eventTime;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private BigDecimal amount;
}
```

## 進階配置

### ObjectMapper 配置

```java
ObjectMapper mapper = new ObjectMapper()
    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
    .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
    .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
```

## See Also

### Jackson annotations API documentation

- [JsonAlias (Jackson-annotations 2.9.0 API)](https://fasterxml.github.io/jackson-annotations/javadoc/2.9/com/fasterxml/jackson/annotation/JsonAlias.html)
  - [浅谈Jackson中@JsonProperty和@JsonAlias注解\_jackson jsonproperty-CSDN博客](https://blog.csdn.net/qq_16759541/article/details/89083510)

### References

- [Jackson Annotation Examples | Baeldung](https://www.baeldung.com/jackson-annotations)
- [好用的Jackson , 做一個POJO 和 JSON轉換的JSONUtils - HackMD](https://hackmd.io/@camiol/S1Pirv3sw)
-
