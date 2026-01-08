---
title: '自架服務清單'
description: '精選的自架服務軟體清單，適合 HomeLab 環境部署'
tags:
  - HomeLab
  - Self-Hosted
  - Awesome
  - Software
date_created: 2024-12-19T00:00:00.000Z
slug: /utilities/homelab/awesome-self-hosted/
---

# 自架服務清單

本文整理了適合在 HomeLab 環境中部署的各類自架服務軟體，按功能分類並提供詳細說明。

## 文件與協作

### 辦公套件

辦公套件是生產力軟體的集合，通常包含文字處理器、試算表和簡報程式。

#### [Collabora Online Development Edition](https://www.collaboraoffice.com/code/)
**說明**: 基於 LibreOffice 的強大線上辦公套件  
**特點**:
- 支援所有主要文件格式
- 即時協作編輯
- 可整合到現有基礎設施
- 完整的 API 支援

**部署方式**:
```bash
# Docker Compose 部署
docker run -t -d -p 9980:9980 -e 'domain=your-domain\.com' \
  --restart always --cap-add MKNOD collabora/code
```

**技術資訊**:
- **授權**: MPL-2.0
- **程式語言**: C++
- **原始碼**: [LibreOffice Online](https://cgit.freedesktop.org/libreoffice/online/)

#### [CryptPad](https://cryptpad.fr/)
**說明**: 端到端加密的協作平台  
**特點**:
- 完全的端到端加密
- 即時文件同步
- 無需註冊即可使用
- 支援多種文件類型

**部署方式**:
```bash
# 使用 Docker
docker run -d --name cryptpad -p 3000:3000 \
  -v cryptpad-data:/cryptpad/datastore \
  promasu/cryptpad
```

**技術資訊**:
- **授權**: AGPL-3.0
- **程式語言**: Node.js
- **原始碼**: [GitHub](https://github.com/xwiki-labs/cryptpad)

#### [ONLYOFFICE](https://helpcenter.onlyoffice.com/faq/server-opensource.aspx)
**說明**: 全功能辦公套件，支援文件、專案和客戶關係管理  
**特點**:
- 高度相容 Microsoft Office
- 強大的協作功能
- 支援行動裝置
- 內建 CRM 和專案管理

**部署方式**:
```bash
# Docker Compose 部署
wget https://download.onlyoffice.com/install/docker/docker-compose.yml
docker-compose up -d
```

**技術資訊**:
- **授權**: AGPL-3.0
- **程式語言**: Node.js
- **原始碼**: [GitHub](https://github.com/ONLYOFFICE/DocumentServer)

## 媒體服務

### 影音串流

#### [Plex](https://www.plex.tv/)
**說明**: 功能完整的媒體伺服器  
**特點**:
- 自動媒體資訊獲取
- 跨平台客戶端
- 遠程存取支援
- 免費版本功能充足

#### [Jellyfin](https://jellyfin.org/)
**說明**: 完全開源的 Plex 替代方案  
**特點**:
- 100% 開源無限制
- 無需帳戶註冊
- 支援硬體加速
- 活躍的社群支援

**部署方式**:
```bash
# Docker 部署
docker run -d --name jellyfin \
  -p 8096:8096 \
  -v /path/to/config:/config \
  -v /path/to/media:/media \
  jellyfin/jellyfin
```

### 音樂串流

#### [Navidrome](https://www.navidrome.org/)
**說明**: 現代化的音樂伺服器  
**特點**:
- 支援 Subsonic API
- 音樂庫自動掃描
- 美觀的 Web 界面
- 低資源消耗

## 網路服務

### 反向代理

#### [Nginx Proxy Manager](https://nginxproxymanager.com/)
**說明**: 簡單易用的 Nginx 反向代理管理器  
**特點**:
- 圖形化管理界面
- 自動 SSL 憑證管理
- 內建 Let's Encrypt 支援
- 簡單的配置流程

**部署方式**:
```yaml
# docker-compose.yml
version: '3'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

#### [Traefik](https://traefik.io/)
**說明**: 現代化的反向代理和負載平衡器  
**特點**:
- 自動服務發現
- 內建監控儀表板
- 支援多種後端
- 容器原生支援

### DNS 服務

#### [Pi-hole](https://pi-hole.net/)
**說明**: 網路級廣告封鎖器  
**特點**:
- DNS 層級廣告封鎖
- 網路流量分析
- 簡單的 Web 管理界面
- 低資源需求

**部署方式**:
```bash
# Docker 部署
docker run -d --name pihole \
  -p 53:53/tcp -p 53:53/udp \
  -p 80:80 \
  -e TZ="Asia/Taipei" \
  -v "$(pwd)/etc-pihole/:/etc/pihole/" \
  -v "$(pwd)/etc-dnsmasq.d/:/etc/dnsmasq.d/" \
  --dns=127.0.0.1 --dns=1.1.1.1 \
  --restart=unless-stopped \
  pihole/pihole:latest
```

## 監控與日誌

### 系統監控

#### [Prometheus](https://prometheus.io/)
**說明**: 開源的系統監控和告警工具  
**特點**:
- 時間序列資料庫
- 強大的查詢語言 (PromQL)
- 多維度資料模型
- 豐富的整合生態系統

#### [Grafana](https://grafana.com/)
**說明**: 強大的資料視覺化平台  
**特點**:
- 美觀的儀表板
- 支援多種資料源
- 告警和通知功能
- 豐富的外掛程式

**部署方式**:
```yaml
# Prometheus + Grafana Docker Compose
version: '3.7'
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
  
  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  grafana-data:
```

#### [Uptime Kuma](https://uptime.kuma.pet/)
**說明**: 簡單美觀的服務可用性監控  
**特點**:
- 直覺的 Web 界面
- 多種監控類型
- 多樣化通知方式
- 狀態頁面功能

### 日誌管理

#### [Loki](https://grafana.com/oss/loki/)
**說明**: 高效的日誌聚合系統  
**特點**:
- 與 Grafana 完美整合
- 低成本的日誌儲存
- 強大的查詢能力
- 支援標籤索引

## 儲存與備份

### 檔案共享

#### [Nextcloud](https://nextcloud.com/)
**說明**: 完整的雲端儲存解決方案  
**特點**:
- 檔案同步和共享
- 豐富的應用程式生態系統
- 內建辦公套件
- 強大的權限管理

#### [Syncthing](https://syncthing.net/)
**說明**: 去中心化的檔案同步  
**特點**:
- P2P 檔案同步
- 無需中央伺服器
- 端到端加密
- 跨平台支援

### 備份解決方案

#### [Restic](https://restic.net/)
**說明**: 快速、安全、高效的備份程式  
**特點**:
- 加密和去重備份
- 支援多種儲存後端
- 跨平台支援
- 簡單的命令列界面

**使用範例**:
```bash
# 初始化備份倉庫
restic init --repo /path/to/backup

# 建立備份
restic backup ~/Documents --repo /path/to/backup

# 恢復檔案
restic restore latest --repo /path/to/backup --target /path/to/restore
```

## 開發工具

### 版本控制

#### [Gitea](https://gitea.io/)
**說明**: 輕量級的 Git 服務  
**特點**:
- 低資源消耗
- 完整的 Git 功能
- 內建 CI/CD
- 簡單的安裝和管理

#### [GitLab CE](https://about.gitlab.com/install/)
**說明**: 功能完整的 DevOps 平台  
**特點**:
- 完整的 CI/CD 管道
- 內建問題追蹤
- Wiki 和文件管理
- 強大的權限管理

### 容器管理

#### [Portainer](https://www.portainer.io/)
**說明**: Docker 和 Kubernetes 管理平台  
**特點**:
- 直覺的 Web 界面
- 支援多種容器環境
- 用戶和團隊管理
- 應用程式範本市場

**部署方式**:
```bash
# 安裝 Portainer
docker volume create portainer_data
docker run -d -p 8000:8000 -p 9443:9443 \
  --name portainer --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

## 安全工具

### VPN 服務

#### [WireGuard](https://www.wireguard.com/)
**說明**: 現代化的 VPN 解決方案  
**特點**:
- 高效能和低延遲
- 簡單的配置
- 強大的加密
- 跨平台支援

#### [OpenVPN Access Server](https://openvpn.net/access-server/)
**說明**: 成熟穩定的 VPN 解決方案  
**特點**:
- 成熟的技術
- 完整的管理界面
- 支援多種認證方式
- 豐富的文件

### 身份認證

#### [Authelia](https://www.authelia.com/)
**說明**: 強大的身份認證和授權伺服器  
**特點**:
- 多因子認證 (2FA)
- 單一登入 (SSO)
- 細粒度存取控制
- 支援多種後端

## 部署建議

### 初學者推薦
1. **Portainer** - 容器管理
2. **Nginx Proxy Manager** - 反向代理
3. **Uptime Kuma** - 服務監控
4. **Jellyfin** - 媒體伺服器
5. **Pi-hole** - DNS 廣告封鎖

### 進階用戶
1. **Prometheus + Grafana** - 完整監控解決方案
2. **Nextcloud** - 私人雲端
3. **GitLab CE** - DevOps 平台
4. **Authelia** - 身份認證
5. **WireGuard** - VPN 服務

### 安全性考量
- 定期更新所有服務
- 使用強密碼和 2FA
- 實施網路分段
- 定期備份重要資料
- 監控系統日誌

## 參考資源

### 官方清單
- [Awesome Self-Hosted](https://github.com/awesome-selfhosted/awesome-selfhosted) - 最完整的自架服務清單
- [r/selfhosted](https://www.reddit.com/r/selfhosted/) - Reddit 社群

### 部署指南
- [Docker 官方文件](https://docs.docker.com/)
- [Docker Compose 教學](https://docs.docker.com/compose/)
- [LinuxServer.io](https://www.linuxserver.io/) - 優質的 Docker 鏡像

### 學習資源
- [TechnoTim YouTube](https://www.youtube.com/c/TechnoTimLive) - HomeLab 教學
- [Awesome-Compose](https://github.com/docker/awesome-compose) - Docker Compose 範例
