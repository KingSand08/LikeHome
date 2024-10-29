// Hotel Search
// https://rapidapi.com/tipsters/api/hotels-com-provider/playground/apiendpoint_01161e64-954f-4a4e-a331-ffa662e04629

import {
  RegionSearchDomainType,
  RegionSearchLocaleType,
} from "./region-search-types";

// https://rapidapi.com/tipsters/api/hotels-com-provider/playground/apiendpoint_01161e64-954f-4a4e-a331-ffa662e04629
export const HOTEL_ROOM_SEARCH_URL =
  "https://hotels-com-provider.p.rapidapi.com/v2/hotels/search" as const;

export type HotelsSearchAccessibility =
  | "SIGN_LANGUAGE_INTERPRETER"
  | "STAIR_FREE_PATH"
  | "SERVICE_ANIMAL"
  | "IN_ROOM_ACCESSIBLE"
  | "ROLL_IN_SHOWER"
  | "ACCESSIBLE_BATHROOM"
  | "ELEVATOR"
  | "ACCESSIBLE_PARKING";

export type HotelsSearchAmenities =
  | "SPA_ON_SITE"
  | "WIFI"
  | "HOT_TUB"
  | "FREE_AIRPORT_TRANSPORTATION"
  | "POOL"
  | "GYM"
  | "OCEAN_VIEW"
  | "WATER_PARK"
  | "BALCONY_OR_TERRACE"
  | "KITCHEN_KITCHENETTE"
  | "ELECTRIC_CAR"
  | "PARKING"
  | "CRIB"
  | "RESTAURANT_IN_HOTEL"
  | "PETS"
  | "WASHER_DRYER"
  | "CASINO"
  | "AIR_CONDITIONING";

export type HotelsSearchMealPlan =
  | "ALL_INCLUSIVE"
  | "FULL_BOARD"
  | "HALF_BOARD"
  | "FREE_BREAKFAST";

export type HotelsSearchAvailableFilter = "SHOW_AVAILABLE_ONLY";

export type HotelsSearchPayment =
  | "GIFT_CARD"
  | "PAY_LATER"
  | "FREE_CANCELLATION";

export type HotelSearchSortOrder =
  | "REVIEW"
  | "RECOMMENDED"
  | "DISTANCE"
  | "PRICE_LOW_TO_HIGH"
  | "PROPERTY_CLASS"
  | "PRICE_RELEVANT";

export type HotelsSearchLodging =
  | "HOSTAL"
  | "APARTMENT"
  | "APART_HOTEL"
  | "CHALET"
  | "HOTEL"
  | "RYOKAN"
  | "BED_AND_BREAKFAST";

export type HotelTravelerBookingInfo = {
  checkin_date: string; // Check-in date, required
  adults_number: number; // Number of adults, required
  locale: RegionSearchLocaleType; // Locale, required (adjust to actual type if known)
  checkout_date: string; // Checkout date, required
  children_ages?: number[]; // Ages of children as comma-separated values, e.g., "4,0,15"
  domain: RegionSearchDomainType; // Domain, required (adjust to actual type if known)
}

export interface HotelsSearchQuery extends HotelTravelerBookingInfo {
  accessibility?: HotelsSearchAccessibility[]; // Array of accessibility features
  amenities?: HotelsSearchAmenities[]; // Array of amenities
  meal_plan?: HotelsSearchMealPlan[]; // Array of meal plan options
  available_filter?: HotelsSearchAvailableFilter;
  price_min?: number;
  payment_type?: HotelsSearchPayment[]; // Array of payment types
  star_rating_ids?: string; // Star rating string, e.g., "4,5"
  guest_rating_min?: number; // Minimal guest rating
  // children_ages?: number[]; // Ages of children as comma-separated values, e.g., "4,0,15"
  // checkin_date: string; // Check-in date, required
  // locale: RegionSearchLocaleType; // Locale, required (adjust to actual type if known)
  // adults_number: number; // Number of adults, required
  sort_order: HotelSearchSortOrder; // Sort order, required (adjust to actual type if known)
  page_number?: number;
  // domain: RegionSearchDomainType; // Domain, required (adjust to actual type if known)
  price_max?: number;
  region_id: number; // Region ID, required
  lodging_type?: HotelsSearchLodging[]; // Array of lodging types
  // checkout_date: string; // Checkout date, required
}

export const DEFAULT_SORT_ORDER: HotelSearchSortOrder = "DISTANCE" as const;
