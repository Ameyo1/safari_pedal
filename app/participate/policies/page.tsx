'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompletionTracker from '@/components/CompletionTracker';
import { useSession } from 'next-auth/react';

export default function PoliciesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingCompletion, setCheckingCompletion] = useState(true);

  // 🔎 Check completion status
  useEffect(() => {
    if (!session?.user?.id) return;

    const checkCompletion = async () => {
      try {
        const res = await fetch('/api/completion-status');
        if (!res.ok) throw new Error('Failed to fetch status');

        const { data } = await res.json();

        if (!data.hasPrivacyRecord) {
          // stay here (policies page)
          setCheckingCompletion(false);
        } else if (!data.hasMedicalRecord) {
          router.replace('/participate/medical');
        } else if (!data.hasWaiverRecord) {
          router.replace('/participate/waiver');
        } else {
          router.replace('/dashboard');
        }
      } catch (err) {
        console.error('Error checking completion status:', err);
      } finally {
        setCheckingCompletion(false);
      }
    };

    checkCompletion();
  }, [router, session?.user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agreed }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/participate/medical');
      } else {
        alert(data.error || 'Failed to save policies');
      }
    } catch (err) {
      console.error('Error submitting policy agreement:', err);
      alert('Failed to save policies');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || checkingCompletion) return <p>Loading...</p>;
  if (!session) return <p className="text-red-600">You must be logged in to continue.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pedal Safari Policies</h1>
      <CompletionTracker />

      <div className="text-sm text-gray-700 space-y-4 mb-6">
        <p>▪ Each rider must wear a helmet and have a rearview mirror.</p>
        <p>▪ Keep a medical card or insurance copy at all times.</p>
        <p>▪ Pedal Safari is not liable if you leave the route plan.</p>
        <p>▪ Orientation sessions are mandatory.</p>
        <p>▪ No operating vehicles or bikes under the influence.</p>
        <p>▪ No threatening behavior toward others.</p>
        <p>▪ Schedule may change without notice.</p>
        <p><strong>Violation may result in termination of participation.</strong></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            required
          />
          <span>I have read and agree to comply with the Pedal Safari policies.</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600"
        >
          {loading ? 'Saving...' : 'Next: Medical Form'}
        </button>
      </form>
    </div>
  );
}
