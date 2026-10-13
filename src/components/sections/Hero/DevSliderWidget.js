"use client";

import { useState } from "react";
import styles from "./Hero.module.css";

export default function DevSliderWidget() {
  // Interactive slider notch positions (percentages from 0 to 100 within each side track)
  const [positions, setPositions] = useState({
    topLeft: 45,
    topRight: 75,
    bottomLeft: 60,
    bottomRight: 30,
  });

  const handleSliderClick = (trackKey, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
    setPositions((prev) => ({ ...prev, [trackKey]: percentage }));
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
            className={styles.sliderNotch}
            style={{ left: `${positions.topLeft}%` }}
          />
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
            className={styles.sliderNotch}
            style={{ left: `${positions.bottomLeft}%` }}
          />
        </div>
      </div>

      {/* Central DEV badge */}
      <div className={styles.devBadge}>
        <span className={styles.devBadgeText}>DEV</span>
      </div>

      {/* Right rail system */}
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
            className={styles.sliderNotch}
            style={{ left: `${positions.topRight}%` }}
          />
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
            className={styles.sliderNotch}
            style={{ left: `${positions.bottomRight}%` }}
          />
        </div>
      </div>
    </div>
  );
}
