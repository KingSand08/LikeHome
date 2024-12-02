"use server";

import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
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
} from "@/lib/rapid-hotel-api/constants/ROUTES";
import { ReadonlyURLSearchParams } from "next/navigation";
import { cacheHotelDetails, cacheHotelRoomOffer } from "./cache-actions";

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

async function fetchHotelDetailsImpl(
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

    const hotelDetails =
      (await response.json()) as APIHotelDetailsJSONFormatted;

    // Cache the hotel details after successful retrieval
    await cacheHotelDetails(hotelDetails);

    return hotelDetails;
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    return null;
  }
}

const mockHotelDetailsData: APIHotelDetailsJSONFormatted = {
  hotel_id: "0",
  name: "Mock Hotel",
  tagline: "Mock Tagline",
  location: {
    address: {
      addressLine: "123 Mock St",
      city: "Mock City",
      province: "Mock Province",
      countryCode: "US",
    },
    coordinates: { latitude: 0, longitude: 0 },
  },
  images: Array(20)
    .fill(0)
    .map((_, index) => ({
      alt: `Image ${index}`,
      description: `Image ${index}`,
      url: `https://picsum.photos/600/800?random=${index}`,
      index,
    })),
  reviews: {
    score: "4.5 / 5 very good",
    totalReviews: "See over 9999 reviews",
  },
};
export async function fetchHotelDetails(
  hotelId: string | string[],
  searchParams: ReadonlyURLSearchParams
): Promise<APIHotelDetailsJSONFormatted | null> {
  if (IS_MOCK) {
    await MOCK_DELAY();
    return mockHotelDetailsData;
  }

  return fetchHotelDetailsImpl(hotelId, searchParams);
}

async function fetchAllHotelRoomOffersImpl(
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

const mockHotelRoomOffersData: APIHotelRoomOffersJSONFormatted = {
  hotel_id: "0",
  soldOut: false,
  basePricePerNight: "$100",
  hotelRoomOffers: Array(5)
    .fill(0)
    .map((_, index) => ({
      hotel_id: "0",
      hotel_room_id: `${index}`,
      description: `Room ${index} is a mock room.`,
      name: `Room ${index}`,
      galleryImages: Array(5)
        .fill(0)
        .map((_, index) => ({
          description: `Image ${index}`,
          url: `https://picsum.photos/200/300`,
          alt: `Image ${index}`,
          index,
        })),
      pricePerNight: {
        amount: 100,
        currency: { code: "USD", symbol: "$" },
      },
    })),
};

export async function fetchAllHotelRoomOffers(
  hotelId: string | string[],
  searchParams: ReadonlyURLSearchParams
): Promise<APIHotelRoomOffersJSONFormatted | null> {
  if (IS_MOCK) {
    await MOCK_DELAY();
    return mockHotelRoomOffersData;
  }

  return fetchAllHotelRoomOffersImpl(hotelId, searchParams);
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
    console.log("LOG: fetchHotelRoomOffer - HOTEL_ROOMS", HOTEL_ROOMS);

    if (!HOTEL_ROOMS) {
      throw new Error(
        `Failed to retrieve specific room offer because there are no hotel rooms.`
      );
    }
    const ROOM_DATA = HOTEL_ROOMS.hotelRoomOffers.find(
      (offer) => offer.hotel_room_id === roomId
    );

    if (ROOM_DATA) {
      await cacheHotelRoomOffer(ROOM_DATA);
    }

    return ROOM_DATA ? ROOM_DATA : null;
  } catch (error) {
    console.error("Error fetching specific room offer:", error);
    return null;
  }
}
