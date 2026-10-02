import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Layout from '@theme/Layout';
import { PageMetadata } from '@docusaurus/theme-common';
import SearchMetadata from '@theme/SearchMetadata';
import AlbumMasonryGrid, { type AlbumPostMeta } from './AlbumMasonryGrid';
import TimelineScrubber from './TimelineScrubber';
import styles from './styles.module.css';

type Props = {
  metadata: {
    blogTitle: string;
    blogDescription: string;
    permalink: string;
    [key: string]: any;
  };
  items: readonly {
    content: {
      metadata: AlbumPostMeta;
    };
  }[];
  sidebar: any;
};

export default function AlbumListPage(props: Props) {
  const { metadata, items } = props;

  const posts: AlbumPostMeta[] = useMemo(() => {
    return items.map(({ content }) => content.metadata);
  }, [items]);

  // Extract unique years for TimelineScrubber in descending order
  const years = useMemo(() => {
    const yearSet = new Set<string>();
    posts.forEach((p) => {
      if (p.frontMatter?.cover) {
        const match = p.permalink.match(/\/(\d{4})\//);
        if (match) {
          yearSet.add(match[1]);
        } else if (p.date) {
          const d = new Date(p.date);
          if (!isNaN(d.getTime())) yearSet.add(`${d.getFullYear()}`);
        }
      }
    });
    return Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
  }, [posts]);

  const [activeYear, setActiveYear] = useState<string>(() => years[0] || '2026');
  const [activeMonth, setActiveMonth] = useState<string>('');
  const [scrubberVisible, setScrubberVisible] = useState(false);

  // Monitor scroll position to show/hide TimelineScrubber
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrubberVisible(window.scrollY > 120);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCurrentDateChange = useCallback((year: string, month: string) => {
    setActiveYear(year);
    setActiveMonth(month);
  }, []);

  const handleSelectYear = useCallback((year: string) => {
    const targetCard = document.querySelector<HTMLElement>(`[data-year="${year}"]`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <Layout
      title="Album 相簿"
      description={metadata.blogDescription || '旅行、生活與光影紀錄相簿'}
    >
      <PageMetadata title="Album 相簿" description={metadata.blogDescription} />
      <SearchMetadata tag="blog_posts_list" />

      <main className={styles.albumContainer}>
        <header className={styles.albumHeader}>
          <h1 className={styles.albumTitle}>Album 相簿</h1>
          <p className={styles.albumDescription}>
            用快門記錄旅途風光與生活剪影，在光影與時間軸中重溫每一刻感動。
          </p>
        </header>

        <AlbumMasonryGrid
          posts={posts}
          onCurrentDateChange={handleCurrentDateChange}
        />

        <TimelineScrubber
          years={years}
          activeYear={activeYear}
          activeMonth={activeMonth}
          visible={scrubberVisible}
          onSelectYear={handleSelectYear}
        />
      </main>
    </Layout>
  );
}
