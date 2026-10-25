import DotGridBackground from "@/components/layout/DotGridBackground/DotGridBackground";
import Navbar from "@/components/layout/Navbar/Navbar";
import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ReadyState from "@/components/sections/ReadyState/ReadyState";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact | Hire Muhammad Sufyan Ali",
  description:
    "Get in touch with Muhammad Sufyan Ali for full-stack, MERN stack, web, and mobile application development projects and collaborations.",
  alternates: {
    canonical: "https://sufyanali.dev/contact",
  },
  openGraph: {
    title: "Contact | Hire Muhammad Sufyan Ali",
    description:
      "Get in touch with Muhammad Sufyan Ali for full-stack, MERN stack, web, and mobile application development projects and collaborations.",
    url: "https://sufyanali.dev/contact",
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
