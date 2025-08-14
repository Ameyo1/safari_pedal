'use client';

import { useState } from 'react';
import TourDropdown from './TourDropDown';

export default function BookingForm() {
  const [form, setForm] = useState({
    tourId: '',
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    startDate: '',
    endDate: '',
    notes: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
    setError('');
    setSuccess(false);

    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.error || 'Something went wrong.');
      return;
    }

    setSuccess(true);
    setForm({
      tourId: '',
      name: '',
      email: '',
      phone: '',
      travelers: 1,
      startDate: '',
      endDate: '',
      notes: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold">Book Your Safari</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Booking submitted successfully!</p>}

     <TourDropdown value={form.tourId} onChange={handleChange} />


      <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="travelers" type="number" min="1" value={form.travelers} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required className="w-full p-2 border rounded" />
      <textarea name="notes" placeholder="Special Requests" value={form.notes} onChange={handleChange} className="w-full p-2 border rounded" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit Booking
      </button>
    </form>
  );
}
