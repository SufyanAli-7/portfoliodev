"use client";

import styles from "./ServicesRunning.module.css";

/**
 * MobileVisualWindow Component (0035: MOBILE_APP_DEVELOPMENT)
 * Matches the user screenshot:
 * - Two flagship smartphones in foreground & background layout
 * - Phone 1 (Foreground):
 *   - Sleek bezel with Dynamic Island & status bar
 *   - Top card featuring 2x2 neon green app launcher squares
 *   - Content skeleton lines
 *   - Luminous neon green action CTA pill button with breathing pulse
 *   - Bottom navigation bar (Active Home, Apps, Notifications, Profile)
 * - Phone 2 (Background, angled & offset):
 *   - Media preview card with landscape illustration
 *   - 3 List feed items with neon green icon accents & skeleton lines
 * - 4 Functional Tech Badges with curved trace connectors & terminal pin nodes:
 *   - Left: React Native, Expo
 *   - Right: Android, iOS
 * - Kinetic Motion & Animations:
 *   - Continuous energy pulses running along the 4 curved data tracks
 *   - Gentle vertical floating levitation of the phone duo
 *   - Luminous breathing glow on the primary action button
 *   - Sequential LED shimmer on the 2x2 app launcher squares
 *   - Interactive hover elevation and beam acceleration
 */
export default function MobileVisualWindow() {
  return (
    <div
      className={styles.mobileVisualCard}
      role="region"
      aria-label="Cross-Platform Mobile App Development Architecture"
    >
      {/* Background ambient lighting */}
      <div className={styles.mobileCardGlow} aria-hidden="true" />

      {/* SVG Canvas for precision device composition, curved tracks & vector glyphs */}
      <svg
        className={styles.mobileSvgStage}
        viewBox="0 0 540 300"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Neon Glow Filters */}
          <filter id="mobileNeonFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="mobileBeamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients for Phone Frames */}
          <linearGradient id="phone1Bezel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#323438" />
            <stop offset="50%" stopColor="#1e1f22" />
            <stop offset="100%" stopColor="#2a2c30" />
          </linearGradient>

          <linearGradient id="phone2Bezel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#282a2e" />
            <stop offset="100%" stopColor="#18191b" />
          </linearGradient>

          {/* Screen Backgrounds */}
          <linearGradient id="phone1Screen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#161719" />
            <stop offset="100%" stopColor="#111214" />
          </linearGradient>

          <linearGradient id="phone2Screen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#141517" />
            <stop offset="100%" stopColor="#0e0f11" />
          </linearGradient>

          {/* Action CTA Button Gradient */}
          <linearGradient id="mobileBtnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d8ff36" />
            <stop offset="50%" stopColor="#c8ff00" />
            <stop offset="100%" stopColor="#a0e600" />
          </linearGradient>

          {/* Floor Shadow Radial Gradient */}
          <radialGradient id="mobileFloorShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 4 Connector Tracks */}
        <g className={styles.mobileTracksGroup}>
          {/* 1. React Native Track (Top-Left): Horizontal stem -> Pin node -> Curved line into Phone 1 */}
          <path
            d="M 101 80 L 124 80 C 158 80, 172 96, 196 96"
            className={styles.trackBase}
          />
          <path
            d="M 101 80 L 124 80 C 158 80, 172 96, 196 96"
            className={`${styles.trackPulse} ${styles.trackPulseRN}`}
          />
          {/* React Native Pin Node */}
          <circle cx="124" cy="80" r="3.5" className={styles.pinNode} />
          <circle cx="124" cy="80" r="7" className={styles.pinHalo} />

          {/* 2. Expo Track (Bottom-Left): Horizontal stem -> Pin node -> Curved line into Phone 1 */}
          <path
            d="M 101 205 L 124 205 C 158 205, 172 185, 196 185"
            className={styles.trackBase}
          />
          <path
            d="M 101 205 L 124 205 C 158 205, 172 185, 196 185"
            className={`${styles.trackPulse} ${styles.trackPulseExpo}`}
          />
          {/* Expo Pin Node */}
          <circle cx="124" cy="205" r="3.5" className={styles.pinNode} />
          <circle cx="124" cy="205" r="7" className={styles.pinHalo} />

          {/* 3. Android Track (Top-Right): Phone 2 right edge -> Curved line -> Pin node -> Horizontal stem */}
          <path
            d="M 382 110 C 398 110, 404 80, 416 80 L 439 80"
            className={styles.trackBase}
          />
          <path
            d="M 382 110 C 398 110, 404 80, 416 80 L 439 80"
            className={`${styles.trackPulse} ${styles.trackPulseAndroid}`}
          />
          {/* Android Pin Node */}
          <circle cx="416" cy="80" r="3.5" className={styles.pinNode} />
          <circle cx="416" cy="80" r="7" className={styles.pinHalo} />

          {/* 4. iOS Track (Bottom-Right): Phone 2 lower right edge -> Curved line -> Pin node -> Horizontal stem */}
          <path
            d="M 382 180 C 398 180, 404 205, 416 205 L 439 205"
            className={styles.trackBase}
          />
          <path
            d="M 382 180 C 398 180, 404 205, 416 205 L 439 205"
            className={`${styles.trackPulse} ${styles.trackPulseIos}`}
          />
          {/* iOS Pin Node */}
          <circle cx="416" cy="205" r="3.5" className={styles.pinNode} />
          <circle cx="416" cy="205" r="7" className={styles.pinHalo} />
        </g>

        {/* Central Devices Group (Phones 1 & 2) */}
        <g className={styles.mobilePhonesGroup}>
          {/* Combined Floor Shadow */}
          <ellipse
            cx="290"
            cy="266"
            rx="96"
            ry="18"
            fill="url(#mobileFloorShadow)"
            className={styles.phonesShadow}
          />

          {/* ============================================================
              Phone 2 (Background Phone, Right-offset)
              ============================================================ */}
          <g className={styles.phone2Container}>
            {/* Outer Case / Bezel */}
            <rect
              x="286"
              y="62"
              width="96"
              height="198"
              rx="22"
              fill="url(#phone2Bezel)"
              stroke="#34373c"
              strokeWidth="1.2"
            />
            {/* Screen Glass Area */}
            <rect
              x="290"
              y="66"
              width="88"
              height="190"
              rx="18"
              fill="url(#phone2Screen)"
            />

            {/* Dynamic Island Pill Notch */}
            <rect
              x="325"
              y="72"
              width="18"
              height="5.5"
              rx="2.75"
              fill="#000000"
            />

            {/* Image Preview Card with Landscape Artwork */}
            <g className={styles.phone2ImageCard}>
              <rect
                x="296"
                y="86"
                width="76"
                height="46"
                rx="8"
                fill="#1c1e22"
              />
              {/* Sun Accent Dot */}
              <circle cx="352" cy="98" r="3" fill="#c8ff00" opacity="0.8" />
              {/* Mountain Landscape Silhouette */}
              <path
                d="M 302 124 L 320 102 L 334 116 L 344 108 L 366 124 Z"
                fill="#2b2e35"
              />
              <path
                d="M 326 124 L 340 110 L 354 124 Z"
                fill="#363a42"
              />
            </g>

            {/* List Row 1 */}
            <g className={styles.phone2ListItem}>
              <rect
                x="296"
                y="140"
                width="76"
                height="22"
                rx="6"
                fill="#191b1e"
              />
              <rect
                x="302"
                y="145"
                width="12"
                height="12"
                rx="3"
                fill="#c8ff00"
                className={styles.listIconDot}
              />
              <rect x="320" y="147" width="46" height="3.5" rx="1.75" fill="#2c2e34" />
              <rect x="320" y="154" width="30" height="2.5" rx="1.25" fill="#222429" />
            </g>

            {/* List Row 2 */}
            <g className={styles.phone2ListItem}>
              <rect
                x="296"
                y="168"
                width="76"
                height="22"
                rx="6"
                fill="#191b1e"
              />
              <rect
                x="302"
                y="173"
                width="12"
                height="12"
                rx="3"
                fill="#c8ff00"
                className={styles.listIconDot}
              />
              <rect x="320" y="175" width="46" height="3.5" rx="1.75" fill="#2c2e34" />
              <rect x="320" y="182" width="30" height="2.5" rx="1.25" fill="#222429" />
            </g>

            {/* List Row 3 */}
            <g className={styles.phone2ListItem}>
              <rect
                x="296"
                y="196"
                width="76"
                height="22"
                rx="6"
                fill="#191b1e"
              />
              <rect
                x="302"
                y="201"
                width="12"
                height="12"
                rx="3"
                fill="#c8ff00"
                className={styles.listIconDot}
              />
              <rect x="320" y="203" width="46" height="3.5" rx="1.75" fill="#2c2e34" />
              <rect x="320" y="210" width="30" height="2.5" rx="1.25" fill="#222429" />
            </g>
          </g>

          {/* ============================================================
              Phone 1 (Foreground Phone, Left-Center)
              ============================================================ */}
          <g className={styles.phone1Container}>
            {/* Soft Shadow behind Phone 1 on Phone 2 */}
            <rect
              x="196"
              y="42"
              width="106"
              height="218"
              rx="24"
              fill="rgba(0, 0, 0, 0.45)"
              filter="url(#mobileBeamGlow)"
            />

            {/* Outer Case / Metallic Titanium Bezel */}
            <rect
              x="196"
              y="42"
              width="104"
              height="216"
              rx="24"
              fill="url(#phone1Bezel)"
              stroke="#40434a"
              strokeWidth="1.4"
            />
            {/* Screen Glass Area */}
            <rect
              x="200"
              y="46"
              width="96"
              height="208"
              rx="20"
              fill="url(#phone1Screen)"
            />

            {/* Status Bar: Time & Dynamic Island */}
            <text
              x="214"
              y="57"
              fill="#7a7d85"
              fontSize="6.5"
              fontFamily="var(--font-inter), sans-serif"
              fontWeight="600"
            >
              9:41
            </text>
            <rect
              x="237"
              y="50"
              width="22"
              height="6.5"
              rx="3.25"
              fill="#000000"
            />

            {/* Top Feature Card: 2x2 Neon App Launcher Grid */}
            <g className={styles.phone1AppCard}>
              <rect
                x="208"
                y="66"
                width="80"
                height="56"
                rx="10"
                fill="#1e2024"
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="0.8"
              />
              {/* 2x2 Neon Squares Grid */}
              <rect
                x="238"
                y="77"
                width="9.5"
                height="9.5"
                rx="2.5"
                fill="#c8ff00"
                className={`${styles.appDot} ${styles.appDot1}`}
              />
              <rect
                x="250.5"
                y="77"
                width="9.5"
                height="9.5"
                rx="2.5"
                fill="#c8ff00"
                className={`${styles.appDot} ${styles.appDot2}`}
              />
              <rect
                x="238"
                y="89.5"
                width="9.5"
                height="9.5"
                rx="2.5"
                fill="#c8ff00"
                className={`${styles.appDot} ${styles.appDot3}`}
              />
              <rect
                x="250.5"
                y="89.5"
                width="9.5"
                height="9.5"
                rx="2.5"
                fill="#c8ff00"
                className={`${styles.appDot} ${styles.appDot4}`}
              />
            </g>

            {/* Skeleton Content Bars */}
            <g className={styles.phone1ContentBars}>
              <rect
                x="208"
                y="132"
                width="80"
                height="6"
                rx="3"
                fill="#24262b"
              />
              <rect
                x="208"
                y="144"
                width="56"
                height="5"
                rx="2.5"
                fill="#202226"
              />
              <rect
                x="208"
                y="155"
                width="40"
                height="4"
                rx="2"
                fill="#1c1e22"
              />
            </g>

            {/* Primary Action CTA Button (Neon Pill Button with Breathing Glow) */}
            <g className={styles.phone1CtaGroup}>
              <rect
                x="208"
                y="171"
                width="80"
                height="22"
                rx="11"
                fill="url(#mobileBtnGrad)"
                className={styles.phone1CtaButton}
              />
            </g>

            {/* Bottom Navigation Bar */}
            <g className={styles.phone1NavBar}>
              <rect
                x="200"
                y="218"
                width="96"
                height="36"
                rx="18"
                fill="#111214"
              />
              {/* Icon 1: Active Home Icon (Neon Green) */}
              <g transform="translate(214, 224)">
                <path
                  d="M 1 6 L 6 1 L 11 6 L 11 11 L 8 11 L 8 8 L 4 8 L 4 11 L 1 11 Z"
                  fill="#c8ff00"
                />
              </g>

              {/* Icon 2: Categories / Grid Icon (Dim Outline) */}
              <g transform="translate(234, 224)" opacity="0.45">
                <rect x="1" y="1" width="4" height="4" rx="1" fill="#888" />
                <rect x="7" y="1" width="4" height="4" rx="1" fill="#888" />
                <rect x="1" y="7" width="4" height="4" rx="1" fill="#888" />
                <rect x="7" y="7" width="4" height="4" rx="1" fill="#888" />
              </g>

              {/* Icon 3: Notification Bell Icon (Dim Outline) */}
              <g transform="translate(254, 224)" opacity="0.45">
                <path
                  d="M 6 1 C 4.5 1 3.5 2 3.5 3.5 L 3.5 7 L 2 9 L 10 9 L 8.5 7 L 8.5 3.5 C 8.5 2 7.5 1 6 1 Z M 5 10 C 5 10.6 5.4 11 6 11 C 6.6 11 7 10.6 7 10 Z"
                  fill="#888"
                />
              </g>

              {/* Icon 4: Profile / User Icon (Dim Outline) */}
              <g transform="translate(274, 224)" opacity="0.45">
                <circle cx="6" cy="4" r="2.5" fill="#888" />
                <path
                  d="M 2 11 C 2 8.5, 10 8.5, 10 11"
                  stroke="#888"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* Home Indicator Notch */}
              <rect
                x="233"
                y="246"
                width="30"
                height="2.5"
                rx="1.25"
                fill="#555860"
              />
            </g>
          </g>
        </g>

        {/* ============================================================
            4 Feature Badges (React Native, Expo, Android, iOS)
            ============================================================ */}
        {/* Badge 1: React Native (Top-Left) */}
        <g
          className={`${styles.mobileCardItem} ${styles.mobileCardRN}`}
          tabIndex="0"
          role="group"
          aria-label="React Native Framework"
        >
          <rect
            x="49"
            y="54"
            width="52"
            height="52"
            rx="12"
            className={styles.cardBg}
          />
          {/* React Atom Glyph */}
          <circle cx="75" cy="80" r="2.6" fill="#c8ff00" className={styles.cardIconFill} />
          <ellipse
            cx="75"
            cy="80"
            rx="13.5"
            ry="5.2"
            stroke="#c8ff00"
            strokeWidth="1.6"
            fill="none"
            transform="rotate(0 75 80)"
            className={styles.cardIconStroke}
          />
          <ellipse
            cx="75"
            cy="80"
            rx="13.5"
            ry="5.2"
            stroke="#c8ff00"
            strokeWidth="1.6"
            fill="none"
            transform="rotate(60 75 80)"
            className={styles.cardIconStroke}
          />
          <ellipse
            cx="75"
            cy="80"
            rx="13.5"
            ry="5.2"
            stroke="#c8ff00"
            strokeWidth="1.6"
            fill="none"
            transform="rotate(120 75 80)"
            className={styles.cardIconStroke}
          />
          {/* Label below badge */}
          <text
            x="75"
            y="124"
            className={styles.cardTextMixed}
            textAnchor="middle"
          >
            React Native
          </text>
        </g>

        {/* Badge 2: Expo (Bottom-Left) */}
        <g
          className={`${styles.mobileCardItem} ${styles.mobileCardExpo}`}
          tabIndex="0"
          role="group"
          aria-label="Expo Application Framework"
        >
          <rect
            x="49"
            y="179"
            width="52"
            height="52"
            rx="12"
            className={styles.cardBg}
          />
          {/* Expo Chevron Glyph */}
          <path
            d="M 66 211 L 75 192 L 84 211"
            stroke="#c8ff00"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className={styles.cardIconStroke}
          />
          {/* Label below badge */}
          <text
            x="75"
            y="249"
            className={styles.cardTextMixed}
            textAnchor="middle"
          >
            Expo
          </text>
        </g>

        {/* Badge 3: Android (Top-Right) */}
        <g
          className={`${styles.mobileCardItem} ${styles.mobileCardAndroid}`}
          tabIndex="0"
          role="group"
          aria-label="Android OS Platform"
        >
          <rect
            x="439"
            y="54"
            width="52"
            height="52"
            rx="12"
            className={styles.cardBg}
          />
          {/* Android Robot Head Glyph */}
          <path
            d="M 456 83 A 9 9 0 0 1 474 83 Z"
            fill="#c8ff00"
            className={styles.cardIconFill}
          />
          {/* Android Eyes */}
          <circle cx="461" cy="79.5" r="1.1" fill="#141414" />
          <circle cx="469" cy="79.5" r="1.1" fill="#141414" />
          {/* Android Antennae */}
          <line
            x1="459"
            y1="74"
            x2="456"
            y2="70"
            stroke="#c8ff00"
            strokeWidth="1.6"
            strokeLinecap="round"
            className={styles.cardIconStroke}
          />
          <line
            x1="471"
            y1="74"
            x2="474"
            y2="70"
            stroke="#c8ff00"
            strokeWidth="1.6"
            strokeLinecap="round"
            className={styles.cardIconStroke}
          />
          {/* Label below badge */}
          <text
            x="465"
            y="124"
            className={styles.cardTextMixed}
            textAnchor="middle"
          >
            Android
          </text>
        </g>

        {/* Badge 4: iOS (Bottom-Right) */}
        <g
          className={`${styles.mobileCardItem} ${styles.mobileCardIos}`}
          tabIndex="0"
          role="group"
          aria-label="iOS Apple Platform"
        >
          <rect
            x="439"
            y="179"
            width="52"
            height="52"
            rx="12"
            className={styles.cardBg}
          />
          {/* Apple Silhouette Glyph - Perfectly Centered with properly positioned leaf */}
          <g transform="translate(465, 205) scale(1.18) translate(-12, -12.76)">
            {/* Apple Body with Bite */}
            <path
              d="M 18.71 19.5 C 17.88 20.74, 17 21.95, 15.66 21.97 C 14.32 22, 13.89 21.18, 12.37 21.18 C 10.84 21.18, 10.37 21.95, 9.1 22 C 7.79 22.05, 6.8 20.68, 5.96 19.47 C 4.25 17, 2.94 12.45, 4.7 9.39 C 5.57 7.87, 7.13 6.91, 8.82 6.88 C 10.1 6.86, 11.32 7.75, 12.11 7.75 C 12.89 7.75, 14.37 6.68, 15.92 6.84 C 16.57 6.87, 18.39 7.1, 19.56 8.82 C 19.47 8.88, 17.39 10.1, 17.41 12.63 C 17.44 15.65, 20.06 16.66, 20.09 16.67 C 20.06 16.74, 19.67 18.11, 18.71 19.5 Z"
              fill="#c8ff00"
              className={styles.cardIconFill}
            />
            {/* Apple Leaf shifted left to align with the center notch */}
            <path
              d="M 15.97 6.37 C 16.59 5.62, 17.01 4.57, 16.89 3.52 C 15.99 3.56, 14.91 4.12, 14.28 4.86 C 13.72 5.51, 13.33 6.56, 13.46 7.59 C 14.46 7.67, 15.48 7.08, 15.97 6.37 Z"
              transform="translate(-1.9, 0.2)"
              fill="#c8ff00"
              className={styles.cardIconFill}
            />
          </g>
          {/* Label below badge */}
          <text
            x="465"
            y="249"
            className={styles.cardTextMixed}
            textAnchor="middle"
          >
            iOS
          </text>
        </g>
      </svg>
    </div>
  );
}
