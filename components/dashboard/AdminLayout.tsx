import Link from "next/link";

// components/AdminLayout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 mt-2">
      <aside className="w-64 bg-white shadow-md p-4 mt-20">
        <h2 className="text-xl font-bold mb-6">Pedal Safari Admin</h2>
        <nav className="space-y-4 text-gray-700 h-100% flex flex-col bg-gray-100">
          <Link href="/dashboard/submissions" className="text-blue-600 hover hover:bg-blue-100">Submissions</Link>
          <Link href="/dashboard/waivers" className="text-blue-600 hover hover:bg-blue-100">Waivers</Link>
          <Link href="/dashboard/logs" className="text-blue-600 hover hover:bg-blue-100">Logs</Link>
          <Link href="/dashboard/users" className="text-blue-600 hover hover:bg-blue-100">Users</Link>
          <Link href="/dashboard/analytics" className="text-blue-600 hover hover:bg-blue-100">Analytics</Link>
          <Link href="/dashboard/settings" className="text-blue-600 hover hover:bg-blue-100">Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
