import Container from "../../layout/Container/Container";
import ProjectHeader from "./ProjectHeader";
import MockupCarousel from "./MockupCarousel";
import TestimonialCard from "./TestimonialCard";
import {
  SELECTED_WORK_SECTION,
  PROJECTS_DATA,
  FEATURED_TESTIMONIAL,
} from "@/constants/projects";
import styles from "./SelectedWork.module.css";

export default function SelectedWork() {
  return (
    <section
      className={styles.selectedWorkSection}
      id={SELECTED_WORK_SECTION.id || "projects"}
      aria-label="Selected Work and Portfolio Projects"
    >
      <Container>
        {/* Section Header: 04 / SELECTED WORK with neon accent line */}
        <div className={styles.sectionHeader}>
          <span className={styles.headerPrefix}>
            {SELECTED_WORK_SECTION.sectionPrefix || "04 /"}
          </span>
          <h2 className={styles.headerTitle}>
            {SELECTED_WORK_SECTION.sectionTitle || "SELECTED WORK"}
          </h2>
          <div className={styles.accentLine} aria-hidden="true" />
        </div>

        {/* Projects Showcase List */}
        <div className={styles.projectsList}>
          {PROJECTS_DATA.map((project) => (
            <div key={project.id} className={styles.projectItem}>
              {/* Project Meta, Title, Description and Top-Right Action Buttons */}
              <ProjectHeader project={project} />

              {/* Horizontal Mockup Showcase Carousel */}
              <MockupCarousel
                screens={project.screens}
                detailUrl={project.detailUrl || `/projects/${project.id}`}
                projectTitle={project.title}
              />
            </div>
          ))}
        </div>

        {/* Client Testimonial Banner (Matches Reference Screenshot) */}
        <TestimonialCard testimonial={FEATURED_TESTIMONIAL} />
      </Container>
    </section>
  );
}
