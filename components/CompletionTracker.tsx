// components/CompletionTracker.tsx
'use client';

import { useEffect, useState } from 'react';

interface CompletionStatus {
  hasPrivacyRecord: boolean;
  hasMedicalRecord: boolean;
  hasWaiverRecord: boolean;
}


export default function CompletionTracker() {
  const [status, setStatus] = useState<CompletionStatus | null>(null);

  useEffect(() => {
    fetch('/api/completion-status')
      .then((res) => res.json())
      .then(setStatus)
      .catch(console.error);
  }, []);

  if (!status) return null;

  return (
    <div className="mb-4 p-3 border rounded bg-gray-50 text-sm space-y-1">
      <p>Policies: {status.hasPrivacyRecord ? '✅ Completed' : '❌ Pending'}</p>
      <p>Medical Form: {status.hasMedicalRecord ? '✅ Completed' : '❌ Pending'}</p>
      <p>Waiver: {status.hasWaiverRecord ? '✅ Completed' : '❌ Pending'}</p>
    </div>
  );
}
