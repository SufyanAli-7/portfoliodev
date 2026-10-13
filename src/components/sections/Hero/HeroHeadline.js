import styles from "./Hero.module.css";

export default function HeroHeadline() {
  return (
    <div className={styles.headlineWrapper}>
      <h1 className={`${styles.displayHeading} text-display`}>
        <span className={styles.whiteLine}>HEY, I&apos;M</span>
        <span className={styles.accentLine}>ERICODE</span>
      </h1>
    </div>
  );
}
