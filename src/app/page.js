import DotGridBackground from "@/components/layout/DotGridBackground/DotGridBackground";
import Navbar from "@/components/layout/Navbar/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import VitalStats from "@/components/sections/VitalStats/VitalStats";
import ServicesRunning from "@/components/sections/ServicesRunning/ServicesRunning";
import SelectedWork from "@/components/sections/SelectedWork/SelectedWork";
import ExecHistory from "@/components/sections/ExecHistory/ExecHistory";
import Education from "@/components/sections/Education/Education";
import ReadyState from "@/components/sections/ReadyState/ReadyState";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Dark brutalist ambient dot grid background */}
      <DotGridBackground />

      {/* Main page layout */}
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.mainContent}>
          <Hero />
          <VitalStats />
          <ServicesRunning />
          <SelectedWork />
          <ExecHistory />
          <Education />
          <ReadyState />
        </main>
        <Footer />
      </div>
    </>
  );
}

