// src/app/(site)/layout.tsx
import Sidebar from "@/components/Sidebar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen min-h-0">            
      <Sidebar />                               
      <main className="flex-1 min-w-0 h-screen overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
