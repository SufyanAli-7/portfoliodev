import styles from "./DotGridBackground.module.css";

export default function DotGridBackground() {
  return (
    <div className={styles.backgroundContainer} aria-hidden="true">
      <div className={styles.dotGrid} />
      <div className={styles.ambientVignette} />
      <div className={styles.specks} />
    </div>
  );
}
