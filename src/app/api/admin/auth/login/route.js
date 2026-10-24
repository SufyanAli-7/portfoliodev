import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import {
  comparePassword,
  signToken,
  ensureDefaultAdmin,
} from "@/lib/auth";
import { getClientIP } from "@/lib/ip";
import { checkLoginRateLimit } from "@/lib/ratelimit";

export async function POST(request) {
  try {
    // 1. Rate Limiting Protection (Anti Brute-Force: 5 attempts per 15m)
    const clientIP = getClientIP(request);
    const rateLimit = await checkLoginRateLimit(clientIP);

    if (!rateLimit.allowed) {
      const headers = {};
      if (rateLimit.retryAfter) {
        headers["Retry-After"] = String(rateLimit.retryAfter);
      }
      return NextResponse.json(
        { success: false, error: rateLimit.error },
        { status: rateLimit.status || 429, headers }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    await connectDB();
    // Ensure default admin exists if this is the first login
    await ensureDefaultAdmin();

    const normalizedEmail = String(email).toLowerCase().trim();
    const admin = await Admin.findOne({ email: normalizedEmail });

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(String(password), admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = signToken({
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const isProduction = process.env.NODE_ENV === "production";
    const cookieValue = `admin_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
      7 * 24 * 60 * 60
    }; ${isProduction ? "Secure;" : ""}`;

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        admin: {
          email: admin.email,
          name: admin.name,
        },
      },
      { status: 200 }
    );

    response.headers.set("Set-Cookie", cookieValue);
    return response;
  } catch (error) {
    console.error("[Admin Auth Login Error]:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal server error during login." },
      { status: 500 }
    );
  }
}
