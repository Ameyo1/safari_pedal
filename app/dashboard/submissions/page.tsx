// app/admin/dashboard/page.tsx
import AdminLayout from "@/components/dashboard/AdminLayout";
import EventTable from "@/components/dashboard/EventTable";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const logs = await prisma.eventLog.findMany({
    orderBy: { timestamp: 'desc' },
    take: 50,
    include: { user: true },
  });

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4 mt-16">Recent Events</h1>
      <p className="text-gray-600 mb-6">Use the search bar to filter events by user email.</p>
      <EventTable logs={logs} />
    </AdminLayout>
  );
}
