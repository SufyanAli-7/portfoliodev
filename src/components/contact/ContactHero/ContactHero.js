import Container from "@/components/layout/Container/Container";
import ContactForm from "../ContactForm/ContactForm";
import { CONTACT_CONFIG } from "@/constants/contact";
import styles from "./ContactHero.module.css";

export default function ContactHero() {
  const {
    sectionNumber,
    sectionTitle,
    headline,
    description,
    availability,
    socials,
    direct,
  } = CONTACT_CONFIG;

  return (
    <section className={styles.contactSection} aria-label="Contact Muhammad Sufyan Ali">
      <Container>
        {/* Page Title: 04 / CONTACT (Identical size and styling as 04 / ABOUT & 02 / PROJECTS) */}
        <div className={styles.titleWrapper}>
          <h1 className={styles.pageTitle}>
            <span className={styles.titlePrefix}>{sectionNumber}</span>
            <span className={styles.titleText}>{sectionTitle}</span>
          </h1>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className={styles.contactGrid}>
          {/* Left Column: Headline, Bio, Availability & Elsewhere */}
          <div className={styles.leftColumn}>
            {/* Bold Headline */}
            <h2 className={styles.headline}>{headline}</h2>

            {/* Neon Accent Line */}
            <div className={styles.accentDash} aria-hidden="true" />

            {/* Subtitle Description */}
            <p className={styles.description}>{description}</p>

            {/* Subtle Divider */}
            <hr className={styles.divider} aria-hidden="true" />

            {/* Availability Metadata */}
            <div className={styles.availabilityGroup}>
              <div className={styles.statusRow}>
                <span className={styles.statusDot} aria-hidden="true">
                  ■
                </span>
                <span className={styles.statusLabel}>{availability.status}</span>
              </div>
              <div className={styles.metaRow}>{availability.location}</div>
              <div className={styles.metaRow}>{availability.responseTime}</div>
            </div>

            {/* Social Links / Elsewhere */}
            <div className={styles.socialsGroup}>
              <div className={styles.socialsLabel}>{socials.label}</div>
              <ul className={styles.socialList}>
                {socials.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className={styles.socialLink}
                    >
                      <span className={styles.socialText}>{link.label}</span>
                      <span className={styles.arrow} aria-hidden="true">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: / DIRECT Email & Contact Form Card */}
          <div className={styles.rightColumn}>
            {/* Direct Email Header */}
            <div className={styles.directSection}>
              <div className={styles.directLabel}>{direct.label}</div>
              <a
                href={`mailto:${direct.email}`}
                className={styles.directEmail}
                aria-label={`Send email directly to ${direct.email}`}
              >
                {direct.displayEmail}
              </a>
            </div>

            {/* Interactive Form Card */}
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
