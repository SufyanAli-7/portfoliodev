import { z } from "zod";

/**
 * Strict server-side Zod validation schema for contact submissions.
 * Unrecognized keys are rejected via .strict() to prevent prototype pollution or parameter injection.
 */
export const contactSubmissionSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required.",
        invalid_type_error: "Name must be a valid string.",
      })
      .trim()
      .min(2, "Name must be at least 2 characters long.")
      .max(100, "Name cannot exceed 100 characters."),

    email: z
      .string({
        required_error: "Email is required.",
        invalid_type_error: "Email must be a valid string.",
      })
      .trim()
      .max(255, "Email cannot exceed 255 characters.")
      .email("Please provide a valid email address.")
      .toLowerCase(),

    message: z
      .string({
        required_error: "Message is required.",
        invalid_type_error: "Message must be a valid string.",
      })
      .trim()
      .min(5, "Message must be at least 5 characters long.")
      .max(5000, "Message cannot exceed 5000 characters."),

    // Honeypot field: invisible to human users, filled only by automated bots
    website: z
      .string({
        invalid_type_error: "Invalid honeypot field format.",
      })
      .max(255)
      .optional()
      .default(""),
  })
  .strict({
    message: "Unexpected fields are not allowed in this request.",
  });
