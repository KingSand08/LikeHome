"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation'; // Import useParams from next/navigation

const ReservationPage: React.FC = () => {
  const { hotelID } = useParams(); // Get hotelID from the URL parameters
  const [adultsNumber, setAdultsNumber] = useState<number>(1);
  const [numDays, setNumDays] = useState<number>(1);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const bookingDetails = {
      account_id: "<account ID>", // Need to route with users ID
      date_created: new Date().toISOString(),
      checkin_date: new Date().toISOString(),
      checkout_date: new Date(new Date().setDate(new Date().getDate() + numDays)).toISOString(),
      adults_number: adultsNumber,
      numDays: numDays, locale: "en-US",
      domain: window.location.hostname,
      region_id: "<region ID>", // need to set this based data flow
      hotel_id: hotelID, // Use the hotelID from the route
      room_id: "<room ID>" // need to get room id from data flow
    };

    // send booking details to payment system for amount of days
    console.log('Booking Details:', bookingDetails);
  };

  return (
    <div>
      <h1>Reserve a Room at Hotel ID: {hotelID}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Adults:
          <input
            type="number"
            value={adultsNumber}
            onChange={(e) => setAdultsNumber(Number(e.target.value))}
            min="1"
          />
        </label>
        <br />
        <label>
          Number of Days:
          <input
            type="number"
            value={numDays}
            onChange={(e) => setNumDays(Number(e.target.value))}
            min="1"
          />
        </label>
        <br />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default ReservationPage;
