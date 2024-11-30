"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Reservation, CachedHotel, CachedHotelRoomOffer } from "@prisma/client";
import { retrieveAllReservations } from "@/server-actions/reservation-actions";
import {
  retrieveCacheHotelDetails,
  retrieveCacheHotelRoomOffer,
} from "@/server-actions/cache-actions";
import Link from "next/link";
import HTMLSafeDescription from "@/components/booking/HTMLDescription";


type CachedData = {
  hotels: Record<string, CachedHotel>;
  roomOffers: Record<string, CachedHotelRoomOffer>;
};

const BookingsPage = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [cachedData, setCachedData] = useState<CachedData>({
    hotels: {},
    roomOffers: {},
  });

  useEffect(() => {
    if (userEmail) {
      const fetchReservations = async () => {
        try {
          const reservationsData = await retrieveAllReservations(userEmail);

          if (reservationsData) {
            const hotelsCache: Record<string, CachedHotel> = {};
            const roomOffersCache: Record<string, CachedHotelRoomOffer> = {};

            for (const reservation of reservationsData) {
              if (!hotelsCache[reservation.hotel_id]) {
                const hotelDetails = await retrieveCacheHotelDetails(
                  reservation.hotel_id
                );
                if (hotelDetails) {
                  hotelsCache[reservation.hotel_id] = hotelDetails;
                }
              }

              if (!roomOffersCache[reservation.room_id]) {
                const roomOffer = await retrieveCacheHotelRoomOffer(
                  reservation.room_id
                );
                if (roomOffer) {
                  roomOffersCache[reservation.room_id] = roomOffer;
                }
              }
            }

            setReservations(reservationsData);
            setCachedData({ hotels: hotelsCache, roomOffers: roomOffersCache });
          }
        } catch (error) {
          console.error("Error fetching reservations:", error);
        }
      };

      fetchReservations();
    }
  }, [userEmail]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !userEmail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">
          Please sign in to view bookings and reservations!
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Your Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reservations.map((reservation) => {
          const hotel = cachedData.hotels[reservation.hotel_id];
          const roomOffer = cachedData.roomOffers[reservation.room_id];

          return (
            <div
              key={reservation.bookingId}
              className="card bg-base-100 shadow-lg p-6 rounded-lg"
            >
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
              <p className="text-sm mb-2">
                Check-in: {reservation.checkin_date}
              </p>
              <p className="text-sm mb-2">
                Check-out: {reservation.checkout_date}
              </p>
              <p className="text-sm mb-4">
                Total Cost:{" "}
                <span className="font-bold">
                  ${reservation.room_cost.toFixed(2)}
                </span>
              </p>
              <p className="text-sm mb-2">
                Booking ID: {reservation.bookingId}
              </p>
              {hotel?.images?.[0]?.url && (
                <img
                  src={hotel.images[0].url}
                  alt={hotel.tagline}
                  className="rounded-lg mb-4"
                />
              )}
              <Link
                href={`/bookings/${reservation.bookingId}`}
                className="btn btn-primary w-full"
              >
                View Booking Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingsPage;
