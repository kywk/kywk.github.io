---
title: From Scratch
description: 'Spring Boot: From Scratch'
tags:
  - SpringBoot
  - Beginner
sidebar_position: 20
date_created: 2023-02-24T00:00:00.000Z
date_updated: 2023-03-14T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[Spring Boot] Start from scratch
================================

Ref: [從無到有上手你的第一個 Spring Boot 應用程式 | The Will Will Web][From Scratch]

> Spring Boot 正在 Java 界颳起一陣旋風, Spring Boot 整合了一大堆好用的, 現成的套件, 
> 然後設計一些簡潔的程式架構, 搭配 IoC 與 AOP 大幅簡化開發的複雜度, 也減少了許多繁瑣的設定步驟.
> 
> 這篇文章大量抄襲 [從無到有上手你的第一個 Spring Boot 應用程式 | The Will Will Web][From Scratch]
> 手刻 Spring Boot 應用程式, 從無到有解剖整個開發與啟動過程.


Maven Project
-------------

> 在新資料夾進行 `mkdir sandbox/helloworld` 

### `pom.xml` for Apache Maven ###

``` xml title="pom.xml"
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.duotify</groupId>
    <artifactId>app1</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.9</version>
    </parent>

    <!-- Additional lines to be added here... -->

</project>
```
建立後執行 `mvn package` 就會產生 `target/app1-0.0.1-SNAPSHOT.jar` 檔案, 
不過這個檔案很小, 目前沒有什麼實質內容, 所以這個 jar 檔是沒有用的.

### Spring Boot Parent POM ###

剛剛的 `pom.xml` 檔案可以看到以下 `<parent>` 片段, 
明確的指定了一個名為 `spring-boot-starter-parent` 的 `Parent POM` 檔:
``` xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.7.9</version>
</parent>
```
Spring Boot 框架整理了許多 [Starters][Starters] 套件, 
可以大幅簡化在開發不同應用程式時的上手門檻.
而這份 `spring-boot-starter-parent POM` 檔裡面, 就定義了所有 [Starters][Starters] 套件的預設值.
雖然這些套件不一定會用到, 但是當需要用到的時候, 也不用花時間瞭解設定, 
因為 Spring Boot 已經全部把大多數人都會設定的屬性(Properties) / 套件版本(version) / 常用的 Plugins,
全部都寫在這份 Parent POM 檔中, 並自動繼承給 Spring Boot 專案.

可以從以下路徑找到 `spring-boot-starter-parent` 這個 POM 檔:
```
~/.m2/repository/org/springframework/boot/spring-boot-starter-parent/2.7.9/spring-boot-starter-parent-2.7.9.pom
```

### 加入套件相依性 ###

Spring Boot 就是一個 Java 應用程式, 應用程式所需參考到的那些 JARs 檔, 
完全可以透過 Maven 或 Gradle 來進行管裡.
以 Maven 為例, `spring-boot-starter-parent` 這個 POM 檔, 
透過 [Dependency Management](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.dependency-management) 機制,
預先定義好了會用到的相依套件, 也指定好了版本資訊.
所以在你專案下的 `pom.xml` 是不需要指定 `<version>` 版本資訊的,
直接使用 `groupId` 與 `<artifactId>` 就可以順利的載入相依套件.

> 這只是 Maven 的繼承效果, 想要自己決定想採用的版本, 還是可以加上 `<version>` 元素來指定版本.
> 不過最好思考一下為什麼要這麼做? 因為如果未來想要將 Spring Boot 升級版本時, 
> 只要調整一下 spring-boot-starter-parent 這個 Parent POM 的版本, 
> 所有「測試過的」相依套件就會一併升級到沒問題的版本, 自己指定套件版本反而是有升級風險的.

可以利用 `mvn dependency:tree` 查看專案的套件相依資訊, 
此時只會看到一個 `com.duotify:app1:jar:0.0.1-SNAPSHOT` 套件 (就是目前專案) 而已,
因為並沒有在 `pom.xml` 宣告使用任何相依套件:
```
mvn dependency:tree

[INFO] com.duotify:app1:jar:0.0.1-SNAPSHOT
```

要用 Spring 來開發 Web 的話 (包含 MVC 或 API 開發), 
一般會使用 `spring-boot-starter-web` 這個 Starters 套件,
只要加入 `spring-boot-starter-web` 到 `pom.xml` 之中即可:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```
> 同前, 一般來說不需要加上 `<version>` 元素, 
> 直接繼承使用 Parent POM 定義的版本才是最佳實務(Best Practices).

加完之後的 pom.xml 檔案內容如下:

``` xml title="pom.xml"
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.duotify</groupId>
    <artifactId>app1</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.3</version>
    </parent>

    <!-- Additional lines to be added here... -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

</project>
```

再執行一次 `mvn dependency:tree` 查看專案的套件相依資訊, 就會非常多了:
```
[INFO] com.duotify:app1:jar:0.0.1-SNAPSHOT
[INFO] \- org.springframework.boot:spring-boot-starter-web:jar:2.7.3:compile
[INFO]    +- org.springframework.boot:spring-boot-starter:jar:2.7.3:compile
[INFO]    |  +- org.springframework.boot:spring-boot:jar:2.7.3:compile
[INFO]    |  +- org.springframework.boot:spring-boot-autoconfigure:jar:2.7.3:compile
[INFO]    |  +- org.springframework.boot:spring-boot-starter-logging:jar:2.7.3:compile
[INFO]    |  |  +- ch.qos.logback:logback-classic:jar:1.2.11:compile
[INFO]    |  |  |  +- ch.qos.logback:logback-core:jar:1.2.11:compile
[INFO]    |  |  |  \- org.slf4j:slf4j-api:jar:1.7.36:compile
[INFO]    |  |  +- org.apache.logging.log4j:log4j-to-slf4j:jar:2.17.2:compile
[INFO]    |  |  |  \- org.apache.logging.log4j:log4j-api:jar:2.17.2:compile
[INFO]    |  |  \- org.slf4j:jul-to-slf4j:jar:1.7.36:compile
[INFO]    |  +- jakarta.annotation:jakarta.annotation-api:jar:1.3.5:compile
[INFO]    |  +- org.springframework:spring-core:jar:5.3.22:compile
[INFO]    |  |  \- org.springframework:spring-jcl:jar:5.3.22:compile
[INFO]    |  \- org.yaml:snakeyaml:jar:1.30:compile
[INFO]    +- org.springframework.boot:spring-boot-starter-json:jar:2.7.3:compile
[INFO]    |  +- com.fasterxml.jackson.core:jackson-databind:jar:2.13.3:compile
[INFO]    |  |  +- com.fasterxml.jackson.core:jackson-annotations:jar:2.13.3:compile
[INFO]    |  |  \- com.fasterxml.jackson.core:jackson-core:jar:2.13.3:compile
[INFO]    |  +- com.fasterxml.jackson.datatype:jackson-datatype-jdk8:jar:2.13.3:compile
[INFO]    |  +- com.fasterxml.jackson.datatype:jackson-datatype-jsr310:jar:2.13.3:compile
[INFO]    |  \- com.fasterxml.jackson.module:jackson-module-parameter-names:jar:2.13.3:compile
[INFO]    +- org.springframework.boot:spring-boot-starter-tomcat:jar:2.7.3:compile
[INFO]    |  +- org.apache.tomcat.embed:tomcat-embed-core:jar:9.0.65:compile
[INFO]    |  +- org.apache.tomcat.embed:tomcat-embed-el:jar:9.0.65:compile
[INFO]    |  \- org.apache.tomcat.embed:tomcat-embed-websocket:jar:9.0.65:compile
[INFO]    +- org.springframework:spring-web:jar:5.3.22:compile
[INFO]    |  \- org.springframework:spring-beans:jar:5.3.22:compile
[INFO]    \- org.springframework:spring-webmvc:jar:5.3.22:compile
[INFO]       +- org.springframework:spring-aop:jar:5.3.22:compile
[INFO]       +- org.springframework:spring-context:jar:5.3.22:compile
[INFO]       \- org.springframework:spring-expression:jar:5.3.22:compile
```

Hello World
-----------

### 第一支 Spring Boot 程式 ###

基本專案設定完成後, 撰寫第一支 Spring Boot Java 程式.
建立 `src/main/java/com/duotify/app1/MyApplication.java` 檔案.

```java title="helloworld.java"
package com.duotify.app1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class MyApplication {

    @RequestMapping("/")
    String home() {
        return "Hello World!";
    }

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }

}
```

> Spring Boot 框架設計上大量使用了依賴注入來減少程式耦合, 
> 程式中透過類別標注 (Annotations) 來提高程式可讀性之外, 
> 也讓 Spring Framework 透過 Component scanning 找到相對硬的服務.

類別上的 `@RestController` 標注 (Annotations), 
在 Spring 裡面又被稱為是一種 [Stereotype Annotations][Stereotype Annotations] (刻板印象標注).
這可以提高程式碼的可讀性, 讓熟悉Spring 框架的開發人員看到 `@RestController` 標注, 
就一目了然的知道這個類別其實就是一個支援 REST 功能的 Controller (控制器).
這樣的設計會讓開發人員自動形成一種刻板印象 (Stereotype), 看到這類標注就會自動識別這個類別的角色與用途,
猜想是官方所以用 `Stereotype` 這個單字的主因.

除此之外, [Stereotype Annotations][Stereotype Annotations] 還可以賦予「類別」一個角色,
讓 Spring Framework 可以透過 __Component scanning__ 快速的找到相對應的服務.
Spring 內建的 Stereotype Annotations 可以從 [org.springframework.stereotype][org.springframework.stereotype] 查閱,
基本上所有的 Stereotype Annotations 都會繼承自 `org.springframework.stereotype.Component` (`@Component`) 型別.

類別上的 `@EnableAutoConfiguration` 標注 (Annotations) 則會讓 Spring Boot 自動找出所有相依套件中 JAR 檔的類別,
並自動建立與註冊成 Spring Beans 元件, 讓 Spring Boot 可以在需要的時候使用這些可重複利用這些的 Spring Beans 元件.

- 在 `home()` 方法上的 `@RequestMapping("/")` 是定義控制器的路由, 決定網址的結構.

### 啟動 Spring Boot 網站

```bash
mvn spring-boot:run
```

![Spring Boot 啟動畫面](https://lh3.googleusercontent.com/pw/AMWts8D4tdVWZ3j0ck8hlwEXf8VNIWn4El6nxfurdO_MkAiHVEa5ELS_Cqtyon1GWxXulhqa_by3gGNfKvXLlPh-6QcP6CtmtoE1Qfe2kVqap5ymvhvqKvtDRcQd07lihcPcpQyeCtV-ARYOjBEp54IWRJBxXg=w786-no?authuser=0)

透過瀏覽器開啟 [http://localhost:8080/](http://localhost:8080/) 即可看到 "Hello World!" 訊息。

### 程式碼解析

#### @RestController 註解

`@RestController` 是 Spring 的 [Stereotype Annotations](https://github.com/spring-projects/spring-framework/wiki/Spring-Annotation-Programming-Model#stereotype-annotations)（刻板印象標注）之一。這個設計讓開發人員看到 `@RestController` 就能立即識別這是一個支援 REST 功能的控制器。

所有的 Stereotype Annotations 都繼承自 `@Component`，讓 Spring Framework 能透過 **Component Scanning** 自動找到並註冊這些服務。

#### @EnableAutoConfiguration 註解

這個註解讓 Spring Boot 自動掃描所有相依套件中的 JAR 檔案，並自動建立與註冊 Spring Beans 元件。這是 Spring Boot "約定優於配置" 理念的核心實現。

#### @RequestMapping 註解

`@RequestMapping("/")` 定義了控制器的路由規則，決定哪些 URL 會對應到這個方法。

## 打包與部署
----------------

### 打包應用程式 *.jar 檔 ###

現在執行 `mvn package` 封裝 `target/app1-0.0.1-SNAPSHOT.jar` 檔案的話, 檔案依然只有 `2.4KB` 而已.
因為目前只有打包 `MyApplication`, 並不包含 Tomcat 之類的套件, 還無法成為一個可以獨立運作的執行檔.

> Java 並沒有提供一種稱為 Nested JAR 的封裝方式, 也就是在一個 JAR 檔裡面包含其他需要用到的 JAR 檔.
> 所以如果要部署一個包含相依套件的應用程式, 就會需要部署好幾個檔案, 使用上較為不便.
> 想要發佈一個__自我包含所有 JAR 檔的 JAR 可執行檔(self-contained executable jar file)__, 
> 通常會把應用程式打包成俗稱 __ÜBER JAR__ 或 __FAT JAR__ 的格式. 
> 詳見 [The Executable Jar Format][The Executable Jar Format] 文件說明.

> Spring Boot 亦可打包成 Tomcat 所支援的 WAR 格式, 另篇討論.

若應用程式封裝打包的需求, 可透過 `spring-boot-maven-plugin` plugin 達成目的.
只要在專案的 `pom.xml` 加入以下設定即可:

``` xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```
加完之後的 `pom.xml` 檔案內容如下:

``` xml title="pom.xml"
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.duotify</groupId>
    <artifactId>app1</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.3</version>
    </parent>

    <!-- Additional lines to be added here... -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

理論上 `spring-boot-maven-plugin` plugin 還有 `<executions>` 與 `<configuration>` 需要設定才對. 
但是 Spring Boot 提供的 Parent POM 已經設定了這些內容, 所以才會看起來這麼簡單!

-   spring-boot-maven-plugin configuration

    `spring-boot-maven-plugin` plugin 完整的設定內容如下 (從 `spring-boot-starter-parent PQM` 取出):

    ```xml
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <executions>
        <execution>
          <id>repackage</id>
          <goals>
            <goal>repackage</goal>
          </goals>
        </execution>
      </executions>
      <configuration>
        <mainClass>${start-class}</mainClass>
      </configuration>
    </plugin>
    ```

加入 `spring-boot-maven-plugin` 敘述後執行 `mvn package` 封裝 `target/app1-0.0.1-SNAPSHOT.jar`,
這個時候檔案大小就有 `17MB` 了, 本身包含了 Tomcat 套件而且可以獨立運作執行.

![](https://lh3.googleusercontent.com/pw/AMWts8C76rdoJLWio6SFlSF4aIxYtL3UXsfeG18J1h3DES2rApe9X2iwEl3wz-yPKvw7CAsEmczO3FXxDsvFKE0cI4lEa503L3Re_oEAnZN0FXiRZaE5QloacYT5WiJnRiua-UeVTzeVP4O36OJdT8FRr_Tq0A=w588-no?authuser=0)

> 圖中的 `app1-0.0.1-SNAPSHOT.jar.original` 是應用程式原始的 JAR 檔, 
> 因為被 `spring-boot-maven-plugin` 執行過 `repackage` 目標(Goal),
> 所以在執行__重新封裝__(repackage)時加入了 Tomcat 進去.

執行 `java -jar target/app1-0.0.1-SNAPSHOT.jar`, 
Spring Boot 應用程式可以順利執行並啟動了! 👍

![](https://lh3.googleusercontent.com/pw/AMWts8DdYjyylcdsT3kcLsyTu6h0ZnMORyKKb_jnqVwdS2A7DQosd9JSaJnG5fuMSB02_CyTxDpmgbqaspJ19XTt1-Fo2719g5mRyXATkUjnicqlOh76Z5qvb6aSbhs3XdpwXVbncAVqd7NSuxpv9heLGGrGgw=w487-no?authuser=0)


### Docker ###

_See: [Containerizing Spring Boot Application](./misc_containerizing.md0)_


Summary
-------

Spring Boot 提供一套簡潔的架構, 可以快速完成任務. 
但是神奇的架構背後, 其實有很多值得探討的地方. 
越是抽絲剝繭釐清了背後的原理之後, 才有辦法舉一反三.
思考並在正確的時間點做出正確的技術決策.


See Also
--------

- [Getting Started | Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
- [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/index.html) 
  - [Getting Started](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html)
  - [The Executable Jar Format][The Executable Jar Format]
- [java - What is an uber jar? - Stack Overflow](https://stackoverflow.com/questions/11947037/what-is-an-uber-jar/39030649#39030649)
- [Spring Annotation Programming Model · spring-projects/spring-framework Wiki · GitHub](https://github.com/spring-projects/spring-framework/wiki/Spring-Annotation-Programming-Model)


[From Scratch]: https://blog.miniasp.com/post/2022/09/19/Spring-Boot-Quick-Start-From-Scratch
[Starters]: https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters
[Stereotype Annotations]: https://github.com/spring-projects/spring-framework/wiki/Spring-Annotation-Programming-Model#stereotype-annotations
[org.springframework.stereotype]: https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/stereotype/package-summary.html
[The Executable Jar Format]: https://docs.spring.io/spring-boot/docs/current/reference/html/executable-jar.html
