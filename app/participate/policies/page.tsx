'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PoliciesPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    participantName: '',
    signedDate: '',
    agreed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/policies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/participate/waiver');
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Pedal Safari Policies</h1>
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
            name="agreed"
            checked={form.agreed}
            onChange={handleChange}
            required
          />
          <span>
            I have read and agree to comply with the Pedal Safari policies.
          </span>
        </label>

        <input
          type="text"
          name="participantName"
          placeholder="Participant’s Name"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="signedDate"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600"
        >
          Next: Waiver
        </button>
      </form>
    </>
  );
}
