---
title: Get Started
description: 'Java: Get Started'
tags:
  - Java
  - Beginner
hide_table_of_contents: true
date_created: 2023-02-24T00:00:00.000Z
date_updated: 2023-02-24T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/java-get-started/
---

# Java 開發入門指南

## 什麼是 Java

Java 是一種跨平台的物件導向程式語言，由 Sun Microsystems（現為 Oracle）開發。Java 的核心理念是「一次編寫，到處執行」（Write Once, Run Anywhere），這使得 Java 成為企業級應用開發的首選語言之一。

### 主要特色

- **跨平台性**：透過 Java 虛擬機器（JVM）實現跨平台執行
- **物件導向**：完全的物件導向程式設計語言
- **記憶體管理**：自動垃圾回收機制
- **安全性**：內建安全機制和沙箱模式
- **豐富的生態系統**：龐大的函式庫和框架支援
- **企業級支援**：廣泛應用於企業級應用開發

## 開發環境準備

### 必要工具

1. **Java 開發工具包（JDK）**
   - 推薦使用 [[OpenJDK]] - 開源且免費的 Java 實作
   - 建議版本：Java 17 LTS 或 Java 21 LTS

2. **建置工具**
   - [[Apache Maven]] - 專案管理和建置工具
   - 或 Gradle - 現代化的建置自動化工具

3. **整合開發環境（IDE）**
   - IntelliJ IDEA（推薦）
   - Eclipse
   - Visual Studio Code + Java Extension Pack

### 快速安裝（macOS）

```bash
# 安裝 OpenJDK
brew install openjdk@17

# 安裝 Maven
brew install maven

# 驗證安裝
java -version
mvn -version
```

### 快速安裝（Windows）

```powershell
# 使用 Chocolatey
choco install openjdk17
choco install maven

# 或使用 Scoop
scoop install openjdk17
scoop install maven
```

## 第一個 Java 程式

### Hello World 範例

```java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### 編譯和執行

```bash
# 編譯
javac HelloWorld.java

# 執行
java HelloWorld
```

## Maven 專案結構

### 建立新專案

```bash
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=my-app \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false
```

### 標準目錄結構

```
my-app/
├── pom.xml
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/example/
    │   │       └── App.java
    │   └── resources/
    └── test/
        └── java/
            └── com/example/
                └── AppTest.java
```

### 基本 pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

## Java 基礎語法

### 變數和資料型別

```java
// 基本資料型別
int age = 25;
double price = 99.99;
boolean isActive = true;
char grade = 'A';

// 參考型別
String name = "John Doe";
Integer count = 100;

// 陣列
int[] numbers = {1, 2, 3, 4, 5};
String[] names = new String[3];
```

### 控制結構

```java
// 條件判斷
if (age >= 18) {
    System.out.println("成年人");
} else {
    System.out.println("未成年");
}

// 迴圈
for (int i = 0; i < 5; i++) {
    System.out.println("Count: " + i);
}

// 增強型 for 迴圈
for (String name : names) {
    System.out.println(name);
}

// while 迴圈
while (count > 0) {
    count--;
}
```

### 方法定義

```java
public class Calculator {
    
    // 靜態方法
    public static int add(int a, int b) {
        return a + b;
    }
    
    // 實例方法
    public double multiply(double x, double y) {
        return x * y;
    }
    
    // 方法重載
    public int add(int a, int b, int c) {
        return a + b + c;
    }
}
```

## 物件導向程式設計

### 類別和物件

```java
public class Person {
    // 屬性
    private String name;
    private int age;
    
    // 建構子
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Getter 和 Setter
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        this.age = age;
    }
    
    // 方法
    public void introduce() {
        System.out.println("我是 " + name + "，今年 " + age + " 歲");
    }
}
```

### 繼承

```java
public class Student extends Person {
    private String studentId;
    
    public Student(String name, int age, String studentId) {
        super(name, age);  // 呼叫父類別建構子
        this.studentId = studentId;
    }
    
    @Override
    public void introduce() {
        super.introduce();
        System.out.println("學號：" + studentId);
    }
}
```

## 常用 Maven 指令

```bash
# 編譯專案
mvn compile

# 執行測試
mvn test

# 打包專案
mvn package

# 清理專案
mvn clean

# 安裝到本地倉庫
mvn install

# 執行應用程式
mvn exec:java -Dexec.mainClass="com.example.App"
```

## 下一步學習

完成基本 Java 學習後，可以繼續學習：

1. **進階 Java 特性**
   - 泛型（Generics）
   - Lambda 表達式
   - Stream API
   - 多執行緒程式設計

2. **Java 框架**
   - [[Spring Boot Get Started|Spring Boot]] - 企業級應用框架
   - Hibernate - ORM 框架
   - JUnit - 測試框架

3. **資料庫整合**
   - JDBC
   - JPA/Hibernate
   - Spring Data

4. **Web 開發**
   - Servlet/JSP
   - Spring MVC
   - RESTful API 開發

## 學習資源

### 官方文件
- [Oracle Java Documentation](https://docs.oracle.com/en/java/)
- [OpenJDK Documentation](https://openjdk.org/)

### 線上教學
- [Oracle Java Tutorials](https://docs.oracle.com/javase/tutorial/)
- [Codecademy Java Course](https://www.codecademy.com/learn/learn-java)
- [Java | The Will Will Web](https://blog.miniasp.com/category/Java)

### 書籍推薦
- "Effective Java" by Joshua Bloch
- "Java: The Complete Reference" by Herbert Schildt
- "Head First Java" by Kathy Sierra

