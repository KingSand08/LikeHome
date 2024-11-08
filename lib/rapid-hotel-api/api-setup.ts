const RAPIDAPI_HOTEL_API_KEY = process.env.RAPIDAPI_HOTEL_API_KEY || "";

export const API_OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    "x-rapidapi-key": RAPIDAPI_HOTEL_API_KEY,
    "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
  },
  cache: "no-store",
};

export function buildURLSearchParams(
  validatedData: Record<string, any>
): URLSearchParams {
  const combinedSearchParams = new URLSearchParams();

  Object.entries(validatedData).forEach(([key, value]) => {
    if (value !== undefined) {
      combinedSearchParams.append(
        key,
        Array.isArray(value)
          ? value.join(",")
          : encodeURIComponent(value.toString())
      );
    }
  });

  return combinedSearchParams;
}

export type validateSearchParamsOutput = {
  query: string | null;
  endpoint: string | null;
  error?: string | null;
};

// Custom API routes
export const REGION_SEARCH_API_URL = "/api/hotels/region" as const;
export const HOTEL_SEARCH_API_URL = "/api/hotels/search" as const;
export const HOTEL_ROOM_OFFERS_API_URL = "/api/hotels/search/rooms" as const;
export const HOTEL_DETAILS_API_URL = "/api/hotels/details" as const;

/////
// Custom dynamic routes
/////

// Find hotel
export const CUSTOM_HOTEL_DETAILS_SLUG_URL = "/hotels/{hotelId}" as const; // hotelId is slug (temporary for now)

// Book room in CUSTOM_HOTEL_ROOM_SLUG_URL ==> redirect to CUSTOM_HOTEL_BOOKING_URL. Find specific booking in CUSTOM_HOTEL_BOOKING_URL for authorized users.
export const CUSTOM_HOTEL_ROOM_SLUG_URL = "/hotels/{hotelId}/{roomId}" as const; // hotelId and roomId are slugs
export const CUSTOM_HOTEL_BOOKING_URL = "/bookings/{id}" as const; // id is a slug

// Final Booking Detail Structure
export type FINAL_BOOKING_DETAILS = {
  account_id: string;
  date_created: string;
  checkin_date: string;
  checkout_date: string;
  adults_number: string;
  numDays: string;
  locale: string; 
  domain: string;
  region_id: string;
  hotel_id: string;
  hotel_room_id: string;
  // price: number;
  // currency_code: string;
};
