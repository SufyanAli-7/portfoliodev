import DotGridBackground from "@/components/layout/DotGridBackground/DotGridBackground";
import Navbar from "@/components/layout/Navbar/Navbar";
import ProjectsContainer from "@/components/projects/ProjectsContainer/ProjectsContainer";
import StackAnalysis from "@/components/projects/StackAnalysis/StackAnalysis";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "02 / PROJECTS | Muhammad Sufyan Ali — Full-Stack Developer",
  description:
    "An indexed repository of digital constructs, experimental protocols, and refined architectural software interfaces built by Muhammad Sufyan Ali.",
  openGraph: {
    title: "02 / PROJECTS | Muhammad Sufyan Ali",
    description:
      "An indexed repository of digital constructs, experimental protocols, and refined architectural software interfaces.",
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
        </main>
        <Footer />
      </div>
    </>
  );
}
