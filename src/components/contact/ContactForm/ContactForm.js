"use client";

import { useState } from "react";
import { CONTACT_CONFIG } from "@/constants/contact";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const { form } = CONTACT_CONFIG;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");

    // Construct mailto fallback and trigger success animation
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    setTimeout(() => {
      setStatus("success");
      window.location.href = `mailto:sufyan.ali0612@gmail.com?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <div className={styles.formCard} aria-label="Send direct message">
      {/* Card Header Label: / INIT_MESSAGE */}
      <div className={styles.cardHeader}>
        <span className={styles.cardLabel}>{form.cardLabel}</span>
      </div>

      {status === "success" ? (
        <div className={styles.successState}>
          <div className={styles.successIcon}>✓</div>
          <h3 className={styles.successHeading}>MESSAGE TRANSMITTED</h3>
          <p className={styles.successText}>
            Thank you, {formData.name}. Your transmission has been queued. I will reply within 24 hours.
          </p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setFormData({ name: "", email: "", message: "" });
              setStatus("idle");
            }}
          >
            TRANSMIT ANOTHER MESSAGE
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.formElement}>
          {/* Field: NAME */}
          <div className={styles.fieldGroup}>
            <label htmlFor="contact-name" className={styles.fieldLabel}>
              {form.fields.name.label}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={form.fields.name.placeholder}
              className={styles.inputField}
            />
          </div>

          {/* Field: EMAIL */}
          <div className={styles.fieldGroup}>
            <label htmlFor="contact-email" className={styles.fieldLabel}>
              {form.fields.email.label}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={form.fields.email.placeholder}
              className={styles.inputField}
            />
          </div>

          {/* Field: MESSAGE */}
          <div className={styles.fieldGroup}>
            <label htmlFor="contact-message" className={styles.fieldLabel}>
              {form.fields.message.label}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder={form.fields.message.placeholder}
              className={styles.textareaField}
            />
          </div>

          {/* Form Bottom Bar: Encryption Badge & Submit Button */}
          <div className={styles.formFooter}>
            <div className={styles.encryptedBadge}>
              <span className={styles.badgeText}>{form.footerBadge}</span>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className={styles.submitButton}
            >
              {status === "submitting" ? "TRANSMITTING..." : form.submitButton}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
