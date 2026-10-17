import styles from "./SelectedWork.module.css";

export default function TestimonialCard({ testimonial }) {
  if (!testimonial) return null;

  const authorText = testimonial.role
    ? `${testimonial.author} — ${testimonial.role}`
    : testimonial.author;

  return (
    <div className={styles.testimonialContainer}>
      <div className={styles.testimonialCard}>
        <blockquote className={styles.testimonialQuote}>
          {testimonial.quote}
        </blockquote>

        <div className={styles.testimonialAccentBar} aria-hidden="true" />

        <p className={styles.testimonialAuthor}>{authorText}</p>
      </div>
    </div>
  );
}
