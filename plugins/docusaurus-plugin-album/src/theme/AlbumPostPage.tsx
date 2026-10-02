import React, { useState, useEffect, useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
import { BlogPostProvider, useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import TOC from '@theme/TOC';
import ContentVisibility from '@theme/ContentVisibility';
import type { Props } from '@theme/BlogPostPage';
import type { BlogSidebar } from '@docusaurus/plugin-content-blog';

import AlbumHeroHeader from './AlbumHeroHeader';
import ImageLightbox, { type LightboxImage } from './ImageLightbox';

function AlbumPostPageContent({
  sidebar,
  children,
}: {
  sidebar: BlogSidebar;
  children: ReactNode;
}): ReactNode {
  const { metadata, toc } = useBlogPost();
  const { nextItem, prevItem, frontMatter, title, date } = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
    cover,
    cover_caption: coverCaption,
    location,
    album_series: albumSeries,
  } = frontMatter as any;

  // Lightbox state & image collection
  const articleRef = useRef<HTMLDivElement>(null);
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!articleRef.current) return;

    const collectedImages: LightboxImage[] = [];

    // 1. Add cover image first if available
    if (cover) {
      collectedImages.push({
        src: cover,
        alt: title,
        caption: coverCaption,
      });
    }

    // 2. Collect all images in the markdown body (strictly exclude author avatars and header elements)
    const domImages = articleRef.current.querySelectorAll<HTMLImageElement>(
      '.markdown img, [class*="markdown"] img'
    );
    // Fallback if .markdown wrapper is not matched
    const candidateImages =
      domImages.length > 0
        ? Array.from(domImages)
        : Array.from(articleRef.current.querySelectorAll<HTMLImageElement>('img')).filter(
            (img) =>
              !img.closest('.avatar') &&
              !img.classList.contains('avatar__photo') &&
              !img.closest('header')
          );

    candidateImages.forEach((img) => {
      // Explicit guard against avatar images
      if (
        img.closest('.avatar') ||
        img.classList.contains('avatar__photo') ||
        img.closest('header')
      ) {
        return;
      }

      // Auto inject lazy loading and async decoding
      img.loading = 'lazy';
      img.decoding = 'async';
      img.style.cursor = 'zoom-in';

      // Avoid duplicate if cover image is in the body
      if (img.src !== cover) {
        const imageIndex = collectedImages.length;
        collectedImages.push({
          src: img.src,
          alt: img.alt,
          caption: img.title || img.alt,
        });

        img.onclick = () => {
          setLightboxIndex(imageIndex);
          setLightboxOpen(true);
        };
      } else {
        img.onclick = () => {
          setLightboxIndex(0);
          setLightboxOpen(true);
        };
      }
    });

    setLightboxImages(collectedImages);
  }, [cover, coverCaption, title]);

  const handleOpenCoverLightbox = () => {
    if (cover) {
      setLightboxIndex(0);
      setLightboxOpen(true);
    }
  };

  return (
    <BlogLayout
      sidebar={sidebar}
      toc={
        !hideTableOfContents && toc.length > 0 ? (
          <TOC
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        ) : undefined
      }
    >
      <ContentVisibility metadata={metadata} />

      {/* Album Hero Header */}
      <AlbumHeroHeader
        title={title}
        date={date}
        cover={cover}
        coverCaption={coverCaption}
        location={location}
        albumSeries={albumSeries}
        onCoverClick={handleOpenCoverLightbox}
      />

      {/* Main article content with lazy-loading and zoomable images */}
      <div ref={articleRef} className="album-post-article">
        <BlogPostItem>{children}</BlogPostItem>
      </div>

      {/* Paginator */}
      {(nextItem || prevItem) && (
        <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
      )}

      {/* Full-screen Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </BlogLayout>
  );
}

export default function AlbumPostPage(props: Props): ReactNode {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
          'album-post-page'
        )}
      >
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <AlbumPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </AlbumPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
