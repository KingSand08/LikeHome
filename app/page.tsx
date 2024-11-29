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
import { RegionContext } from "@/components/providers/RegionProvider";
import  DrawerComponent from "@/components/search/HotelSearch/DrawerComponent"

export type searchParamsType = {
  // RegionSearch inputs
  query: string;
  domain: RegionSearchDomainType;
  locale: RegionSearchLocaleType;
  selectedRegionId: string | null;

  // BookingInfo inputs
  checkinDate: string;
  checkoutDate: string;
  adultsNumber: number;
  numDays: number;

  // HotelSearch inputs
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
  // Combined state to track inputs from all components
  const [region] = useContext(RegionContext)
  const { DEFAULT_CHECKIN_BOOKING_DATE, DEFAULT_CHECKOUT_BOOKING_DATE } =
    generateDefaultDates(DEFAULT_BOOKING_NUM_DAYS);

  const [searchParams, setSearchParams] = useState<searchParamsType>({
    // RegionSearch default inputs
    query: DEFAULT_QUERY,
    domain: DEFAULT_DOMAIN,
    locale: DEFAULT_LOCALE,
    selectedRegionId: region?.region_id || "",

    // BookingInfo default inputs
    checkinDate: DEFAULT_CHECKIN_BOOKING_DATE,
    checkoutDate: DEFAULT_CHECKOUT_BOOKING_DATE,
    adultsNumber: DEFAULT_ADULTS_NUMBER,
    numDays: DEFAULT_BOOKING_NUM_DAYS,

    // HotelSearch default inputs
    accessibilityOptions: DEFAULT_ACCESSIBILITY_OPTIONS,
    amenitiesOptions: DEFAULT_AMENITIES_OPTIONS,
    mealPlanOptions: DEFAULT_MEAL_PLAN_OPTIONS,
    lodgingOptions: DEFAULT_LODGING_OPTIONS,
    paymentType: DEFAULT_PAYMENT_TYPE_OPTIONS,
    sortOrder: DEFAULT_SORT_ORDER,
    availableOnly: DEFAULT_AVAILABILITY_FILTER_OPTIONS,
    price_min: DEFAULT_MIN_PRICE,
    price_max: DEFAULT_MAX_PRICE,
  });

  const updateBookingInfoParams = (
    newSearchParams: Partial<typeof searchParams>
  ) => setSearchParams((prev) => ({ ...prev, ...newSearchParams }));

  useEffect(() => {
    console.log(
      `Called useEffect in Search Page. Region: ${
        region?.region_id || undefined
      }`
    );
    console.log(
      `Called useEffect in Search Page. Selected Region ID: ${
        searchParams.selectedRegionId || undefined
      }`
    );
    if (!region?.region_id || region?.region_id === undefined) return;
    setSearchParams((prev) => ({
      ...prev,
      selectedRegionId: region?.region_id
    }));
  }, [region, searchParams.selectedRegionId]);

  
  return (
    <DrawerComponent
      hotelSearchInputs={searchParams}
      setHotelSearchInputs={setSearchParams}
    >
      <div>
        <h1 className="text-2xl font-bold mb-4">
          {region
            ? `Browsing Hotels in ${region.name} 🏨`
            : "Select a location to start!"}
        </h1>
        <BookingInfoUISearchComplete
          bookingInfo={{
            checkinDate: searchParams.checkinDate,
            checkoutDate: searchParams.checkoutDate,
            adultsNumber: searchParams.adultsNumber,
            numDays: searchParams.numDays,
          }}
          setBookingInfo={(newParams) =>
            updateBookingInfoParams(newParams)
          }
        />
        <hr />
        <HotelSelect
          bookingParams={{
            checkin_date: searchParams.checkinDate,
            checkout_date: searchParams.checkoutDate,
            adults_number: searchParams.adultsNumber,
            region_id: region?.region_id ?? "",
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
  