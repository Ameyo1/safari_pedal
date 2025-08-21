// app/dashboard/page.tsx
import AdminLayout from "@/components/dashboard/AdminLayout";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const users = await prisma.user.findMany({
    include: { loginEvent: true }
  });

  return (
    <AdminLayout>
    <div className="p-6 space-y-6 bg-white">
     

      <section className="bg-gray-100 p-4 rounded mt-6">
        <h2 className="text-xl font-semibold">User Overview</h2>
        <table className="w-full border mt-4">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Locale</th>
              <th>Waiver</th>
              <th>Logins</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-8">Recent Login Events</h2>
        <ul className="mt-4 space-y-2">
          {users.flatMap((user) =>
            user.loginEvent.map((event) => (
              <li key={event.id} className="border p-2 rounded">
                <strong>{user.email}</strong> — {event.reason}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
    </AdminLayout>
  );
}
