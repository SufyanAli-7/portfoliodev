import Link from "next/link";
import Container from "@/components/layout/Container/Container";
import styles from "./ProjectNextNav.module.css";

export default function ProjectNextNav({ project }) {
  const { nextProject, nextProjectSectionNumber } = project;

  return (
    <section className={styles.nextNavSection} aria-label="Next Project Navigation">
      <Container>
        <Link
          href={`/projects/${nextProject.id}`}
          className={styles.nextCardLink}
          aria-label={`Navigate to next project: ${nextProject.title}`}
        >
          <div className={styles.contentLeft}>
            <span className={styles.sectionNumber}>{nextProjectSectionNumber}</span>
            <h3 className={styles.nextTitle}>{nextProject.title}</h3>
          </div>

          <div className={styles.arrowCircle} aria-hidden="true">
            <svg
              className={styles.arrowIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </Link>
      </Container>
    </section>
  );
}
