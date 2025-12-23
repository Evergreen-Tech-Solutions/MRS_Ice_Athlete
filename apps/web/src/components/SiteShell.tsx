"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MobileTopBar from "@/components/MobileTopBar";

type Me = {
  full_name?: string | null;
  email?: string | null;
  image?: string | null;
} | null;

export default function SiteShell({
  me,
  children,
}: {
  me: Me;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-dvh min-h-0 flex flex-col">
      <MobileTopBar onOpen={() => setMobileOpen(true)} me={me} />

      <div className="flex flex-1 min-h-0">
        {/* Desktop only */}
        <aside className="hidden md:block md:shrink-0">
          <Sidebar me={me} />
        </aside>

        <div className="md:hidden">
          <Sidebar
            me={me}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        </div>

        <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
