"use client";

import HotelRoomList from "@/components/booking/HotelRooms/HotelRoomList";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
import { APIHotelRoomOffersJSONFormatted } from "@/app/api/hotels/search/rooms/route";
import Image from "next/image";
import {
  fetchAllHotelRoomOffers,
  fetchHotelDetails,
} from "@/server-actions/api-actions";

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
    const fetchData = async () => {
      setLoading(true);
      setHotelData(null);

      try {
        const HOTEL_DETAILS_DATA = await fetchHotelDetails(
          hotelIdSlug,
          searchParams
        );
        if (!HOTEL_DETAILS_DATA) {
          throw new Error("Hotel details not found");
        }

        const HOTEL_ROOM_OFFERS_DATA = await fetchAllHotelRoomOffers(
          hotelIdSlug,
          searchParams
        );
        if (!HOTEL_ROOM_OFFERS_DATA) {
          throw new Error("Hotel room offers not found");
        }

        setHotelData({
          hotelDetails: HOTEL_DETAILS_DATA,
          hotelRooms: HOTEL_ROOM_OFFERS_DATA,
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
