"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  PartialReservation,
  retrieveSpecificReservation,
} from "@/server-actions/reservation-actions";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Page = () => {
  const { bookingId: bookingIdSlug } = useParams();
  const searchParams = useSearchParams();
  const isBookingSuccessful = searchParams.get("success") === "true";
  const { data: session, status } = useSession();
  const [reservation, setReservation] = useState<PartialReservation | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const fetchedReservation = await retrieveSpecificReservation(
          bookingIdSlug.toString(),
          session?.user.email!
        );

        setReservation(fetchedReservation);
      } catch (error: any) {
        console.error("Error fetching reservation:", error.message);
        setError(
          `Unable to fetch reservation details. ${
            session?.user?.email || "no email"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && session && session.user.email) {
      fetchReservation();
    } else if (status === "unauthenticated") {
      setError("You must be logged in to view your reservation.");
      setLoading(false);
    }
  }, [bookingIdSlug, session, status]);

  if (loading) {
    return <div>Loading reservation details...</div>;
  }

  if (!reservation || error) {
    return (
      <div>
        Failed to load reservation details.
        <Link href="/bookings" className="p-2 bg-red-500 text-white">
          Navigate back to bookings page
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>
        Dynamic booking page. This is the specific booking ID: {bookingIdSlug}
      </h1>

      {/* Custom greeting message */}
      <div className="mb-10">
        {isBookingSuccessful ? (
          <div>
            <h1 className="text-3xl font-extrabold mb-2">
              Booking Successful!
            </h1>
            <h2 className="text-2xl">Thank you for your booking!</h2>
            <p>Your stay is confirmed. We hope you enjoy your time with us!</p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-extrabold mb-2">
              Thank you! Here are your reservation details.
            </h1>
            <h2 className="text-2xl">Enjoy Your Stay!</h2>
          </div>
        )}
      </div>

      {/* Display reservation details */}
      <div>
        <h2>Reservation Details</h2>
        <p>
          <strong>Hotel ID:</strong> {reservation.hotel_id}
        </p>
        <p>
          <strong>Room ID:</strong> {reservation.room_id}
        </p>
        <p>
          <strong>Check-in Date:</strong> {reservation.checkin_date}
        </p>
        <p>
          <strong>Check-out Date:</strong> {reservation.checkout_date}
        </p>
        <p>
          <strong>Number of Adults:</strong> {reservation.adults_number}
        </p>
        <p>
          <strong>Total Cost:</strong> ${reservation.room_cost.toFixed(2)}
        </p>
      </div>

      <Link href="/bookings" className="p-2 bg-red-500 text-white">
        Navigate back to bookings page
      </Link>
    </div>
  );
};

export default Page;
