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
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage(
        err.message || "An unexpected error occurred. Please try again or reach out directly."
      );
    }
  };

  const isFormFilled = Boolean(
    formData.name.trim() &&
    formData.email.trim() &&
    formData.message.trim()
  );

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
            Thank you, {formData.name}. Your transmission has been successfully received. I will review your inquiry and follow up within 24 hours.
          </p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setFormData({ name: "", email: "", message: "" });
              setStatus("idle");
              setErrorMessage("");
            }}
          >
            TRANSMIT ANOTHER MESSAGE
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.formElement}>
          {status === "error" && errorMessage && (
            <div className={styles.errorMessage} role="alert">
              <span>⚠</span>
              <span>{errorMessage}</span>
            </div>
          )}

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
              className={`${styles.submitButton} ${
                isFormFilled && status !== "submitting" ? styles.submitButtonReady : ""
              }`}
            >
              {status === "submitting" ? "TRANSMITTING..." : form.submitButton}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
