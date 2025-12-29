"use client";

import Link from "next/link";
import Countdown from "@/components/Countdown";


type Props = {
  title?: string;
  subtitle?: string;
  startISO: string;
  endISO: string;
  uiaaHref: string;
  hubHref?: string;
};

export default function WorldCupCountdownBanner({
  title = "UIAA Ice Climbing World Cup",
  subtitle = "Watch the livestream, follow results, and stay updated in real time.",
  startISO,
  endISO,
  uiaaHref,
  hubHref = "/worldcup",
}: Props) {
  return (
    <section className="relative">
      {/* subtle ambient glow */}
      <div className="pointer-events-none absolute -inset-6 -z-10 blur-2xl opacity-70">
        <div className="absolute left-1/4 top-2 h-56 w-56 rounded-full bg-cyan-300/20" />
        <div className="absolute right-1/3 bottom-0 h-56 w-56 rounded-full bg-amber-400/20" />
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {/* Background video */}
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          src="/video/bg_countdown.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Dark + frost overlays for readability */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-black/55" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />

        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="p-6 md:p-8">
          {/* header */}
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.55)]" />
                World Cup Countdown
              </div>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                {title}
              </h2>

              <p className="mt-2 max-w-2xl text-sm text-white/70">{subtitle}</p>
            </div>

            {/* CTAs */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row md:mt-0">
              <a
                href={uiaaHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-bold text-white/90 transition hover:bg-white/15"
              >
                UIAA Livestream & Results
                <span className="text-white/70">↗</span>
              </a>

              <Link
                href={hubHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400/90 via-orange-400/90 to-amber-300/90 px-5 py-3 text-sm font-extrabold text-black transition hover:scale-[1.02] active:scale-[0.99]"
              >
                Open World Cup Hub
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* big countdown */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-black/30 p-5 md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-xs font-semibold uppercase tracking-[0.20em] text-white/60">
                Event starts in
              </div>

              {/* 
                IMPORTANT:
                This uses your existing Countdown component.
                If your Countdown prop name differs, adjust the line below.
              */}
              <div className="w-full md:w-auto">
                <div
                  className="
                    relative inline-block rounded-2xl border border-white/10 bg-white/5 px-5 py-4
                    shadow-[0_0_0_1px_rgba(255,255,255,0.06)]
                  "
                >
                  {/* icy text styling wrapper */}
                  <div
                    className="
                      text-center text-3xl font-extrabold tracking-tight md:text-5xl
                      text-transparent bg-clip-text
                      bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(165,243,252,0.95)_45%,rgba(59,130,246,0.55)_100%)]
                      drop-shadow-[0_10px_22px_rgba(56,189,248,0.18)]
                    "
                  >
                    <Countdown
                      startISO={startISO}
                      endISO={endISO}
                      variant="digits"
                    />
                  </div>

                  {/* frost highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),transparent_55%)]" />
                </div>
              </div>
            </div>

            {/* supporting info */}
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-bold text-white/90">Watch Live</p>
                <p className="mt-1 text-xs text-white/65">
                  Tap the UIAA link for the official livestream when it goes
                  live.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-bold text-white/90">Results</p>
                <p className="mt-1 text-xs text-white/65">
                  Follow heat-by-heat standings and final rankings on the UIAA
                  page.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-bold text-white/90">Highlights</p>
                <p className="mt-1 text-xs text-white/65">
                  Recaps and key moments will be centralized in your World Cup
                  hub.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-white/50">
            Pro tip: keep UIAA as the source of truth for livestream + results,
            and use your hub to curate highlights.
          </p>
        </div>
        {/* Video credit */}
        <div className="m-6  pt-3 text-[10px] text-white/50">
          Video by{" "}
          <a
            href="https://www.pexels.com/video/snowy-mountainscape-in-patagonia-argentina-29692665/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-white/80"
          >
            Video by Florian Delée
          </a>{" "}
          via Pexels
        </div>
      </div>
    </section>
  );
}
