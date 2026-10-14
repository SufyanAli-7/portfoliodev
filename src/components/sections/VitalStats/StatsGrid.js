import { VITAL_STATS } from "@/constants/stats";
import styles from "./VitalStats.module.css";

export default function StatsGrid() {
  return (
    <div className={styles.cardsGrid} role="list" aria-label="Vital Statistics">
      {VITAL_STATS.map((stat) => (
        <div
          key={stat.id}
          className={styles.statCard}
          role="listitem"
        >
          <span className={styles.statValue}>{stat.value}</span>
          <span className={styles.statLabel}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
