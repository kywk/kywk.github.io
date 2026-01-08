---
title: 'HomeLab 網路配置指南'
description: 'HomeLab 環境的網路架構設計、安全配置和服務部署指南'
tags:
  - HomeLab
  - Networking
  - Security
  - Infrastructure
date_created: 2024-12-19T00:00:00.000Z
slug: /utilities/homelab/networking-guide/
---

# HomeLab 網路配置指南

良好的網路架構是 HomeLab 成功的基礎。本指南涵蓋網路設計、安全配置、服務部署等關鍵主題。

## 網路架構設計

### 基本網路拓撲

```
網際網路
    │
ISP 數據機
    │
主路由器/防火牆
    │
內部交換器
    ├── HomeLab 伺服器 (192.168.1.100/24)
    ├── 工作站 (192.168.1.101-150/24)
    ├── IoT 裝置 (192.168.2.0/24)
    └── 訪客網路 (192.168.3.0/24)
```

### 進階網路分段

```
網際網路
    │
邊界路由器
    │
核心交換器
    ├── 管理網路 (10.0.1.0/24)
    │   ├── 網路設備管理
    │   └── 監控系統
    ├── 伺服器網路 (10.0.10.0/24)
    │   ├── HomeLab 伺服器
    │   └── 儲存系統
    ├── 用戶網路 (10.0.20.0/24)
    │   ├── 工作站
    │   └── 筆記型電腦
    ├── IoT 網路 (10.0.30.0/24)
    │   ├── 智慧家電
    │   └── 感測器
    └── DMZ (10.0.100.0/24)
        ├── Web 伺服器
        └── 對外服務
```

## IP 地址規劃

### 私有 IP 地址範圍

| 網路類別 | IP 範圍 | 子網路遮罩 | 用途 |
|---------|---------|-----------|------|
| Class A | 10.0.0.0/8 | 255.0.0.0 | 大型網路 |
| Class B | 172.16.0.0/12 | 255.240.0.0 | 中型網路 |
| Class C | 192.168.0.0/16 | 255.255.0.0 | 小型網路 |

### HomeLab IP 分配建議

```bash
# 管理網路
10.0.1.0/24
├── 10.0.1.1      # 路由器
├── 10.0.1.10-20  # 網路設備
├── 10.0.1.50-60  # 監控系統
└── 10.0.1.100+   # 管理工作站

# 伺服器網路
10.0.10.0/24
├── 10.0.10.10    # 主要 HomeLab 伺服器
├── 10.0.10.11    # NAS 系統
├── 10.0.10.12    # 備份伺服器
└── 10.0.10.20+   # 其他服務

# 用戶網路
10.0.20.0/24
├── 10.0.20.10-50 # 固定 IP 裝置
└── 10.0.20.100+  # DHCP 範圍

# IoT 網路
10.0.30.0/24
├── 10.0.30.10+   # 智慧裝置
└── 10.0.30.200+  # DHCP 範圍
```

## VLAN 配置

### VLAN 規劃

| VLAN ID | 名稱 | 網路 | 用途 |
|---------|------|------|------|
| 1 | Default | 10.0.1.0/24 | 管理網路 |
| 10 | Servers | 10.0.10.0/24 | 伺服器網路 |
| 20 | Users | 10.0.20.0/24 | 用戶網路 |
| 30 | IoT | 10.0.30.0/24 | IoT 裝置 |
| 40 | Guest | 10.0.40.0/24 | 訪客網路 |
| 100 | DMZ | 10.0.100.0/24 | 非軍事區 |

### 交換器 VLAN 配置

```bash
# Cisco 交換器配置範例
enable
configure terminal

# 創建 VLAN
vlan 10
 name Servers
vlan 20
 name Users
vlan 30
 name IoT
vlan 40
 name Guest

# 配置 Trunk 埠
interface GigabitEthernet0/1
 switchport mode trunk
 switchport trunk allowed vlan 1,10,20,30,40

# 配置 Access 埠
interface GigabitEthernet0/2
 switchport mode access
 switchport access vlan 10

# 儲存配置
write memory
```

## 路由器配置

### pfSense 配置

#### 基本設定

1. **介面配置**
```
WAN: 連接到 ISP
LAN: 內部網路 (10.0.1.0/24)
OPT1: 伺服器網路 (10.0.10.0/24)
OPT2: 用戶網路 (10.0.20.0/24)
OPT3: IoT 網路 (10.0.30.0/24)
```

2. **DHCP 設定**
```bash
# 伺服器網路 DHCP
範圍: 10.0.10.100 - 10.0.10.200
DNS: 10.0.1.10 (Pi-hole)
閘道: 10.0.10.1

# 用戶網路 DHCP
範圍: 10.0.20.100 - 10.0.20.200
DNS: 10.0.1.10, 1.1.1.1
閘道: 10.0.20.1
```

#### 防火牆規則

```bash
# 基本規則結構
來源網路 -> 目標網路 -> 埠 -> 動作

# 允許內部網路存取網際網路
LAN -> ANY -> ANY -> ALLOW

# 允許伺服器網路互相通訊
Servers -> Servers -> ANY -> ALLOW

# 阻止 IoT 存取內部網路
IoT -> LAN,Servers,Users -> ANY -> BLOCK

# 允許特定服務存取
Users -> Servers -> 80,443,8080 -> ALLOW
```

### OpenWrt 配置

#### 基本網路設定

```bash
# /etc/config/network
config interface 'loopback'
    option ifname 'lo'
    option proto 'static'
    option ipaddr '127.0.0.1'
    option netmask '255.0.0.0'

config interface 'lan'
    option type 'bridge'
    option ifname 'eth0.1'
    option proto 'static'
    option ipaddr '10.0.1.1'
    option netmask '255.255.255.0'

config interface 'servers'
    option ifname 'eth0.2'
    option proto 'static'
    option ipaddr '10.0.10.1'
    option netmask '255.255.255.0'
```

#### 防火牆配置

```bash
# /etc/config/firewall
config zone
    option name 'lan'
    option input 'ACCEPT'
    option output 'ACCEPT'
    option forward 'ACCEPT'
    list network 'lan'

config zone
    option name 'servers'
    option input 'ACCEPT'
    option output 'ACCEPT'
    option forward 'REJECT'
    list network 'servers'

config forwarding
    option src 'lan'
    option dest 'servers'

config rule
    option name 'Allow-Web-Access'
    option src 'lan'
    option dest 'servers'
    option dest_port '80 443'
    option proto 'tcp'
    option target 'ACCEPT'
```

## DNS 配置

### Pi-hole 設定

#### 安裝 Pi-hole

```bash
# Docker 部署
docker run -d \
  --name pihole \
  -p 53:53/tcp -p 53:53/udp \
  -p 80:80 \
  -e TZ="Asia/Taipei" \
  -e WEBPASSWORD="your-password" \
  -v "$(pwd)/etc-pihole/:/etc/pihole/" \
  -v "$(pwd)/etc-dnsmasq.d/:/etc/dnsmasq.d/" \
  --dns=127.0.0.1 --dns=1.1.1.1 \
  --restart=unless-stopped \
  pihole/pihole:latest
```

#### 自定義 DNS 記錄

```bash
# /etc/pihole/custom.list
10.0.10.10 homelab.local
10.0.10.10 plex.local
10.0.10.10 grafana.local
10.0.10.10 nextcloud.local
10.0.1.1   router.local
```

#### 條件轉發

```bash
# 在 Pi-hole 管理介面設定
本地網路: 10.0.0.0/8
路由器 IP: 10.0.1.1
本地域名: local
```

### Unbound 遞迴 DNS

```bash
# /etc/unbound/unbound.conf
server:
    verbosity: 1
    interface: 127.0.0.1
    port: 5335
    do-ip4: yes
    do-ip6: no
    do-udp: yes
    do-tcp: yes
    
    # 信任錨點
    trust-anchor-file: "/var/lib/unbound/root.key"
    
    # 本地區域
    local-zone: "local." static
    local-data: "homelab.local. IN A 10.0.10.10"
    local-data: "router.local. IN A 10.0.1.1"
    
    # 存取控制
    access-control: 127.0.0.1/32 allow
    access-control: 10.0.0.0/8 allow
```

## 反向代理配置

### Nginx Proxy Manager

#### Docker Compose 部署

```yaml
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
    environment:
      - DB_MYSQL_HOST=npm-db
      - DB_MYSQL_PORT=3306
      - DB_MYSQL_USER=npm
      - DB_MYSQL_PASSWORD=npm
      - DB_MYSQL_NAME=npm

  npm-db:
    image: mariadb:latest
    container_name: npm-db
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=npm
      - MYSQL_DATABASE=npm
      - MYSQL_USER=npm
      - MYSQL_PASSWORD=npm
    volumes:
      - npm-db:/var/lib/mysql

volumes:
  npm-data:
  npm-letsencrypt:
  npm-db:
```

#### 代理主機配置

1. **基本設定**
   - 域名: `plex.homelab.local`
   - 目標: `10.0.10.10:32400`
   - 啟用 WebSocket 支援

2. **SSL 設定**
   - 啟用 SSL
   - 強制 SSL
   - 使用 Let's Encrypt 或自簽憑證

### Traefik 配置

#### Docker Compose 部署

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v2.9
    container_name: traefik
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/traefik.yml:ro
      - ./dynamic.yml:/dynamic.yml:ro
      - traefik-certs:/certs
    networks:
      - homelab

networks:
  homelab:
    external: true

volumes:
  traefik-certs:
```

#### Traefik 配置檔案

```yaml
# traefik.yml
api:
  dashboard: true
  insecure: true

entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

providers:
  docker:
    exposedByDefault: false
  file:
    filename: /dynamic.yml

certificatesResolvers:
  letsencrypt:
    acme:
      email: your-email@example.com
      storage: /certs/acme.json
      httpChallenge:
        entryPoint: web
```

## VPN 配置

### WireGuard 伺服器

#### 安裝配置

```bash
# Ubuntu/Debian 安裝
sudo apt update
sudo apt install wireguard

# 生成金鑰
wg genkey | tee privatekey | wg pubkey > publickey

# 伺服器配置 /etc/wireguard/wg0.conf
[Interface]
PrivateKey = SERVER_PRIVATE_KEY
Address = 10.0.200.1/24
ListenPort = 51820
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
PublicKey = CLIENT_PUBLIC_KEY
AllowedIPs = 10.0.200.2/32
```

#### 客戶端配置

```bash
# 客戶端配置
[Interface]
PrivateKey = CLIENT_PRIVATE_KEY
Address = 10.0.200.2/24
DNS = 10.0.1.10

[Peer]
PublicKey = SERVER_PUBLIC_KEY
Endpoint = your-domain.com:51820
AllowedIPs = 10.0.0.0/8
PersistentKeepalive = 25
```

### OpenVPN 配置

#### 使用 Docker 部署

```yaml
version: '3.8'

services:
  openvpn:
    image: kylemanna/openvpn:latest
    container_name: openvpn
    restart: unless-stopped
    ports:
      - "1194:1194/udp"
    volumes:
      - openvpn-data:/etc/openvpn
    cap_add:
      - NET_ADMIN
    environment:
      - OVPN_SERVER_URL=udp://your-domain.com

volumes:
  openvpn-data:
```

## 監控與日誌

### 網路監控工具

#### LibreNMS 部署

```yaml
version: '3.8'

services:
  librenms:
    image: librenms/librenms:latest
    container_name: librenms
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - DB_HOST=librenms-db
      - DB_NAME=librenms
      - DB_USER=librenms
      - DB_PASSWORD=librenms
    volumes:
      - librenms-data:/data
    depends_on:
      - librenms-db

  librenms-db:
    image: mariadb:latest
    container_name: librenms-db
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=librenms
      - MYSQL_DATABASE=librenms
      - MYSQL_USER=librenms
      - MYSQL_PASSWORD=librenms
    volumes:
      - librenms-db:/var/lib/mysql

volumes:
  librenms-data:
  librenms-db:
```

#### PRTG 替代方案 - Zabbix

```yaml
version: '3.8'

services:
  zabbix-server:
    image: zabbix/zabbix-server-mysql:latest
    container_name: zabbix-server
    restart: unless-stopped
    environment:
      - DB_SERVER_HOST=zabbix-db
      - MYSQL_DATABASE=zabbix
      - MYSQL_USER=zabbix
      - MYSQL_PASSWORD=zabbix
    depends_on:
      - zabbix-db

  zabbix-web:
    image: zabbix/zabbix-web-nginx-mysql:latest
    container_name: zabbix-web
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - DB_SERVER_HOST=zabbix-db
      - MYSQL_DATABASE=zabbix
      - MYSQL_USER=zabbix
      - MYSQL_PASSWORD=zabbix
      - ZBX_SERVER_HOST=zabbix-server
    depends_on:
      - zabbix-server

  zabbix-db:
    image: mysql:8.0
    container_name: zabbix-db
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=zabbix
      - MYSQL_DATABASE=zabbix
      - MYSQL_USER=zabbix
      - MYSQL_PASSWORD=zabbix
    volumes:
      - zabbix-db:/var/lib/mysql

volumes:
  zabbix-db:
```

## 安全性配置

### 防火牆最佳實踐

#### 基本原則
1. **預設拒絕**: 預設阻擋所有流量
2. **最小權限**: 只開放必要的服務和埠
3. **網路分段**: 使用 VLAN 隔離不同類型的裝置
4. **定期審查**: 定期檢查和更新防火牆規則

#### pfSense 安全規則範例

```bash
# 管理網路規則
LAN -> ANY -> 22,80,443,8080 -> ALLOW (管理存取)
LAN -> Servers -> ANY -> ALLOW (完全存取伺服器)

# 用戶網路規則
Users -> Internet -> 80,443 -> ALLOW (網頁瀏覽)
Users -> Servers -> 80,443,8080,32400 -> ALLOW (服務存取)
Users -> Servers -> 22 -> BLOCK (阻止 SSH)

# IoT 網路規則
IoT -> Internet -> 80,443 -> ALLOW (更新和雲端服務)
IoT -> LAN,Servers,Users -> ANY -> BLOCK (隔離)

# 伺服器網路規則
Servers -> Internet -> 80,443,53 -> ALLOW (更新和 DNS)
Servers -> Servers -> ANY -> ALLOW (內部通訊)
```

### 入侵檢測系統

#### Suricata 配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  suricata:
    image: jasonish/suricata:latest
    container_name: suricata
    restart: unless-stopped
    network_mode: host
    cap_add:
      - NET_ADMIN
      - SYS_NICE
    volumes:
      - ./suricata.yaml:/etc/suricata/suricata.yaml:ro
      - ./rules:/var/lib/suricata/rules:ro
      - suricata-logs:/var/log/suricata
    command: -i eth0

volumes:
  suricata-logs:
```

### 網路存取控制

#### 802.1X 認證

```bash
# FreeRADIUS 配置
# /etc/freeradius/3.0/clients.conf
client switch {
    ipaddr = 10.0.1.10
    secret = shared-secret
    require_message_authenticator = yes
}

# /etc/freeradius/3.0/users
user1 Cleartext-Password := "password1"
    Tunnel-Type = VLAN,
    Tunnel-Medium-Type = IEEE-802,
    Tunnel-Private-Group-Id = 20
```

## 故障排除

### 網路診斷工具

```bash
# 基本連線測試
ping 8.8.8.8
traceroute google.com
nslookup google.com

# 埠掃描
nmap -p 1-1000 10.0.10.10
nc -zv 10.0.10.10 80

# 網路介面狀態
ip addr show
ip route show
ss -tuln

# 防火牆狀態
iptables -L -n
ufw status verbose
```

### 常見問題解決

#### DNS 解析問題

```bash
# 檢查 DNS 設定
cat /etc/resolv.conf
systemd-resolve --status

# 清除 DNS 快取
sudo systemctl flush-dns
sudo systemd-resolve --flush-caches

# 測試 DNS 查詢
dig @8.8.8.8 google.com
nslookup google.com 1.1.1.1
```

#### 路由問題

```bash
# 檢查路由表
ip route show
route -n

# 添加靜態路由
sudo ip route add 10.0.20.0/24 via 10.0.1.1
sudo route add -net 10.0.20.0/24 gw 10.0.1.1

# 永久路由設定 (Ubuntu)
echo "10.0.20.0/24 via 10.0.1.1" | sudo tee -a /etc/netplan/01-netcfg.yaml
```

## 效能優化

### 頻寬管理

#### Traffic Control (tc)

```bash
# 限制介面頻寬
sudo tc qdisc add dev eth0 root tbf rate 100mbit burst 32kbit latency 400ms

# 建立 QoS 類別
sudo tc qdisc add dev eth0 root handle 1: htb default 30
sudo tc class add dev eth0 parent 1: classid 1:1 htb rate 100mbit
sudo tc class add dev eth0 parent 1:1 classid 1:10 htb rate 80mbit ceil 100mbit
sudo tc class add dev eth0 parent 1:1 classid 1:20 htb rate 20mbit ceil 50mbit
```

### 網路效能監控

#### iperf3 頻寬測試

```bash
# 伺服器端
iperf3 -s

# 客戶端測試
iperf3 -c server-ip -t 30 -i 5

# UDP 測試
iperf3 -c server-ip -u -b 100M
```

## 參考資源

### 官方文件
- [pfSense Documentation](https://docs.netgate.com/pfsense/)
- [OpenWrt Documentation](https://openwrt.org/docs/start)
- [Pi-hole Documentation](https://docs.pi-hole.net/)

### 網路工具
- [Wireshark](https://www.wireshark.org/) - 網路封包分析
- [Nmap](https://nmap.org/) - 網路掃描工具
- [iperf3](https://iperf.fr/) - 網路效能測試

### 學習資源
- [Network Chuck YouTube](https://www.youtube.com/c/NetworkChuck) - 網路技術教學
- [Cisco Networking Academy](https://www.netacad.com/) - 網路認證課程
- [r/networking](https://www.reddit.com/r/networking/) - 網路技術討論