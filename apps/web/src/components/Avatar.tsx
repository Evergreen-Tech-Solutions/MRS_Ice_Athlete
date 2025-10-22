// apps/web/src/components/Avatar.tsx
"use client";

import { colorFromSeed, initialsFrom } from "@/lib/avatarColor";
import clsx from "clsx";

type Props = {
  fullName?: string | null;
  email?: string | null;
  size?: number; // px
  className?: string;
  title?: string;
};

export default function Avatar({ fullName, email, size = 32, className, title }: Props) {
  const initials = initialsFrom(fullName, email);
  const bg = colorFromSeed(email || fullName || "user");

  const dimension = `${size}px`;
  return (
    <div
      className={clsx(
        "inline-grid place-items-center rounded-full text-white font-semibold select-none",
        bg,
        className
      )}
      style={{ width: dimension, height: dimension, fontSize: Math.max(10, Math.floor(size / 3)) }}
      title={title || fullName || email || "User"}
      aria-label={title || fullName || email || "User"}
    >
      {initials}
    </div>
  );
}
