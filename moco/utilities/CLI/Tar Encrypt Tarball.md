---
title: Tar 加密打包
description: Tar 加密打包
tags:
  - CLI
sidebar_position: 50
hide_table_of_contents: true
date_created: 2020-12-10T00:00:00.000Z
image: 'https://i.imgur.com/mErPwqL.png'
slug: /utilities/cli/tar-encrypt-tarball/
---

# [CLI] Tarball 加密打包

網路上免費創建團隊硬碟理論上創建者是團隊硬碟管理員,
但實際上所有的團隊硬碟仍受 Google GSuite / Workspace 機構管理員管轄.
機構管理員雖然無法直接存取檔案, 但有權將檔案擁有者轉移給他人.
如果只是存放網路上載來的資源就算了, 若是存放個人檔案, 仍建議加密壓縮.

## TarBall

Tar 支援 gzip, bz2, xz... 等多種壓縮方式, 但 tar 並不支援加密.
在命令列模式下要加密 tarball, 需透過其他指令來完成, 最常用的是 openssl.

## 加密

簡單指令如下: (僅加密打包不壓縮)

```shell
$ tar cvf - FILE_NAME | openssl des3 -salt -k passw0rd -out /path/to/file.tar
```

這個指令主要分成兩部分

第一部分是 `tar cvf - FILE_NAME`, 意思是針對 FILE_NAME 進行打包,
其中三個參數的意思是:

- c: create 創建一個新的 tarball 文件
- v: verbose 輸出詳細的處理過程
- f:file 需要打包的檔案 (Unix 下一切都是檔案, 資料夾也屬於檔案)

第二部分是 `openssl des3 -salt -k passw0rd -out /path/to/file.tar`
意思是針對文件透過 des3 加密, 其中參數的意思是:

- des3 指定用來加密的演算法, 常見有三種 des, des3, idea
- salt 為密碼添加一個隨機數, 和 `-k` 一起使用, 可防範字典攻擊
- k 指定的密碼
- out 輸出文件名字

## 解密

```shell
$ openssl des3 -d -k passw0rd -salt -in /path/to/file.tar.gz | tar xvf -
```

這指令剛好把加密打包的行為反過來. 先透過 openssl 把檔案解密後, 再利用 tar 解開 tarball 內容.

## alias

整理資料時需大量的打包檔案, 未避免輸入時手誤打錯密碼,
直接在 bashrc 中新增加密和解密的 alias, 把密碼固定寫在 alias 中,
這樣加密打包時無須輸入一長串命令, 也不用擔心手誤 key 錯密碼.

```sh.rc
alias ens='openssl des3 -salt -k passw0rd '
alias des='openssl des3 -d -salt -k passw0rd '
```

```shell
# 加密打包
$ tar cvf - FILE_NAME | ens -out FILE_NAME.tar.x
# 解密
$ des -in FILE_NAME.tar.x | tar xvf -
```

## See Also

- [GNU / Linux 各種壓縮與解壓縮指令 | 凍仁的筆記](http://note.drx.tw/2008/04/command.html)
- [tar命令加密壓縮 - IT閱讀](https://www.itread01.com/content/1551377067.html)
- [Linux tar加密壓縮解壓 - IT閱讀](https://www.itread01.com/content/1547949421.html)
- [第二十四個夏天後: [Linux] 使用 Openssl 做簡易的(DES3)加密、解密 @ Ubuntu 14.04](http://blog.changyy.org/2014/06/linux-openssl-des3-ubuntu-1404.html)
