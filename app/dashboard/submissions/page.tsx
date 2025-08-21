// // app/admin/dashboard/page.tsx
// import AdminLayout from "@/components/dashboard/AdminLayout";
// import EventTable from "@/components/dashboard/EventTable";
// import { prisma } from "@/lib/prisma";

// export default async function DashboardPage() {
//   const logs = await prisma.eventLog.findMany({
//     orderBy: { timestamp: 'desc' },
//     take: 50,
//     include: { user: true },
//   });

//   return (
//     <AdminLayout>
//       <h1 className="text-2xl font-semibold mb-4 mt-16">Recent Events</h1>
//       <p className="text-gray-600 mb-6">Use the search bar to filter events by user email.</p>
//       <EventTable logs={logs} />
//     </AdminLayout>
//   );
// }


import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';

export default async function SubmissionsPage() {
  // 1️⃣ Check session and role
  const session = await getServerSession();
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/'); // Non-admins get redirected
  }

  // 2️⃣ Fetch all submissions with related forms
  const submissions = await prisma.submission.findMany({
    include: {
      medical: true,
      policy: true,
      waiver: true,
      registration: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submissions</h1>

      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Medical</th>
              <th className="border p-2">Policy</th>
              <th className="border p-2">Waiver</th>
              <th className="border p-2">Registration</th>
              <th className="border p-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="border p-2">{s.participantName}</td>
                <td className="border p-2">{s.email}</td>
                <td className="border p-2">{s.phone}</td>
                <td className="border p-2">{s.medical ? '✅' : '❌'}</td>
                <td className="border p-2">{s.policy ? '✅' : '❌'}</td>
                <td className="border p-2">{s.waiver ? '✅' : '❌'}</td>
                <td className="border p-2">{s.registration ? '✅' : '❌'}</td>
                <td className="border p-2">
                  {format(new Date(s.createdAt), 'yyyy-MM-dd HH:mm')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
