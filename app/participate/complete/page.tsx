'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CompletePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/completion-status');
        if (res.status === 401) {
          router.push('/start-registration');
          return;
        }

        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Failed to check completion');

        if (json.data?.isComplete) {
          // ✅ All steps done → send to booking page
          router.push('/booking');
        } else {
          // 🚦 If incomplete, send back to flow start
          router.push('/participate/start-registration');
        }
      } catch (err: any) {
        console.error('Complete page error:', err);
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    }

    checkStatus();
  }, [router]);

  return (
    <div className="p-8 text-center">
      {loading ? (
        <p className="text-gray-600">Verifying your participation status...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-green-700 mb-4">You’re all set!</h1>
          <p className="text-gray-600">Redirecting you to the booking page...</p>
        </div>
      )}
    </div>
  );
}
