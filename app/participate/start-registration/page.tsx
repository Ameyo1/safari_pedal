'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StartRegistration() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkCompletion() {
      try {
        const res = await fetch('/api/completion-status');
        if (res.status === 401) {
          router.push('/login'); // redirect unauthorized users
          return;
        }

        const json = await res.json();
        if (!json.success) throw new Error(json.error || "Failed to fetch");

        const status = json.data;

        if (!status.hasPrivacyRecord) {
          router.push('/participate/policies');
        } else if (!status.hasMedicalRecord) {
          router.push('/participate/medical');
        } else if (!status.hasWaiverRecord) {
          router.push('/participate/waiver');
        } else if (!status.hasRegistrationRecord) {
          router.push('/participate/register');
        } else if (status.isComplete) {
          router.push('/booking');
        }
      } catch (err: any) {
        console.error("Error in completion check:", err);
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    }

    checkCompletion();
  }, [router]);

  return (
    <div className="p-6 text-center">
      {loading ? (
        <p className="text-gray-600">Checking your progress...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <p className="text-gray-600">Redirecting...</p>
      )}
    </div>
  );
}
