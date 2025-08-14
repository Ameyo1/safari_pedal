'use client';

import { useEffect, useState } from 'react';

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-6">Loading analytics...</div>;

  const completionRate = (count: number) => ((count / data.total) * 100).toFixed(1) + '%';

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Submission Analytics</h1>
      <div className="grid grid-cols-2 gap-6">
        <StatCard label="Total Submissions" value={data.total} />
        <StatCard label="Medical Forms Completed" value={data.withMedical} rate={completionRate(data.withMedical)} />
        <StatCard label="Policy Agreements" value={data.withPolicy} rate={completionRate(data.withPolicy)} />
        <StatCard label="Waivers Signed" value={data.withWaiver} rate={completionRate(data.withWaiver)} />
        <StatCard label="Registrations Completed" value={data.withRegistration} rate={completionRate(data.withRegistration)} />
      </div>
    </div>
  );
}

function StatCard({ label, value, rate }: { label: string; value: number; rate?: string }) {
  return (
    <div className="bg-white shadow rounded p-4 border">
      <h2 className="text-lg font-semibold">{label}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {rate && <p className="text-sm text-gray-500">Completion Rate: {rate}</p>}
    </div>
  );
}
