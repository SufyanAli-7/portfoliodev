import DotGridBackground from "@/components/layout/DotGridBackground/DotGridBackground";
import Navbar from "@/components/layout/Navbar/Navbar";
import ProjectsContainer from "@/components/projects/ProjectsContainer/ProjectsContainer";
import StackAnalysis from "@/components/projects/StackAnalysis/StackAnalysis";
import ReadyState from "@/components/sections/ReadyState/ReadyState";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Projects Archive | Muhammad Sufyan Ali",
  description:
    "Explore production-ready full stack web and mobile apps engineered with Next.js, React, Node.js, and modern cloud architectures by Sufyan Ali.",
  alternates: {
    canonical: "https://sufyanali.dev/projects",
  },
  openGraph: {
    title: "Projects Archive | Muhammad Sufyan Ali",
    description:
      "Explore production-ready full stack web and mobile apps engineered with Next.js, React, Node.js, and modern cloud architectures by Sufyan Ali.",
    url: "https://sufyanali.dev/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      {/* Dark brutalist ambient dot grid background */}
      <DotGridBackground />

      {/* Main page layout */}
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.mainContent}>
          <ProjectsContainer />
          <StackAnalysis />
          <ReadyState />
        </main>
        <Footer />
      </div>
    </>
  );
}
