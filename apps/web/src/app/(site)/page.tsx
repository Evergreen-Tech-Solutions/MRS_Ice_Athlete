// apps/web/src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

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
      className={`bg-black/60 backdrop-blur rounded-3xl border border-white/10 p-5 md:p-8 ${className}`}
    >
      {children}
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="relative h-full">
      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/bg2.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Page content */}
      <div className="mx-auto max-w-8xl px-4 py-8 md:py-12 space-y-6 md:space-y-8">
        {/* ===== Section 1: Hero / Intro ===== */}
        <GlassSection id="intro" className="space-y-6">
          {/* Name + title */}
          <div className="space-y-3">
            {/* Name */}
            <h1 className="font-heading text-3xl md:text-5xl tracking-tight">
              {/* Replace with Sanity value later */}
              MOHAMAD REZA SAFDARIAN
            </h1>

            {/* Divider */}
            <div className="h-1 w-16 rounded-full bg-amber-500" />

            {/* Tagline */}
            <p className="font-heading text-lg md:text-2xl text-white/90">
              ROPE ACCESS IRATA LEVEL THREE INSTRUCTOR & ICE CLIMBING WORLD
              CHAMPION
            </p>

            {/* Stats line */}
            <p className="font-heading text-base md:text-lg text-amber-300">
              25 international medals
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
            <div className="flex md:justify-end">
              <div className="grid gap-3 w-full md:w-64">
                <Image src="/images/mrs2.jpeg" alt="Mohamad Reza Safdarian" width={300} height={400} className="rounded-2xl border border-white/10 bg-black/30 p-2 md:p-3"/>
              </div>
            </div>
          </div>
        </GlassSection>

        {/* ===== Section 2: Experience ===== */}
        <GlassSection id="experience" className="space-y-4">
          <div className="flex items-center gap-3">
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
                  <p className="font-heading text-sm">2019 — Present</p>
                  <p className="mt-1 font-heading">DevNest Studio</p>
                  <p className="text-sm">Vancouver, Canada</p>
                </div>
                {/* right 2/3 */}
                <div className="col-span-2">
                  <h3 className="font-heading text-lg md:text-xl tracking-tight">
                    Head Coach & Program Director
                  </h3>
                  <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
                  <p className="mt-3 text-white/85 leading-7">
                    Designed elite training cycles for speed and lead ice
                    climbing. Led coaching camps and competition prep, building
                    athlete pipelines from beginner to podium-ready.
                  </p>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-white/75">
                  <p className="font-heading text-sm">2016 — 2019</p>
                  <p className="mt-1 font-heading">Summit Works</p>
                  <p className="text-sm">Chamonix, France</p>
                </div>
                <div className="col-span-2">
                  <h3 className="font-heading text-lg md:text-xl tracking-tight">
                    IRATA L3 Instructor & Lead Rigger
                  </h3>
                  <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
                  <p className="mt-3 text-white/85 leading-7">
                    Delivered rope access courses (L1–L3) and supervised complex
                    rigging operations. Specialized in rescue systems and edge
                    management in alpine environments.
                  </p>
                </div>
              </div>
            </article>

            {/* Card 3 */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-white/75">
                  <p className="font-heading text-sm">2013 — 2016</p>
                  <p className="mt-1 font-heading">Glacier Gym</p>
                  <p className="text-sm">Innsbruck, Austria</p>
                </div>
                <div className="col-span-2">
                  <h3 className="font-heading text-lg md:text-xl tracking-tight">
                    Performance Coach
                  </h3>
                  <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
                  <p className="mt-3 text-white/85 leading-7">
                    Built foundational strength and movement programs for ice
                    and mixed climbing athletes. Introduced data-driven
                    technique drills and video analysis.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </GlassSection>

        {/* ===== Section 3: Education ===== */}
        <GlassSection id="education" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-amber-500" />
            <h2 className="font-heading text-2xl md:text-3xl tracking-tight">
              Education
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card A */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <h3 className="font-heading text-lg md:text-xl tracking-tight">
                IRATA Level 3 Certification
              </h3>
              <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
              <p className="mt-3 text-white/85 leading-7">
                Advanced rescue, rigging theory, and supervision of rope access
                teams across industrial and alpine settings.
              </p>
            </article>

            {/* Card B */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <h3 className="font-heading text-lg md:text-xl tracking-tight">
                Sport Science (Diploma)
              </h3>
              <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
              <p className="mt-3 text-white/85 leading-7">
                Physiology, periodization, and performance testing applied to
                climbing disciplines.
              </p>
            </article>

            {/* Card C */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
              <h3 className="font-heading text-lg md:text-xl tracking-tight">
                Avalanche Safety Training 2
              </h3>
              <div className="mt-2 h-0.5 w-8 bg-amber-500 rounded-full" />
              <p className="mt-3 text-white/85 leading-7">
                Terrain assessment, companion rescue, and trip planning for
                professional winter operations.
              </p>
            </article>
          </div>
        </GlassSection>
      </div>
    </main>
  );
}
