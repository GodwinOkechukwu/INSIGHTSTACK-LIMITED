"use client";

import { useRouter } from "next/navigation";

interface Props {
  title: string;
  adminName?: string;
  onMenuClick?: () => void;
}

export default function AdminTopbar({ title, adminName, onMenuClick }: Props) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1 rounded text-gray-500 hover:text-gray-800"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        {adminName && (
          <span className="text-sm text-gray-600 hidden sm:block">
            👤 {adminName}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
