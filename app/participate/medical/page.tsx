'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MedicalFormPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    participantName: '',
    phone: '',
    email: '',
    medicalConditions: '',
    allergies: '',
    injuries: '',
    limitations: '',
    otherInfo: '',
    signedName: '',
    signedDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/medical', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/participate/policies');
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Medical Form</h1>
      <p className="text-sm text-gray-600 mb-6">
        Help us understand your health so we can better support you during Pedal Safari.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="participantName" placeholder="Name of Participant" required onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="phone" placeholder="Phone" required onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="w-full p-2 border rounded" />

        <textarea name="medicalConditions" placeholder="Do you have any medical conditions?" onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="allergies" placeholder="Do you have any allergies?" onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="injuries" placeholder="Current or previous injuries?" onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="limitations" placeholder="Limiting factors to physical activity?" onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="otherInfo" placeholder="Any other health info you'd like to share?" onChange={handleChange} className="w-full p-2 border rounded" />

        <input name="signedName" placeholder="Participant’s name" required onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="signedDate" type="date" required onChange={handleChange} className="w-full p-2 border rounded" />

        <button type="submit" className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600">
          Submit & Continue
        </button>
      </form>
    </section>
  );
}
