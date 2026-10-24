import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { getAuthenticatedAdmin } from "@/lib/auth";
import {
  getDashboardCacheVersion,
  buildContactsCacheKey,
  getCache,
  setCache,
} from "@/lib/cache";

export async function GET(request) {
  try {
    const admin = getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Please log in." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status") || "all";
    const searchQuery = searchParams.get("q") || "";

    // 1. Check Redis Cache First (returns in ~10ms without querying MongoDB)
    const version = await getDashboardCacheVersion();
    const cacheKey = buildContactsCacheKey(version, statusFilter, searchQuery);
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      return NextResponse.json(
        { ...cachedData, cached: true },
        {
          status: 200,
          headers: {
            "X-Cache": "HIT",
            "Cache-Control": "private, max-age=60",
          },
        }
      );
    }

    // 2. Cache Miss: Connect and Query MongoDB
    await connectDB();

    const query = {};
    if (["unread", "read", "replied", "archived"].includes(statusFilter)) {
      query.status = statusFilter;
    }

    if (searchQuery && typeof searchQuery === "string" && searchQuery.trim()) {
      const escapedQuery = searchQuery.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedQuery, "i");
      query.$or = [{ name: regex }, { email: regex }, { message: regex }];
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .lean();

    // Calculate status breakdown statistics
    const [total, unread, read, replied, archived] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: "unread" }),
      Contact.countDocuments({ status: "read" }),
      Contact.countDocuments({ status: "replied" }),
      Contact.countDocuments({ status: "archived" }),
    ]);

    const payload = {
      success: true,
      contacts,
      stats: {
        total,
        unread,
        read,
        replied,
        archived,
      },
    };

    // 3. Store in Redis Cache with 300s (5m) TTL
    await setCache(cacheKey, payload, 300);

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "X-Cache": "MISS",
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch (error) {
    console.error("[Admin Contacts Fetch Error]:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve contacts." },
      { status: 500 }
    );
  }
}
