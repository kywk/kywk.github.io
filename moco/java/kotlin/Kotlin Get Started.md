---
title: Kotlin Get Started
description: Kotlin 入門指南
tags:
  - Kotlin
  - Java
  - Beginner
date_created: 2024-02-13T00:00:00.000Z
date_updated: 2025-01-06T00:00:00.000Z
slug: /java/kotlin/kotlin-get-started/
---

# Kotlin 入門指南

## 什麼是 Kotlin

Kotlin 是由 JetBrains 開發的現代化程式語言，可以在 JVM、Android、瀏覽器和原生平台上運行。Kotlin 與 Java 完全相容，可以與現有的 Java 代碼庫無縫整合。

### 主要特色

- **簡潔語法**：比 Java 更簡潔的語法
- **Null 安全**：編譯時期預防 NullPointerException
- **函數式程式設計**：支援函數式程式設計範式
- **協程 (Coroutines)**：內建非同步程式設計支援
- **Java 相容**：100% 與 Java 相容
- **多平台**：支援 JVM、Android、JavaScript、Native

## 環境設定

### 必要工具

1. **JDK 8 或更高版本**
2. **IntelliJ IDEA**（內建 Kotlin 支援）
3. **Maven 或 Gradle**

### Maven 專案設定

```xml
<properties>
    <kotlin.version>1.9.22</kotlin.version>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
</properties>

<dependencies>
    <dependency>
        <groupId>org.jetbrains.kotlin</groupId>
        <artifactId>kotlin-stdlib</artifactId>
        <version>${kotlin.version}</version>
    </dependency>
</dependencies>

<build>
    <sourceDirectory>src/main/kotlin</sourceDirectory>
    <testSourceDirectory>src/test/kotlin</testSourceDirectory>
    
    <plugins>
        <plugin>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-maven-plugin</artifactId>
            <version>${kotlin.version}</version>
            <executions>
                <execution>
                    <id>compile</id>
                    <goals>
                        <goal>compile</goal>
                    </goals>
                </execution>
                <execution>
                    <id>test-compile</id>
                    <goals>
                        <goal>test-compile</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

## Kotlin 基礎語法

### 變數宣告

```kotlin
// 不可變變數
val name = "John"  // 型別推導
val age: Int = 25  // 明確指定型別

// 可變變數
var count = 0
count = 10  // 可以修改

// Null 安全
var nullable: String? = null  // 可為 null
var nonNull: String = "Hello" // 不可為 null
```

### 函數定義

```kotlin
// 基本函數
fun greet(name: String): String {
    return "Hello, $name!"
}

// 單行函數
fun add(a: Int, b: Int) = a + b

// 預設參數
fun greet(name: String = "World") = "Hello, $name!"

// 高階函數
fun calculate(x: Int, y: Int, operation: (Int, Int) -> Int): Int {
    return operation(x, y)
}

// 使用範例
val result = calculate(5, 3) { a, b -> a * b }
```

### 類別和物件

```kotlin
// 資料類別
data class Person(val name: String, val age: Int)

// 一般類別
class User(val username: String) {
    var email: String = ""
    
    fun login() {
        println("$username logged in")
    }
}

// 繼承
open class Animal(val name: String) {
    open fun makeSound() {
        println("Some sound")
    }
}

class Dog(name: String) : Animal(name) {
    override fun makeSound() {
        println("Woof!")
    }
}
```

## Kotlin 與 Java 整合

### 在 Java 中使用 Kotlin

```kotlin
// Kotlin 類別
class KotlinService {
    fun processData(data: String): String {
        return data.uppercase()
    }
}
```

```java
// Java 中使用
public class JavaClient {
    public static void main(String[] args) {
        KotlinService service = new KotlinService();
        String result = service.processData("hello");
        System.out.println(result); // HELLO
    }
}
```

### 在 Kotlin 中使用 Java

```java
// Java 類別
public class JavaUtil {
    public static String formatMessage(String message) {
        return "[INFO] " + message;
    }
}
```

```kotlin
// Kotlin 中使用
fun main() {
    val message = JavaUtil.formatMessage("Hello from Kotlin")
    println(message) // [INFO] Hello from Kotlin
}
```

## Spring Boot 與 Kotlin

### 專案設定

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.jetbrains.kotlin</groupId>
        <artifactId>kotlin-reflect</artifactId>
    </dependency>
    <dependency>
        <groupId>org.jetbrains.kotlin</groupId>
        <artifactId>kotlin-stdlib-jdk8</artifactId>
    </dependency>
</dependencies>
```

### Kotlin Spring Boot 範例

```kotlin
@SpringBootApplication
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}

@RestController
class HelloController {
    
    @GetMapping("/hello")
    fun hello(@RequestParam name: String = "World"): String {
        return "Hello, $name!"
    }
    
    @PostMapping("/users")
    fun createUser(@RequestBody user: User): ResponseEntity<User> {
        // 處理邏輯
        return ResponseEntity.ok(user)
    }
}

data class User(
    val id: Long? = null,
    val name: String,
    val email: String
)
```

## 學習資源

### 官方資源
- [Kotlin 官方文件](https://kotlinlang.org/docs/)
- [Kotlin Playground](https://play.kotlinlang.org/) - 線上編譯器

### 中文教學
- [遠征 Kotlin × Spring Boot 系列](https://ithelp.ithome.com.tw/users/20119569/ironman/2159) - iThome 鐵人賽

### 學習清單

- [ ] [遠征 Kotlin × Spring Boot 前言](https://ithelp.ithome.com.tw/articles/10233414)
- [x] [遠征預備 Kotlin × 開發環境介紹](https://ithelp.ithome.com.tw/articles/10235427) ✅ 2024-02-13
- [ ] [遠征 Kotlin × 變數型別](https://ithelp.ithome.com.tw/articles/10235987)
