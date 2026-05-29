"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { href: "/admin", label: "Дашборд", icon: "📊" },
  { href: "/admin/products", label: "Товари", icon: "📦" },
  { href: "/admin/categories", label: "Категорії", icon: "🗂️" },
  { href: "/admin/orders", label: "Замовлення", icon: "📋" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen w-56 bg-gray-project-100 flex flex-col z-50 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}
    >
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Image src="/Logo.webp" alt="Madlen" width={120} height={44} className="brightness-0 invert" />
        <button
          onClick={onClose}
          className="md:hidden text-white/60 hover:text-white p-1 text-lg leading-none"
          aria-label="Закрити меню"
        >
          ✕
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-5 py-3 text-sm transition-colors",
                isActive
                  ? "bg-white/15 text-white font-medium"
                  : "text-white/60 hover:bg-white/10 hover:text-white",
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        >
          <span>🚪</span>
          Вийти
        </button>
      </div>
    </aside>
  );
}
