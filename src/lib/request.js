const MAX_BODY_BYTES = 10 * 1024; // 10 KB limit

/**
 * Validates request Content-Type and reads the request stream with a strict 10 KB byte limit.
 * Protects against buffer overflows, Slowloris chunked transfer attacks, and malformed JSON.
 *
 * @param {Request} request
 * @returns {Promise<{ data?: any, error?: string, status?: number }>}
 */
export async function readJsonWithLimit(request) {
  // 1. Verify Content-Type (HTTP 415)
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return {
      error: "Unsupported Media Type. Content-Type must be application/json.",
      status: 415,
    };
  }

  // 2. Early Content-Length check (HTTP 413)
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const declaredLength = parseInt(contentLengthHeader, 10);
    if (!isNaN(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return {
        error: "Payload too large. Maximum allowed size is 10 KB.",
        status: 413,
      };
    }
  }

  // 3. Read body stream with strict byte limit
  let text = "";
  if (request.body && typeof request.body.getReader === "function") {
    const reader = request.body.getReader();
    const chunks = [];
    let receivedBytes = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        receivedBytes += value.length;
        if (receivedBytes > MAX_BODY_BYTES) {
          try {
            await reader.cancel();
          } catch {
            // Ignore cancel errors
          }
          return {
            error: "Payload too large. Maximum allowed size is 10 KB.",
            status: 413,
          };
        }
        chunks.push(value);
      }

      const totalBuffer = new Uint8Array(receivedBytes);
      let offset = 0;
      for (const chunk of chunks) {
        totalBuffer.set(chunk, offset);
        offset += chunk.length;
      }
      text = new TextDecoder("utf-8").decode(totalBuffer);
    } catch (streamError) {
      return {
        error: "Failed to read request stream.",
        status: 400,
      };
    }
  } else {
    // Fallback for mocked test requests or environments without ReadableStream
    try {
      text = await request.text();
      if (Buffer.byteLength(text, "utf-8") > MAX_BODY_BYTES) {
        return {
          error: "Payload too large. Maximum allowed size is 10 KB.",
          status: 413,
        };
      }
    } catch {
      return {
        error: "Failed to read request body.",
        status: 400,
      };
    }
  }

  // 4. Reject empty body
  if (!text.trim()) {
    return {
      error: "Request body cannot be empty.",
      status: 400,
    };
  }

  // 5. Parse JSON (HTTP 400 for malformed JSON)
  try {
    const data = JSON.parse(text);
    if (data === null || typeof data !== "object") {
      return {
        error: "JSON payload must be an object.",
        status: 400,
      };
    }
    return { data };
  } catch {
    return {
      error: "Malformed JSON payload.",
      status: 400,
    };
  }
}
