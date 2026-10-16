"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import MockupCard from "./MockupCard";
import styles from "./SelectedWork.module.css";

export default function MockupCarousel({
  screens,
  detailUrl = "/projects/quickcart",
}) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse drag-to-scroll state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const checkScroll = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);

    if (maxScroll <= 0) {
      setActiveIndex(0);
      return;
    }

    // Exact progress mapping across all items (from 01/11 to 11/11)
    if (scrollLeft >= maxScroll - 15) {
      // Scrolled to the absolute end -> ALWAYS show 11 / 11 and activate the 11th line
      setActiveIndex(screens.length - 1);
    } else if (scrollLeft <= 15) {
      // Scrolled to the start -> ALWAYS show 01 / 11 and activate the 1st line
      setActiveIndex(0);
    } else {
      const progress = scrollLeft / maxScroll;
      const index = Math.round(progress * (screens.length - 1));
      setActiveIndex(Math.min(Math.max(index, 0), screens.length - 1));
    }
  }, [screens.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    checkScroll();
    track.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      track.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction) => {
    if (!trackRef.current) return;
    // Scroll smoothly by roughly 2-3 cards or 60% of visible width
    const scrollAmount =
      direction === "left"
        ? -Math.max(trackRef.current.clientWidth * 0.65, 300)
        : Math.max(trackRef.current.clientWidth * 0.65, 300);
    trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 6) {
      hasMovedRef.current = true;
    }
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 50);
  };

  const handleClickCapture = (e) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const scrollToPip = (index) => {
    if (!trackRef.current) return;
    const { scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;

    // Scroll to exact progress point corresponding to the selected line
    const targetScroll = (index / (screens.length - 1)) * maxScroll;
    trackRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <div className={styles.carouselWrapper}>
      {/* Track Container: isolates the carousel cards so floating buttons are vertically centered on the cards */}
      <div className={styles.trackContainer}>
        {/* Floating Left Chevron Button (appears when scrolled) */}
        {canScrollLeft && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            onClick={() => scroll("left")}
            aria-label="Scroll left to previous screen"
          >
            <svg className={styles.navArrowIcon} viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Main Horizontal Track */}
        <div
          ref={trackRef}
          className={styles.carouselTrack}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClickCapture={handleClickCapture}
          role="region"
          aria-label="Screenshots carousel"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") scroll("right");
            if (e.key === "ArrowLeft") scroll("left");
          }}
        >
          {screens.map((screen) => (
            <MockupCard
              key={screen.id}
              screen={screen}
              total={screens.length}
              detailUrl={detailUrl}
            />
          ))}
        </div>

        {/* Floating Right Chevron Button */}
        {canScrollRight && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={() => scroll("right")}
            aria-label="Scroll right to next screen"
          >
            <svg className={styles.navArrowIcon} viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Counter & Indicator Lines */}
      <div className={styles.carouselMetaBar}>
        <div className={styles.indicatorCounter}>
          <span>{String(activeIndex + 1).padStart(2, "0")}</span> /{" "}
          {String(screens.length).padStart(2, "0")} SCREENS
        </div>

        <div className={styles.indicatorTrack} aria-hidden="true">
          {screens.map((_, i) => (
            <div
              key={i}
              className={`${styles.indicatorPip} ${
                i === activeIndex ? styles.indicatorPipActive : ""
              }`}
              onClick={() => scrollToPip(i)}
              title={`Jump to screen ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
