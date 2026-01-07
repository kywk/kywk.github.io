---
title: Gson
description: Serialize with Gson
tags:
  - Java
  - Package
hide_table_of_contents: true
date_created: 2024-04-24T00:00:00.000Z
date_updated: 2024-04-24T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/packages/java-gson-serialize/
---

# [Java] Serialize with Gson

## Introduction

Gson 是 Google 開發的 Java 函式庫，用於將 Java 物件序列化為 JSON 字串，以及將 JSON 字串反序列化為 Java 物件。它提供了簡潔的 API 和強大的功能，是 Java 開發中常用的 JSON 處理工具。

### 主要特色

- **簡單易用**：API 設計直觀，學習成本低
- **零依賴**：不需要額外的第三方函式庫
- **泛型支援**：完整支援 Java 泛型
- **自訂序列化**：支援自訂序列化和反序列化邏輯
- **註解支援**：提供豐富的註解來控制序列化行為

## 基本用法

### 簡單物件序列化

```java
// 建立 Gson 實例
Gson gson = new Gson();

// 物件轉 JSON
Person person = new Person("John", 30);
String json = gson.toJson(person);
// 結果：{"name":"John","age":30}

// JSON 轉物件
Person personFromJson = gson.fromJson(json, Person.class);
```

### 集合處理

```java
// List 序列化
List<Person> people = Arrays.asList(
    new Person("John", 30),
    new Person("Jane", 25)
);
String json = gson.toJson(people);

// List 反序列化
Type listType = new TypeToken<List<Person>>(){}.getType();
List<Person> peopleFromJson = gson.fromJson(json, listType);
```

## 常用註解

### @SerializedName

```java
public class User {
    @SerializedName("user_name")
    private String userName;
    
    @SerializedName("user_id")
    private Long userId;
}
```

### @Expose

```java
public class User {
    @Expose
    private String name;  // 會被序列化
    
    @Expose(serialize = false)
    private String password;  // 只反序列化，不序列化
    
    private String internalId;  // 不會被序列化
}

// 使用時需要配置
Gson gson = new GsonBuilder()
    .excludeFieldsWithoutExposeAnnotation()
    .create();
```

## See Also

### Gson API documentation

- [com.google.gson (Gson 2.10.1 API)](https://javadoc.io/doc/com.google.code.gson/gson/latest/com.google.gson/module-summary.html)
- [SerializedName (Gson 2.10.1 API)](https://www.javadoc.io/doc/com.google.code.gson/gson/latest/com.google.gson/com/google/gson/annotations/SerializedName.html)
  - [Gson @SerializedName to Change Field Name Mapping](https://howtodoinjava.com/gson/gson-serializedname/)
  - [Difference between Gson @Expose and @SerializedName | Baeldung](https://www.baeldung.com/gson-expose-vs-serializedname)

### References

- [Gson 泛型處理方式. Gson 轉換博大精深，今天要探討的是泛型轉換處理方式 | by 邦哥不會寫程式 | 程式裡有蟲 | Medium](https://medium.com/程式裡有蟲/gson-泛型處理方式-44254d6718c6)
- [最全Gson使用介绍，通俗易懂 - 知乎](https://zhuanlan.zhihu.com/p/451745696)
- [Day 10：Gson 資料解析 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10262049)
- [Gson：Google开源的JSON解析库 | 二哥的Java进阶之路](https://javabetter.cn/gongju/gson.html)
- 
