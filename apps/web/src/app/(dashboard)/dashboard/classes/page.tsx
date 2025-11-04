// apps/web/src/app/(dashboard)/dashboard/classes/page.tsx
import { createServerClientSafe } from "@/lib/supabaseServer";
import Link from "next/link";
import { redirect } from "next/navigation";

type SessionRow = {
  id: string;
  start_time: string | null;
  end_time: string | null;
  class_id: string;
};

type RawClass = {
  id: string;
  title: string;
  price_cents: number;
  capacity: number;
  is_published: boolean;
  created_at: string;
  sessions?: SessionRow[] | SessionRow | null;
};

type ClassRow = Omit<RawClass, "sessions"> & { sessions: SessionRow[] };

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ClassesPage() {
  const supabase = await createServerClientSafe();
  if (!supabase) redirect("/signin");

  // ---- Auth & Role ----
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) redirect("/signin");

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("user_id", user.id)
    .single<{ role: "admin" | "athlete" | "user"; full_name: string | null }>();

  if (profileErr || !profile) redirect("/signin?reason=profile-missing");

  const isAdmin = profile.role === "admin" || profile.role === "athlete";
  const isUser = profile.role === "user";

  // ---- Query ----
  const baseSelect = `
    id, title, price_cents, capacity, is_published, created_at,
    sessions:class_sessions ( id, start_time, end_time, class_id )
  `;

  const qb = supabase
    .from("classes")
    .select(baseSelect)
    .order("created_at", { ascending: false });

  const { data, error } = isAdmin ? await qb : await qb.eq("is_published", true);

  if (error) {
    return <div className="p-6 text-red-400">Error: {error.message}</div>;
  }

  // Normalize sessions to array
  const classes: ClassRow[] = ((data ?? []) as RawClass[]).map((c) => {
    let sessionsArr: SessionRow[] = [];
    if (Array.isArray(c.sessions)) sessionsArr = c.sessions.filter(Boolean) as SessionRow[];
    else if (c.sessions && typeof c.sessions === "object") sessionsArr = [c.sessions as SessionRow];
    return { ...c, sessions: sessionsArr };
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{isAdmin ? "Classes" : "Available Classes"}</h1>

        <div className="flex items-center gap-2">
          {isUser && (
            <Link
              href="/classes"
              className="rounded-lg px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-sm"
              title="Go to the public classes page to view details & book"
            >
              Browse & Book
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/dashboard/classes/new"
              className="rounded-lg px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10"
            >
              New Class
            </Link>
          )}
        </div>
      </div>

      <div className="overflow-x-auto border border-white/10 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Capacity</th>
              <th className="p-3">Published</th>
              <th className="p-3">Sessions</th>
              <th className="p-3">Next session</th>
              {isAdmin && <th className="p-3"></th>}
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => {
              const sorted = [...(c.sessions ?? [])].sort((a, b) => {
                const at = a.start_time ? new Date(a.start_time).getTime() : 0;
                const bt = b.start_time ? new Date(b.start_time).getTime() : 0;
                return at - bt;
              });

              const now = Date.now();
              const next =
                sorted.find((s) => (s.start_time ? new Date(s.start_time).getTime() >= now : false)) ??
                sorted[0] ??
                null;

              return (
                <tr key={c.id} className="border-t border-white/10">
                  <td className="p-3">{c.title}</td>
                  <td className="p-3 text-center">
                    {c.price_cents != null ? `$${(c.price_cents / 100).toFixed(2)}` : "—"}
                  </td>
                  <td className="p-3 text-center">{c.capacity ?? "—"}</td>
                  <td className="p-3 text-center">
                    <span
                      className={[
                        "inline-flex px-2 py-1 rounded text-xs border",
                        c.is_published
                          ? "border-green-500/40 bg-green-500/10"
                          : "border-white/15 bg-white/5",
                      ].join(" ")}
                    >
                      {c.is_published ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="p-3 text-center">{c.sessions?.length ?? 0}</td>
                  <td className="p-3 text-center">
                    {next?.start_time ? new Date(next.start_time).toLocaleString() : "—"}
                  </td>
                  {isAdmin && (
                    <td className="p-3 text-right">
                      <Link className="underline" href={`/dashboard/classes/${c.id}`}>
                        Edit
                      </Link>
                    </td>
                  )}
                </tr>
              );
            })}

            {classes.length === 0 && (
              <tr>
                <td className="p-4 opacity-70 text-center" colSpan={isAdmin ? 7 : 6}>
                  {isAdmin ? "No classes found." : "No published classes are available right now."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
