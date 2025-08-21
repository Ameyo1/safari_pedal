'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import BookingForm from '@/components/booking/BookingForm';

export default function BookingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user) {
      router.replace('/signin');
      return;
    }

    // ✅ Check server completion status
    async function checkCompletion() {
      try {
        const res = await fetch('/api/completion-status');
        if (res.status === 401) {
          router.replace('/signin');
          return;
        }

        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Failed to check completion');

        if (json.data?.isComplete) {
          setIsEligible(true);
        } else {
          router.replace('/participate/start-registration');
        }
      } catch (err) {
        console.error('Booking eligibility check failed:', err);
        router.replace('/participate/start-registration');
      } finally {
        setLoading(false);
      }
    }

    checkCompletion();
  }, [session, status, router]);

  if (status === 'loading' || loading) return <p>Loading...</p>;
  if (!isEligible) return <p>Redirecting...</p>;

  return (
    <BookingForm
      user={{
        name: session?.user?.name ?? '',
        email: session?.user?.email ?? '',
      }}
    />
  );
}
