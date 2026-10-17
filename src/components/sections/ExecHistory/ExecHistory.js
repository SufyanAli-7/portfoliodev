import Container from "../../layout/Container/Container";
import ExecHistoryItem from "./ExecHistoryItem";
import {
  EXEC_HISTORY_SECTION,
  WORK_EXPERIENCE_DATA,
} from "@/constants/experience";
import styles from "./ExecHistory.module.css";

export default function ExecHistory() {
  return (
    <section
      className={styles.execHistorySection}
      id={EXEC_HISTORY_SECTION.id || "experience"}
      aria-label="Execution History and Work Experience"
    >
      <Container>
        {/* Section Header: 05 / EXEC_HISTORY with horizontal neon accent line */}
        <div className={styles.sectionHeader}>
          <span className={styles.headerPrefix}>
            {EXEC_HISTORY_SECTION.sectionPrefix || "05 /"}
          </span>
          <h2 className={styles.headerTitle}>
            {EXEC_HISTORY_SECTION.sectionTitle || "EXEC_HISTORY"}
          </h2>
          <div className={styles.accentLine} aria-hidden="true" />
        </div>

        {/* History List */}
        <div className={styles.historyList}>
          {WORK_EXPERIENCE_DATA.map((item, index) => (
            <ExecHistoryItem
              key={item.id}
              item={item}
              isLast={index === WORK_EXPERIENCE_DATA.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
