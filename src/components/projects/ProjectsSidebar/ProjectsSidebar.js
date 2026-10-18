import { PROJECTS_PAGE_CONFIG } from "@/constants/projectsPage";
import styles from "./ProjectsSidebar.module.css";

export default function ProjectsSidebar() {
  const { systemVersion, sectionPrefix, sectionTitle, description, metaStats } =
    PROJECTS_PAGE_CONFIG;

  return (
    <aside className={styles.sidebarWrapper} aria-label="Projects Overview">
      <div className={styles.stickyContent}>
        {/* Top Header Group */}
        <div className={styles.headerGroup}>
          <div className={styles.systemVersion}>{systemVersion}</div>
          <h1 className={styles.mainHeading}>
            <span className={styles.prefix}>{sectionPrefix} </span>
            <span className={styles.title}>{sectionTitle}</span>
          </h1>
          <p className={styles.description}>{description}</p>
        </div>

        {/* Lower Meta Block (Entries, Last Update, Status) */}
        <div className={styles.metaBlock}>
          <dl className={styles.metaList}>
            {metaStats.map((stat) => (
              <div key={stat.label} className={styles.metaItem}>
                <dt className={styles.metaLabel}>{stat.label}</dt>
                <dd className={styles.metaValue}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </aside>
  );
}
