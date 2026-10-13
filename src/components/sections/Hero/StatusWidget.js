"use client";

import Badge from "../../common/Badge/Badge";
import Button from "../../common/Button/Button";
import { useLocalTime } from "@/hooks/useLocalTime";
import { PROFILE } from "@/constants/profile";
import { CTA_CONFIG } from "@/constants/navigation";
import styles from "./Hero.module.css";

export default function StatusWidget() {
  const currentTime = useLocalTime(PROFILE.timezone, "12:38");

  return (
    <div className={styles.statusWidgetContainer}>
      {/* Availability Status Badge */}
      <div className={styles.statusBadgeRow}>
        <Badge showDot={false} className={styles.availabilityBadge}>
          {PROFILE.status}
        </Badge>
      </div>

      {/* Timezone and Live Time */}
      <div className={styles.timezoneRow}>
        <span className={styles.timeValue}>{currentTime}</span>
        <span className={styles.timezoneLabel}>{PROFILE.timezoneLabel}</span>
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

      {/* Made in Framer watermark badge */}
      <div className={styles.framerWatermark}>
        <svg
          className={styles.framerIcon}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2 1H10V5H6L2 1Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <path
            d="M2 5H6L10 9H2V5Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <path
            d="M6 9V11.5L2 9.5V9H6Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
        <span className={styles.framerText}>Made in Framer</span>
      </div>
    </div>
  );
}
