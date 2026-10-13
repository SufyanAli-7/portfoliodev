"use client";

import { useState } from "react";
import styles from "./Hero.module.css";

export default function DevSliderWidget() {
  // Slider notch positions: left and right start 100% identical
  const [positions, setPositions] = useState({
    topLeft: 45,
    topRight: 45,
    bottomLeft: 65,
    bottomRight: 65,
  });

  const handleSliderClick = (trackKey, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
    
    // Synchronize both sides so they stay identical
    if (trackKey.includes("top") || trackKey === "topLeft" || trackKey === "topRight") {
      setPositions((prev) => ({
        ...prev,
        topLeft: percentage,
        topRight: percentage,
      }));
    } else {
      setPositions((prev) => ({
        ...prev,
        bottomLeft: percentage,
        bottomRight: percentage,
      }));
    }
  };

  return (
    <div
      className={styles.sliderWidget}
      role="region"
      aria-label="Developer equalizer controls"
    >
      {/* Left rail system */}
      <div className={styles.railSide}>
        {/* Track 1 (Top) */}
        <div
          className={styles.trackLineContainer}
          onClick={(e) => handleSliderClick("topLeft", e)}
          title="Adjust level"
        >
          <div className={styles.endStopLeft} />
          <div className={styles.trackLine} />
          <div
            className={`${styles.sliderNotch} ${styles.rainSlideTop}`}
            style={{ left: `${positions.topLeft}%` }}
          >
            <span className={`${styles.raindropDrip} ${styles.rainDelay1}`} />
            <span className={`${styles.raindropSplash} ${styles.rainDelay1}`} />
          </div>
        </div>

        {/* Track 2 (Middle) */}
        <div className={styles.trackLineContainer}>
          <div className={styles.endStopLeft} />
          <div className={styles.trackLine} />
        </div>

        {/* Track 3 (Bottom) */}
        <div
          className={styles.trackLineContainer}
          onClick={(e) => handleSliderClick("bottomLeft", e)}
          title="Adjust level"
        >
          <div className={styles.endStopLeft} />
          <div className={styles.trackLine} />
          <div
            className={`${styles.sliderNotch} ${styles.rainSlideBottom}`}
            style={{ left: `${positions.bottomLeft}%` }}
          >
            <span className={`${styles.raindropDrip} ${styles.rainDelay2}`} />
            <span className={`${styles.raindropSplash} ${styles.rainDelay2}`} />
          </div>
        </div>
      </div>

      {/* Central DEV badge */}
      <div className={styles.devBadge}>
        <span className={styles.devBadgeText}>DEV</span>
      </div>

      {/* Right rail system (Identical to Left) */}
      <div className={styles.railSide}>
        {/* Track 1 (Top) */}
        <div
          className={styles.trackLineContainer}
          onClick={(e) => handleSliderClick("topRight", e)}
          title="Adjust level"
        >
          <div className={styles.trackLine} />
          <div className={styles.endStopRight} />
          <div
            className={`${styles.sliderNotch} ${styles.rainSlideTop}`}
            style={{ left: `${positions.topRight}%` }}
          >
            <span className={`${styles.raindropDrip} ${styles.rainDelay1}`} />
            <span className={`${styles.raindropSplash} ${styles.rainDelay1}`} />
          </div>
        </div>

        {/* Track 2 (Middle) */}
        <div className={styles.trackLineContainer}>
          <div className={styles.trackLine} />
          <div className={styles.endStopRight} />
        </div>

        {/* Track 3 (Bottom) */}
        <div
          className={styles.trackLineContainer}
          onClick={(e) => handleSliderClick("bottomRight", e)}
          title="Adjust level"
        >
          <div className={styles.trackLine} />
          <div className={styles.endStopRight} />
          <div
            className={`${styles.sliderNotch} ${styles.rainSlideBottom}`}
            style={{ left: `${positions.bottomRight}%` }}
          >
            <span className={`${styles.raindropDrip} ${styles.rainDelay2}`} />
            <span className={`${styles.raindropSplash} ${styles.rainDelay2}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
