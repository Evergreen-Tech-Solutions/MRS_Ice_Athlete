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
          {/* Wall-inspired timeline board */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-4 shadow-2xl shadow-black/30 sm:p-6">
            {/* subtle background texture */}
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
                d="M90 115 C240 70, 330 185, 455 130 S690 55, 805 130"
                fill="none"
                stroke="rgba(255,255,255,0.36)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="1 22"
              />
              <path
                d="M820 140 C760 240, 635 235, 505 230 S290 245, 120 235"
                fill="none"
                stroke="rgba(245,158,11,0.38)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="1 22"
              />
              <path
                d="M115 250 C180 360, 330 345, 455 355 S690 390, 810 330"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="1 22"
              />
            </svg>

            <div className="relative z-10 grid min-h-[520px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {medalTimelineData.map((item, index) => {
                const desktopPositionClass =
                  [
                    "lg:self-start lg:justify-self-start",
                    "lg:self-center lg:justify-self-center lg:-translate-y-10",
                    "lg:self-start lg:justify-self-end",
                    "lg:self-center lg:justify-self-start",
                    "lg:self-center lg:justify-self-center lg:translate-y-8",
                    "lg:self-center lg:justify-self-end",
                    "lg:self-end lg:justify-self-start",
                    "lg:self-end lg:justify-self-center",
                    "lg:self-end lg:justify-self-end",
                  ][index] ?? "";

                return (
                  <div
                    key={item.year}
                    className={["flex", desktopPositionClass].join(" ")}
                  >
                    <MedalTimelineNode
                      item={item}
                      isActive={activeItem.year === item.year}
                      onSelect={() => setActiveYear(item.year)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active details */}
          <MedalTimelineDetails item={activeItem} />
        </div>
      </div>
    </section>
  );
}