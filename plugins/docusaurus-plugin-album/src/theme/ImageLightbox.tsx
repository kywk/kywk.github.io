import React, { useEffect, useCallback } from 'react';
import styles from './styles.module.css';

export type LightboxImage = {
  src: string;
  alt?: string;
  caption?: string;
};

type Props = {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: Props) {
  const total = images.length;
  const currentImage = images[currentIndex];

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (total <= 1) return;
      onIndexChange((currentIndex - 1 + total) % total);
    },
    [currentIndex, total, onIndexChange]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (total <= 1) return;
      onIndexChange((currentIndex + 1) % total);
    },
    [currentIndex, total, onIndexChange]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className={styles.lightboxOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="相片檢視燈箱"
    >
      {/* Photo counter */}
      {total > 1 && (
        <div className={styles.lightboxCounter}>
          {currentIndex + 1} / {total}
        </div>
      )}

      {/* Close button */}
      <button
        type="button"
        className={styles.lightboxCloseBtn}
        onClick={onClose}
        title="關閉 (ESC)"
        aria-label="關閉燈箱"
      >
        ✕
      </button>

      {/* Prev / Next buttons */}
      {total > 1 && (
        <>
          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxPrevBtn}`}
            onClick={handlePrev}
            title="上一張 (←)"
            aria-label="上一張相片"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxNextBtn}`}
            onClick={handleNext}
            title="下一張 (→)"
            aria-label="下一張相片"
          >
            ›
          </button>
        </>
      )}

      {/* Main Image content */}
      <div
        className={styles.lightboxContent}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt || '相簿圖片'}
          className={styles.lightboxImage}
        />
        {(currentImage.caption || currentImage.alt) && (
          <div className={styles.lightboxCaption}>
            {currentImage.caption || currentImage.alt}
          </div>
        )}
      </div>
    </div>
  );
}
