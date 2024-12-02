"use client";
import { useState, useEffect } from "react";
import { APIHotelSearchJSONFormatted } from "@/app/api/hotels/search/route";
import HotelList from "./HotelList/HotelList";
import { z } from "zod";
import { hotelSearchParamsRefinedSchema } from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import { Loader } from "lucide-react";
import { hotelsFromRegion } from "@/server-actions/api-actions";

export type bookingParamsType = z.infer<typeof hotelSearchParamsRefinedSchema>;

type HotelSelectUICompleteProps = {
  bookingParams: bookingParamsType;
  onFindHotels?: (findHotels: () => Promise<void>) => void;
};

const HotelSelect: React.FC<HotelSelectUICompleteProps> = ({
  bookingParams,
  onFindHotels,
}) => {
  const [hotelsData, setHotelsData] =
    useState<APIHotelSearchJSONFormatted | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFindHotels = async () => {
    setLoading(true);
    try {
      const HOTEL_DATA = await hotelsFromRegion(bookingParams);
      setHotelsData(HOTEL_DATA);
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
      setHotelsData(null);
    } finally {
      setLoading(false);
    }
  };

  // Expose handleFindHotels via the onFindHotels prop
  useEffect(() => {
    if (onFindHotels) {
      onFindHotels(handleFindHotels);
    }
  }, [onFindHotels]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Available Hotels</h2>

      <div className="mt-6">
        {loading ? (
          <span className="rounded bg-primary text-primary-content flex flex-row justify-center align-middle text-center gap-1 p-4">
            <Loader size={32} className="animate-spin" />
            <p className="h-full text-middle text-center text-2xl">
              Loading Hotels that fit your needs!
            </p>
          </span>
        ) : hotelsData && hotelsData.properties.length > 0 ? (
          <HotelList hotelsData={hotelsData} bookingParams={bookingParams} />
        ) : (
          <p className="text-gray-500">No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default HotelSelect;
