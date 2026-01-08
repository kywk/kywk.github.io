---
title: Docker CLI Snippets
description: Docker command snippets
tags:
  - Docker
hide_table_of_contents: false
date_created: 2023-01-04T00:00:00.000Z
date_updated: 2023-01-04T00:00:00.000Z
image: >
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /devsecops/docker/docker-cli-snippets/
---

# Docker CLI 指令集合

Docker 常用指令和技巧集合，涵蓋容器管理、鏡像操作和網路配置等常用場景。

## 容器管理

### 容器生命週期
```bash
# 運行容器
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
docker run -d --name myapp nginx:alpine

# 停止容器
docker stop CONTAINER_ID
docker stop myapp

# 啟動容器
docker start CONTAINER_ID
docker start myapp

# 重啟容器
docker restart CONTAINER_ID

# 刪除容器
docker rm CONTAINER_ID
docker rm -f myapp  # 強制刪除運行中的容器
```

### 容器查詢
```bash
# 列出所有容器
docker ps -a

# 列出運行中的容器
docker ps

# 查看容器詳細資訊
docker inspect CONTAINER_ID

# 查看容器日誌
docker logs CONTAINER_ID
docker logs -f --tail 100 CONTAINER_ID  # 即時追蹤日誌

# 查看容器資源使用
docker stats CONTAINER_ID
docker stats --no-stream  # 不持續更新
```

### 容器互動
```bash
# 進入容器
docker exec -it CONTAINER_ID /bin/bash
docker exec -it CONTAINER_ID /bin/sh  # Alpine Linux

# 執行單一指令
docker exec CONTAINER_ID ls -la /app

# 附加到運行中的容器
docker attach [OPTIONS] CONTAINER
```

**附加模式控制鍵**：
- `CTRL-C` 發送 **SIGINT** 信號給容器
- `CTRL-P CTRL-Q` 鍵序列分離容器（不停止）

## 鏡像管理

### 鏡像操作
```bash
# 列出本地鏡像
docker images
docker image ls

# 搜尋鏡像
docker search nginx

# 下載鏡像
docker pull nginx:alpine
docker pull ubuntu:20.04

# 刪除鏡像
docker rmi IMAGE_ID
docker rmi nginx:alpine

# 刪除所有未使用的鏡像
docker image prune
docker image prune -a  # 包括所有未使用的鏡像
```

### 鏡像建置
```bash
# 從 Dockerfile 建置鏡像
docker build -t myapp:latest .
docker build -t myapp:v1.0 -f Dockerfile.prod .

# 從容器建立鏡像
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
docker commit -m "Added new feature" myapp myapp:v1.1

# 標記鏡像
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
docker tag myapp:latest myregistry.com/myapp:latest
```

### 鏡像傳輸
```bash
# 上傳鏡像
docker push myregistry.com/myapp:latest

# 匯出鏡像為檔案
docker save -o myapp.tar myapp:latest
docker save myapp:latest | gzip > myapp.tar.gz

# 從檔案載入鏡像
docker load -i myapp.tar
docker load < myapp.tar.gz
```

## 網路與儲存

### 網路配置
```bash
# 埠號映射
docker run -p 8080:80 nginx  # 本地 8080 映射到容器 80
docker run -p 127.0.0.1:8080:80 nginx  # 指定 IP

# 網路模式
docker run --network host nginx  # 使用主機網路
docker run --network none nginx  # 無網路連線

# 自定義網路
docker network create mynetwork
docker run --network mynetwork nginx

# 網路管理
docker network ls
docker network inspect mynetwork
docker network rm mynetwork
```

### 儲存映射
```bash
# 目錄映射
docker run -v /host/path:/container/path nginx
docker run -v $(pwd):/app node:alpine

# 命名卷
docker volume create myvolume
docker run -v myvolume:/data nginx

# 卷管理
docker volume ls
docker volume inspect myvolume
docker volume rm myvolume
docker volume prune  # 清理未使用的卷
```

## 實用指令組合

### 開發環境
```bash
# Node.js 開發環境
docker run -it --rm \
  -v $(pwd):/app \
  -w /app \
  -p 3000:3000 \
  node:alpine sh

# Python 開發環境
docker run -it --rm \
  -v $(pwd):/workspace \
  -w /workspace \
  python:3.9-slim bash

# 資料庫連線
docker run -it --rm \
  --network host \
  mysql:8.0 mysql -h localhost -u root -p
```

### 測試與除錯
```bash
# 快速測試容器
docker run --rm nginx:alpine nginx -t  # 測試配置

# 檢查容器內部狀態
docker exec CONTAINER_ID ps aux
docker exec CONTAINER_ID netstat -tuln
docker exec CONTAINER_ID df -h

# 複製檔案
docker cp CONTAINER_ID:/path/to/file ./local/path
docker cp ./local/file CONTAINER_ID:/path/to/destination
```

### 清理與維護
```bash
# 清理停止的容器
docker container prune

# 清理未使用的鏡像
docker image prune -a

# 清理未使用的網路
docker network prune

# 清理未使用的卷
docker volume prune

# 一鍵清理所有未使用資源
docker system prune -a --volumes

# 查看空間使用
docker system df
```

## See Also

- [[Mac Docker CLI]] - macOS 上使用 Docker CLI
- [[Awesome CLI]] - 現代化 CLI 工具集合
- [Docker 官方文檔](https://docs.docker.com/)
- [Docker Compose 指令參考](https://docs.docker.com/compose/reference/)