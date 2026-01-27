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
slug: /java/spring-boot/spring-boot-dockerize/
---

# Spring Boot Docker 容器化

## 概述

將 Spring Boot 應用程式容器化有多種方式，每種方式都有其優缺點和適用場景。本文將介紹三種主要的容器化方法，並提供最佳實踐建議。

## 容器化方法比較

| 方法 | 優點 | 缺點 | 適用場景 |
|------|------|------|----------|
| 原始碼容器化 | CI/CD 環境無需 JDK | 容器大、安全性低 | 開發測試環境 |
| JAR 容器化 | 容器小、安全性高 | 需要本地 JDK 環境 | 手動部署 |
| 多階段建置 | 兼具前兩者優點 | 建置時間較長 | 生產環境推薦 |

## 方法一：原始碼容器化

### Dockerfile

```dockerfile
FROM eclipse-temurin:17-jdk
WORKDIR /app
 
# 複製 Maven 包裝器和配置檔案
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# 下載依賴（利用 Docker 層快取）
RUN ./mvnw dependency:go-offline
 
# 複製原始碼
COPY src ./src
 
# 暴露埠號
EXPOSE 8080

# 啟動應用程式
CMD ["./mvnw", "spring-boot:run"]
```

### 建置和執行

```bash
# 建置映像檔
docker build -t spring-boot-source .

# 執行容器
docker run -p 8080:8080 spring-boot-source
```

### 優缺點分析

**優點：**
- CI/CD 環境無需安裝 JDK
- 完整的編譯環境
- 適合開發和測試

**缺點：**
- 容器映像檔較大（包含完整 JDK 和原始碼）
- 安全性較低（原始碼暴露）
- 不適合生產環境

## 方法二：JAR 容器化

### 本地建置 JAR

```bash
# 建置 JAR 檔案
./mvnw clean package -DskipTests
```

### Dockerfile

```dockerfile
FROM eclipse-temurin:17-jre-alpine

# 建立非 root 使用者
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# 設定工作目錄
WORKDIR /app

# 複製 JAR 檔案
COPY target/*.jar app.jar

# 變更檔案擁有者
RUN chown appuser:appgroup app.jar

# 切換到非 root 使用者
USER appuser

# 暴露埠號
EXPOSE 8080

# 設定 JVM 參數和啟動應用程式
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
```

### 建置和執行

```bash
# 建置映像檔
docker build -t spring-boot-jar .

# 執行容器
docker run -p 8080:8080 spring-boot-jar
```

### 優缺點分析

**優點：**
- 容器映像檔較小（僅包含 JRE 和 JAR）
- 安全性較高（無原始碼）
- 啟動速度快

**缺點：**
- 需要本地 JDK 環境
- CI/CD 環境配置複雜
- 依賴本地建置環境

## 方法三：多階段建置（推薦）

### Dockerfile

```dockerfile
# 第一階段：建置階段
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /workspace/app

# 複製 Maven 包裝器和配置
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# 下載依賴
RUN ./mvnw dependency:go-offline

# 複製原始碼並建置
COPY src src
RUN ./mvnw clean package -DskipTests

# 解壓 JAR 檔案以優化層結構
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

# 第二階段：執行階段
FROM eclipse-temurin:17-jre-alpine

# 安裝必要工具和建立使用者
RUN apk add --no-cache curl && \
    addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

WORKDIR /app

# 從建置階段複製檔案（分層複製以優化快取）
ARG DEPENDENCY=/workspace/app/target/dependency
COPY --from=builder ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=builder ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=builder ${DEPENDENCY}/BOOT-INF/classes /app

# 變更檔案擁有者
RUN chown -R appuser:appgroup /app

# 切換到非 root 使用者
USER appuser

# 暴露埠號
EXPOSE 8080

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# 啟動應用程式
ENTRYPOINT ["java", "-cp", "app:app/lib/*", "com.example.demo.DemoApplication"]
```

### 優化版本（使用 Spring Boot 2.3+ 的分層功能）

```dockerfile
# 建置階段
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw dependency:go-offline

COPY src src
RUN ./mvnw clean package -DskipTests
RUN java -Djarmode=layertools -jar target/*.jar extract

# 執行階段
FROM eclipse-temurin:17-jre-alpine

RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

WORKDIR /app
USER appuser

# 分層複製（按變更頻率排序）
COPY --from=builder workspace/app/dependencies/ ./
COPY --from=builder workspace/app/spring-boot-loader/ ./
COPY --from=builder workspace/app/snapshot-dependencies/ ./
COPY --from=builder workspace/app/application/ ./

EXPOSE 8080
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
```

### 建置和執行

```bash
# 建置映像檔
docker build -t spring-boot-multistage .

# 執行容器
docker run -p 8080:8080 spring-boot-multistage
```

## Docker Compose 配置

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/myapp
      - SPRING_DATASOURCE_USERNAME=myuser
      - SPRING_DATASOURCE_PASSWORD=mypassword
    depends_on:
      - db
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

## 最佳實踐

### 1. 安全性

```dockerfile
# 使用非 root 使用者
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup
USER appuser

# 使用最小化基礎映像檔
FROM eclipse-temurin:17-jre-alpine

# 定期更新基礎映像檔
RUN apk update && apk upgrade
```

### 2. 效能優化

```dockerfile
# JVM 調優
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC -XX:+UseContainerSupport"

# 啟動參數
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

### 3. 監控和日誌

```yaml
# docker-compose.yml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.app.rule=Host(`myapp.local`)"
```

### 4. 環境配置

```bash
# .env 檔案
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=jdbc:postgresql://db:5432/myapp
REDIS_URL=redis://redis:6379
JWT_SECRET=your-secret-key
```

## 部署腳本

### deploy.sh

```bash
#!/bin/bash

set -e

echo "Building Spring Boot application..."
docker build -t myapp:latest .

echo "Stopping existing containers..."
docker-compose down

echo "Starting new containers..."
docker-compose up -d

echo "Waiting for application to start..."
sleep 30

echo "Checking application health..."
if curl -f http://localhost:8080/actuator/health; then
    echo "Application deployed successfully!"
else
    echo "Application deployment failed!"
    docker-compose logs app
    exit 1
fi
```

## 故障排除

### 常見問題

1. **容器啟動失敗**
   ```bash
   # 檢查日誌
   docker logs <container-id>
   
   # 進入容器除錯
   docker exec -it <container-id> /bin/sh
   ```

2. **記憶體不足**
   ```dockerfile
   # 限制 JVM 記憶體使用
   ENV JAVA_OPTS="-Xmx512m -XX:+UseContainerSupport"
   ```

3. **網路連線問題**
   ```bash
   # 檢查網路配置
   docker network ls
   docker network inspect <network-name>
   ```

### 除錯技巧

```bash
# 檢查容器資源使用
docker stats

# 檢查容器詳細資訊
docker inspect <container-id>

# 即時查看日誌
docker logs -f <container-id>
```


See Also
--------

- [9 Tips for Containerizing Your Spring Boot Code | Docker](https://www.docker.com/blog/9-tips-for-containerizing-your-spring-boot-code/)
- [Getting Started | Spring Boot Docker](https://spring.io/guides/topicals/spring-boot-docker/)
- [Multi-stage builds][Multi-stage builds]



[Multi-stage builds]: https://docs.docker.com/build/building/multi-stage/
