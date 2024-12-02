"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
import { APIHotelRoomOffersJSONFormatted } from "@/app/api/hotels/search/rooms/route";
import {
  fetchAllHotelRoomOffers,
  fetchHotelDetails,
} from "@/server-actions/api-actions";
import LoadingPage from "@/components/ui/Loading/LoadingPage";
import ErrorPage from "@/components/ui/ErrorPage";
import HotelLocation from "@/components/HotelListing/HotelLocation";
import PaginatedRoomImageGrid from "@/components/HotelListing/PaginatedRoomImageGrid";
import RoomOffers from "@/components/HotelListing/RoomOffers";

const HotelIDPage: React.FC = () => {
  const { hotelId: hotelIdSlug } = useParams();
  const searchParams = useSearchParams();
  const [hotelData, setHotelData] =
    useState<APIHotelDetailsJSONFormatted | null>(null);
  const [roomOffers, setRoomOffers] =
    useState<APIHotelRoomOffersJSONFormatted | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setHotelData(null);
      setRoomOffers(null);

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

        setHotelData(HOTEL_DETAILS_DATA);
        setRoomOffers(HOTEL_ROOM_OFFERS_DATA);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hotelIdSlug, searchParams]);

  if (loading) {
    return <LoadingPage className="min-h-screen" size_style={{ width: '400px', height: '400px' }} />
  }

  if (error || !hotelData) {
    return <ErrorPage />;
  }

  const { name, tagline, reviews } = hotelData;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8 text-base-content-100">
        <div>
          <h1 className="text-4xl font-bold mb-2">{name}</h1>
          <HotelLocation hotelDetails={hotelData} />
          <p className="text-xl text-gray-600 dark:text-gray-100 mt-5">{tagline}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{reviews.score}</p>
          <p className="text-gray-500 dark:text-gray-200">{reviews.totalReviews}</p>
          <p className="text-gray-500 dark:text-gray-200">Base Price Per Night: {roomOffers?.basePricePerNight}</p>
        </div>
      </div>

      {/* Hotel Images */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Hotel Images</h3>
        <PaginatedRoomImageGrid hotelDetails={hotelData} />
      </div>

      {/* Room Offers */}
      {roomOffers && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Available Rooms</h3>
          <RoomOffers hotelRooms={roomOffers} />
        </div>
      )}
    </div>
  );
};

export default HotelIDPage;
