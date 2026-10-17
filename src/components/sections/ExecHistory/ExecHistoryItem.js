import styles from "./ExecHistory.module.css";

export default function ExecHistoryItem({ item, isLast }) {
  return (
    <article
      className={`${styles.historyItem} ${isLast ? styles.historyItemLast : ""}`}
      aria-label={`${item.role} at ${item.company}`}
    >
      {/* Left Column: Timeline & Neon Dash */}
      <div className={styles.periodColumn}>
        <time className={styles.periodText}>
          {item.periodFormatted || item.period}
        </time>
        <div className={styles.periodDash} aria-hidden="true" />
      </div>

      {/* Right Column: Role Title, Terminal Path, Description & Tech Badges */}
      <div className={styles.detailsColumn}>
        <h3 className={styles.roleTitle}>
          {item.role}
        </h3>

        <div className={styles.terminalPath} title={item.location}>
          <span className={styles.terminalPrompt}>~/</span>
          <span>{item.terminalPath.replace(/^~\//, "")}</span>
        </div>

        <div className={styles.descriptionBlock}>
          {item.descriptionLines.map((line, idx) => (
            <p key={idx} className={styles.descriptionLine}>
              {line}
            </p>
          ))}
        </div>

        <div className={styles.techList} aria-label="Technologies used">
          {item.technologies.map((tech) => (
            <span key={tech} className={styles.techBadge}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
