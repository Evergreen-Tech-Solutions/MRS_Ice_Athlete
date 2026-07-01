"use client";

import { useMemo, useState } from "react";
import MedalTimelineDetails from "./MedalTimelineDetails";
import MedalTimelineNode from "./MedalTimelineNode";
import { medalTimelineData } from "./medalTimelineData";

export default function MedalTimeline() {
  const [activeYear, setActiveYear] = useState("2026");

  const activeItem = useMemo(() => {
    return (
      medalTimelineData.find((item) => item.year === activeYear) ??
      medalTimelineData[0]
    );
  }, [activeYear]);

  return (
    <section
      id="medal-timeline"
      className="relative overflow-hidden rounded-lg border border-white/10 bg-black/20 backdrop-blur"
    >
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-amber-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Medal Journey
              </p>
            </div>
          </div>

          <div className="hidden rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-right md:block">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-200/80">
              Active Year
            </p>
            <p className="font-heading text-3xl text-white">
              {activeItem.year}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr] xl:items-stretch">
          {/* Timeline board */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-4 shadow-2xl shadow-black/30 sm:p-6">
            {/* Subtle background texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />

            {/* Dotted route line - desktop */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              viewBox="0 0 900 520"
              preserveAspectRatio="none"
            >
              <path
                d="M115 110 C230 65, 340 115, 455 80 S680 60, 785 120"
                fill="none"
                stroke="rgba(255,255,255,0.36)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="1 22"
              />

              <path
                d="M795 150 C710 235, 615 245, 505 240 S280 225, 120 255"
                fill="none"
                stroke="rgba(245,158,11,0.38)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="1 22"
              />

              <path
                d="M125 300 C210 405, 340 390, 455 410 S690 410, 790 345"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="1 22"
              />
            </svg>

            <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:min-h-[560px] lg:grid-cols-3 lg:grid-rows-3 lg:items-center lg:justify-items-center lg:gap-x-5 lg:gap-y-8 xl:gap-x-7 2xl:gap-x-10">
              {medalTimelineData.map((item) => (
                <MedalTimelineNode
                  key={item.year}
                  item={item}
                  isActive={activeItem.year === item.year}
                  onSelect={() => setActiveYear(item.year)}
                />
              ))}
            </div>
          </div>

          {/* Active details */}
          <MedalTimelineDetails item={activeItem} />
        </div>
      </div>
    </section>
  );
}