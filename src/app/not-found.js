import Link from "next/link";
import DotGridBackground from "@/components/layout/DotGridBackground/DotGridBackground";
import Navbar from "@/components/layout/Navbar/Navbar";
import Container from "@/components/layout/Container/Container";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./not-found.module.css";

export const metadata = {
  title: "404 // PAGE NOT FOUND | Muhammad Sufyan Ali",
  description: "The route you requested doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <>
      {/* Dark Brutalist Ambient Dot Grid Background */}
      <DotGridBackground />

      <div className={styles.pageWrapper}>
        <Navbar />

        <main className={styles.mainContent}>
          <section className={styles.notFoundSection} aria-label="404 Page Not Found">
            <Container>
              <div className={styles.inner}>
                {/* Top Centered Block: Error Code Tag & Giant 404 */}
                <div className={styles.heroBlock}>
                  <div className={styles.errorCode}>ERROR_CODE // 404</div>
                  <h1 className={styles.bigNumber}>404</h1>
                </div>

                {/* Subtle Horizontal Divider Line */}
                <div className={styles.dividerLine} aria-hidden="true" />

                {/* Bottom Split Row: Left Message & Right Actions */}
                <div className={styles.splitRow}>
                  {/* Left Column: Heading & Body */}
                  <div className={styles.leftCol}>
                    <h2 className={styles.heading}>PAGE NOT FOUND.</h2>
                    <p className={styles.description}>
                      The route you requested doesn't exist or has been moved. Check the path or navigate back to something that does.
                    </p>
                  </div>

                  {/* Right Column: Return Home, View Projects, & System Status */}
                  <div className={styles.rightCol}>
                    <div className={styles.buttonGroup}>
                      <Link href="/" className={styles.primaryBtn} aria-label="Return to Homepage">
                        <span className={styles.btnArrow}>←</span>
                        <span>RETURN_HOME</span>
                      </Link>

                      <Link href="/projects" className={styles.secondaryBtn} aria-label="View Projects">
                        <span>VIEW_PROJECTS</span>
                        <span className={styles.btnArrow}>→</span>
                      </Link>
                    </div>

                    <div className={styles.statusIndicator}>
                      <span className={styles.statusDot} aria-hidden="true" />
                      <span className={styles.statusText}>SYSTEM_STATUS: NOMINAL</span>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
