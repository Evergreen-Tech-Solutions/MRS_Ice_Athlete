import type { Metadata } from "next";
import Countdown from "../../../components/Countdown";

export const metadata: Metadata = {
  title: "UIAA Ice Climbing World Cup 2026 | Live Hub",
  description:
    "Live hub for UIAA Ice Climbing World Cup 2026: livestream, live results, schedule, and athlete updates in one place.",
  openGraph: {
    title: "UIAA Ice Climbing World Cup 2026 | Live Hub",
    description:
      "Livestream, live results, schedule, and athlete spotlight—everything in one place.",
    type: "website",
  },
};

const EVENT = {
  name: "UIAA Ice Climbing World Cup 2026",
  // Update these for the specific round your athlete is attending:
  roundLabel: "World Cup Round",
  location: "South Korea",
  venue: "Cheongsong",
  disciplines: ["Speed Format", "Duel"],

  // IMPORTANT: set accurate timezone offsets
  startISO: "2026-01-09T09:00:00+09:00",
  endISO: "2026-01-11T21:00:00+09:00",

  // External authority links (official)
  links: {
    livestream: "https://iceclimbing.sport/",
    liveResults: "https://uiaa.results.info/event/121/",
    officialEvent: "https://iceclimbing.sport/",
    resultsHub: "https://iceclimbing.sport/results/",
  },

  athlete: {
    name: "Mohammadreza Safdarian",
    tagline: "Competing on the 2026 World Cup circuit",
  },

  // If you have a programme PDF or structured schedule, replace this with real data
  schedule: [
    { day: "Day 1", items: ["Registration / Technical meeting", "Opening ceremony"] },
    { day: "Day 2", items: ["Difficulty qualifications", "Speed qualifications / finals"] },
    { day: "Day 3", items: ["Difficulty semi-finals", "Difficulty finals"] },
  ],
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 ml-2 text-md font-medium text-stone-100 ring-2 ring-amber-200/50">
      {children}
    </span>
  );
}

function ActionLink({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ring-1";
  const styles =
    variant === "primary"
      ? "bg-white text-zinc-900 ring-white/20 hover:bg-white/90"
      : "bg-transparent text-stone-100 ring-white/20 hover:bg-white/10";
  return (
    <a className={`${base} ${styles}`} href={href} target="_blank" rel="noreferrer">
      {label}
      <span aria-hidden>→</span>
    </a>
  );
}

export default function WorldCupPage() {
  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl shadow-lg shadow-amber-200">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#ff7936_0%,#ffde5c_18%,#b5ffe1_45%,#c9e7ff_70%,#0b1220_100%)] opacity-50" />
        <div className="absolute inset-0 -z-10 bg-[url('/images/homePage_bg.jpg')] bg-cover bg-center opacity-20" />

        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Pill>{EVENT.roundLabel}</Pill>
              <Pill>{EVENT.location}</Pill>
              <Countdown startISO={EVENT.startISO} endISO={EVENT.endISO} />
            </div>

            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-stone-100 sm:text-5xl">
              {EVENT.name}
            </h1>

            <p className="max-w-2xl text-pretty text-base text-stone-100/80 sm:text-lg">
              Your single source for{" "}
              <span className="font-semibold text-stone-100">{EVENT.athlete.name}</span>:
              livestream, live results, schedule, and real-time updates—optimized for match-day refreshes.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {EVENT.disciplines.map((d) => (
                <Pill key={d}>{d}</Pill>
              ))}
              <Pill>Venue: {EVENT.venue}</Pill>
            </div>
          </div>
        </div>
      </section>

      {/* YOUTUBE LIVESTREAM */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold text-stone-100">Live stream</h2>
              <p className="mt-1 text-sm text-stone-100/75">Watch the event live right here.</p>
            </div>
            <a
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-stone-100 hover:underline"
              href="https://www.youtube.com/watch?v=QWmwgCRiYXM"
              target="_blank"
              rel="noreferrer"
            >
              Open on YouTube <span aria-hidden>→</span>
            </a>
          </div>

          <div className="relative w-full overflow-hidden bg-black">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/QWmwgCRiYXM"
                title="YouTube livestream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS GRID */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {[
            {
              title: "Livestream",
              desc: "Watch the action live (or replays if available).",
              href: EVENT.links.livestream,
              cta: "Open stream",
            },
            {
              title: "Live results",
              desc: "Real-time rankings, attempts, and round progression.",
              href: EVENT.links.liveResults,
              cta: "Open results",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
              <h2 className="text-lg font-bold text-stone-100">{c.title}</h2>
              <p className="mt-2 text-sm text-stone-100/75">{c.desc}</p>
              <div className="mt-4">
                <a
                  className="inline-flex items-center gap-2 text-sm font-semibold text-stone-100 hover:underline"
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {c.cta} <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ATHLETE SPOTLIGHT */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-stone-100">Athlete summary</h2>
            <p className="mt-2 text-sm text-stone-100/75">
              {EVENT.athlete.tagline}. We’ll keep this page updated with key links, round timing, and shareable updates
              so fans can stay locked in.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Disciplines", v: EVENT.disciplines.join(" • ") },
                { k: "Status", v: "Follow live hub" },
                { k: "Updates", v: "Match-day refresh" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-semibold text-stone-100/60">{s.k}</div>
                  <div className="mt-1 text-sm font-bold text-stone-100">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <ActionLink href={EVENT.links.officialEvent} label="Official event page" variant="secondary" />
              <ActionLink href={EVENT.links.resultsHub} label="Full season results" variant="secondary" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-base font-bold text-stone-100">Share & bring the crowd</h3>
            <p className="mt-2 text-sm text-stone-100/75">
              The fastest growth lever is fan distribution. Make it easy to share the live hub.
            </p>
            <div className="mt-4 space-y-3">
              <a
                className="block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-900 hover:bg-white/90"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Live hub: ${EVENT.name} — watch + live results in one place`
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Share on Instagram
              </a>
              <a
                className="block rounded-xl bg-transparent px-4 py-3 text-center text-sm font-semibold text-stone-100 ring-1 ring-white/20 hover:bg-white/10"
                href="#schedule"
              >
                Share on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
