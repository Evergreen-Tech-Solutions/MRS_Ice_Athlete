// apps/web/src/app/(dashboard)/dashboard/classes/page.tsx
import { createServerClientSafe } from "@/lib/supabaseServer";
import Link from "next/link";
import { redirect } from "next/navigation";

type SessionRow = { id: string; start_time: string; end_time: string; class_id: string };
type RawClass = {
  id: string;
  title: string;
  price_cents: number;
  capacity: number;
  is_published: boolean;
  created_at: string;
  sessions?: SessionRow[];
};

export default async function AdminClassesPage() {
  const supabase = await createServerClientSafe();
  const nowIso = new Date().toISOString();
  if (!supabase) redirect("/signin"); 

  const { data, error } = await supabase
    .from("classes")
    .select(`
      id, title, price_cents, capacity, is_published, created_at,
      sessions:class_sessions (
        id, start_time, end_time, class_id
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-6 text-red-400">Error: {error.message}</div>;
  }

  const classes = (data ?? []) as RawClass[];

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Classes</h1>
        <Link
          href="/dashboard/classes/new"
          className="rounded-lg px-4 py-2 bg-white/10 hover:bg-white/20"
        >
          New Class
        </Link>
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
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => {
              const sorted = [...(c.sessions ?? [])].sort(
                (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
              );
              const now = Date.now();
              const next =
                sorted.find((s) => new Date(s.start_time).getTime() >= now) ??
                sorted[0] ??
                null;

              return (
                <tr key={c.id} className="border-t border-white/10">
                  <td className="p-3">{c.title}</td>
                  <td className="p-3 text-center">${(c.price_cents / 100).toFixed(2)}</td>
                  <td className="p-3 text-center">{c.capacity}</td>
                  <td className="p-3 text-center">{c.is_published ? "Yes" : "No"}</td>
                  <td className="p-3 text-center">{c.sessions?.length ?? 0}</td>
                  <td className="p-3 text-center">
                    {next ? new Date(next.start_time).toLocaleString() : "—"}
                  </td>
                  <td className="p-3 text-right">
                    <Link className="underline" href={`/dashboard/classes/${c.id}`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
