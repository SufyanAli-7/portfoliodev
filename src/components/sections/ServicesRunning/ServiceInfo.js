"use client";

import { useEffect, useState } from "react";
import styles from "./ServicesRunning.module.css";

/**
 * Calculates exact dynamic experience from start date (years and months).
 * Automatically updates as the calendar date advances.
 * Base career start: April 1, 2024 (evaluates to 2Y 6MO in Oct 2026).
 */
export function calculateExperience(startDateInput = "2024-04-01") {
  const startDate = new Date(startDateInput);
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();

  if (now.getDate() < startDate.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${Math.max(0, years)}Y ${Math.max(0, months)}MO`;
}

export default function ServiceInfo({
  serviceCode = "0031",
  title = "FULL_STACK_DEV",
  description = "I build apps end-to-end — from database schema to the UI you touch. React, Next.js, and Node.js are my daily drivers.",
  status = {
    state: "ACTIVE",
    duration: "2Y 6MO",
    startDate: "2024-04-01",
  },
}) {
  const [dynamicDuration, setDynamicDuration] = useState(
    status?.duration || "2Y 6MO"
  );

  useEffect(() => {
    if (status?.duration && (status?.exactDuration || status?.duration === "2Y 6M")) {
      setDynamicDuration(status.duration);
      return;
    }
    const startDate = status?.startDate || "2024-04-01";
    setDynamicDuration(calculateExperience(startDate));
  }, [status?.startDate, status?.duration, status?.exactDuration]);

  return (
    <div className={styles.infoColumn}>
      {/* Code index */}
      <span className={styles.serviceCode}>{serviceCode}</span>

      {/* Title */}
      <h3 className={styles.serviceTitle}>{title}</h3>

      {/* Description */}
      <p className={styles.serviceDescription}>{description}</p>

      {/* Active Status Badge */}
      <div
        className={styles.statusBadge}
        role="status"
        aria-label={`Status: ${status?.state || "ACTIVE"}, Experience: ${dynamicDuration}`}
      >
        <span className={styles.statusDot} aria-hidden="true" />
        <span className={styles.statusState}>{status?.state || "ACTIVE"}</span>
        <span className={styles.statusDuration}>{dynamicDuration}</span>
      </div>
    </div>
  );
}
