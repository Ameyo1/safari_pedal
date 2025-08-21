'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    phone: '',
    address: '',
    category: '',
    competitiveLevel: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    emergencyEmail: '',
    foodAllergies: '',
    medicationAllergies: '',
    hasInsurance: false,
    insuranceDetails: '',
    signedDate: today,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check if user already has a registration
  useEffect(() => {
    async function checkRegistration() {
      try {
        const res = await fetch('/api/register');
        const data = await res.json();
        if (data.registered) {
          router.replace('/participate/complete'); // redirect if already registered
        } else {
          setLoading(false); // allow form to show
        }
      } catch (err) {
        console.error('Error checking registration status:', err);
        setLoading(false);
      }
    }
    checkRegistration();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit registration.');
      }

      router.push('/participate/complete');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'An unexpected error occurred.');
    }

    setSubmitting(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Pedal Safari Registration</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* All input fields remain the same */}
        <input name="phone" placeholder="Phone" required value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="address" placeholder="Address" required value={form.address} onChange={handleChange} className="w-full p-2 border rounded" />
        <select name="category" required value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          <option value="Noncompetitive">Noncompetitive</option>
          <option value="Competitive">Competitive</option>
        </select>
        {form.category === 'Competitive' && (
          <select name="competitiveLevel" required value={form.competitiveLevel} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Level</option>
            <option value="Pre-intermediate">Pre-intermediate</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Post-intermediate">Post-intermediate</option>
          </select>
        )}
        <h2 className="text-lg font-semibold mt-6">Emergency Contact</h2>
        <input name="emergencyName" placeholder="Name" required value={form.emergencyName} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="emergencyRelation" placeholder="Relationship" required value={form.emergencyRelation} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="emergencyPhone" placeholder="Phone" required value={form.emergencyPhone} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="emergencyEmail" type="email" placeholder="Email" required value={form.emergencyEmail} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="foodAllergies" placeholder="Food Allergies" value={form.foodAllergies} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="medicationAllergies" placeholder="Medication Allergies" value={form.medicationAllergies} onChange={handleChange} className="w-full p-2 border rounded" />
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="hasInsurance" checked={form.hasInsurance} onChange={handleChange} />
          <span>Do you have medical insurance?</span>
        </label>
        {form.hasInsurance && (
          <textarea name="insuranceDetails" placeholder="Insurance Provider, Plan, Account Numbers" value={form.insuranceDetails} onChange={handleChange} className="w-full p-2 border rounded" />
        )}
        <input name="signedDate" type="date" required value={form.signedDate} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" disabled={submitting} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          {submitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>
    </section>
  );
}
