import Image from "next/image";
import Container from "@/components/layout/Container/Container";
import { ABOUT_CONFIG } from "@/constants/about";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  const {
    sectionNumber,
    sectionTitle,
    portrait,
    content,
    techStack,
    philosophy,
    resumeCta,
  } = ABOUT_CONFIG;

  return (
    <section className={styles.aboutSection} aria-label="About Muhammad Sufyan Ali">
      <Container>
        {/* Page Title: 04 / ABOUT */}
        <div className={styles.titleWrapper}>
          <h1 className={styles.pageTitle}>
            <span className={styles.titlePrefix}>{sectionNumber}</span>
            <span className={styles.titleText}>{sectionTitle}</span>
          </h1>
        </div>

        {/* Main 2-Column Responsive Layout */}
        <div className={styles.aboutGrid}>
          {/* Left Column: Portrait & Metadata */}
          <div className={styles.portraitColumn}>
            {/* Identity Label */}
            <div className={styles.portraitLabel} aria-hidden="true">
              {portrait.label}
            </div>

            {/* Vertical Portrait Image */}
            <div className={styles.imageCard}>
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={937}
                height={1678}
                priority
                sizes="(max-width: 810px) 100vw, (max-width: 1200px) 45vw, 460px"
                className={styles.portraitImage}
              />
            </div>

            {/* Metadata: Location & Status */}
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{portrait.location.label}</span>
                <span className={styles.metaValue}>{portrait.location.value}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{portrait.status.label}</span>
                <span className={styles.metaValue}>{portrait.status.value}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Headline, Narrative, Tech Stack, Philosophy, CV */}
          <div className={styles.contentColumn}>
            {/* Editorial Headline */}
            <h2 className={styles.headline}>{content.headline}</h2>

            {/* Narrative Paragraphs */}
            <div className={styles.paragraphs}>
              {content.paragraphs.map((para, index) => (
                <p key={index} className={styles.paragraph}>
                  {para}
                </p>
              ))}
            </div>

            {/* Tech Stack Overview */}
            <div className={styles.techStackSection}>
              <div className={styles.techStackLabel}>{techStack.label}</div>
              <div className={styles.techGrid}>
                {techStack.columns.map((col) => (
                  <div key={col.id} className={styles.techCol}>
                    <h3 className={styles.techColTitle}>{col.title}</h3>
                    <ul className={styles.techList}>
                      {col.skills.map((skill, sIdx) => (
                        <li key={sIdx} className={styles.techItem}>
                          <span className={styles.bullet} aria-hidden="true">
                            •
                          </span>
                          <span className={styles.skillText}>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Philosophy */}
            <div className={styles.philosophySection}>
              <h3 className={styles.philosophyLabel}>{philosophy.label}</h3>
              <blockquote className={styles.philosophyQuote}>
                {philosophy.quote}
              </blockquote>
            </div>

            {/* Download CV CTA */}
            <div className={styles.actionRow}>
              <a
                href={resumeCta.href}
                download={resumeCta.filename}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.downloadBtn}
                aria-label="Download Muhammad Sufyan Ali Curriculum Vitae (PDF)"
              >
                <span className={styles.downloadText}>{resumeCta.label}</span>
                <span className={styles.downloadArrow} aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
