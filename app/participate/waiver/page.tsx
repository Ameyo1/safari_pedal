'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WaiverPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    participantName: '',
    phone: '',
    email: '',
    signedDate: '',
    agreed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/waiver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/participate/register');
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Pedal Safari Waiver</h1>
      <div className="text-sm text-gray-700 space-y-4 mb-6 max-h-[400px] overflow-y-auto border p-4 rounded">
        <p>By participating in Pedal Safari, you waive all claims for injury, property damage, or liability...</p>
        <p>Pedal Safari and its affiliates are not responsible for incidents occurring outside designated routes...</p>
        <p>You acknowledge the physical demands and risks involved, and confirm your fitness to participate...</p>
        <p>You agree to follow all safety rules, wear a helmet, and maintain your equipment...</p>
        <p>This waiver is binding and grants Pedal Safari permission to use event media for promotional purposes...</p>
        <p><strong>Jurisdiction for legal matters rests solely with Uganda.</strong></p>
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
          <span>I have read and agree to the waiver terms.</span>
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
          type="text"
          name="phone"
          placeholder="Phone"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
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
          Next: Register
        </button>
      </form>
    </>
  );
}
