"use server";

import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
import { APIRegion } from "@/app/api/hotels/region/route";
import {
  APIHotelRoomOffersJSONFormatted,
  HotelRoomOffer,
} from "@/app/api/hotels/search/rooms/route";
import { APIHotelSearchJSONFormatted } from "@/app/api/hotels/search/route";
import { bookingParamsType } from "@/components/search/HotelResults/HotelSelect";
import { JSONToURLSearchParams } from "@/lib/rapid-hotel-api/APIFunctions";
import {
  HOTEL_DETAILS_API_URL,
  HOTEL_ROOM_OFFERS_API_URL,
  HOTEL_SEARCH_API_URL,
  REGION_SEARCH_API_URL,
} from "@/lib/rapid-hotel-api/constants/ROUTES";
import {
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
} from "@/lib/rapid-hotel-api/constants/USER_OPTIONS";
import { ReadonlyURLSearchParams } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const IS_MOCK = process.env.NODE_ENV === "development";
const MOCK_DELAY = () => new Promise((resolve) => setTimeout(resolve, 1000));

async function hotelsFromRegionImpl(
  bookingParams: bookingParamsType
): Promise<APIHotelSearchJSONFormatted | null> {
  const mutableSearchParams = JSONToURLSearchParams(bookingParams);

  const url = `${baseUrl}${HOTEL_SEARCH_API_URL}?${mutableSearchParams.toString()}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to search valid hotels from region. ${response.statusText}`
      );
    }

    return (await response.json()) as APIHotelSearchJSONFormatted;
  } catch (error) {
    console.error(
      `Error fetching hotels from region ${bookingParams.region_id}:`,
      error
    );
    return null;
  }
}

const mockHotelsFromRegionData = {
  priceRange: {
    maxPrice: 5000,
    minPrice: 0,
  },
  properties: Array(20)
    .fill(0)
    .map((_, index) => ({
      region_id: `${index}`,
      hotel_id: `${index}`,
      name: `Hotel ${index}`,
      image: {
        description: "img",
        url: "https://picsum.photos/200/300",
        alt: "alt",
      },
      coordinates: { lat: 0, long: 0 },
      availability: { available: true, minRoomsLeft: 10 },
      reviews: { score: 4, totalReviews: 100, starRating: 4 },
      price: { amount: 100, currency: { code: "USD", symbol: "$" } },
    })),
  summary: {
    matchedPropertiesSize: 20,
  },
};

export async function hotelsFromRegion(
  bookingParams: bookingParamsType
): Promise<APIHotelSearchJSONFormatted | null> {
  if (IS_MOCK) {
    await MOCK_DELAY();
    return mockHotelsFromRegionData;
  }

  // const cachedData = some prisma call
  // if (cachedData) {
  //   return cachedData;
  // }

  return hotelsFromRegionImpl(bookingParams);
}

export async function fetchHotelDetails(
  hotelId: string | string[],
  searchParams: ReadonlyURLSearchParams
): Promise<APIHotelDetailsJSONFormatted | null> {
  const mutableSearchParams = new URLSearchParams(searchParams);
  mutableSearchParams.set(
    "hotel_id",
    Array.isArray(hotelId) ? hotelId[0] : hotelId
  );

  const url = `${baseUrl}${HOTEL_DETAILS_API_URL}?${mutableSearchParams.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to retrieve hotel details. ${response.statusText}`
      );
    }

    return (await response.json()) as APIHotelDetailsJSONFormatted;
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    return null;
  }
}

export async function fetchAllHotelRoomOffers(
  hotelId: string | string[],
  searchParams: ReadonlyURLSearchParams
): Promise<APIHotelRoomOffersJSONFormatted | null> {
  const mutableSearchParams = new URLSearchParams(searchParams);
  mutableSearchParams.set(
    "hotel_id",
    Array.isArray(hotelId) ? hotelId[0] : hotelId
  );

  const url = `${baseUrl}${HOTEL_ROOM_OFFERS_API_URL}?${mutableSearchParams.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to retrieve all hotel room offers. ${response.statusText}`
      );
    }

    return (await response.json()) as APIHotelRoomOffersJSONFormatted;
  } catch (error) {
    console.error("Error fetching hotel room offers:", error);
    return null;
  }
}

export async function fetchHotelRoomOffer(
  hotelId: string | string[],
  roomId: string | string[],
  searchParams: ReadonlyURLSearchParams
): Promise<HotelRoomOffer | null> {
  const mutableSearchParams = new URLSearchParams(searchParams);
  mutableSearchParams.set(
    "hotel_id",
    Array.isArray(hotelId) ? hotelId[0] : hotelId
  );
  mutableSearchParams.set(
    "room_id",
    Array.isArray(roomId) ? roomId[0] : roomId
  );

  try {
    const HOTEL_ROOMS = await fetchAllHotelRoomOffers(hotelId, searchParams);

    if (!HOTEL_ROOMS) {
      throw new Error(
        `Failed to retrieve specific room offer because there are no hotel rooms.`
      );
    }
    const ROOM_DATA = HOTEL_ROOMS.hotelRoomOffers.find(
      (offer) => offer.hotel_room_id === roomId
    );

    return ROOM_DATA ? ROOM_DATA : null;
  } catch (error) {
    console.error("Error fetching specific room offer:", error);
    return null;
  }
}
