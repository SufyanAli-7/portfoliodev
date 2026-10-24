import { Redis } from "@upstash/redis";

let redisClient = null;

/**
 * Returns a singleton Upstash Redis client.
 * Returns null if environment variables are not configured.
 */
export function getRedisClient() {
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
  }

  return redisClient;
}

const DASHBOARD_VERSION_KEY = "cache:admin:dashboard:version";
const DEFAULT_TTL_SECONDS = 300; // 5 minutes cache

/**
 * Retrieves the current dashboard cache generation version.
 * If Redis is unavailable, returns a fallback timestamp or 1.
 */
export async function getDashboardCacheVersion() {
  try {
    const redis = getRedisClient();
    if (!redis) return 1;

    const version = await redis.get(DASHBOARD_VERSION_KEY);
    if (!version) {
      await redis.set(DASHBOARD_VERSION_KEY, 1);
      return 1;
    }
    return Number(version) || 1;
  } catch (error) {
    console.warn("[Cache] Failed to fetch cache version, falling back:", error.message);
    return 1;
  }
}

/**
 * Increments the dashboard cache version to instantly invalidate all cached
 * tab queries and stats in O(1) time without expensive key scanning.
 */
export async function invalidateDashboardCache() {
  try {
    const redis = getRedisClient();
    if (!redis) return false;

    await redis.incr(DASHBOARD_VERSION_KEY);
    return true;
  } catch (error) {
    console.warn("[Cache] Failed to invalidate dashboard cache:", error.message);
    return false;
  }
}

/**
 * Retrieves cached data by key. Returns null on cache miss or Redis error.
 *
 * @param {string} key
 * @returns {Promise<any|null>}
 */
export async function getCache(key) {
  try {
    const redis = getRedisClient();
    if (!redis) return null;

    const data = await redis.get(key);
    if (!data) return null;

    // Upstash handles JSON serialization automatically if object was stored
    return data;
  } catch (error) {
    console.warn(`[Cache] Error reading key "${key}":`, error.message);
    return null;
  }
}

/**
 * Sets data in Redis cache with TTL.
 *
 * @param {string} key
 * @param {any} value
 * @param {number} [ttlSeconds]
 */
export async function setCache(key, value, ttlSeconds = DEFAULT_TTL_SECONDS) {
  try {
    const redis = getRedisClient();
    if (!redis) return false;

    await redis.set(key, value, { ex: ttlSeconds });
    return true;
  } catch (error) {
    console.warn(`[Cache] Error setting key "${key}":`, error.message);
    return false;
  }
}

/**
 * Helper to construct a normalized cache key for contacts and dashboard stats.
 *
 * @param {number|string} version
 * @param {string} statusFilter
 * @param {string} searchQuery
 */
export function buildContactsCacheKey(version, statusFilter = "all", searchQuery = "") {
  const safeStatus = (statusFilter || "all").toLowerCase().trim();
  const safeQuery = searchQuery && searchQuery.trim()
    ? encodeURIComponent(searchQuery.trim().toLowerCase())
    : "none";
  return `cache:admin:contacts:v${version}:${safeStatus}:${safeQuery}`;
}
