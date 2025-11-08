"use client";

import { useState } from "react";
import Image from "next/image";

type ClassSession = {
  id: string;
  start_time: string;
  end_time: string;
  location: string | null;
  is_cancelled: boolean | null;
  capacity_override: number | null;
};

type ClassType = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  cover_url: string | null;
  skill_level: string | null;
  price_cents: number;
  currency: string;
  capacity: number;
  class_sessions?: ClassSession[];
};

export function ClassList({ classes }: { classes: ClassType[] }) {
  const [selected, setSelected] = useState<ClassType | null>(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {classes.map((cls) => (
          <button
            key={cls.id}
            onClick={() => setSelected(cls)}
            className="group flex flex-col items-stretch text-left rounded-3xl border border-white/10 bg-black/60 backdrop-blur p-5 hover:border-amber-400/60 hover:-translate-y-1 transition-all"
          >
            {cls.cover_url && (
              <div className="relative mb-4 h-40 w-full overflow-hidden rounded-2xl">
                <Image
                  src={cls.cover_url}
                  alt={cls.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            )}

            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-lg font-semibold text-amber-300">
                {cls.title}
              </h3>
              {cls.skill_level && (
                <span className="rounded-full border border-amber-400/40 px-3 py-0.5 text-[9px] uppercase tracking-wide text-amber-200">
                  {cls.skill_level}
                </span>
              )}
            </div>

            <p className="text-sm text-white/70 mb-3 line-clamp-3">
              {cls.summary}
            </p>

            <div className="flex items-center justify-between text-[10px] text-white/60 mt-auto">
              <span>
                {cls.price_cents > 0
                  ? `${cls.currency} ${(cls.price_cents / 100).toFixed(0)}`
                  : "Free"}
              </span>
              <span>Capacity: {cls.capacity}</span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-xl w-full mx-4 rounded-3xl bg-neutral-950 border border-amber-500/40 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-3 text-xs text-amber-300 hover:text-amber-200"
            >
              Close
            </button>

            <h2 className="text-2xl font-semibold mb-1 text-amber-300">
              {selected.title}
            </h2>

            {selected.skill_level && (
              <p className="text-[10px] uppercase tracking-wide text-amber-200/70 mb-2">
                {selected.skill_level}
              </p>
            )}

            <p className="text-sm text-white/80 mb-4 whitespace-pre-line">
              {selected.description || selected.summary}
            </p>

            {selected.class_sessions && selected.class_sessions.length > 0 && (
              <div className="mt-2 space-y-1">
                <h3 className="text-sm font-semibold text-amber-300">
                  Upcoming sessions
                </h3>
                <ul className="space-y-1 text-[10px] text-white/75">
                  {selected.class_sessions.map((s) => (
                    <li
                      key={s.id}
                      className="flex justify-between gap-2 border-b border-white/5 pb-1 last:border-0 last:pb-0"
                    >
                      <span>
                        {new Date(s.start_time).toLocaleString()} –{" "}
                        {new Date(s.end_time).toLocaleTimeString()}
                      </span>
                      <span className="text-right">
                        {s.location || "TBD"}
                        {s.is_cancelled && (
                          <span className="ml-1 text-red-400">(Cancelled)</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Future: booking CTA can go here */}
            {/* <button className="mt-4 w-full rounded-2xl bg-amber-400 text-black text-xs font-semibold py-2">
              Book this class
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}
