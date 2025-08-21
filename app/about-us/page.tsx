// components/AboutUs.tsx
import Image from "next/image";
import SectionHeadings from "@/components/helper/sectionHeadings";
import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section className="bg-white-500 text-gray-900 px-6 py-12 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center mt-12 bg-gray-50 p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-2">About Pedal Safari</h1>
          <p className="text-lg italic text-green-700">Travel In Sync with Nature©</p>
        </header>

        {/* Mission */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Who we are</h2>
          <p className="text-lg">
            Pedal Safari is a tri-annual ecotourism event. It promotes cycling and 
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
of cultural attributes. 
Pedal Safari’s goals are to: 
Each year, a fresh route is 
determined for the safari. 
This is then communicated 
to interested entities in 
advance through multiple channels including social media and on 
the Pedal Safari website. 
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4"> Our Mission</h2>
          <p className="text-lg">
            Pedal Safari’s mission is to provide a first-hand cultural, educational, 
and eco-friendly experience for all levels of cyclists and vanpool 
travellers to different geographical regions in Africa. 
          </p>
        </section>

         

        {/* Goals */}
        <section >
          <div className="flex flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
          <Image
            src="/images/h1.jpg"
            alt="Our Mission"
            width={500}
            height={300}
            className="w-[50%] h-auto rounded-lg shadow-md"
          />
          <div className="w-[50%] mx-4">
          <SectionHeadings
            heading=" Our Goals"
            description="Our goals reflect our commitment to sustainable and responsible travel."
            
          />
          <ul className="list-disc list-inside space-y-2 text-gray-900 text-lg mt-2">
            <li>Support education in host communities</li>
            <li>Promote forestation and conservation</li>
            <li>Encourage sustainable tourism practices</li>
            <li>Advocate for bike path infrastructure</li>
            <li>Foster cross-cultural understanding</li>
          </ul>
          </div>
          </div>
        </section>

        {/* Objectives */}
        <section>
          <div className="flex flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
           
          <div className="mt-4">
            <SectionHeadings
              heading=" Our Objectives"
              description="Our objectives guide our actions and ensure we stay true to our mission."
            />
          
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Host tri-annual cycling and vanpool events</li>
            <li>Promote local culture and heritage</li>
            <li>Encourage sustainable tourism practices</li>
            <li>Support education in host communities</li>
            <li>Collaborate with schools and local institutions</li>
            <li>Lobby for improved cycling infrastructure</li>
            <li>Engage in forestation and conservation efforts</li>
          </ul>
          </div>
           <Image
              src="/images/h2.jpg"
              alt="Our Objectives"
              
            width={500}
            height={300}
              className="w-[50%] h-auto rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* Region & Routes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4"> Where We Ride</h2>
          <p className="text-lg">
            While East Africa serves as the mainstay for Pedal Safari events, 
Pedal Safari is not be limited to the region. Due to ease of access, 
however, Tanzania, Kenya, and Uganda serve as the base of Pedal 
Safari.  
We will gradually expand the events to other regions of Africa with 
sensitivity to the environmental requisites of each region and deeper 
understanding of cycle-able routes in any given country improves, 
and, after safety has been rigorously assessed. 
On a case-by-case basis, we will scale up existing events to 
accommodate more participants. Further, we will rotate event
routes between regions so repeat-participants can see other regions 
of Africa and people from other regions have chances to witness 
these events. To broaden our client base, we are open to holding 
occasional events outside of Africa. 

          </p>
        </section>

        {/* Safety */}
        <section>
          <h2 className="text-2xl font-semibold mb-4"> Safety First</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Politically stable regions only</li>
            <li>Medical teams and evacuation protocols</li>
            <li>Mandatory helmet use and no night riding</li>
            <li>Orientation and safety briefings throughout</li>
            <li>Support vehicles with first-aid and bike tech</li>
            <li>To help increase the awareness of all road users in the region 
we launch media campaigns before and during each event; these campaigns focus on promoting safe cycling practices and sharing information about the event's route and schedule.</li>
            <li>We also work with local authorities to ensure that the roads are safe for cycling and that any necessary road closures or detours are communicated in advance.</li>
            <li>We encourage all participants to take personal responsibility for their safety by following the rules of the road, wearing appropriate safety gear, and being aware of their surroundings at all times.</li>
            <li>To ensure all participants have a fair sense of the environment 
they travel through, orientation sessions are conducted before 
every event and periodically during the event. </li>
            
          </ul>
        </section>

        {/* Community Engagement */}
        <section>
          <h2 className="text-2xl font-semibold mb-4"> Community Engagement</h2>
          <p className="text-lg">
            Participants engage in cultural tours, Q&A with local officials, and community service
            projects during multi-day stopovers.
          </p>
        </section>

        {/* Outreach & Participation */}
        <section>
          <h2 className="text-2xl font-semibold mb-4"> Outreach & Participation</h2>
          <p className="text-lg">
            We promote Pedal Safari at cycling clubs, universities, and conventions. To join:
          </p>
          <ol className="list-decimal list-inside space-y-2 mt-2 text-lg">
            <li>Fill out a medical form</li>
            <li>Sign our policies and waiver</li>
            <li>Register online</li>
          </ol>
          <p className="mt-2 text-lg">
            Early registration is encouraged. Airfare not included—discounts may be shared if available.
          </p>
        </section>

        {/* Event Route */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">2026 Event Route</h2>
          <p className="text-lg">
            The next event begins in Arusha, Tanzania, travels through Kenya, and concludes in Uganda.
            Divided into five legs, each offers competitive and non-competitive options.
          </p>
        </section>

        {/* Costs */}
        <section>
          <h2 className="text-2xl font-semibold mb-4"> What’s Included in the Costs</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Airport pickup and drop-off</li>
            <li>Lodging and camping</li>
            <li>Meals, snacks, and water</li>
            <li>Entertainment and cultural activities</li>
            <li>In-country transport and coordination</li>
            <li>Park entry fees (select parks)</li>
          </ul>
        </section>
      </div>
    </section>
  );
};

export default AboutUs;
