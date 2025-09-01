import { fetchTours } from "@/lib/data";
import Section from "@/components/layout/Section";
import TourCard from "@/components/homePage/featuredTours/TourCard";
import { FullTour } from "@/lib/type";

export default async function ToursPage() {
  const { tours } = await fetchTours({ page: 1, pageSize: 20 });

  return (
    <Section id="tours" className="py-12 mt-8 dark:bg-gray-800 bg-gray-800 mt-12">
      <h1 className="text-3xl font-bold mb-8 text-center mt-16">
        Explore Our Tours & Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours?.map((tour: FullTour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </Section>
  );
}
