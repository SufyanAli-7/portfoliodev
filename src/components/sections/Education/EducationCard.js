import styles from "./Education.module.css";

export default function EducationCard({ item, index }) {
  const indexStr = String(index + 1).padStart(2, "0");

  return (
    <article
      className={styles.educationCard}
      aria-label={`${item.title} — ${item.institution}`}
    >
      {/* Cyber Corner Reticles */}
      <span className={styles.cardCornerTL} aria-hidden="true" />
      <span className={styles.cardCornerBR} aria-hidden="true" />

      {/* Background Watermark Index */}
      <span className={styles.cardWatermark} aria-hidden="true">
        {indexStr}
      </span>

      <div>
        {/* Card Header: Category Badge + Status Pill */}
        <div className={styles.cardHeader}>
          <span className={styles.categoryBadge}>{item.categoryBadge}</span>
          <div className={styles.statusPill}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>{item.status}</span>
          </div>
        </div>

        {/* Period Tag */}
        <div className={styles.periodTag}>
          <span className={styles.periodPrefix}>/</span>
          <time>{item.period}</time>
        </div>

        {/* Degree or Certification Title */}
        <h3 className={styles.itemTitle}>{item.title}</h3>

        {/* Institution & Location */}
        <div className={styles.institutionRow}>
          <span className={styles.institutionName}>{item.institution}</span>
          <span className={styles.institutionSeparator} aria-hidden="true">
            ·
          </span>
          <span className={styles.locationText}>{item.location}</span>
        </div>

        {/* Terminal Path */}
        <div className={styles.terminalPath} title={item.terminalPath}>
          <span className={styles.terminalPrompt}>~/</span>
          <span>{item.terminalPath.replace(/^~\//, "")}</span>
        </div>

        {/* Description Highlights */}
        <div className={styles.descriptionBlock}>
          {item.descriptionLines.map((line, idx) => (
            <p key={idx} className={styles.descriptionLine}>
              <span className={styles.bulletDot} aria-hidden="true" />
              <span className={styles.lineText}>{line}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Tech / Skills Badges */}
      <div className={styles.techList} aria-label="Skills and Topics">
        {item.technologies.map((tech) => (
          <span key={tech} className={styles.techBadge}>
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
