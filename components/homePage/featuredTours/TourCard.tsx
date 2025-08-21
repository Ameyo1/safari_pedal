import Image from "next/image";
import Link from "next/link";
import { differenceInDays } from "date-fns";
import { FullTour } from "@/lib/type";

interface Props {
  tour: FullTour;
}

export default function TourCard({ tour }: Props) {
  const durationDays = tour.startDate && tour.endDate
    ? differenceInDays(new Date(tour.endDate), new Date(tour.startDate))
    : 0;

  return (
    <Link href={`/tours/${tour.id}`} className="block group">
      <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
        <Image
          src={tour.featuredImage || "/images/h2.jpg"}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{tour.title}</h3>
        {/* <p className="text-sm text-gray-600">{tour.itinerary}</p> */}
        <div className="mt-2 text-sm text-gray-800">
          {/* <span>{durationDays} days</span> ·  */}
          <span>${tour.price}</span>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {tour.startDate ? `Starts: ${new Date(tour.startDate).toLocaleDateString()}` : "No start date"} . {tour.endDate ? `Ends: ${new Date(tour.endDate).toLocaleDateString()}` : "No end date"}
        </div>
        <div className="text-blue-600 hover:underline">
          View Details
        </div>
      </div>
    </Link>
  );
}
