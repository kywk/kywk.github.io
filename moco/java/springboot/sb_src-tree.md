---
title: SrcTree Structure
description: "Spring Boot: Code & Folder Structure"
tags:
  - SpringBoot
  - Beginner
sidebar_position: 10
hide_table_of_contents: true
date_created: 2023-03-15
date_updated: 2023-03-15
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[SpringBoot] Project Source Tree Structure
==========================================

SpringBoot 應用程式開發依靠 Spring Framework Annotation 自動找尋載入各個功能元件與定義設定. 

```java title="Application.java"
@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
```

Spring 的進入點就如上面這段 code `@SpringBootApplication` 這個 annotation 是一堆 annotation 的綜合體.
預設所有的 `Controller`, `Model`, `Service` 等等 Spring 相關的 annotation 只能使用在與__進入點同目錄或子目錄__下, 才能被 Spring 給掃描到.

因為 Spring 框架會自動掃描, 所以專案目錄結構反而沒有特別規定或制式結構. 
而專案開發管理上, 通常有兩種方式:


By feature
----------

In this approach, all classes pertaining to a certain feature are placed in the same package. 
The structure by feature looks is shown in below example:

```
com
 +- gfg
     +- demo
         +- MyApplication.java
         |
         +- customer
         |   +- Customer.java
         |   +- CustomerController.java
         |   +- CustomerService.java
         |   +- CustomerRepository.java
         |
         +- order
             +- Order.java
             +- OrderController.java
             +- OrderService.java
             +- OrderRepository.java
```
The advantages of this structure is as follows: 

- Find a class to be modified is easy.
- By deleting a particular sub-package, all the classes related to a certain feature can be deleted.
- Testing and Refactoring is easy.
- Features can be shipped separately.


By Layer
--------

Another way to place the classes is by layer i.e; all controllers can be placed in controllers package and services under services package and all entities under domain or model etc.

```
com
 +- gfg
     +- demo
         +- MyApplication.java
         |
         +- domain
         |   +- Customer.java
         |   +- Order.java
         |
         +- controllers
         |     +- OrderController.java
         |   +- CustomerController.java
         |
         +- services
         |    +- CustomerService.java
         |    +- OrderService.java
         |
         +- repositories
              +- CustomerRepository.java
              +- OrderRepository.java    
```              
Though the above structure looks feasible and easy to locate classes by a layer. 
It has few disadvantages when compared to Structure by Feature. 

- Features or Modules cannot be shipped separately.
- Hard to locate a class pertaining to a certain feature.
- Code Refactoring on a certain feature is difficult since the feature classes located in every layer.


Summary
-------

相對於其他框架常見會用 controller / model / middleware / ... 等來設計專案目錄結構, 
在 Spring Boot 下, 若功能耦合性低, 依各功能需求來設計專案目錄結構, 似乎是更適合的方式.



See Also
--------

- [Spring Boot - Code Structure - GeeksforGeeks](https://www.geeksforgeeks.org/spring-boot-code-structure/)
- [Spring Boot Project - Code & Folder Structure and Best Practices](https://studygyaan.com/spring-boot/spring-boot-project-folder-structure-and-best-practices)

