import { PROFILE } from "@/constants/profile";
import styles from "./Hero.module.css";

export default function HeroHeadline() {
  const showCursor = PROFILE.bioHeadline.hasCursor && PROFILE.terminalCursor?.enabled;
  const cursorChar = PROFILE.cursorChar || PROFILE.terminalCursor?.char || "_";

  const name = PROFILE.bioHeadline.name || "MUHAMMAD SUFYAN ALI";
  const lastSpaceIndex = name.lastIndexOf(" ");
  const firstPart = lastSpaceIndex !== -1 ? name.substring(0, lastSpaceIndex + 1) : "";
  const lastWord = lastSpaceIndex !== -1 ? name.substring(lastSpaceIndex + 1) : name;

  return (
    <div className={styles.headlineWrapper}>
      <h1 className={`${styles.displayHeading} text-display`}>
        <span className={styles.whiteLine}>{PROFILE.bioHeadline.greeting}</span>
        <span className={styles.accentLine}>
          {firstPart}
          <span className={styles.nowrapEnding}>
            {lastWord}
            {showCursor && <span className={styles.cursor}>{cursorChar}</span>}
          </span>
        </span>
      </h1>
    </div>
  );
}
