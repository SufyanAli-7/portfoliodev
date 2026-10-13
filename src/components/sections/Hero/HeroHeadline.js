import { PROFILE } from "@/constants/profile";
import styles from "./Hero.module.css";

export default function HeroHeadline() {
  const showCursor = PROFILE.bioHeadline.hasCursor && PROFILE.terminalCursor?.enabled;
  const cursorChar = PROFILE.cursorChar || PROFILE.terminalCursor?.char || "_";

  return (
    <div className={styles.headlineWrapper}>
      <h1 className={`${styles.displayHeading} text-display`}>
        <span className={styles.whiteLine}>{PROFILE.bioHeadline.greeting}</span>
        <span className={styles.accentLine}>
          {PROFILE.bioHeadline.name}
          {showCursor && <span className={styles.cursor}>{cursorChar}</span>}
        </span>
      </h1>
    </div>
  );
}
