"use client";
import { useState, useEffect, useContext } from "react";
import { APIHotelSearchJSONFormatted } from "@/app/api/hotels/search/route";
import HotelList from "./HotelList/HotelList";
import { z } from "zod";
import { hotelSearchParamsRefinedSchema } from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import { HOTEL_SEARCH_API_URL } from "@/lib/rapid-hotel-api/constants/ROUTES";
import { JSONToURLSearchParams } from "@/lib/rapid-hotel-api/APIFunctions";
import { RegionContext } from "@/components/providers/RegionProvider";
import {
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_PRICE,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
import { Loader } from "lucide-react";

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

  const handleFindHotelsCached = async () => {
    setLoading(true);
    setTimeout(() => {
      setHotelsData({
        priceRange: {
          maxPrice: 5000,
          minPrice: 0,
        },
        properties: [
          {
            region_id: "1",
            hotel_id: "1",
            name: "Hotel 1",
            image: { description: "img", url: "", alt: "alt" },
            coordinates: { lat: 0, long: 0 },
            availability: { available: true, minRoomsLeft: 10 },
            reviews: { score: 4, totalReviews: 100, starRating: 4 },
            price: { amount: 100, currency: { code: "USD", symbol: "$" } },
          },
          {
            region_id: "2",
            hotel_id: "2",
            name: "Hotel 2",
            image: { description: "img", url: "", alt: "alt" },
            coordinates: { lat: 0, long: 0 },
            availability: { available: true, minRoomsLeft: 10 },
            reviews: { score: 4, totalReviews: 100, starRating: 4 },
            price: { amount: 100, currency: { code: "USD", symbol: "$" } },
          },
          {
            region_id: "3",
            hotel_id: "3",
            name: "Hotel 3",
            image: { description: "img", url: "", alt: "alt" },
            coordinates: { lat: 0, long: 0 },
            availability: { available: true, minRoomsLeft: 10 },
            reviews: { score: 4, totalReviews: 100, starRating: 4 },
            price: { amount: 100, currency: { code: "USD", symbol: "$" } },
          },
        ],
        summary: {
          matchedPropertiesSize: 3,
        },
      });
      setLoading(false);
    }, 5000);
  };

  // Only re-renders on initial load and region change.
  // We don't want to call the API after clicking one checkbox.
  // So, in the future we could have an "apply new filters button" if filters change.
  // Also, store filters in searchParams or localStorage...
  useEffect(() => {
    if (!isValid) return;

    if (process.env.NODE_ENV === "production") {
      handleFindHotels();
    } else {
      handleFindHotelsCached();
    }
  }, [region]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Available Hotels</h2>

      <div className="flex flex-row gap-4">
        <button
          onClick={handleFindHotelsCached}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-red-500 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Loading..." : "Find Hotels (cached)"}
        </button>
        <button
          onClick={handleFindHotels}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-red-500 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Loading..." : "Find Hotels (actual API data)"}
        </button>
      </div>

      {hotelsData &&
      lastPriceRange &&
      lastPriceRange.min > hotelsData?.priceRange?.minPrice &&
      lastPriceRange.max < hotelsData?.priceRange?.maxPrice ? (
        <div className="text-red text-2xl">
          Sorry, there are no hotels with the price range between{" "}
          {`$${lastPriceRange.min} and $${lastPriceRange.max}`}. Here are some
          other hotels you can check out...
        </div>
      ) : hotelsData &&
        lastPriceRange &&
        lastPriceRange.min > hotelsData?.priceRange?.minPrice ? (
        <div className="text-red text-2xl">
          Sorry, there are no hotels with min price over{" "}
          {`$${lastPriceRange.min}`}. Here are some other hotels you can check
          out...
        </div>
      ) : hotelsData &&
        lastPriceRange &&
        lastPriceRange.max < hotelsData?.priceRange?.maxPrice ? (
        <div className="text-red text-2xl">
          Sorry, there are no hotels with max price under{" "}
          {`$${lastPriceRange.max}`}. Here are some other hotels you can check
          out...
        </div>
      ) : null}

      {/* Hotel List Display */}
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
