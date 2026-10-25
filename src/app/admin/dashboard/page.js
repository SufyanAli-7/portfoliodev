import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const admin = verifyToken(token);

  await connectDB();
  const [contactsRaw, total, unread, read, replied, archived] = await Promise.all([
    Contact.find().sort({ createdAt: -1 }).limit(100).lean(),
    Contact.countDocuments(),
    Contact.countDocuments({ status: "unread" }),
    Contact.countDocuments({ status: "read" }),
    Contact.countDocuments({ status: "replied" }),
    Contact.countDocuments({ status: "archived" }),
  ]);

  const initialContacts = contactsRaw.map((c) => ({
    _id: c._id.toString(),
    name: c.name,
    email: c.email,
    message: c.message,
    status: c.status,
    ipAddress: c.ipAddress || null,
    userAgent: c.userAgent || null,
    createdAt: c.createdAt ? c.createdAt.toISOString() : null,
    updatedAt: c.updatedAt ? c.updatedAt.toISOString() : null,
  }));

  const initialStats = {
    total,
    unread,
    read,
    replied,
    archived,
  };

  return (
    <DashboardClient
      initialAdmin={admin ? { email: admin.email, name: admin.name } : null}
      initialContacts={initialContacts}
      initialStats={initialStats}
    />
  );
}
