// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';

// interface Props {
//   tour: {
//     id: string;
//     title: string;
//     featuredImage: string;
//     price: number;
//     park: {
//       name: string;
//     };
//   };
// }

// export default function TourCard({ tour }: Props) {
//   return (
//     <Link href={`/tours/${tour.id}`} className="block rounded-lg shadow hover:shadow-lg transition overflow-hidden">
//       <div className="relative h-56">
//         <Image
//           src={tour.featuredImage || '/fallback.jpg'}
//           alt={tour.title}
//           fill
//           className="object-cover"
//         />
//       </div>
//       <div className="p-4 bg-white">
//         <h3 className="text-lg font-semibold">{tour.title}</h3>
//         <p className="text-sm text-gray-600">{tour.park.name}</p>
//         <p className="mt-2 text-sm text-gray-500">{tour.price} days · from ${tour.price}</p>
//       </div>
//     </Link>
//   );
// }

import Image from 'next/image';
import Link from 'next/link';
import { differenceInDays } from 'date-fns';
import { FullTour } from '@/lib/type';

interface Props {
    tour: FullTour
  }



export default function TourCard({ tour }: Props) {
  const durationDays = differenceInDays(new Date(tour.endDate), new Date(tour.startDate));

  return (
    <Link href={`/tours/${tour.id}`} className="block group">
      <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
        <Image
          src={tour.featuredImage || '/placeholder.jpg'}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{tour.title}</h3>
        <p className="text-sm text-gray-600">{tour.itinerary}</p>
        <div className="mt-2 text-sm text-gray-800">
          <span>{durationDays} days</span> · <span>${tour.price}</span>
        </div>
      </div>
    </Link>
  );
}
