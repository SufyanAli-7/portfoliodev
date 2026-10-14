"use client";

import Badge from "../../common/Badge/Badge";
import Button from "../../common/Button/Button";
import { useLocalTime } from "@/hooks/useLocalTime";
import { PROFILE } from "@/constants/profile";
import { CTA_CONFIG } from "@/constants/navigation";
import styles from "./Hero.module.css";

export default function StatusWidget() {
  const { time, period, location } = useLocalTime();

  return (
    <div className={styles.statusWidgetContainer}>
      {/* Availability Status Badge */}
      <div className={styles.statusBadgeRow}>
        <Badge showDot={false} className={styles.availabilityBadge}>
          {PROFILE.status}
        </Badge>
      </div>

      {/* Dynamic 12h User Time & Geolocation */}
      <div className={styles.timezoneRow}>
        <span className={styles.timeValue}>
          {time} {period}
        </span>
        <span className={styles.timezoneLabel}>{location}</span>
      </div>

      {/* Bottom CTA Button */}
      <div className={styles.actionRow}>
        <Button
          as="a"
          href={CTA_CONFIG.href}
          variant="primary"
          size="md"
          className={styles.heroCtaButton}
          aria-label="Initialize conversation"
        >
          {CTA_CONFIG.label}
        </Button>
      </div>
    </div>
  );
}
