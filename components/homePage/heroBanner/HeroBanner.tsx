import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-[80vh] sm:h-[80vh]">
      {/* {overlay} */}
      <div className="absolute w-full h-full bg-green-900 opacity-70"></div>
      <video
        className="w-full h-full object-cover"
        src="/images/hero1.mp4"
        autoPlay
        loop
        muted
        preload="metadata"
      />
      {/* text content */}
      <div className="absolute top-20 left-[50%] w-full h-full translate-x-[-50%]">
        <div>
          <h1 className="text-[30px] md:text-[40px] lg:text-[50px] tracking-[0.7rem] font-bold mb-4 text-white uppercase text-center">
            PEDAL SAFARI TOURS
          </h1>
          <h3 className="text-[20px] md:text-[30px] lg:text-[40px] tracking-[0.5rem] font-semibold mb-4 text-white uppercase text-center">
            Travel in Sync with Nature
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-[70%] text-white">
          <p
            className="text-lg text-white text-center font-normal"
            style={{ wordSpacing: "5px" }}
          >
            Join us for an unforgettable cycling adventure
          </p>
          <Link
            href="#featured-tours"
            className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
          >
            Explore Tours
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
