/**
 * Validates whether a string is a syntactically valid IPv4 or IPv6 address.
 *
 * @param {string} ip
 * @returns {boolean}
 */
export function isValidIP(ip) {
  if (!ip || typeof ip !== "string") return false;

  // IPv4 regex pattern
  const ipv4Pattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Pattern.test(ip)) return true;

  // IPv6 basic validation
  const ipv6Pattern =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return ipv6Pattern.test(ip);
}

/**
 * Extracts and validates the real client IP address from request headers.
 * Uses Vercel trusted headers (x-real-ip, x-forwarded-for first entry)
 * and falls back to a safe identifier ('unknown-client') to prevent header spoofing bypasses.
 *
 * @param {Request} request
 * @returns {string} Safe IP or fallback identifier
 */
export function getClientIP(request) {
  const headers = request.headers;

  // On Vercel edge/serverless, x-real-ip contains the connecting client's IP
  const realIP = headers.get("x-real-ip");
  if (realIP && isValidIP(realIP.trim())) {
    return realIP.trim();
  }

  // Next, inspect x-forwarded-for: on Vercel, the first entry is the client IP
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIP = forwardedFor.split(",")[0].trim();
    if (isValidIP(firstIP)) {
      return firstIP;
    }
  }

  // Local development fallback
  const host = headers.get("host") || "";
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return "127.0.0.1";
  }

  // If no trusted IP can be determined, return 'unknown-client'
  // All unidentifiable requests will share this bucket to prevent rate-limit bypass
  return "unknown-client";
}
