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

const PROJECT_SEO_MAP = {
  quickcart: {
    title: "QuickCart | Full Stack E-Commerce Platform",
    description:
      "Full-stack e-commerce platform with product catalog, cart & checkout, customer portal, and admin management built by Sufyan Ali.",
  },
  "slidex-lms": {
    title: "SlideX LMS | Modern Learning Management System",
    description:
      "Full-stack Learning Management System with interactive courses, video delivery, student portals, and analytics by Sufyan Ali.",
  },
  "that-marketing": {
    title: "that. Marketing | Modern Digital Agency Web App",
    description:
      "Modern digital agency web platform with interactive services catalog, work portfolio showcase, and consultation booking by Sufyan.",
  },
  taskly: {
    title: "Taskly | Task & Productivity Mobile Web App",
    description:
      "Modern productivity and task management mobile web app with real-time tracking, priority tags, and progress analytics by Sufyan.",
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECT_DETAILS_MAP[slug] || DEFAULT_PROJECT_DETAIL;
  const seo = PROJECT_SEO_MAP[slug] || {
    title: `${project.title} | Muhammad Sufyan Ali`.slice(0, 60),
    description: (project.overviewBody || "").slice(0, 155),
  };

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `https://sufyanali.dev/projects/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://sufyanali.dev/projects/${slug}`,
      images: [
        {
          url: project.heroImage || "https://sufyanali.dev/cover.jpg",
          alt: seo.title,
        },
      ],
    },
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
