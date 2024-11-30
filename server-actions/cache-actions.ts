"use server";

import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";
import prisma from "@/prisma/client";

export async function cacheHotelDetails(
  APIHotelDetails: APIHotelDetailsJSONFormatted
) {
  const data = APIHotelDetails;
  await prisma.cachedHotel.upsert({
    where: { hotel_id: data.hotel_id },
    create: {
      ...data,
      location: {
        ...data.location,
        coordinates: {
          latitude: data.location.coordinates.latitude,
          longitude: data.location.coordinates.longitude,
        },
      },
    },
    update: {
      tagline: data.tagline,
      location: {
        ...data.location,
        coordinates: {
          latitude: data.location.coordinates.latitude,
          longitude: data.location.coordinates.longitude,
        },
      },
    },
  });

  console.log(`Hotel with ID ${data.hotel_id} cached successfully.`);
}

export async function cacheHotelRoomOffer(APIHotelRoomOffer: HotelRoomOffer) {
  const data = APIHotelRoomOffer;

  await prisma.cachedHotelRoomOffer.upsert({
    where: { hotel_room_id: data.hotel_room_id },
    create: {
      ...data,
    },
    update: {
      description: data.description,
      name: data.name,
      galleryImages: data.galleryImages,
    },
  });

  console.log(
    `HotelID ${data.hotel_id} - Hotel room offer with ID ${data.hotel_room_id} cached successfully.`
  );
}

export async function retrieveCacheHotelDetails(hotel_id: string) {
  try {
    const cachedHotel = await prisma.cachedHotel.findUnique({
      where: { hotel_id },
    });

    if (!cachedHotel) {
      console.log(`No cached hotel found for hotel_id: ${hotel_id}`);
      return null;
    }

    console.log(`Cached hotel retrieved for hotel_id: ${hotel_id}`);
    return cachedHotel;
  } catch (error) {
    console.error(
      `Error retrieving cached hotel for hotel_id: ${hotel_id}`,
      error
    );
    return null;
  }
}

export async function retrieveCacheHotelRoomOffer(hotel_room_id: string) {
  try {
    const cachedRoomOffer = await prisma.cachedHotelRoomOffer.findUnique({
      where: { hotel_room_id },
    });

    if (!cachedRoomOffer) {
      console.log(
        `No cached room offer found for hotel_room_id: ${hotel_room_id}`
      );
      return null;
    }

    console.log(
      `Cached room offer retrieved for hotel_room_id: ${hotel_room_id}`
    );
    return cachedRoomOffer;
  } catch (error) {
    console.error(
      `Error retrieving cached room offer for hotel_room_id: ${hotel_room_id}`,
      error
    );
    return null;
  }
}
