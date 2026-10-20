import Link from "next/link";
import Container from "../../layout/Container/Container";
import HeroPortrait from "../Hero/HeroPortrait";
import DevSliderWidget from "../Hero/DevSliderWidget";
import { READY_STATE_CONFIG } from "@/constants/readyState";
import styles from "./ReadyState.module.css";

export default function ReadyState() {
  const {
    sectionPrefix,
    sectionTitle,
    id,
    headline,
    description,
    ctaPrimary,
    ctaSecondary,
    terminalPrompt,
    brandWordmark,
  } = READY_STATE_CONFIG;

  return (
    <section
      className={styles.readyStateSection}
      id={id || "contact"}
      aria-label="Ready State Project Inquiry"
    >
      <Container>
        <div className={styles.contentWrapper}>
          {/* Section Label: 06 / READY_STATE */}
          <div className={styles.sectionLabel}>
            <span className={styles.labelPrefix}>{sectionPrefix}</span>
            <span className={styles.labelTitle}>{sectionTitle}</span>
          </div>

          {/* Large Headline: GOT A PROJECT? */}
          <h2 className={styles.headline}>{headline}</h2>

          {/* Subtitle Description */}
          <p className={styles.description}>{description}</p>

          {/* Action Buttons: INIT_CONV & View Source */}
          <div className={styles.buttonGroup}>
            {ctaPrimary.href.startsWith("/") ? (
              <Link
                href={ctaPrimary.href}
                className={styles.primaryBtn}
                aria-label="Initialize conversation"
              >
                {ctaPrimary.label}
              </Link>
            ) : (
              <a
                href={ctaPrimary.href}
                className={styles.primaryBtn}
                aria-label="Initialize conversation"
              >
                {ctaPrimary.label}
              </a>
            )}
            <a
              href={ctaSecondary.href}
              className={styles.secondaryBtn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View portfolio source code"
            >
              {ctaSecondary.label}
            </a>
          </div>

          {/* Terminal Shell Line: eric@ericode:~$ _ */}
          <div className={styles.terminalPrompt} aria-hidden="true">
            <span>
              {terminalPrompt.user}@{terminalPrompt.host}:{terminalPrompt.path}{" "}
            </span>
            <span className={styles.cursor}>{terminalPrompt.cursor}</span>
          </div>

          {/* Portrait & Equalizer Slider Widget (Reused from Hero) */}
          <div className={styles.portraitWrapper}>
            {/* Ambient Radial Halo */}
            <div className={styles.ambientHalo} aria-hidden="true" />

            {/* Ambient Celestial Particles */}
            <div className={styles.particlesContainer} aria-hidden="true">
              <span className={`${styles.particle} ${styles.p1}`} />
              <span className={`${styles.particle} ${styles.p2}`} />
              <span className={`${styles.particle} ${styles.p3}`} />
              <span className={`${styles.particle} ${styles.p4}`} />
              <span className={`${styles.particle} ${styles.p5}`} />
              <span className={`${styles.particle} ${styles.p6}`} />
            </div>

            {/* Reused Hero Portrait component */}
            <HeroPortrait />

            {/* Reused DEV Slider Equalizer widget */}
            <DevSliderWidget />
          </div>

          {/* Massive Brand Wordmark: SUFYAN ALI with blinking cursor */}
          <div className={styles.wordmarkWrapper}>
            <span className={styles.wordmark}>
              {brandWordmark}
              <span className={styles.wordmarkCursor}>_</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
