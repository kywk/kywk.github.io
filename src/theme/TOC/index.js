import React, {useCallback, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import TOCOriginal from '@theme-original/TOC';
import styles from './styles.module.css';

const STORAGE_KEY = 'kywk-toc-collapsed';

function ListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 4h12M2 8h12M2 12h7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M4.5 2.5 8 6l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 可收合的 TOC 包裝：docs 與 blog 文章共用。
 *
 * - 展開：原樣渲染，並在上方加一列「收合」按鈕。
 * - 收合：右側欄由全域 CSS（custom.css 的 :has 規則）隱藏，
 *   文章取回滿寬；展開按鈕以 portal 掛到 body，浮動在右上角。
 * - 狀態記在 localStorage，下次進文章維持上次選擇。
 * - 手機版（<=996px）維持 Docusaurus 原生折疊目錄，不顯示自訂按鈕。
 */
export default function TOC(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === '1') {
        setCollapsed(true);
      }
    } catch (e) {
      // localStorage 不可用時維持展開，不影響閱讀
    }
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      } catch (e) {
        // 寫入失敗時只影響記憶偏好，不影響當次切換
      }
      return next;
    });
  }, []);

  return (
    <>
      <div className={clsx(styles.tocWrapper, collapsed && 'kywk-toc-collapsed')}>
        {!collapsed && (
          <>
            <button
              type="button"
              className={styles.collapseButton}
              onClick={toggleCollapsed}
              aria-expanded="true"
              aria-label="收合目錄"
              title="收合目錄">
              收合
              <ChevronIcon />
            </button>
            <TOCOriginal {...props} />
          </>
        )}
      </div>
      {mounted && collapsed
        ? createPortal(
            <button
              type="button"
              className={styles.expandButton}
              onClick={toggleCollapsed}
              aria-expanded="false"
              aria-label="展開目錄"
              title="展開目錄">
              <ListIcon />
              目錄
            </button>,
            document.body,
          )
        : null}
    </>
  );
}
