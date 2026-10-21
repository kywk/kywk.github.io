/**
 * 首頁 Hero 山徑經典旅行航點配置 (Hero Trail Waypoints Config)
 *
 * 說明：
 * - 僅在桌面版（>1024px 且支援滑鼠 hover）顯示，手機版與窄螢幕自動隱藏以保持版面純淨留白。
 * - 座標 position 採用百分比 (left, top)，精確對齊背景插畫上的登山步道與山峰稜線。
 * - cardAlign: 控制滑鼠 hover 時牌卡彈出的方位，避免遮擋邊界：
 *     - 'top-left'    : 往左上方展開
 *     - 'top-right'   : 往右上方展開
 *     - 'bottom-left' : 往左下方展開
 *     - 'bottom-right': 往右下方展開
 *
 * 日後您可以隨意增減航點、微調 left / top 百分比座標、替換文章連結與簡介。
 */

export const heroWaypoints = [
  {
    id: 'wp-baikal-2019',
    number: '01',
    year: '2019',
    elevation: '455M',
    coord: "53°12'N 107°20'E",
    title: '貝加爾湖 · 冰封藍冰季',
    subtitle: 'Hot Baikal',
    desc: '西伯利亞冬季大鐵道，踏上貝加爾湖三米透明裂痕藍冰與薩滿巨石。',
    to: '/backpacker/1902-baikal/index-hot-baikal/',
    position: { left: '84.5%', top: '79%' },
    cardAlign: 'top-left',
  },
  {
    id: 'wp-iceland-2018',
    number: '02',
    year: '2018',
    elevation: '1,420M',
    coord: "64°08'N 21°56'W",
    title: '冰島環線 · 冰與火之歌',
    subtitle: 'Song of Ice',
    desc: '公路自駕一號線、黑沙灘狂風、火山苔原與冰河湖獵光紀行。',
    to: '/backpacker/1801-iceland/index-song-of-ice/',
    position: { left: '71%', top: '61%' },
    cardAlign: 'top-left',
  },
  {
    id: 'wp-sichuan-2016',
    number: '03',
    year: '2016',
    elevation: '3,900M',
    coord: "31°01'N 99°35'E",
    title: '四川川西 · 亞青與色達高地',
    subtitle: 'Sichuan Highlands',
    desc: '高原草原大河曲、深山修道者紅屋群與藏區經幡山道跋涉。',
    to: '/backpacker/1607-sichuan-yachin/index-sichuan-yachin/',
    position: { left: '62%', top: '50%' },
    cardAlign: 'bottom-right',
  },
  {
    id: 'wp-annapurna-2013',
    number: '04',
    year: '2013',
    elevation: '5,416M',
    coord: "28°47'N 83°58'E",
    title: '喜馬拉雅 · 安娜普納大環線',
    subtitle: 'Around Annapurna',
    desc: '重裝涉足喜馬拉雅山脈，翻越五千米雪嶺隘口（Thorong La）的高山健行。',
    to: '/backpacker/1302-around-annapurna/index-around-annapurna/',
    position: { left: '80%', top: '30%' },
    cardAlign: 'bottom-left',
  },
];
