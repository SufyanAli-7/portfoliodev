import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";

process.loadEnvFile(".env");

const BASE_URL = "http://localhost:3000/api/admin";

test("Admin Auth & Dashboard API security tests", async (t) => {
  let authCookie = "";
  let testContactId = "";

  await t.test("1. Login fails with incorrect credentials (HTTP 401)", async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: "WrongPassword!999",
      }),
    });

    assert.equal(res.status, 401);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.match(data.error, /Invalid email or password/i);
  });

  await t.test("2. Login succeeds with correct credentials and returns JWT cookie (HTTP 200)", async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: process.env.DEFAULT_ADMIN_PASSWORD,
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.admin, "Should return admin info");

    // Extract Set-Cookie
    const cookieHeader = res.headers.get("set-cookie");
    assert.ok(cookieHeader, "Should set admin_token cookie");
    assert.match(cookieHeader, /admin_token=/);

    // Save for subsequent tests
    authCookie = cookieHeader.split(";")[0];
  });

  await t.test("3. Protected route /api/admin/auth/me succeeds with cookie", async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Cookie: authCookie,
      },
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.admin.email, process.env.DEFAULT_ADMIN_EMAIL);
  });

  await t.test("4. Unauthenticated access to /api/admin/contacts is rejected (HTTP 401)", async () => {
    const res = await fetch(`${BASE_URL}/contacts`);
    assert.equal(res.status, 401);
    const data = await res.json();
    assert.equal(data.success, false);
  });

  await t.test("5. Authenticated access to /api/admin/contacts returns contacts and stats", async () => {
    const res = await fetch(`${BASE_URL}/contacts`, {
      headers: {
        Cookie: authCookie,
      },
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.contacts), "Contacts must be an array");
    assert.ok(data.stats, "Stats must be included");
    assert.ok(typeof data.stats.total === "number");
  });

  await t.test("6. Update contact status via PATCH /api/admin/contacts/[id]", async () => {
    // Create a temporary test contact directly in MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    const collection = mongoose.connection.collection("contacts");
    const insertRes = await collection.insertOne({
      name: "Dashboard Test Contact",
      email: "dashboard.test@example.com",
      message: "Testing dashboard update action.",
      status: "unread",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    testContactId = insertRes.insertedId.toString();

    // Update status to read
    const patchRes = await fetch(`${BASE_URL}/contacts/${testContactId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify({ status: "read" }),
    });

    assert.equal(patchRes.status, 200);
    const patchData = await patchRes.json();
    assert.equal(patchData.success, true);
    assert.equal(patchData.contact.status, "read");
  });

  await t.test("7. Delete contact via DELETE /api/admin/contacts/[id]", async () => {
    const deleteRes = await fetch(`${BASE_URL}/contacts/${testContactId}`, {
      method: "DELETE",
      headers: {
        Cookie: authCookie,
      },
    });

    assert.equal(deleteRes.status, 200);
    const deleteData = await deleteRes.json();
    assert.equal(deleteData.success, true);

    // Verify removed from MongoDB
    const collection = mongoose.connection.collection("contacts");
    const found = await collection.findOne({
      _id: new mongoose.Types.ObjectId(testContactId),
    });
    assert.equal(found, null);
  });

  await t.test("8. Logout clears the authentication cookie", async () => {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
    });

    assert.equal(res.status, 200);
    const cookie = res.headers.get("set-cookie");
    assert.ok(cookie, "Should return cleared cookie");
    assert.match(cookie, /Max-Age=0/);
  });

  await t.test("9. Login rate limiting blocks excessive attempts with HTTP 429", async () => {
    const testIP = `198.51.100.${Math.floor(Math.random() * 200) + 10}`;
    const payload = JSON.stringify({
      email: "intruder@domain.com",
      password: "wrong-password",
    });

    // Make 5 attempts
    for (let i = 0; i < 5; i++) {
      await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-real-ip": testIP,
        },
        body: payload,
      });
    }

    // 6th attempt must trigger HTTP 429 Too Many Requests
    const blockedRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-real-ip": testIP,
      },
      body: payload,
    });

    assert.equal(blockedRes.status, 429);
    const blockedData = await blockedRes.json();
    assert.equal(blockedData.success, false);
    assert.match(blockedData.error, /Too many login attempts/i);
    assert.ok(blockedRes.headers.get("retry-after"));
  });
});

test.after(async () => {
  await mongoose.disconnect();
});
