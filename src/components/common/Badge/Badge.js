import styles from "./Badge.module.css";

export default function Badge({
  children,
  showDot = false,
  className = "",
  ...props
}) {
  return (
    <div className={`${styles.badge} ${className}`.trim()} {...props}>
      {showDot && <span className={styles.indicatorDot} aria-hidden="true" />}
      <span>{children}</span>
    </div>
  );
}
