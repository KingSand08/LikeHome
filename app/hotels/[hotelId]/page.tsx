"use client";
import HotelRoomList from "@/components/booking/HotelRooms/HotelRoomList";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
import { JSONToURLSearchParams } from "@/lib/rapid-hotel-api/APIFunctions";
import {
  HOTEL_DETAILS_API_URL,
  HOTEL_ROOM_OFFERS_API_URL,
} from "@/lib/rapid-hotel-api/constants/ROUTES";
import { APIHotelRoomOffersJSONFormatted } from "@/app/api/hotels/search/rooms/route";
import {
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
import Image from "next/image";

type CompleteHotelInfo = {
  hotelDetails: APIHotelDetailsJSONFormatted | null;
  hotelRooms: APIHotelRoomOffersJSONFormatted | null;
} | null;

const HotelIDPage: React.FC = () => {
  const { hotelId: hotelIdSlug } = useParams();
  const searchParams = useSearchParams();
  const [hotelData, setHotelData] = useState<CompleteHotelInfo>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const findValidHotelDetails = async () => {
      setLoading(true);
      setHotelData(null);

      const hotelDetailsJSON = {
        domain: searchParams.get("domain") || DEFAULT_DOMAIN,
        locale: searchParams.get("locale") || DEFAULT_LOCALE,
        hotel_id: hotelIdSlug,
      };
      const urlParams = JSONToURLSearchParams(hotelDetailsJSON);

      try {
        const response = await fetch(
          `${HOTEL_DETAILS_API_URL}?${urlParams.toString()}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to retrieve hotel details. ${response.statusText} ${response.status}`
          );
        }
        const HOTEL_DETAILS_DATA: APIHotelDetailsJSONFormatted =
          await response.json();
        setHotelData({
          hotelDetails: HOTEL_DETAILS_DATA,
          hotelRooms: null,
        });
        await handleFindValidHotelRoom(); // Call room API only if hotel details are successfully fetched
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch completion
      }
    };

    const handleFindValidHotelRoom = async () => {
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
        }
        const HOTEL_ROOM_DATA: APIHotelRoomOffersJSONFormatted =
          await response.json();
        setHotelData((prev) => ({
          hotelDetails: prev?.hotelDetails!,
          hotelRooms: HOTEL_ROOM_DATA,
        }));
      } catch (error) {
        setError(true);
      }
    };

    findValidHotelDetails();
  }, [hotelIdSlug, searchParams]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !hotelData) {
    return <p>Error loading hotel data.</p>;
  }

  const { hotelDetails, hotelRooms } = hotelData;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hotel Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{hotelDetails?.name}</h1>
        <h2 className="text-xl text-white">{hotelDetails?.tagline}</h2>
      </div>

      {/* Hotel Location */}
      <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4 text-black">Location</h3>
        <div className="text-gray-700 space-y-2">
          <p>{hotelDetails?.location.address.addressLine}</p>
          <p>
            {hotelDetails?.location.address.city},{" "}
            {hotelDetails?.location.address.province}
          </p>
          <p>{hotelDetails?.location.address.countryCode}</p>
          <p>Latitude: {hotelDetails?.location.coordinates.latitude}</p>
          <p>Longitude: {hotelDetails?.location.coordinates.longitude}</p>
        </div>
      </div>

      {/* Hotel Images */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotelDetails?.images
            .sort((a, b) => a.description.localeCompare(b.description))
            .map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover"
                />
                <p className="text-center p-2 text-white">
                  {image.description}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Room Offers */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">Room Offers</h2>
        {hotelRooms ? (
          <div>
            <p className="text-gray-700 mb-6">
              Base Price Per Night:{" "}
              <span className="font-semibold">
                {hotelRooms.basePricePerNight}
              </span>
            </p>
            <div>
              <h3 className="text-xl font-semibold mb-4">Room List</h3>
              <HotelRoomList rooms={hotelRooms.hotelRoomOffers} />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No rooms available</p>
        )}
      </div>
    </div>
  );
};

export default HotelIDPage;
