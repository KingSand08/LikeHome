import { useState, useEffect } from "react";
import { Reservation, CachedHotel, CachedHotelRoomOffer } from "@prisma/client";
import { retrieveAllReservations } from "@/server-actions/reservation-actions";
import {
  retrieveCacheHotelDetails,
  retrieveCacheHotelRoomOffer,
} from "@/server-actions/cache-actions";
import Link from "next/link";
import User from "@/types/User";
import BookingPageItem from "./BookingPageItem";

type CachedData = {
  hotels: Record<string, CachedHotel>;
  roomOffers: Record<string, CachedHotelRoomOffer>;
};

const Bookings = ({ user }: { user: User }) => {
  const userEmail = user.email;

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

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Your Reservations</h1>
      <div className="overflow-x-auto">
        {reservations.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {reservations
              .slice() // Create a shallow copy of the array
              .sort((a, b) => {
                // First condition: Verified and not cancelled
                if (
                  a.verified &&
                  !a.is_cancelled &&
                  !(b.verified && !b.is_cancelled)
                )
                  return -1;
                if (
                  !(a.verified && !a.is_cancelled) &&
                  b.verified &&
                  !b.is_cancelled
                )
                  return 1;

                // Second condition: Not verified
                if (!a.verified && b.verified) return -1;
                if (a.verified && !b.verified) return 1;

                // Third condition: Cancelled but verified
                if (
                  a.is_cancelled &&
                  a.verified &&
                  !(b.is_cancelled && b.verified)
                )
                  return 1;
                if (
                  !(a.is_cancelled && a.verified) &&
                  b.is_cancelled &&
                  b.verified
                )
                  return -1;

                return 0; // Equal, preserve order
              })
              .map((reservation) => (
                <BookingPageItem
                  key={reservation.id}
                  reservation={reservation}
                  hotel={cachedData.hotels[reservation.hotel_id]}
                  roomOffer={cachedData.roomOffers[reservation.room_id]}
                />
              ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center my-7">
            You have no bookings! Go to{" "}
            <Link href={"/"} className="underline">
              home and search
            </Link>{" "}
            to get another booking!
          </p>
        )}
      </div>
    </div>
  );
};

export default Bookings;
