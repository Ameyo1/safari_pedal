import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession();

  // Check if user is logged in and is an admin
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/'); // or return 403 page
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-700">Welcome to the admin dashboard. Here you can manage submissions and view analytics.</p>
        <DashboardPage />
    </div>
  );
}
