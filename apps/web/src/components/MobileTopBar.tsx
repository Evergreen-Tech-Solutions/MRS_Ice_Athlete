"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

type Me = {
  full_name?: string | null;
  email?: string | null;
  image?: string | null;
} | null;

export default function MobileTopBar({
  onOpen,
}: {
  onOpen: () => void;
  me?: Me; // optional if you later want avatar/account in header
}) {
  return (
    <div className="xl:hidden sticky top-0 z-40 flex items-center justify-between bg-stone-950 backdrop-blur border-b border-amber-500 px-3 h-12">
      <button
        aria-label="Open navigation"
        onClick={onOpen}
        className="p-2 rounded hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        {/* dark bars to match light header */}
        <div className="w-5 h-0.5 bg-amber-200 mb-1" />
        <div className="w-5 h-0.5 bg-amber-400 mb-1" />
        <div className="w-5 h-0.5 bg-amber-600" />
      </button>

      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/logo.svg" alt="Ice Athlete" width={24} height={24} />
      </Link>

      {/* right spacer to keep logo centered */}
      <div className="w-9" />
    </div>
  );
}
