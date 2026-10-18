import Container from "@/components/layout/Container/Container";
import ProjectsSidebar from "../ProjectsSidebar/ProjectsSidebar";
import ProjectCard from "../ProjectCard/ProjectCard";
import { PROJECTS_LIST } from "@/constants/projectsPage";
import styles from "./ProjectsContainer.module.css";

export default function ProjectsContainer() {
  return (
    <section className={styles.section} id="projects-archive">
      <Container>
        <div className={styles.layoutGrid}>
          {/* Left Column: Sticky Sidebar */}
          <ProjectsSidebar />

          {/* Right Column: Scrollable Project Cards List */}
          <div className={styles.cardsColumn}>
            {PROJECTS_LIST.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
