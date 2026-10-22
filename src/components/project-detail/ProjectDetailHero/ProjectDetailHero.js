"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container/Container";
import ProjectSkeleton from "@/components/projects/ProjectSkeleton/ProjectSkeleton";
import styles from "./ProjectDetailHero.module.css";

// Helper: Calculate shortest circular distance for infinite 3D coverflow
const getOffset = (idx, current, total) => {
  let diff = idx - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
};

// Helper: Map offset to CSS class for 3D fanned positioning (supports 3 on left and 3 on right)
const getCardClass = (offset) => {
  if (offset === 0) return styles.cardActive;
  if (offset === -1) return styles.cardLeft1;
  if (offset === -2) return styles.cardLeft2;
  if (offset === -3) return styles.cardLeft3;
  if (offset === 1) return styles.cardRight1;
  if (offset === 2) return styles.cardRight2;
  if (offset === 3) return styles.cardRight3;
  return styles.cardHidden;
};

export default function ProjectDetailHero({ project }) {
  const screens =
    project.screens && project.screens.length > 0
      ? project.screens
      : [
          {
            id: "01",
            num: "01",
            title: project.title,
            caption: "",
            src: project.heroImage,
          },
        ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleImageLoad = (src) => {
    setLoadedImages((prev) => ({ ...prev, [src]: true }));
  };

  // Navigate to previous slide
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? screens.length - 1 : prev - 1));
  }, [screens.length]);

  // Navigate to next slide
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === screens.length - 1 ? 0 : prev + 1));
  }, [screens.length]);

  // Jump directly to specific slide index
  const goToSlide = (idx) => {
    if (idx >= 0 && idx < screens.length) {
      setCurrentIndex(idx);
    }
  };

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support for mobile/tablet
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <section className={styles.heroSection} aria-label={`${project.title} Hero Showcase`}>
      <Container>
        <div className={styles.inner}>
          {/* Top Archive Code Tag: e.g. PROJECT_ARCHIVE_001 */}
          <div className={styles.archiveCode}>{project.archiveCode}</div>

          {/* Massive Headline */}
          <h1 className={styles.mainTitle}>{project.title}</h1>

          {/* 3D Coverflow Perspective Showcase Wrapper */}
          <div className={styles.sliderWrapper}>
            {/* 3D Coverflow Stage */}
            <div
              className={styles.coverflowStage}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              role="region"
              aria-label={`${project.title} 3D Coverflow Carousel`}
            >
              {/* Stacked 3D Perspective Cards: 3 on left, 1 center, 3 on right */}
              <div className={styles.stageTrack}>
                {screens.map((screen, idx) => {
                  const offset = getOffset(idx, currentIndex, screens.length);
                  const isVisible = Math.abs(offset) <= 3;
                  const cardClass = getCardClass(offset);

                  return (
                    <div
                      key={screen.id || idx}
                      className={`${styles.card} ${cardClass}`}
                      onClick={() => goToSlide(idx)}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${screen.num || idx + 1}: ${screen.title || ""}`}
                      aria-hidden={!isVisible}
                    >
                      {/* Card Media Area (Opaque, with dark brutalist skeleton loader) */}
                      <div
                        className={styles.cardMedia}
                        style={{
                          backgroundColor: screen.backdropColor || project.backdropColor || "#0d0f14",
                        }}
                      >
                        {/* Dark Brutalist Skeleton Loader (shows until image loads) */}
                        <ProjectSkeleton isLoaded={!!loadedImages[screen.src]} />

                        <Image
                          src={screen.src}
                          alt={screen.title || `${project.title} mockup`}
                          fill
                          sizes="(max-width: 768px) 82vw, 480px"
                          className={`${styles.cardImg} ${loadedImages[screen.src] ? styles.cardImgLoaded : styles.cardImgLoading}`}
                          priority={offset === 0}
                          onLoad={() => handleImageLoad(screen.src)}
                        />
                      </div>

                      {/* Card Bottom Caption Bar */}
                      <div className={styles.cardFooter}>
                        <div className={styles.cardTitleRow}>
                          <span className={styles.cardDot} aria-hidden="true" />
                          <span className={styles.cardTitle}>
                            {screen.title || project.title}
                          </span>
                        </div>
                        <span className={styles.cardBadge}>
                          {screen.num || String(idx + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Prev / Next Navigation Arrows */}
              {screens.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.navBtn} ${styles.prevBtn}`}
                    onClick={handlePrev}
                    aria-label="Previous mockup screen"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={`${styles.navBtn} ${styles.nextBtn}`}
                    onClick={handleNext}
                    aria-label="Next mockup screen"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Clickable Progress Dashes */}
            {screens.length > 1 && (
              <div className={styles.paginationBar} role="tablist" aria-label="Mockup slides">
                {screens.map((screen, idx) => (
                  <button
                    key={screen.id || idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentIndex}
                    className={`${styles.dashBtn} ${idx === currentIndex ? styles.dashActive : ""}`}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}: ${screen.title || ""}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
