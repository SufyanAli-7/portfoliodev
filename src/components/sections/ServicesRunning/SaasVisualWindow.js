"use client";

import styles from "./ServicesRunning.module.css";

/**
 * SaasVisualWindow Component (0034: SAAS_PLATFORM_DEV)
 * Matches the user screenshot:
 * - 3D Isometric SaaS Platform Stack (4 vertically stacked layers)
 * - Layer 1 (Top): Dark carbon layer with 2x2 glowing neon app launcher / dashboard microservices grid
 * - Layer 2: Vivid neon green glowing layer with energetic ambient luminescence
 * - Layer 3 & 4: Dark charcoal foundation layers with floor drop-shadow
 * - 4 Functional Feature Badges with curved trace connectors & terminal pin nodes:
 *   - Left: AUTH (User), BILLING (Credit Card)
 *   - Right: ANALYTICS (Bar Chart), DEPLOYMENT (Cloud)
 * - Kinetic Motion & Life:
 *   - Continuous energy pulses running along the 4 curved data tracks
 *   - Levitating floating central stack with synchronized breathing floor shadow
 *   - Luminous breathing pulse on the neon green middle layer
 *   - Sequential LED server activity shimmer on the top 2x2 dashboard grid
 *   - Ambient floating bokeh particles and interactive hover highlights
 */
export default function SaasVisualWindow() {
  // Center coordinates for the isometric stack
  const cx = 270;

  // Geometry for rounded isometric rhombus layer
  const rx = 54;
  const ry = 27;
  const h = 10;

  // Layer top surface path helper
  const getTopSurfacePath = (cy) =>
    `M ${cx - 10} ${cy - 22} Q ${cx} ${cy - 27} ${cx + 10} ${cy - 22} ` +
    `L ${cx + 44} ${cy - 5} Q ${cx + 54} ${cy} ${cx + 44} ${cy + 5} ` +
    `L ${cx + 10} ${cy + 22} Q ${cx} ${cy + 27} ${cx - 10} ${cy + 22} ` +
    `L ${cx - 44} ${cy + 5} Q ${cx - 54} ${cy} ${cx - 44} ${cy - 5} Z`;

  // Left extrusion face path helper
  const getLeftFacePath = (cy) =>
    `M ${cx - 44} ${cy + 5} ` +
    `L ${cx - 10} ${cy + 22} Q ${cx} ${cy + 27} ${cx} ${cy + 27} ` +
    `L ${cx} ${cy + 27 + h} ` +
    `L ${cx - 10} ${cy + 22 + h} ` +
    `L ${cx - 44} ${cy + 5 + h} ` +
    `Q ${cx - 52} ${cy + 1 + h} ${cx - 52} ${cy + 1} ` +
    `L ${cx - 52} ${cy + 1} ` +
    `Q ${cx - 52} ${cy} ${cx - 44} ${cy + 5} Z`;

  // Right extrusion face path helper
  const getRightFacePath = (cy) =>
    `M ${cx} ${cy + 27} ` +
    `L ${cx + 44} ${cy + 5} Q ${cx + 52} ${cy + 1} ${cx + 52} ${cy + 1} ` +
    `L ${cx + 52} ${cy + 1 + h} ` +
    `Q ${cx + 52} ${cy + 1 + h} ${cx + 44} ${cy + 5 + h} ` +
    `L ${cx} ${cy + 27 + h} Z`;

  return (
    <div
      className={styles.saasVisualCard}
      role="region"
      aria-label="SaaS Platform Architecture and Connected Services"
    >
      {/* Background ambient lighting */}
      <div className={styles.saasCardGlow} aria-hidden="true" />

      {/* SVG Canvas for precision isometric stack, curved tracks & vector glyphs */}
      <svg
        className={styles.saasSvgStage}
        viewBox="0 0 540 300"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Neon Glow Filters */}
          <filter id="saasNeonFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="saasIntenseGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>


          {/* Gradients for Central Isometric Layers */}
          {/* Top Layer 1 */}
          <linearGradient id="saasL1Top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e3034" />
            <stop offset="60%" stopColor="#222426" />
            <stop offset="100%" stopColor="#1a1b1d" />
          </linearGradient>
          <linearGradient id="saasL1Left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1b1c" />
            <stop offset="100%" stopColor="#121314" />
          </linearGradient>
          <linearGradient id="saasL1Right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#161718" />
            <stop offset="100%" stopColor="#0d0e0f" />
          </linearGradient>

          {/* Glowing Neon Layer 2 */}
          <linearGradient id="saasNeonTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d9ff38" />
            <stop offset="60%" stopColor="#c8ff00" />
            <stop offset="100%" stopColor="#9ee600" />
          </linearGradient>
          <linearGradient id="saasNeonLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#96dc00" />
            <stop offset="100%" stopColor="#6ba000" />
          </linearGradient>
          <linearGradient id="saasNeonRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7cb900" />
            <stop offset="100%" stopColor="#558000" />
          </linearGradient>

          {/* Layer 3 */}
          <linearGradient id="saasL3Top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#25272a" />
            <stop offset="100%" stopColor="#1a1b1d" />
          </linearGradient>
          <linearGradient id="saasL3Left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#161718" />
            <stop offset="100%" stopColor="#0e0f10" />
          </linearGradient>
          <linearGradient id="saasL3Right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#121314" />
            <stop offset="100%" stopColor="#0a0a0b" />
          </linearGradient>

          {/* Layer 4 */}
          <linearGradient id="saasL4Top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f2123" />
            <stop offset="100%" stopColor="#151617" />
          </linearGradient>
          <linearGradient id="saasL4Left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#121314" />
            <stop offset="100%" stopColor="#090a0a" />
          </linearGradient>
          <linearGradient id="saasL4Right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0e0f10" />
            <stop offset="100%" stopColor="#060607" />
          </linearGradient>

          {/* Floor Shadow Radial Gradient */}
          <radialGradient id="saasFloorShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>


        {/* Connector Tracks between Stack and Feature Cards */}
        <g className={styles.saasTracksGroup}>
          {/* 1. AUTH Track (Top-Left): Horizontal stem -> Pin node -> Curved line into Layer 1 */}
          <path
            d="M 104 78 L 128 78 C 168 78, 185 96, 216 96"
            className={styles.trackBase}
          />
          <path
            d="M 104 78 L 128 78 C 168 78, 185 96, 216 96"
            className={`${styles.trackPulse} ${styles.trackPulseAuth}`}
          />
          {/* AUTH Pin Node */}
          <circle cx="128" cy="78" r="3.5" className={styles.pinNode} />
          <circle cx="128" cy="78" r="7" className={styles.pinHalo} />

          {/* 2. BILLING Track (Bottom-Left): Horizontal stem -> Pin node -> Curved line into Layer 3 */}
          <path
            d="M 104 205 L 128 205 C 168 205, 185 156, 216 156"
            className={styles.trackBase}
          />
          <path
            d="M 104 205 L 128 205 C 168 205, 185 156, 216 156"
            className={`${styles.trackPulse} ${styles.trackPulseBilling}`}
          />
          {/* BILLING Pin Node */}
          <circle cx="128" cy="205" r="3.5" className={styles.pinNode} />
          <circle cx="128" cy="205" r="7" className={styles.pinHalo} />

          {/* 3. ANALYTICS Track (Top-Right): Layer 1/2 -> Curved line -> Pin node -> Horizontal stem */}
          <path
            d="M 324 110 C 355 110, 375 78, 412 78 L 436 78"
            className={styles.trackBase}
          />
          <path
            d="M 324 110 C 355 110, 375 78, 412 78 L 436 78"
            className={`${styles.trackPulse} ${styles.trackPulseAnalytics}`}
          />
          {/* ANALYTICS Pin Node */}
          <circle cx="412" cy="78" r="3.5" className={styles.pinNode} />
          <circle cx="412" cy="78" r="7" className={styles.pinHalo} />

          {/* 4. DEPLOYMENT Track (Bottom-Right): Layer 3/4 -> Curved line -> Pin node -> Horizontal stem */}
          <path
            d="M 324 172 C 355 172, 375 205, 412 205 L 436 205"
            className={styles.trackBase}
          />
          <path
            d="M 324 172 C 355 172, 375 205, 412 205 L 436 205"
            className={`${styles.trackPulse} ${styles.trackPulseDeployment}`}
          />
          {/* DEPLOYMENT Pin Node */}
          <circle cx="412" cy="205" r="3.5" className={styles.pinNode} />
          <circle cx="412" cy="205" r="7" className={styles.pinHalo} />
        </g>

        {/* Central 3D Isometric Stack */}
        <g className={styles.saasStackGroup}>
          {/* Ground Floor Shadow */}
          <ellipse
            cx="270"
            cy="234"
            rx="66"
            ry="24"
            fill="url(#saasFloorShadow)"
            className={styles.saasStackShadow}
          />

          {/* Layer 4 (Bottom Base Layer) */}
          <g className={styles.saasLayer}>
            <path d={getLeftFacePath(186)} fill="url(#saasL4Left)" />
            <path d={getRightFacePath(186)} fill="url(#saasL4Right)" />
            <path
              d={getTopSurfacePath(186)}
              fill="url(#saasL4Top)"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="0.8"
            />
          </g>

          {/* Layer 3 (Middle Charcoal Layer) */}
          <g className={styles.saasLayer}>
            <path d={getLeftFacePath(156)} fill="url(#saasL3Left)" />
            <path d={getRightFacePath(156)} fill="url(#saasL3Right)" />
            <path
              d={getTopSurfacePath(156)}
              fill="url(#saasL3Top)"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="0.8"
            />
          </g>

          {/* Layer 2 (Glowing Neon Green Layer) */}
          <g className={`${styles.saasLayer} ${styles.saasNeonLayer}`}>
            <path d={getLeftFacePath(126)} fill="url(#saasNeonLeft)" />
            <path d={getRightFacePath(126)} fill="url(#saasNeonRight)" />
            <path
              d={getTopSurfacePath(126)}
              fill="url(#saasNeonTop)"
              stroke="#e5ff80"
              strokeWidth="0.8"
            />
          </g>

          {/* Layer 1 (Top Layer) */}
          <g className={styles.saasLayer}>
            <path d={getLeftFacePath(96)} fill="url(#saasL1Left)" />
            <path d={getRightFacePath(96)} fill="url(#saasL1Right)" />
            <path
              d={getTopSurfacePath(96)}
              fill="url(#saasL1Top)"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="0.9"
            />

            {/* 4 Neon Green App Launcher / Microservice Squares in 2x2 Grid */}
            <g
              transform="translate(270, 96) scale(1, 0.52) rotate(45)"
              className={styles.saasGridGroup}
            >
              {/* Top-Left Square */}
              <rect
                x="-14"
                y="-14"
                width="11"
                height="11"
                rx="2.8"
                fill="#c8ff00"
                className={`${styles.appDot} ${styles.appDot1}`}
              />
              {/* Top-Right Square */}
              <rect
                x="3"
                y="-14"
                width="11"
                height="11"
                rx="2.8"
                fill="#c8ff00"
                className={`${styles.appDot} ${styles.appDot2}`}
              />
              {/* Bottom-Left Square */}
              <rect
                x="-14"
                y="3"
                width="11"
                height="11"
                rx="2.8"
                fill="#c8ff00"
                className={`${styles.appDot} ${styles.appDot3}`}
              />
              {/* Bottom-Right Square */}
              <rect
                x="3"
                y="3"
                width="11"
                height="11"
                rx="2.8"
                fill="#c8ff00"
                className={`${styles.appDot} ${styles.appDot4}`}
              />
            </g>
          </g>
        </g>

        {/* 4 Feature Cards (AUTH, BILLING, ANALYTICS, DEPLOYMENT) */}
        {/* Card 1: AUTH (Top-Left) */}
        <g className={`${styles.saasCardItem} ${styles.saasCardAuth}`} tabIndex="0" role="group" aria-label="Authentication Service">
          <rect
            x="52"
            y="52"
            width="52"
            height="52"
            rx="12"
            className={styles.cardBg}
          />
          {/* User Icon */}
          <circle
            cx="78"
            cy="71"
            r="5.5"
            stroke="#c8ff00"
            strokeWidth="2.2"
            fill="none"
            className={styles.cardIconStroke}
          />
          <path
            d="M 68 85 C 68 79, 88 79, 88 85"
            stroke="#c8ff00"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            className={styles.cardIconStroke}
          />
          {/* Label below card */}
          <text
            x="78"
            y="122"
            className={styles.cardTextLabel}
            textAnchor="middle"
          >
            AUTH
          </text>
        </g>

        {/* Card 2: BILLING (Bottom-Left) */}
        <g className={`${styles.saasCardItem} ${styles.saasCardBilling}`} tabIndex="0" role="group" aria-label="Billing Service">
          <rect
            x="52"
            y="179"
            width="52"
            height="52"
            rx="12"
            className={styles.cardBg}
          />
          {/* Credit Card Icon */}
          <rect
            x="66"
            y="195"
            width="24"
            height="16"
            rx="2.5"
            stroke="#c8ff00"
            strokeWidth="2"
            fill="none"
            className={styles.cardIconStroke}
          />
          <line
            x1="66"
            y1="199.5"
            x2="90"
            y2="199.5"
            stroke="#c8ff00"
            strokeWidth="2"
            className={styles.cardIconStroke}
          />
          <line
            x1="70"
            y1="205"
            x2="75"
            y2="205"
            stroke="#c8ff00"
            strokeWidth="2"
            strokeLinecap="round"
            className={styles.cardIconStroke}
          />
          {/* Label below card */}
          <text
            x="78"
            y="249"
            className={styles.cardTextLabel}
            textAnchor="middle"
          >
            BILLING
          </text>
        </g>

        {/* Card 3: ANALYTICS (Top-Right) */}
        <g className={`${styles.saasCardItem} ${styles.saasCardAnalytics}`} tabIndex="0" role="group" aria-label="Analytics Service">
          <rect
            x="436"
            y="52"
            width="52"
            height="52"
            rx="12"
            className={styles.cardBg}
          />
          {/* Bar Chart Icon */}
          <rect
            x="453"
            y="78"
            width="4"
            height="8"
            rx="1.5"
            fill="#c8ff00"
            className={styles.cardIconFill}
          />
          <rect
            x="460"
            y="72"
            width="4"
            height="14"
            rx="1.5"
            fill="#c8ff00"
            className={styles.cardIconFill}
          />
          <rect
            x="467"
            y="66"
            width="4"
            height="20"
            rx="1.5"
            fill="#c8ff00"
            className={styles.cardIconFill}
          />
          {/* Label below card */}
          <text
            x="462"
            y="122"
            className={styles.cardTextLabel}
            textAnchor="middle"
          >
            ANALYTICS
          </text>
        </g>

        {/* Card 4: DEPLOYMENT (Bottom-Right) */}
        <g className={`${styles.saasCardItem} ${styles.saasCardDeployment}`} tabIndex="0" role="group" aria-label="Deployment Service">
          <rect
            x="436"
            y="179"
            width="52"
            height="52"
            rx="12"
            className={styles.cardBg}
          />
          {/* Cloud Icon */}
          <path
            d="M 452 211 C 449.8 211 448 209.2 448 207 C 448 204.8 449.6 203 451.7 202.8 C 452.4 199.2 455.6 196.5 459.5 196.5 C 463.8 196.5 467.3 199.6 467.5 203.8 C 470 204.2 472 206.3 472 208.8 C 472 211.5 469.8 213.7 467 213.7 L 452 213.7 Z"
            stroke="#c8ff00"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className={styles.cardIconStroke}
          />
          {/* Label below card */}
          <text
            x="462"
            y="249"
            className={styles.cardTextLabel}
            textAnchor="middle"
          >
            DEPLOYMENT
          </text>
        </g>
      </svg>
    </div>
  );
}
