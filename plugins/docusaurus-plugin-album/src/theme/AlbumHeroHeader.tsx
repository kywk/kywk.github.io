import React from 'react';
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

export default function AlbumHeroHeader({
  title,
  date,
  cover,
  coverCaption,
  location,
  albumSeries,
  onCoverClick,
}: Props) {
  let displayDate = date;
  if (date) {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      displayDate = `${d.getFullYear()}年 ${d.getMonth() + 1}月 ${d.getDate()}日`;
    }
  }

  return (
    <header className={styles.postHero}>
      {cover && (
        <div
          className={styles.heroImageContainer}
          onClick={onCoverClick}
          title="點擊檢視封面大圖"
          role="button"
          tabIndex={0}
        >
          <img
            src={cover}
            alt={title}
            className={styles.heroCoverImage}
            loading="eager"
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
