"use client";

import Link from "next/link";
import Image from "next/image";

type Me = {
  full_name?: string | null;
  email?: string | null;
  image?: string | null;
} | null;

export default function MobileTopBar({
  onOpen,
  me,
}: {
  onOpen: () => void;
  me?: Me; // optional if you later want avatar/account in header
}) {
  return (
    <div
      className="
        xl:hidden
        fixed top-0 inset-x-0
        z-[80]
        flex items-center justify-between
        bg-stone-950/90 backdrop-blur
        border-b border-amber-500/60
        px-3 h-12
        pointer-events-auto
      "
    >
      <button
        type="button"
        aria-label="Open navigation"
        onClick={onOpen}
        onPointerDown={onOpen}
        onTouchStart={onOpen}
        className="
          p-2 rounded
          hover:bg-white/10 active:bg-white/15
          focus:outline-none focus:ring-2 focus:ring-amber-500
          touch-manipulation
        "
      >
        <span className="block w-5 h-0.5 bg-amber-200 mb-1" />
        <span className="block w-5 h-0.5 bg-amber-400 mb-1" />
        <span className="block w-5 h-0.5 bg-amber-600" />
      </button>

      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/logo.svg" alt="Ice Athlete" width={24} height={24} />
      </Link>

      {/* right spacer to keep logo centered */}
      <div className="w-9" />
    </div>
  );
}
