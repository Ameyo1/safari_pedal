import { fetchTourById } from "@/lib/data";
import Image from "next/image";
import Section from "@/components/layout/Section";
import Link from "next/link";

export default async function TourDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const tour = await fetchTourById(params.id);

  if (!tour) {
    return (
      <Section>
        <p>Tour not found.</p>
      </Section>
    );
  }

  return (
    <>
      <Section bg="white" className="text-center py-8 px-4 mt-8">
        <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>
        <div className="relative w-full h-96 mb-8">
          <Image
            src={tour.featuredImage || "/images/h1.jpg"}
            alt={tour.title}
            fill
            className="object-cover rounded-lg"
          />
        </div> 
        <p className="text-gray-700 mb-6">{tour.itinerary}</p>
      </Section>

      <Section bg="gray">
        <h2 className="text-2xl font-semibold mb-4">Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tour.destinations.map((place: any) => (
            <div key={place.id} className=" p-4 rounded">
              <h3 className="font-bold">{place.name}</h3>
              <p className="text-gray-600">{place.description}</p>
            </div>
          ))}
        </div>
        {/* <ul className="list-disc pl-6 text-gray-700">
          {tour.destinations.map((place: any) => (
            <li key={place.id}>
            {place.name}
            {place.description}
            </li>
            
          ))}
        </ul> */}
      </Section>

      <Section bg="yellow">
        <h2 className="text-2xl font-semibold mb-4">Recommended Lodges</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {tour.hotels.map((hotel: any) => (
            <li key={hotel.id}>
              {hotel.name} — {hotel.region}
            </li>
          ))}
        </ul>
      </Section>
      <Link href={`/booking?tourId=${tour.id}`} passHref>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Book This Tour
        </button>
      </Link>

      
    </>
  );
}
