"use client";
import { useContext, useEffect, useState } from "react";
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
import HotelSelect from "@/components/search/HotelResults/HotelSelect";
import {
  RegionContext,
  RegionContextType,
} from "@/components/providers/RegionProvider";
import DrawerComponent from "@/components/search/HotelSearch/DrawerComponent";
import LoadingPage from "@/components/ui/Loading/LoadingPage";

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
  const regionContextName = region?.name || "";
  const regionContextID = region?.region_id || "";
  const {
    DEFAULT_CHECKIN_BOOKING_DATE,
    DEFAULT_CHECKOUT_BOOKING_DATE,
    DEFAULT_NUM_DAYS,
  } = generateDefaultDates(DEFAULT_BOOKING_NUM_DAYS);

  const defaultSearchParams: searchParamsType = {
    query: regionContextName,
    domain: DEFAULT_DOMAIN,
    locale: DEFAULT_LOCALE,
    selectedRegionId: regionContextID,
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

  const [searchParams, setSearchParams] = useState<searchParamsType | null>(
    null
  );

  let findHotels: (() => Promise<void>) | null = null;
  const setFindHotels = (handleFindHotels: () => Promise<void>) => {
    findHotels = handleFindHotels;
  };
  const handleSearchClick = async () => {
    if (findHotels) {
      await findHotels(); // Call the function to trigger the search
    } else {
      console.error("Hotel search function is not available!");
    }
  };

  useEffect(() => {
    const getInitialSearchParams = () => {
      const storedParams = localStorage.getItem("searchParams");
      const regionParams = localStorage.getItem("region");

      let combinedParams = { ...defaultSearchParams };

      if (storedParams) {
        combinedParams = { ...combinedParams, ...JSON.parse(storedParams) };
      }

      if (regionParams) {
        try {
          const parsedRegion = JSON.parse(regionParams) as RegionContextType;

          if (parsedRegion && parsedRegion.region_id && parsedRegion.name) {
            combinedParams = {
              ...combinedParams,
              selectedRegionId: parsedRegion.region_id,
              query: parsedRegion.name,
            };
          }
        } catch (error) {
          console.error("Error parsing regionParams:", error);
        }
      }

      setSearchParams(combinedParams);
    };

    getInitialSearchParams();
  }, []);

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
      query: region.name,
      selectedRegionId: region.region_id,
    }));
  }, [region]);

  if (!searchParams) {
    return (
      <LoadingPage
        className="min-h-screen"
        size_style={{ width: "400px", height: "400px" }}
      />
    );
  }

  return (
    <DrawerComponent
      hotelSearchInputs={searchParams}
      setHotelSearchInputs={(newHotelSearch) => setSearchParams(newHotelSearch)}
    >
      <div className="flex flex-col w-full px-[10em] max-[900px]:px-[30px] pt-0 max-[900px]:pt-10">
        <h1 className="max-[900px]:text-xl text-3xl font-bold mb-4">
          <br className="border-4 border-white" />
          <p>
            {region
              ? `Browsing Hotels in ${region.name} 🏨`
              : "⬆️ Find a location to get started!"}
          </p>
        </h1>

        <div className="flex flex-col gap-4 my-4">
          <BookingInfoUISearchComplete
            bookingInfo={searchParams}
            setBookingInfo={(newParams) => updateBookingInfoParams(newParams)}
          />
          {region && (
            <button
              onClick={handleSearchClick}
              className="btn btn-primary self-stretch"
            >
              Find Hotels
            </button>
          )}
        </div>
      </div>
      <div className="max-[1200px]:w-full w-5/6">
        <hr />
        <HotelSelect
          bookingParams={{
            checkin_date: searchParams.checkinDate,
            checkout_date: searchParams.checkoutDate,
            adults_number: searchParams.adultsNumber,
            region_id: regionContextID,
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
          onFindHotels={setFindHotels}
        />
      </div>
    </DrawerComponent>
  );
};

export default HomeSearchPage;
