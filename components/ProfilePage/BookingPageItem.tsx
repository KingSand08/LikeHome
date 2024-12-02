"use client";

import Link from "next/link";
import { CachedHotel, CachedHotelRoomOffer, Reservation } from "@prisma/client";
import { ImageSlider } from "../ui/ImageSlider";

type BookPageItemProps = {
  reservation: Reservation;
  hotel?: CachedHotel;
  roomOffer?: CachedHotelRoomOffer;
};

const BookingPageItem = ({
  reservation,
  hotel,
  roomOffer,
}: BookPageItemProps) => {
  const images =
    roomOffer?.galleryImages.slice(0, 5).map(({ url, description }) => ({
      url,
      description: description || "Sample Image",
    })) || [];

  // Determine the title and color based on the status of the reservation
  const isProblematic = reservation.is_cancelled || !reservation.verified;
  const titleText = reservation.is_cancelled
    ? "Cancelled"
    : !reservation.verified
    ? "Not Verified. Please resolve immediately."
    : "Confirmed";
  const titleClass = isProblematic
    ? "text-red-600 font-bold"
    : "text-green-600 font-bold";

  return (
    <div
      key={reservation.id}
      className="w-full max-w-sm max-[1300px]:max-w-full flex-shrink-0 bg-white dark:bg-slate-800 shadow-xl rounded-lg overflow-hidden border-[3px] border-gray-200 dark:border-[#313f57]"
    >
      {/* Hotel Tagline */}
      <div
        className={`text-center p-4 ${
          "bg-gradient-to-r from-blue-800 to-indigo-600"
        } text-white`}
      >
        <h2 className="text-lg font-bold">{hotel?.tagline || "Hotel details not available"}</h2>
        <p className={`mt-2 ${titleClass}`}>{titleText}</p>
      </div>

      {/* Room Images */}
      <div className="px-3 pt-4">
        <ImageSlider images={images} />
      </div>

      {/* Details Section */}
      <div className="p-4 flex flex-col gap-2">
        <p className="text-sm font-medium">
          Room:{" "}
          <span className="text-gray-700 dark:text-gray-400">
            {roomOffer?.name || "Room details not available"}
          </span>
        </p>

        <p className="text-sm font-medium">
          Check-in:{" "}
          <span className="text-info font-semibold">
            {reservation.checkin_date}
          </span>
        </p>
        <p className="text-sm font-medium">
          Check-out:{" "}
          <span className="text-info font-semibold">
            {reservation.checkout_date}
          </span>
        </p>

        <p className="text-lg font-bold text-success">
          Total Cost: ${reservation.room_cost.toFixed(2)}
        </p>
      </div>

      {/* Booking Details Button */}
      <div className="p-4 bg-gray-50 dark:bg-slate-900">
        <Link
          href={`/bookings/${reservation.id}`}
          className="btn btn-primary w-full text-sm sm:text-base"
        >
          View Booking Details
        </Link>
      </div>
    </div>
  );
};

export default BookingPageItem;
