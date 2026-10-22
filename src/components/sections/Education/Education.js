import Container from "../../layout/Container/Container";
import EducationCard from "./EducationCard";
import { EDUCATION_SECTION, EDUCATION_DATA } from "@/constants/education";
import styles from "./Education.module.css";

export default function Education() {
  return (
    <section
      className={styles.educationSection}
      id={EDUCATION_SECTION.id || "education"}
      aria-label="Education and Certifications"
    >
      <Container>
        {/* Section Header: 06 / EDUCATION with neon accent line */}
        <div className={styles.sectionHeader}>
          <span className={styles.headerPrefix}>
            {EDUCATION_SECTION.sectionPrefix || "06 /"}
          </span>
          <h2 className={styles.headerTitle}>
            {EDUCATION_SECTION.sectionTitle || "EDUCATION"}
          </h2>
          <div className={styles.accentLine} aria-hidden="true" />
        </div>

        {/* Education & Certification Cards Grid */}
        <div className={styles.cardsGrid} role="list">
          {EDUCATION_DATA.map((item, index) => (
            <EducationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
