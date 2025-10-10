"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, ReactNode } from "react";
import IceAxePng from "./IceAxe"; // your PNG-mask icon

// Font Awesome (via react-icons)
import { FaHouse, FaPhone, FaGaugeHigh } from "react-icons/fa6";

type Item = {
  label: string;
  href: string;
  match?: "exact" | "startsWith";
  icon: ReactNode;
};

const NAV_ITEMS: Item[] = [
  {
    label: "Home",
    href: "/",
    match: "exact",
    icon: <FaHouse className="h-5 w-5 shrink-0" aria-hidden="true" />,
  },
  {
    label: "Classes",
    href: "/classes",
    match: "startsWith",
    // keep your axe for brand flair
    icon: (
      <IceAxePng
        className="h-5 w-5 md:h-6 md:w-6 -rotate-12 shrink-0 transition-transform group-hover:scale-110"
      />
    ),
  },
  {
    label: "Contact",
    href: "/contact",
    match: "exact",
    icon: <FaPhone className="h-5 w-5 shrink-0" aria-hidden="true" />,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    match: "startsWith",
    // pick a performance/status feel
    icon: <FaGaugeHigh className="h-5 w-5 shrink-0" aria-hidden="true" />,
  },
];

function isActive(pathname: string, item: Item) {
  if (item.match === "exact") return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
        </Link>

        <div className="w-9" />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col h-screen sticky z-10 pt-5 w-64 border-r border-amber-500 bg-black/50 backdrop-blur">
        <div className="grid place-items-center mb-6 mr-2">
          <Link href="/" className="flex gap-3">
            <Image src="/images/logo.svg" alt="Ice Athlete" width={92} height={92} />
          </Link>
        </div>

        <nav className="font-heading p-2 space-y-3">
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
                  active ? "bg-amber-500/20 text-amber-300" : "hover:bg-white/10 text-white/80",
                ].join(" ")}
              >
                {/* icon inherits current text color */}
                <span className="text-current pr-1">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-3 text-xs text-white/60">
          © {new Date().getFullYear()}{" "}
          <a href="https://www.thedevnest.ca/" className="hover:text-amber-300" target="_blank">
            Powered by DevNest Studio
          </a>
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
            <div className="h-12 inline-flex items-center gap-2 border-b border-amber-500 mb-2">
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
                      active ? "bg-amber-500/20 text-amber-300" : "hover:bg-white/10 text-white/80",
                    ].join(" ")}
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className="text-current">{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
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
