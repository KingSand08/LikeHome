// import React from 'react'

// const ReservationPage = () => {
//   return (
//     <div>ReservationPage</div>
//     //Import reservation page will have reservation form 
    
//   )
// }

// export default ReservationPage



"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

const ReservationPage: React.FC = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [guests, setGuests] = useState<number>(1);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Fetch the userId and roomId dynamically if required
    const userId = "sampleUserId";  //Figure out how to get the userID
    const roomId = "sampleRoomId";  //Figure out how to geth teh roomID 

    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        roomId,
        startDate,
        endDate,
        guests,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // Redirect to payment page with reservationId and totalAmount
      router.push(`/payment?reservationId=${data.reservationId}&totalAmount=${data.totalAmount}`);
    } else {
      alert(data.error || "Failed to create reservation");
    }
  };

  return (
    <div className="h-[75vh] flex items-center justify-center">
      <div className="bg-white flex rounded-lg w-3/4">
        <div className="flex-1 text-gray-800 p-20">
          <h1 className="text-3xl pb-4">Reserve Your Room</h1>
          <p className="text-lg text-gray-700">
            Fill out the form below to complete your reservation.
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <label className="block mb-4">
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                required
                className="block mt-1 p-2 border-2 border-gray-600 rounded-md w-full focus:border-purple-600 focus:ring-purple-500 focus:outline-none"
              />
            </label>
            <label className="block mb-4">
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                required
                className="block mt-1 p-2 border-2 border-gray-600 rounded-md w-full focus:border-purple-600 focus:ring-purple-500 focus:outline-none"
              />
            </label>
            <label className="block mb-6">
              Guests:
              <input
                type="number"
                value={guests}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setGuests(Number(e.target.value))}
                min="1"
                required
                className="block mt-1 p-2 border-2 border-gray-600 rounded-md w-full focus:border-purple-600 focus:ring-purple-500 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Reserve Now
            </button>
          </form>
        </div>
        <div className="relative flex-1">
          <Image
            alt="Room Image"
            src="/roomImage.jpg"  //Replace this with actual image path
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
