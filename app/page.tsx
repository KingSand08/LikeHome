import React from 'react';
import Card from '@/components/layout/Card';
import SearchBox from '@/components/layout/SearchBox';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch hotel data and display without filtering
export default async function HomePage() {
  // Fetch hotel data from Prisma
  const hotels = await prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      pricePerNight: true,
      location: {
        select: {
          state: true,
        },
      },
    },
  });

  return (
    <main className="">
      {/* Hero Section */}
      <div
        className="hero h-64 relative flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center mb-10 relative z-10">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold">Feels Like Home</h1>
            <p>Make yourself feel like home</p>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <section className="w-full py-12 bg-base-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-base-content">Our Rooms</h2>
          <p className="text-lg mt-2 text-base-content">Choose from our wide variety of rooms</p>
        </div>

        <SearchBox />

        {/* Cards Container */}
        <div className="w-full flex justify-center">
          <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
            {hotels.map((hotel) => (
              <Card
                key={hotel.id}
                name={hotel.name}
                description={hotel.description}
                price={hotel.pricePerNight}
                location={hotel.location.state}
                imageUrl="/hotelRoom.jpg" // Default image for now
                hotelId={hotel.id}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
