'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompletionTracker from '@/components/CompletionTracker';
import { useSession } from 'next-auth/react';

export default function MedicalFormPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    phone: '',
    medicalConditions: '',
    allergies: '',
    injuries: '',
    limitations: '',
    otherInfo: '',
    signedDate: '',
  });

  const [loading, setLoading] = useState(true);

  // 🔎 Check completion status
  useEffect(() => {
    if (!session?.user?.id) return;

    const checkCompletion = async () => {
      try {
        const res = await fetch('/api/completion-status');
        if (!res.ok) throw new Error('Failed to fetch status');

        const { data } = await res.json();

        if (!data.hasPrivacyRecord) {
          router.replace('/participate/policies');
        } else if (data.hasMedicalRecord) {
          router.replace('/participate/waiver');
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error checking completion status:', err);
        setLoading(false);
      }
    };

    checkCompletion();
  }, [router, session?.user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/medical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save medical form');
      }

      router.push('/participate/waiver');
    } catch (err: any) {
      console.error('Error submitting medical form:', err);
      alert(err.message || 'Error saving medical form');
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) return <p>Loading…</p>;
  if (!session) return <p className="text-red-600">You must be logged in to continue.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medical Form</h1>

      <p className="text-sm text-gray-600 mb-6">
        Help us understand your health so we can better support you during Pedal Safari.
      </p>

      <CompletionTracker />
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="phone"
          placeholder="Phone"
          required
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="medicalConditions"
          placeholder="Do you have any medical conditions?"
          value={form.medicalConditions}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="allergies"
          placeholder="Do you have any allergies?"
          value={form.allergies}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="injuries"
          placeholder="Current or previous injuries?"
          value={form.injuries}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="limitations"
          placeholder="Limiting factors to physical activity?"
          value={form.limitations}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="otherInfo"
          placeholder="Any other health info you'd like to share?"
          value={form.otherInfo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="signedDate"
          type="date"
          required
          value={form.signedDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600"
        >
          {loading ? 'Saving…' : 'Next: Waiver'}
        </button>
      </form>
    </div>
  );
}
