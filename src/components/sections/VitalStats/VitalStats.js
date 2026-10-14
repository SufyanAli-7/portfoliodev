import Container from "../../layout/Container/Container";
import StatsGrid from "./StatsGrid";
import TechMarquee from "./TechMarquee";
import styles from "./VitalStats.module.css";

export default function VitalStats() {
  return (
    <section
      className={styles.statsSection}
      id="about"
      aria-label="Vital Statistics and Skills"
    >
      <Container>
        {/* Section Header: 02 / VITAL_STATS with neon accent line */}
        <div className={styles.sectionHeader}>
          <span className={styles.headerPrefix}>02 /</span>
          <h2 className={styles.headerTitle}>VITAL_STATS</h2>
          <div className={styles.accentLine} aria-hidden="true" />
        </div>

        {/* 3 Stats Cards: 5+ Years, 12 Projects, 03 Markets */}
        <StatsGrid />

        {/* Infinite right-to-left tech marquee ticker */}
        <TechMarquee />
      </Container>
    </section>
  );
}
