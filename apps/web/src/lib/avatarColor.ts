// apps/web/src/lib/avatarColor.ts
// Deterministic color picker from a small Tailwind palette
const PALETTE = [
  "bg-slate-600",
  "bg-sky-600",
  "bg-teal-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-orange-600",
  "bg-rose-600",
  "bg-violet-600",
];

export function colorFromSeed(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return PALETTE[h % PALETTE.length];
}

export function initialsFrom(fullName?: string | null, email?: string | null): string {
  const name = (fullName || "").trim();
  if (name) {
    const parts = name.split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase() || first.toUpperCase();
  }
  const local = (email || "").split("@")[0] || "";
  return (local.slice(0, 2) || "U").toUpperCase();
}
