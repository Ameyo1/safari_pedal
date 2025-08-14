'use client';

import { useEffect, useState } from 'react';

type Tour = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
};

export default function TourDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tours')
      .then((res) => res.json())
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <select
      name="tourId"
      value={value}
      onChange={onChange}
      required
      className="w-full p-2 border rounded"
    >
      <option value="">Select a Tour</option>
      {loading ? (
        <option disabled>Loading tours...</option>
      ) : (
        tours.map((tour) => (
          <option key={tour.id} value={tour.id}>
            {tour.title} ({tour.startDate.slice(0, 10)} → {tour.endDate.slice(0, 10)})
          </option>
        ))
      )}
    </select>
  );
}
