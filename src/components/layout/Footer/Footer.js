import Link from "next/link";
import Container from "../Container/Container";
import { FOOTER_CONFIG } from "@/constants/footer";
import styles from "./Footer.module.css";

export default function Footer() {
  const { brandName, cursorChar, year, buildStatus, links } = FOOTER_CONFIG;

  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Site Footer">
      <Container>
        <div className={styles.footerInner}>
          {/* Left Column: Brand Logo with terminal cursor & Copyright line */}
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.brandLogo} aria-label={`${brandName} Home`}>
              <span>{brandName}</span>
              <span className={styles.cursor}>{cursorChar}</span>
            </Link>
            <p className={styles.buildInfo}>
              © {year} {brandName} // {buildStatus}
            </p>
          </div>

          {/* Right Column: Social / Project Links (Excluding Framer badge per instructions) */}
          <nav aria-label="Footer Navigation">
            <ul className={styles.linksList}>
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={styles.footerLink}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
