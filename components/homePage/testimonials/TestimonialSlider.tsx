'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import './embla.css';

const testimonials = [
  { name: 'Amina N.', quote: 'The guides knew every trail and story. It felt like traveling with family.', location: 'Arusha, Tanzania' },
  { name: 'Jonas M.', quote: 'I’ve done safaris before, but this was something else. Ethical, immersive, unforgettable.', location: 'Berlin, Germany' },
  { name: 'Wanjiku K.', quote: 'Booking was seamless, and the experience was deeply rooted in local culture.', location: 'Nairobi, Kenya' },
];

export default function TestimonialsSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center">What Travelers Say</h2>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {testimonials.map((t, idx) => (
            <div className="embla__slide" key={idx}>
              <div className="p-6 bg-gray-50 rounded-lg shadow text-center">
                <p className="text-lg italic mb-4">“{t.quote}”</p>
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-sm text-gray-600">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === selectedIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => emblaApi?.scrollTo(idx)}
          />
        ))}
      </div>
    </section>
  );
}
