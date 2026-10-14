"use client";

import styles from "./ServicesRunning.module.css";

export default function ApiVisualWindow() {
  return (
    <div
      className={styles.apiVisualCard}
      role="region"
      aria-label="API Engineering Interactive Data Pipeline"
    >
      {/* Background ambient lighting */}
      <div className={styles.apiCardGlow} aria-hidden="true" />

      {/* Main Interactive Pipeline Stage */}
      <div className={styles.pipelineStage}>
        {/* Track 1 (Top Line) */}
        <div className={styles.pipelineRow}>
          <span className={styles.terminalPinLeft} />
          <div className={styles.trackLine}>
            <span className={styles.beam} />
          </div>
          <span className={styles.terminalPinRight} />
        </div>

        {/* Track 2 (Middle Line) */}
        <div className={styles.pipelineRow}>
          <span className={styles.terminalPinLeft} />
          <div className={styles.trackLine}>
            <span className={styles.beam} />
          </div>
          <span className={styles.terminalPinRight} />
        </div>

        {/* Track 3 (Bottom Line) */}
        <div className={styles.pipelineRow}>
          <span className={styles.terminalPinLeft} />
          <div className={styles.trackLine}>
            <span className={styles.beam} />
          </div>
          <span className={styles.terminalPinRight} />
        </div>

        {/* Central API Processor Chip */}
        <div className={styles.apiChip}>
          {/* Left connector pins */}
          <span className={`${styles.chipPinLeft} ${styles.chipPinTop}`} />
          <span className={`${styles.chipPinLeft} ${styles.chipPinMiddle}`} />
          <span className={`${styles.chipPinLeft} ${styles.chipPinBottom}`} />

          {/* Right connector pins */}
          <span className={`${styles.chipPinRight} ${styles.chipPinTop}`} />
          <span className={`${styles.chipPinRight} ${styles.chipPinMiddle}`} />
          <span className={`${styles.chipPinRight} ${styles.chipPinBottom}`} />

          {/* Centered Brand Text */}
          <span className={styles.apiBrandText}>API</span>
        </div>
      </div>
    </div>
  );
}
