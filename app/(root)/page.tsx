import SectionHeadings from "@/components/helper/sectionHeadings";
import CallToAction from "@/components/homePage/CTA/CallToAction";
import FeaturedTours from "@/components/homePage/featuredTours/FeaturedTours";
import HeroBanner from "@/components/homePage/heroBanner/HeroBanner";
import TestimonialsSlider from "@/components/homePage/testimonials/TestimonialSlider";
import WhyPedalWithUs from "@/components/homePage/whyPedal/WhyPedalWithUs";
import EventCategories from "@/components/layout/categories/EventCategories";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const featuredTours = await prisma.tourEvent.findMany({
    where: { availableSlots: { gt: 0 } },
    take: 3,
    include: { park: true },
  });

  return (
    <main className="space-y-16 px-6 md:px-12">
      {/* Hero Section */}
      <HeroBanner />
      <div className="pt-10 pb-4">
        <SectionHeadings
          heading="Pedal Safari Africa"
          description="Pedal Safari is a tri-annual ecotourism event. It promotes cycling and
              vanpool tourism in multiple regions of Africa. Pedal Safari events showcases the beauty of a
              region abundant with magnificent landscapes, unique flora and fauna, lakes, rivers, waterfalls,
              flanked by the Atlantic Ocean to the West and the Indian Ocean to the East, with the Mediterranean Sea
              to the north, and a wealth of cultural attributes."
        />
        <div className="m-4 flex flex-col items-center md:flex-row md:justify-between">
          <Image src="/images/east-africa-wildlife.jpg" alt="Pedal Safari" width={400} height={150} className="w-full md:w-[50%] h-auto rounded-lg shadow-md" />
          <div className="mt-2 md:mt-0 md:ml-4">
            <SectionHeadings
              heading="Our Mission"
              description="Pedal Safari’s mission is to provide a first-hand cultural, educational,
                            and eco-friendly experience for all levels of cyclists and vanpool
                            travellers to different geographical regions in Africa."
            />
            <Link href="/about" className="m-4 text-blue-600 hover hover:bg-green-600">
              Learn More
            </Link>
            </div>
        </div>
      </div>
      <FeaturedTours />
      <EventCategories />
      {/* Interactive Map */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Explore by Region</h2>
        {/* <MapEmbed />  */}
      </section>

      {/* Why Choose Us */}
      <WhyPedalWithUs />

      <TestimonialsSlider />
      {/* Call to Action */}
      <CallToAction />

      {/* Value Props */}
      
    </main>
  );
}
