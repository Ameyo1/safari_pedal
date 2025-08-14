import React from 'react'

const Regions = () => {
  return (
    <div className="space-y-16 px-6 md:px-12">
        <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: 'url(images/h2.jpg)' }}>
          <div className="absolute inset-0 bg-gray bg-opacity-40 flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
              Explore East Africa’s Wild Heart
            </h1>
          </div>
          
        </section>
        <section className="bg-gradient-to-t from-transparent to-gray-600">
            <p>
              Discover the untamed beauty and rich cultures of East Africa. Join us on an unforgettable journey through the heart of the wilderness.
              East Africa is renowned for its incredible wildlife and stunning landscapes.
              It is home to a diverse range of animals, including gorillas, Nile crocodiles, hippos, rhinos, zebras, wildebeests, and big cats like lions and leopards.
              Countries like Kenya and Tanzania are famous for their majestic wildlife, including elephants and various species of monkeys and hyenas.
              Visitors can explore numerous national parks and game reserves, offering unforgettable wildlife safaris and adventures.
              Luxury safari holidays are also available, blending comfort with the opportunity to experience the untouched wilderness.
              Photographic opportunities abound, showcasing animals like chimpanzees, rhinos, and lions in their natural habitats.
              East Africa truly offers a rich tapestry of wildlife experiences for nature enthusiasts.
            </p>
          </section>
          <section className="text-center py-8 px-4 mt-8 bg-white">
          <h2 className="text-2xl font-semibold mb-6">Explore by Region</h2>
          {/* Interactive Map or Regions List can be added here */}
          {/* <MapEmbed /> */}
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-bold text-lg">Uganda</h3>
              <p>Home to the endangered mountain gorillas and stunning landscapes.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Kenya</h3>
              <p>Famous for the Maasai Mara and diverse wildlife.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Tanzania</h3>
              <p>Home to Serengeti National Park and Mount Kilimanjaro.</p>
            </div>
        </section>
      </div>
  )
}

export default Regions