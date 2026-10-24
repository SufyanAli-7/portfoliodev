import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long."],
      maxlength: [100, "Name cannot exceed 100 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address.",
      ],
      maxlength: [255, "Email cannot exceed 255 characters."],
    },
    message: {
      type: String,
      required: [true, "Message is required."],
      trim: true,
      minlength: [5, "Message must be at least 5 characters long."],
      maxlength: [5000, "Message cannot exceed 5000 characters."],
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied", "archived"],
      default: "unread",
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent recompilation of model during Next.js hot reloads
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;
