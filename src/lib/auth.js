import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "./db";
import Admin from "@/models/Admin";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "fallback_insecure_jwt_secret_please_set_in_env_file";

/**
 * Hashes a plaintext password with bcrypt (salt factor 10).
 *
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

/**
 * Compares plaintext password with stored bcrypt hash.
 *
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

/**
 * Signs a JWT token for the authenticated admin.
 *
 * @param {object} payload
 * @returns {string}
 */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

/**
 * Verifies a JWT token. Returns decoded payload or null if invalid/expired.
 *
 * @param {string} token
 * @returns {object|null}
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Extracts and verifies the admin JWT token from cookies or Authorization header.
 *
 * @param {Request} request
 * @returns {object|null}
 */
export function getAuthenticatedAdmin(request) {
  try {
    // 1. Check HTTP-only cookie first
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader
        .split(";")
        .map((c) => c.trim().split("="))
        .filter(([k, v]) => k && v)
        .map(([k, ...vs]) => [k, vs.join("=")])
    );

    let token = cookies.admin_token;

    // 2. Check Authorization Bearer header fallback
    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7).trim();
      }
    }

    if (!token) {
      return null;
    }

    return verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Ensures an admin account exists in MongoDB.
 * If database has no admin, creates the default admin from environment variables.
 *
 * @returns {Promise<Admin|null>}
 */
export async function ensureDefaultAdmin() {
  await connectDB();
  const existingCount = await Admin.countDocuments();
  if (existingCount > 0) {
    return null;
  }

  const defaultEmail = (
    process.env.DEFAULT_ADMIN_EMAIL || "sufyan.ali0612@gmail.com"
  ).toLowerCase().trim();
  const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "Admin@12345";

  const hashedPassword = await hashPassword(defaultPassword);

  const newAdmin = await Admin.create({
    email: defaultEmail,
    password: hashedPassword,
    name: "Muhammad Sufyan Ali",
    role: "admin",
  });

  return newAdmin;
}
