"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  startISO: string; // e.g. "2026-01-22T09:00:00+01:00"
  endISO: string; // e.g. "2026-01-24T21:00:00+01:00"

  /** NEW: controls UI output */
  variant?: "pill" | "digits";

  /** Optional label for pill mode */
  prefixText?: string; // default "Starts in"
};

function format(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const dd = Math.floor(s / 86400);
  const hh = Math.floor((s % 86400) / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;

  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    dd,
    hh,
    mm,
    ss,
    text:
      dd > 0
        ? `${dd}d ${pad(hh)}:${pad(mm)}:${pad(ss)}`
        : `${pad(hh)}:${pad(mm)}:${pad(ss)}`,
  };
}

function IceDigitBlock({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_50px_rgba(0,0,0,0.35)]",
        wide ? "min-w-[7.5rem]" : "min-w-[5.25rem]",
      ].join(" ")}
    >
      {/* Frost sheen */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.22),transparent_55%)]" />
      {/* Subtle ice cracks / streaks */}
      <div className="pointer-events-none absolute -inset-10 opacity-[0.16] [background:linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.35)_10%,transparent_20%,transparent_55%,rgba(255,255,255,0.25)_65%,transparent_75%,transparent_100%)] rotate-6" />

      <div className="relative">
        <div
          className={[
            "text-center font-extrabold tracking-tight",
            "text-transparent bg-clip-text",
            "bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(165,243,252,0.95)_45%,rgba(59,130,246,0.55)_100%)]",
            "drop-shadow-[0_10px_22px_rgba(56,189,248,0.22)]",
            "text-3xl md:text-5xl",
          ].join(" ")}
        >
          {value}
        </div>

        <div className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-white/55">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function Countdown({
  startISO,
  endISO,
  variant = "pill",
  prefixText = "Starts in",
}: Props) {
  const start = useMemo(() => new Date(startISO).getTime(), [startISO]);
  const end = useMemo(() => new Date(endISO).getTime(), [endISO]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // guard: invalid timestamps
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return (
      <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-md font-medium text-white ring-2 ring-red-200/50">
        Invalid event time
      </span>
    );
  }

  if (now >= start && now <= end) {
    if (variant === "digits") {
      return (
        <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-semibold text-emerald-200">
            LIVE NOW
          </span>
        </div>
      );
    }

    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-200 ring-1 ring-emerald-500/30">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        LIVE NOW
      </span>
    );
  }

  if (now < start) {
    const { dd, hh, mm, ss, text } = format(start - now);

    if (variant === "digits") {
      const hhStr = String(hh).padStart(2, "0");
      const mmStr = String(mm).padStart(2, "0");
      const ssStr = String(ss).padStart(2, "0");

      return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {dd > 0 ? (
            <IceDigitBlock label="Days" value={String(dd)} wide />
          ) : (
            // If no days, still keep layout stable by showing 00 Days
            <IceDigitBlock label="Days" value="0" wide />
          )}

          <IceDigitBlock label="Hours" value={hhStr} />
          <IceDigitBlock label="Min" value={mmStr} />
          <IceDigitBlock label="Sec" value={ssStr} />
        </div>
      );
    }

    return (
      <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-md font-medium text-white ring-2 ring-amber-200/50">
        {prefixText} {text}
      </span>
    );
  }

  if (variant === "digits") {
    return (
      <div className="inline-flex items-center rounded-2xl border border-red-200/30 bg-white/5 px-4 py-3">
        <span className="text-sm font-semibold text-white/80">
          Event finished
        </span>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-md font-medium text-white ring-2 ring-red-200/50">
      Event finished
    </span>
  );
}
