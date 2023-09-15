---
title: "Setup Rclone for Google Team Drive on macOS"
date: 2020-12-07T17:35:35+08:00
toc: true
images: []
categories: ["google-drive"]
tags: ["google-drive", "rclone", "cli"]
---

針對 Google Drive 個人與商業用戶, Google 分別提供了 Backup and Sync 以及 DriveFS 兩個桌面軟體以便操作,
但無論是 Backup and Sync 還是 DriveFS 都不支援 Team Drive, 
無法在桌面環境下操作 Team Drive, 只能透過網頁端處理.

所幸萬能的 Rclone 有支援 Team Drive.  



Rclone
------

__[Rclone](https://rclone.org/)__ 是一個非常好用的雲端硬碟管理工具, 在命令模式下直接針對多數雲端硬碟服務進行操作,
搭配其他系統工具, 可自動化雲端硬碟的管理, 包括異地備份, 打包, 移除老舊檔案... 等等.

目前 Rclone 支援的雲端硬碟服務多達 38 種, 其中本篇的重點在第 13 項 "Google Drive".

__注意:__ 第 12 項的 Google Cloud Storage 並不是 Google Drive, 而是 GCP 中類似 AWS S3 的服務. 



Install rclone on macOS
-----------------------

在 macOS 透過 homebrew 安裝的 rclone 目前不支援 mount 命令. 
不過目前我的使用情境還不需要 mount 遠端硬碟, 所以無腦使用 Homebrew 安裝:

```
$ brew install rclone

Homebrew's installation does not include the `mount` subcommand on MacOS.

zsh completions have been installed to:
  /usr/local/share/zsh/site-functions

/usr/local/share/zsh/site-functions is not in your zsh FPATH!
Add it by following these steps:
  https://docs.brew.sh/Shell-Completion#configuring-completions-in-zsh
```

### zsh auto completion ###

T.B.C



Configure team drive
--------------------

透過 brew 安裝 rclone 通常不會出錯, 安裝完後可以準備進行設定. 
輸入 `rclone config` 後會進入設定模式. 

```
$ rclone config

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q>  n 
name>  it-if-bimgo 
```
先選擇 `n` 新增一組遠端硬碟, 取個自己喜歡且方便辨識的名稱
```
Type of storage to configure.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
...
11 / FTP Connection
   \ "ftp"
12 / Google Cloud Storage (this is not Google Drive)
   \ "google cloud storage"
13 / Google Drive
   \ "drive"
14 / Google Photos
   \ "google photos"
 ...   
Storage> 13
```
接著要選擇遠端硬碟的類型, 這篇介紹的是 Google Drive, 選 13.  
```
** See help for drive backend at: https://rclone.org/drive/ **

Google Application Client Id
Setting your own is recommended.
See https://rclone.org/drive/#making-your-own-client-id for how to create your own.
If you leave this blank, it will use an internal key which is low performance.
Enter a string value. Press Enter for the default ("").
client_id> 9847344-xxx-xxx-xxx
OAuth Client Secret
Leave blank normally.
Enter a string value. Press Enter for the default ("").
client_secret> a6AZxxxxxxxx
```
依循 [Google drive | rclone](https://rclone.org/drive/#making-your-own-client-id) 的說明, 
申請 Google Drive API 以及 App client_id 和 client_secret, 填入.
不知道如何申請也可留空, 不過指令執行效率會較差.
```
Scope that rclone should use when requesting access from drive.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
 1 / Full access all files, excluding Application Data Folder.
   \ "drive"
 2 / Read-only access to file metadata and file contents.
   \ "drive.readonly"
   / Access to files created by rclone only.
 3 | These are visible in the drive website.
   | File authorization is revoked when the user deauthorizes the app.
   \ "drive.file"
   / Allows read and write access to the Application Data folder.
 4 | This is not visible in the drive website.
   \ "drive.appfolder"
   / Allows read-only access to file metadata but
 5 | does not allow any access to read or download file content.
   \ "drive.metadata.readonly"
scope> 1
```
接著選擇這個 Remote 的存取權限, 通常選 1, 完整存取的權限.
```
ID of the root folder
Leave blank normally.

Fill in to access "Computers" folders (see docs), or for rclone to use
a non root folder as its starting point.

Enter a string value. Press Enter for the default ("").
root_folder_id>
```
設定預設根目錄的 ID. 以團隊碟來說留空即可.
```
Service Account Credentials JSON file path
Leave blank normally.
Needed only if you want use SA instead of interactive login.

Leading `~` will be expanded in the file name as will environment variables such as `${RCLONE_CONFIG_DIR}`.

Enter a string value. Press Enter for the default ("").
service_account_file>
```
Service Account 將在後篇介紹, 這邊先留空即可
```
Edit advanced config? (y/n)
y) Yes
n) No (default)
y/n> n
Remote config
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine
y) Yes (default)
n) No
y/n>
If your browser doesn't open automatically go to the following link: http://127.0.0.1:53682/auth?state=qQkpxmh1iDjj0kmwp4weGw
Log in and authorize rclone for access
Waiting for code...
```

進階設定和自動設定都直接按 Enter 以預設值即可, 接著會自動打開網頁, 需要網站上同意 rclone 存取 Google Drive.

![](https://lh3.googleusercontent.com/pw/ACtC-3ecAsml5AprwhfVG3ZFgUqwPlOzVd5imrLPKzUTeQPTGusvxLr556E5_SKQTvPwhyM1i14luzwrycNlSaEncdDfdT7HP8x6siJlsHkMZUz30KAqtMSttstvpJO_ysjLgL-BttXGvvdxbiwFfkcuOt1iZA=w469-h624-no?authuser=0)

```
Log in and authorize rclone for access
Waiting for code...
Got code
Configure this as a team drive?
y) Yes
n) No (default) 
y/n> y
Fetching team drive list...
Choose a number from below, or type in your own value
 1 / if.bimgo
   \ "0AMxxxxxxxxxxxxxxxx"
 2 / i.bimgo
   \ "0APxxxxxxxxxxxxxxxx"
 3 / i.hcc
   \ "0AHxxxxxxxxxxxxxxxx"
 4 / i.vip
   \ "0AHxxxxxxxxxxxxxxxx"
Enter a Team Drive ID> 1
```
網頁授權成功後, rclone 會詢問這組 remote 是否為 team drive, 選 y.
此時 rclone 會自動抓取所有的團隊硬碟, 選擇所要對應的團隊硬碟.

```
--------------------
[it-if-bimgo]
type = drive
client_id = 9847344-xxx-xxx-xxx
client_secret = a6AZxxxxxxxx
scope = drive
token = {xxxxxx}
team_drive = 0AMxxxxxxxxxxxxxxxx
root_folder_id =
--------------------
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d> y
```
最後再確認上述資訊是否正確, 若無誤選 y 保存. rclone 就設定完成了.

### Test ###

```
$ rclone mkdir it-if-bimgo:Test                                                    915  2.29    17:25:45 
$ rclone lsd it-if-bimgo:                                                          917  2.31    17:26:04 
          -1 2020-12-08 17:25:56        -1 Test
```

測試方式很簡單, 先透過 rclone mkdir 建立一個空資料夾, 
再透過 rclone lsd 確認該資料夾是否存在.
亦可開網頁確認:

![](https://lh3.googleusercontent.com/pw/ACtC-3cNRVBXgzQV003vslOd5Ms4tIA_w_VcT6Z-6t_vm4BMxy-cDnDETos5QyNXCpNnONFWp5uNhpw046yRyNwmTchdaNY5QttX3IiYhb8Ve8bBlPEgK0Nhx5P15WXEmoUgofpudjZYTLwYhLXXdgZ6N-nEfw=w545-h148-no?authuser=0)

這篇文章有更多 rclone 常用指令的介紹: [用rclone命令行指令簡化雲端儲存服務的各項檔案操作 | 簡睿隨筆 | 學習過程的紀錄與備忘](http://jdev.tw/blog/4746/rclone-cloud-storage-command-line) 

### drive-server-side-across ###

Rclone 在 Google 雲端硬碟有支援一項[特殊的設定](https://rclone.org/drive/#drive-server-side-across-configs), 可以直接在伺服器端進行傳輸:

{{< blockquote >}}
--drive-server-side-across-configs  
Allow server side operations (eg copy) to work across different drive configs.  
This can be useful if you wish to do a server side copy between two different Google drives. Note that this isn’t enabled by default because it isn’t easy to tell if it will work between any two configurations.  
-   Config: server_side_across_configs
-   Env Var: RCLONE_DRIVE_SERVER_SIDE_ACROSS_CONFIGS
-   Type: bool
-   Default: false
{{< /blockquote >}}

編輯 `~/.config/rclone/rclone.conf`, 
加入 `server_side_across_configs = true`

```
[google-personal-drive]
type = drive
scope = drive
server_side_across_configs = true
token = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
root_folder_id = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

[google-team-drive]
type = drive
scope = drive
server_side_across_configs = true
token = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
team_drive = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

接著進行傳輸, 同時透過 iftop 觀察網路頻寬. 
可以發現到 rclone 回報的速度數百 MBps 左右, 但是 iftop 回報的流量只有數十 kbps.
代表成功的直接在伺服器端進行傳輸, 而不消耗本機頻寬, 速度快多了.

![](https://lh3.googleusercontent.com/pw/ACtC-3fSS4nQZkkvujw8YtBCcYlw8sgyp9Xtc5f_fBKrsc96NMsTWCtAp8nRjho0i7uoj7f8kJOBaDDNbA7W4h3k3uJ8aTOD908TfYTZlmFflQXwyU7oLsE96ChT13uc0a48h2do9s6GdhdcsHgnFcbodSmriQ=w730-h588-no?authuser=0)

__伺服器端檔案傳輸僅限於同一帳戶下的不同資料夾 (包含共享硬碟), 操作前需先把相關資料夾分享並加到相同帳戶下才不會出錯__

BTW, 在 macOS 安裝 iftop 發生了小問題, 解決紀錄於此: [macOS 安裝 iftop 失敗與解決方式 · moco](https://kywk.github.io/moco/posts/macos/macos_install-iftop/)



See Also
--------

### rclone configure file ###

在 macOS, Linux 環境下, rclone 設置檔存放在 `$HOME/.config/rclone/rclone.conf`
我工作需在多台電腦中切換, 個人習慣把 .config 裡需在多台電腦同步的資料夾放在 Dropbox 上, 
再建立對應 symbolic link.

```
$ mkdir ~/Dropbox/config
$ mv ~/.config/rclone ~/Dropbox/config
$ ln -sfF ~/Dropbox/config/rclone .config/rclone
```

這樣無論在哪台電腦修改了什麼設定, 換個電腦仍可輕鬆同步設定.

### rclone supported cloud drive ###

Rclone 所支援的雲端硬敵種類如下:

```
 1 / 1Fichier
 2 / Alias for an existing remote
 3 / Amazon Drive
 4 / Amazon S3 Compliant Storage Provider (AWS, Alibaba, Ceph, Digital Ocean, Dreamhost, IBM COS, Minio, Tencent COS, etc)
 5 / Backblaze B2
 6 / Box
 7 / Cache a remote
 8 / Citrix Sharefile
 9 / Dropbox
10 / Encrypt/Decrypt a remote
11 / FTP Connection
12 / Google Cloud Storage (this is not Google Drive)
13 / Google Drive
14 / Google Photos
15 / Hubic
16 / In memory object storage system.
17 / Jottacloud
18 / Koofr
19 / Local Disk
20 / Mail.ru Cloud
21 / Mega
22 / Microsoft Azure Blob Storage
23 / Microsoft OneDrive
24 / OpenDrive
25 / OpenStack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
26 / Pcloud
27 / Put.io
28 / QingCloud Object Storage
29 / SSH/SFTP Connection
30 / Sugarsync
31 / Tardigrade Decentralized Cloud Storage
32 / Transparently chunk/split large files
33 / Union merges the contents of several upstream fs
34 / Webdav
35 / Yandex Disk
36 / http Connection
37 / premiumize.me
38 / seafile
```

### Reference ###

-   [Rclone:玩轉Google Drive & One Drive - 消失的亞特蘭提斯](https://wp.madjack.info/linux/rclone-googledrive-onedrive.html)
-   [Rclone 在不使用本機頻寬的條件下進行跨雲端硬碟傳輸 | Calos's Blog](https://caloskao.org/rclone-across-transfer-each-cloud-drive-without-local-machine-bandwidth/)
-   [用rclone命令行指令簡化雲端儲存服務的各項檔案操作 | 簡睿隨筆 | 學習過程的紀錄與備忘](http://jdev.tw/blog/4746/rclone-cloud-storage-command-line)
-   [GOOGLE Drive 相互複製 對拷. 前言 | by BunnyBit | Medium](t.ly/AWMh)
