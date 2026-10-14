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

      {/* SVG Pipeline Canvas */}
      <svg
        className={styles.apiCanvas}
        viewBox="0 0 560 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Neon Glow Filters */}
          <filter id="neonGlowLime" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="neonGlowCyan" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Line 1 Gradient: Cyan to Neon Lime */}
          <linearGradient id="flowGradCyanLime" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#00f5ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c8ff00" stopOpacity="1" />
          </linearGradient>

          {/* Line 2 Gradient: Vibrant Neon Lime to Gold/Amber */}
          <linearGradient id="flowGradLimeGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c8ff00" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#c8ff00" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" />
          </linearGradient>

          {/* Line 3 Gradient: Electric Sky to Neon Lime */}
          <linearGradient id="flowGradSkyLime" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c8ff00" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* 1. Base Circuit Data Bus Lines */}
        {/* Line 1 (Top, y=110) */}
        <line x1="80" y1="110" x2="480" y2="110" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
        {/* Line 2 (Middle, y=150) */}
        <line x1="80" y1="150" x2="480" y2="150" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
        {/* Line 3 (Bottom, y=190) */}
        <line x1="80" y1="190" x2="480" y2="190" stroke="#222222" strokeWidth="2" strokeLinecap="round" />

        {/* 2. Terminal Pins at left (x=80) and right (x=480) */}
        <circle cx="80" cy="110" r="3.5" fill="#3a3a3a" stroke="#1f1f1f" strokeWidth="1.5" />
        <circle cx="80" cy="150" r="3.5" fill="#3a3a3a" stroke="#1f1f1f" strokeWidth="1.5" />
        <circle cx="80" cy="190" r="3.5" fill="#3a3a3a" stroke="#1f1f1f" strokeWidth="1.5" />

        <circle cx="480" cy="110" r="3.5" fill="#3a3a3a" stroke="#1f1f1f" strokeWidth="1.5" />
        <circle cx="480" cy="150" r="3.5" fill="#3a3a3a" stroke="#1f1f1f" strokeWidth="1.5" />
        <circle cx="480" cy="190" r="3.5" fill="#3a3a3a" stroke="#1f1f1f" strokeWidth="1.5" />

        {/* 3. Moving Colorful Line Beams (Left to Right) */}
        {/* Beam 1: Cyan to Lime */}
        <path
          d="M 80 110 L 480 110"
          stroke="url(#flowGradCyanLime)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#neonGlowCyan)"
          className={styles.beamTrack1}
        />

        {/* Beam 2: Lime to Gold */}
        <path
          d="M 80 150 L 480 150"
          stroke="url(#flowGradLimeGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#neonGlowLime)"
          className={styles.beamTrack2}
        />

        {/* Beam 3: Sky to Lime */}
        <path
          d="M 80 190 L 480 190"
          stroke="url(#flowGradSkyLime)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#neonGlowLime)"
          className={styles.beamTrack3}
        />

        {/* 4. Center API Chip (covers lines from x=232 to x=328) */}
        <g className={styles.apiChipGroup}>
          {/* Subtle chip drop shadow */}
          <rect
            x="232"
            y="106"
            width="96"
            height="88"
            rx="10"
            fill="#0c0c0c"
            stroke="#262626"
            strokeWidth="1.5"
          />

          {/* Left Pins (Neon Lime connector notches) */}
          <rect x="229" y="108" width="5" height="4" rx="1" fill="#c8ff00" />
          <rect x="229" y="148" width="5" height="4" rx="1" fill="#c8ff00" />
          <rect x="229" y="188" width="5" height="4" rx="1" fill="#c8ff00" />

          {/* Right Pins (Neon Lime connector notches) */}
          <rect x="324" y="108" width="5" height="4" rx="1" fill="#c8ff00" />
          <rect x="324" y="148" width="5" height="4" rx="1" fill="#c8ff00" />
          <rect x="324" y="188" width="5" height="4" rx="1" fill="#c8ff00" />

          {/* API Chip Text */}
          <text
            x="280"
            y="156"
            textAnchor="middle"
            fill="#c8ff00"
            fontFamily="var(--font-jetbrains-mono), 'JetBrains Mono', monospace"
            fontSize="15"
            fontWeight="700"
            letterSpacing="0.18em"
            className={styles.apiText}
          >
            API
          </text>
        </g>
      </svg>
    </div>
  );
}
