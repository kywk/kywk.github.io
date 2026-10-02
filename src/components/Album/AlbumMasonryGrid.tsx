import React, { memo, useState, useEffect, useMemo, useRef } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export type AlbumPostMeta = {
  permalink: string;
  title: string;
  date: string;
  frontMatter: {
    cover?: string;
    cover_caption?: string;
    location?: string;
    album_series?: string;
    tags?: string[];
    [key: string]: any;
  };
};

type Props = {
  posts: AlbumPostMeta[];
  onCurrentDateChange?: (year: string, month: string) => void;
};

const BATCH_SIZE = 12;

function parseDate(post: AlbumPostMeta): { year: string; month: string; displayDate: string } {
  const permalinkMatch = post.permalink.match(/\/(\d{4})\/(\d{2})\//);
  if (permalinkMatch) {
    const year = permalinkMatch[1];
    const month = String(Number(permalinkMatch[2]));
    return { year, month, displayDate: `${year}年 ${month}月` };
  }

  if (post.date) {
    const d = new Date(post.date);
    if (!isNaN(d.getTime())) {
      const year = `${d.getFullYear()}`;
      const month = `${d.getMonth() + 1}`;
      return { year, month, displayDate: `${year}年 ${month}月` };
    }
  }

  return { year: '2026', month: '1', displayDate: '' };
}

function AlbumMasonryGrid({ posts, onCurrentDateChange }: Props) {
  // 1. Filter out posts without cover (Requirement: 沒有 cover 時不顯示)
  const validPosts = useMemo(() => {
    return posts.filter((p) => Boolean(p.frontMatter?.cover));
  }, [posts]);

  // 2. Infinite scroll state
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, validPosts.length));
        }
      },
      { rootMargin: '350px' }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [validPosts.length]);

  // 3. Responsive column count calculation
  const [columnCount, setColumnCount] = useState(4);
  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      if (w >= 1200) setColumnCount(4);
      else if (w >= 850) setColumnCount(3);
      else if (w >= 560) setColumnCount(2);
      else setColumnCount(1);
    };

    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  // 4. Distribute visible items into columns round-robin
  const currentPosts = useMemo(() => {
    return validPosts.slice(0, visibleCount);
  }, [validPosts, visibleCount]);

  const columns = useMemo(() => {
    const cols: AlbumPostMeta[][] = Array.from({ length: columnCount }, () => []);
    currentPosts.forEach((post, idx) => {
      cols[idx % columnCount].push(post);
    });
    return cols;
  }, [currentPosts, columnCount]);

  // 5. Scroll listener to detect active year & month for TimelineScrubber
  useEffect(() => {
    if (!onCurrentDateChange) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const cards = document.querySelectorAll<HTMLElement>('[data-album-card]');
          let bestCard: HTMLElement | null = null;
          let minDistance = Infinity;

          const viewportCenter = window.innerHeight * 0.35;

          cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            // We want cards that are around the top third of viewport
            const distance = Math.abs(rect.top - viewportCenter);
            if (distance < minDistance) {
              minDistance = distance;
              bestCard = card;
            }
          });

          if (bestCard) {
            const year = (bestCard as HTMLElement).dataset.year || '';
            const month = (bestCard as HTMLElement).dataset.month || '';
            if (year) {
              onCurrentDateChange(year, month);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPosts, onCurrentDateChange]);

  if (validPosts.length === 0) {
    return (
      <div className={styles.endMessage}>
        <p>目前尚無相簿文章，請在 <code>blog.album/</code> 新增相簿 Markdown 筆記。</p>
      </div>
    );
  }

  return (
    <div className={styles.masonryWrapper}>
      <div className={styles.masonryGrid}>
        {columns.map((colPosts, colIdx) => (
          <div key={colIdx} className={styles.masonryColumn}>
            {colPosts.map((post) => {
              const { year, month, displayDate } = parseDate(post);
              return (
                <Link
                  key={post.permalink}
                  to={post.permalink}
                  className={styles.albumCard}
                  data-album-card="true"
                  data-year={year}
                  data-month={month}
                  id={`album-post-${year}-${month}`}
                >
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={post.frontMatter.cover}
                      alt={post.title}
                      className={styles.cardImage}
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Pinterest Style Hover Overlay */}
                    <div className={styles.cardOverlay}>
                      <div className={styles.cardOverlayContent}>
                        <h2 className={styles.cardTitle}>{post.title}</h2>

                        <div className={styles.cardMetaRow}>
                          {post.frontMatter.location && (
                            <span className={styles.pillBadge} title="拍攝地點">
                              📍 {post.frontMatter.location}
                            </span>
                          )}
                          {post.frontMatter.album_series && (
                            <span className={`${styles.pillBadge} ${styles.seriesBadge}`} title="相簿系列">
                              📁 {post.frontMatter.album_series}
                            </span>
                          )}
                          <span className={styles.cardDate}>{displayDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Infinite Scroll Sentinel */}
      {visibleCount < validPosts.length && (
        <div ref={sentinelRef} className={styles.sentinel} />
      )}

      {visibleCount >= validPosts.length && (
        <div className={styles.endMessage}>
          <span>✨ 已經瀏覽完所有相簿囉 ✨</span>
        </div>
      )}
    </div>
  );
}

export default memo(AlbumMasonryGrid);
