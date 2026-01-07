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
  location: "South Korea",
  venue: "Cheongsong",
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

const PROGRAM = [
  {
    dateEn: "Jan 9 (Fri)",
    dateFa: "۹ ژانویه (جمعه)",
    items: [
      {
        time: "12:30 – 15:00",
        titleEn: "Athlete Registration",
        titleFa: "ثبت‌نام ورزشکاران",
        remarksEn: "Juwangsan Tourist Hotel",
        remarksFa: "هتل توریستی جووانگسان",
      },
      {
        time: "17:00 – 17:30",
        titleEn: "Technical Meeting",
        titleFa: "جلسه فنی",
        remarksEn: "Juwangsan Tourist Hotel",
        remarksFa: "هتل توریستی جووانگسان",
      },
    ],
  },
  {
    dateEn: "Jan 10 (Sat)",
    dateFa: "۱۰ ژانویه (شنبه)",
    items: [
      {
        time: "07:30 – 08:20",
        titleEn: "Warm-up Area Open",
        titleFa: "باز شدن محل گرم‌کردن",
        remarksEn: "Competition Venue",
        remarksFa: "محل مسابقه",
      },
      {
        time: "08:30 – 13:00",
        titleEn: "Lead Qualification",
        titleFa: "مرحله مقدماتی لید",
        remarksEn: "Competition Venue",
        remarksFa: "محل مسابقه",
      },
      {
        time: "14:00 – 14:30",
        titleEn: "Opening Ceremony",
        titleFa: "مراسم افتتاحیه",
        remarksEn: "Competition Venue",
        remarksFa: "محل مسابقه",
      },
      {
        time: "15:00 – 16:00",
        titleEn: "Speed Practice",
        titleFa: "تمرین سرعت",
        remarksEn: "Competition Venue",
        remarksFa: "محل مسابقه",
      },
      {
        time: "16:00 – 17:30",
        titleEn: "Speed Qualification",
        titleFa: "مرحله مقدماتی سرعت",
        remarksEn: "Competition Venue",
        remarksFa: "محل مسابقه",
      },
      {
        time: "17:30 – 19:00",
        titleEn: "Speed Final",
        titleFa: "فینال سرعت",
        remarksEn: "Competition Venue",
        remarksFa: "محل مسابقه",
      },
    ],
  },
  {
    dateEn: "Jan 11 (Sun)",
    dateFa: "۱۱ ژانویه (یکشنبه)",
    items: [
      {
        time: "TBD",
        titleEn: "Lead Semi-final & Final",
        titleFa: "نیمه‌نهایی و فینال لید",
        remarksEn: "Competition Venue",
        remarksFa: "محل مسابقه",
      },
    ],
  },
] as const;

const YT_WATCH_URL = "https://www.youtube.com/watch?v=SIPNeCV0fvo";

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
    calendar: "persian",
    numberingSystem: "arabext",
    month: "long",
    weekday: "long",
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

      {/* IRAN START TIMES (below banner, above livestream) */}
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-stone-100">
                Start times (Iran){" "}
                <span className="ml-2 text-stone-100/70">
                  | زمان‌بندی (ایران)
                </span>
              </h2>
              <p className="mt-2 text-base text-stone-100/75">
                Converted to{" "}
                <span className="font-semibold text-stone-100">
                  Asia/Tehran
                </span>{" "}
                <span className="mx-2 text-stone-100/40">•</span>
                <span className="font-semibold">
                  تبدیل‌شده به وقت ایران (تهران)
                </span>
              </p>
            </div>

            <div className="text-sm text-stone-100/60">
              Event timezone reference: Asia/Seoul{" "}
              <span className="mx-2 text-stone-100/40">•</span>
              مرجع زمانی رویداد: کره (سئول)
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
            {/* Header */}
            <div className="grid grid-cols-1 sm:grid-cols-4 bg-black/20 text-base font-bold text-stone-100/80">
              <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <span>Milestone</span>
                  <span className="text-stone-100/70" dir="rtl">
                    رویداد
                  </span>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <span>Iran (Tehran)</span>
                  <span className="text-stone-100/70" dir="rtl">
                    ایران (تهران)
                  </span>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <span>Korea (Seoul)</span>
                  <span className="text-stone-100/70" dir="rtl">
                    کره (سئول)
                  </span>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <span>Vancouver (Canada)</span>
                  <span className="text-stone-100/70" dir="rtl">
                    ونکوور (کانادا)
                  </span>
                </div>
              </div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-4 border-t border-white/10">
              <div className="px-4 py-4 text-lg text-stone-100">
                <div className="flex items-center justify-between">
                  <span>Event start</span>
                  <span className="text-stone-100/75" dir="rtl">
                    شروع رویداد
                  </span>
                </div>
              </div>

              <div
                className="px-4 py-4 text-lg font-semibold text-stone-100"
                dir="rtl"
              >
                {iranStart}
              </div>

              <div className="px-4 py-4 text-lg text-stone-100/85">
                {koreaStart}
              </div>

              <div className="px-4 py-4 text-lg text-stone-100/85">
                {vanStart}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-4 border-t border-white/10">
              <div className="px-4 py-4 text-lg text-stone-100">
                <div className="flex items-center justify-between">
                  <span>Event end</span>
                  <span className="text-stone-100/75" dir="rtl">
                    پایان رویداد
                  </span>
                </div>
              </div>

              <div
                className="px-4 py-4 text-lg font-semibold text-stone-100"
                dir="rtl"
              >
                {iranEnd}
              </div>

              <div className="px-4 py-4 text-lg text-stone-100/85">
                {koreaEnd}
              </div>

              <div className="px-4 py-4 text-lg text-stone-100/85">
                {vanEnd}
              </div>
            </div>

            {/* Footnote */}
            <div className="border-t border-white/10 bg-black/10 px-4 py-3 text-sm text-stone-100/65">
              Note: Vancouver time may fall on the previous day.{" "}
              <span className="mx-2 text-stone-100/40">•</span>
              توجه: زمان ونکوور ممکن است مربوط به روز قبل باشد.
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM SCHEDULE (EN + FA) — COLLAPSIBLE */}
      <section className="mx-auto max-w-6xl px-4 pt-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-4 hover:bg-black/30">
              <div className="min-w-0">
                <div className="text-lg font-extrabold text-stone-100">
                  Competition schedule{" "}
                  <span className="ml-2 text-stone-100/70">
                    | برنامه زمان‌بندی مسابقه
                  </span>
                </div>
                <div className="mt-1 text-sm text-stone-100/75">
                  Times in{" "}
                  <span className="font-semibold text-stone-100">
                    Korea (Seoul)
                  </span>{" "}
                  <span className="mx-2 text-stone-100/40">•</span>
                  <span className="font-semibold" dir="rtl">
                    زمان‌ها بر اساس وقت کره (سئول) هستند
                  </span>
                </div>
              </div>

              {/* Chevron */}
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
            </summary>

            {/* Content */}
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
              {/* Mobile-first stacked layout; becomes 4-col grid on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-4 bg-black/20 text-sm font-bold text-stone-100/80">
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <span>Date</span>
                    <span className="text-stone-100/70" dir="rtl">
                      تاریخ
                    </span>
                  </div>
                </div>
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <span>Time</span>
                    <span className="text-stone-100/70" dir="rtl">
                      ساعت
                    </span>
                  </div>
                </div>
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <span>Schedule</span>
                    <span className="text-stone-100/70" dir="rtl">
                      برنامه
                    </span>
                  </div>
                </div>
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <span>Remarks</span>
                    <span className="text-stone-100/70" dir="rtl">
                      توضیحات
                    </span>
                  </div>
                </div>
              </div>

              {PROGRAM.map((day, idx) => (
                <div
                  key={day.dateEn}
                  className={idx === 0 ? "" : "border-t border-white/10"}
                >
                  {day.items.map((it, j) => (
                    <div
                      key={`${day.dateEn}-${j}`}
                      className="grid grid-cols-1 sm:grid-cols-4 border-t border-white/10 first:border-t-0"
                    >
                      {/* Date */}
                      <div className="px-4 py-4 text-base text-stone-100">
                        {j === 0 ? (
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{day.dateEn}</span>
                            <span className="text-stone-100/75" dir="rtl">
                              {day.dateFa}
                            </span>
                          </div>
                        ) : (
                          <span className="text-stone-100/40">—</span>
                        )}
                      </div>

                      {/* Time */}
                      <div className="px-4 py-4 text-base font-semibold text-stone-100">
                        {it.time}
                      </div>

                      {/* Schedule */}
                      <div className="px-4 py-4 text-base text-stone-100">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold">{it.titleEn}</span>
                          <span className="text-stone-100/75" dir="rtl">
                            {it.titleFa}
                          </span>
                        </div>
                      </div>

                      {/* Remarks */}
                      <div className="px-4 py-4 text-base text-stone-100/85">
                        <div className="flex flex-col gap-1">
                          <span>{it.remarksEn}</span>
                          <span className="text-stone-100/70" dir="rtl">
                            {it.remarksFa}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Tiny footnote (optional) */}
              <div className="border-t border-white/10 bg-black/10 px-4 py-3 text-sm text-stone-100/65">
                Schedule times are in Seoul (KST).{" "}
                <span className="mx-2 text-stone-100/40">•</span>
                <span dir="rtl">زمان‌های برنامه بر اساس وقت سئول هستند.</span>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* QUICK ACCESS GRID */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {[
            {
              title: "Livestream",
              desc: "Official event hub (may list streams and updates).",
              href: EVENT.links.livestream,
              cta: "Open hub",
            },
            {
              title: "Live results",
              desc: "Real-time rankings, attempts, and round progression.",
              href: EVENT.links.liveResults,
              cta: "Open results",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm"
            >
              <h2 className="text-lg font-bold text-stone-100">{c.title}</h2>
              <p className="mt-2 text-sm text-stone-100/75">{c.desc}</p>
              <div className="mt-4">
                <a
                  className="inline-flex items-center gap-2 text-sm font-semibold text-stone-100 hover:underline"
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {c.cta} <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ATHLETE SUMMARY */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
          {/* Layout grid */}
          <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
            {/* Left: main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-stone-100">
                Athlete summary
              </h2>

              <p className="mt-2 text-sm text-stone-100/75">
                {EVENT.athlete.tagline}. We’ll keep this page updated with key
                links, round timing, and shareable updates so fans can stay
                locked in.
              </p>

              {/* Stat pills/cards */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { k: "Disciplines", v: EVENT.disciplines.join(" • ") },
                  { k: "Status", v: "Follow live hub" },
                  { k: "Updates", v: "Match-day refresh" },
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

              {/* Actions */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <ActionLink
                  href={EVENT.links.officialEvent}
                  label="Official event page"
                  variant="secondary"
                />
                <ActionLink
                  href={EVENT.links.resultsHub}
                  label="Full season results"
                  variant="secondary"
                />
              </div>
            </div>

            {/* Right: share card */}
            <aside className="lg:sticky lg:top-6">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-base font-bold text-stone-100">
                  Share & bring the crowd
                </h3>

                <p className="mt-2 text-sm text-stone-100/75">
                  Help grow the audience by sharing the World Cup hub directly
                  on Facebook.
                </p>

                <div className="mt-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      WORLDCUP_URL
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full rounded-xl px-4 py-3 text-center text-sm font-extrabold
                         text-white transition active:scale-[0.98]
                         bg-[#1877F2] hover:bg-[#166FE5]
                         shadow-lg shadow-blue-500/25"
                  >
                    Share on Facebook
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
