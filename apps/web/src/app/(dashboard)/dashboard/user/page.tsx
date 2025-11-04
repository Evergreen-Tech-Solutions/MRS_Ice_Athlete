// apps/web/src/app/(dashboard)/dashboard/user/page.tsx
import { createServerClientSafe } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

type UpcomingBooking = {
  id: number;
  created_at: string;
  seats: number;
  session: {
    id: number;
    start_time: string | null;
    end_time: string | null;
    class: { id: string; title: string | null } | null;
  } | null;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function UserOverviewPage() {
  const supabase = await createServerClientSafe();
  if (!supabase) redirect("/signin");

  // Auth
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) redirect("/signin");

  // Role
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("user_id", user.id)
    .single<{ role: "admin" | "athlete" | "user"; full_name: string | null }>();

  if (profileErr || !profile) redirect("/signin?reason=profile-missing");

  const isAdmin = profile.role === "admin" || profile.role === "athlete";
  const isUser = profile.role === "user";

  // If an admin hits this page by mistake, send them to admin overview
  if (isAdmin) redirect("/dashboard");

  // ---- KPIs for user ----
  const nowIso = new Date().toISOString();

  const [upcomingBookingsRes, totalBookingsRes, pendingPaymentsRes] =
    await Promise.all([
      // Upcoming bookings (next 5) with session + class title
      supabase
        .from("bookings")
        .select(
          `
        id, created_at, seats,
        session:class_sessions(
          id, start_time, end_time,
          class:classes(id, title)
        )
      `
        )
        .eq("user_id", user.id)
        .gte("session.start_time", nowIso)
        .order("session.start_time", { ascending: true })
        .limit(5),

      // Total bookings (lifetime)
      supabase
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),

      // Payments that require action
      supabase
        .from("payments")
        .select("id", { count: "exact", head: true })
        .eq("booking.user_id", user.id)
        .eq("status", "requires_payment"),
    ]);

  const upcomings = (upcomingBookingsRes.data ??
    []) as any as UpcomingBooking[];
  const totalBookings = totalBookingsRes.count ?? 0;
  const pendingPaymentsCount = pendingPaymentsRes.count ?? 0;

  // Derive "next class"
  const next = upcomings[0] ?? null;
  const nextWhen = next?.session?.start_time
    ? new Date(next.session.start_time).toLocaleString()
    : null;
  const nextTitle = next?.session?.class?.title ?? null;

  return (
    <div className="min-h-full text-black">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white/70 via-amber-300 to-amber-500/90" />
      <div>
        <h1 className="text-2xl font-bold">
          Welcome{profile.full_name ? `, ${profile.full_name}` : ""} 👋
        </h1>
        <p className="opacity-70 text-sm">
          Here’s a quick look at your classes and payments.
        </p>
      </div>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard
          label="Next class"
          value={nextTitle ? nextTitle : "—"}
          hint={nextWhen || ""}
        />
        <KpiCard label="Upcoming bookings" value={upcomings.length} />
        <KpiCard label="Total bookings" value={totalBookings} />
      </section>

      {/* Actions */}
      <section className="flex flex-wrap items-center gap-3">
        <a
          href="/classes"
          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm"
        >
          Browse & Book classes
        </a>
        <a
          href="/dashboard/bookings"
          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm"
        >
          View my bookings
        </a>
        <a
          href="/dashboard/payments"
          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm"
        >
          My payments{" "}
          {pendingPaymentsCount ? `(${pendingPaymentsCount} due)` : ""}
        </a>
      </section>

      {/* Upcoming list */}
      <section className="rounded-2xl border border-white/10 bg-white/5">
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-base font-semibold">Upcoming classes</h2>
          <a
            className="text-sm underline opacity-80 hover:opacity-100"
            href="/dashboard/bookings"
          >
            See all
          </a>
        </div>
        <div className="divide-y divide-white/10">
          {upcomings.length === 0 ? (
            <div className="p-4 text-sm opacity-80">
              No upcoming bookings. Book your next class!
            </div>
          ) : (
            upcomings.map((b) => (
              <div
                key={b.id}
                className="px-4 py-3 grid grid-cols-1 md:grid-cols-4 gap-2"
              >
                <div className="md:col-span-2">
                  <div className="text-sm font-medium">
                    {b.session?.class?.title ?? "—"}
                  </div>
                  <div className="text-xs opacity-60">
                    {b.session?.start_time
                      ? new Date(b.session.start_time).toLocaleString()
                      : ""}
                  </div>
                </div>
                <div className="text-sm text-center md:text-left">
                  Seats: {b.seats}
                </div>
                <div className="text-xs opacity-60 text-center md:text-left">
                  Booked at {new Date(b.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function KpiCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wide opacity-60">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {hint ? <div className="text-xs opacity-60 mt-1">{hint}</div> : null}
    </div>
  );
}
