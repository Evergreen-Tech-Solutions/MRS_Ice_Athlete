import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function CallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] grid place-items-center p-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          Loading…
        </div>
      </div>
    }>
      {children}
    </Suspense>
  );
}
