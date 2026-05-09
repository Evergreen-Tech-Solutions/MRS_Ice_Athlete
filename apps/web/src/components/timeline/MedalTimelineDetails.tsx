import Image from "next/image";
import type { MedalResult, TimelineYear } from "./types";

type MedalTimelineDetailsProps = {
  item: TimelineYear;
};

function getMedalStyle(medal: MedalResult["medal"]) {
  if (medal === "Gold") {
    return "bg-amber-300 text-black border-amber-200";
  }

  if (medal === "Silver") {
    return "bg-zinc-200 text-black border-zinc-100";
  }

  return "bg-orange-700 text-white border-orange-500";
}

function getMedalEmoji(medal: MedalResult["medal"]) {
  if (medal === "Gold") return "🥇";
  if (medal === "Silver") return "🥈";
  return "🥉";
}

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

export default function MedalTimelineDetails({
  item,
}: MedalTimelineDetailsProps) {
  const medalCount = getMedalCount(item);
  const breakdown = getMedalBreakdown(item);

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/40">
      {/* Image / hero area */}
      <div className="relative h-64 w-full overflow-hidden bg-stone-950">
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.year} competition moment`}
            fill
            className="object-cover opacity-75"
            sizes="(max-width: 1280px) 100vw, 420px"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

        <div className="absolute inset-x-5 bottom-5">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-300">
            Selected Year
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <h3 className="font-heading text-6xl leading-none text-white">
                {item.year}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {medalCount} international result
                {medalCount === 1 ? "" : "s"}
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-white/10 p-3 text-right backdrop-blur sm:block">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                Podiums
              </p>
              <div className="mt-2 flex gap-2">
                <span className="rounded-full bg-amber-300 px-2 py-1 text-xs font-bold text-black">
                  🥇 {breakdown.gold}
                </span>
                <span className="rounded-full bg-zinc-200 px-2 py-1 text-xs font-bold text-black">
                  🥈 {breakdown.silver}
                </span>
                <span className="rounded-full bg-orange-700 px-2 py-1 text-xs font-bold text-white">
                  🥉 {breakdown.bronze}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="max-h-[520px] space-y-5 overflow-y-auto p-5 sm:p-6">
        {item.groups.map((group) => (
          <section key={group.category}>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-4 w-1 rounded-full bg-amber-500" />
              <h4 className="font-heading text-lg text-white">
                {group.category}
              </h4>
            </div>

            <div className="space-y-2">
              {group.results.map((result, index) => (
                <div
                  key={`${group.category}-${result.title}-${index}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 transition-colors hover:bg-white/[0.075]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-bold",
                        getMedalStyle(result.medal),
                      ].join(" ")}
                    >
                      {getMedalEmoji(result.medal)} {result.medal}
                    </span>

                    {result.discipline ? (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                        {result.discipline}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-white/85">
                    {result.title}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}