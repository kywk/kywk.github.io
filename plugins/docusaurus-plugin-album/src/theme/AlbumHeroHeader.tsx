import React, { memo, useMemo, useCallback } from 'react';
import styles from './styles.module.css';

type Props = {
  title: string;
  date: string;
  cover?: string;
  coverCaption?: string;
  location?: string;
  albumSeries?: string;
  onCoverClick?: () => void;
};

function AlbumHeroHeader({
  title,
  date,
  cover,
  coverCaption,
  location,
  albumSeries,
  onCoverClick,
}: Props) {
  const displayDate = useMemo(() => {
    if (!date) return '';
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      return `${d.getUTCFullYear()}年 ${d.getUTCMonth() + 1}月 ${d.getUTCDate()}日`;
    }
    return date;
  }, [date]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!onCoverClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onCoverClick();
      }
    },
    [onCoverClick]
  );

  return (
    <header className={styles.postHero}>
      {cover && (
        <div
          className={styles.heroImageContainer}
          onClick={onCoverClick}
          onKeyDown={handleKeyDown}
          title="點擊檢視封面大圖"
          role="button"
          tabIndex={0}
        >
          <img
            src={cover}
            alt={title}
            className={styles.heroCoverImage}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          {coverCaption && (
            <div className={styles.heroCaption}>
              {coverCaption}
            </div>
          )}
        </div>
      )}

      <div className={styles.heroMetaBody}>
        <h1 className={styles.heroTitle}>{title}</h1>

        <div className={styles.heroBadgesRow}>
          {location && (
            <span className={`${styles.heroBadge} ${styles.locationBadge}`}>
              📍 {location}
            </span>
          )}
          {albumSeries && (
            <span className={`${styles.heroBadge} ${styles.seriesBadge}`}>
              📁 {albumSeries}
            </span>
          )}
          {displayDate && (
            <span className={`${styles.heroBadge} ${styles.heroDateBadge}`}>
              📅 {displayDate}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(AlbumHeroHeader);
