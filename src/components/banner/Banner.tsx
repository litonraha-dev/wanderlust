import { Button } from "@/components/ui/button";
import React from "react";

const Banner = () => {
  return (
    
<div>
  <section
    className="relative flex min-h-[600px] items-center bg-cover bg-center bg-no-repeat px-6 py-12 md:px-16"
    style={{
      backgroundImage: "url('/images/Banner.png')",
    }}
  >
    {/* Dark Overlay */}
    <div className="absolute inset-0"></div>

    {/* Main Content */}
    <div className="relative z-10 mx-auto w-full max-w-7xl text-white">
      {/* Heading and Buttons */}
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold md:text-6xl">
          Discover Your Next Adventure
        </h1>

        <h2 className="mt-4 text-base leading-7 md:text-lg">
          Explore breathtaking destinations and create unforgettable
          memories with our curated travel experiences.
        </h2>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button className="rounded-none border-0 bg-[#15A1BF] px-6 hover:bg-[#1189a3]">
            EXPLORE NOW
          </Button>

          <Button className="rounded-none border-0 bg-gray-200 px-6 text-black hover:bg-white">
            VIEW DESTINATION
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-12 grid grid-cols-1 gap-4 rounded-lg bg-white p-5 text-gray-800 shadow-lg sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className="mb-2 block font-semibold">Location</label>
         
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Date / Duration
          </label>
          
        </div>

        <div>
          <label className="mb-2 block font-semibold">Budget</label>
         
        </div>

        <div>
          <label className="mb-2 block font-semibold">People</label>
         
        </div>

        <div className="flex items-end">
          <Button className="w-full rounded bg-[#15A1BF] py-2 text-white hover:bg-[#1189a3]">
            Search
          </Button>
        </div>
      </div>
    </div>
  </section>
</div>

  );
};

export default Banner;
