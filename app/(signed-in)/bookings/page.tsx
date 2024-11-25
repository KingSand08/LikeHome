"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  PartialReservation,
  retrieveAllReservations,
} from "@/server-actions/reservation-actions";
import Link from "next/link";

const BookingsPage = () => {
  const { data: session, status } = useSession();
  const [reservations, setReservations] = useState<PartialReservation[] | []>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!session || !session.user.email) {
        setLoading(false);
        setError("You must be logged in to view your reservations.");
        return;
      }

      try {
        const fetchedReservations = await retrieveAllReservations(
          session.user.email
        );
        setReservations(fetchedReservations);
      } catch (error: any) {
        console.error("Error retrieving reservations:", error.message);
        setError("Failed to load reservations.");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchReservations();
    }
  }, [session, status]);

  if (loading) {
    return <div>Loading your reservations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (reservations.length === 0) {
    return <div>You have no reservations.</div>;
  }

  return (
    <div>
      <h1>Your Reservations</h1>
      <ul className="list-disc pl-6">
        {reservations.map((reservation) => (
          <li key={reservation.bookingId} className="mb-4">
            <div>
              <strong>Booking ID:</strong> {reservation.bookingId}
            </div>
            <div>
              <strong>Hotel ID:</strong> {reservation.hotel_id}
            </div>
            <div>
              <strong>Room ID:</strong> {reservation.room_id}
            </div>
            <div>
              <strong>Check-in Date:</strong> {reservation.checkin_date}
            </div>
            <div>
              <strong>Check-out Date:</strong> {reservation.checkout_date}
            </div>
            <div>
              <strong>Number of Adults:</strong> {reservation.adults_number}
            </div>
            <div>
              <strong>Total Cost:</strong> ${reservation.room_cost.toFixed(2)}
            </div>
            <Link
              href={`/bookings/${reservation.bookingId}`}
              className="p-2 bg-green-500 text-white"
            >
              Link to specific booking
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsPage;
