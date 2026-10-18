import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

/* ==========================================================================
   Authored SVG Icons (Craft Floor: consistent 2px stroke, currentColor)
   ========================================================================== */

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
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
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

/* ==========================================================================
   Data Structures: Real Product Truth
   ========================================================================== */

const dispatchStubs = [
  {
    tag: 'Expedition',
    count: '191 篇',
    desc: 'Lonely Planet 旅程攻略與地圖',
    to: '/backpacker/lonely-planet/',
  },
  {
    tag: 'Habit & Life',
    count: '304 篇',
    desc: '生活系統、攝影手帳與週末專案',
    to: '/lifehacker/way-2-kywk/',
  },
  {
    tag: 'Engineering',
    count: '272 篇',
    desc: 'DevSecOps、工具鏈與架構手冊',
    to: '/moco/kywk.moco/',
  },
];

const observationCards = [
  {
    id: 'album-spot',
    badge: 'Photo Frame #01',
    badgeClass: 'observationBadge',
    title: 'Photo Album / 攝影畫廊與時光相簿',
    content: '走過冰島雪原、京都步道與海陸邊緣。Pinterest 瀑布流與全螢幕燈箱，沉浸瀏覽每一格底片光影。',
    metaLeft: '35MM RAW · LIGHTBOX',
    metaRight: '進入畫廊 →',
    to: '/album/',
    Icon: CameraIcon,
  },
  {
    id: 'storymap-spot',
    badge: 'Waypoint #02',
    badgeClass: 'observationBadge observationBadgeTeal',
    title: 'Lonely Planet 航跡與故事地圖',
    content: '將行前 Checklist、在地交通指南與 StoryMap 故事地圖串連，打造可離線查閱的長程探險指引。',
    metaLeft: 'GPS 64°08\'N · STORYMAP',
    metaRight: '探索航線 →',
    to: '/backpacker/lonely-planet/',
    Icon: MapPinIcon,
  },
  {
    id: 'telemetry-spot',
    badge: 'Telemetry #03',
    badgeClass: 'observationBadge',
    title: 'MoCo Lab / DevSecOps 自動化工具箱',
    content: '從 Kong API Gateway 到 Docker 容器化防線與自動發佈，收斂日常可復用的工程架構與 SOP。',
    metaLeft: 'PIPELINE PASS · SOPS READY',
    metaRight: '查看手冊 →',
    to: '/moco/kywk.moco/',
    Icon: TerminalIcon,
  },
];

const fieldNotes = [
  {
    index: '[01]',
    category: 'Backpacker',
    title: 'Lonely Planet Toolkit',
    desc: '行前 Checklist、交通攻略與目的地索引，掌握長途旅行的準備流程。',
    to: '/backpacker/lonely-planet/',
  },
  {
    index: '[02]',
    category: 'Lifehacker',
    title: 'Weekend Project (週末專案)',
    desc: '把點子化成實體作品與數位工具的週末練習，記下每一次動手的細節。',
    to: '/lifehacker/lifehacker/weekend-project/',
  },
  {
    index: '[03]',
    category: 'DevSecOps',
    title: 'Docker 工具箱與容器最佳實踐',
    desc: '從基礎映像檔瘦身、安全認證到容器化管線配置的工程實戰清單。',
    to: '/moco/devsecops/docker/awesome-docker/',
  },
  {
    index: '[04]',
    category: 'Photo Album',
    title: '攝影相簿與旅途光影展',
    desc: '結合 Pinterest 瀑布流與全螢幕相片燈箱的沉浸式生活時光軸。',
    to: '/album/',
  },
];

/* ==========================================================================
   Components
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
            <span>ELEV 20m</span>
          </div>
          <div className={styles.mastheadStatus}>
            <span className={styles.mastheadItem}>
              <LayersIcon /> 2,000+ NOTES SYNCED
            </span>
            <span className={styles.mastheadDivider}>·</span>
            <span className={styles.mastheadItem}>
              <CompassIcon /> STORYMAP READY
            </span>
            <span className={styles.mastheadDivider}>·</span>
            <span>OBSIDIAN REPO V17.71</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroCartographicHub() {
  return (
    <header className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroGrid}>
          {/* Left Axis: Manifesto & Waypoint Actions */}
          <div className={styles.heroManifesto}>
            <h1 className={styles.heroTitle}>Keep walking, keep making.</h1>
            <p className={styles.heroLead}>
              旅行規劃、生活實驗與工程筆記交織的公開工作室。以真實的 Obsidian Vault 為單一事實來源，紀錄每一次涉足荒野與深入系統的手感。
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.btnPrimary} to="/backpacker/lonely-planet/">
                <CompassIcon /> 探索 Backpacker 航線
              </Link>
              <Link className={styles.btnSecondary} to="/lifehacker/way-2-kywk/">
                <NotebookIcon /> 翻開 Lifehacker 手帳
              </Link>
              <Link className={styles.btnSecondary} to="/moco/kywk.moco/">
                <TerminalIcon /> MoCo 工程實驗室
              </Link>
            </div>

            <div className={styles.dispatchStubs}>
              {dispatchStubs.map((stub) => (
                <Link key={stub.tag} className={styles.stubItem} to={stub.to}>
                  <span className={stubTagClass(stub.tag)}>{stub.tag}</span>
                  <span className={styles.stubCount}>{stub.count}</span>
                  <span className={styles.stubDesc}>{stub.desc}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Axis: Multi-Dimensional Observation Deck */}
          <aside className={styles.observationDeck}>
            {observationCards.map((card) => {
              const Icon = card.Icon;
              return (
                <Link key={card.id} className={styles.observationCard} to={card.to}>
                  <div className={styles.observationCardHeader}>
                    <span className={styles[card.badgeClass] || styles.observationBadge}>
                      <Icon /> {card.badge}
                    </span>
                    <span className={styles.observationAction}>
                      {card.metaRight}
                    </span>
                  </div>
                  <h3 className={styles.observationTitle}>{card.title}</h3>
                  <p className={styles.observationContent}>{card.content}</p>
                  <div className={styles.observationMetaRow}>
                    <span className={styles.observationMetaItem}>
                      {card.metaLeft}
                    </span>
                  </div>
                </Link>
              );
            })}
          </aside>
        </div>
      </div>
    </header>
  );
}

function stubTagClass(tag) {
  return styles.stubTag;
}

function CoreExpeditionsSection() {
  return (
    <section className={styles.sectionExpeditions}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>三大核心主線，持續推進</h2>
          <p className={styles.sectionSubtitle}>
            探險的遠方視野、生活的系統實驗、工程的嚴謹手感，三者在同一個知識花園中交會。
          </p>
        </div>

        <div className={styles.expeditionLayout}>
          {/* Dominant Primary Card: Backpacker (12 cols) */}
          <article className={styles.cardBackpacker}>
            <div>
              <span className={styles.cardTicketTag}>EXP-01 · EXPEDITION</span>
              <h3 className={styles.cardBackpackerTitle}>
                <Link to="/backpacker/lonely-planet/">
                  Backpacker / 旅行地圖與 Lonely Planet
                </Link>
              </h3>
              <p className={styles.cardBackpackerDesc}>
                從冰島環線、極光追尋到日本關西與四川，把行前檢核、在地交通、住宿與 StoryMap 故事地圖折疊成屬於自己的 Lonely Planet 探索指引。
              </p>
              <div className={styles.cardPillGroup}>
                <Link className={styles.cardPill} to="/backpacker/lonely-planet/">
                  <CompassIcon /> Lonely Planet 總覽
                </Link>
                <Link className={styles.cardPill} to="/backpacker/lonely-planet/">
                  <MapPinIcon /> 行前準備 Checklist
                </Link>
                <Link className={styles.cardPill} to="/album/">
                  <CameraIcon /> 旅行實拍紀錄
                </Link>
              </div>
            </div>

            <div className={styles.cardBackpackerVisual}>
              <div className={styles.visualStatRow}>
                <span className={styles.visualStatLabel}>EXPEDITION LOGS</span>
                <span className={styles.visualStatValue}>191 篇</span>
              </div>
              <div className={styles.visualStatRow}>
                <span className={styles.visualStatLabel}>STORYMAP RENDER</span>
                <span className={styles.visualStatValue}>ACTIVE</span>
              </div>
              <div className={styles.visualStatRow}>
                <span className={styles.visualStatLabel}>KEY REGIONS</span>
                <span className={styles.visualStatValue}>冰島 / 日本 / 歐洲</span>
              </div>
              <div className={styles.visualStatRow}>
                <span className={styles.visualStatLabel}>KANBAN ITINERARY</span>
                <span className={styles.visualStatValue}>ENABLED</span>
              </div>
            </div>
          </article>

          {/* Secondary Card 1: Lifehacker (6 cols) */}
          <article className={styles.cardSecondary}>
            <div className={styles.cardSecondaryHeader}>
              <span className={styles.cardTicketTag}>EXP-02 · HABIT & SYSTEM</span>
              <h3 className={styles.cardSecondaryTitle}>
                <Link to="/lifehacker/way-2-kywk/">
                  Lifehacker / 生活黑客與手帳
                </Link>
              </h3>
              <p className={styles.cardSecondaryDesc}>
                習慣養成系統、攝影評測、閱讀札記與週末動手做的專案紀錄，整理每一次反覆嘗試後沉澱的操作手感。
              </p>
            </div>
            <div className={styles.cardPillGroup}>
              <Link className={styles.cardPill} to="/lifehacker/way-2-kywk/">
                Way 2 kywk 核心入口
              </Link>
              <Link className={styles.cardPill} to="/lifehacker/lifehacker/weekend-project/">
                週末專案 Weekend Project
              </Link>
            </div>
          </article>

          {/* Secondary Card 2: MoCo Lab (6 cols) */}
          <article className={styles.cardSecondary}>
            <div className={styles.cardSecondaryHeader}>
              <span className={styles.cardTicketTag}>EXP-03 · ENGINEERING</span>
              <h3 className={styles.cardSecondaryTitle}>
                <Link to="/moco/kywk.moco/">
                  MoCo Lab / 工程筆記與工具箱
                </Link>
              </h3>
              <p className={styles.cardSecondaryDesc}>
                DevSecOps、Docker 容器化、Kong API Gateway 與 CI/CD 自動化管線實驗場，把工程日常拆解為可復用的自動化 SOP。
              </p>
            </div>
            <div className={styles.cardPillGroup}>
              <Link className={styles.cardPill} to="/moco/kywk.moco/">
                MoCo Lab 總覽
              </Link>
              <Link className={styles.cardPill} to="/moco/devsecops/docker/awesome-docker/">
                Docker 容器實踐清單
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function GazetteStreamsSection() {
  return (
    <section className={styles.sectionStreams}>
      <div className="container">
        {/* Photo Album Spotlight Banner (Highlighting the Album plugin) */}
        <div className={styles.albumBanner}>
          <div>
            <span className={styles.cardTicketTag}>SPECIAL GALLERY · PHOTO ALBUM</span>
            <h3 className={styles.albumBannerTitle}>
              <Link to="/album/">Photo Album / 攝影相簿與時光畫廊</Link>
            </h3>
            <p className={styles.albumBannerDesc}>
              獨立相簿系統（Pinterest 瀑布流 + Google Photos 時光軸 + 全螢幕相片燈箱），收錄長程旅程與生活細節的光影印記。
            </p>
            <Link className={styles.albumBannerAction} to="/album/">
              進入相簿畫廊 <ArrowRightIcon />
            </Link>
          </div>

          <div className={styles.albumPreviewVisual}>
            <div className={styles.albumVisualRow}>
              <span>GALLERY ENGINE</span>
              <strong>ALBUM PLUGIN</strong>
            </div>
            <div className={styles.albumVisualRow}>
              <span>VIEW MODE</span>
              <strong>WATERFALL & TIMELINE</strong>
            </div>
            <div className={styles.albumVisualRow}>
              <span>LIGHTBOX</span>
              <strong>FULLSCREEN READY</strong>
            </div>
          </div>
        </div>

        {/* Twin Editorial Streams */}
        <div className={styles.twinStreamGrid}>
          <Link className={styles.streamCard} to="/life/">
            <div>
              <span className={styles.streamBadge}>EDITORIAL CHANNEL · LIFE</span>
              <h3 className={styles.streamTitle}>Life Blog / 長篇生活書寫</h3>
              <p className={styles.streamDesc}>
                長篇生活記事與影像隨筆，當旅程、思考與日常需要更長的篇幅，就在這裡留下細膩的文字與溫度。
              </p>
            </div>
            <div className={styles.streamFooter}>
              <span>閱讀生活隨筆 (523 篇)</span>
              <ArrowRightIcon />
            </div>
          </Link>

          <Link className={styles.streamCard} to="/news/">
            <div>
              <span className={styles.streamBadgeNews}>DISPATCH LOG · NEWS</span>
              <h3 className={styles.streamTitle}>News Log / 專案與技術日誌</h3>
              <p className={styles.streamDesc}>
                專案進度、版本紀錄、工具鏈升級與開發者實驗筆記，追蹤每一次數位花園的生長軌跡。
              </p>
            </div>
            <div className={styles.streamFooter}>
              <span>檢視開發日誌 (54 篇)</span>
              <ArrowRightIcon />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FieldNotesSection() {
  return (
    <section className={styles.sectionFieldNotes}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>精選野外筆記與高頻索引</h2>
          <p className={styles.sectionSubtitle}>
            挑選幾條高頻率查閱的筆記與工具箱，直接切入感興趣的探索路徑。
          </p>
        </div>

        <ul className={styles.ticketStripList}>
          {fieldNotes.map((item) => (
            <li key={item.index} className={styles.ticketStrip}>
              <Link className={styles.ticketStripLink} to={item.to}>
                <span className={styles.ticketIndex}>{item.index}</span>
                <span className={styles.ticketCategory}>{item.category}</span>
                <div className={styles.ticketDetails}>
                  <h4 className={styles.ticketTitle}>{item.title}</h4>
                  <p className={styles.ticketDesc}>{item.desc}</p>
                </div>
                <span className={styles.ticketArrow}>
                  <ArrowRightIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="kywk 的筆記地圖與探險工作室"
      description="旅行規劃、生活實驗與工程筆記交織的公開數位花園，kywk.me 首頁。">
      <div className={styles.gazetteRoot}>
        <GazetteMasthead />
        <HeroCartographicHub />
        <main>
          <CoreExpeditionsSection />
          <GazetteStreamsSection />
          <FieldNotesSection />
        </main>
      </div>
    </Layout>
  );
}
