import { createClient } from "@/lib/supabaseServer";
import { ClassList } from "@/components/ClassList";

export const revalidate = 30;

type ClassRow = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  cover_url: string | null;
  skill_level: string | null;
  price_cents: number;
  currency: string;
  capacity: number;
  is_published: boolean;
  class_sessions: {
    id: string;
    start_time: string;
    end_time: string;
    location: string | null;
    is_cancelled: boolean | null;
    capacity_override: number | null;
  }[];
};

export default async function ClassesPage() {
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
      price_cents,
      currency,
      capacity,
      is_published,
      class_sessions (
        id,
        start_time,
        end_time,
        location,
        is_cancelled,
        capacity_override
      )
    `
    )
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return (
      <div className="px-4 md:px-8 py-10">
        <h1 className="text-3xl font-semibold mb-4 text-amber-300">
          Training Classes
        </h1>
        <p className="text-sm text-red-400">
          We are temporarily unable to load the classes. Please try again
          shortly.
        </p>
      </div>
    );
  }

  const classes = (data ?? []) as ClassRow[];

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-stone-950" />
      <div className="px-4 md:px-8 py-10 space-y-4">
        <div>
          <h1 className="text-3xl font-semibold text-amber-300">
            Training Classes
          </h1>
          <p className="mt-2 text-sm text-white/70 max-w-2xl">
            Explore curated ice climbing programs led by Mohammad Reza
            Safdarian. Select a class card to view full details and schedules.
          </p>
        </div>

        <ClassList classes={classes} />
      </div>
    </>
  );
}
