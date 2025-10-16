// apps/web/src/app/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMedal, FaPersonRunning, FaTrophy} from "react-icons/fa6";

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
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 backdrop-blur ${className}`}
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

  return <span className={className}>{new Intl.NumberFormat().format(val)}</span>;
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

/** Pretty stat card */
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
    <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-6 md:px-6 md:py-8
                    shadow-md hover:shadow-amber-500/10 transition">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-xl 
                        bg-gradient-to-br from-amber-400/30 to-amber-600/30 
                        border border-amber-300/30 text-amber-200">
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
          <h2 className="font-heading text-2xl md:text-3xl tracking-tight">Achievements</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <StatCard
            icon={<FaPersonRunning aria-hidden className="shrink-0" />}
            label="International competitions"
            value={42}
            start={inView}
          />
          <StatCard
            icon={<FaMedal aria-hidden className="shrink-0" />}
            label="International medals"
            value={25}
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
  return (
    <main className="relative w-full h-full">
      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/pic.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Page content */}
      <div className="mx-auto w-full  px-3 sm:px-4 lg:px-2 py-2 lg:py-2 space-y-5 lg:space-y-4">
        {/* ===== Section 1: Hero / Intro ===== */}
        <GlassSection id="intro" className="space-y-6">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden sm:block sm:w-1/2 md:w-1/3">
            <Image
              src="/images/mrs2.jpeg"
              alt=""
              fill
              className="object-cover"
              style={{
                // fade from solid on the right to transparent on the left
                WebkitMaskImage: "linear-gradient(to left, black 65%, transparent 100%)",
       maskImage: "linear-gradient(to left, black 65%, transparent 100%)",
                opacity: 0.9, // optional subtle blend
              }}
              priority
            />
          </div>
          <div className="space-y-3">
            {/* Name */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight [text-wrap:balance]">
              MOHAMMADREZA <br /> SAFDARIAN
            </h1>

            {/* Divider */}
            <div className="h-1 w-16 rounded-full bg-amber-500 mb-5" />

            {/* Tagline */}
            <ul className="font-heading text-base sm:text-lg md:text-xl text-white/90 space-y-1.5">
              <li>World Champion Ice Climber</li>
              <li>Firefighter & Rescue Specialist</li> 
              <li>Rope Access Level Three Technician (IRATA)</li>
            </ul>
          </div>

          {/* About me */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2 mt-5">
              <h2 className="font-heading text-xl md:text-2xl tracking-tight">
                About Me
              </h2>
              <div className="mt-2 h-0.5 w-10 bg-amber-500 rounded-full" />
              <p className="mt-3 text-white/85 leading-7">
                The history-making ice-climbing boy of the world was born in
                Isfahan in November 1992. He started his rock climbing activity
                at the age of 12 and entered the field of ice climbing
                professionally at the age of 18. Mohammad Reza Safdarian, who
                was named the world’s history-making ice-climbing boy in 2018
                according to the official website of the International Climbing
                and Mountaineering Federation (UIAA), recorded the first world
                gold medal in Iranian ice climbing history for Iran under the
                title “Ice Climbing World Cup held in Italy” in the same year,
                And also in the same year, he won the world bronze medal in the
                Ice Climbing World Cup in Switzerland and the bronze medal of
                the World Champion in Russia, and recently in 2022, he won the
                gold medal in the UIAA ice climbing world championship, and
                until this day he won 21 International world and asian medals.
                and Asian has been achieved and currently he is the most proud
                ice climber in the history of Iran and an official member of
                International Climbing and Mountaineering Federation (UIAA)
                Athletes’ Commission.
              </p>
            </div>
          </div>
        </GlassSection>

        <StatsSection />

        {/* ===== Section 2: Experience ===== */}
        <GlassSection id="experience" className="space-y-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-6 w-1 rounded-full bg-amber-500" />
            <h2 className="font-heading text-2xl md:text-3xl tracking-tight">
              Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Card 1 */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* left 1/3 */}
                <div className="col-span-1 text-white/75">
                  <p className="font-heading text-sm">Mar 2017 — Jan 2024</p>
                  <p className="mt-1 font-heading">
                    Isfahan Firefighting And Safety Services Organization (IFSO)
                  </p>
                  <p className="text-sm">Isfahan,Iran</p>
                </div>
                {/* right 2/3 */}
                <div className="col-span-2">
                  <h3 className="font-heading text-lg md:text-xl tracking-tight">
                    Chief of Rescue at height and mountain team
                  </h3>
                  <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
                  <p className="mt-3 text-white/85 leading-7">
                    Mohammad Reza Safdarian is employed as a firefighter in the
                    Isfahan Fire Department, and after a short period, he is
                    appointed as the commander of the rescue team in high
                    altitude and mountainous areas. He is repeatedly praised in
                    written commendations as an outstanding firefighter, and he
                    also takes action regarding the training of specialized
                    personnel.
                  </p>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-white/75">
                  <p className="font-heading text-sm">Jun 2017 — Present</p>
                  <p className="mt-1 font-heading">
                    Farafan amooz ilia (OT/7035) Irata
                  </p>
                  <p className="text-sm">Isfahan Province, Iran</p>
                </div>
                <div className="col-span-2">
                  <h3 className="font-heading text-lg md:text-xl tracking-tight">
                    Rope Access Technician
                  </h3>
                  <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
                  <p className="mt-3 text-white/85 leading-7">
                    Training in rope access and experience participating in
                    industrial and construction projects such as building façade
                    cleaning and repairs, as well as experience in teaching rope
                    access to international students.
                  </p>
                </div>
              </div>
            </article>

            {/* Card 3 */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-white/75">
                  <p className="font-heading text-sm">Oct 2012 — Present</p>
                  <p className="mt-1 font-heading">
                    I. R. Iran Mountaineering & Sport Climbing Federation
                  </p>
                  <p className="text-sm">Iran</p>
                </div>
                <div className="col-span-2">
                  <h3 className="font-heading text-lg md:text-xl tracking-tight">
                    Member of Ice Climbing of the National team
                  </h3>
                  <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
                  <p className="mt-3 text-white/85 leading-7">
                    Mohammad Reza Safdarian, with 22 international medals, is
                    one of the most prestigious Iranian figure skaters, who has
                    been actively participating as a key member of the national
                    team for years, earning national and international honors.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </GlassSection>

        {/* ===== Section 3: Education ===== */}
        <GlassSection id="education" className="space-y-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-6 w-1 rounded-full bg-amber-500" />
            <h2 className="font-heading text-2xl md:text-3xl tracking-tight">
              Education
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card A */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <h3 className="font-heading text-base sm:text-lg md:text-xl tracking-tight">
                Health, Safety, Environment (HSE)
              </h3>
              <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
              <p className="mt-3 text-white/85 leading-7">
                University Of Applied Sience
              </p>
              <span className="text-xs sm:text-sm text-white/75">
                bachelor's degree 2017 - 2019
              </span>
            </article>

            {/* Card B */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <h3 className="font-heading text-base sm:text-lg md:text-xl tracking-tight">
                Health, Safety, Environment (HSE)
              </h3>
              <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
              <p className="mt-3 text-white/85 leading-7">
                Amirkabir University of Technology
              </p>
              <span className="text-xs sm:text-sm text-white/75">
                Master's degree 2021 - 2023
              </span>
            </article>

            {/* Card C */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <h3 className="font-heading text-base sm:text-lg md:text-xl tracking-tight">
                Electrotechnics
              </h3>
              <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
              <p className="mt-3 text-white/85 leading-7">
                Esfahan Technical and Vocational College (Mohajer)
              </p>
              <span className="text-xs sm:text-sm text-white/75">
                Associate’s degree 2011 - 2014
              </span>
            </article>
          </div>
        </GlassSection>

        {/* ===== Section 4: TEDx Talk ===== */}
        <GlassSection id="tedx" className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-1 rounded-full bg-amber-500" />
            <h2 className="font-heading text-2xl md:text-3xl tracking-tight">
              TEDx Talk
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-start">
            {/* Video */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30 min-h-0">
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
              <h3 className="font-heading text-xl md:text-2xl tracking-tight">
                An ice climber from the heart of desert | Mohammad Reza Safdarian Korouyeh | TEDx Esfahan
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
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-500/50 bg-amber-500/10 px-4 py-2 font-heading text-sm hover:bg-amber-500/20 transition"
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
