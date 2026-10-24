import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

/**
 * Module-level singleton instances for Upstash Redis and Ratelimiters.
 * Reused across serverless function invocations to avoid reconnection overhead.
 */
let redisClient = null;
let shortLimiter = null;
let dailyLimiter = null;
let loginLimiter = null;

function getRateLimiters() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  if (!redisClient) {
    redisClient = new Redis({
      url,
      token,
    });

    // 5 contact submissions per IP per 15 minutes
    shortLimiter = new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      prefix: "ratelimit:contact:short",
      analytics: false,
    });

    // 20 contact submissions per IP per 24 hours (1 day)
    dailyLimiter = new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.slidingWindow(20, "24 h"),
      prefix: "ratelimit:contact:daily",
      analytics: false,
    });

    // 5 login attempts per IP per 15 minutes (brute-force defense)
    loginLimiter = new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      prefix: "ratelimit:admin:login",
      analytics: false,
    });
  }

  return { shortLimiter, dailyLimiter, loginLimiter };
}

/**
 * Evaluates short-term and daily rate limits for a given client identifier (IP).
 * Fails closed with 503 if Redis is unavailable or unconfigured.
 *
 * @param {string} identifier - Client IP or fallback identifier
 * @returns {Promise<{ allowed: boolean, status?: number, error?: string, retryAfter?: number }>}
 */
export async function checkContactRateLimit(identifier) {
  try {
    const limiters = getRateLimiters();

    if (!limiters) {
      console.error(
        "[Security] Rate limiting unconfigured: missing Upstash Redis credentials."
      );
      return {
        allowed: false,
        status: 503,
        error: "Service temporarily unavailable. Please try again later.",
      };
    }

    // 1. Check short-term limit (5 per 15m)
    const shortResult = await limiters.shortLimiter.limit(identifier);
    if (!shortResult.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((shortResult.reset - Date.now()) / 1000)
      );
      return {
        allowed: false,
        status: 429,
        retryAfter,
        error: "Too many requests. Please wait a few minutes before sending another message.",
      };
    }

    // 2. Check daily limit (20 per 24h)
    const dailyResult = await limiters.dailyLimiter.limit(identifier);
    if (!dailyResult.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((dailyResult.reset - Date.now()) / 1000)
      );
      return {
        allowed: false,
        status: 429,
        retryAfter,
        error: "Daily submission limit reached. Please try again tomorrow.",
      };
    }

    return {
      allowed: true,
      remaining: shortResult.remaining,
      reset: shortResult.reset,
    };
  } catch (error) {
    // Fail closed: Never silently bypass rate limiting when Redis fails
    console.error("[Security] Upstash Redis rate limiter error:", error.message);
    return {
      allowed: false,
      status: 503,
      error: "Service temporarily unavailable. Please try again later.",
    };
  }
}

/**
 * Evaluates login rate limit to prevent credential brute-forcing.
 * Allows 5 attempts per 15 minutes per IP.
 *
 * @param {string} identifier - Client IP or fallback identifier
 * @returns {Promise<{ allowed: boolean, status?: number, error?: string, retryAfter?: number }>}
 */
export async function checkLoginRateLimit(identifier) {
  try {
    const limiters = getRateLimiters();

    if (!limiters) {
      console.error(
        "[Security] Login rate limiting unconfigured: missing Upstash Redis credentials."
      );
      return {
        allowed: false,
        status: 503,
        error: "Authentication service temporarily unavailable. Please try again later.",
      };
    }

    const result = await limiters.loginLimiter.limit(identifier);
    if (!result.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((result.reset - Date.now()) / 1000)
      );
      const minutes = Math.max(1, Math.ceil(retryAfter / 60));
      return {
        allowed: false,
        status: 429,
        retryAfter,
        error: `Too many login attempts. Please wait ${minutes} minute${minutes > 1 ? "s" : ""} before trying again.`,
      };
    }

    return {
      allowed: true,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    console.error("[Security] Login rate limiter error:", error.message);
    return {
      allowed: false,
      status: 503,
      error: "Authentication service temporarily unavailable. Please try again later.",
    };
  }
}

