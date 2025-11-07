// apps/web/src/app/(dashboard)/dashboard/page.tsx
import StatCard from "@/components/StatCard";
import { createServerClientSafe } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardHome() {
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
  if (!isAdmin) {
    redirect("/dashboard/user");
  }

  // ---- Time bounds (MTD) ----
  const now = new Date();
  const startOfMonthIso = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const nowIso = now.toISOString();

  // ---- Queries (parallel) ----
  const [classesRes, sessionsRes, bookingsRes, paymentsRes, recentPaymentsRes] =
    await Promise.all([
      // 1) Count published classes
      supabase
        .from("classes")
        .select("id", { count: "exact", head: true })
        .eq("is_published", true),

      // 2) Count upcoming sessions
      supabase
        .from("class_sessions")
        .select("id", { count: "exact", head: true })
        .gte("start_time", nowIso),

      // 3) Count bookings created MTD
      supabase
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startOfMonthIso),

      // 4) Sum payments (succeeded) MTD
      supabase
        .from("payments")
        .select("amount_cents, status, created_at")
        .gte("created_at", startOfMonthIso),

      // 5) Recent payments (latest 10)
      supabase
        .from("payments")
        .select("id, booking_id, amount_cents, currency, status, receipt_url, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

  // ---- Metrics ----
  const classesCount = classesRes.count ?? 0;
  const upcomingSessionsCount = sessionsRes.count ?? 0;
  const mtdBookingsCount = bookingsRes.count ?? 0;

  const paymentsData =
    (paymentsRes.data as Array<{ amount_cents: number | null; status: string }> | null) ?? [];

  const revenueCentsMTD = paymentsData
    .filter((p) => p.status === "succeeded")
    .reduce((sum, p) => sum + (p.amount_cents ?? 0), 0);

  const revenueMTD = `$${(revenueCentsMTD / 100).toFixed(2)}`;

  const recent =
    (recentPaymentsRes.data as Array<{
      id: string;
      booking_id: string;
      amount_cents: number;
      currency: string;
      status: string;
      receipt_url: string | null;
      created_at: string;
    }> | null) ?? [];

  const hadErr =
    classesRes.error ||
    sessionsRes.error ||
    bookingsRes.error ||
    paymentsRes.error ||
    recentPaymentsRes.error;

  // ---- UI ----
  return (
    <div className="min-h-full text-black">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-zinc-600 via-[#fab95b] to-amber-500" />
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold hidden md:block">Admin Overview</h1>
          <p className="opacity-70 text-sm">Simple overview for the athlete admin.</p>
          {hadErr ? (
            <p className="mt-2 text-sm text-red-600">
              Some metrics failed to load — check Supabase tables & RLS.
            </p>
          ) : null}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Revenue (MTD)"
            value={revenueMTD}
            hint={`since ${new Date(startOfMonthIso).toLocaleDateString()}`}
          />
          <StatCard label="Upcoming sessions" value={upcomingSessionsCount} />
          <StatCard label="New bookings (MTD)" value={mtdBookingsCount} />
          <StatCard label="Published classes" value={classesCount} />
        </div>

        {/* Recent payments */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Recent payments</h2>
          <div className="overflow-x-auto border border-white/10 rounded-xl bg-white/30 backdrop-blur">
            <table className="w-full text-sm">
              <thead className="bg-white/40">
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
                  <tr key={p.id} className="border-t border-white/50">
                    <td className="p-3">
                      <span className="font-mono text-xs">#{p.id}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="font-mono text-xs">{p.booking_id}</span>
                    </td>
                    <td className="p-3 text-center">
                      ${(p.amount_cents / 100).toFixed(2)} {p.currency?.toUpperCase?.()}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={[
                          "inline-flex px-2 py-1 rounded text-xs border",
                          p.status === "succeeded"
                            ? "border-green-600/40 bg-green-600/10"
                            : p.status === "processing"
                            ? "border-amber-600/40 bg-amber-600/10"
                            : p.status === "canceled" || p.status === "refunded"
                            ? "border-red-600/40 bg-red-600/10"
                            : "border-black/10 bg-black/5",
                        ].join(" ")}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {p.receipt_url ? (
                        <a className="underline" href={p.receipt_url} target="_blank">
                          View
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {new Date(p.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {recent.length === 0 && (
                  <tr>
                    <td className="p-3 opacity-60" colSpan={6}>
                      No payments yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
