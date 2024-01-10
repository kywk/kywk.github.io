---
title: "Util: Location Changer"
description: Change OS X’s network location based on the name of Wi-Fi network
tags: [Mac, Tips]

sidebar_position: 30
#sidebar_label: Easy
#sidebar_class_name: green

hide_table_of_contents: true

created: 2022-08-25T00:00:00+08:00
image: https://i.imgur.com/mErPwqL.png
---

[Mac] 自動依 Wifi 名稱更改網路位置
=============================

- [eprev/locationchanger: Change OS X’s network location based on the name of Wi-Fi network](https://github.com/eprev/locationchanger/)  
- [Mac OS 自动根据 WI-FI 名字改变网络位置 - Razeen`s Blog]( https://razeen.me/posts/auto-change-network-location-base-on-name-of-wifi/)

### Installation & Update ###

```bash
curl -L https://github.com/eprev/locationchanger/raw/master/locationchanger.sh | bash
```


### Cconfiguration ###



### Remove locationchanger ### 

```
# Unload and remove launch agent
launchctl unload -w ~/Library/LaunchAgents/LocationChanger.plist
rm ~/Library/LaunchAgents/LocationChanger.plist

# Remove locationchanger binary
sudo rm /usr/local/bin/locationchanger

# Remove config
rm ~/.locations/locations.conf

# Remove logs
rm ~/Library/Logs/LocationChanger.log
```

