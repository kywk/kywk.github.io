import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

const heroHighlights = [
  'Lonely Planet 式的長程旅行紀錄',
  '生活習慣、效率工具與週末專案',
  'MoCo 工程筆記與工具實驗',
];

const journalChannels = [
  {
    id: 'news',
    title: 'News Log',
    description: '專案筆記、版本紀錄與開發者日誌。',
    to: '/news',
    tone: 'NEWS',
  },
  {
    id: 'life',
    title: 'Life Blog',
    description: '長篇生活書寫與影像故事，記下日常的質感。',
    to: '/life',
    tone: 'LIFE',
  },
];

const quickStarts = [
  {
    id: 'lonely-planet',
    title: 'Lonely Planet Toolkit',
    description: '行前 checklist、交通攻略與目的地索引，一次掌握長程旅行的準備。',
    to: '/backpacker/lonely-planet/',
  },
  {
    id: 'weekend-project',
    title: 'Weekend Project',
    description: '把點子化成作品的週末練習，紀錄每一次動手的細節。',
    to: '/lifehacker/WEEKEND-PROJECT/',
  },
  {
    id: 'devsecops',
    title: 'DevSecOps 工具箱',
    description: '從 CICD 到安全防線，收斂日常所用的工程工具與流程。',
    to: '/moco/category/devsecops',
  },
];

function Hero() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>kywk 的數位花園</span>
          <h1 className={styles.heroTitle}>Keep walking, keep making.</h1>
          <p className={styles.heroSubtitle}>
            旅行規劃、生活實驗與工程筆記交織的工作室，持續整理一路上收集的靈感與做法。
          </p>
          <ul className={styles.heroHighlights}>
            {heroHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.heroActions}>
            <Link
              className={clsx('button button--primary button--lg', styles.heroButton)}
              to="/backpacker/lonely-planet/">
              探索 Backpacker
            </Link>
            <Link
              className={clsx('button button--secondary button--lg', styles.heroButtonSecondary)}
              to="/lifehacker/way-2-kywk/">
              打開 Lifehacker
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function ChannelCard({ channel }) {
  return (
    <Link className={styles.channelCard} to={channel.to}>
      <span className={styles.channelTone}>{channel.tone}</span>
      <h3>{channel.title}</h3>
      <p>{channel.description}</p>
      <span className={styles.cardLink}>進入頻道 →</span>
    </Link>
  );
}

function QuickStartItem({ item }) {
  return (
    <li className={styles.quickItem}>
      <Link to={item.to}>
        <span className={styles.quickTitle}>{item.title}</span>
        <span className={styles.quickDescription}>{item.description}</span>
        <span className={styles.cardLink}>閱讀筆記 →</span>
      </Link>
    </li>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="kywk 的筆記地圖" description="旅行、生活實驗、工程筆記的交會點，kywk 的數位花園首頁。">
      <Hero />
      <main>
        <HomepageFeatures />
        <section className={styles.channelsSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>筆記頻道</span>
              <h2>長文章與故事專欄</h2>
              <p>當旅程、生活與工作需要更長的篇幅，就在這裡延伸細節。</p>
            </div>
            <div className={styles.cardGrid}>
              {journalChannels.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.quickSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Quick Start</span>
              <h2>目前正在走的主題</h2>
              <p>挑幾個還在生長中的筆記，直接切入感興趣的路徑。</p>
            </div>
            <ul className={styles.quickList}>
              {quickStarts.map((item) => (
                <QuickStartItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}
