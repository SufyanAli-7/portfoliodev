import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { getAuthenticatedAdmin } from "@/lib/auth";

export async function GET(request) {
  try {
    const admin = getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Please log in." },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");
    const searchQuery = searchParams.get("q");

    const query = {};

    if (
      statusFilter &&
      ["unread", "read", "replied", "archived"].includes(statusFilter)
    ) {
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

    return NextResponse.json(
      {
        success: true,
        contacts,
        stats: {
          total,
          unread,
          read,
          replied,
          archived,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin Contacts Fetch Error]:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve contacts." },
      { status: 500 }
    );
  }
}
