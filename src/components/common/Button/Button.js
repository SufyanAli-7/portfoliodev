import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as = "button",
  href,
  onClick,
  ...props
}) {
  const combinedClassName = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim();

  if (as === "a" || href) {
    return (
      <a href={href} className={combinedClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={combinedClassName}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
