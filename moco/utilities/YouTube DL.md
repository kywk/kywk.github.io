---
title: 'Youtube: 下載影片'
description: download Youtube video by youtube-dl
tags:
  - Youtube
date_created: 2021-02-07T00:00:00.000Z
image: 'https://i.imgur.com/mErPwqL.png'
slug: /utilities/youtube-dl/
---

# [Youtube] 利用 youtube-dl 下載影片

一直都是利用播放清單和 Like 來當作 Youtube 影片的書籤.
不過陸續發現有些影片會無預期被刪除或改為私人影片, 也有些頻道會莫名消失.

單純音樂類的播放清單就算了, 但有些專業參考性質的影片需要時找不到,
故發起把影片下載保存的念頭,

網路上有不少下載 Youtube 影片的線上網站和 App,
試用過後最後回到最適合工程師的 [youtube-dl](https://youtube-dl.org/)

## youtube-dl

[youtube-dl](https://youtube-dl.org/) 是個 OpenSource 專案,
有興趣研究的可在 [GitHub](https://github.com/ytdl-org/youtube-dl/) 上 Fork 專案.

日前曾因可能違反 DMCA 而導致 GitHub 上所有 youtube-dl 專案都被下架.
(是的, 不單 youtube 影片可能下架, 連下載工具都可能被下架)
所幸後來在眾多熱心法律專業人士協助下, 確認並不違反 DMCA 而恢復專案.
[完整故事可到官方 blog 查看](https://github.blog/2020-11-16-standing-up-for-developers-youtube-dl-is-back/).

### install

Mac 上透過 brew 安裝 youtube-dl 相當簡單.

```
$ brew install youtube-dl
```

### ffmpeg

youtube-dl 是 python script, 利用 python 適合寫爬蟲的特性, 解析 youtube 影片位置並下載.
目前 youtube 網站中高畫質格式多為 video-only 或 audio-only 的 webm 格式,
傳統 mp4 格式大多只到 720p.
而 youtube-dl 只能下載影片, 無法轉換影片格式, 若想下載更高畫質的影片,
則需安裝 [ffmpeg](https://www.ffmpeg.org/) 來轉檔, 嵌入字幕, 提取音頻, 加入專輯封面等等 Post-processing.

```
$ brew install ffmpeg
```

## Usage

基本使用只要輸入 youtube 網址後就會開始下載, 預設是最佳影片格式.
若沒有安裝 ffmpeg 通常會下載 720p 的 mp4 檔,
有安裝 ffmpeg 則會下載最佳畫質的 video 和 audio 後合併.

```
$ youtube-dl https://www.youtube.com/watch?v=rkAfWfZkfyo

[youtube] rkAfWfZkfyo: Downloading webpage
[youtube] rkAfWfZkfyo: Downloading video info webpage
[download] Resuming download at byte 31858886
[download] Destination: 4K UHD Video power of samsung 4k hdr demo test video for 4k tv-rkAfWfZkfyo.f313.webm
[download] 100% of 634.40MiB in 01:10
[download] Destination: 4K UHD Video power of samsung 4k hdr demo test video for 4k tv-rkAfWfZkfyo.f251.webm
[download] 100% of 5.43MiB in 00:00
[ffmpeg] Merging formats into "4K UHD Video power of samsung 4k hdr demo test video for 4k tv-rkAfWfZkfyo.webm"
Deleting original file 4K UHD Video power of samsung 4k hdr demo test video for 4k tv-rkAfWfZkfyo.f313.webm (pass -k to keep)
Deleting original file 4K UHD Video power of samsung 4k hdr demo test video for 4k tv-rkAfWfZkfyo.f251.webm (pass -k to keep)
```

### 下載指定格式

Youtube-dl 預設會下載最高畫質的影片, 但可以自己選擇想要的品質

Ex: 下載解析度不高於 480p 的影片

```
$ youtube-dl -f 'bestvideo[height<=480][ext=mp4]+bestaudio/best[height<=480][ext=m4a]' <url>
```

**下載不同畫質與格式**

預設會下載最高畫質的影片, 如果要不同畫質可以先使用 -F, 會列出這個影片所有的畫質與格式

```
$ youtube-dl -F https://www.youtube.com/watch?v=rkAfWfZkfyo

[youtube] rkAfWfZkfyo: Downloading webpage
[youtube] rkAfWfZkfyo: Downloading video info webpage
[info] Available formats for rkAfWfZkfyo:
format code  extension  resolution note
249          webm       audio only DASH audio   56k , opus @ 50k, 2.11MiB
250          webm       audio only DASH audio   75k , opus @ 70k, 2.79MiB
140          m4a        audio only DASH audio  128k , m4a_dash container, mp4a.40.2@128k, 5.14MiB
171          webm       audio only DASH audio  135k , vorbis@128k, 5.05MiB
251          webm       audio only DASH audio  141k , opus @160k, 5.43MiB
278          webm       256x144    144p   99k , webm container, vp9, 30fps, video only, 3.57MiB
160          mp4        256x144    144p  111k , avc1.4d400c, 30fps, video only, 2.79MiB
242          webm       426x240    240p  229k , vp9, 30fps, video only, 7.42MiB
133          mp4        426x240    240p  246k , avc1.4d4015, 30fps, video only, 5.85MiB
243          webm       640x360    360p  453k , vp9, 30fps, video only, 13.89MiB
134          mp4        640x360    360p  635k , avc1.4d401e, 30fps, video only, 16.18MiB
244          webm       854x480    480p  858k , vp9, 30fps, video only, 25.31MiB
135          mp4        854x480    480p 1337k , avc1.4d401f, 30fps, video only, 32.15MiB
247          webm       1280x720   720p 2100k , vp9, 30fps, video only, 52.51MiB
136          mp4        1280x720   720p 2673k , avc1.4d401f, 30fps, video only, 62.45MiB
248          webm       1920x1080  1080p 3857k , vp9, 30fps, video only, 94.03MiB
137          mp4        1920x1080  1080p 5017k , avc1.640028, 30fps, video only, 110.63MiB
271          webm       2560x1440  1440p 8886k , vp9, 30fps, video only, 281.05MiB
313          webm       3840x2160  2160p 18240k , vp9, 30fps, video only, 634.40MiB
43           webm       640x360    medium , vp8.0, vorbis@128k, 34.71MiB
18           mp4        640x360    medium  670k , avc1.42001E, mp4a.40.2@ 96k (44100Hz), 27.12MiB
22           mp4        1280x720   hd720 1670k , avc1.64001F, mp4a.40.2@192k (44100Hz) (best)
```

要下載不同格式使用 `-f 'video code+audio code` 就可以抓不同畫質與音質的影片.

例如要抓 1280x720 的畫質, 就選 video code 136 跟 audio code 140, 這樣 youtube-dl 就會抓對應的畫質與音質的影片下來了

```
$ youtube-dl -f '136+140' https://www.youtube.com/watch?v=rkAfWfZkfyo
```

### 下載播放清單

輸入播放清單網址, youtube-dl 則會自動下載清單.
除了影片網址的部分改成影片清單的網址, 其他部分和下載影片一樣。

```
$ youtube-dl -f mp4 <playlist-url>
```

**指定起點和終點**

- `--playlist-start NUMBER` 指定起點
- `—-playlist-end NUMBER` 指定終點

Ex: 從第三個影片開始下載到最後一個影片

```
$ youtube-dl --playlist-start 3 -f mp4 <playlist-url>
```

Ex: 從第一個影片下載到倒數第二個影片

```
$ youtube-dl --playlist-end 2 -f mp4 <playlist-url>
```

Ex: 從第三個影片開始下載到倒數第二個影片

```
$ youtube-dl --playlist-start 3 --playlist-end 2 -f mp4 <playlist-url>
```

**使用下載清單**

若播放清單影片太多, 所需下載時間長, 可能必須分次執行時,
可以使用已下載清單的功能, 已避免重複下載.

```
$ youtube-dl --download-archive downloaded.txt -ciw <playlist-url>
```

With the option `--download-archive FILE` youtube-dl both reads and adds to a list of files not to download again.
Every time a file is successfully downloaded, that video id is added to FILE.

**建立已下載清單**

若之前下載時忘了建立清單, 可透過下列 script 把既有的檔案輸出成已下載清單,
建立完成後再透過上述指令接續下載.

```bash
for n in *.*
  do
    if [[ "$n" =~ -[-_0-9a-zA-Z]{11}.*$ ]]
      then echo "youtube ${n: -15: 11}" >> downloaded.txt
    fi
done
```

## See Also

以上筆記為超濃縮版, youtube-dl 還有更多強大的功能和參數可供使用.
如果要更詳細的參考文件, 可以直接參考官方文件: [https://github.com/rg3/youtube-dl](https://github.com/rg3/youtube-dl)

### Reference

- [youtube-dl | 院長的筆記本](https://ianwu.tw/press/topic/command_line_program/youtube-dl.html)
- [Youtube-dl濃縮教學筆記 | 小蛇蛇的筆記](https://yogapan.github.io/2017/08/16/Youtube-dl%E6%BF%83%E7%B8%AE%E6%95%99%E5%AD%B8%E7%AD%86%E8%A8%98/)
- [Downloading youtube playlist with youtube-dl, skipping existing files - Ask Ubuntu](https://askubuntu.com/questions/673442/downloading-youtube-playlist-with-youtube-dl-skipping-existing-files)
- [yt-dlp 如何下載字幕 - Tsung's Blog](https://blog.longwin.com.tw/2025/03/linux-yt-dlp-download-subtitle-2025/)
- 

### GUI Downloader

- [FreeTube - The Private YouTube Client](https://freetubeapp.io/)
	- [FreeTube 免費 YouTube 播放工具，無廣告、支援影片與音樂下載、訂閱功能 - 電腦王阿達](https://www.kocpc.com.tw/archives/355689)
- [Gihosoft TubeGet - Free YouTube Downloader for PC & Mac](http://www.gihosoft.com/free-youtube-downloader.html)
	- [如何在 Mac 下載 YouTube 1080P 高清影片 – APPLEFANS 蘋果迷](https://applefans.today/gihosoft-tubeget-download-youtube/)
