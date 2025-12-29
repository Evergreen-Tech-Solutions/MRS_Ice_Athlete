"use client";

import { useEffect, useState } from "react";
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

  // If user rotates into XL, force-close the mobile drawer (prevents invisible overlay issues)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) setMobileOpen(false); // xl breakpoint
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="h-dvh min-h-0 flex flex-col">
      {/* Top bar is ONLY for <xl */}
      <MobileTopBar onOpen={() => setMobileOpen(true)} me={me} />

      <div className="flex flex-1 min-h-0">
        {/* Desktop rail only on xl+ */}
        <aside className="hidden xl:block xl:shrink-0">
          <Sidebar me={me} />
        </aside>

        {/* Mobile drawer only on <xl */}
        <div className="xl:hidden">
          <Sidebar
            me={me}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        </div>
        <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-8 pt-16 xl:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}
