import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-yellow-50 py-16 px-4 md:px-12 text-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready to Join Our Pedal Safari Event?</h2>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        Whether you're dreaming of the Serengeti or seeking hidden gems in East Africa, we’ll craft a journey that’s personal, ethical, and unforgettable.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link
          href="/tours"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Explore Event
        </Link>
        <Link
          href="/contacts"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition"
        >
          Talk to Pedal Safari
        </Link>
      </div>
    </section>
  );
}
