---
title: Jackson VS Gson
description: 'PKG: Jackson VS Gson'
tags:
  - Java
  - Package
hide_table_of_contents: false
date_created: 2024-04-24T00:00:00.000Z
date_updated: 2024-04-30T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/packages/java-jackson-vs-gson/
---

# [Java] Jackson VS Gson

團隊討論著要選用 [Jackson](https://github.com/FasterXML/jackson) 還是 [Gson](https://github.com/google/gson) 當作專案主要的序列化/反序列化套件, 節錄這篇筆記.

另有筆記個別紀錄 [[Java Jackson Serialize|Jackson]] 和 [[Java Gson Serialize|Gson]] 介紹和使用,
本篇著重兩個的比較, 包括功能異同 / 效能資訊 / 開發的坑等等...

## Conclusion

先說結論, 團隊最終選擇 **Gson**. 和功能效能等其他原因無關, 單純因為既有專案中, 使用 Gson 的較多.

團隊運行決策中, 很多考量無法僅參考客觀因素, 各種主觀意見和歷史背景都會影響討論決策.

**沒有對錯, 都是取捨.**

## 註解對照表

| 功能 | Jackson | Gson |
|------|---------|------|
| 字段重命名 | `@JsonProperty("new_name")` | `@SerializedName("new_name")` |
| 字段別名 | `@JsonAlias({"name1", "name2"})` | 不支援 |
| 忽略字段 | `@JsonIgnore` | `@Expose` 配合 `excludeFieldsWithoutExposeAnnotation()` |
| 日期格式 | `@JsonFormat(pattern="yyyy-MM-dd")` | `@JsonAdapter` 或 `GsonBuilder.setDateFormat()` |
| 屬性展開 | `@JsonUnwrapped` | 不支援 |
| 條件序列化 | `@JsonInclude(JsonInclude.Include.NON_NULL)` | `@Expose` |

## 功能比較

### 別名支援 (Alias)

**Jackson** 支援多個別名：
```java
public class User {
    @JsonAlias({"user_name", "username", "name"})
    private String userName;
}
```

**Gson** 不支援多別名，需要自訂 Deserializer。

### 屬性展開 (JsonUnwrapped)

**Jackson** 支援屬性展開：
```java
public class User {
    private String name;
    
    @JsonUnwrapped
    private Address address;  // address 的屬性會直接展開到 User 層級
}
```

**Gson** 不支援內建的屬性展開功能。

## 效能比較

### 序列化效能
- **Jackson**：在大多數情況下較快，特別是處理大型物件時
- **Gson**：在小型物件或簡單結構時效能相當

### 記憶體使用
- **Jackson**：較高的記憶體使用量
- **Gson**：較低的記憶體使用量

## 使用場景建議

### 選擇 Jackson 的情況
- Spring Boot 專案（內建支援）
- 需要高效能的序列化
- 需要豐富的註解功能
- 處理複雜的 JSON 結構
- 需要支援多種數據格式（JSON、XML、YAML）

### 選擇 Gson 的情況
- 簡單的 JSON 處理需求
- 對記憶體使用有嚴格要求
- 需要簡潔的 API
- 既有專案已使用 Gson
- Android 開發（Google 官方推薦）

## See Also

- [@JsonProperty和@SerializedName对比\_@serializedname @jsonproperty-CSDN博客](https://blog.csdn.net/VIP_WangSai/article/details/103295717)
-
