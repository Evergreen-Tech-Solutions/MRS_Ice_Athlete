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

      {/* START TIMES — COLLAPSIBLE */}
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <details className="group" open>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-4 hover:bg-black/30">
              <div className="min-w-0">
                <div className="text-lg font-extrabold text-stone-100">
                  Start times (Iran){" "}
                  <span className="ml-2 text-stone-100/70">
                    | زمان‌بندی (ایران)
                  </span>
                </div>

                <div className="mt-1 text-sm text-stone-100/75">
                  Converted to{" "}
                  <span className="font-semibold text-stone-100">
                    Asia/Tehran
                  </span>{" "}
                  <span className="mx-2 text-stone-100/40">•</span>
                  <span className="font-semibold" dir="rtl">
                    تبدیل‌شده به وقت ایران (تهران)
                  </span>
                </div>

                <div className="mt-1 text-xs text-stone-100/60">
                  Event timezone reference: Asia/Seoul{" "}
                  <span className="mx-2 text-stone-100/40">•</span>
                  <span dir="rtl">مرجع زمانی رویداد: کره (سئول)</span>
                </div>
              </div>

              <DisclosurePill />
            </summary>

            {/* Content */}
            <div className="mt-4">
              {/* MOBILE: timezone cards */}
              <div className="grid gap-3 sm:hidden">
                {[
                  {
                    titleEn: "Iran (Tehran)",
                    titleFa: "ایران (تهران)",
                    start: iranStart,
                    end: iranEnd,
                    rtl: true,
                    accent: "ring-amber-200/30",
                  },
                  {
                    titleEn: "Korea (Seoul)",
                    titleFa: "کره (سئول)",
                    start: koreaStart,
                    end: koreaEnd,
                    rtl: false,
                    accent: "ring-cyan-200/25",
                  },
                  {
                    titleEn: "Vancouver (Canada)",
                    titleFa: "ونکوور (کانادا)",
                    start: vanStart,
                    end: vanEnd,
                    rtl: false,
                    accent: "ring-white/15",
                  },
                ].map((c) => (
                  <div
                    key={c.titleEn}
                    className={[
                      "rounded-2xl border border-white/10 bg-black/20 p-4",
                      "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
                      `ring-1 ${c.accent}`,
                    ].join(" ")}
                  >
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-stone-100">
                          {c.titleEn}
                        </div>
                        <div
                          className="text-xs font-semibold text-stone-100/65"
                          dir="rtl"
                        >
                          {c.titleFa}
                        </div>
                      </div>

                      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-stone-100/70">
                        Times
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-stone-100/60">
                          <span>Event start</span>
                          <span dir="rtl">شروع رویداد</span>
                        </div>
                        <div
                          className="mt-2 text-base font-bold text-stone-100 leading-snug"
                          dir={c.rtl ? "rtl" : "ltr"}
                        >
                          {c.start}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-stone-100/60">
                          <span>Event end</span>
                          <span dir="rtl">پایان رویداد</span>
                        </div>
                        <div
                          className="mt-2 text-base font-bold text-stone-100 leading-snug"
                          dir={c.rtl ? "rtl" : "ltr"}
                        >
                          {c.end}
                        </div>
                      </div>
                    </div>

                    {c.titleEn.startsWith("Vancouver") && (
                      <div className="mt-3 text-xs text-stone-100/60">
                        Note: Vancouver time may fall on the previous day.{" "}
                        <span className="mx-2 text-stone-100/40">•</span>
                        <span dir="rtl">
                          توجه: زمان ونکوور ممکن است مربوط به روز قبل باشد.
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* DESKTOP: table */}
              <div className="hidden overflow-hidden rounded-xl border border-white/10 sm:block">
                <div className="grid grid-cols-4 bg-black/20 text-base font-bold text-stone-100/80">
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

                <div className="grid grid-cols-4 border-t border-white/10">
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

                <div className="grid grid-cols-4 border-t border-white/10">
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

                <div className="border-t border-white/10 bg-black/10 px-4 py-3 text-sm text-stone-100/65">
                  Note: Vancouver time may fall on the previous day.{" "}
                  <span className="mx-2 text-stone-100/40">•</span>
                  توجه: زمان ونکوور ممکن است مربوط به روز قبل باشد.
                </div>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* PROGRAM SCHEDULE — COLLAPSIBLE + MOBILE CARDS */}
      <section className="mx-auto max-w-6xl px-4 pt-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-4 hover:bg-black/30">
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

              <DisclosurePill />
            </summary>

            {/* Content */}
            <div className="mt-4">
              {/* MOBILE: day cards + items (no swipe) */}
              <div className="grid gap-3 sm:hidden">
                {PROGRAM.map((day) => (
                  <div
                    key={day.dateEn}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                  >
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-stone-100">
                          {day.dateEn}
                        </div>
                        <div
                          className="text-xs font-semibold text-stone-100/65"
                          dir="rtl"
                        >
                          {day.dateFa}
                        </div>
                      </div>

                      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-stone-100/70">
                        KST
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3">
                      {day.items.map((it, idx) => (
                        <div
                          key={`${day.dateEn}-${idx}`}
                          className="rounded-xl border border-white/10 bg-white/5 p-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-100/60">
                              Time
                            </div>
                            <div className="text-sm font-extrabold text-stone-100">
                              {it.time}
                            </div>
                          </div>

                          <div className="mt-3">
                            <div className="text-sm font-bold text-stone-100">
                              {it.titleEn}
                            </div>
                            <div
                              className="mt-1 text-sm text-stone-100/75"
                              dir="rtl"
                            >
                              {it.titleFa}
                            </div>
                          </div>

                          <div className="mt-3 border-t border-white/10 pt-3">
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-100/60">
                              Remarks
                            </div>
                            <div className="mt-1 text-sm text-stone-100/85">
                              {it.remarksEn}
                            </div>
                            <div
                              className="mt-1 text-sm text-stone-100/70"
                              dir="rtl"
                            >
                              {it.remarksFa}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-stone-100/65">
                  Schedule times are in Seoul (KST).{" "}
                  <span className="mx-2 text-stone-100/40">•</span>
                  <span dir="rtl">زمان‌های برنامه بر اساس وقت سئول هستند.</span>
                </div>
              </div>

              {/* DESKTOP: keep table */}
              <div className="hidden overflow-hidden rounded-xl border border-white/10 sm:block">
                <div className="grid grid-cols-4 bg-black/20 text-sm font-bold text-stone-100/80">
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
                        className="grid grid-cols-4 border-t border-white/10 first:border-t-0"
                      >
                        <div className="px-4 py-4 text-base text-stone-100">
                          {j === 0 ? (
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">
                                {day.dateEn}
                              </span>
                              <span className="text-stone-100/75" dir="rtl">
                                {day.dateFa}
                              </span>
                            </div>
                          ) : (
                            <span className="text-stone-100/40">—</span>
                          )}
                        </div>

                        <div className="px-4 py-4 text-base font-semibold text-stone-100">
                          {it.time}
                        </div>

                        <div className="px-4 py-4 text-base text-stone-100">
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold">{it.titleEn}</span>
                            <span className="text-stone-100/75" dir="rtl">
                              {it.titleFa}
                            </span>
                          </div>
                        </div>

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

                <div className="border-t border-white/10 bg-black/10 px-4 py-3 text-sm text-stone-100/65">
                  Schedule times are in Seoul (KST).{" "}
                  <span className="mx-2 text-stone-100/40">•</span>
                  <span dir="rtl">زمان‌های برنامه بر اساس وقت سئول هستند.</span>
                </div>
              </div>
            </div>
          </details>
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
                      | scoreboard
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
                      tone: "ring-amber-200/25",
                    },
                    {
                      title: "Lead",
                      subtitle: "Semifinal",
                      tone: "ring-cyan-200/20",
                    },
                    { title: "Lead", subtitle: "Final", tone: "ring-white/15" },
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
                          Pending
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-100/55">
                          Result
                        </div>
                        <div className="mt-2 text-sm font-bold text-stone-100">
                          Waiting for the result
                        </div>
                        <div className="mt-1 text-xs text-stone-100/55">
                          We’ll publish immediately after the round is posted.
                        </div>
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
