'use client';

import { useEffect, useState } from 'react';
import { FaClipboardList, FaUserCheck, FaFileMedical, FaFileContract, FaRegAddressCard } from 'react-icons/fa';

interface Analytics {
  total: number;
  withMedical: number;
  withPolicy: number;
  withWaiver: number;
  withRegistration: number;
}

interface Submission {
  id: string;
  participantName: string;
  email: string;
  phone: string;
  medicalId: string | null;
  policyId: string | null;
  waiverId: string | null;
  registrationId: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/analytics').then(res => res.json()),
      fetch('/api/submissions').then(res => res.json()),
    ])
      .then(([analyticsData, submissionsData]) => {
        setAnalytics(analyticsData);
        setSubmissions(submissionsData.submissions || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching dashboard data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;
  if (!analytics) return <p className="text-center mt-10 text-red-600">Failed to load analytics.</p>;

  const { total, withMedical, withPolicy, withWaiver, withRegistration } = analytics;

  const calcPercent = (count: number) => total ? Math.round((count / total) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard title="Total Submissions" count={total} icon={<FaClipboardList />} color="bg-blue-500" />
        <StatCard title="Medical Forms" count={withMedical} percent={calcPercent(withMedical)} icon={<FaFileMedical />} color="bg-green-500" />
        <StatCard title="Policy Agreements" count={withPolicy} percent={calcPercent(withPolicy)} icon={<FaFileContract />} color="bg-yellow-500" />
        <StatCard title="Waivers" count={withWaiver} percent={calcPercent(withWaiver)} icon={<FaUserCheck />} color="bg-rose-500" />
        <StatCard title="Registrations" count={withRegistration} percent={calcPercent(withRegistration)} icon={<FaRegAddressCard />} color="bg-indigo-500" />
      </div>

      {/* Progress Bars */}
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Completion Progress</h2>
        <ProgressBar label="Medical Forms" value={calcPercent(withMedical)} color="bg-green-500" />
        <ProgressBar label="Policy Agreements" value={calcPercent(withPolicy)} color="bg-yellow-500" />
        <ProgressBar label="Waivers" value={calcPercent(withWaiver)} color="bg-rose-500" />
        <ProgressBar label="Registrations" value={calcPercent(withRegistration)} color="bg-indigo-500" />
      </div>

      {/* Submissions Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Submissions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Participant</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2">Medical</th>
                <th className="px-4 py-2">Policy</th>
                <th className="px-4 py-2">Waiver</th>
                <th className="px-4 py-2">Registration</th>
                <th className="px-4 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(s => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{s.participantName}</td>
                  <td className="px-4 py-2">{s.email}</td>
                  <td className="px-4 py-2">{s.phone}</td>
                  <td className="px-4 py-2 text-center">{s.medicalId ? '✅' : '❌'}</td>
                  <td className="px-4 py-2 text-center">{s.policyId ? '✅' : '❌'}</td>
                  <td className="px-4 py-2 text-center">{s.waiverId ? '✅' : '❌'}</td>
                  <td className="px-4 py-2 text-center">{s.registrationId ? '✅' : '❌'}</td>
                  <td className="px-4 py-2">{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ✅ Summary Card Component
function StatCard({ title, count, percent, icon, color }: any) {
  return (
    <div className="p-4 bg-white rounded shadow flex items-center space-x-4">
      <div className={`p-3 rounded text-white ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{count}</p>
        {percent !== undefined && <p className="text-sm text-gray-400">{percent}% of total</p>}
      </div>
    </div>
  );
}

// ✅ Progress Bar Component
function ProgressBar({ label, value, color }: any) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-700 font-medium">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded h-4">
        <div className={`h-4 rounded ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
