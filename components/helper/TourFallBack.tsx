// components/TourFallback.tsx
'use client';

import Link from 'next/link';

export default function TourFallback() {
  return (
    <div className="max-w-xl mx-auto py-12 text-center text-gray-700">
      <h2 className="text-2xl font-semibold mb-4">
        🚧 Tour Not Found
      </h2>
      <p className="mb-6">
        We couldn’t find the tour you were looking for. It may have been removed, or the link might be incorrect.
      </p>
      <Link href="/tours" className="text-blue-600 hover:underline">
        Browse All Tours
      </Link>
    </div>
  );
}
