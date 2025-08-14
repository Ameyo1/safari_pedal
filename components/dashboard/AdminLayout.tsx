// components/AdminLayout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 mt-2">
      <aside className="w-64 bg-white shadow-md p-4 mt-20">
        <h2 className="text-xl font-bold mb-6">Pedal Safari Admin</h2>
        <nav className="space-y-4 text-gray-700 flex flex-col bg-gray-100">
          <a href="/dashboard/submissions" className="text-blue-600 hover:underline">Dashboard</a>
          <a href="/dashboard/analytics" className="text-blue-600 hover:underline">Analytics</a>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
