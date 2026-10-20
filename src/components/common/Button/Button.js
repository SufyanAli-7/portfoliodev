import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as,
  href,
  onClick,
  ...props
}) {
  const combinedClassName = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim();

  if (as && as !== "a" && as !== "button") {
    const Component = as;
    return (
      <Component href={href} className={combinedClassName} onClick={onClick} {...props}>
        {children}
      </Component>
    );
  }

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={combinedClassName} onClick={onClick} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={combinedClassName} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  const Component = as || "button";
  return (
    <Component
      type={Component === "button" ? "button" : undefined}
      className={combinedClassName}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
}
