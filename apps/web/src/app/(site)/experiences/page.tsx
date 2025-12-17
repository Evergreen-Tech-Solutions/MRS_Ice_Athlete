import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiences | Mohammadreza Safdarian",
  description:
    "Professional experience and education background of Mohammadreza Safdarian — firefighter, rope access technician, and national ice climbing team member.",
};

const EXPERIENCES = [
  {
    date: "Mar 2017 — Jan 2024",
    org: "Isfahan Firefighting And Safety Services Organization (IFSO)",
    location: "Isfahan, Iran",
    role: "Chief of Rescue at height and mountain team",
    description:
      "Mohammad Reza Safdarian is employed as a firefighter in the Isfahan Fire Department, and after a short period, he is appointed as the commander of the rescue team in high altitude and mountainous areas. He is repeatedly praised in written commendations as an outstanding firefighter, and he also takes action regarding the training of specialized personnel.",
  },
  {
    date: "Jun 2017 — Present",
    org: "Farafan amooz ilia (OT/7035) Irata",
    location: "Isfahan Province, Iran",
    role: "Rope Access Technician",
    description:
      "Training in rope access and experience participating in industrial and construction projects such as building façade cleaning and repairs, as well as experience in teaching rope access to international students.",
  },
  {
    date: "Oct 2012 — Present",
    org: "I. R. Iran Mountaineering & Sport Climbing Federation",
    location: "Iran",
    role: "Member of Ice Climbing of the National team",
    description:
      "Mohammad Reza Safdarian, with 22 international medals, is one of the most prestigious Iranian figure skaters, who has been actively participating as a key member of the national team for years, earning national and international honors.",
  },
];

const EDUCATION = [
  {
    program: "Health, Safety, Environment (HSE)",
    school: "University Of Applied Sience",
    period: "Bachelor’s degree • 2017 — 2019",
  },
  {
    program: "Health, Safety, Environment (HSE)",
    school: "Amirkabir University of Technology",
    period: "Master’s degree • 2021 — 2023",
  },
  {
    program: "Electrotechnics",
    school: "Esfahan Technical and Vocational College (Mohajer)",
    period: "Associate’s degree • 2011 — 2014",
  },
];

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-2">
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-widest text-amber-400/90 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex items-center gap-3">
        <div className="h-6 w-1 rounded-full bg-amber-500" />
        <h2 className="font-heading text-white text-2xl md:text-3xl tracking-tight">
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p className="max-w-2xl text-sm md:text-base text-white/70 leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default function ExperiencesPage() {
  return (
    <main className="relative">
      {/* Background: subtle, aligned with your site */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Page container */}
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Hero */}
        <header className="mb-10 md:mb-14">
          <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">
            Profile
          </p>
          <h1 className="mt-3 text-balance font-heading text-3xl md:text-5xl tracking-tight text-white">
            Experiences & Education
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm md:text-base text-white/75 leading-relaxed">
            A consolidated view of operational leadership, rope access expertise,
            and national-level ice climbing experience—supported by formal safety
            and engineering education.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/15">
              Rescue & High-Altitude Operations
            </span>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/15">
              Rope Access (Industrial)
            </span>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/15">
              National Team Ice Climbing
            </span>
          </div>
        </header>

        {/* Experience */}
        <section className="mb-12 md:mb-16">
          <SectionTitle
            eyebrow="Career"
            title="Experience"
            subtitle="A timeline of roles that demonstrate leadership under pressure, technical skill, and elite athletic consistency."
          />

          <div className="mt-8 grid gap-4">
            {EXPERIENCES.map((exp) => (
              <article
                key={`${exp.date}-${exp.role}`}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6"
              >
                {/* left accent */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-500/80 via-amber-500/30 to-transparent" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
                  {/* Meta */}
                  <div className="md:col-span-4 text-white/75">
                    <p className="font-heading text-sm">{exp.date}</p>
                    <p className="mt-1 font-heading text-white/90">
                      {exp.org}
                    </p>
                    <p className="text-sm text-white/65">{exp.location}</p>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-amber-200 ring-1 ring-white/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      Professional Role
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-8">
                    <h3 className="font-heading text-lg md:text-xl tracking-tight text-white">
                      {exp.role}
                    </h3>
                    <div className="mt-2 h-0.5 w-10 rounded-full bg-amber-500" />
                    <p className="mt-3 text-white/80 leading-7">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionTitle
            eyebrow="Academic"
            title="Education"
            subtitle="Formal training underpinning safety leadership, operational readiness, and technical competence."
          />

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {EDUCATION.map((ed) => (
              <article
                key={`${ed.program}-${ed.school}`}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6"
              >
                <h3 className="font-heading text-base sm:text-lg md:text-xl tracking-tight text-white">
                  {ed.program}
                </h3>
                <div className="mt-2 h-0.5 w-10 rounded-full bg-amber-500" />
                <p className="mt-3 text-white/85 leading-7">{ed.school}</p>
                <span className="mt-2 inline-block text-xs sm:text-sm text-white/65">
                  {ed.period}
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
