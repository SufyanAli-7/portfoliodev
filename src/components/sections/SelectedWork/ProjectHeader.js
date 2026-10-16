import Link from "next/link";
import styles from "./SelectedWork.module.css";

export default function ProjectHeader({ project }) {
  const detailLink = project.detailUrl || `/projects/${project.id}`;

  return (
    <div className={styles.projectHeader}>
      {/* Top Meta Details: 01 · Full-Stack · E-Commerce · 3 Months */}
      <div className={styles.projectMeta} aria-label="Project details">
        <span className={styles.projectIndex}>{project.index}</span>
        <span className={styles.metaDot}>·</span>
        <span className={styles.metaItem}>{project.category}</span>
        <span className={styles.metaDot}>·</span>
        <span className={styles.metaItem}>{project.subCategory}</span>
        <span className={styles.metaDot}>·</span>
        <span className={styles.metaItem}>{project.duration}</span>
      </div>

      {/* Main Title: QuickCart */}
      <h3 className={styles.projectTitle}>{project.title}</h3>

      {/* Subtitle Row: Description on left, Buttons on right facing the subtitle in PC view */}
      <div className={styles.projectSubtitleRow}>
        <p className={styles.projectDescription}>{project.description}</p>

        <div className={styles.projectActions}>
          <Link
            href={detailLink}
            className={styles.actionButtonDark}
            aria-label={`Open ${project.title} case study detail page`}
          >
            <span>Case study</span>
            <span className={styles.buttonIcon} aria-hidden="true">
              ↗
            </span>
          </Link>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionButtonOutline}
            aria-label={`Visit ${project.title} site`}
          >
            <span>Visit site</span>
            <span className={styles.buttonIcon} aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
