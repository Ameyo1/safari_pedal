import { fetchTours } from '@/lib/data';
import TourCard from './TourCard';
import SectionHeadings from '@/components/helper/sectionHeadings';

export default async function FeaturedTours() {
  const { tours } = await fetchTours({page:1, pageSize:3});

  if (!tours.length) {
    return (
      <div>
        <SectionHeadings
        heading='Pedal Safari 2026 Event'
        description='Pedal Safari is a tri-annual ecotourism event. It promotes cycling and 
vanpool tourism in multiple regions of Africa. Pedal Safari events 
showcases the beauty of a 
region abundant with 
magnificent landscapes, 
unique flora and fauna, 
lakes, rivers, waterfalls, 
flanked by the Atlantic 
Ocean to the West and the 
Indian Ocean to the East, 
with the Mediterranean Sea 
to the north, and a wealth 
of cultural attributes. '
      />
        <p className="text-center text-gray-500">No featured tours available at the moment.</p>
      </div>
    );
  }

  return (
    <section id="featured-tours" className="py-12 px-4 md:px-8">
      <div className='pt-6 pb-6'>
      <SectionHeadings
        heading='Pedal Safari 2026 Event'
        description='Pedal Safari is a tri-annual ecotourism event. It promotes cycling and 
vanpool tourism in multiple regions of Africa. Pedal Safari events 
showcases the beauty of a 
region abundant with 
magnificent landscapes, 
unique flora and fauna, 
lakes, rivers, waterfalls, 
flanked by the Atlantic 
Ocean to the West and the 
Indian Ocean to the East, 
with the Mediterranean Sea 
to the north, and a wealth 
of cultural attributes. '
      />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="/tours" className="text-blue-600 hover:underline">View All Tours</a>
      </div>
    </section>
  );
}
