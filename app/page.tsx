import React from 'react';
import Card from '@/components/layout/Card';
import SearchBox from '@/components/layout/SearchBox'

const roomData = [1, 2, 3, 4, 5] as const;


export default function HomePage() {
  return (
    <main className="">
      {/* Hero Section */}
      <div
        className="hero min-h-screen relative flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Adjusted Hero Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Welcome Text */}
        <div className="hero-content text-neutral-content text-center mb-10 relative z-10">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Feels LikeHome</h1>
            <p className="mb-5">Make yourself feel like home</p>
            <button className="btn btn-info">Browse</button>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <section className="w-full py-20 bg-base-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-base-content">Our Rooms</h2>
          <p className="text-lg mt-2">Choose from our wide variety of rooms</p>
        </div>

        <SearchBox  />

        {/* Filter Section */}
        <div className="flex justify-center mb-8">
          <div className="join flex max-w-md">
            <button className="join-item btn btn-info flex-1">All</button>
            <button className="join-item btn btn-info flex-1">Single</button>
            <button className="join-item btn btn-info flex-1">Double</button>
            <button className="join-item btn btn-info flex-1">Extended</button>
          </div>
        </div>

        {/* Cards Container */}
        <div className="w-full flex justify-center">
          <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
            {roomData.map((room) => (
              <Card key={room} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
