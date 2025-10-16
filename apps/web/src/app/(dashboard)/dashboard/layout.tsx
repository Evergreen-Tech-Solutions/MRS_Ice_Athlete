import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar"; 

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
      {/* Left sidebar */}
      <aside className="border-r border-white/10 bg-black/40 backdrop-blur sticky top-0 h-svh hidden md:block">
        <Sidebar />
      </aside>

      {/* Mobile top bar + content */}
      <div className="md:hidden border-b border-white/10 sticky top-0 z-10 bg-black/40 backdrop-blur p-3">
        {/* If your Sidebar has a mobile drawer, you can add a button here to open it */}
        <div className="text-sm font-semibold">Admin Dashboard</div>
      </div>

      {/* Main content */}
      <main className="p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
