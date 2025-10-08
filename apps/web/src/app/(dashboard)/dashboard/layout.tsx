export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="p-4 border-b border-gray-800">Dashboard Header</div>
      <main className="p-6">{children}</main>
    </div>
  );
}
