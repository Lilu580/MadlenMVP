"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("adminJustLoggedIn")) {
      sessionStorage.removeItem("adminJustLoggedIn");
      setSidebarOpen(true);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-project-20">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 md:ml-56 min-w-0">
        <div className="md:hidden flex items-center gap-3 px-4 h-14 bg-gray-project-100 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white text-xl leading-none p-1"
            aria-label="Відкрити меню"
          >
            ☰
          </button>
          <span className="text-white font-medium text-sm">Madlen Admin</span>
        </div>
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
