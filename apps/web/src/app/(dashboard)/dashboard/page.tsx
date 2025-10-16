import StatCard from "@/components/StatCard";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function DashboardHome() {
  const supabase = await createSupabaseServerClient();
  const now = new Date();

  // Start of month (for MTD metrics)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const nowIso = now.toISOString();

  // ---- Fetch KPI counts in parallel ----
  const [
    // published classes
    { count: classesCount, error: classesErr },
    // upcoming sessions
    { count: upcomingSessionsCount, error: sessionsErr },
    // bookings created this month
    { count: mtdBookingsCount, error: bookingsErr },
    // payments this month (we'll also sum amounts in a separate query)
    paymentsQuery,
    // recent payments list (10)
    recentPaymentsQuery,
  ] = await Promise.all([
    supabase.from("classes").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("sessions").select("*", { count: "exact", head: true }).gte("start_time", nowIso),
    supabase.from("bookings").select("*", { count: "exact", head: true }).gte("created_at", startOfMonth),
    supabase
      .from("payments")
      .select("amount_cents,status,created_at")
      .gte("created_at", startOfMonth),
    supabase
      .from("payments")
      .select("id, booking_id, amount_cents, currency, status, receipt_url, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  // Sum revenue (MTD) for succeeded payments
  const paymentsData = paymentsQuery.data ?? [];
  const revenueCentsMTD = paymentsData
    .filter((p: any) => p.status === "succeeded")
    .reduce((sum: number, p: any) => sum + (p.amount_cents ?? 0), 0);

  const revenueMTD = `$${(revenueCentsMTD / 100).toFixed(2)}`;

  const recent = (recentPaymentsQuery.data ?? []) as Array<{
    id: number;
    booking_id: number;
    amount_cents: number;
    currency: string;
    status: string;
    receipt_url: string | null;
    created_at: string;
  }>;

  // Basic error surface (non-blocking)
  const hadErr = classesErr || sessionsErr || bookingsErr || recentPaymentsQuery.error;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="opacity-70 text-sm">Simple overview for the athlete admin.</p>
        {hadErr ? (
          <p className="mt-2 text-sm text-red-400">
            Some metrics failed to load — check Supabase tables & RLS.
          </p>
        ) : null}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Revenue (MTD)" value={revenueMTD} hint={`since ${new Date(startOfMonth).toLocaleDateString()}`} />
        <StatCard label="Upcoming sessions" value={upcomingSessionsCount ?? 0} />
        <StatCard label="New bookings (MTD)" value={mtdBookingsCount ?? 0} />
        <StatCard label="Published classes" value={classesCount ?? 0} />
      </div>

      {/* Recent payments */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Recent payments</h2>
        <div className="overflow-x-auto border border-white/10 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3">Booking</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Receipt</th>
                <th className="p-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((p) => (
                <tr key={p.id} className="border-t border-white/10">
                  <td className="p-3">#{p.id}</td>
                  <td className="p-3 text-center">{p.booking_id}</td>
                  <td className="p-3 text-center">${(p.amount_cents / 100).toFixed(2)} {p.currency}</td>
                  <td className="p-3 text-center">{p.status}</td>
                  <td className="p-3 text-center">
                    {p.receipt_url ? (
                      <a className="underline" href={p.receipt_url} target="_blank">View</a>
                    ) : "—"}
                  </td>
                  <td className="p-3 text-center">{new Date(p.created_at).toLocaleString()}</td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td className="p-3 opacity-60" colSpan={6}>No payments yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
