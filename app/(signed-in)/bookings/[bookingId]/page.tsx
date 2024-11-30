"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { CachedHotel, CachedHotelRoomOffer, Reservation } from "@prisma/client";
import { retrieveSpecificReservation } from "@/server-actions/reservation-actions";
import {
  retrieveCacheHotelDetails,
  retrieveCacheHotelRoomOffer,
} from "@/server-actions/cache-actions";
import Link from "next/link";
import HTMLSafeDescription from "@/components/booking/HTMLDescription";

const BookingIDPage = () => {
  const { bookingId: bookingIdSlug } = useParams();
  const { data: session, status } = useSession();

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [hotel, setHotel] = useState<CachedHotel | null>(null);
  const [roomOffer, setRoomOffer] = useState<CachedHotelRoomOffer | null>(null);

  useEffect(() => {
    const fetchReservationAndDetails = async () => {
      if (!bookingIdSlug || !session?.user?.email) return;

      try {
        const reservationData = await retrieveSpecificReservation(
          bookingIdSlug as string,
          session.user.email
        );

        if (reservationData) {
          setReservation(reservationData);

          const hotelDetails = await retrieveCacheHotelDetails(
            reservationData.hotel_id
          );
          setHotel(hotelDetails || null);

          const roomOfferDetails = await retrieveCacheHotelRoomOffer(
            reservationData.room_id
          );
          setRoomOffer(roomOfferDetails || null);
        }
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      }
    };

    fetchReservationAndDetails();
  }, [bookingIdSlug, session?.user?.email]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user?.email) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">
          Please sign in to view your booking!
        </p>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">
          No reservation found for Booking ID: {bookingIdSlug}.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Reservation Details
      </h1>
      <div className="card bg-base-100 shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          {hotel?.tagline || "Hotel details not available"}
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          {hotel?.location?.address
            ? `${hotel.location.address.addressLine}, ${hotel.location.address.city}, ${hotel.location.address.province}, ${hotel.location.address.countryCode}`
            : "Address not available"}
        </p>
        <p className="font-medium mb-2">
          Room: {roomOffer?.name || "Room details not available"}
        </p>
        <HTMLSafeDescription html={roomOffer?.description} />
        <p className="text-sm mb-2">Check-in: {reservation.checkin_date}</p>
        <p className="text-sm mb-2">Check-out: {reservation.checkout_date}</p>
        <p className="text-sm mb-2">Adults: {reservation.adults_number}</p>
        <p className="text-sm mb-2">Number of Days: {reservation.numDays}</p>
        <p className="text-sm mb-4">
          Total Cost:{" "}
          <span className="font-bold">${reservation.room_cost.toFixed(2)}</span>
        </p>
        <p className="text-sm mb-4">
          Verified: {reservation.verified ? "Yes" : "No"}
        </p>
        <p className="text-sm mb-2">Booking ID: {reservation.id}</p>
        {hotel?.images?.[0]?.url && (
          <img
            src={hotel.images[0].url}
            alt={hotel.tagline}
            className="rounded-lg mb-4"
          />
        )}
        <Link href="/bookings" className="btn btn-primary w-full">
          Back to Bookings
        </Link>
      </div>
    </div>
  );
};

export default BookingIDPage;
