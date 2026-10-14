"use client";

import styles from "./ServicesRunning.module.css";

const CHECK_ITEMS = [
  { id: "system", label: "SYSTEM CHECK", icon: "shield" },
  { id: "process", label: "PROCESS CHECK", icon: "cpu" },
  { id: "speed", label: "SPEED CHECK", icon: "speed" },
  { id: "manual", label: "MANUAL WORK", icon: "manual" },
  { id: "repetative", label: "REPETATIVE TASK", icon: "repeat" },
];

function CheckIcon({ type }) {
  if (type === "shield") {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  if (type === "cpu") {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    );
  }
  if (type === "speed") {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 14l3-3" />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      </svg>
    );
  }
  if (type === "manual") {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <circle cx="12" cy="14" r="1.5" />
      </svg>
    );
  }
  if (type === "repeat") {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 2l4 4-4 4" />
        <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
        <path d="M7 22l-4-4 4-4" />
        <path d="M21 13v1a4 4 0 0 1-4 4H3" />
      </svg>
    );
  }
  return null;
}

export default function PerfVisualWindow() {
  /**
   * Renders a continuous sequence of check items.
   * By repeating the 5-item array twice per group (10 items), the track height (460px)
   * is guaranteed to exceed the viewport height (290px), ensuring SYSTEM CHECK immediately
   * follows REPETATIVE TASK without any blank gap or delay.
   */
  const renderCheckGroup = (groupPrefix, isAriaHidden) => (
    <div className={styles.checkGroup} aria-hidden={isAriaHidden}>
      {CHECK_ITEMS.map((item, idx) => (
        <div
          key={`${groupPrefix}-1-${item.id}-${idx}`}
          className={styles.checkCard}
        >
          <span className={styles.checkCardIcon}>
            <CheckIcon type={item.icon} />
          </span>
          <span className={styles.checkCardLabel}>{item.label}</span>
        </div>
      ))}
      {CHECK_ITEMS.map((item, idx) => (
        <div
          key={`${groupPrefix}-2-${item.id}-${idx}`}
          className={styles.checkCard}
        >
          <span className={styles.checkCardIcon}>
            <CheckIcon type={item.icon} />
          </span>
          <span className={styles.checkCardLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={styles.perfVisualCard}
      role="region"
      aria-label="Performance Optimization Radar and Checklist"
    >
      {/* Background ambient lighting */}
      <div className={styles.perfCardGlow} aria-hidden="true" />

      {/* Left: 360-degree Anti-Clockwise Rotating Radar Scanner */}
      <div className={styles.radarContainer}>
        <div className={styles.radarDish}>
          {/* Concentric radar rings */}
          <span className={`${styles.radarRing} ${styles.ringInner}`} />
          <span className={`${styles.radarRing} ${styles.ringMiddle}`} />
          <span className={`${styles.radarRing} ${styles.ringOuter}`} />

          {/* 360-degree anti-clockwise rotating radar sweep cone */}
          <div className={styles.radarSweep} />

          {/* Center glowing pivot dot */}
          <span className={styles.radarPivot} />
        </div>
      </div>

      {/* Right: Vertically Auto-Scrolling Checklist (Zero-delay seamless infinite loop) */}
      <div className={styles.checksViewport}>
        <div className={styles.checksTrack}>
          {renderCheckGroup("primary", false)}
          {renderCheckGroup("duplicate", true)}
        </div>
      </div>
    </div>
  );
}
