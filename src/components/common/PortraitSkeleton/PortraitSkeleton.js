import styles from "./PortraitSkeleton.module.css";

export default function PortraitSkeleton({ isLoaded, tag = "PORTRAIT // BUFFERING", className = "" }) {
  return (
    <div
      className={`${styles.skeletonWrapper} ${
        isLoaded ? styles.skeletonHidden : ""
      } ${className}`}
      aria-hidden="true"
    >
      {/* 4 Technical Corner Reticles */}
      <span className={styles.cornerTL} />
      <span className={styles.cornerTR} />
      <span className={styles.cornerBL} />
      <span className={styles.cornerBR} />

      {/* Cyber Technical Grid Pattern */}
      <div className={styles.gridBackdrop} />

      {/* Top HUD Header */}
      <div className={styles.topHud}>
        <span className={styles.hudTag}>{tag}</span>
        <div className={styles.hudStatus}>
          <span className={styles.pulsingDot} />
          <span>SCANNING</span>
        </div>
      </div>

      {/* Center Biometric Portrait Silhouette */}
      <div className={styles.silhouetteContainer}>
        <div className={styles.avatarSilhouette}>
          <div className={styles.head}>
            <div className={styles.reticleTarget}>
              <span className={styles.reticleCrossH} />
              <span className={styles.reticleCrossV} />
            </div>
          </div>
          <div className={styles.neck} />
          <div className={styles.shoulders} />
        </div>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className={styles.bottomHud}>
        <span>BIOMETRIC_CANVAS</span>
        <div className={styles.telemetryBars}>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </div>
      </div>

      {/* Sweeping Laser Scanline */}
      <div className={styles.scanLine} />

      {/* Diagonal Shimmer Glow */}
      <div className={styles.shimmer} />
    </div>
  );
}
