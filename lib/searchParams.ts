import {
  HotelSearchSortOrderOptionsType,
  HotelsSearchAccessibilityOptionsType,
  HotelsSearchAmenitiesOptionsType,
  HotelsSearchAvailableFilterOptionsType,
  HotelsSearchLodgingOptionsType,
  HotelsSearchMealPlanOptionsType,
  HotelsSearchPaymentTypeOptionsType,
} from "./rapid-hotel-api/zod/hotel-search-schemas";
import {
  RegionSearchDomainType,
  RegionSearchLocaleType,
} from "./rapid-hotel-api/zod/region-search-schemas";

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



