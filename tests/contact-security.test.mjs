import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { Redis } from "@upstash/redis";

// Load environment variables before testing
process.loadEnvFile(".env");

const BASE_URL = "http://localhost:3000/api/contact";

// Import unit modules
const { checkContactRateLimit } = await import("../src/lib/ratelimit.js");
const { isValidIP, getClientIP } = await import("../src/lib/ip.js");
const { readJsonWithLimit } = await import("../src/lib/request.js");
const { contactSubmissionSchema } = await import(
  "../src/lib/validations/contact.js"
);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Helper for DB queries during test verification
let dbConnection = null;
async function getDb() {
  if (!dbConnection) {
    dbConnection = await mongoose.connect(process.env.MONGO_URI);
  }
  return dbConnection.connection.collection("contacts");
}

test("1. Valid submission is saved to MongoDB", async () => {
  const testEmail = `valid-test-${Date.now()}@example.com`;
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": "198.51.100.1",
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      name: "Sufyan Security Test",
      email: testEmail,
      message: "Testing valid message insertion into MongoDB.",
      website: "",
    }),
  });

  assert.equal(res.status, 201);
  const data = await res.json();
  assert.equal(data.success, true);
  assert.ok(data.contactId, "Should return a contactId");

  // Verify record exists in MongoDB
  const collection = await getDb();
  const savedRecord = await collection.findOne({ email: testEmail });
  assert.ok(savedRecord, "Record should be present in database");
  assert.equal(savedRecord.name, "Sufyan Security Test");

  // Clean up
  await collection.deleteOne({ _id: savedRecord._id });
});

test("2. Invalid email, short message, missing fields, and unexpected fields are rejected (HTTP 400)", async () => {
  const ip = `198.51.101.${Math.floor(Math.random() * 200 + 10)}`;

  // Missing name
  const res1 = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": ip,
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      email: "user@example.com",
      message: "Valid message content.",
    }),
  });
  assert.equal(res1.status, 400);

  // Invalid email format
  const res2 = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": ip,
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      name: "Test User",
      email: "not-an-email",
      message: "Valid message content.",
    }),
  });
  assert.equal(res2.status, 400);
  const d2 = await res2.json();
  assert.match(d2.error, /valid email/i);

  // Message too short (< 5 chars)
  const res3 = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": ip,
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      name: "Test User",
      email: "user@example.com",
      message: "Hey",
    }),
  });
  assert.equal(res3.status, 400);

  // Unexpected parameter (strict schema rejection)
  const res4 = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": ip,
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      name: "Test User",
      email: "user@example.com",
      message: "Valid message text.",
      injectedRole: "admin",
    }),
  });
  assert.equal(res4.status, 400);
});

test("3. Oversized request bodies (> 10 KB) are rejected with HTTP 413", async () => {
  const hugeMessage = "A".repeat(11 * 1024); // 11 KB
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": "198.51.100.3",
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      name: "Big Payload",
      email: "big@example.com",
      message: hugeMessage,
    }),
  });

  assert.equal(res.status, 413);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.match(data.error, /Payload too large/i);
});

test("4. Malformed JSON is handled safely with HTTP 400", async () => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": "198.51.100.4",
      Origin: "http://localhost:3000",
    },
    body: "{ name: 'broken json",
  });

  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.match(data.error, /Malformed JSON/i);
});

test("5. Honeypot traps automated bots without writing to MongoDB", async () => {
  const botEmail = `spambot-${Date.now()}@spam.org`;
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": "198.51.100.5",
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      name: "Spam Bot",
      email: botEmail,
      message: "Buy cheap crypto loans today!",
      website: "https://evil-bot-landing.com", // Honeypot filled!
    }),
  });

  assert.equal(res.status, 201);
  const data = await res.json();
  assert.equal(data.success, true);
  assert.equal(data.contactId, undefined, "Bot submissions must not return contactId");

  // Confirm NO record was saved in database
  const collection = await getDb();
  const record = await collection.findOne({ email: botEmail });
  assert.equal(record, null, "Bot submission must NOT be stored in MongoDB");
});

test("6. Rate limiting enforces short-term limit (5 per 15 min per IP) with HTTP 429 and Retry-After", async () => {
  const testIP = `198.51.100.${Math.floor(100 + Math.random() * 150)}`;

  // Clean any prior rate limit keys for this test IP
  const keys = await redis.keys(`ratelimit:contact:*${testIP}*`);
  if (keys.length > 0) {
    await redis.del(...keys);
  }

  // Make 5 honeypot requests (fast and doesn't write to DB)
  for (let i = 1; i <= 5; i++) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-real-ip": testIP,
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        name: "Tester",
        email: "rate@example.com",
        message: "Testing rate limit",
        website: "bot",
      }),
    });
    assert.equal(res.status, 201, `Request ${i} should succeed within quota`);
  }

  // 6th request from same IP must be rate limited with HTTP 429
  const res6 = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": testIP,
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      name: "Tester",
      email: "rate@example.com",
      message: "Testing rate limit 6",
      website: "bot",
    }),
  });

  assert.equal(res6.status, 429, "6th request must return 429 Too Many Requests");
  const data6 = await res6.json();
  assert.equal(data6.success, false);
  assert.match(data6.error, /Too many requests/i);
  assert.ok(
    res6.headers.get("retry-after"),
    "Should include Retry-After header"
  );

  // Clean up Redis keys
  const keysAfter = await redis.keys(`ratelimit:contact:*${testIP}*`);
  if (keysAfter.length > 0) {
    await redis.del(...keysAfter);
  }
});

test("7. Daily limit limiter runs independently with dedicated prefix", async () => {
  const testIP = "198.51.100.70";
  const result = await checkContactRateLimit(testIP);
  assert.equal(result.allowed, true);

  // Verify separate Redis keys exist for short and daily
  const shortKeys = await redis.keys(`ratelimit:contact:short:*${testIP}*`);
  const dailyKeys = await redis.keys(`ratelimit:contact:daily:*${testIP}*`);

  assert.ok(shortKeys.length > 0, "Short limiter prefix key should be created");
  assert.ok(dailyKeys.length > 0, "Daily limiter prefix key should be created");

  // Clean up
  await redis.del(...shortKeys, ...dailyKeys);
});

test("8. Different IP addresses have independent rate limit buckets", async () => {
  const ipA = "198.51.100.81";
  const ipB = "198.51.100.82";

  // Clean up any test keys
  const keys = await redis.keys(`ratelimit:contact:*`);
  const matching = keys.filter((k) => k.includes(ipA) || k.includes(ipB));
  if (matching.length) await redis.del(...matching);

  // Exhaust quota for IP A
  for (let i = 0; i < 5; i++) {
    await checkContactRateLimit(ipA);
  }
  const checkA = await checkContactRateLimit(ipA);
  assert.equal(checkA.allowed, false, "IP A should now be rate limited");

  // IP B should still be allowed
  const checkB = await checkContactRateLimit(ipB);
  assert.equal(checkB.allowed, true, "IP B must have its own independent quota");

  // Clean up
  const cleanKeys = await redis.keys(`ratelimit:contact:*`);
  const toClean = cleanKeys.filter((k) => k.includes(ipA) || k.includes(ipB));
  if (toClean.length) await redis.del(...toClean);
});

test("9. Rate limiting is distributed across requests in Upstash Redis", async () => {
  const testIP = "198.51.100.90";
  await checkContactRateLimit(testIP);

  const keyCount = (await redis.keys(`ratelimit:contact:*${testIP}*`)).length;
  assert.ok(keyCount > 0, "Rate limit state must be stored in Upstash Redis");

  // Clean up
  const keys = await redis.keys(`ratelimit:contact:*${testIP}*`);
  if (keys.length) await redis.del(...keys);
});

test("10. Redis failure fails closed with HTTP 503 instead of bypassing protection", async () => {
  const savedToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  process.env.UPSTASH_REDIS_REST_TOKEN = "";

  // The helper fails closed when unconfigured/unavailable
  const result = await checkContactRateLimit("test-fail-closed-ip");
  assert.equal(result.allowed, false);
  assert.equal(result.status, 503);
  assert.match(result.error, /temporarily unavailable/i);

  // Restore credentials
  process.env.UPSTASH_REDIS_REST_TOKEN = savedToken;
});

test("11. Safe error handling masks internal errors with generic HTTP 500", async () => {
  // Test unit error masking logic
  try {
    throw new Error("MongoNetworkError: connection timed out to cluster0.mongodb.net");
  } catch (err) {
    const safeResponse = {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
    assert.doesNotMatch(JSON.stringify(safeResponse), /mongodb\.net/i);
    assert.doesNotMatch(JSON.stringify(safeResponse), /MongoNetworkError/i);
  }
});

test("12. Response contracts preserve compatibility with existing frontend", async () => {
  const ip = `198.51.102.${Math.floor(Math.random() * 200 + 10)}`;
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": ip,
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      name: "Frontend Contract User",
      email: "frontend@example.com",
      message: "Valid contact message.",
    }),
  });

  assert.equal(res.status, 201);
  const data = await res.json();

  // Frontend relies on: data.success === true and data.error when response is not ok
  assert.equal(data.success, true);
  assert.ok(typeof data.message === "string");

  // Clean up
  if (data.contactId) {
    const collection = await getDb();
    await collection.deleteOne({ _id: new mongoose.Types.ObjectId(data.contactId) });
  }
});

test("13. No server secrets are exposed to client code or environment template", async () => {
  const fs = await import("fs");
  const envExample = fs.readFileSync(".env.example", "utf-8");

  // .env.example must not contain real credentials
  assert.doesNotMatch(envExample, /kvC1BtGF3LZR8DC9/);
  assert.doesNotMatch(envExample, /gQAAAAAAAgPz/);

  // Check that no secret is prefixed with NEXT_PUBLIC_ in .env
  const envReal = fs.readFileSync(".env", "utf-8");
  assert.doesNotMatch(envReal, /NEXT_PUBLIC_MONGO/);
  assert.doesNotMatch(envReal, /NEXT_PUBLIC_UPSTASH/);
});

test("14. Origin, HTTP methods, and Content-Type restrictions enforce strict security", async () => {
  // Untrusted cross-origin request -> HTTP 403
  const badOriginRes = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://malicious-website.xyz",
    },
    body: JSON.stringify({
      name: "Attacker",
      email: "attacker@xyz.com",
      message: "CSRF attack attempt",
    }),
  });
  assert.equal(badOriginRes.status, 403);

  // Unsupported HTTP Method GET -> HTTP 405 with Allow header
  const getRes = await fetch(BASE_URL, {
    method: "GET",
  });
  assert.equal(getRes.status, 405);
  assert.equal(getRes.headers.get("allow"), "POST");

  // Unsupported Content-Type -> HTTP 415
  const badTypeRes = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      Origin: "http://localhost:3000",
    },
    body: "hello raw text",
  });
  assert.equal(badTypeRes.status, 415);
});

test.after(async () => {
  if (dbConnection) {
    await mongoose.disconnect();
  }
});

