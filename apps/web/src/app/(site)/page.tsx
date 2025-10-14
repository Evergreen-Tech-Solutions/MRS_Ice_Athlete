// apps/web/src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMedal } from "react-icons/fa6";

function GlassSection({
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
      <div className="relative z-10 p-5 md:p-8">{children}</div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="relative h-full">
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-[#364e68] to-[#98ccd3]" />
      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/bg_mountain.png"
          alt=""
          fill
          priority
          className=""
        />
      </div>

      {/* Page content */}
      <div className="mx-auto max-w-8xl px-4 py-8 md:py-12 space-y-6 md:space-y-8">
        {/* ===== Section 1: Hero / Intro ===== */}
        <GlassSection id="intro" className="space-y-6">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3">
            <Image
              src="/images/mrs2.jpeg"
              alt=""
              fill
              className="object-cover"
              style={{
                // fade from solid on the right to transparent on the left
                WebkitMaskImage:
                  "linear-gradient(to left, black 75%, transparent 100%)",
                maskImage:
                  "linear-gradient(to left, black 75%, transparent 100%)",
                opacity: 0.9, // optional subtle blend
              }}
              priority
            />
          </div>
          <div className="space-y-3">
            {/* Name */}
            <h1 className="font-heading text-3xl md:text-5xl tracking-tight">
              MOHAMMADREZA <br /> SAFDARIAN
            </h1>

            {/* Divider */}
            <div className="h-1 w-16 rounded-full bg-amber-500 mb-5" />

            {/* Tagline */}
            <ul className="font-heading text-lg md:text-xl text-white/90">
              <li>World Champion Ice Climber</li>
              <li>Firefighter & Rescue Specialist</li> 
              <li>Rope Access level three Technician (IRATA)</li>
            </ul>

            {/* Stats line */}

            <p className="font-heading text-base md:text-lg text-amber-300 mb-5">
              <FaMedal className="inline text-amber-200 mr-1 text-2xl" /> 25
              international medals
            </p>
          </div>

          {/* About me */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2">
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

            {/* Quick links / CTAs */}
            {/* <div className="flex md:justify-end">
              <div className="grid gap-3 w-full md:w-64">
                <Image
                  src="/images/mrs2.jpeg"
                  alt="Mohamad Reza Safdarian"
                  width={300}
                  height={400}
                  className="rounded-2xl border border-white/10 bg-black/30 p-2 md:p-3"
                />
              </div>
            </div> */}
          </div>
        </GlassSection>

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
              <div className="grid grid-cols-3 gap-4">
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
              <h3 className="font-heading text-lg md:text-xl tracking-tight">
                Health, Safety, Environment (HSE)
              </h3>
              <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
              <p className="mt-3 text-white/85 leading-7">
                University Of Applied Sience
              </p>
              <span className="text-sm text-white/75">
                bachelor's degree 2017 - 2019
              </span>
            </article>

            {/* Card B */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <h3 className="font-heading text-lg md:text-xl tracking-tight">
                Health, Safety, Environment (HSE)
              </h3>
              <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
              <p className="mt-3 text-white/85 leading-7">
                Amirkabir University of Technology
              </p>
              <span className="text-sm text-white/75">
                Master's degree 2021 - 2023
              </span>
            </article>

            {/* Card C */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <h3 className="font-heading text-lg md:text-xl tracking-tight">
                Electrotechnics
              </h3>
              <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
              <p className="mt-3 text-white/85 leading-7">
                Esfahan Technical and Vocational College (Mohajer)
              </p>
              <span className="text-sm text-white/75">
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
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30">
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
            <div className="space-y-3">
              <h3 className="font-heading text-xl md:text-2xl tracking-tight">
                An ice climber from the heart of desert | Mohammad Reza Safdarian Korouyeh | TEDxEsfahan
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
