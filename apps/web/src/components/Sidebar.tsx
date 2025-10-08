"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Item = {
  label: string;
  href: string;
  match?: "exact" | "startsWith";
};

const NAV_ITEMS: Item[] = [
  { label: "Home", href: "/", match: "exact" },
  { label: "Classes", href: "/classes", match: "startsWith" },
  { label: "Contact", href: "/contact", match: "exact" },
  // expose dashboard entry (will protect later with auth)
  { label: "Dashboard", href: "/dashboard", match: "startsWith" },
];

function isActive(pathname: string, item: Item) {
  if (item.match === "exact") return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile drawer

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-black/70 backdrop-blur border-b border-amber-500 px-3 h-12">
        <button
          aria-label="Open navigation"
          onClick={() => setOpen(true)}
          className="p-2 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white" />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="Ice Athlete" width={24} height={24} />
          <span className="font-semibold">Ice Athlete</span>
        </Link>

        <div className="w-9" />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col h-screen sticky top-0 w-64 border-r border-amber-500 bg-black/70 backdrop-blur">
        <div className="h-16 flex items-center gap-3 px-3 border-b border-amber-500">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.svg" alt="Ice Athlete" width={82} height={82} />
          </Link>
        </div>

        <nav className="p-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                aria-current={active ? "page" : undefined}
                className={[
                  "group flex items-center gap-3 px-3 py-2 rounded-lg transition",
                  active ? "bg-amber-500/20 text-amber-300" : "hover:bg-white/10",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-2 w-2 rounded-full",
                    active ? "bg-amber-400" : "bg-white/40 group-hover:bg-white",
                  ].join(" ")}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-3 border-t border-amber-500 text-xs text-white/60">
          © {new Date().getFullYear()} Ice Athlete
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="md:hidden fixed inset-0 z-50"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-black border-r border-amber-500 p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-12 flex items-center gap-2 border-b border-amber-500 mb-2">
              <Image src="/images/logo.svg" alt="Ice Athlete" width={24} height={24} />
              <span className="font-semibold">Ice Athlete</span>
              <button
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="ml-auto p-2 rounded hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "block px-3 py-2 rounded-lg transition",
                      active ? "bg-amber-500/20 text-amber-300" : "hover:bg-white/10",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
