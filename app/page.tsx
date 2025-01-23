"use client";

import { useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
  DEFAULT_ADULTS_NUMBER,
  DEFAULT_BOOKING_NUM_DAYS,
  DEFAULT_ACCESSIBILITY_OPTIONS,
  DEFAULT_AMENITIES_OPTIONS,
  DEFAULT_MEAL_PLAN_OPTIONS,
  DEFAULT_LODGING_OPTIONS,
  DEFAULT_PAYMENT_TYPE_OPTIONS,
  DEFAULT_SORT_ORDER,
  DEFAULT_AVAILABILITY_FILTER_OPTIONS,
  DEFAULT_MIN_PRICE,
  DEFAULT_MAX_PRICE,
  DEFAULT_QUERY,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
import {
  RegionSearchDomainType,
  RegionSearchLocaleType,
} from "@/lib/rapid-hotel-api/zod/region-search-schemas";
import {
  hotelSearchParamsRefinedSchema,
  HotelSearchSortOrderOptionsType,
  HotelsSearchAccessibilityOptionsType,
  HotelsSearchAmenitiesOptionsType,
  HotelsSearchAvailableFilterOptionsType,
  HotelsSearchLodgingOptionsType,
  HotelsSearchMealPlanOptionsType,
  HotelsSearchPaymentTypeOptionsType,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";
import { generateDefaultDates } from "@/lib/DateFunctions";
import BookingInfoUISearchComplete from "@/components/search/BookingInfoSearch/BookingInfoSearchUIComplete";
import { RegionContext } from "@/components/providers/RegionProvider";
import DrawerComponent from "@/components/search/HotelSearch/DrawerComponent";
import { APIHotelSearchJSONFormatted } from "./api/hotels/search/route";
import { hotelsFromRegion } from "@/server-actions/api-actions";

const LoadingPage = dynamic(() => import("@/components/ui/Loading/LoadingPage"), { ssr: false });
const HotelSelect = dynamic(() => import("@/components/search/HotelResults/HotelSelect"), { ssr: false });

export type searchParamsType = {
  query: string;
  domain: RegionSearchDomainType;
  locale: RegionSearchLocaleType;
  selectedRegionId: string | null;
  checkinDate: string;
  checkoutDate: string;
  adultsNumber: number;
  numDays: number;
  accessibilityOptions: HotelsSearchAccessibilityOptionsType[];
  amenitiesOptions: HotelsSearchAmenitiesOptionsType[];
  mealPlanOptions: HotelsSearchMealPlanOptionsType[];
  lodgingOptions: HotelsSearchLodgingOptionsType[];
  paymentType: HotelsSearchPaymentTypeOptionsType[];
  sortOrder: HotelSearchSortOrderOptionsType;
  availableOnly: HotelsSearchAvailableFilterOptionsType[];
  price_min: number;
  price_max: number;
};

const HomeSearchPage: React.FC = () => {
  const [region] = useContext(RegionContext);
  const searchResultsRef = useRef<HTMLDivElement | null>(null); // Reference for scrolling to the results section
  const {
    DEFAULT_CHECKIN_BOOKING_DATE,
    DEFAULT_CHECKOUT_BOOKING_DATE,
    DEFAULT_NUM_DAYS,
  } = generateDefaultDates(DEFAULT_BOOKING_NUM_DAYS);

  const [searchParams, setSearchParams] = useState<searchParamsType | null>(
    null
  );
  const [hotelsData, setHotelsData] = useState<APIHotelSearchJSONFormatted | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const defaultSearchParams: searchParamsType = {
      query: DEFAULT_QUERY,
      domain: DEFAULT_DOMAIN,
      locale: DEFAULT_LOCALE,
      selectedRegionId: region?.region_id || "",
      checkinDate: DEFAULT_CHECKIN_BOOKING_DATE,
      checkoutDate: DEFAULT_CHECKOUT_BOOKING_DATE,
      adultsNumber: DEFAULT_ADULTS_NUMBER,
      numDays: DEFAULT_NUM_DAYS,
      accessibilityOptions: DEFAULT_ACCESSIBILITY_OPTIONS,
      amenitiesOptions: DEFAULT_AMENITIES_OPTIONS,
      mealPlanOptions: DEFAULT_MEAL_PLAN_OPTIONS,
      lodgingOptions: DEFAULT_LODGING_OPTIONS,
      paymentType: DEFAULT_PAYMENT_TYPE_OPTIONS,
      sortOrder: DEFAULT_SORT_ORDER,
      availableOnly: DEFAULT_AVAILABILITY_FILTER_OPTIONS,
      price_min: DEFAULT_MIN_PRICE,
      price_max: DEFAULT_MAX_PRICE,
    };

    const getInitialSearchParams = () => {
      const storedParams = localStorage.getItem("searchParams");
      if (storedParams) {
        setSearchParams(JSON.parse(storedParams));
      } else {
        setSearchParams(defaultSearchParams);
      }
    };

    getInitialSearchParams();
  }, [DEFAULT_CHECKIN_BOOKING_DATE, DEFAULT_CHECKOUT_BOOKING_DATE, DEFAULT_NUM_DAYS, region?.region_id]);

  useEffect(() => {
    if (searchParams) {
      localStorage.setItem("searchParams", JSON.stringify(searchParams));
    }
  }, [searchParams]);

  const updateBookingInfoParams = (
    newSearchParams: Partial<searchParamsType>
  ) => setSearchParams((prev) => ({ ...prev!, ...newSearchParams }));

  useEffect(() => {
    if (!region) return;
    setSearchParams((prev) => ({
      ...prev!,
      selectedRegionId: region.region_id,
    }));
  }, [region]);

  const isValid: boolean =
    !!searchParams &&
    hotelSearchParamsRefinedSchema.safeParse({
      checkin_date: searchParams.checkinDate,
      checkout_date: searchParams.checkoutDate,
      adults_number: searchParams.adultsNumber,
      region_id: region?.region_id || "",
      sort_order: searchParams.sortOrder,
      locale: searchParams.locale,
      domain: searchParams.domain,
      price_min: searchParams.price_min,
      price_max: searchParams.price_max,
      accessibility: searchParams.accessibilityOptions,
      amenities: searchParams.amenitiesOptions,
      lodging_type: searchParams.lodgingOptions,
      meal_plan: searchParams.mealPlanOptions,
      available_filter: searchParams.availableOnly,
    }).success &&
    !!region &&
    region.region_id !== "" &&
    !loading;

  const handleFindHotels = async () => {
    if (!isValid) return;

    const bookingParams = {
      checkin_date: searchParams!.checkinDate,
      checkout_date: searchParams!.checkoutDate,
      adults_number: searchParams!.adultsNumber,
      region_id: region?.region_id || "",
      sort_order: searchParams!.sortOrder,
      locale: searchParams!.locale,
      domain: searchParams!.domain,
      price_min: searchParams!.price_min,
      price_max: searchParams!.price_max,
      accessibility: searchParams!.accessibilityOptions,
      amenities: searchParams!.amenitiesOptions,
      lodging_type: searchParams!.lodgingOptions,
      meal_plan: searchParams!.mealPlanOptions,
      available_filter: searchParams!.availableOnly,
    };

    setLoading(true);
    try {
      const HOTEL_DATA = await hotelsFromRegion(bookingParams);
      setHotelsData(HOTEL_DATA);

      // Smooth scroll to results after search
      if (searchResultsRef.current) {
        searchResultsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setHotelsData(null);
    } finally {
      setLoading(false);
    }
  };

  if (!searchParams) {
    return <LoadingPage className="min-h-screen" size_style={{ width: "400px", height: "400px" }} />;
  }

  return (
    <DrawerComponent
      hotelSearchInputs={searchParams}
      setHotelSearchInputs={(newHotelSearch) => setSearchParams(newHotelSearch)}
    >
      <div
        className="hero min-[50vh]"
        style={{
          backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="flex flex-col w-full px-[10em] max-[900px]:px-[30px] pt-0 max-[900px]:pt-10">
            <h1 className="max-[900px]:text-xl text-3xl font-bold mb-4">
              <br className="border-4 border-white" />
              <p>
                {region
                  ? `Browsing Hotels in ${region.name} 🏨`
                  : "⬆️ Find a location to get started!"}
              </p>
            </h1>

            <div className="self-center max-w-md">
              <BookingInfoUISearchComplete
                bookingInfo={searchParams}
                setBookingInfo={(newParams) => updateBookingInfoParams(newParams)}
                handleFindhotels={handleFindHotels}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      <div ref={searchResultsRef} className="max-[1200px]:w-full w-5/6 mt-8">
        <hr />
        <HotelSelect
          loading={loading}
          hotelsData={hotelsData}
          lastPriceRange={{ max: DEFAULT_MAX_PRICE, min: DEFAULT_MIN_PRICE }}
          bookingParams={{
            checkin_date: searchParams.checkinDate,
            checkout_date: searchParams.checkoutDate,
            adults_number: searchParams.adultsNumber,
            region_id: region?.region_id || "",
            sort_order: searchParams.sortOrder,
            locale: searchParams.locale,
            domain: searchParams.domain,
            price_min: searchParams.price_min,
            price_max: searchParams.price_max,
            accessibility: searchParams.accessibilityOptions,
            amenities: searchParams.amenitiesOptions,
            lodging_type: searchParams.lodgingOptions,
            meal_plan: searchParams.mealPlanOptions,
            available_filter: searchParams.availableOnly,
          }}
        />
      </div>
    </DrawerComponent>
  );
};

export default HomeSearchPage;
