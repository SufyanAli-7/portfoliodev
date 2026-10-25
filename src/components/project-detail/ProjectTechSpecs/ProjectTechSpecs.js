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
            {project.techSpecs.map((spec) => {
              const liveHref = spec.href || (spec.id === "status" ? project.liveUrl : null);

              return (
                <div key={spec.id} className={styles.specItem}>
                  <span className={styles.specLabel}>{spec.label}</span>
                  {liveHref ? (
                    <a
                      href={liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.specValue} ${styles.specLink}`}
                      title={`Open Live Project: ${liveHref}`}
                    >
                      <span>{spec.value}</span>
                      <span className={styles.specLinkArrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className={styles.specValue}>{spec.value}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
