// apps/web/src/app/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMedal, FaPersonRunning, FaTrophy } from "react-icons/fa6";
// import WorldCupCountdownBanner from "@/components/WorldCupCountdownBanner";
// import { WORLDCUP_EVENT } from "@/lib/worldcup";

export function GlassSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden rounded-lg bg-black/10 backdrop-blur ${className}`}
    >
      {/* We’ll wrap children with a padded div inside the section */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8">{children}</div>
    </section>
  );
}

/** Count up number once when `start` flips true */
function CountUpNumber({
  to,
  duration = 2000, // ms
  className = "",
  start = false,
}: {
  to: number;
  duration?: number;
  className?: string;
  start?: boolean;
}) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      setVal(Math.round(to * ease(p)));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [start, to, duration]);

  return (
    <span className={className}>{new Intl.NumberFormat().format(val)}</span>
  );
}

/** Hook: in-view once */
function useInViewOnce<T extends HTMLElement>(rootMargin = "0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}

/** Stat card */
function StatCard({
  icon,
  label,
  value,
  start,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  start: boolean;
}) {
  return (
    <div
      className="rounded-2xl border border-amber-300 px-5 py-6 md:px-6 md:py-8
                    shadow-lg shadow-amber-200 transition"
    >
      <div className="flex items-center gap-4">
        <div
          className="grid h-14 w-14 place-items-center rounded-xl 
                        bg-gradient-to-br from-amber-400/70 to-amber-600/30 
                        border border-amber-300/30 text-amber-200"
        >
          <span className="text-3xl">{icon}</span>
        </div>
        <div>
          <CountUpNumber
            to={value}
            start={start}
            className="block font-heading text-3xl md:text-4xl leading-none text-white"
          />
          <p className="mt-1 text-sm md:text-base text-white/80">{label}</p>
        </div>
      </div>
    </div>
  );
}

/** Section wrapper that uses your GlassSection */
export function StatsSection() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("0px");

  return (
    <div ref={ref}>
      <GlassSection id="stats" className="space-y-4 mt-4 sm:mt-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-6 w-1 rounded-full bg-amber-500" />
          <h2 className="font-heading text-white text-2xl md:text-3xl tracking-tight">
            Achievements
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <StatCard
            icon={<FaPersonRunning aria-hidden className="shrink-0" />}
            label="International competitions"
            value={52}
            start={inView}
          />
          <StatCard
            icon={<FaMedal aria-hidden className="shrink-0" />}
            label="International medals"
            value={31}
            start={inView}
          />
          <StatCard
            icon={<FaTrophy aria-hidden className="shrink-0" />}
            label="National medals"
            value={58}
            start={inView}
          />
        </div>
      </GlassSection>
    </div>
  );
}

export default function HomePage() {
  const sideFadeMask = {
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
    maskImage:
      "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
  };

  return (
    <main className="relative w-full h-full">
      <div className="fixed inset-0 -z-10 bg-stone-950" />
      {/* Page content */}
      <div className="mx-auto w-full px-3 sm:px-4 lg:px-2 py-2 lg:py-2 space-y-5 lg:space-y-4">
        {/* ===== Section 1: Hero / Intro ===== */}
        <GlassSection id="intro" className="relative space-y-6">
          {/* Mobile-only portrait (also forces on touch devices) */}
          <div className="flex justify-center mb-6 lg:hidden [@media(hover:none)]:flex">
            <div className="relative w-[100%] max-w-[360px] aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="/images/athlete.png"
                alt="Mohammad Reza Safdarian"
                fill
                priority
                style={sideFadeMask}
                sizes="(max-width: 1024px) 85vw, 360px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>

          {/* Desktop image (only for real desktops; hidden on touch even if wide) */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block lg:w-1/2 xl:w-1/3 [@media(hover:none)]:hidden">
            <Image
              src="/images/athlete.png"
              alt=""
              fill
              priority
              className="object-cover"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to left, black 75%, transparent 100%)",
                maskImage:
                  "linear-gradient(to left, black 75%, transparent 100%)",
              }}
              sizes="(min-width: 1280px) 33vw, 50vw"
            />
          </div>

          <div className="space-y-3">
            <h1 className="font-heading text-3xl text-white-100 sm:text-4xl md:text-5xl tracking-tight leading-tight [text-wrap:balance]">
              REZA SAFDARIAN
            </h1>

            <div className="h-1 w-16 rounded-full bg-amber-500 mb-5" />

            <ul className="font-heading text-base sm:text-lg md:text-xl text-white-100 space-y-1.5">
              <li>World Champion Ice Climber</li>
              <li>Firefighter &amp; Rescue Specialist</li>
              <li>Rope Access Level Three Technician (IRATA)</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2 mt-5">
              <p className="mt-3 text-white/85 leading-7">
                I&apos;m Mohammad Reza, a professional ice climber from Isfahan,
                Iran. I began rock climbing at the age of 12 and transitioned to
                competitive ice climbing by 18. In 2018, I became the first
                Iranian athlete to win a gold medal at the UIAA Ice Climbing
                World Cup in Italy, an achievement recognized by the UIAA as a
                historic milestone, alongside two bronze medals earned in
                Switzerland and at the World Championships in Russia. In 2022, I
                secured another gold medal at the UIAA Ice Climbing World
                Championship, bringing my total to 21 international medals
                across world and Asian competitions. I&apos;m proud to represent
                Iran on the global stage and to serve on the UIAA Athletes&apos;
                Commission, contributing to the growth and future of the sport.
              </p>
            </div>
          </div>
        </GlassSection>

        {/* ===== Section 3: UIAA World Cup Reminder ===== */}

        {/* <WorldCupCountdownBanner
          startISO={WORLDCUP_EVENT.startISO}
          endISO={WORLDCUP_EVENT.endISO}
          uiaaHref="https://www.theuiaa.org/"
          hubHref="/worldcup"
        /> */}

        {/* ===== Achievements Section ===== */}
        <StatsSection />

        {/* ===== Section 4: TEDx Talk ===== */}
        <GlassSection id="tedx" className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-1 rounded-full bg-amber-500" />
            <h2 className="font-heading text-white text-2xl md:text-3xl tracking-tight">
              TEDx Talk
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-start">
            {/* Video */}
            <div className="rounded-2xl overflow-hidden border border-stone/10 bg-black/30 min-h-0">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/3kEfysvyhHQ?start=2&rel=0&modestbranding=1&playsinline=1"
                  title="TEDx Talk — Mohammadreza Safdarian"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Copy */}
            <div className="space-y-3 text-sm sm:text-base md:text-lg">
              <h3 className="font-heading text-white text-xl md:text-2xl tracking-tight">
                An ice climber from the heart of desert | Mohammad Reza
                Safdarian Korouyeh | TEDx Esfahan
              </h3>
              <div className="h-0.5 w-10 bg-amber-500 rounded-full" />
              <p className="text-white/85 leading-7">
                In this TEDx talk, Mohammadreza shares the mindset, discipline,
                and resilience behind his journey from a young climber in
                Isfahan to a world champion in ice climbing. It’s a story about
                focus under pressure, learning from failure, and using fear as a
                tool for performance.
              </p>

              <div className="pt-2">
                <Link
                  href="https://www.youtube.com/watch?v=3kEfysvyhHQ&t=2s"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-500/40 px-4 py-2 font-heading text-sm hover:bg-amber-500/70 transition"
                >
                  Watch on YouTube
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </GlassSection>
      </div>
    </main>
  );
}
