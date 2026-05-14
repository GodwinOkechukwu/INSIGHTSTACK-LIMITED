import type { Metadata } from "next";
import AdminProvider from "./_components/AdminProvider";

export const metadata: Metadata = {
  title: { template: "%s | Insight Admin", default: "Insight Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProvider>{children}</AdminProvider>;
}
