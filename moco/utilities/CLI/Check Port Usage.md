---
title: IP/Port usage
description: find IP port usage
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - CLI
sidebar_position: 50
hide_table_of_contents: true
date_created: 2024-05-30T00:00:00.000Z
slug: /utilities/cli/check-port-usage/
---

# 網路埠號使用檢查

系統網路埠號使用情況檢查工具集合，幫助診斷網路服務衝突和埠號佔用問題。

## 基本檢查指令

### lsof 指令
```bash
# 列出所有監聽中的埠號
lsof -n -i | grep LISTEN

# 檢查特定埠號是否被使用
lsof -n -i:3000 | grep LISTEN

# 檢查特定協定的埠號
lsof -n -i tcp | grep LISTEN
lsof -n -i udp
```

### netstat 指令
```bash
# 顯示所有監聽中的埠號
netstat -tuln

# 顯示監聽中的 TCP 埠號
netstat -tln

# 顯示監聽中的 UDP 埠號
netstat -uln

# 顯示埠號對應的程序名稱
netstat -tulnp  # Linux
netstat -tuln   # macOS (不支援 -p)
```

### ss 指令 (現代化替代)
```bash
# 顯示所有監聽中的埠號 (Linux)
ss -tuln

# 顯示監聽中的 TCP 埠號
ss -tln

# 顯示埠號對應的程序
ss -tulnp
```

## 詳細檢查方法

### 按協定分類檢查
```bash
# TCP 埠號檢查
lsof -n -i tcp | grep LISTEN
netstat -tln

# UDP 埠號檢查
lsof -n -i udp
netstat -uln

# 特定 IP 位址的埠號
lsof -n -i @127.0.0.1
lsof -n -i @192.168.1.100
```

### 按埠號範圍檢查
```bash
# 檢查特定範圍的埠號
lsof -n -i :8000-8999 | grep LISTEN

# 檢查常用的開發埠號
for port in 3000 8000 8080 9000; do
    echo "Port $port:"
    lsof -n -i:$port | grep LISTEN
done
```

### 按程序檢查
```bash
# 檢查特定程序使用的埠號
lsof -n -i -c nginx
lsof -n -i -c node
lsof -n -i -c python

# 檢查特定 PID 使用的埠號
lsof -n -i -p 1234
```

## 跨平台解決方案

### macOS 專用指令
```bash
# 使用 lsof (推薦)
lsof -n -i | grep LISTEN

# 使用 netstat
netstat -an | grep LISTEN

# 檢查特定埠號的程序
lsof -n -i:8080 | awk 'NR>1 {print $1, $2}'
```

### Linux 專用指令
```bash
# 使用 ss (推薦)
ss -tulnp | grep LISTEN

# 使用 netstat
netstat -tulnp | grep LISTEN

# 檢查埠號對應的程序
fuser 8080/tcp
```

### Windows 對應指令
```cmd
# Windows 對應指令
netstat -an | findstr LISTENING
netstat -ano | findstr :8080
```

## 實用腳本

### 埠號檢查腳本
```bash
#!/bin/bash
# check-ports.sh

check_port() {
    local port=$1
    local result
    
    if command -v lsof >/dev/null 2>&1; then
        result=$(lsof -n -i:$port | grep LISTEN)
    elif command -v netstat >/dev/null 2>&1; then
        result=$(netstat -tuln | grep ":$port ")
    else
        echo "Error: Neither lsof nor netstat available"
        return 1
    fi
    
    if [[ -n "$result" ]]; then
        echo "Port $port is in use:"
        echo "$result"
        return 0
    else
        echo "Port $port is available"
        return 1
    fi
}

# 使用方式
if [[ $# -eq 0 ]]; then
    echo "Usage: $0 <port1> [port2] [port3] ..."
    echo "Example: $0 3000 8080 9000"
    exit 1
fi

for port in "$@"; do
    check_port "$port"
    echo
done
```

### 常用埠號掃描
```bash
#!/bin/bash
# scan-common-ports.sh

# 常用開發埠號
COMMON_PORTS=(80 443 3000 3001 4000 5000 8000 8080 8443 9000)

echo "Scanning common development ports..."
echo "======================================"

for port in "${COMMON_PORTS[@]}"; do
    if lsof -n -i:$port | grep -q LISTEN; then
        process=$(lsof -n -i:$port | grep LISTEN | awk '{print $1, $2}' | head -1)
        echo "✓ Port $port: $process"
    else
        echo "○ Port $port: Available"
    fi
done
```

### 埠號監控腳本
```bash
#!/bin/bash
# monitor-ports.sh

MONITOR_PORTS=(3000 8080 9000)
INTERVAL=5

echo "Monitoring ports: ${MONITOR_PORTS[*]}"
echo "Press Ctrl+C to stop"
echo

while true; do
    clear
    echo "Port Monitor - $(date)"
    echo "========================"
    
    for port in "${MONITOR_PORTS[@]}"; do
        if result=$(lsof -n -i:$port | grep LISTEN); then
            process=$(echo "$result" | awk '{print $1, $2}' | head -1)
            echo "Port $port: ACTIVE ($process)"
        else
            echo "Port $port: FREE"
        fi
    done
    
    sleep $INTERVAL
done
```

## 進階用法

### 找出佔用埠號的程序並終止
```bash
# 找出並終止佔用特定埠號的程序
kill_port() {
    local port=$1
    local pid
    
    if [[ -z "$port" ]]; then
        echo "Usage: kill_port <port>"
        return 1
    fi
    
    pid=$(lsof -n -i:$port | grep LISTEN | awk '{print $2}' | head -1)
    
    if [[ -n "$pid" ]]; then
        echo "Killing process $pid using port $port"
        kill $pid
    else
        echo "No process found using port $port"
    fi
}

# 使用方式
kill_port 3000
```

### 批次檢查服務狀態
```bash
# 檢查常見服務的埠號狀態
check_services() {
    declare -A services=(
        ["HTTP"]="80"
        ["HTTPS"]="443"
        ["SSH"]="22"
        ["MySQL"]="3306"
        ["PostgreSQL"]="5432"
        ["Redis"]="6379"
        ["MongoDB"]="27017"
    )
    
    echo "Service Status Check"
    echo "==================="
    
    for service in "${!services[@]}"; do
        port=${services[$service]}
        if lsof -n -i:$port | grep -q LISTEN; then
            echo "✓ $service (port $port): Running"
        else
            echo "✗ $service (port $port): Not running"
        fi
    done
}
```

### 網路連線統計
```bash
# 統計網路連線狀態
network_stats() {
    echo "Network Connection Statistics"
    echo "============================="
    
    if command -v ss >/dev/null 2>&1; then
        echo "TCP Connections:"
        ss -t state all | tail -n +2 | awk '{print $1}' | sort | uniq -c
        echo
        echo "Listening Ports:"
        ss -tuln | grep LISTEN | wc -l
    elif command -v netstat >/dev/null 2>&1; then
        echo "TCP Connections:"
        netstat -t | tail -n +3 | awk '{print $6}' | sort | uniq -c
        echo
        echo "Listening Ports:"
        netstat -tuln | grep LISTEN | wc -l
    fi
}
```

## 疑難排解

### 常見問題
```bash
# 權限不足
# 某些系統需要 sudo 權限才能看到程序資訊
sudo lsof -n -i | grep LISTEN
sudo netstat -tulnp | grep LISTEN

# 指令不存在
# macOS 可能需要安裝 lsof
brew install lsof

# Linux 可能需要安裝 net-tools
sudo apt-get install net-tools  # Ubuntu/Debian
sudo yum install net-tools      # CentOS/RHEL
```

### 效能考量
```bash
# 對於大量埠號檢查，使用更有效率的方法
# 避免多次呼叫 lsof
get_all_listening_ports() {
    lsof -n -i | grep LISTEN | awk '{print $9}' | cut -d: -f2 | sort -n | uniq
}

# 一次性獲取所有資訊
get_port_info() {
    lsof -n -i | grep LISTEN | while read line; do
        process=$(echo $line | awk '{print $1}')
        pid=$(echo $line | awk '{print $2}')
        port=$(echo $line | awk '{print $9}' | cut -d: -f2)
        echo "Port $port: $process (PID: $pid)"
    done | sort -n
}
```

## 實用 Alias

```bash
# ~/.bashrc 或 ~/.zshrc

# 快速檢查監聽埠號
alias ports='lsof -n -i | grep LISTEN'
alias listening='netstat -tuln | grep LISTEN'

# 檢查特定埠號
alias port='function _port(){ lsof -n -i:$1 | grep LISTEN; }; _port'

# 終止佔用埠號的程序
alias killport='function _killport(){ kill $(lsof -n -i:$1 | grep LISTEN | awk "{print \$2}"); }; _killport'

# 顯示網路統計
alias netstats='ss -tuln | grep LISTEN | wc -l && echo "listening ports"'
```

## 相關工具

### 網路掃描工具
```bash
# nmap 埠號掃描
nmap -p 1-1000 localhost
nmap -sT -O localhost

# nc (netcat) 埠號測試
nc -zv localhost 80
nc -zv 192.168.1.1 22

# telnet 連線測試
telnet localhost 80
```

### 監控工具
```bash
# 使用 watch 持續監控
watch -n 2 'lsof -n -i | grep LISTEN'

# 使用 htop 查看網路連線
htop -F

# 使用 iftop 監控網路流量
sudo iftop
```

## See Also

- [[SSH Config]] - SSH 埠號配置管理
- [[Awesome CLI]] - 現代化 CLI 工具集合
- [lsof 手冊](https://man7.org/linux/man-pages/man8/lsof.8.html)
- [netstat 手冊](https://man7.org/linux/man-pages/man8/netstat.8.html)
