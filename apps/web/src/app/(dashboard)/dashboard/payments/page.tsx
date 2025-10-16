// apps/web/src/app/(dashboard)/dashboard/payments/page.tsx
import { requireAdmin } from "@/lib/requireAdmin";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

type PaymentRow = {
  id: number;
  booking_id: number;
  amount_cents: number;
  currency: string;
  status: "requires_payment" | "succeeded" | "refunded" | "failed";
  receipt_url: string | null;
  created_at: string;
};

export default async function AdminPaymentsPage() {
  await requireAdmin();

  // ⬇️ IMPORTANT: await the async factory
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("payments")
    .select("id, booking_id, amount_cents, currency, status, receipt_url, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return <div className="p-6 text-red-400">Error: {error.message}</div>;
  }

  const payments = (data ?? []) as PaymentRow[];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>
      <div className="overflow-x-auto border border-white/10 rounded-lg">
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
            {payments.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-3">#{p.id}</td>
                <td className="p-3 text-center">{p.booking_id}</td>
                <td className="p-3 text-center">
                  ${(p.amount_cents / 100).toFixed(2)} {p.currency}
                </td>
                <td className="p-3 text-center">{p.status}</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
