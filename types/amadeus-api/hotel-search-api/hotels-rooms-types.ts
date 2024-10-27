// https://developers.amadeus.com/self-service/category/hotels/api-doc/hotel-search/api-reference

export type HotelRoomOffers = {
  hotelIds: string[]; // Amadeus property codes, mandatory for hotel search by predefined list
  adults?: number; // Number of adult guests per room, default is 1, range 1-9
  checkInDate?: string; // Check-in date in YYYY-MM-DD format, defaults to today's date
  checkOutDate?: string; // Check-out date in YYYY-MM-DD format, defaults to checkInDate + 1
  countryOfResidence?: string; // Traveler's country of residence in ISO 3166-1 format
  roomQuantity?: number; // Number of rooms requested, default is 1, range 1-9
  priceRange?: string; // Price filter in the format 'min-max' or '-max' or 'min', must include currency
  currency?: string; // Currency code in ISO format, defaults to local hotel currency if not supported
  paymentPolicy?: "GUARANTEE" | "DEPOSIT" | "NONE"; // Payment type filter, default is NONE
  boardType?:
    | "ROOM_ONLY"
    | "BREAKFAST"
    | "HALF_BOARD"
    | "FULL_BOARD"
    | "ALL_INCLUSIVE"; // Meal options
  includeClosed?: boolean; // Include sold-out properties, defaults to available properties only
  bestRateOnly?: boolean; // Return only the cheapest offer per hotel, default is true
  lang?: string; // Language of descriptive texts, in ISO language code, defaults to English if unavailable
};

export type HotelRoomOfferPricing = {
  offerId: string; // Unique identifier of an offer. Either the GDS booking code or the aggregator offerId with a limited lifetime.
  lang?: string; // Requested language of descriptive texts in ISO 639 format.
}