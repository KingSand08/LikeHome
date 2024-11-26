import React from "react";
import { retrieveSpecificReservation } from "@/server-actions/reservation-actions";
import Link from "next/link";
import { auth } from "@/auth";

const BookingIDPage = async ({
  params,
  searchParams,
}: {
  params: { bookingId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => { 
  const bookingId = params.bookingId;
  const isBookingSuccessful = searchParams.success === "true";
  const session = await auth();

  if (!session || !session.user.email) {
    return (
      <div>
        <h1>You must be logged in to view your reservation.</h1>
        <Link href="/bookings" className="p-2 bg-red-500 text-white">
          Navigate back to bookings page
        </Link>
      </div>
    );
  }

  const reservationDetails = await retrieveSpecificReservation(
    bookingId,
    session.user.email
  );

  if (!reservationDetails) {
    return (
      <div>
        <h1>Failed to load reservation details.</h1>
        <p>"An unexpected error occurred."</p>
        <Link href="/bookings" className="p-2 bg-red-500 text-white">
          Navigate back to bookings page
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Reservation Details for Booking ID: {bookingId}</h1>
      {isBookingSuccessful ? (
        <div>
          <h2>Booking Successful!</h2>
          <p>Thank you for your booking!</p>
        </div>
      ) : (
        <div>
          <h2>Reservation Details</h2>
        </div>
      )}
      <div>
        <p>
          <strong>Hotel ID:</strong> {reservationDetails.hotel_id}
        </p>
        <p>
          <strong>Room ID:</strong> {reservationDetails.room_id}
        </p>
        <p>
          <strong>Check-in Date:</strong> {reservationDetails.checkin_date}
        </p>
        <p>
          <strong>Check-out Date:</strong> {reservationDetails.checkout_date}
        </p>
        <p>
          <strong>Number of Adults:</strong> {reservationDetails.adults_number}
        </p>
        <p>
          <strong>Total Cost:</strong> $
          {reservationDetails.room_cost.toFixed(2)}
        </p>
      </div>
      <Link href="/bookings" className="p-2 bg-red-500 text-white">
        Navigate back to bookings page
      </Link>
    </div>
  );
};

export default BookingIDPage;
