import { createClient } from "@/lib/supabaseServer";
import { getSessionProfile } from "@/lib/getSessionProfile";
import { createClass } from "./actions";
import DeleteClassButton from "./DeleteClassButton";
import EditClassButton from "./EditClassButton";

export const dynamic = "force-dynamic";

type ClassRow = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  cover_url: string | null;
  skill_level: string | null;
  is_published: boolean;
  price_cents: number;
  currency: string;
  capacity: number;
  created_at: string;
};

export default async function DashboardClassesPage() {
  const me = await getSessionProfile();

  if (!me || me.role !== "admin") {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-amber-300">Classes</h1>
        <p className="mt-2 text-sm text-white/70">
          You do not have permission to manage classes.
        </p>
      </div>
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("classes")
    .select(
      `
    id,
    title,
    slug,
    summary,
    description,
    cover_url,
    skill_level,
    is_published,
    price_cents,
    currency,
    capacity,
    created_at
  `
    )
    .order("created_at", { ascending: false });

  const classes = (data ?? []) as ClassRow[];

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-zinc-600 via-[#fab95b] to-amber-500" />
      <div className="p-4 md:p-6 space-y-8">
        {/* Create form */}
        <section className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur p-5">
          <h1 className="text-xl font-semibold mb-1 text-amber-300">
            Create a new class
          </h1>
          <p className="text-xs text-white/60 mb-4">
            Define the class details once. You can attach multiple sessions
            later.
          </p>

          <form action={createClass} className="grid gap-4 md:grid-cols-2">
            {/* Left column */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Title *
                </label>
                <input
                  name="title"
                  required
                  className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                  placeholder="Advanced Ice Climbing Workshop"
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Slug *
                </label>
                <input
                  name="slug"
                  required
                  className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                  placeholder="advanced-ice-workshop"
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Summary *
                </label>
                <textarea
                  name="summary"
                  required
                  rows={3}
                  className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                  placeholder="Short elevator pitch for the class."
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={5}
                  className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                  placeholder="Full details, requirements, what trainees will learn."
                />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Cover image URL
                </label>
                <input
                  name="cover_url"
                  className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                  placeholder="/images/bg-ice.png or https://..."
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-white/60 mb-1">
                    Level
                  </label>
                  <select
                    name="skill_level"
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-2 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                  >
                    <option value="">Any</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Pro">Pro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">
                    Price ( Dollars )
                  </label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    min={0}
                    placeholder="e.g. 250.30"
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-2 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/60 mb-1">
                    Currency
                  </label>
                  <input
                    name="currency"
                    defaultValue="CAD"
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-2 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Base capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  required
                  min={1}
                  className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                />
              </div>

              <div className="mt-2 flex items-center gap-2">
                <input
                  id="is_published"
                  name="is_published"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/40 bg-black/70 accent-amber-400"
                />
                <label htmlFor="is_published" className="text-xs text-white/70">
                  Publish immediately
                </label>
              </div>

              {/* Optional first session (quick create) */}
              <div className="mt-4 border-t border-white/10 pt-3 space-y-2">
                <p className="text-[10px] uppercase tracking-wide text-amber-300/80">
                  First session (optional)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-white/60 mb-1">
                      Start time
                    </label>
                    <input
                      type="datetime-local"
                      name="start_time"
                      className="w-full rounded-xl bg-black/50 border border-white/15 px-2 py-1.5 text-[10px] text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/60 mb-1">
                      End time
                    </label>
                    <input
                      type="datetime-local"
                      name="end_time"
                      className="w-full rounded-xl bg-black/50 border border-white/15 px-2 py-1.5 text-[10px] text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-white/60 mb-1">
                    Location
                  </label>
                  <input
                    name="location"
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-2 py-1.5 text-[10px] text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                    placeholder="Valley Ice Wall, BC"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-white/60 mb-1">
                    Capacity override
                  </label>
                  <input
                    type="number"
                    name="capacity_override"
                    min={0}
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-2 py-1.5 text-[10px] text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                    placeholder="Leave blank to use base capacity"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full md:w-auto rounded-2xl bg-amber-400/90 hover:bg-amber-300 text-black text-xs font-semibold px-5 py-2.5 shadow-lg shadow-amber-500/30 transition-all"
                >
                  Save class
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Classes list */}
        <section className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur p-5">
          <h2 className="text-lg font-semibold mb-3 text-amber-300">
            Existing classes
          </h2>
          {error && (
            <p className="text-sm text-red-400 mb-2">
              Could not load classes: {error.message}
            </p>
          )}
          {!classes || classes.length === 0 ? (
            <p className="text-sm text-white/60">
              No classes yet. Use the form above to create the first one.
            </p>
          ) : (
            <div className="space-y-2">
              {classes!.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/12 px-4 py-3 text-sm text-white/85 bg-black/40"
                >
                  <div>
                    <div className="font-medium">{c.title}</div>
                    <div className="text-[10px] text-white/50">
                      /class/{c.slug} •{" "}
                      {c.price_cents > 0
                        ? `${c.currency} ${(c.price_cents / 100).toFixed(2)}`
                        : "Free"}
                      • cap {c.capacity}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-0.5 rounded-full text-[9px] uppercase tracking-wide border ${
                        c.is_published
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/40"
                          : "bg-yellow-500/10 text-yellow-300 border-yellow-400/40"
                      }`}
                    >
                      {c.is_published ? "Published" : "Draft"}
                    </span>

                    <EditClassButton cls={c} />
                    <DeleteClassButton id={c.id} title={c.title} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
