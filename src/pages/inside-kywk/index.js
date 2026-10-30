import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import styles from './index.module.css';

const QUICK_LINKS = [
  { label: '首頁', path: '/', icon: '⌂' },
  { label: 'Backpacker 航跡', path: '/backpacker/lonely-planet/', icon: '🧭', accent: '#e26d2d' },
  { label: 'Lifehacker 系統', path: '/lifehacker/way-2-kywk/', icon: '⚡', accent: '#4d8b55' },
  { label: 'MoCo 工程', path: '/moco/kywk.moco/', icon: '🛠', accent: '#2e6b68' },
  { label: 'Album 光影', path: '/album/', icon: '📷', accent: '#d97706' },
  { label: 'Life 日誌', path: '/life/', icon: '✍', accent: '#7a5ea8' },
  { label: 'News 時事', path: '/news/', icon: '📰', accent: '#5c4738' },
];

export default function InsideKywkPage() {
  const [navOpen, setNavOpen] = useState(false);
  const frameUrl = useBaseUrl('/inside-kywk-assets/frame.html');

  return (
    <Layout
      noFooter
      title="inside kywk 技能島 | 腦筋急轉彎 3D 數位花園"
      description="14 座主題技能島、五大群島聚落、57 座立體山岳與建築地標，串連 Backpacker 航跡、Lifehacker 系統、MoCo 工程造物與 491 輯光影記憶。"
      wrapperClassName={styles.pageWrapper}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <main className={styles.stageContainer}>
        {/* Floating Quick Jump Dock (Modernist Cartography Gazette) */}
        <aside className={`${styles.quickDock} ${navOpen ? styles.quickDockOpen : ''}`} aria-label="全站快速傳送導航">
          <button
            type="button"
            className={styles.dockToggle}
            onClick={() => setNavOpen(!navOpen)}
            aria-label={navOpen ? '收合導航' : '展開全站導航'}
            title="全站快速導航"
          >
            <span className={styles.dockToggleIcon}>{navOpen ? '✕' : '🗺'}</span>
            <span className={styles.dockToggleLabel}>全站快速導航</span>
          </button>

          <nav className={styles.dockLinks}>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={styles.dockLink}
                style={link.accent ? { '--link-accent': link.accent } : undefined}
              >
                <span className={styles.dockIcon}>{link.icon}</span>
                <span className={styles.dockLabel}>{link.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Full-Bleed 3D Scene Iframe */}
        <iframe
          src={frameUrl}
          className={styles.islandFrame}
          title="inside kywk 3D 技能島"
          allow="accelerometer; autoplay; encrypted-media; gyroscope"
        />
      </main>
    </Layout>
  );
}
