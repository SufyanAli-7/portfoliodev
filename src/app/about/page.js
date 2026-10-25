import DotGridBackground from "@/components/layout/DotGridBackground/DotGridBackground";
import Navbar from "@/components/layout/Navbar/Navbar";
import AboutHero from "@/components/about/AboutHero/AboutHero";
import ReadyState from "@/components/sections/ReadyState/ReadyState";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "About Muhammad Sufyan Ali | Full Stack Developer",
  description:
    "Full-Stack Developer & Software Engineer based in Faisalabad, Pakistan. Specializing in MERN stack, Next.js, React Native, and scalable architectures.",
  alternates: {
    canonical: "https://sufyanali.dev/about",
  },
  openGraph: {
    title: "About Muhammad Sufyan Ali | Full Stack Developer",
    description:
      "Full-Stack Developer & Software Engineer based in Faisalabad, Pakistan. Specializing in MERN stack, Next.js, React Native, and scalable architectures.",
    url: "https://sufyanali.dev/about",
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
