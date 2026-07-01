const careerStats = [
  {
    value: "56",
    label: "International competitions",
  },
  {
    value: "35",
    label: "International medals",
  },
  {
    value: "58",
    label: "National medals",
  },
  {
    value: "21+",
    label: "Major world and Asian podiums",
  },
];

const portfolioSections = [
  {
    eyebrow: "Athlete Profile",
    title: "World-class ice climbing career",
    body: "Mohammad Reza Safdarian is a professional ice climber from Isfahan, Iran, recognized for his international achievements across UIAA Ice Climbing competitions, Asian Championships, World Cup events, and World Championship stages.",
  },
  {
    eyebrow: "Competitive Identity",
    title: "Performance under pressure",
    body: "His professional journey is built around discipline, technical precision, mental resilience, and the ability to perform in high-stakes competition environments where speed, strength, and decision-making define the result.",
  },
  {
    eyebrow: "Professional Role",
    title: "Athlete, instructor, and rescue specialist",
    body: "Beyond competition, his profile includes work as a firefighter and rescue specialist, as well as Rope Access Level Three Technician credentials, connecting elite sport performance with real-world technical expertise.",
  },
];

const timelineHighlights = [
  {
    year: "2017",
    title: "World Championship team medal",
    description:
      "A major step in establishing an international competitive profile.",
  },
  {
    year: "2018",
    title: "World Cup gold and Asian Championship success",
    description:
      "A breakthrough season with global-level recognition and podium results.",
  },
  {
    year: "2022",
    title: "World Championship gold",
    description:
      "A defining achievement that strengthened his position among elite ice climbers.",
  },
  {
    year: "2024",
    title: "World Champion and overall ranking results",
    description:
      "Continued presence across World Championship, World Cup, and ranking categories.",
  },
  {
    year: "2025",
    title: "Active international competition year",
    description:
      "Ongoing results across World Cup and Asian Championship events.",
  },
];

const expertise = [
  "Ice climbing competition",
  "Speed and lead disciplines",
  "Rope access operations",
  "Rescue and technical safety",
  "Athlete coaching and mentorship",
  "International event experience",
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-6 shadow-2xl shadow-black/40 sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative z-10 max-w-5xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-7 w-1 rounded-full bg-amber-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                Professional Portfolio
              </p>
            </div>

            <h1 className="font-heading text-5xl leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
              Mohammad Reza Safdarian
            </h1>

            <div className="mt-5 space-y-2 text-lg text-white/85 sm:text-xl">
              <p>World Champion Ice Climber</p>
              <p>Firefighter & Rescue Specialist</p>
              <p>Rope Access Level Three Technician</p>
            </div>

            <p className="mt-6 max-w-4xl text-sm leading-7 text-white/70 sm:text-base">
              A professional portfolio page dedicated to the athlete’s
              competitive journey, medals, international achievements, technical
              expertise, public presence, and long-term contribution to ice
              climbing.
            </p>
          </div>
        </div>

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {careerStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-amber-300/40 bg-black p-5 shadow-lg shadow-amber-500/10"
            >
              <p className="font-heading text-4xl text-white">{stat.value}</p>
              <p className="mt-2 text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Main profile sections */}
        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {portfolioSections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/35 hover:bg-white/[0.04]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                {section.eyebrow}
              </p>
              <h2 className="mt-4 font-heading text-2xl text-white">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/65">
                {section.body}
              </p>
            </article>
          ))}
        </section>

        {/* Career overview */}
        <section className="mt-10 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-white/10 bg-black p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-amber-500" />
              <h2 className="font-heading text-3xl text-white">
                Career Overview
              </h2>
            </div>

            <p className="text-sm leading-7 text-white/65">
              The portfolio should present the athlete as more than a medal
              record. It should communicate the full professional profile:
              competition history, technical capability, coaching potential,
              rescue background, media presence, sponsor value, and leadership
              within the ice climbing community.
            </p>

            <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                Portfolio Goal
              </p>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Help visitors, sponsors, trainees, media contacts, and event
                organizers quickly understand the athlete’s credibility,
                achievements, and professional value.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-amber-500" />
              <h2 className="font-heading text-3xl text-white">
                Career Milestones
              </h2>
            </div>

            <div className="space-y-4">
              {timelineHighlights.map((item) => (
                <article
                  key={item.year}
                  className="grid gap-4 rounded-2xl border border-white/10 bg-black/60 p-4 transition-colors hover:border-amber-300/35 md:grid-cols-[120px_1fr]"
                >
                  <div>
                    <p className="font-heading text-3xl text-amber-300">
                      {item.year}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-amber-500" />
            <h2 className="font-heading text-3xl text-white">
              Professional Expertise
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/60 px-4 py-4 text-sm font-medium text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Media / future content placeholders */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-black p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Future Content
              </p>
              <h2 className="mt-3 font-heading text-3xl text-white">
                Ready for photos, videos, interviews, and press
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/60">
                This area can later connect to Sanity CMS for media galleries,
                featured competition videos, press links, downloadable athlete
                profile documents, sponsor decks, and selected interviews.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex min-h-44 items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.035]">
                <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                  Image Slot
                </p>
              </div>
              <div className="flex min-h-44 items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.035]">
                <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                  Video Slot
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}