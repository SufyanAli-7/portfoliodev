import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { invalidateDashboardCache } from "@/lib/cache";

export async function PATCH(request, context) {
  try {
    const admin = getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();
    const { status } = body;

    const allowedStatuses = ["unread", "read", "replied", "archived"];
    if (!status || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`,
        },
        { status: 400 }
      );
    }

    await connectDB();
    const updated = await Contact.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after", runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Contact record not found." },
        { status: 404 }
      );
    }

    // Invalidate Redis dashboard cache so fresh data is served immediately
    await invalidateDashboardCache();

    return NextResponse.json(
      {
        success: true,
        message: "Status updated successfully.",
        contact: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin Contact Update Error]:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to update contact." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const admin = getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    await connectDB();
    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Contact record not found." },
        { status: 404 }
      );
    }

    // Invalidate Redis dashboard cache
    await invalidateDashboardCache();

    return NextResponse.json(
      { success: true, message: "Contact record deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin Contact Delete Error]:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to delete contact." },
      { status: 500 }
    );
  }
}
