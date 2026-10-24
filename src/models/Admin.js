import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Admin email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Admin password hash is required."],
    },
    name: {
      type: String,
      default: "Muhammad Sufyan Ali",
      trim: true,
    },
    role: {
      type: String,
      default: "admin",
      enum: ["admin"],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation during Next.js hot reload
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
