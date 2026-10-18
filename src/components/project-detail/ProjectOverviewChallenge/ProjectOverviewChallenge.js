import Container from "@/components/layout/Container/Container";
import styles from "./ProjectOverviewChallenge.module.css";

export default function ProjectOverviewChallenge({ project }) {
  return (
    <section
      className={styles.overviewSection}
      aria-label="Project Overview and Architectural Challenges"
    >
      <Container>
        <div className={styles.splitGrid}>
          {/* Left Column: Heading & Neon Accent Dash */}
          <div className={styles.leftCol}>
            <div className={styles.sectionNumber}>{project.overviewSectionNumber}</div>
            <h2 className={styles.headline}>
              {project.overviewHeadline.split("\n").map((line, idx) => (
                <span key={idx} className={styles.headlineLine}>
                  {line}
                </span>
              ))}
            </h2>
            <div className={styles.accentDash} aria-hidden="true" />
          </div>

          {/* Right Column: Narrative Blocks */}
          <div className={styles.rightCol}>
            <div className={styles.narrativeItem}>
              <div className={styles.narrativeTag}>{project.overviewLabel}</div>
              <p className={styles.narrativeText}>{project.overviewBody}</p>
            </div>

            <div className={styles.narrativeItem}>
              <div className={styles.narrativeTag}>{project.challengeLabel}</div>
              <p className={styles.narrativeText}>{project.challengeBody}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
