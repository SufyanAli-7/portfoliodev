import Container from "@/components/layout/Container/Container";
import { STACK_ANALYSIS_CONFIG } from "@/constants/projectsPage";
import styles from "./StackAnalysis.module.css";

export default function StackAnalysis() {
  const { title, columns } = STACK_ANALYSIS_CONFIG;

  return (
    <section
      className={styles.section}
      id="stack-analysis"
      aria-label="Technology Stack Analysis"
    >
      <Container>
        <div className={styles.inner}>
          <h2 className={styles.heading}>{title}</h2>

          <div className={styles.grid}>
            {columns.map((column, colIdx) => (
              <dl key={colIdx} className={styles.column}>
                {column.map((item) => (
                  <div key={item.label} className={styles.row}>
                    <dt className={styles.label}>{item.label}</dt>
                    <dd className={styles.value}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
