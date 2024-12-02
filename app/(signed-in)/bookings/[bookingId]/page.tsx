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
import Image from "next/image";
import HTMLSafeDescription from "@/components/booking/HTMLDescription";
import EditAdultsNumber from "@/components/booking/EditAdultsNumber";
import DeleteReservation from "@/components/booking/EditCancelReservation";

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
      {/* Hero Section */}
      {hotel?.images?.[0]?.url && (
        <div
          className="h-64 bg-cover bg-center rounded-lg shadow-md mb-6"
          style={{ backgroundImage: `url(${hotel.images[0].url})` }}
        >
          <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white text-center">
              {hotel.tagline || "Reservation Details"}
            </h1>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Details */}
        <div className="lg:col-span-2">
          <div className="bg-base-100 shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              {hotel?.tagline || "Hotel details not available"}
            </h2>
            <p className="text-md text-gray-600 mb-4">
              {hotel?.location?.address
                ? `${hotel.location.address.addressLine}, ${hotel.location.address.city}, ${hotel.location.address.province}, ${hotel.location.address.countryCode}`
                : "Address not available"}
            </p>
            <p className="text-lg font-medium mb-4">
              Room:{" "}
              <span className="text-info">
                {roomOffer?.name || "Room details not available"}
              </span>
            </p>
            <HTMLSafeDescription html={roomOffer?.description} />

            <div className="grid grid-cols-2 gap-4 mt-6">
              <p className="text-md">
                <span className="font-bold text-primary">Check-in:</span>{" "}
                {reservation.checkin_date}
              </p>
              <p className="text-md">
                <span className="font-bold text-primary">Check-out:</span>{" "}
                {reservation.checkout_date}
              </p>
              <div className="col-span-2">
                <EditAdultsNumber
                  reservation={reservation}
                  onUpdate={setReservation}
                />
              </div>
              <p className="text-md">
                <span className="font-bold text-primary">Number of Days:</span>{" "}
                {reservation.numDays}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-2xl font-bold text-success">
                Total Cost: ${reservation.room_cost.toFixed(2)}
              </p>
              <p className="text-md mt-2">
                Verified:{" "}
                <span
                  className={`${
                    reservation.verified ? "text-success" : "text-error"
                  } font-bold`}
                >
                  {reservation.verified ? "Yes" : "No"}
                </span>
              </p>
              <p className="text-md mt-2 text-gray-600">
                Booking ID: {reservation.id}
              </p>
            </div>
          </div>
        </div>

        {/* Room Gallery */}
        {roomOffer?.galleryImages && roomOffer.galleryImages.length > 0 && (
          <div className="bg-base-100 shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-semibold mb-4 text-primary">
              Room Gallery
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {roomOffer.galleryImages.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image.url}
                    alt={image.description || "Room Image"}
                    width={300}
                    height={200}
                    className="w-full h-auto rounded-lg shadow"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cancel Reservation */}
      <div className="mt-6">
        <DeleteReservation reservation={reservation} />
      </div>

      <div className="mt-6">
        <Link href="/bookings" className="btn btn-primary w-full">
          Back to Bookings
        </Link>
      </div>
    </div>
  );
};

export default BookingIDPage;
