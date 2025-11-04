// apps/web/src/app/(dashboard)/dashboard/payments/page.tsx
import { createServerClientSafe } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

type BookingJoin = { id: string; user_id: string };
type PaymentRowRaw = {
  id: string;
  booking_id: string;
  amount_cents: number | null;
  currency: string | null;
  status: "requires_payment" | "succeeded" | "refunded" | "failed" | string;
  receipt_url: string | null;
  created_at: string;
  booking?: BookingJoin | BookingJoin[] | null;
};
type PaymentRow = Omit<PaymentRowRaw, "booking"> & { booking: BookingJoin | null };

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Page supports search params (server component)
export default async function PaymentsPage({
  searchParams,
}: {
  searchParams?: {
    start?: string; // YYYY-MM-DD
    end?: string;   // YYYY-MM-DD
    status?: string; // "all" | "succeeded" | "failed" | "refunded" | "requires_payment"
  };
}) {
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

  // ---- Filters (from URL) ----
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  // Default date range = current month
  const defaultStart = `${yyyy}-${mm}-01`;
  const defaultEnd = `${yyyy}-${mm}-${dd}`;

  const startStr = (searchParams?.start || defaultStart).trim();
  const endStr = (searchParams?.end || defaultEnd).trim();
  const statusFilter = (searchParams?.status || "all").trim(); // "all" | specific status

  // Build ISO range (inclusive day)
  const startIso = new Date(`${startStr}T00:00:00.000Z`).toISOString();
  // end-of-day by adding 1 day then using < next day at 00:00
  const endNextDayIso = new Date(
    new Date(`${endStr}T00:00:00.000Z`).getTime() + 24 * 60 * 60 * 1000
  ).toISOString();

  // ---- Query (admin => all, user => own) ----
  const baseSelect = `
    id, booking_id, amount_cents, currency, status, receipt_url, created_at,
    booking:bookings ( id, user_id )
  `;

  let qb = supabase
    .from("payments")
    .select(baseSelect)
    .gte("created_at", startIso)
    .lt("created_at", endNextDayIso)
    .order("created_at", { ascending: false })
    .limit(1000); // allow more rows for CSV if needed

  if (!isAdmin) {
    // Users only see their own payments via booking join
    qb = qb.eq("booking.user_id", user.id);
  }

  if (statusFilter !== "all") {
    qb = qb.eq("status", statusFilter);
  }

  const { data, error } = await qb;
  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Payments</h1>
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200">
          Error loading payments: {error.message}
        </div>
      </div>
    );
  }

  // Normalize join
  const payments: PaymentRow[] = ((data ?? []) as PaymentRowRaw[]).map((p) => {
    let booking: PaymentRow["booking"] = null;
    if (Array.isArray(p.booking)) booking = p.booking[0] ?? null;
    else if (p.booking && typeof p.booking === "object") booking = p.booking;
    return { ...p, booking };
  });

  // ---- Summary (filtered set) ----
  // We compute totals for succeeded payments only.
  const currencyLabel =
    payments[0]?.currency?.toUpperCase?.() ??
    (isAdmin ? "USD" : "USD"); // fallback if no rows; adjust if multi-currency later

  const totalSucceededCents = payments
    .filter((p) => p.status === "succeeded")
    .reduce((acc, p) => acc + (p.amount_cents ?? 0), 0);

  const totalSucceeded = `$${(totalSucceededCents / 100).toFixed(2)} ${currencyLabel}`;
  const totalRows = payments.length;

  // ---- CSV export (admin only) ----
  const csv = isAdmin
    ? toCSV(
        payments.map((p) => ({
          id: p.id,
          booking_id: p.booking_id,
          user_id: p.booking?.user_id ?? "",
          amount: p.amount_cents != null ? (p.amount_cents / 100).toFixed(2) : "",
          currency: p.currency?.toUpperCase?.() ?? "",
          status: p.status,
          receipt_url: p.receipt_url ?? "",
          created_at: p.created_at,
        }))
      )
    : "";

  const csvHref = isAdmin
    ? `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`
    : undefined;

  return (
    <div className="p-6 space-y-4">
      {/* Header + Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{isAdmin ? "Payments" : "My Payments"}</h1>
        <div className="text-sm opacity-70">
          Showing {totalRows} {totalRows === 1 ? "result" : "results"}
        </div>
      </div>

      {/* Filters */}
      <form method="GET" className="flex flex-wrap items-end gap-3 rounded-xl border border-white/10 p-3 bg-white/5">
        <div>
          <label className="block text-xs opacity-70 mb-1">Start date</label>
          <input
            type="date"
            name="start"
            defaultValue={startStr}
            className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs opacity-70 mb-1">End date</label>
          <input
            type="date"
            name="end"
            defaultValue={endStr}
            className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs opacity-70 mb-1">Status</label>
          <select
            name="status"
            defaultValue={statusFilter}
            className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm"
          >
            <option value="all">All</option>
            <option value="succeeded">Succeeded</option>
            <option value="requires_payment">Requires payment</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm"
        >
          Apply
        </button>

        {isAdmin && csvHref && (
          <a
            href={csvHref}
            download={`payments_${startStr}_to_${endStr}_${statusFilter}.csv`}
            className="ml-auto px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm"
            title="Export current view as CSV"
          >
            Export CSV
          </a>
        )}
      </form>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SummaryCard label="Succeeded total" value={totalSucceeded} />
        <SummaryCard label="Succeeded count" value={payments.filter((p) => p.status === "succeeded").length} />
        <SummaryCard label="All payments (rows)" value={totalRows} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-white/10 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3">Booking</th>
              {isAdmin && <th className="p-3">User</th>}
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Receipt</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-3">
                  <span className="font-mono text-xs">#{p.id}</span>
                </td>

                <td className="p-3 text-center">
                  <span className="font-mono text-xs">{p.booking_id}</span>
                </td>

                {isAdmin && (
                  <td className="p-3 text-center">
                    <span className="font-mono text-xs">
                      {p.booking?.user_id ? `${p.booking.user_id.slice(0, 8)}…` : "—"}
                    </span>
                  </td>
                )}

                <td className="p-3 text-center">
                  {p.amount_cents != null
                    ? `$${(p.amount_cents / 100).toFixed(2)} ${p.currency?.toUpperCase?.() ?? ""}`
                    : "—"}
                </td>

                <td className="p-3 text-center">
                  <span className={badgeClasses(p.status)}>{p.status}</span>
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

            {payments.length === 0 && (
              <tr>
                <td className="p-4 opacity-70 text-center" colSpan={isAdmin ? 7 : 6}>
                  {isAdmin ? "No payments found for the selected filters." : "No payments for the selected filters."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- UI helpers ---------- */
function badgeClasses(status: string) {
  const base = "inline-flex px-2 py-1 rounded text-xs border";
  switch (status) {
    case "succeeded":
    case "paid":
      return `${base} border-green-500/40 bg-green-500/10`;
    case "requires_payment":
    case "processing":
      return `${base} border-amber-500/40 bg-amber-500/10`;
    case "failed":
    case "refunded":
    case "canceled":
    case "cancelled":
      return `${base} border-red-500/40 bg-red-500/10`;
    default:
      return `${base} border-white/15 bg-white/5`;
  }
}

function SummaryCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wide opacity-60">{label}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}

// Minimal CSV generator for the current filtered set
function toCSV(rows: Array<Record<string, string | number | null | undefined>>) {
  if (!rows.length) {
    return "id,booking_id,user_id,amount,currency,status,receipt_url,created_at\n";
  }
  const headers = Object.keys(rows[0]);
  const escape = (val: any) => {
    if (val == null) return "";
    const str = String(val);
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ];
  return lines.join("\n");
}
