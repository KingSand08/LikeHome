import { PrismaClient } from '@prisma/client';
import ReservationForm from '@/components/ReservationForm'; // Import client component
import React from 'react';

const prisma = new PrismaClient();

async function getHotelData(hotelID: string) {
  const hotel = await prisma.hotel.findUnique({
    where: {
      id: hotelID,
    },
    select: {
      name: true,
      description: true,
      pricePerNight: true,
      singleRoomsAvailable: true,
      doubleRoomsAvailable: true,
      location: {
        select: {
          address: true,
          city: true,
          state: true,
          zip: true,
        },
      },
    },
  });

  return hotel;
}

type HotelPageProps = {
  params: {
    hotelID: string;
  };
};

export default async function HotelPage({ params }: HotelPageProps) {
  const hotel = await getHotelData(params.hotelID);

  if (!hotel) {
    return <div className="text-center p-6">Hotel not found.</div>;
  }

  return (
    <div className="bg-base-200 min-h-screen flex flex-col items-center justify-center">
      <div className="container max-w-6xl p-10 space-y-8">
        <h1 className="text-5xl font-bold text-base-content mb-4">{hotel.name}</h1>
        <p className="text-xl text-base-content mb-4">{hotel.description}</p>
        <p className="text-lg text-gray-600 mb-4">
          Location: {hotel.location.address}, {hotel.location.city}, {hotel.location.state}, {hotel.location.zip}
        </p>
        <p className="text-3xl font-bold text-primary mb-6">${hotel.pricePerNight} / night</p>

        {/* Pass hotel data to the ReservationForm client component */}
        <ReservationForm
          pricePerNight={hotel.pricePerNight}
          singleRoomsAvailable={hotel.singleRoomsAvailable}
          doubleRoomsAvailable={hotel.doubleRoomsAvailable}
        />
      </div>
    </div>
  );
}
