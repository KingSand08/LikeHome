"use client";
import { useState, useEffect, useContext } from "react";
import { APIHotelSearchJSONFormatted } from "@/app/api/hotels/search/route";
import HotelList from "./HotelList/HotelList";
import { z } from "zod";
import { hotelSearchParamsRefinedSchema } from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import { RegionContext } from "@/components/providers/RegionProvider";
import {
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_PRICE,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
import { hotelsFromRegion } from "@/server-actions/api-actions";
import LoadingIcon from "@/components/ui/Loading/LoadingIcon";

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

      {/* Hotel List Display */}
      <div className="mt-6">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <LoadingIcon
              className="h-fit pt-20 pb-48"
              size_style={{ width: '500px', height: '500px' }}
              iconSelf={true}
            />
          </div>
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
