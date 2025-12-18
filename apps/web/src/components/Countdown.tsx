"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  startISO: string; // e.g. "2026-01-22T09:00:00+01:00"
  endISO: string;   // e.g. "2026-01-24T21:00:00+01:00"
};

function format(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const dd = Math.floor(s / 86400);
  const hh = Math.floor((s % 86400) / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return dd > 0 ? `${dd}d ${pad(hh)}:${pad(mm)}:${pad(ss)}` : `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
}

export default function Countdown({ startISO, endISO }: Props) {
  const start = useMemo(() => new Date(startISO).getTime(), [startISO]);
  const end = useMemo(() => new Date(endISO).getTime(), [endISO]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (now >= start && now <= end) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-200 ring-1 ring-emerald-500/30">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        LIVE NOW
      </span>
    );
  }

  if (now < start) {
    return (
      <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-md font-medium text-white ring-2 ring-amber-200/50">
        Starts in {format(start - now)}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-md font-medium text-white ring-2 ring-red-200/50">
      Event finished
    </span>
  );
}
