import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import { heroWaypoints } from '../data/heroWaypoints';

/* ==========================================================================
   Authored SVG Icons & Cartographic Crest (2px stroke, geometric precision)
   ========================================================================== */

function IslandIcon({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function CompassIcon({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function NotebookIcon({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="9" y1="7" x2="16" y2="7" />
      <line x1="9" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function TerminalIcon({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function CameraIcon({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function MapPinIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function LayersIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function RssIcon({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );
}

function BoardIcon({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  );
}

/**
 * Western Cartographic Survey Crest (Left margin emblem & elevation scale)
 */
function CartographicSurveyCrest() {
  return (
    <div className={styles.surveyRail} aria-hidden="true">
      <svg className={styles.surveyEmblem} width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 27L18 17L23 23L27 19L33 27H11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="27" cy="14" r="2.2" fill="currentColor" />
        <line x1="22" y1="0" x2="22" y2="6" stroke="currentColor" strokeWidth="1.5" />
        <line x1="22" y1="38" x2="22" y2="44" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="22" x2="6" y2="22" stroke="currentColor" strokeWidth="1.5" />
        <line x1="38" y1="22" x2="44" y2="22" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className={styles.surveyScaleLine} />
      <span className={styles.surveyScaleText}>CONTOUR · 2400M</span>
    </div>
  );
}

/**
 * Multi-layered Topographic Contour & Digital Light-Mesh SVG Overlay
 * Connects mountain trail waypoints and digital garden nodes across the Hero stage.
 */
function ContourMeshOverlay() {
  return (
    <svg
      className={styles.contourSvg}
      viewBox="0 0 1440 640"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true">
      {/* Topographic Elevation Contours */}
      <path
        className={styles.contourLineMuted}
        d="M-60 540 C 180 510, 340 420, 560 430 C 780 440, 920 310, 1140 280 C 1280 260, 1380 210, 1500 190"
      />
      <path
        className={styles.contourLineMuted}
        d="M-40 590 C 220 560, 410 470, 630 465 C 850 460, 990 350, 1210 315 C 1340 295, 1410 250, 1520 235"
      />
      <path
        className={styles.contourLinePrimary}
        d="M80 620 C 310 560, 470 390, 700 380 C 910 370, 1040 230, 1260 195 C 1360 180, 1430 140, 1510 120"
      />
      <path
        className={styles.contourLineMuted}
        d="M260 650 C 480 580, 610 460, 820 420 C 1020 380, 1150 260, 1350 225 C 1420 212, 1470 190, 1530 175"
      />
      <path
        className={styles.contourLineTeal}
        d="M420 660 C 640 590, 770 490, 960 440 C 1130 395, 1250 310, 1480 270"
      />

      {/* Closed Summit Contour Rings (Right Ridge) */}
      <path
        className={styles.contourRing}
        d="M1060 220 C 1120 175, 1240 165, 1290 210 C 1340 255, 1270 310, 1180 305 C 1090 300, 1010 260, 1060 220 Z"
      />
      <path
        className={styles.contourRingInner}
        d="M1115 225 C 1155 198, 1225 192, 1255 220 C 1285 248, 1240 278, 1185 275 C 1130 272, 1085 248, 1115 225 Z"
      />

      {/* Digital Light-Mesh Constellation Lines */}
      <g className={styles.meshNetwork}>
        <line x1="680" y1="382" x2="860" y2="270" />
        <line x1="860" y1="270" x2="1085" y2="310" />
        <line x1="860" y1="270" x2="1185" y2="225" />
        <line x1="1085" y1="310" x2="1185" y2="225" />
        <line x1="1185" y1="225" x2="1330" y2="150" />
        <line x1="680" y1="382" x2="940" y2="442" />
        <line x1="940" y1="442" x2="1085" y2="310" />
      </g>

      {/* Active Expedition Trail (Dashed Glowing Path) */}
      <path
        className={styles.expeditionTrailPath}
        d="M520 515 Q 610 430 680 382 T 860 270 T 1185 225 T 1330 150"
      />

      {/* Waypoint & Mesh Nodes */}
      <g className={styles.waypointNodes}>
        <circle cx="680" cy="382" r="5" className={styles.nodePulse} />
        <circle cx="680" cy="382" r="11" className={styles.nodeRing} />

        <circle cx="860" cy="270" r="4.5" className={styles.nodeTeal} />
        <circle cx="860" cy="270" r="9" className={styles.nodeRingTeal} />

        <circle cx="940" cy="442" r="3.5" className={styles.nodeMuted} />
        <circle cx="1085" cy="310" r="4" className={styles.nodeMuted} />

        <circle cx="1185" cy="225" r="5.5" className={styles.nodePulse} />
        <circle cx="1185" cy="225" r="13" className={styles.nodeRing} />

        <circle cx="1330" cy="150" r="4" className={styles.nodeTeal} />
      </g>
    </svg>
  );
}

/* ==========================================================================
   Data Structures (Single Source of Truth, Zero Duplication Across Sections)
   ========================================================================== */

const sideProjects = [
  {
    id: 'geo-story-map',
    title: 'Geo Story Map',
    pkgName: 'geo-story-map · @story-map/remark-story-map',
    desc: '雙端互動故事地圖與旅遊航跡引擎。支援 story-map 敘事投影片與 leaflet 純地圖圍欄語法，在 Obsidian 與 Docusaurus 共用 Vault 座標標記與深淺色主題橋接。',
    tags: ['Obsidian Plugin', 'Docusaurus Remark', 'Leaflet Runtime'],
    docTo: '/moco/obsidian/plugins/geo-story-map/01-geo-story-map-專案介紹/',
    docLabel: '閱讀架構筆記',
    repoHref: 'https://github.com/kywk/story-map',
    repoLabel: 'GitHub',
    Icon: MapPinIcon,
  },
  {
    id: 'vault-feed-reader',
    title: 'Vault Feed Reader',
    pkgName: 'vault-feed-reader',
    desc: '專為 Obsidian 打造的原生 RSS / Atom 訂閱閱讀器。支援內建全文擷取、自訂 Markdown 儲存模板與本機 AI 摘要生成，將外部資訊流直接沉澱為個人知識節點。',
    tags: ['Obsidian Plugin', 'RSS / Atom', 'Local AI Summary'],
    docTo: '/moco/obsidian/plugins/vault-feed-reader/01-vault-feed-reader-專案介紹/',
    docLabel: '閱讀架構筆記',
    repoHref: 'https://github.com/kywk/vault-feed-reader',
    repoLabel: 'GitHub',
    Icon: RssIcon,
  },
  {
    id: 'docusaurus-kit-kanban',
    title: 'Obsidian Kanban & Tasks Kit',
    pkgName: 'remark-obsidian-kanban · rehype-obsidian-tasks · docusaurus-theme-pele',
    desc: '獨立為 docusaurus-kit monorepo 並透過 OIDC 信任發佈至 npm 的開源套件群。將 Obsidian 行程看板、任務狀態與 Pele Mermaid 圖表無縫編譯為靜態網頁元件。',
    tags: ['npm Packages', 'docusaurus-kit', 'Remark / Rehype'],
    docTo: '/moco/docusaurus/docusaurus-kit/01-docusaurus-kit-專案總覽/',
    docLabel: '套件總覽筆記',
    repoHref: 'https://github.com/kywk/docusaurus-kit',
    repoLabel: 'GitHub',
    Icon: BoardIcon,
  },
  {
    id: 'docusaurus-plugin-album',
    title: 'Album Blog Engine',
    pkgName: 'docusaurus-plugin-album',
    desc: '以 Wrapper Pattern 封裝的 Docusaurus 攝影相簿外掛。結合 Pinterest 長寬比自適應瀑布流、Google Photos 年份時光軸滑桿與零依賴全螢幕相片燈箱。',
    tags: ['Docusaurus Plugin', 'Waterfall & Timeline', 'Zero-Dep Lightbox'],
    docTo: '/moco/docusaurus/album-blog/03-album-blog-完工成果與架構插件化評估/',
    docLabel: '插件實作筆記',
    repoHref: '/album/',
    repoLabel: '線上畫廊展示',
    isInternalDemo: true,
    Icon: CameraIcon,
  },
];

/* ==========================================================================
   Section Components
   ========================================================================== */

function GazetteMasthead() {
  return (
    <div className={styles.masthead}>
      <div className="container">
        <div className={styles.mastheadInner}>
          <div className={styles.mastheadCoords}>
            <span className={styles.mastheadBeacon} title="System Live" />
            <span>25°02&apos;09&quot;N 121°34&apos;15&quot;E</span>
            <span className={styles.mastheadDivider}>·</span>
            <span>TAIPEI WORKBENCH</span>
            <span className={styles.mastheadDivider}>·</span>
            <span>ELEV 20M</span>
          </div>
          <div className={styles.mastheadStatus}>
            <span className={styles.mastheadItem}>
              <LayersIcon /> 1,846 NOTES SYNCED
            </span>
            <span className={styles.mastheadDivider}>·</span>
            <span className={styles.mastheadItem}>
              <CompassIcon /> CONTOUR &amp; MESH READY
            </span>
            <span className={styles.mastheadDivider}>·</span>
            <span>VAULT V17.71</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 1. Hero Section: Neo-Mirai inspired full-bleed stage with Topographic Contours & Digital Mesh
 * Focuses on Backpacker & Album without duplicating the lower section cards.
 */
function HeroContourStage() {
  return (
    <header className={styles.heroStage} aria-labelledby="hero-main-title">
      {/* Background Artwork + SVG Contour & Digital Mesh Layer */}
      <figure className={styles.heroBackdrop}>
        <img
          className={styles.heroBackdropImg}
          src="/img/hero-contour-horizon.png"
          alt="Topographic mountain ridges connected by glowing trail contours and a digital light mesh under a warm sunset sky."
        />
        <ContourMeshOverlay />
        <figcaption className={styles.srOnly}>
          山徑等高線與數位知識光網交會的個人探險與創作工作室。
        </figcaption>
      </figure>

      {/* Foreground Content Container */}
      <div className={`container ${styles.heroStageInner}`}>
        <CartographicSurveyCrest />

        <div className={styles.heroCopy}>
          <h1 id="hero-main-title" className={styles.heroDisplayTitle}>
            <span>WALK THE TRAIL.</span>
            <span>FRAME THE LIGHT.</span>
            <span>BUILD THE SYSTEM.</span>
          </h1>

          <p className={styles.heroSlogan}>Keep walking, keep making.</p>

          <p className={styles.heroSummary}>
            以真實的 Obsidian Vault 為單一事實來源，用等高線串連長程旅途的山徑航跡、35mm 底片捕捉的光影瞬間，以及持續演進的數位工程光網。
          </p>

          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} to="/inside-kywk/">
              <IslandIcon /> 進入 inside kywk 技能島
            </Link>
            <Link className={styles.btnSecondary} to="/backpacker/lonely-planet/">
              <CompassIcon /> 探索 Backpacker 航跡
            </Link>
          </div>

          <div className={styles.heroTelemetry} aria-label="Expedition and studio coordinates">
            <span>TRAILS: ICELAND · JAPAN · SICHUAN · EUROPE</span>
            <span>HORIZON: 223 EXPEDITION GUIDES &amp; 491 PHOTO STORIES</span>
          </div>
        </div>

        {/* Desktop-only Trail Waypoints & Hover Cards (Config-driven) */}
        <div className={styles.trailWaypointsLayer} aria-label="Interactive Expedition Trail Waypoints">
          {heroWaypoints.map((wp) => (
            <div
              key={wp.id}
              className={`${styles.waypointPinAnchor} ${styles[`align_${wp.cardAlign}`] || ''}`}
              style={{ left: wp.position.left, top: wp.position.top }}>
              <Link
                className={styles.waypointPinButton}
                to={wp.to}
                aria-label={`${wp.title} (${wp.year}, ${wp.elevation})`}>
                <span className={styles.pinBeacon}>
                  <span className={styles.pinRadarPing} />
                  <span className={styles.pinDot} />
                </span>
                <span className={styles.pinElevationTag}>{wp.elevation}</span>
              </Link>

              <div className={styles.waypointHoverCard} role="tooltip">
                <div className={styles.hoverCardTitleRow}>
                  <h4 className={styles.hoverCardTitle}>
                    <Link to={wp.to}>{wp.title}</Link>
                  </h4>
                  <span className={styles.hoverCardYear}>{wp.year}</span>
                </div>
                <div className={styles.hoverCardMeta}>
                  <span>{wp.coord}</span>
                  <span className={styles.hoverCardDivider}>·</span>
                  <span>{wp.elevation}</span>
                </div>
                <p className={styles.hoverCardDesc}>{wp.desc}</p>
                <div className={styles.hoverCardFooter}>
                  <Link className={styles.hoverCardAction} to={wp.to}>
                    閱讀 Story-Map 筆記 <ArrowRightIcon />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

/**
 * 2. Knowledge Pillars Section: Backpacker, Lifehacker, MoCo Lab (Reorganized)
 * Appears once on the page with updated routes and real file counts.
 */
function KnowledgePillarsSection() {
  return (
    <section className={styles.sectionPillars} aria-labelledby="pillars-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 id="pillars-title" className={styles.sectionTitle}>三大知識庫主線</h2>
          <p className={styles.sectionSubtitle}>
            旅途的遠方視野、生活的系統實驗、工程的嚴謹架構，776 篇結構化筆記在同一個 Vault 中有機交織。
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          {/* Dominant Primary Pillar: Backpacker (12 cols) */}
          <article className={styles.pillarBackpacker}>
            <div className={styles.pillarMainContent}>
              <h3 className={styles.pillarTitleLg}>
                <Link to="/backpacker/lonely-planet/">
                  Backpacker · 旅行地圖與 Lonely Planet 指南
                </Link>
              </h3>
              <p className={styles.pillarDesc}>
                從冰島環線自駕、日本東京與輕井澤山徑，到歐洲與四川長途跋涉。將行前準備檢核、在地交通、住宿筆記與互動式等高線地圖收斂為可隨時查閱的探險手冊。
              </p>
              <div className={styles.pillarLinks}>
                <Link className={styles.pillarPill} to="/backpacker/lonely-planet/">
                  <CompassIcon /> Lonely Planet 總覽
                </Link>
                <Link className={styles.pillarPill} to="/moco/obsidian/plugins/geo-story-map/01-geo-story-map-專案介紹/">
                  <MapPinIcon /> StoryMap 地圖語法
                </Link>
              </div>
            </div>

            <div className={styles.pillarMetricsBox}>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>PUBLISHED GUIDES</span>
                <span className={styles.metricValue}>223 篇</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>KEY TRAILS</span>
                <span className={styles.metricValue}>冰島 · 日本 · 歐洲 · 四川</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>BOARD &amp; MAP</span>
                <span className={styles.metricValue}>Kanban × Geo Story Map</span>
              </div>
            </div>
          </article>

          {/* Secondary Pillar 1: Lifehacker (6 cols) */}
          <article className={styles.pillarCard}>
            <div className={styles.pillarCardBody}>
              <h3 className={styles.pillarTitle}>
                <Link to="/lifehacker/way-2-kywk/">
                  Lifehacker · 生活系統與週末專案
                </Link>
              </h3>
              <p className={styles.pillarDesc}>
                習慣養成系統、山岳健行裝備、攝影器材評測、閱讀札記與動手實作的 Weekend Project，記錄每一次日常實驗後沉澱的操作手感。
              </p>
            </div>
            <div className={styles.pillarCardFooter}>
              <div className={styles.pillarLinks}>
                <Link className={styles.pillarPill} to="/lifehacker/way-2-kywk/">
                  <NotebookIcon /> Way 2 kywk 總覽
                </Link>
                <Link className={styles.pillarPill} to="/lifehacker/lifehacker/weekend-project/">
                  週末專案 Weekend Project
                </Link>
              </div>
              <span className={styles.pillarCountBadge}>302 篇筆記</span>
            </div>
          </article>

          {/* Secondary Pillar 2: MoCo Lab (6 cols, Updated for Reorganized Tech Stack & Docusaurus) */}
          <article className={styles.pillarCard}>
            <div className={styles.pillarCardBody}>
              <h3 className={styles.pillarTitle}>
                <Link to="/moco/kywk.moco/">
                  MoCo Lab · 技術堆疊與架構手冊
                </Link>
              </h3>
              <p className={styles.pillarDesc}>
                全新重整的工程資源庫：涵蓋 Tech Stack（Docker 容器實踐、Kong APIM、資料庫與資安防線）、Docusaurus 架構演進與 Obsidian 自動化工作流。
              </p>
            </div>
            <div className={styles.pillarCardFooter}>
              <div className={styles.pillarLinks}>
                <Link className={styles.pillarPill} to="/moco/kywk.moco/">
                  <TerminalIcon /> MoCo Lab 總覽
                </Link>
                <Link className={styles.pillarPill} to="/moco/tech-stack/awesome-tech-stack/">
                  Tech Stack 索引
                </Link>
                <Link className={styles.pillarPill} to="/moco/tech-stack/docker/awesome-docker/">
                  Awesome Docker
                </Link>
              </div>
              <span className={styles.pillarCountBadge}>251 篇手冊</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/**
 * 3. Side Projects Section: Personal Open-Source Plugins (Obsidian & Docusaurus)
 * Built as an extensible Side Projects showcase for current plugins and future projects.
 */
function SideProjectsSection() {
  return (
    <section className={styles.sectionProjects} aria-labelledby="side-projects-title">
      <div className="container">
        <div className={styles.projectsHeaderRow}>
          <div className={styles.sectionHeaderCompact}>
            <h2 id="side-projects-title" className={styles.sectionTitle}>
              Side Projects · 開源外掛與工具造物
            </h2>
            <p className={styles.sectionSubtitle}>
              從日常寫作、地圖敘事與靜態發佈的真實需求出發，親手打造並開源維護的 Obsidian 與 Docusaurus 外掛套件。
            </p>
          </div>

          <div className={styles.projectsQuickNav}>
            <Link className={styles.quickNavLink} to="/moco/obsidian/plugins/obsidian-plugins-overview/">
              Obsidian 外掛總覽 <ArrowRightIcon />
            </Link>
            <Link className={styles.quickNavLink} to="/moco/docusaurus/docusaurus-plugins/">
              Docusaurus 插件筆記 <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div className={styles.projectsMatrix}>
          {sideProjects.map((proj) => {
            const Icon = proj.Icon;
            return (
              <article key={proj.id} className={styles.projectSpecCard}>
                <div className={styles.projectSpecTop}>
                  <div className={styles.projectTitleRow}>
                    <span className={styles.projectIconWrap}>
                      <Icon />
                    </span>
                    <h3 className={styles.projectTitle}>
                      <Link to={proj.docTo}>{proj.title}</Link>
                    </h3>
                  </div>
                  <code className={styles.projectPkgCode}>{proj.pkgName}</code>
                  <p className={styles.projectDesc}>{proj.desc}</p>
                </div>

                <div className={styles.projectSpecBottom}>
                  <div className={styles.projectTagList}>
                    {proj.tags.map((tag) => (
                      <span key={tag} className={styles.projectTag}>{tag}</span>
                    ))}
                  </div>

                  <div className={styles.projectActions}>
                    <Link className={styles.projectDocLink} to={proj.docTo}>
                      {proj.docLabel} <ArrowRightIcon />
                    </Link>
                    {proj.isInternalDemo ? (
                      <Link className={styles.projectRepoLink} to={proj.repoHref}>
                        {proj.repoLabel} <ArrowRightIcon />
                      </Link>
                    ) : (
                      <a
                        className={styles.projectRepoLink}
                        href={proj.repoHref}
                        target="_blank"
                        rel="noopener noreferrer">
                        {proj.repoLabel} <ExternalLinkIcon />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * 4. Editorial & Visual Streams: Photo Album, Life Blog, News Log
 * Unified into one non-redundant asymmetric showcase.
 */
function EditorialStreamsSection() {
  return (
    <section className={styles.sectionStreams} aria-labelledby="streams-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 id="streams-title" className={styles.sectionTitle}>光影畫廊與雙軌日誌</h2>
          <p className={styles.sectionSubtitle}>
            當旅途畫面與生活思考需要更自由的篇幅，分別匯入瀑布流相簿、長篇隨筆與開發者日誌。
          </p>
        </div>

        <div className={styles.streamsAsymmetricGrid}>
          {/* Left 7 cols: Photo Album Gallery Feature */}
          <article className={styles.albumFeatureCard}>
            <div className={styles.albumFeatureBody}>
              <h3 className={styles.albumFeatureTitle}>
                <Link to="/album/">Photo Album · 攝影畫廊與時光相簿</Link>
              </h3>
              <p className={styles.albumFeatureDesc}>
                收錄 491 輯旅途與日常攝影集。透過自製相簿引擎，以 Pinterest 自適應瀑布流、右側 Google Photos 年份時光軸滑桿與全螢幕相片燈箱，沉浸式重溫每一格光影。
              </p>
              <div className={styles.albumSpecPills}>
                <span>491 PHOTO STORIES</span>
                <span>WATERFALL &amp; TIMELINE</span>
                <span>FULLSCREEN LIGHTBOX</span>
              </div>
            </div>

            <div className={styles.albumFeatureFooter}>
              <Link className={styles.btnPrimary} to="/album/">
                <CameraIcon /> 進入相簿畫廊
              </Link>
              <span className={styles.streamMetaCode}>ROUTE: /album/</span>
            </div>
          </article>

          {/* Right 5 cols: Stacked Life Blog & News Log */}
          <div className={styles.blogChannelsStack}>
            <Link className={styles.streamChannelCard} to="/life/">
              <div className={styles.streamChannelBody}>
                <h3 className={styles.streamChannelTitle}>Life Blog · 長篇生活書寫</h3>
                <p className={styles.streamChannelDesc}>
                  長篇生活記事、旅途隨筆與年度回顧。在結構化筆記之外，保留文字的溫度與脈絡。
                </p>
              </div>
              <div className={styles.streamChannelFooter}>
                <span className={styles.streamChannelCount}>閱讀生活隨筆 · 525 篇</span>
                <ArrowRightIcon />
              </div>
            </Link>

            <Link className={styles.streamChannelCard} to="/news/">
              <div className={styles.streamChannelBody}>
                <h3 className={styles.streamChannelTitle}>News Log · 專案與開發日誌</h3>
                <p className={styles.streamChannelDesc}>
                  站台架構升級、外掛發佈紀錄與工具鏈實驗短記，追蹤每一次數位花園的演進軌跡。
                </p>
              </div>
              <div className={styles.streamChannelFooter}>
                <span className={styles.streamChannelCount}>檢視開發日誌 · 54 篇</span>
                <ArrowRightIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} · 旅途等高線、攝影畫廊與數位工匠筆記`}
      description="旅行規劃、攝影相簿、生活實驗、開源外掛與工程筆記交織的公開數位花園，kywk.me 首頁。">
      <div className={styles.gazetteRoot}>
        <GazetteMasthead />
        <HeroContourStage />
        <main>
          <KnowledgePillarsSection />
          <SideProjectsSection />
          <EditorialStreamsSection />
        </main>
      </div>
    </Layout>
  );
}
