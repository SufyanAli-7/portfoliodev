import DotGridBackground from "@/components/layout/DotGridBackground/DotGridBackground";
import Navbar from "@/components/layout/Navbar/Navbar";
import ProjectDetailHero from "@/components/project-detail/ProjectDetailHero/ProjectDetailHero";
import ProjectOverviewChallenge from "@/components/project-detail/ProjectOverviewChallenge/ProjectOverviewChallenge";
import ProjectTechSpecs from "@/components/project-detail/ProjectTechSpecs/ProjectTechSpecs";
import ProjectNextNav from "@/components/project-detail/ProjectNextNav/ProjectNextNav";
import ReadyState from "@/components/sections/ReadyState/ReadyState";
import Footer from "@/components/layout/Footer/Footer";
import { PROJECT_DETAILS_MAP, DEFAULT_PROJECT_DETAIL } from "@/constants/projectDetails";
import styles from "./page.module.css";

export function generateStaticParams() {
  return Object.keys(PROJECT_DETAILS_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECT_DETAILS_MAP[slug] || DEFAULT_PROJECT_DETAIL;
  return {
    title: `${project.title} // ARCHIVE | Muhammad Sufyan Ali`,
    description: project.overviewBody,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = PROJECT_DETAILS_MAP[slug] || DEFAULT_PROJECT_DETAIL;

  return (
    <>
      {/* Dark ambient brutalist dot grid background */}
      <DotGridBackground />

      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.mainContent}>
          {/* Section 01: Hero Showcase & 3D Render Media */}
          <ProjectDetailHero project={project} />

          {/* Section 02: Overview & Challenge Split Narrative */}
          <ProjectOverviewChallenge project={project} />

          {/* Section 03: 4-Column Technical Specifications */}
          <ProjectTechSpecs project={project} />

          {/* Section 04: Next Project Banner Navigation */}
          <ProjectNextNav project={project} />

          {/* Section 05: Reused READY_STATE Component (per user instructions) */}
          <ReadyState />
        </main>
        <Footer />
      </div>
    </>
  );
}
