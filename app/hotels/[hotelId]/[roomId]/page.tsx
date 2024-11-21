"use client";
import {
  APIHotelRoomOffersJSONFormatted,
  HotelRoomOffer,
} from "@/app/api/hotels/search/rooms/route";
import { HOTEL_ROOM_OFFERS_API_URL } from "@/lib/rapid-hotel-api/constants/ROUTES";
import { JSONToURLSearchParams } from "@/lib/rapid-hotel-api/APIFunctions";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutInfo from "@/components/checkout/CheckoutInfo";
import { calculateNumDays } from "@/lib/DateFunctions";
import Image from "next/image";

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
    const handleFindValidHotelRoom = async () => {
      setLoading(true);
      setError(false);

      const queryParams = Object.fromEntries(searchParams.entries());
      const hotelRoomJSON = {
        ...queryParams,
        hotel_id: hotelIdSlug,
      };
      const urlParams = JSONToURLSearchParams(hotelRoomJSON);

      try {
        const response = await fetch(
          `${HOTEL_ROOM_OFFERS_API_URL}?${urlParams.toString()}`
        );
        if (!response.ok) {
          throw new Error("Failed to retrieve hotel room offers");
        } else {
          const HOTEL_ROOM_DATA: APIHotelRoomOffersJSONFormatted =
            await response.json();
          const room = HOTEL_ROOM_DATA.hotelRoomOffers.find(
            (offer) => offer.hotel_room_id === roomIdSlug
          );
          setHotelRoomData(room || null);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    handleFindValidHotelRoom();
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
      <div>
        <p className="text-center text-lg font-medium text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  if (error || !hotelRoomData) {
    return (
      <div>
        <p className="text-center text-lg font-medium text-red-500">
          Error loading hotel room data (Error: {error})
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Finalize Your Booking Details
      </h1>

      {/* Hotel Room Information */}
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Room Information
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Hotel ID: <span className="font-semibold">{hotelIdSlug}</span> | Room
          ID: <span className="font-semibold">{roomIdSlug}</span>
        </p>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {hotelRoomData.name}
          </h3>
          <p
            className="text-gray-700 mb-4 px-4"
            dangerouslySetInnerHTML={{ __html: hotelRoomData.description }}
          ></p>

          <div
            className={`text-lg font-medium mb-6 ${
              hotelRoomData.pricePerNight.amount > 0
                ? "text-blue-700"
                : "text-red-500"
            }`}
          >
            {hotelRoomData.pricePerNight.amount > 0 ? (
              <>
                Price per night: {hotelRoomData.pricePerNight.currency.symbol}
                {hotelRoomData.pricePerNight.amount}{" "}
                {hotelRoomData.pricePerNight.currency.code}
              </>
            ) : (
              "Unavailable for booking"
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {hotelRoomData.galleryImages.map((image) => (
              <div key={image.index} className="flex flex-col items-center">
                <Image
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  width={500}
                  height={500}
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {image.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Details about the Hotel Section */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Booking Details (about hotel)
          </h2>
          <ul className="space-y-3 text-center">
            {Object.entries(bookingDetails).map(([key, value]) => (
              <li key={key} className="text-md text-gray-700">
                <strong className="text-gray-900">
                  {key.replace("_", " ")}
                </strong>
                :<span className="text-blue-700 ml-2">{value ?? "N/A"}</span>
              </li>
            ))}
          </ul>
        </div>

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
