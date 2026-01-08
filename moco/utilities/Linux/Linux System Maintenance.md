---
title: 'Linux 系統維護最佳實踐'
description: 'Linux 系統日常維護、效能優化、安全設定和故障排除指南'
tags:
  - Linux
  - System Maintenance
  - Performance
  - Security
date_created: 2024-12-19T00:00:00.000Z
slug: /utilities/linux/linux-system-maintenance/
---

# Linux 系統維護最佳實踐

本指南提供 Linux 系統的日常維護、效能優化和安全設定建議，幫助保持系統穩定運行。

## 日常維護檢查清單

### 每日檢查

```bash
# 系統更新檢查
sudo pacman -Syu    # Arch/Manjaro
sudo apt update && sudo apt upgrade    # Debian/Ubuntu

# 磁碟空間檢查
df -h
du -sh /var/log/*   # 檢查日誌檔案大小

# 系統負載檢查
uptime
free -h
top -bn1 | head -20
```

### 每週維護

```bash
# 清理套件快取
sudo pacman -Sc     # Arch/Manjaro
sudo apt autoremove && sudo apt autoclean    # Debian/Ubuntu

# 檢查系統日誌
journalctl --since "1 week ago" --priority=err
sudo dmesg | grep -i error

# 檢查失敗的服務
systemctl --failed
```

### 每月維護

```bash
# 完整系統清理
sudo pacman -Scc    # Arch/Manjaro 清理所有快取
sudo apt autoremove --purge    # Debian/Ubuntu 清理孤立套件

# 日誌檔案清理
sudo journalctl --vacuum-time=30d
sudo find /var/log -name "*.log" -type f -mtime +30 -delete

# 檢查磁碟健康
sudo smartctl -a /dev/sda    # 需安裝 smartmontools
```

## 效能監控與優化

### 系統效能監控

```bash
# CPU 使用率監控
htop                # 互動式處理程序監控
iostat 1 5         # I/O 統計
vmstat 1 5          # 虛擬記憶體統計

# 記憶體使用分析
free -h
cat /proc/meminfo
ps aux --sort=-%mem | head -10    # 記憶體使用最多的程序

# 磁碟 I/O 監控
iotop               # 需要 root 權限
lsof | grep deleted # 查找已刪除但仍被使用的檔案
```

### 開機優化

```bash
# 分析開機時間
systemd-analyze
systemd-analyze blame
systemd-analyze critical-chain

# 停用不需要的服務
systemctl list-unit-files --type=service --state=enabled
sudo systemctl disable service_name

# 檢查開機載入的模組
lsmod
# 將不需要的模組加入黑名單
echo 'blacklist module_name' | sudo tee -a /etc/modprobe.d/blacklist.conf
```

### 記憶體優化

```bash
# 調整 swappiness（建議值：10-60）
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf

# 清理記憶體快取（謹慎使用）
sudo sync
echo 3 | sudo tee /proc/sys/vm/drop_caches

# 檢查記憶體洩漏
valgrind --tool=memcheck --leak-check=full program_name
```

## 安全設定

### 基本安全措施

```bash
# 更新系統安全補丁
sudo pacman -Syu    # 定期更新

# 檢查開放的網路埠
sudo netstat -tuln
sudo ss -tuln
nmap localhost      # 掃描本機開放埠

# 檢查登入記錄
last                # 最近登入記錄
lastlog             # 所有用戶最後登入時間
sudo journalctl _COMM=sshd    # SSH 登入記錄
```

### 防火牆設定

```bash
# UFW (Uncomplicated Firewall)
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw status verbose

# iptables 基本規則
sudo iptables -L
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -j DROP
```

### 檔案系統安全

```bash
# 檢查檔案權限
find /home -type f -perm 777    # 查找所有人可寫的檔案
find /etc -type f -perm /o+w    # 查找其他用戶可寫的系統檔案

# 檢查 SUID/SGID 檔案
find / -type f \( -perm -4000 -o -perm -2000 \) -exec ls -l {} \;

# 檔案完整性檢查
sudo aide --init    # 初始化 AIDE 資料庫
sudo aide --check   # 檢查檔案變更
```

## 備份策略

### 系統備份

```bash
# 使用 rsync 備份
rsync -avH --delete /home/user/ /backup/home/user/
rsync -avH --delete --exclude-from=/etc/rsync-exclude.txt / /backup/system/

# 使用 tar 備份
sudo tar -czf /backup/system-$(date +%Y%m%d).tar.gz \
    --exclude=/proc --exclude=/sys --exclude=/dev \
    --exclude=/tmp --exclude=/backup /

# 資料庫備份（如果適用）
mysqldump -u root -p --all-databases > /backup/mysql-$(date +%Y%m%d).sql
```

### 自動化備份

```bash
# 創建備份腳本
cat > /usr/local/bin/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d)

# 系統配置備份
tar -czf "$BACKUP_DIR/config-$DATE.tar.gz" /etc

# 用戶資料備份
rsync -avH --delete /home/ "$BACKUP_DIR/home/"

# 清理舊備份（保留 30 天）
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +30 -delete
EOF

chmod +x /usr/local/bin/backup.sh

# 設定 cron 任務
echo "0 2 * * * /usr/local/bin/backup.sh" | crontab -
```

## 故障排除

### 系統無法開機

```bash
# 使用 Live USB 修復
# 1. 掛載根分割區
sudo mount /dev/sdaX /mnt
sudo mount /dev/sdaY /mnt/boot    # 如果有獨立 boot 分割區

# 2. chroot 到系統
sudo arch-chroot /mnt    # Arch/Manjaro
# 或
sudo chroot /mnt /bin/bash    # 其他發行版

# 3. 修復 GRUB
grub-install /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
```

### 系統效能問題

```bash
# 檢查系統負載
uptime
cat /proc/loadavg

# 找出佔用資源的程序
ps aux --sort=-%cpu | head -10    # CPU 使用率
ps aux --sort=-%mem | head -10    # 記憶體使用率

# 檢查 I/O 等待
iostat -x 1 5
iotop -o    # 只顯示有 I/O 活動的程序
```

### 網路問題診斷

```bash
# 基本網路檢查
ping -c 4 8.8.8.8          # 測試外網連線
ping -c 4 gateway_ip       # 測試閘道連線
nslookup google.com        # DNS 解析測試

# 網路介面檢查
ip addr show
ip route show
cat /etc/resolv.conf       # DNS 設定

# 網路服務檢查
systemctl status NetworkManager
systemctl status systemd-networkd
```

### 磁碟問題

```bash
# 檢查磁碟錯誤
sudo dmesg | grep -i "error\|fail"
sudo smartctl -a /dev/sda

# 檔案系統檢查
sudo fsck /dev/sdaX        # 需先卸載分割區
sudo e2fsck -f /dev/sdaX   # ext2/3/4 檔案系統

# 磁碟空間分析
ncdu /                     # 互動式磁碟使用分析
baobab                     # 圖形化磁碟使用分析
```

## 系統監控工具

### 命令列工具

```bash
# 安裝常用監控工具
sudo pacman -S htop iotop nethogs ncdu    # Arch/Manjaro
sudo apt install htop iotop nethogs ncdu  # Debian/Ubuntu

# 系統資訊工具
neofetch               # 系統資訊展示
inxi -Fxz              # 詳細硬體資訊
lshw                   # 硬體列表
```

### 圖形化監控

```bash
# 安裝圖形化監控工具
sudo pacman -S gnome-system-monitor baobab    # GNOME
sudo pacman -S ksysguard filelight            # KDE
sudo pacman -S xfce4-taskmanager              # Xfce
```

### 日誌監控

```bash
# journalctl 常用指令
journalctl -f                    # 即時監控
journalctl -u service_name       # 特定服務日誌
journalctl --since "1 hour ago"  # 時間範圍
journalctl -p err                # 錯誤等級日誌
journalctl --disk-usage          # 日誌佔用空間
```

## 效能調校

### CPU 調校

```bash
# CPU 頻率調整
cpupower frequency-info          # 查看 CPU 頻率資訊
sudo cpupower frequency-set -g performance    # 效能模式
sudo cpupower frequency-set -g powersave      # 省電模式

# CPU 調度器調整
cat /sys/block/sda/queue/scheduler
echo mq-deadline | sudo tee /sys/block/sda/queue/scheduler
```

### I/O 調校

```bash
# 調整 I/O 調度器
echo deadline | sudo tee /sys/block/sda/queue/scheduler

# 調整檔案系統參數
sudo tune2fs -o journal_data_writeback /dev/sdaX
mount -o remount,noatime /
```

## 參考資源

### 官方文件
- [Arch Wiki - System Maintenance](https://wiki.archlinux.org/title/System_maintenance)
- [Ubuntu Server Guide](https://ubuntu.com/server/docs)
- [Red Hat System Administrator's Guide](https://access.redhat.com/documentation/)

### 監控工具
- [Nagios](https://www.nagios.org/) - 企業級監控
- [Zabbix](https://www.zabbix.com/) - 開源監控解決方案
- [Prometheus](https://prometheus.io/) - 現代監控系統

### 學習資源
- [Linux Performance](http://www.brendangregg.com/linuxperf.html)
- [The Geek Stuff](https://www.thegeekstuff.com/)
- [Linux Journal](https://www.linuxjournal.com/)