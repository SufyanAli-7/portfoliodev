import DotGridBackground from "@/components/layout/DotGridBackground/DotGridBackground";
import Navbar from "@/components/layout/Navbar/Navbar";
import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ReadyState from "@/components/sections/ReadyState/ReadyState";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "04 / CONTACT | Muhammad Sufyan Ali — Full-Stack Developer",
  description:
    "Let's build something. Open to new projects, collaborations, and conversations. Direct transmissions, inquiry protocols, and contact form for Muhammad Sufyan Ali.",
  openGraph: {
    title: "04 / CONTACT | Muhammad Sufyan Ali",
    description:
      "Open to new projects, collaborations, and conversations. Get in touch with Muhammad Sufyan Ali.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Dark brutalist ambient dot grid background */}
      <DotGridBackground />

      {/* Main page layout */}
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.mainContent}>
          <ContactHero />
          <ReadyState />
        </main>
        <Footer />
      </div>
    </>
  );
}
