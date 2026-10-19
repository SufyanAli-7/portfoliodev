import DotGridBackground from "@/components/layout/DotGridBackground/DotGridBackground";
import Navbar from "@/components/layout/Navbar/Navbar";
import AboutHero from "@/components/about/AboutHero/AboutHero";
import ReadyState from "@/components/sections/ReadyState/ReadyState";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "04 / ABOUT | Muhammad Sufyan Ali — Full-Stack Developer",
  description:
    "Bridging the gap between raw functional logic and editorial aesthetics. Muhammad Sufyan Ali is a Full-Stack Developer specializing in MERN, Next.js, and high-performance digital architectures.",
  openGraph: {
    title: "04 / ABOUT | Muhammad Sufyan Ali",
    description:
      "Bridging the gap between raw functional logic and editorial aesthetics. Full-Stack Developer based in Faisalabad, Pakistan.",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Dark brutalist ambient dot grid background */}
      <DotGridBackground />

      {/* Main page layout */}
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.mainContent}>
          <AboutHero />
          <ReadyState />
        </main>
        <Footer />
      </div>
    </>
  );
}
