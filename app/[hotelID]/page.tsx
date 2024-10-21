import { PrismaClient } from '@prisma/client';
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

  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');
  const [roomType, setRoomType] = React.useState<string>('single');

  if (!hotel) {
    return <div className="text-center p-6">Hotel not found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4">{hotel.name}</h1>
        <p className="text-lg mb-4">{hotel.description}</p>
        <p className="text-sm text-gray-600 mb-4">
          Location: {hotel.location.address}, {hotel.location.city}, {hotel.location.state}, {hotel.location.zip}
        </p>

        <p className="text-lg font-bold text-indigo-600 mb-4">${hotel.pricePerNight} / night</p>

        <div className="mb-4">
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
            Choose Room Type
          </label>
          <select
            id="roomType"
            name="roomType"
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="single">Single Room (Available: {hotel.singleRoomsAvailable})</option>
            <option value="double">Double Room (Available: {hotel.doubleRoomsAvailable})</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn btn-primary w-full"
          onClick={() => alert(`Reserving ${roomType} room from ${startDate} to ${endDate}`)}
        >
          Reserve Now
        </button>
      </div>
    </div>
  );
}
