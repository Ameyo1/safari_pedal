'use client';

import { useState } from 'react';
import { formatISO } from 'date-fns';
import TourDropdown from './TourDropDown';
import Link from 'next/link';

interface BookingFormProps {
  user: { name: string; email: string };
}

export default function BookingForm({ user }: BookingFormProps) {
  const [form, setForm] = useState({
    tourId: '',
    phone: '',
    travelers: 1,
    startDate: '',
    endDate: '',
    notes: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'travelers' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      // Local validation: end date must be after start date
      if (form.startDate && form.endDate && form.endDate < form.startDate) {
        setError('End date must be after start date.');
        setLoading(false);
        return;
      }

      const payload = {
        tourId: form.tourId,
        phone: form.phone || undefined,
        travelers: Number(form.travelers),
        // formatISO ensures proper offset handling
        startDate: formatISO(new Date(form.startDate)),
        endDate: formatISO(new Date(form.endDate)),
        notes: form.notes || undefined,
      };

      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        // Prefer showing validation details if available
        if (result.details) {
          setError(Object.values(result.details).flat().join(', '));
        } else {
          setError(result.error || 'Something went wrong.');
        }
        return;
      }

      setSuccess(true);
      // Reset form but keep tour selected for convenience
      setForm((prev) => ({
        ...prev,
        phone: '',
        travelers: 1,
        startDate: '',
        endDate: '',
        notes: '',
      }));
    } catch (err) {
      console.error('Booking submit error:', err);
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl mx-auto p-6 mt-20 bg-white rounded shadow"
    >
      <h2 className="text-xl font-semibold">Book Your Safari</h2>

      {error && <p className="text-red-600">{error}</p>}
      <Link href="/" className="text-blue-600 hover:underline">
       {success && <p className="text-green-600">Booking submitted successfully! Back to Home</p>}
      </Link>

      <TourDropdown value={form.tourId} onChange={handleChange} />

      <input value={user.name} disabled className="w-full p-2 border rounded bg-gray-100" />
      <input value={user.email} disabled className="w-full p-2 border rounded bg-gray-100" />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="travelers"
        type="number"
        min="1"
        value={form.travelers}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="startDate"
        type="date"
        value={form.startDate}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="endDate"
        type="date"
        value={form.endDate}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="notes"
        placeholder="Special Requests"
        value={form.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Submitting...' : 'Submit Booking'}
      </button>
    </form>
  );
}
