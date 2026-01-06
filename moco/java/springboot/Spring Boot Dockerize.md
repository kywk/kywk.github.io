---
title: Dockerize
description: Dockerize Spring Boot application
tags:
  - SpringBoot
  - Docker
sidebar_position: 80
hide_table_of_contents: true
date_created: 2023-03-14T00:00:00.000Z
date_updated: 2023-03-14T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /java/springboot/spring-boot-dockerize/
---

[SpringBoot] Dockerize Spring Boot Application
==============================================

建立 Sprint Boot Application Container 不外乎兩種方式:
1. 把原始碼放入 container, 透過 mvn 在 container 跑.
2. 把 Sprint Boot 編譯成 .jar 檔後放入 Container, 透過 Java 來執行.


Run w/ Java source
------------------

```dockerfile
FROM eclipse-temurin
WORKDIR /app
 
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
 
COPY src ./src
 
CMD ["./mvnw", "spring-boot:run"]
```

這個 Dockerfile 把 source code 打包進 container 初始化專案檔案後,
透過 mvn 來編譯與啟動 sprint boot application.

這樣的 image 需要把完整編譯環境和程式都放入 container 中,
優點是若 CI/CD 環境中沒有 JDK 環境, 仍可編譯出可以正常執行的 Spring Boot container.

但一般來說, 除非部屬執行 container 環境都是自家控管的, 否則不會採用這種方式.
畢竟 container 中檔案是無法被保護, 原始碼放入 container 部屬出去, 等於程式裸奔在外.
若程式有重要商務邏輯或加解密資訊, 是相當危險的.

Ref: [Build & Deploy a Spring Boot application in Docker container | by Dhruv Saksena | Medium](https://dhruv-saksena.medium.com/build-deploy-a-spring-boot-application-in-docker-container-49b9b2d3e25e)


Run w/ JAR binary
-----------------

```dockerfile
FROM openjdk:11-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

```shell
mvn install dockerfile:build
```

相對於前者, 這個方式是先把 Java 編譯成 JAR 檔, 
需準備基本的 Java runtime container, 
把 JAR 放入 container 中即可執行. 

若要部屬到外部環境, 編譯後的 binary 較不容易被破解.

但若要在 CI/CD 中打包 container, 則需確定 CI/CD runner 上是正確對應 JDK 版本.
可能不同專案使用了不同 JDK 或 mvn 版本, 造成 CI/CD 設定上的複雜或出錯.

不考慮 CI/CD 情況, 由 develop 手動 build docker image 的話, 這是適合的方式.


Multi-Stage Build
-----------------

> [Multi-stage builds][Multi-stage builds] are useful to anyone who has struggled to optimize 
> __Dockerfiles__ while keeping them easy to read and maintain.

Docker 支援 Multi-Stage Build, 可以把不同階段的需求拆開到在不同 docker 中執行,
再把最終需要部署的檔案分別複製到一個 docker.

常見是透過有完整開發環境的 container 來編譯程式,
再把編譯後的程式放到最基本的執行環境中發佈.

```dockerfile
FROM eclipse-temurin:17-jdk-alpine as build
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN ./mvnw install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","hello.Application"]
```

以這個例子來說, 先建立了 builder 這個 container, 
把專案設定和原始程式檔都複製進 builder 中進行專案初始化和編譯.

再建立一個基本的執行環境 container, 
把 builder 中所編譯的 JAR 和相關環境檔案複製過來.

如此一來, 用來部署的 container 裡面只會有 JAR binary, 可避免資安問題.
在 CI/CD 流程時, 編譯 JAR 是在 docker 中被執行, 亦可避免環境設定問題造成的錯誤.

可說是集前兩個方式的優點於一身的方式.

Ref: [Build, Package, and Run Spring Boot Apps With Docker - DZone](https://dzone.com/articles/build-package-and-run-spring-boot-apps-with-docker)


See Also
--------

- [9 Tips for Containerizing Your Spring Boot Code | Docker](https://www.docker.com/blog/9-tips-for-containerizing-your-spring-boot-code/)
- [Getting Started | Spring Boot Docker](https://spring.io/guides/topicals/spring-boot-docker/)
- [Multi-stage builds][Multi-stage builds]



[Multi-stage builds]: https://docs.docker.com/build/building/multi-stage/
