import Container from "@/components/layout/Container/Container";
import styles from "./ProjectTechSpecs.module.css";

export default function ProjectTechSpecs({ project }) {
  return (
    <section className={styles.specsSection} aria-label="Project Technical Specifications">
      <Container>
        <div className={styles.inner}>
          {/* Header Tag: 03 / TECH_SPECS */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>{project.techSpecsSectionNumber}</span>
          </div>

          {/* Divider Line */}
          <div className={styles.dividerLine} aria-hidden="true" />

          {/* 4 Columns Specifications Grid */}
          <div className={styles.specsGrid}>
            {project.techSpecs.map((spec) => (
              <div key={spec.id} className={styles.specItem}>
                <span className={styles.specLabel}>{spec.label}</span>
                <span className={styles.specValue}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
