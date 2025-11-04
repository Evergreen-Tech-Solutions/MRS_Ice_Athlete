// apps/web/src/app/(dashboard)/dashboard/bookings/page.tsx
import { createServerClientSafe } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

// DB row helpers
type SessionRow = {
  id: number;
  start_time: string | null;
  end_time: string | null;
  class_id: number | null;
  class?: { id: number; title: string | null } | { id: number; title: string | null }[] | null;
};

type RawBooking = {
  id: number;
  status: "pending" | "paid" | "refunded" | "cancelled" | string;
  seats: number;
  created_at: string;
  user_id: string;
  session_id: number;
  session?: SessionRow | SessionRow[] | null;
};

type BookingRow = Omit<RawBooking, "session"> & { session: SessionRow | null };

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BookingsPage() {
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
    .single<{
      role: "admin" | "athlete" | "user";
      full_name: string | null;
    }>();

  if (profileErr || !profile) redirect("/signin?reason=profile-missing");

  const isAdmin = profile.role === "admin" || profile.role === "athlete";
  const isUser = profile.role === "user";

  // ---- Query (admin => all, user => own) ----
  // We attempt to join session -> class_sessions -> class:classes to show titles.
  const baseSelect = `
    id, status, seats, created_at, user_id, session_id,
    session:class_sessions (
      id, start_time, end_time, class_id,
      class:classes ( id, title )
    )
  `;

  const qb = supabase
    .from("bookings")
    .select(baseSelect)
    .order("created_at", { ascending: false })
    .limit(100);

  const { data, error } = isAdmin ? await qb : await qb.eq("user_id", user.id);

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Bookings</h1>
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200">
          Error loading bookings: {error.message}
        </div>
      </div>
    );
  }

  // Normalize joins (Supabase may return arrays for joined objects)
  const bookings: BookingRow[] = ((data as RawBooking[]) ?? []).map((b) => {
    const s = b.session;
    const session: SessionRow | null = Array.isArray(s) ? (s[0] ?? null) : (s ?? null);

    // Normalize session.class as object (sometimes array)
    if (session?.class && Array.isArray(session.class)) {
      session.class = session.class[0] ?? null;
    }

    return { ...b, session };
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">
          {isAdmin ? "All Bookings" : "My Bookings"}
        </h1>
        <div className="text-sm opacity-70">
          Showing {bookings.length} {bookings.length === 1 ? "result" : "results"}
        </div>
      </div>

      <div className="overflow-x-auto border border-white/10 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left">Booking</th>
              <th className="p-3">Class / Session</th>
              <th className="p-3">Seats</th>
              <th className="p-3">Status</th>
              {isAdmin && <th className="p-3">User</th>}
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => {
              const s = b.session;
              const classTitle =
                (s?.class && !Array.isArray(s.class) ? s.class.title : null) ?? "—";
              const sessionWhen = s?.start_time
                ? new Date(s.start_time).toLocaleString()
                : "";

              return (
                <tr key={b.id} className="border-t border-white/10">
                  <td className="p-3">
                    <span className="font-mono text-xs">#{b.id}</span>
                  </td>

                  <td className="p-3 text-center">
                    <div className="font-medium">{classTitle}</div>
                    <div className="text-xs opacity-60">
                      {s?.id ? `Session #${s.id}` : `Session #${b.session_id}`}{" "}
                      {sessionWhen && <span>• {sessionWhen}</span>}
                    </div>
                  </td>

                  <td className="p-3 text-center">{b.seats}</td>

                  <td className="p-3 text-center">
                    <span className={badgeClasses(b.status)}>{b.status}</span>
                  </td>

                  {isAdmin && (
                    <td className="p-3 text-center">
                      <span className="font-mono text-xs">
                        {b.user_id ? `${b.user_id.slice(0, 8)}…` : "—"}
                      </span>
                    </td>
                  )}

                  <td className="p-3 text-center">
                    {new Date(b.created_at).toLocaleString()}
                  </td>
                </tr>
              );
            })}

            {bookings.length === 0 && (
              <tr>
                <td className="p-4 opacity-70 text-center" colSpan={isAdmin ? 6 : 5}>
                  {isAdmin ? "No bookings found." : "You have no bookings yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- UI helpers ---
function badgeClasses(status: string) {
  const base = "inline-flex px-2 py-1 rounded text-xs border";
  switch (status) {
    case "paid":
    case "confirmed":
      return `${base} border-green-500/40 bg-green-500/10`;
    case "pending":
    case "processing":
      return `${base} border-amber-500/40 bg-amber-500/10`;
    case "refunded":
    case "cancelled":
    case "canceled":
      return `${base} border-red-500/40 bg-red-500/10`;
    default:
      return `${base} border-white/15 bg-white/5`;
  }
}
