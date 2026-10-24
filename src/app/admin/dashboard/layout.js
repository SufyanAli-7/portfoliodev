import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export const metadata = {
  title: "Admin Dashboard | Transmissions Log",
  description: "Secure administrator dashboard for managing portfolio inquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const admin = verifyToken(token);
  if (!admin) {
    redirect("/admin/login");
  }

  return children;
}
