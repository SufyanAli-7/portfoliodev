"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../Container/Container";
import Button from "../../common/Button/Button";
import { NAV_LINKS, CTA_CONFIG } from "@/constants/navigation";
import { PROFILE } from "@/constants/profile";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (item) => {
    if (item.href === "/" && pathname === "/") return true;
    if (item.href === "/projects" && pathname?.startsWith("/projects")) return true;
    return false;
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.navInner}>
          {/* Brand Logo */}
          <Link
            href="/"
            className={styles.logo}
            aria-label={`${PROFILE.name} Homepage`}
          >
            <span>{PROFILE.logoName}</span>
            <span className={styles.cursor}>
              {PROFILE.cursorChar || "_"}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation">
            <ul className={styles.navLinks}>
              {NAV_LINKS.map((item) => {
                const active = isLinkActive(item);
                return (
                  <li key={item.number}>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${
                        active ? styles.activeLink : ""
                      }`}
                    >
                      <span>{item.number}/</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA & Mobile Controls */}
          <div className={styles.actions}>
            <Button
              as="a"
              href={CTA_CONFIG.href}
              variant="primary"
              size="md"
              aria-label="Initialize Conversation"
            >
              {CTA_CONFIG.label}
            </Button>

            <button
              type="button"
              className={styles.mobileToggle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className={styles.mobileDrawer}>
            <ul className={styles.mobileNavList}>
              {NAV_LINKS.map((item) => {
                const active = isLinkActive(item);
                return (
                  <li key={item.number}>
                    <Link
                      href={item.href}
                      className={`${styles.mobileNavLink} ${
                        active ? styles.mobileActiveLink : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.number}/</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}
