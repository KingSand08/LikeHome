export type BaseSearch = {
  key: string; // Required: Partner API Key
  category?: "hotels" | "attractions" | "restaurants" | "geos"; // Optional: Property type filter
  phone?: string; // Optional: Phone number to filter search results
  address?: string; // Optional: Address to filter search results
  radius?: number; // Optional: Length of the radius for filtering (must be > 0)
  radiusUnit?: "km" | "mi" | "m"; // Optional: Radius unit (kilometers, miles, meters)
  language?:
    | "ar"
    | "zh"
    | "zh_TW"
    | "da"
    | "nl"
    | "en_AU"
    | "en_CA"
    | "en_HK"
    | "en_IN"
    | "en_IE"
    | "en_MY"
    | "en_NZ"
    | "en_PH"
    | "en_SG"
    | "en_ZA"
    | "en_UK"
    | "en"
    | "fr"
    | "fr_BE"
    | "fr_CA"
    | "fr_CH"
    | "de_AT"
    | "de"
    | "el"
    | "iw"
    | "in"
    | "it"
    | "it_CH"
    | "ja"
    | "ko"
    | "no"
    | "pt_PT"
    | "pt"
    | "ru"
    | "es_AR"
    | "es_CO"
    | "es_MX"
    | "es_PE"
    | "es"
    | "es_VE"
    | "es_CL"
    | "sv"
    | "th"
    | "tr"
    | "vi"; // Optional: Language options with "en" as default
};

export type HotelNearbySearch = BaseSearch & {
  latLong: string; // Required: Latitude/Longitude pair (e.g., "42.3455,-71.10767")
};

export type HotelFindSearch = BaseSearch & {
  searchQuery: string; // Required: Text for searching based on location name
  latLong?: string; // Optional: Latitude/Longitude pair for scoping results
};
