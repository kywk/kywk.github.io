import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const FeatureList = [
  {
    id: 'backpacker',
    title: 'Backpacker',
    subtitle: 'Travel Playground',
    Svg: require('@site/static/img/home-backpacker.svg').default,
    description:
      '從冰島到四川，把行前規劃、在地交通與住宿筆記折進屬於自己的 Lonely Planet。',
    to: '/backpacker/Lonely%20Planet/',
    accentColor: 'rgba(255, 159, 67, 0.18)',
  },
  {
    id: 'lifehacker',
    title: 'Lifehacker',
    subtitle: 'Habit & Lifestyle',
    Svg: require('@site/static/img/home-lifehacker.svg').default,
    description:
      '生活系統、習慣追蹤與週末專案，整理每一次嘗試後留下的操作手感。',
    to: '/lifehacker/way-2-kywk/',
    accentColor: 'rgba(56, 189, 248, 0.18)',
  },
  {
    id: 'moco',
    title: 'MoCo Lab',
    subtitle: 'Engineering Notes',
    Svg: require('@site/static/img/home-moco.svg').default,
    description:
      'DevSecOps、程式語言與工具鏈的實驗場，把工程日常拆解成可複用的 SOP。',
    to: '/moco/kywk.moco/',
    accentColor: 'rgba(129, 140, 248, 0.18)',
  },
];

function Feature({Svg, title, subtitle, description, to, accentColor}) {
  return (
    <Link className={clsx(styles.featureCard)} to={to}>
      <div className={styles.featureIconWrapper} style={{background: accentColor}}>
        <Svg className={styles.featureIcon} role="img" />
      </div>
      <div className={styles.featureContent}>
        <span className={styles.featureSubtitle}>{subtitle}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <span className={styles.featureLink}>展開筆記 →</span>
      </div>
    </Link>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <span className={styles.featuresEyebrow}>主題索引</span>
          <h2>三條主線，持續更新</h2>
          <p>旅行、生活與工程筆記彼此呼應，歡迎挑一條線開始探索。</p>
        </div>
        <div className={clsx('row', styles.featureGrid)}>
          {FeatureList.map((props) => (
            <div key={props.id} className={clsx('col col--4', styles.featureCol)}>
              <Feature {...props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
