import { TECH_STACK } from "@/constants/stats";
import styles from "./VitalStats.module.css";

export default function TechMarquee() {
  // Duplicate array for an uninterrupted, infinite seamless marquee loop
  const marqueeItems = [...TECH_STACK, ...TECH_STACK];

  return (
    <div
      className={styles.marqueeContainer}
      aria-label="Technologies and skills ticker"
      role="region"
    >
      <div className={styles.marqueeTrack}>
        {marqueeItems.map((tech, index) => (
          <div key={`${tech.name}-${index}`} className={styles.marqueeItemWrapper}>
            <span className={styles.marqueeItem}>{tech.name}</span>
            <span className={styles.marqueeDot} aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
