// components/dashboard/EventTable.tsx
'use client';

import { useState } from 'react';

export default function EventTable({ logs }: { logs: any[] }) {
  const [query, setQuery] = useState('');

  const filtered = logs.filter(log =>
    log.user?.email?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search by email..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <table className="w-full table-auto border border-gray-300 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Timestamp</th>
            <th className="px-4 py-2 text-left">Summary</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(log => (
            <tr key={log.id} className="border-t">
              <td className="px-4 py-2">{log.type}</td>
              <td className="px-4 py-2">{log.user?.email ?? '—'}</td>
              <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {Object.entries(log.metadata ?? {}).map(([key, value]) => (
                  <div key={key}><strong>{key}:</strong> {String(value)}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
