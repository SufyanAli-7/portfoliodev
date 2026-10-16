"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./SelectedWork.module.css";

export default function MockupCard({
  screen,
  total,
  detailUrl = "/projects/quickcart",
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);
  const formattedTotal = String(total).padStart(2, "0");
  const isFirst = screen.num === "01";

  // Check if image is already cached/complete on mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <Link
      href={detailUrl}
      className={`${styles.card} ${isFirst ? styles.cardFirst : ""}`.trim()}
      aria-label={`View ${screen.title} - QuickCart project details`}
    >
      {/* Visual media preview container */}
      <div className={styles.cardMedia}>
        {/* Professional Dark Skeleton Loader (visible until image loads) */}
        <div
          className={`${styles.skeletonWrapper} ${
            isLoaded ? styles.skeletonHidden : ""
          }`}
          aria-hidden="true"
        >
          <div className={styles.skeletonBrowserFrame}>
            <div className={styles.skeletonBrowserHeader}>
              <div className={styles.skeletonDots}>
                <span className={styles.skeletonDot} />
                <span className={styles.skeletonDot} />
                <span className={styles.skeletonDot} />
              </div>
              <div className={styles.skeletonSearchBar} />
            </div>
            <div className={styles.skeletonBody}>
              <div className={styles.skeletonHeroBlock} />
              <div className={styles.skeletonGrid}>
                <div className={styles.skeletonGridItem} />
                <div className={styles.skeletonGridItem} />
                <div className={styles.skeletonGridItem} />
              </div>
            </div>
          </div>
          <div className={styles.skeletonShimmer} />
        </div>

        <Image
          ref={imgRef}
          src={screen.src}
          alt={`QuickCart - ${screen.title}`}
          width={800}
          height={500}
          className={`${styles.cardImage} ${
            isLoaded ? styles.cardImageLoaded : ""
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Card bottom bar: 01 / 11 and VIEW ↗ */}
      <div className={styles.cardBottomBar}>
        <div className={styles.cardNumberContainer}>
          <span className={styles.cardCurrentNum}>{screen.num}</span>
          <span className={styles.cardSlash}>/</span>
          <span className={styles.cardTotalNum}>{formattedTotal}</span>
        </div>

        <div className={styles.cardViewButton}>
          <span>VIEW</span>
          <span className={styles.cardViewIcon} aria-hidden="true">
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}
