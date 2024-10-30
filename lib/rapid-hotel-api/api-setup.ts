const RAPIDAPI_HOTEL_API_KEY = process.env.RAPIDAPI_HOTEL_API_KEY || "";

export const API_OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    "x-rapidapi-key": RAPIDAPI_HOTEL_API_KEY,
    "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
  },
  cache: "no-store",
};
