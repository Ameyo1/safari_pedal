'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompletionTracker from '@/components/CompletionTracker';
import { useSession } from 'next-auth/react';

export default function WaiverPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    phone: '',
    email: '',
    signedDate: today,
    agreed: false,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingSignedDate, setExistingSignedDate] = useState<string | null>(null);

  // 🔄 Prefetch waiver & completion status
  useEffect(() => {
    if (!session?.user?.id) return;

    
    const fetchData = async () => {
      try { 
        const res = await fetch('/api/waiver');
        if (!res.ok) throw new Error('Failed to fetch waiver data');
        const data = await res.json();

        if (data.success && data.data?.waiver) {
          const waiver = data.data.waiver;
          setForm({
            phone: waiver.phone || '',
            email: waiver.email || '',
            signedDate: waiver.signedDate?.split('T')[0] || today,
            agreed: waiver.agreed || false,
          });
          setExistingSignedDate(waiver.signedDate?.split('T')[0] || null);

          // If waiver already exists, move them forward
          router.replace('/participate/register');
          return;
        }

        // If waiver doesn’t exist, check prerequisites
        if (!data.data?.completionStatus?.hasPrivacyRecord) {
          router.replace('/participate/policies');
        } else if (!data.data?.completionStatus?.hasMedicalRecord) {
          router.replace('/participate/medical');
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading waiver/completion:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [router, session?.user?.id, today]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validateInputs = () => {
    if (!/^[0-9+\-\s]{7,20}$/.test(form.phone)) {
      return "Invalid phone number format";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Invalid email format";
    }
    if (!form.agreed) {
      return "You must agree to the waiver terms";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/waiver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to save waiver');
      }

      // ✅ use completionStatus from API
      if (result.data?.completionStatus?.hasRegistrationRecord) {
        router.push('/participate/completion-status');
      } else {
        router.push('/participate/register');
      }
    } catch (err: any) {
      console.error('Error submitting waiver:', err);
      setError(err.message || 'Error saving waiver');
    }

    setSubmitting(false);
  };

  if (status === 'loading' || loading) return <p>Loading…</p>;
  if (!session) return <p className="text-red-600">You must be logged in to continue.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Waiver</h1>
      <CompletionTracker />

      <div className="text-sm text-gray-700 space-y-4 mb-6 max-h-[400px] overflow-y-auto border p-4 rounded">
        <p>By participating in Pedal Safari, you waive all claims for injury, property damage, or liability...</p>
        <p>Pedal Safari and its affiliates are not responsible for incidents occurring outside designated routes...</p>
        <p>You acknowledge the physical demands and risks involved, and confirm your fitness to participate...</p>
        <p>You agree to follow all safety rules, wear a helmet, and maintain your equipment...</p>
        <p>This waiver is binding and grants Pedal Safari permission to use event media for promotional purposes...</p>
        <p><strong>Jurisdiction for legal matters rests solely with Uganda.</strong></p>
      </div>

      {existingSignedDate && (
        <p className="text-green-600 mb-4">
          You already signed this waiver on {existingSignedDate}.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="Phone number"
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email address"
          className="w-full p-2 border rounded"
        />

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} required />
          <span>I have read and agree to the waiver terms.</span>
        </label>

        <input
          type="date"
          name="signedDate"
          value={form.signedDate}
          disabled // prevent manual change
          className="w-full p-2 border rounded bg-gray-100"
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600"
        >
          {submitting ? 'Saving…' : 'Register'}
        </button>
      </form>
    </div>
  );
}
