import { PROFILE } from "@/constants/profile";
import styles from "./Hero.module.css";

export default function HeroBio() {
  const { prefix, highlight, suffix } = PROFILE.bioSummary;

  return (
    <div className={styles.bioWrapper}>
      <p className={`${styles.bioText} text-body`}>
        <span>{prefix}</span>
        <span className={styles.bioHighlight}>{highlight}</span>
        <span>{suffix}</span>
      </p>
    </div>
  );
}
