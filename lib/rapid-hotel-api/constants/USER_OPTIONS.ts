import {
  RegionSearchDomainType,
  RegionSearchLocaleType,
} from "../zod/region-search-schemas";
import {
  HotelSearchSortOrderOptionsType,
  HotelsSearchAccessibilityOptionsType,
  HotelsSearchAmenitiesOptionsType,
  HotelsSearchAvailableFilterOptionsType,
  HotelsSearchLodgingOptionsType,
  HotelsSearchMealPlanOptionsType,
  HotelsSearchPaymentTypeOptionsType,
} from "../zod/hotel-search-schemas";

// Region search
export const DEFAULT_QUERY: string = "San Jose" as const;
export const DEFAULT_DOMAIN: RegionSearchDomainType = "US" as const;
export const DEFAULT_LOCALE: RegionSearchLocaleType = "en_US" as const;

// Hotel search
export const DEFAULT_ACCESSIBILITY_OPTIONS: HotelsSearchAccessibilityOptionsType[] =
  [] as const;
export const DEFAULT_AMENITIES_OPTIONS: HotelsSearchAmenitiesOptionsType[] = [
  "WIFI",
  "PARKING",
];
export const DEFAULT_MEAL_PLAN_OPTIONS: HotelsSearchMealPlanOptionsType[] = [
  "FREE_BREAKFAST",
];
export const DEFAULT_LODGING_OPTIONS: HotelsSearchLodgingOptionsType[] = [
  "HOTEL",
  "APART_HOTEL",
  "HOSTAL",
];
export const DEFAULT_SORT_ORDER: HotelSearchSortOrderOptionsType =
  "REVIEW" as const;
export const DEFAULT_AVAILABILITY_FILTER_OPTIONS: HotelsSearchAvailableFilterOptionsType[] =
  ["SHOW_AVAILABLE_ONLY"] as const;
export const DEFAULT_PAYMENT_TYPE_OPTIONS: HotelsSearchPaymentTypeOptionsType[] =
  [] as const;
export const DEFAULT_MIN_PRICE: number = 0 as const;
export const DEFAULT_MAX_PRICE: number = 50000 as const;

// Booking details
export const DEFAULT_BOOKING_NUM_DAYS: number = 3 as const; // Not including checkout day. The number of days between checkin_date and checkout_date.
export const DEFAULT_DAYS_FROM_TODAY_OFFSET: number = 7 as const; // Used for setting the default checkin_date from X DAYS_FROM_TODAY. Offset from today's date to guarantee a reservation.

export const DEFAULT_ADULTS_NUMBER: number = 1 as const;
export const DEFAULT_MIN_ADULTS_NUMBER: number = 1 as const;
export const DEFAULT_MAX_ADULTS_NUMBER: number = 10 as const;

// Frontend UI (for template checkbox options)
export const DEFAULT_MAX_SELECTED_OPTIONS_LIMIT: number = 5 as const;
export const DEFAULT_DAYS_THRESHOLD_FOR_PENALITY_CHARGE: number = 3 as const;