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
export const CUSTOM_HOTEL_BOOKING_URL = "/bookings/{id}" as const; // id is a slugexport const ROUTE_BROWSING_LANDING_PAGE = "/searchtest" as const;
