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
import { cacheHotelDetails, cacheHotelRoomOffer } from "./cache-actions";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchRegionDetails(
  query: string,
  domain?: string,
  locale?: string
): Promise<APIRegion[] | null> {
  const mutableSearchParams = new URLSearchParams();
  mutableSearchParams.set("query", query);
  mutableSearchParams.set("domain", domain ? domain : DEFAULT_DOMAIN);
  mutableSearchParams.set("locale", locale ? locale : DEFAULT_LOCALE);

  const url = `${baseUrl}${REGION_SEARCH_API_URL}?${mutableSearchParams.toString()}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to retrieve region details. ${response.statusText}`
      );
    }

    return (await response.json()) as APIRegion[];
  } catch (error) {
    console.error("Error fetching region details:", error);
    return null;
  }
}

export async function fetchSearchHotelsFromRegion(
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

    if (ROOM_DATA) {
      await cacheHotelRoomOffer(ROOM_DATA);
    }

    return ROOM_DATA ? ROOM_DATA : null;
  } catch (error) {
    console.error("Error fetching specific room offer:", error);
    return null;
  }
}
