"use client";

import { useState, useEffect, useRef } from "react";
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
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on click outside, scroll, wheel, or escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event) => {
      // If click/touch is inside the drawer or on the toggle button, do not close
      if (
        event?.target instanceof Node &&
        ((drawerRef.current && drawerRef.current.contains(event.target)) ||
         (toggleRef.current && toggleRef.current.contains(event.target)))
      ) {
        return;
      }
      setIsMobileMenuOpen(false);
    };

    const handleScroll = (event) => {
      // If touchmove/scroll happened inside the drawer, don't close
      if (
        event?.target instanceof Node &&
        drawerRef.current &&
        drawerRef.current.contains(event.target)
      ) {
        return;
      }
      setIsMobileMenuOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    // Click & touch outside listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });

    // Scroll, wheel & touchmove listeners (closing menu immediately on scroll)
    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    document.addEventListener("touchmove", handleScroll, { passive: true });

    // Keyboard listener
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("wheel", handleScroll);
      document.removeEventListener("touchmove", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const isLinkActive = (item) => {
    if (item.href === "/" && pathname === "/") return true;
    if (item.href === "/projects" && pathname?.startsWith("/projects")) return true;
    if (item.href === "/about" && pathname?.startsWith("/about")) return true;
    if (item.href === "/contact" && pathname?.startsWith("/contact")) return true;
    return false;
  };

  return (
    <header className={styles.header}>
      {/* Background Dark Blurred Overlay - sits behind dropdown, blurs page background */}
      {isMobileMenuOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <Container className={styles.navContainer}>
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
              ref={toggleRef}
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
          <div ref={drawerRef} className={styles.mobileDrawer}>
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
