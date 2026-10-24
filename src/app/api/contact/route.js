import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required." },
        { status: 400 }
      );
    }

    if (message.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Message must be at least 5 characters long.",
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Extract client metadata for context
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : request.headers.get("x-real-ip") || null;
    const userAgent = request.headers.get("user-agent") || null;

    // Save contact message
    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      ipAddress,
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received successfully.",
        contactId: newContact._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact message:", error);

    // Mongoose validation error handling
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        { success: false, error: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
