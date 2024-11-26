"use server";

import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
import {
  APIHotelRoomOffersJSONFormatted,
  HotelRoomOffer,
} from "@/app/api/hotels/search/rooms/route";
import {
  HOTEL_DETAILS_API_URL,
  HOTEL_ROOM_OFFERS_API_URL,
} from "@/lib/rapid-hotel-api/constants/ROUTES";
import { ReadonlyURLSearchParams } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
