import DotGridBackground from "@/components/layout/DotGridBackground/DotGridBackground";
import Navbar from "@/components/layout/Navbar/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import VitalStats from "@/components/sections/VitalStats/VitalStats";
import ServicesRunning from "@/components/sections/ServicesRunning/ServicesRunning";
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
        </main>
      </div>
    </>
  );
}
