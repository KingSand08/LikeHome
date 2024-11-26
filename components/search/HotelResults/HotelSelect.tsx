"use client";
import { useState, useEffect, useContext } from "react";
import { APIHotelSearchJSONFormatted } from "@/app/api/hotels/search/route";
import HotelList from "./HotelList/HotelList";
import { z } from "zod";
import { hotelSearchParamsRefinedSchema } from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import { HOTEL_SEARCH_API_URL } from "@/lib/rapid-hotel-api/constants/ROUTES";
import { JSONToURLSearchParams } from "@/lib/rapid-hotel-api/APIFunctions";
import { RegionContext } from "@/components/providers/RegionProvider";

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

  useEffect(() => {
    if (!isValid) return;

    const handleFindHotels = async () => {
      setLoading(true);
      setHotelsData(null);
      try {
        const urlParams = JSONToURLSearchParams(bookingParams);

        const response = await fetch(
          `${HOTEL_SEARCH_API_URL}?${urlParams.toString()}`
        );
        if (!response.ok) {
          alert(
            `Failed to fetch hotels. Status: ${response?.status}. StatusText: ${
              response?.statusText
            } Url: ${HOTEL_SEARCH_API_URL}?${urlParams.toString()}`
          );
          setHotelsData(null);
        } else {
          const HOTEL_DATA: APIHotelSearchJSONFormatted = await response.json();

          setHotelsData(HOTEL_DATA);
        }
      } catch (error) {
        alert("An unexpected error occurred. Please try again.");
        setHotelsData(null);
      } finally {
        setLoading(false);
      }
    };

    handleFindHotels();
  }, [region]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Available Hotels</h2>

      {/* Hotel List Display */}
      <div className="mt-6">
        {loading ? null : hotelsData && hotelsData.properties.length > 0 ? (
          <HotelList hotelsData={hotelsData} bookingParams={bookingParams} />
        ) : (
          <p className="text-gray-500">No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default HotelSelect;
