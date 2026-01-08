---
title: 'HomeLab Docker 環境建置指南'
description: 'HomeLab 環境中 Docker 容器化平台的完整建置和管理指南'
tags:
  - HomeLab
  - Docker
  - Containerization
  - Infrastructure
date_created: 2024-12-19T00:00:00.000Z
slug: /utilities/homelab/docker-setup-guide/
---

# HomeLab Docker 環境建置指南

Docker 是 HomeLab 環境中最重要的基礎設施之一，本指南提供完整的 Docker 環境建置、配置和管理方法。

## 為什麼選擇 Docker

### 優勢特點
- **隔離性**: 每個服務獨立運行，互不干擾
- **可移植性**: 一次配置，到處運行
- **資源效率**: 比虛擬機更輕量
- **版本管理**: 輕鬆升級和回滾
- **快速部署**: 幾分鐘內啟動複雜服務

### HomeLab 應用場景
- 媒體服務器 (Plex, Jellyfin)
- 網路服務 (Nginx, Pi-hole)
- 監控系統 (Prometheus, Grafana)
- 開發工具 (GitLab, Jenkins)
- 儲存服務 (Nextcloud, Syncthing)

## 系統需求與準備

### 硬體需求
- **CPU**: 2 核心以上 (推薦 4 核心)
- **記憶體**: 4GB 以上 (推薦 8GB+)
- **儲存**: 50GB 可用空間 (推薦 SSD)
- **網路**: 穩定的網路連線

### 支援的作業系統
- **Linux**: Ubuntu, Debian, CentOS, Arch
- **macOS**: Docker Desktop
- **Windows**: Docker Desktop (WSL2)

## Docker 安裝

### Ubuntu/Debian 安裝

```bash
# 更新套件列表
sudo apt update

# 安裝必要套件
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# 添加 Docker 官方 GPG 金鑰
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加 Docker 套件庫
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安裝 Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# 啟動並設定開機自動啟動
sudo systemctl start docker
sudo systemctl enable docker

# 將用戶加入 docker 群組
sudo usermod -aG docker $USER
```

### CentOS/RHEL 安裝

```bash
# 安裝必要套件
sudo yum install -y yum-utils

# 添加 Docker 套件庫
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安裝 Docker
sudo yum install docker-ce docker-ce-cli containerd.io

# 啟動服務
sudo systemctl start docker
sudo systemctl enable docker

# 將用戶加入 docker 群組
sudo usermod -aG docker $USER
```

### Arch Linux 安裝

```bash
# 安裝 Docker
sudo pacman -S docker docker-compose

# 啟動服務
sudo systemctl start docker
sudo systemctl enable docker

# 將用戶加入 docker 群組
sudo usermod -aG docker $USER
```

### macOS 安裝

1. 下載 [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
2. 安裝 .dmg 檔案
3. 啟動 Docker Desktop
4. 完成初始設定

## Docker Compose 安裝

### Linux 安裝

```bash
# 下載 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 設定執行權限
sudo chmod +x /usr/local/bin/docker-compose

# 驗證安裝
docker-compose --version
```

### 使用 pip 安裝

```bash
# 安裝 pip (如果尚未安裝)
sudo apt install python3-pip  # Ubuntu/Debian
sudo yum install python3-pip  # CentOS/RHEL

# 安裝 Docker Compose
pip3 install docker-compose

# 驗證安裝
docker-compose --version
```

## 基本配置

### Docker 守護程序配置

創建 `/etc/docker/daemon.json`:

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "dns": ["8.8.8.8", "1.1.1.1"],
  "default-address-pools": [
    {
      "base": "172.17.0.0/12",
      "size": 24
    }
  ]
}
```

重新啟動 Docker:
```bash
sudo systemctl restart docker
```

### 目錄結構規劃

建議的 HomeLab 目錄結構:

```
/opt/homelab/
├── docker-compose/
│   ├── media/
│   │   └── docker-compose.yml
│   ├── monitoring/
│   │   └── docker-compose.yml
│   ├── networking/
│   │   └── docker-compose.yml
│   └── storage/
│       └── docker-compose.yml
├── data/
│   ├── plex/
│   ├── grafana/
│   ├── prometheus/
│   └── nginx/
└── scripts/
    ├── backup.sh
    └── update.sh
```

創建目錄結構:
```bash
sudo mkdir -p /opt/homelab/{docker-compose/{media,monitoring,networking,storage},data,scripts}
sudo chown -R $USER:$USER /opt/homelab
```

## 網路配置

### 創建自定義網路

```bash
# 創建 HomeLab 專用網路
docker network create homelab-network --subnet=172.20.0.0/16

# 查看網路列表
docker network ls

# 檢查網路詳情
docker network inspect homelab-network
```

### 網路配置範例

```yaml
# docker-compose.yml 中的網路配置
version: '3.8'

networks:
  homelab:
    external: true
    name: homelab-network

services:
  service-name:
    image: image-name
    networks:
      - homelab
    # 其他配置...
```

## 儲存管理

### Docker Volumes

```bash
# 創建命名卷
docker volume create plex-config
docker volume create grafana-data

# 查看卷列表
docker volume ls

# 檢查卷詳情
docker volume inspect plex-config

# 清理未使用的卷
docker volume prune
```

### 綁定掛載 vs Docker Volumes

**綁定掛載** (適合配置檔案):
```yaml
volumes:
  - /opt/homelab/data/nginx:/etc/nginx/conf.d:ro
```

**Docker Volumes** (適合應用資料):
```yaml
volumes:
  - grafana-data:/var/lib/grafana
```

## 實用的 Docker Compose 範例

### 媒體服務器堆疊

```yaml
# /opt/homelab/docker-compose/media/docker-compose.yml
version: '3.8'

services:
  plex:
    image: plexinc/pms-docker:latest
    container_name: plex
    restart: unless-stopped
    ports:
      - "32400:32400"
    environment:
      - PLEX_CLAIM=claim-xxxxxxxxxxxx
      - PLEX_UID=1000
      - PLEX_GID=1000
    volumes:
      - plex-config:/config
      - /media/movies:/movies:ro
      - /media/tv:/tv:ro
    networks:
      - homelab

  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    restart: unless-stopped
    ports:
      - "8096:8096"
    environment:
      - JELLYFIN_PublishedServerUrl=http://jellyfin.local
    volumes:
      - jellyfin-config:/config
      - /media:/media:ro
    networks:
      - homelab

volumes:
  plex-config:
  jellyfin-config:

networks:
  homelab:
    external: true
```

### 監控服務堆疊

```yaml
# /opt/homelab/docker-compose/monitoring/docker-compose.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    ports:
      - "9090:9090"
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus-data:/prometheus
    networks:
      - homelab

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana-data:/var/lib/grafana
    networks:
      - homelab

  uptime-kuma:
    image: louislam/uptime-kuma:latest
    container_name: uptime-kuma
    restart: unless-stopped
    ports:
      - "3001:3001"
    volumes:
      - uptime-kuma-data:/app/data
    networks:
      - homelab

volumes:
  prometheus-data:
  grafana-data:
  uptime-kuma-data:

networks:
  homelab:
    external: true
```

### 網路服務堆疊

```yaml
# /opt/homelab/docker-compose/networking/docker-compose.yml
version: '3.8'

services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    container_name: nginx-proxy-manager
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "81:81"
    volumes:
      - npm-data:/data
      - npm-letsencrypt:/etc/letsencrypt
    networks:
      - homelab

  pihole:
    image: pihole/pihole:latest
    container_name: pihole
    restart: unless-stopped
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "8080:80"
    environment:
      - TZ=Asia/Taipei
      - WEBPASSWORD=admin123
      - DNS1=1.1.1.1
      - DNS2=8.8.8.8
    volumes:
      - pihole-etc:/etc/pihole
      - pihole-dnsmasq:/etc/dnsmasq.d
    networks:
      - homelab

volumes:
  npm-data:
  npm-letsencrypt:
  pihole-etc:
  pihole-dnsmasq:

networks:
  homelab:
    external: true
```

## 管理工具

### Portainer 安裝

```bash
# 創建 Portainer 資料卷
docker volume create portainer_data

# 部署 Portainer
docker run -d -p 8000:8000 -p 9443:9443 \
  --name portainer --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

訪問 `https://localhost:9443` 完成初始設定。

### Watchtower 自動更新

```yaml
# 添加到任何 docker-compose.yml
watchtower:
  image: containrrr/watchtower:latest
  container_name: watchtower
  restart: unless-stopped
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
  environment:
    - WATCHTOWER_CLEANUP=true
    - WATCHTOWER_SCHEDULE=0 0 4 * * *  # 每天凌晨 4 點檢查更新
  networks:
    - homelab
```

## 備份策略

### 資料備份腳本

```bash
#!/bin/bash
# /opt/homelab/scripts/backup.sh

BACKUP_DIR="/backup/docker"
DATE=$(date +%Y%m%d_%H%M%S)

# 創建備份目錄
mkdir -p "$BACKUP_DIR/$DATE"

# 停止容器 (可選)
# docker-compose -f /opt/homelab/docker-compose/media/docker-compose.yml stop

# 備份 Docker volumes
docker run --rm -v plex-config:/source -v "$BACKUP_DIR/$DATE":/backup \
  alpine tar czf /backup/plex-config.tar.gz -C /source .

docker run --rm -v grafana-data:/source -v "$BACKUP_DIR/$DATE":/backup \
  alpine tar czf /backup/grafana-data.tar.gz -C /source .

# 備份配置檔案
tar czf "$BACKUP_DIR/$DATE/docker-compose.tar.gz" /opt/homelab/docker-compose/

# 重新啟動容器
# docker-compose -f /opt/homelab/docker-compose/media/docker-compose.yml start

# 清理舊備份 (保留 7 天)
find "$BACKUP_DIR" -type d -mtime +7 -exec rm -rf {} +

echo "備份完成: $BACKUP_DIR/$DATE"
```

### 設定定期備份

```bash
# 設定 cron 任務
crontab -e

# 添加以下行 (每天凌晨 2 點備份)
0 2 * * * /opt/homelab/scripts/backup.sh
```

## 監控與日誌

### 容器健康檢查

```yaml
# 在 docker-compose.yml 中添加健康檢查
services:
  app:
    image: nginx:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### 日誌管理

```bash
# 查看容器日誌
docker logs container-name
docker logs -f container-name  # 即時監控

# 限制日誌大小 (在 daemon.json 中配置)
{
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

### 資源監控

```bash
# 查看容器資源使用
docker stats

# 查看系統資源
docker system df
docker system events
```

## 故障排除

### 常見問題

**容器無法啟動**:
```bash
# 檢查容器狀態
docker ps -a

# 查看詳細錯誤
docker logs container-name

# 檢查配置
docker-compose config
```

**網路連線問題**:
```bash
# 檢查網路配置
docker network ls
docker network inspect network-name

# 測試容器間連線
docker exec -it container1 ping container2
```

**儲存空間不足**:
```bash
# 清理未使用的資源
docker system prune -a

# 清理特定類型
docker container prune
docker image prune
docker volume prune
docker network prune
```

### 效能優化

**資源限制**:
```yaml
services:
  app:
    image: nginx:latest
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          memory: 256M
```

**快取優化**:
```dockerfile
# 在 Dockerfile 中使用多階段構建
FROM node:16 AS builder
COPY package*.json ./
RUN npm ci --only=production

FROM node:16-alpine
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]
```

## 安全性最佳實踐

### 基本安全設定

1. **定期更新**: 保持 Docker 和容器映像更新
2. **最小權限**: 避免使用 root 用戶運行容器
3. **網路隔離**: 使用自定義網路隔離服務
4. **秘密管理**: 使用 Docker Secrets 或環境變數檔案
5. **映像掃描**: 定期掃描映像漏洞

### 安全配置範例

```yaml
# 安全的 docker-compose.yml 配置
version: '3.8'

services:
  app:
    image: nginx:alpine
    user: "1000:1000"  # 非 root 用戶
    read_only: true     # 唯讀檔案系統
    tmpfs:
      - /tmp
      - /var/run
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
    security_opt:
      - no-new-privileges:true
```

## 參考資源

### 官方文件
- [Docker 官方文件](https://docs.docker.com/)
- [Docker Compose 文件](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)

### 社群資源
- [r/docker](https://www.reddit.com/r/docker/) - Reddit 社群
- [Docker Community](https://www.docker.com/community/) - 官方社群
- [LinuxServer.io](https://www.linuxserver.io/) - 優質容器映像

### 學習資源
- [Play with Docker](https://labs.play-with-docker.com/) - 線上實驗環境
- [Docker 101 Tutorial](https://www.docker.com/101-tutorial/) - 官方教學
- [Awesome Docker](https://github.com/veggiemonk/awesome-docker) - 資源清單