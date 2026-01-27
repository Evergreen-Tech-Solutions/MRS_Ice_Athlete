import type React from "react";
import type { Metadata } from "next";
import Countdown from "../../../components/Countdown";
import YouTubeLive from "../../../components/YouTubeLive";
import { WORLDCUP_EVENT } from "@/lib/worldcup";

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
  roundLabel: "World Cup Round",
  location: "Switzerland",
  venue: "Saas-Fee",
  disciplines: ["Speed Format", "Duel"],

  startISO: WORLDCUP_EVENT.startISO,
  endISO: WORLDCUP_EVENT.endISO,

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
};

const YT_WATCH_URL = "https://www.youtube.com/watch?v=45T5tuRfi-Q";

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
    <a
      className={`${base} ${styles}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {label}
      <span aria-hidden>→</span>
    </a>
  );
}

function DisclosurePill() {
  return (
    <span className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-stone-100">
      <span className="group-open:hidden">Show</span>
      <span className="hidden group-open:inline">Hide</span>{" "}
      <span
        aria-hidden
        className="ml-1 inline-block transition group-open:rotate-180"
      >
        ▾
      </span>
    </span>
  );
}

// Server-safe, stable formatting (prevents hydration weirdness)
function formatInTZ(
  iso: string,
  timeZone: string,
  locale: string = "en-GB",
  opts?: Intl.DateTimeFormatOptions
) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    ...opts,
  }).format(d);
}

// Persian (fa-IR) with Persian calendar + Persian digits
function formatPersianIran(iso: string) {
  return formatInTZ(iso, "Asia/Tehran", "fa-IR", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...({
      calendar: "persian",
      numberingSystem: "arabext",
      month: "long",
      weekday: "long",
    } as any),
  });
}

export default function WorldCupPage() {
  const WORLDCUP_URL = "https://mrs-ice-athlete-web.vercel.app/worldcup";

  const iranStart = formatPersianIran(EVENT.startISO);
  const iranEnd = formatPersianIran(EVENT.endISO);

  const koreaStart = formatInTZ(EVENT.startISO, "Asia/Seoul", "en-GB");
  const koreaEnd = formatInTZ(EVENT.endISO, "Asia/Seoul", "en-GB");

  const vanStart = formatInTZ(EVENT.startISO, "America/Vancouver", "en-CA");
  const vanEnd = formatInTZ(EVENT.endISO, "America/Vancouver", "en-CA");

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
              <span className="font-semibold text-stone-100">
                {EVENT.athlete.name}
              </span>
              : livestream, live results, schedule, and real-time
              updates—optimized for match-day refreshes.
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
              <p className="mt-1 text-sm text-stone-100/75">
                Watch the event live right here.
              </p>
            </div>
            <a
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-stone-100 hover:underline"
              href={YT_WATCH_URL}
              target="_blank"
              rel="noreferrer"
            >
              Open on YouTube <span aria-hidden>→</span>
            </a>
          </div>

          <YouTubeLive watchUrl={YT_WATCH_URL} startISO={EVENT.startISO} />
        </div>
      </section>

      {/* ATHLETE SUMMARY + RESULTS STATUS */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-1 lg:items-start">
            {/* Left: Athlete + Status */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-2xl font-extrabold text-stone-100">
                    Athlete summary
                  </h2>
                  <p className="mt-2 text-sm text-stone-100/75">
                    <span className="font-semibold text-stone-100">
                      {EVENT.athlete.name}
                    </span>{" "}
                    — {EVENT.athlete.tagline}. This hub will publish results
                    quickly after each round, with UIAA as the source of truth.
                  </p>
                </div>

                <div className="hidden sm:flex shrink-0 items-center rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold text-stone-100/70">
                  Live hub
                </div>
              </div>

              {/* Quick context chips */}
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Disciplines", v: EVENT.disciplines.join(" • ") },
                  { k: "Venue", v: EVENT.venue },
                  { k: "Status", v: "Waiting for results" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="text-xs font-semibold text-stone-100/60">
                      {s.k}
                    </div>
                    <div className="mt-1 text-sm font-bold text-stone-100">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>

              {/* Results dashboard */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div className="text-base font-extrabold text-stone-100">
                    Results board
                    <span className="ml-2 text-stone-100/60 text-sm font-semibold">
                      | South Korea - Cheongsong
                    </span>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-stone-100/70">
                    Auto-update ready
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      title: "Speed",
                      subtitle: "Final",
                      tone: "ring-amber-300/60", // 🥇 Gold
                      status: "1st place",
                      result: "Gold medal — World Cup Final",
                    },
                    {
                      title: "Lead",
                      subtitle: "Semifinal",
                      tone: "ring-amber-300/60", // 🥇 Gold
                      status: "1st place",
                      result: "Qualified as leader — Semifinal win",
                    },
                    {
                      title: "Lead",
                      subtitle: "Final",
                      tone: "ring-white/15",
                      status: "8th place",
                      result: "World Cup Final",
                    },
                  ].map((r) => (
                    <div
                      key={`${r.title}-${r.subtitle}`}
                      className={[
                        "rounded-2xl border border-white/10 bg-black/20 p-4",
                        "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
                        `ring-1 ${r.tone}`,
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-extrabold text-stone-100">
                            {r.title}
                          </div>
                          <div className="text-xs font-semibold text-stone-100/60">
                            {r.subtitle}
                          </div>
                        </div>

                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-stone-100/70">
                          {r.status}
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-100/55">
                          Result
                        </div>
                        <div className="mt-2 text-sm font-bold text-stone-100">
                          {r.result}
                        </div>
                        {r.status === "Pending" && (
                          <div className="mt-1 text-xs text-stone-100/55">
                            We’ll publish immediately after the round is posted.
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Official results CTA */}
            <div className="mt-6 flex justify-center">
              <a
                href="https://uiaa.results.info/event/121/"
                target="_blank"
                rel="noreferrer"
                className="
      inline-flex items-center gap-2
      rounded-xl px-6 py-3
      text-sm font-extrabold
      bg-white text-zinc-900
      ring-1 ring-white/20
      transition hover:bg-white/90
    "
              >
                View official UIAA results
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
