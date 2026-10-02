/**
 * Custom BlogSidebarContent for kywk.me
 * Features:
 * 1. Collapsible year grouping
 * 2. Collapsible month grouping when year item count > 30
 * 3. Smart open (auto-expand active post's year/month, or latest year if none active)
 * 4. Auto-scroll to active item on page navigation
 */

import React, { memo, useState, useEffect, useMemo, useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { useLocation } from '@docusaurus/router';
import { Collapsible, useThemeConfig } from '@docusaurus/theme-common';
import { isSamePath } from '@docusaurus/theme-common/internal';
import type { Props } from '@theme/BlogSidebar/Content';
import type { BlogSidebarItem } from '@docusaurus/plugin-content-blog';

import styles from './styles.module.css';

const MONTH_COLLAPSE_THRESHOLD = 30;

type MonthGroup = {
  month: string;
  monthLabel: string;
  items: BlogSidebarItem[];
};

type YearGroup = {
  year: string;
  totalCount: number;
  hasMonths: boolean;
  months?: MonthGroup[];
  items?: BlogSidebarItem[];
};

function parseItemDate(item: BlogSidebarItem): { year: string; month: string } {
  // Try extracting from permalink first (e.g. /life/2009/04/04/...) to match URL structure
  const permalinkMatch = item.permalink.match(/\/(\d{4})\/(\d{2})\//);
  if (permalinkMatch) {
    return {
      year: permalinkMatch[1],
      month: permalinkMatch[2],
    };
  }

  // Fallback to item.date
  if (item.date) {
    const d = new Date(item.date);
    if (!isNaN(d.getTime())) {
      const year = `${d.getFullYear()}`;
      const month = String(d.getMonth() + 1).padStart(2, '0');
      return { year, month };
    }
  }

  return { year: 'Other', month: '00' };
}

function groupBlogItems(items: BlogSidebarItem[], threshold = MONTH_COLLAPSE_THRESHOLD): YearGroup[] {
  const yearMap = new Map<string, BlogSidebarItem[]>();

  for (const item of items) {
    const { year } = parseItemDate(item);
    if (!yearMap.has(year)) {
      yearMap.set(year, []);
    }
    yearMap.get(year)!.push(item);
  }

  // Sort years descending (numbers first desc, 'Other' last)
  const sortedYears = Array.from(yearMap.keys()).sort((a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    return Number(b) - Number(a);
  });

  return sortedYears.map((year) => {
    const yearItems = yearMap.get(year)!;
    if (yearItems.length > threshold) {
      const monthMap = new Map<string, BlogSidebarItem[]>();
      for (const item of yearItems) {
        const { month } = parseItemDate(item);
        if (!monthMap.has(month)) {
          monthMap.set(month, []);
        }
        monthMap.get(month)!.push(item);
      }

      // Sort months descending (12 down to 01)
      const sortedMonths = Array.from(monthMap.keys()).sort((a, b) => Number(b) - Number(a));
      const months: MonthGroup[] = sortedMonths.map((m) => ({
        month: m,
        monthLabel: `${Number(m)} 月`,
        items: monthMap.get(m)!,
      }));

      return {
        year,
        totalCount: yearItems.length,
        hasMonths: true,
        months,
      };
    } else {
      return {
        year,
        totalCount: yearItems.length,
        hasMonths: false,
        items: yearItems,
      };
    }
  });
}

function containsActiveItem(items: BlogSidebarItem[], currentPath: string): boolean {
  return items.some((item) => isSamePath(item.permalink, currentPath));
}

// Caret Icon
function CaretIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span className={clsx(styles.caret, isOpen && styles.caretOpen)} aria-hidden="true">
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </span>
  );
}

// Month group component
function BlogSidebarMonthGroup({
  monthGroup,
  ListComponent,
  currentPath,
}: {
  monthGroup: MonthGroup;
  ListComponent: Props['ListComponent'];
  currentPath: string;
}) {
  const hasActive = useMemo(
    () => containsActiveItem(monthGroup.items, currentPath),
    [monthGroup.items, currentPath]
  );

  const [isOpen, setIsOpen] = useState(() => hasActive);

  // Auto-expand when user navigates into an article in this month
  useEffect(() => {
    if (hasActive) {
      setIsOpen(true);
    }
  }, [hasActive]);

  return (
    <div className={styles.monthGroup}>
      <button
        type="button"
        className={clsx(
          styles.groupHeader,
          styles.monthHeader,
          isOpen && styles.groupHeaderOpen,
          hasActive && styles.groupHeaderActive
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className={styles.groupTitleWrap}>
          <span className={styles.monthTitle}>{monthGroup.monthLabel}</span>
          <span className={clsx(styles.countBadge, styles.monthCountBadge)}>
            {monthGroup.items.length} 篇
          </span>
        </span>
        <CaretIcon isOpen={isOpen} />
      </button>

      <Collapsible lazy={false} collapsed={!isOpen}>
        <div className={styles.monthContent}>
          <ListComponent items={monthGroup.items} />
        </div>
      </Collapsible>
    </div>
  );
}

// Year group component
function BlogSidebarYearGroup({
  yearGroup,
  ListComponent,
  currentPath,
  isLatestYear,
  hasAnyActiveInBlog,
}: {
  yearGroup: YearGroup;
  ListComponent: Props['ListComponent'];
  currentPath: string;
  isLatestYear: boolean;
  hasAnyActiveInBlog: boolean;
}) {
  const allYearItems = useMemo(() => {
    if (yearGroup.hasMonths && yearGroup.months) {
      return yearGroup.months.flatMap((m) => m.items);
    }
    return yearGroup.items ?? [];
  }, [yearGroup]);

  const hasActive = useMemo(
    () => containsActiveItem(allYearItems, currentPath),
    [allYearItems, currentPath]
  );

  // If there's an active post, only the active year is open by default.
  // If no post is active (e.g. blog list page /life/), the latest year is open.
  const [isOpen, setIsOpen] = useState(() => {
    if (hasAnyActiveInBlog) {
      return hasActive;
    }
    return isLatestYear;
  });

  // Auto-expand when user navigates into an article in this year
  useEffect(() => {
    if (hasActive) {
      setIsOpen(true);
    }
  }, [hasActive]);

  return (
    <div className={styles.yearGroup} role="group">
      <button
        type="button"
        className={clsx(
          styles.groupHeader,
          styles.yearHeader,
          isOpen && styles.groupHeaderOpen,
          hasActive && styles.groupHeaderActive
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className={styles.groupTitleWrap}>
          <span className={styles.yearTitle}>{yearGroup.year}</span>
          <span className={styles.countBadge}>{yearGroup.totalCount} 篇</span>
        </span>
        <CaretIcon isOpen={isOpen} />
      </button>

      <Collapsible lazy={false} collapsed={!isOpen}>
        <div className={styles.yearContent}>
          {yearGroup.hasMonths && yearGroup.months ? (
            yearGroup.months.map((m) => (
              <BlogSidebarMonthGroup
                key={m.month}
                monthGroup={m}
                ListComponent={ListComponent}
                currentPath={currentPath}
              />
            ))
          ) : (
            <ListComponent items={yearGroup.items ?? []} />
          )}
        </div>
      </Collapsible>
    </div>
  );
}

function BlogSidebarContent({
  items,
  ListComponent,
}: Props): ReactNode {
  const themeConfig = useThemeConfig();
  const { pathname } = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Group items by year and month (> 30 threshold)
  const yearGroups = useMemo(() => groupBlogItems(items), [items]);

  const hasAnyActiveInBlog = useMemo(() => {
    return items.some((item) => isSamePath(item.permalink, pathname));
  }, [items, pathname]);

  // Requirement 1: Auto-scroll sidebar so the active post is centered/in view
  useEffect(() => {
    const scrollToActive = () => {
      if (!containerRef.current) return;

      const activeLink = containerRef.current.querySelector<HTMLElement>(
        'a[aria-current="page"], .menu__link--active, [class*="sidebarItemLinkActive"]'
      );

      if (activeLink) {
        const nav = activeLink.closest('nav');
        if (nav) {
          const navRect = nav.getBoundingClientRect();
          const linkRect = activeLink.getBoundingClientRect();

          // Check if already nicely visible inside the nav
          const isNicelyVisible =
            linkRect.top >= navRect.top + 40 &&
            linkRect.bottom <= navRect.bottom - 40;

          if (!isNicelyVisible) {
            const relativeOffset = linkRect.top - navRect.top;
            const targetCenter = (nav.clientHeight - linkRect.height) / 2;
            const delta = relativeOffset - targetCenter;
            nav.scrollTop += delta;
          }
        } else {
          activeLink.scrollIntoView({ block: 'nearest' });
        }
      }
    };

    // Immediate attempt
    scrollToActive();

    // Secondary attempt on next animation frame and after small timeout
    // in case of any layout shift or collapsible mount tick
    const rafId = requestAnimationFrame(scrollToActive);
    const timeoutId = setTimeout(scrollToActive, 80);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  if (themeConfig.blog.sidebar.groupByYear) {
    return (
      <div ref={containerRef} className={styles.container}>
        {yearGroups.map((yearGroup, idx) => (
          <BlogSidebarYearGroup
            key={yearGroup.year}
            yearGroup={yearGroup}
            ListComponent={ListComponent}
            currentPath={pathname}
            isLatestYear={idx === 0}
            hasAnyActiveInBlog={hasAnyActiveInBlog}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div ref={containerRef} className={styles.container}>
        <ListComponent items={items} />
      </div>
    );
  }
}

export default memo(BlogSidebarContent);
