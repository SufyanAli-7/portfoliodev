import styles from "./ProjectSkeleton.module.css";

export default function ProjectSkeleton({ isLoaded }) {
  return (
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
  );
}
