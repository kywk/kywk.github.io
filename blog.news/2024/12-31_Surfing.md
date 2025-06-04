---
title: Surf 12.01 ~ 12.31
description: Surfing quick note Surf 12.01 ~ 12.31
authors: kywk
tags:
  - Surf
  - 2024/12
image: https://lh3.googleusercontent.com/pw/AM-JKLXZZHmidSgMMB2k8blkneclNRysPXLr__G7rZ4hPi2sN0jC67PHAbX1MyFj8hQX_MTZ6bwIMPwCyu2fu1bU0ZXSX09eu-OlSDb4U-9haUS_wgnVPLaCM6WQLsRbsnocF8X5Edmt35rDjytljbNEMsaf8A=w800-no?authuser=0
hide_table_of_contents: true
---

Surfing 12.01 ~ 12.31
==================

### IT News

- [Grayjay App - Follow Creators Not Platforms](https://grayjay.app/desktop/)
	- 和 Follow 有些類似, 聚合多個媒體平台於一身. 
	- 比起平台本身, 主要是 follow creator.
- [GitHub - boardgameio/boardgame.io: State Management and Multiplayer Networking for Turn-Based Games](https://github.com/boardgameio/boardgame.io)
	- **boardgame.io** is an engine for creating turn-based games using JavaScript.
- [Clay - UI Layout Library](https://www.nicbarker.com/clay)
	- Clay is a flex-box style UI auto layout library in C, with declarative syntax and microsecond performance.
	- Compile to 15kb .wasm
	- 效能實在很快的 UI Lib, 看來未來可能是 rust/wasm 的天下.
- [egui – An immediate mode GUI written in Rust](https://www.egui.rs/)
	- [Egui – An immediate mode GUI written in Rust \| Hacker News](https://news.ycombinator.com/item?id=42512636)
- [Puppet 要 fork 了 – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2024/12/21/12146/puppet-%e8%a6%81-fork-%e4%ba%86/)
	- [Perforce 買下 Puppet – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2022/04/12/10655/perforce-%e8%b2%b7%e4%b8%8b-puppet/)
- [把 Wikipedia 條目對應到地圖上面 – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2024/12/19/12139/%e6%8a%8a-wikipedia-%e6%a2%9d%e7%9b%ae%e5%b0%8d%e6%87%89%e5%88%b0%e5%9c%b0%e5%9c%96%e4%b8%8a%e9%9d%a2/)
	- 想要弄的旅遊部落格, 文章/照片/... 都可以標示在地圖上
- [Translating Java to Kotlin at Scale - Engineering at Meta](https://engineering.fb.com/2024/12/18/android/translating-java-to-kotlin-at-scale/)
	- Java code 轉換到 Kotlin 過程.
	- [intellij-community/plugins/kotlin/j2k at master · JetBrains/intellij-community · GitHub](https://github.com/JetBrains/intellij-community/tree/master/plugins/kotlin/j2k)
	- [Engineering at Meta - Engineering at Meta Blog](https://engineering.fb.com/)
- [Apache基金會修補網頁伺服器元件Tomcat遠端程式碼執行漏洞 \| iThome](https://www.ithome.com.tw/news/166667)
	- 在金融業工作後, 對於 CVE 資訊會多花一些時間了解...
-  [Download Ghostty](https://ghostty.org/download)
	- [Ghostty 1.0 \| Hacker News](https://news.ycombinator.com/item?id=42517447)
	- 一個發表前已略有名氣的 terminal emulator.
	- [x] 和 wezterm, kitty, tabby 一起比較玩玩. ⏬ 📅 2025-01-05 ✅ 2025-05-31
- [GitHub - siyuan-note/siyuan: A privacy-first, self-hosted, fully open source personal knowledge management software, written in typescript and golang.](https://github.com/siyuan-note/siyuan)
	- [Siyuan: Privacy-first, self-hosted personal knowledge management software \| Hacker News](https://news.ycombinator.com/item?id=42512713)
	- [GitHub - dullage/flatnotes: A self-hosted, database-less note taking web app that utilises a flat folder of markdown files for storage.](https://github.com/Dullage/flatnotes)
- [Collection of insane and fun facts about SQLite - blag](https://avi.im/blag/2024/sqlite-facts/)
	- 最有趣的觀察是 SQLite 和 Redis 誰比較快 !?
		- 某些(且不少)需求下, SQLite 比 Redis 快.
		- 網路延遲與 (de)serialisation overhead 可能比想像中大.
- [GitHub - lexiforest/curl-impersonate: An active fork of curl-impersonate with more versions and build targets.](https://github.com/lexiforest/curl-impersonate)
	- [Curl-Impersonate \| Hacker News](https://news.ycombinator.com/item?id=42547820)
	- [實作更多功能的 curl-impersonate fork – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2024/12/31/12168/%e5%af%a6%e4%bd%9c%e6%9b%b4%e5%a4%9a%e5%8a%9f%e8%83%bd%e7%9a%84-curl-impersonate-fork/)
- [國泰金控雲端資料湖倉平臺架構大公開！自行研發ETL工具、ML平臺也上雲 \| iThome](https://www.ithome.com.tw/news/166609)

### Tech

- [把 libc 移植到 GPU 上跑 – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2024/12/16/12126/%e6%8a%8a-libc-%e7%a7%bb%e6%a4%8d%e5%88%b0-gpu-%e4%b8%8a%e8%b7%91/)
- [3 shell scripts: Kill weasel words, avoid the passive, eliminate duplicates](https://matt.might.net/articles/shell-scripts-for-passive-voice-weasel-words-duplicates/)
	- [用 Script 找出寫作技巧上疏忽的點 – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2024/12/16/12125/%e7%94%a8-script-%e6%89%be%e5%87%ba%e5%af%ab%e4%bd%9c%e6%8a%80%e5%b7%a7%e4%b8%8a%e7%96%8f%e5%bf%bd%e7%9a%84%e9%bb%9e/)
- [GitHub - microsoft/markitdown: Python tool for converting files and office documents to Markdown.](https://github.com/microsoft/markitdown)
	- [將各種檔案轉成 Markdown 的 markitdown – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2024/12/16/12124/%e5%b0%87%e5%90%84%e7%a8%ae%e6%aa%94%e6%a1%88%e8%bd%89%e6%88%90-markdown-%e7%9a%84-markitdown/)
	- [markitdown 微軟開源將 Office 文件轉成 Markdown 格式 - Tsung's Blog](https://blog.longwin.com.tw/2025/02/markitdown-microsoft-open-source-office-convert-markdown-2025/)
- [《給網站工程師的網路課》心得：Web 開發者的網路學習指南 - Code and Me](https://blog.kyomind.tw/network-101-course/)
- [State of Node.js Performance 2024](https://nodesource.com/blog/State-of-Nodejs-Performance-2024)
	- 簡單來說, node 20/22 輾壓 18.
	- 有任何理由需繼續使用 node 18, 至少升到 18.17.x
- [nginx 的 location 順序 – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2024/12/18/12130/nginx-%e7%9a%84-location-%e9%a0%86%e5%ba%8f/)
- [InnoDB 修復紀錄 : O3noBLOG](https://blog.othree.net/log/2024/12/22/innodb-recovery/)
	- 希望永遠用不上, 但是個值得紀錄的文章.
- [Server-Sent Events (SSE) Are Underrated \| Igor's Techno Club](https://igorstechnoclub.com/server-sent-events-sse-are-underrated/)
- [Write your Own Virtual Machine](https://www.jmeiners.com/lc3-vm/)
- [AWS 跨 AZ 時的流量成本問題 – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2024/12/31/12171/aws-%e8%b7%a8-az-%e6%99%82%e7%9a%84%e6%b5%81%e9%87%8f%e6%88%90%e6%9c%ac%e5%95%8f%e9%a1%8c/)

### Life

- [阿里山森遊漫步走(下)有夠遠的部落-里佳 - Mobile01](https://www.mobile01.com/topicdetail.php?f=628&t=7054288)
- [12 Best IKEA Hacks of 2024: See IKEA in a Brand New Light!](https://ikeahackers.net/2024/12/best-ikea-hacks-2024.html)
- [藏在維也納老城區中，一杯賣 14 歐元的「甜筒卡布奇諾」，是深受當地人喜愛的寶藏咖啡 - A Day Magazine](https://www.adaymag.com/2024/12/20/fenster-cafe.html)
- [在識字率曾低到 32% 的國家，堅持賣書超過半世紀，73 歲「一人書店」老闆的故事讓我們更珍惜所有 - A Day Magazine](https://www.adaymag.com/2024/12/20/mohamed-aziz.html)
- [2024年7-11信用卡攻略！7-11可以刷卡嗎？8張神卡推薦！ - Mobile01](https://www.mobile01.com/topicdetail.php?f=801&t=7059708)
- [《小王子》裡的角色真實存在：捷克布拉格出現神秘「點燈人」，為冰冷的科技時代帶來溫暖 - A Day Magazine](https://www.adaymag.com/2024/12/25/lamplighter.html)
- [上班時間去咖啡廳放個小假，懂得「安靜度假」後，工作效率更高了 - A Day Magazine](https://www.adaymag.com/2024/12/30/quiet-vacationing.html)
- [斯洛伐克「小國」大哲學：這裡或許「平凡」，但我們對生活很滿意｜彭孟嫻 Jessica／海外法律人的生活觀點｜換日線](https://crossing.cw.com.tw/article/19575)
