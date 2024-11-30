"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CompleteHotelInfo } from "@/types/rapid-hotels-api/CompleteHotelInformation";
import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
import { APIHotelRoomOffersJSONFormatted } from "@/app/api/hotels/search/rooms/route";
import {
  fetchAllHotelRoomOffers,
  fetchHotelDetails,
} from "@/server-actions/api-actions";
import LoadingPage from "@/components/ui/LoadingPage";
import ErrorPage from "@/components/ui/ErrorPage";
import HotelLocation from "@/components/HotelListing/HotelLocation";
import RoomImageCarousel from "@/components/HotelListing/RoomImageCarousel";
import PaginatedRoomImageGrid from "@/components/HotelListing/PaginatedRoomImageGrid";
import RoomOffers from "@/components/HotelListing/RoomOffers";


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
    return (
      <LoadingPage />
    );
  }

  if (error || !hotelData) {
    return (
      <ErrorPage />
    );
  }

  const { hotelDetails, hotelRooms } = hotelData;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hotel Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{hotelDetails?.name}</h1>
        <h2 className="text-xl text-base-content">{hotelDetails?.tagline}</h2>
      </div>

      {/* Hotel Location */}
      <HotelLocation hotelDetails={hotelDetails as APIHotelDetailsJSONFormatted} />

      {/* Hotel Images */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Hotel Images</h3>

        {/* Room Images Carousel */}
        <RoomImageCarousel hotelDetails={hotelDetails as APIHotelDetailsJSONFormatted} />

        {/* Paginated Non-Room Images */}
        <PaginatedRoomImageGrid hotelDetails={hotelDetails as APIHotelDetailsJSONFormatted} />

        {/* Room Offers */}
        <RoomOffers hotelRooms={hotelRooms as APIHotelRoomOffersJSONFormatted} />
      </div>
    </div>
  );
};

export default HotelIDPage;