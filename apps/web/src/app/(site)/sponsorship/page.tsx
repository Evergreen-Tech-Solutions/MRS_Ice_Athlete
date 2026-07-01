import Image from "next/image";

const sponsorTiers = [
  {
    title: "Principal Sponsors",
    description:
      "Long-term partners who supported the athlete across major international competitions, training cycles, and professional development.",
    sponsors: [
      {
        name: "Sponsor Name",
        role: "Main Partner",
        period: "Year — Year",
        logo: null,
      },
      {
        name: "Sponsor Name",
        role: "Performance Partner",
        period: "Year — Year",
        logo: null,
      },
    ],
  },
  {
    title: "Equipment & Technical Partners",
    description:
      "Brands and organizations connected to equipment, apparel, technical tools, climbing gear, and sport-specific resources.",
    sponsors: [
      {
        name: "Sponsor Name",
        role: "Equipment Partner",
        period: "Year — Year",
        logo: null,
      },
      {
        name: "Sponsor Name",
        role: "Technical Partner",
        period: "Year — Year",
        logo: null,
      },
      {
        name: "Sponsor Name",
        role: "Apparel Partner",
        period: "Year — Year",
        logo: null,
      },
    ],
  },
  {
    title: "Event, Media & Community Supporters",
    description:
      "Supporters involved in competitions, media appearances, speaking engagements, community programs, and athlete visibility.",
    sponsors: [
      {
        name: "Sponsor Name",
        role: "Event Supporter",
        period: "Year — Year",
        logo: null,
      },
      {
        name: "Sponsor Name",
        role: "Media Partner",
        period: "Year — Year",
        logo: null,
      },
      {
        name: "Sponsor Name",
        role: "Community Partner",
        period: "Year — Year",
        logo: null,
      },
    ],
  },
];

const partnershipHighlights = [
  "International competition visibility",
  "Athlete portfolio and media exposure",
  "Training, workshops, and community engagement",
  "Professional brand alignment with elite ice climbing",
];

export default function SponsorshipPage() {
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

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-7 w-1 rounded-full bg-amber-500" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                  Sponsorship
                </p>
              </div>

              <h1 className="font-heading text-5xl leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
                Partners Behind The Journey
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
                A dedicated sponsorship archive for the athlete’s professional
                career, prepared to showcase every brand, organization, and
                supporter who contributed to competitions, training, equipment,
                media, and long-term performance development.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-300/20 bg-black/45 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Ready For Content
              </p>
              <p className="mt-3 text-3xl font-heading text-white">
                Sponsor logos, years, roles, and stories
              </p>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Once the athlete provides the sponsor information and logo
                assets, each placeholder card can be replaced with real partner
                data.
              </p>
            </div>
          </div>
        </div>

        {/* Partnership highlights */}
        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {partnershipHighlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-amber-300/30 bg-black p-5 shadow-lg shadow-amber-500/10"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                ✦
              </div>
              <p className="text-sm font-medium leading-6 text-white/80">
                {item}
              </p>
            </div>
          ))}
        </section>

        {/* Sponsor tiers */}
        <section className="mt-10 space-y-8">
          {sponsorTiers.map((tier) => (
            <div
              key={tier.title}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"
            >
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-5 w-1 rounded-full bg-amber-500" />
                    <h2 className="font-heading text-2xl text-white">
                      {tier.title}
                    </h2>
                  </div>
                  <p className="max-w-3xl text-sm leading-6 text-white/60">
                    {tier.description}
                  </p>
                </div>

                <span className="w-fit rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
                  Placeholder
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {tier.sponsors.map((sponsor, index) => (
                  <article
                    key={`${tier.title}-${index}`}
                    className="group rounded-3xl border border-white/10 bg-black/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-black"
                  >
                    <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.035] p-6">
                      {sponsor.logo ? (
                        <Image
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          width={180}
                          height={90}
                          className="h-auto max-h-20 w-auto object-contain"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-2xl text-amber-300">
                            +
                          </div>
                          <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                            Logo Slot
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-5">
                      <h3 className="font-heading text-xl text-white">
                        {sponsor.name}
                      </h3>
                      <p className="mt-2 text-sm text-amber-300">
                        {sponsor.role}
                      </p>
                      <p className="mt-1 text-sm text-white/50">
                        {sponsor.period}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Future sponsorship CTA */}
        <section className="mt-10 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
                Partnership Opportunities
              </p>
              <h2 className="mt-3 font-heading text-3xl text-white">
                Built for future sponsor visibility
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
                This page is structured so future sponsors can be displayed with
                logo, category, support period, contribution type, and campaign
                notes without redesigning the page later.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/45 px-5 py-4 text-right">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                Status
              </p>
              <p className="font-heading text-2xl text-amber-300">
                Content Ready
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}