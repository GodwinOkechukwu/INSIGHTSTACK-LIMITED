import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@src/lib/auth";
import AdminSidebarShell from "../_components/AdminSidebarShell";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("ADMIN_ACCESS")?.value;
  const decoded = token ? verifyToken<{ id: number; role: string; username: string; email: string }>(token) : null;

  if (!decoded || decoded.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <AdminSidebarShell adminName={decoded.username || decoded.email}>
      {children}
    </AdminSidebarShell>
  );
}
