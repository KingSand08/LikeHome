// https://developers.amadeus.com/self-service/category/hotels/api-doc/hotel-list/api-reference

type CommonHotelQueries = {
  radius?: number; // Maximum distance from the center, default is 5
  radiusUnit?: "KM" | "MILE"; // Unit of measurement for the radius, default is "KM"
  chainCodes?: string[]; // Array of 2-character hotel chain codes
  amenities?: (
    | "SWIMMING_POOL"
    | "SPA"
    | "FITNESS_CENTER"
    | "AIR_CONDITIONING"
    | "RESTAURANT"
    | "PARKING"
    | "PETS_ALLOWED"
    | "AIRPORT_SHUTTLE"
    | "BUSINESS_CENTER"
    | "DISABLED_FACILITIES"
    | "WIFI"
    | "MEETING_ROOMS"
    | "NO_KID_ALLOWED"
    | "TENNIS"
    | "GOLF"
    | "KITCHEN"
    | "ANIMAL_WATCHING"
    | "BABY_SITTING"
    | "BEACH"
    | "CASINO"
    | "JACUZZI"
    | "SAUNA"
    | "SOLARIUM"
    | "MASSAGE"
    | "VALET_PARKING"
    | "BAR_OR_LOUNGE"
    | "KIDS_WELCOME"
    | "NO_PORN_FILMS"
    | "MINIBAR"
    | "TELEVISION"
    | "WI-FI_IN_ROOM"
    | "ROOM_SERVICE"
    | "GUARDED_PARKG"
    | "SERV_SPEC_MENU"
  )[]; // List of amenities available at the hotel
  ratings?: ("1" | "2" | "3" | "4" | "5")[]; // Array of hotel star ratings (1 to 5)
  hotelSource?: "BEDBANK" | "DIRECTCHAIN" | "ALL"; // Source of the hotel, default is "ALL"
};

export type HotelListByCity = CommonHotelQueries & {
  cityCode: string; // Destination city code or airport code (IATA format, e.g., "PAR")
};

export type HotelListByLatitude = CommonHotelQueries & {
  latitude: number; // Latitude of the geographical point (e.g., 41.397158)
  longitude: number; // Longitude of the geographical point (e.g., 2.160873)
};

export type HotelListByUniqueID = {
  hotelIds: string[]; // List of Amadeus Property Codes (8 chars) Example : List [ "ACPAR419" ]
};
