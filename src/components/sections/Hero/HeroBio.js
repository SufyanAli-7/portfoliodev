import { PROFILE } from "@/constants/profile";
import styles from "./Hero.module.css";

export default function HeroBio() {
  const { role, basedIn, city, suffix } = PROFILE.bioSummary;

  return (
    <div className={styles.bioWrapper}>
      <p className={`${styles.bioText} text-body`}>
        <span className={styles.bioWhite}>{role}</span>
        <span className={styles.bioGray}>{basedIn}</span>
        <span className={styles.bioWhite}>{city}</span>
        <span className={styles.bioGray}>{suffix}</span>
      </p>
    </div>
  );
}
