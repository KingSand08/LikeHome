"use server";

import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";
import prisma from "@/prisma/client";

export async function cacheHotelDetails(
  APIHotelDetails: APIHotelDetailsJSONFormatted
) {
  const { hotel_id, tagline, location, images } = APIHotelDetails;

  const transformedLocation = {
    address: {
      addressLine: location.address.addressLine,
      city: location.address.city,
      province: location.address.province,
      countryCode: location.address.countryCode,
    },
    coordinates: {
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    },
  };

  const transformedImages = images.map((image) => ({
    description: image.description,
    url: image.url,
    alt: image.alt,
    index: image.index,
  }));

  await prisma.cachedHotel.upsert({
    where: { hotel_id },
    create: {
      hotel_id,
      tagline,
      location: transformedLocation,
      images: transformedImages,
    },
    update: {
      tagline,
      location: transformedLocation,
      images: transformedImages,
    },
  });

  console.log(`Hotel with ID ${hotel_id} cached successfully.`);
}

export async function cacheHotelRoomOffer(APIHotelRoomOffer: HotelRoomOffer) {
  const { hotel_id, hotel_room_id, description, name, galleryImages } =
    APIHotelRoomOffer;

  const transformedGalleryImages = galleryImages.map((image) => ({
    description: image.description,
    url: image.url,
    alt: image.alt,
    index: image.index,
  }));

  await prisma.cachedHotelRoomOffer.upsert({
    where: { hotel_room_id },
    create: {
      hotel_id,
      hotel_room_id,
      description,
      name,
      galleryImages: transformedGalleryImages,
    },
    update: {
      description,
      name,
      galleryImages: transformedGalleryImages,
    },
  });

  console.log(
    `HotelID ${hotel_id} - Hotel room offer with ID ${hotel_room_id} cached successfully.`
  );
}
