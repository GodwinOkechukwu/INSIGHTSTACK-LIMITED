"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "📦" },
  { href: "/admin/categories", label: "Categories", icon: "🗂️" },
  { href: "/admin/orders", label: "Orders", icon: "🛒" },
  { href: "/admin/customers", label: "Customers", icon: "👥" },
  { href: "/admin/reviews", label: "Reviews", icon: "⭐" },
  { href: "/admin/banners", label: "Banners", icon: "🖼️" },
  { href: "/admin/admins", label: "Admins", icon: "🔐" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-full bg-[#002D5B] text-white w-64">
      <div className="px-6 py-5 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-wide">warespire Admin</h1>
        <p className="text-xs text-white/50 mt-0.5">Management Panel</p>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive
                  ? "bg-white/10 border-l-4 border-[#3DBD7F] text-[#3DBD7F] font-semibold"
                  : "text-white/70 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-white/10 text-xs text-white/40">
        warespire Technologies
      </div>
    </aside>
  );
}
