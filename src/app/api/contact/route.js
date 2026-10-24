import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { checkContactRateLimit } from "@/lib/ratelimit";
import { getClientIP } from "@/lib/ip";
import { readJsonWithLimit } from "@/lib/request";
import { contactSubmissionSchema } from "@/lib/validations/contact";

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Cache-Control": "no-store, max-age=0",
};

/**
 * Validates request Origin against the Host header or trusted development origins.
 *
 * @param {Request} request
 * @returns {boolean}
 */
function isValidOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Non-browser or same-origin requests without an Origin header
    return true;
  }

  const host = request.headers.get("host");
  if (!host) {
    return false;
  }

  try {
    const originUrl = new URL(origin);
    // Matches same host
    if (originUrl.host === host) {
      return true;
    }

    // Allow localhost/127.0.0.1 in development
    if (
      process.env.NODE_ENV !== "production" &&
      (originUrl.hostname === "localhost" ||
        originUrl.hostname === "127.0.0.1")
    ) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

export async function POST(request) {
  try {
    // 1. Origin verification (reject cross-origin POST attacks)
    if (!isValidOrigin(request)) {
      return NextResponse.json(
        { success: false, error: "Cross-origin requests are forbidden." },
        { status: 403, headers: SECURITY_HEADERS }
      );
    }

    // 2. Validate Content-Type, enforce 10 KB size limit, and parse JSON
    const { data: rawBody, error: readError, status: readStatus } =
      await readJsonWithLimit(request);

    if (readError) {
      return NextResponse.json(
        { success: false, error: readError },
        { status: readStatus || 400, headers: SECURITY_HEADERS }
      );
    }

    // 3. Extract verified client IP
    const clientIP = getClientIP(request);

    // 4. Distributed rate limiting (Upstash Redis) - before database/validation operations
    const rateLimit = await checkContactRateLimit(clientIP);
    if (!rateLimit.allowed) {
      const headers = { ...SECURITY_HEADERS };
      if (rateLimit.retryAfter) {
        headers["Retry-After"] = String(rateLimit.retryAfter);
      }

      return NextResponse.json(
        { success: false, error: rateLimit.error },
        { status: rateLimit.status || 429, headers }
      );
    }

    // 5. Honeypot check: silently discard bot submissions without DB write
    if (
      typeof rawBody.website === "string" &&
      rawBody.website.trim().length > 0
    ) {
      // Return consistent success response so automated bots believe submission succeeded
      return NextResponse.json(
        {
          success: true,
          message: "Your message has been received successfully.",
        },
        { status: 201, headers: SECURITY_HEADERS }
      );
    }

    // 6. Strict server-side Zod validation
    const validation = contactSubmissionSchema.safeParse(rawBody);
    if (!validation.success) {
      const firstError =
        validation.error.issues?.[0]?.message ||
        validation.error.message ||
        "Invalid contact form data.";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const { name, email, message } = validation.data;

    // 7. Connect to MongoDB and save validated fields only
    await connectDB();

    const userAgent = request.headers.get("user-agent") || null;
    const sanitizedIP = clientIP !== "unknown-client" ? clientIP : null;

    const newContact = await Contact.create({
      name,
      email,
      message,
      ipAddress: sanitizedIP,
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received successfully.",
        contactId: newContact._id,
      },
      { status: 201, headers: SECURITY_HEADERS }
    );
  } catch (error) {
    // Safe error handling: never expose database connection details or stack traces
    console.error("[Contact API] Error processing contact submission:", error.message);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message. Please try again later.",
      },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

// Return HTTP 405 for unsupported HTTP methods
export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method Not Allowed. Only POST requests are permitted." },
    {
      status: 405,
      headers: {
        ...SECURITY_HEADERS,
        Allow: "POST",
      },
    }
  );
}

export async function PUT() {
  return GET();
}

export async function DELETE() {
  return GET();
}

export async function PATCH() {
  return GET();
}
