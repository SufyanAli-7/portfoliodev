"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMessage, setErrorMessage] = useState("");

  // Check if already authenticated on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/me");
        if (res.ok) {
          router.replace("/admin/dashboard");
        }
      } catch {
        // Not authenticated, stay on login
      }
    }
    checkAuth();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid credentials.");
      }

      // Login successful, redirect to dashboard
      router.push("/admin/dashboard");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to log in.");
    }
  };

  const isFilled = email.trim().length > 0 && password.length > 0;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.loginContainer}>
        {/* Top return link */}
        <div className={styles.topNav}>
          <Link href="/" className={styles.backLink}>
            ← RETURN TO PORTFOLIO
          </Link>
        </div>

        {/* Header section */}
        <div className={styles.headerSection}>
          <div className={styles.protocolBadge}>
            <span className={styles.statusDot}></span>
            <span>05 // AUTH_GATEWAY</span>
          </div>
          <h1 className={styles.title}>ADMIN PORTAL</h1>
          <p className={styles.subtitle}>
            Enter your credentials to access the portfolio communications dashboard.
          </p>
        </div>

        {/* Login form card */}
        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>/ AUTH_CHALLENGE</span>
            <span className={styles.secureIcon}>TLS_ENCRYPTED</span>
          </div>

          {status === "error" && errorMessage && (
            <div className={styles.errorMessage} role="alert">
              <span>⚠</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Field: EMAIL */}
            <div className={styles.fieldGroup}>
              <label htmlFor="admin-email" className={styles.fieldLabel}>
                ADMIN EMAIL
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="sufyan.ali0612@gmail.com"
                className={styles.inputField}
              />
            </div>

            {/* Field: PASSWORD */}
            <div className={styles.fieldGroup}>
              <label htmlFor="admin-password" className={styles.fieldLabel}>
                PASSWORD
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="••••••••••••"
                className={styles.inputField}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className={`${styles.submitButton} ${
                isFilled && status !== "loading" ? styles.submitButtonReady : ""
              }`}
            >
              {status === "loading"
                ? "AUTHENTICATING..."
                : "ACCESS DASHBOARD →"}
            </button>
          </form>
        </div>

        <p className={styles.footerNote}>
          AUTHORIZED ACCESS ONLY · PROTECTED PROTOCOL
        </p>
      </div>
    </div>
  );
}
