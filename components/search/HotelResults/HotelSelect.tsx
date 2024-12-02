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
  validRegionId: boolean;
};

const HotelSelect: React.FC<HotelSelectUICompleteProps> = ({
  bookingParams,
}) => {
  const [hotelsData, setHotelsData] =
    useState<APIHotelSearchJSONFormatted | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [region] = useContext(RegionContext);

  const isValid: boolean =
    hotelSearchParamsRefinedSchema.safeParse(bookingParams).success &&
    !!region &&
    region.region_id !== "" &&
    !loading;

  const [lastPriceRange, setLastPriceRange] = useState<{
    max: number;
    min: number;
  }>({
    max: DEFAULT_MAX_PRICE,
    min: DEFAULT_MIN_PRICE,
  });
  const handleFindHotels = async () => {
    setLastPriceRange({
      max: hotelsData?.priceRange?.maxPrice!,
      min: hotelsData?.priceRange?.minPrice!,
    });
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

  // Only re-renders on initial load and region change.
  // We don't want to call the API after clicking one checkbox.
  // So, in the future we could have an "apply new filters button" if filters change.
  // Also, store filters in searchParams or localStorage...
  useEffect(() => {
    if (!isValid) return;
    handleFindHotels();
  }, [bookingParams]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Available Hotels</h2>

      {hotelsData &&
        lastPriceRange &&
        lastPriceRange.min > hotelsData?.priceRange?.minPrice &&
        lastPriceRange.max < hotelsData?.priceRange?.maxPrice ? (
        <div className="italic text-red text-2xl">
          Sorry, there are no hotels with the price range between{" "}
          <span className="italic">
            ${lastPriceRange.min} and ${lastPriceRange.max}
          </span>
          . Here are some other hotels you can check out...
        </div>
      ) : hotelsData &&
        lastPriceRange &&
        lastPriceRange.min > hotelsData?.priceRange?.minPrice ? (
        <div className="italic text-red text-2xl">
          Sorry, there are no hotels with min price over{" "}
          <span className="italic">${lastPriceRange.min}</span>. Here are some
          other hotels you can check out...
        </div>
      ) : hotelsData &&
        lastPriceRange &&
        lastPriceRange.max < hotelsData?.priceRange?.maxPrice ? (
        <div className="italic text-red text-2xl">
          Sorry, there are no hotels with max price under{" "}
          <span className="italic">${lastPriceRange.max}</span>. Here are some
          other hotels you can check out...
        </div>
      ) : null}

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
