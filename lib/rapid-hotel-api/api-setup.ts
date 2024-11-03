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
