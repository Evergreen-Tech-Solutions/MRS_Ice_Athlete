import type { TimelineYear } from "./types";

type MedalTimelineNodeProps = {
  item: TimelineYear;
  isActive: boolean;
  onSelect: () => void;
};

function getMedalCount(item: TimelineYear) {
  return item.groups.reduce((total, group) => total + group.results.length, 0);
}

function getMedalBreakdown(item: TimelineYear) {
  const results = item.groups.flatMap((group) => group.results);

  return {
    gold: results.filter((result) => result.medal === "Gold").length,
    silver: results.filter((result) => result.medal === "Silver").length,
    bronze: results.filter((result) => result.medal === "Bronze").length,
  };
}

export default function MedalTimelineNode({
  item,
  isActive,
  onSelect,
}: MedalTimelineNodeProps) {
  const medalCount = getMedalCount(item);
  const breakdown = getMedalBreakdown(item);

  return (
    <button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      aria-pressed={isActive}
      className={[
        "group relative w-full max-w-[230px] rounded-3xl border p-4 text-left transition-all duration-300 sm:w-[210px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300",
        isActive
          ? "scale-[1.03] border-amber-300/70 bg-black shadow-2xl shadow-amber-500/20"
          : "border-white/10 bg-black/50 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-black/70",
      ].join(" ")}
    >
      {/* Active glow */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -inset-px rounded-3xl opacity-0 blur transition-opacity duration-300",
          isActive ? "bg-amber-400/30 opacity-100" : "group-hover:opacity-60",
        ].join(" ")}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <span
            className={[
              "font-heading text-4xl leading-none tracking-tight transition-colors",
              isActive ? "text-amber-300" : "text-white",
            ].join(" ")}
          >
            {item.year}
          </span>

          <span
            className={[
              "rounded-full px-2.5 py-1 text-[11px] font-bold",
              isActive
                ? "bg-amber-300 text-black"
                : "bg-white/10 text-white/70 group-hover:bg-amber-300/20 group-hover:text-amber-100",
            ].join(" ")}
          >
            {medalCount}
          </span>
        </div>

        <p
          className={[
            "mt-3 min-h-[34px] text-xs font-medium leading-5",
            isActive ? "text-white/80" : "text-white/55",
          ].join(" ")}
        >
          {item.shortLabel}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {breakdown.gold > 0 ? (
            <span className="rounded-full bg-amber-300 px-2 py-1 text-[10px] font-bold text-black">
              🥇 {breakdown.gold}
            </span>
          ) : null}

          {breakdown.silver > 0 ? (
            <span className="rounded-full bg-zinc-200 px-2 py-1 text-[10px] font-bold text-black">
              🥈 {breakdown.silver}
            </span>
          ) : null}

          {breakdown.bronze > 0 ? (
            <span className="rounded-full bg-orange-700 px-2 py-1 text-[10px] font-bold text-white">
              🥉 {breakdown.bronze}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}