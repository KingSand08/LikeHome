"use client";

import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutInfo from "@/components/checkout/CheckoutInfo";
import { calculateNumDays } from "@/lib/DateFunctions";
import { fetchHotelRoomOffer } from "@/server-actions/api-actions";
import LoadingPage from "@/components/ui/Loading/LoadingPage";
import { ImageSlider } from "@/components/ui/ImageSlider";
import ErrorPage from "@/components/ui/ErrorPage";

export type BookingDetailsType = {
  checkin_date: string;
  checkout_date: string;
  adults_number: string;
  numDays: string;
  locale?: string;
  domain?: string;
  region_id: string;
  hotel_id: string;
  hotel_room_id: string;
};

const HotelRoomIDPage: React.FC = () => {
  const { hotelId: hotelIdSlug, roomId: roomIdSlug } = useParams();
  const searchParams = useSearchParams();

  const [hotelRoomData, setHotelRoomData] = useState<HotelRoomOffer | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    console.log("LOG: HotelRoomIDPage - useEffect()");
    const fetchData = async () => {
      setLoading(true);

      try {
        const HOTEL_ROOM_DATA = await fetchHotelRoomOffer(
          hotelIdSlug,
          roomIdSlug,
          searchParams
        );
        console.log("LOG: HotelRoomIDPage - HOTEL_ROOM_DATA", HOTEL_ROOM_DATA);
        if (!HOTEL_ROOM_DATA) {
          throw new Error("Hotel room offers not found");
        }
        setHotelRoomData(HOTEL_ROOM_DATA);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hotelIdSlug, roomIdSlug, searchParams]);

  // Collect searchParams into an object for display
  const bookingDetails: BookingDetailsType = {
    checkin_date: searchParams.get("checkin_date")!,
    checkout_date: searchParams.get("checkout_date")!,
    adults_number: searchParams.get("adults_number")!,
    numDays: searchParams.get("numDays")!,
    locale: searchParams.get("locale")!,
    domain: searchParams.get("domain")!,
    region_id: searchParams.get("region_id")!,
    hotel_id: hotelIdSlug[0],
    hotel_room_id: roomIdSlug[0],
  };

  if (loading) {
    return (
      <LoadingPage className="min-h-screen" size_style={{ width: '400px', height: '400px' }} />
    );
  }

  if (error || !hotelRoomData) {
    return <ErrorPage />;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col space-y-5 justify-between items-start w-full">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        Finalize Your Booking Details
      </h1>

      {/* Booking Details about the Hotel Section */}
      <div className="w-full mt-12 p-8 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
          Booking Details
        </h2>
        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
          {Object.entries(bookingDetails).map(([key, value]) => (
            <li
              key={key}
              className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 pb-3"
            >
              <span className="font-medium capitalize text-gray-800 dark:text-gray-100">
                {key.replace("_", " ")}:
              </span>
              <span
                className={`text-lg font-semibold ml-2 ${value ? "text-primary" : "text-error"
                  }`}
              >
                {value || "N/A"}
              </span>
            </li>
          ))}
        </ul>
      </div>


      {/* Hotel Room Information */}
      <div className="w-full mt-12 p-8 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg flex flex-col md:flex-row gap-10 mb-8">
        {/* Left Column - Room Details */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Room Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            <span className="font-semibold">Hotel ID:</span> {hotelIdSlug} |{" "}
            <span className="font-semibold">Room ID:</span> {roomIdSlug}
          </p>

          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {hotelRoomData.name}
          </h3>
          <p
            className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: hotelRoomData.description }}
          ></p>

          <div
            className={`text-xl font-semibold mb-6 ${
              hotelRoomData.pricePerNight.amount > 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
          </div>
        </div>

        {/* Right Column - Image Slider */}
        <div className="md:w-1/2">
          <ImageSlider images={hotelRoomData.galleryImages} />
        </div>
      </div>

      <div className="w-full p-8 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg mb-8">
        {/* Booking Info and Checkout Section */}
        {hotelRoomData &&
          bookingDetails &&
          hotelRoomData.pricePerNight.amount > 0 ? (
          <CheckoutInfo
            pricePerDay={hotelRoomData.pricePerNight.amount}
            numberOfDays={calculateNumDays(
              bookingDetails.checkin_date!,
              bookingDetails.checkout_date!
            )}
            currencySymbol={hotelRoomData.pricePerNight.currency.symbol}
            currencyCode={hotelRoomData.pricePerNight.currency.code}
            hotelRoomOffer={hotelRoomData}
            bookingDetails={bookingDetails}
          />
        ) : (
          <h1 className="text-red-500 font-bold">
            Hotel Room is unavailable for booking.
          </h1>
        )}
      </div>
    </div>
  );
};

export default HotelRoomIDPage;
