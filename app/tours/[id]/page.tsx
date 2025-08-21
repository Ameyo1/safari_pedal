import { fetchTourById } from "@/lib/data";
import Image from "next/image";
import Section from "@/components/layout/Section";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FullTour } from "@/lib/type";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TourDetailPage({ params }: PageProps) {
  const { id } = await params;
  const tour: FullTour | null = await fetchTourById(id);

  if (!tour) notFound();

  return (
    <>
      {/* Tour Overview */}
      
        <h1 className="text-4xl text-center font-bold mb-4 mt-22">{tour.title}</h1>
      <Section bg="white" className="py-8 flex flex-col">
        <div className="flex justify-center mr-4">
          <Image
            src={tour.featuredImage || "/images/h3.jpg"}
            alt={tour.title}
            priority
            width={500}
            height={200}
            style={{ objectFit: "cover" }}
            className=" rounded-lg"
          />

         <div className="ml-16 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 mb-6">{tour.itinerary}</p>
            {/* Booking CTA */}
      <div className="text-center my-8">
        <Link href='#destinations'>
          <h4 className="mb-4"><span  className="text-blue-600 hover:underline">Check Destinations </span> within the event leg</h4>
        </Link>
        <Link
          href={`/booking?tourId=${tour.id}`}
          className="bg-blue-500 text-white py-2 px-4 rounded inline-block text-center hover:bg-blue-600 transition"
        >
          Book This Tour
        </Link>
      </div>
            </div>
          </div>
      </Section>

      {/* Destinations */}
      <Section id="destinations" bg="gray">
        <h2 className="text-2xl font-semibold mb-4">Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tour.destinations?.map((place) => (
            <div key={place.id} className="p-4 rounded bg-white shadow-sm">
              <h3 className="font-bold">{place.name}</h3>
              <p className="text-gray-600">{place.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Recommended Lodges */}
      <Section id="recommended-lodges" bg="yellow">
        <h2 className="text-2xl font-semibold mb-4">Recommended Lodges</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {tour.hotels?.map((hotel) => (
            <li key={hotel.id}>
              {hotel.name} — {hotel.region}
            </li>
          ))}
        </ul>
      </Section>

      
    </>
  );
}
