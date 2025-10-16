// apps/web/src/app/(dashboard)/dashboard/bookings/page.tsx
import { requireAdmin } from "@/lib/requireAdmin";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

type SessionRow = {
  id: number;
  start_time: string;
  end_time: string;
  class_id: number;
};

type RawBooking = {
  id: number;
  status: "pending" | "paid" | "refunded" | "cancelled";
  seats: number;
  created_at: string;
  user_id: string;
  session_id: number;
  // Supabase may return this join as an object OR an array depending on FK inference
  session?: SessionRow | SessionRow[] | null;
};

type BookingRow = Omit<RawBooking, "session"> & { session: SessionRow | null };

export default async function AdminBookingsPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  // Use the explicit FK name if you know it; we'll also handle array/object just in case.
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id, status, seats, created_at, user_id, session_id,
      session:sessions!bookings_session_id_fkey (
        id, start_time, end_time, class_id
      )
    `
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return <div className="p-6 text-red-400">Error: {error.message}</div>;

  const bookings: BookingRow[] = (data as RawBooking[] ?? []).map((b) => {
    const s = b.session;
    const session: SessionRow | null = Array.isArray(s) ? (s[0] ?? null) : (s ?? null);
    return { ...b, session };
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <div className="overflow-x-auto border border-white/10 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left">Booking</th>
              <th className="p-3">Session</th>
              <th className="p-3">Seats</th>
              <th className="p-3">Status</th>
              <th className="p-3">User</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-white/10">
                <td className="p-3">#{b.id}</td>
                <td className="p-3 text-center">{b.session?.id ?? b.session_id}</td>
                <td className="p-3 text-center">{b.seats}</td>
                <td className="p-3 text-center">{b.status}</td>
                <td className="p-3 text-center">{b.user_id.slice(0, 8)}…</td>
                <td className="p-3 text-center">{new Date(b.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
