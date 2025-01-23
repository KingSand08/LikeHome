"use server";

import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";
import prisma from "@/prisma/client";

export async function cacheHotelDetails(
  APIHotelDetails: APIHotelDetailsJSONFormatted
) {
  const data = APIHotelDetails;

  // Map images to exclude unsupported fields like `width` and `height`
  const filteredImages = data.images.map(({ description, url, alt, index }) => ({
    description,
    url,
    alt,
    index,
  }));

  await prisma.cachedHotel.upsert({
    where: { hotel_id: data.hotel_id },
    create: {
      hotel_id: data.hotel_id,
      name: data.name,
      tagline: data.tagline,
      location: {
        address: {
          addressLine: data.location.address.addressLine,
          city: data.location.address.city,
          province: data.location.address.province,
          countryCode: data.location.address.countryCode,
        },
        coordinates: {
          latitude: data.location.coordinates.latitude,
          longitude: data.location.coordinates.longitude,
        },
      },
      images: filteredImages, // Filtered images
      reviews: data.reviews, // Assuming this is a JSON field
    },
    update: {
      tagline: data.tagline,
      location: {
        address: {
          addressLine: data.location.address.addressLine,
          city: data.location.address.city,
          province: data.location.address.province,
          countryCode: data.location.address.countryCode,
        },
        coordinates: {
          latitude: data.location.coordinates.latitude,
          longitude: data.location.coordinates.longitude,
        },
      },
      images: filteredImages, // Filtered images
      reviews: data.reviews, // Assuming this is a JSON field
    },
  });

  console.log(`Hotel with ID ${data.hotel_id} cached successfully.`);
}


export async function cacheHotelRoomOffer(APIHotelRoomOffer: HotelRoomOffer) {
  const { hotel_id, hotel_room_id, description, name, galleryImages } =
    APIHotelRoomOffer;

  // Filter images to exclude unsupported fields
  const filteredGalleryImages = galleryImages.map(
    ({ description, url, alt, index }) => ({
      description,
      url,
      alt,
      index,
    })
  );

  await prisma.cachedHotelRoomOffer.upsert({
    where: { hotel_room_id },
    create: {
      hotel_id,
      hotel_room_id,
      description,
      name,
      galleryImages: filteredGalleryImages,
    },
    update: {
      description,
      name,
      galleryImages: filteredGalleryImages,
    },
  });

  console.log(
    `HotelID ${hotel_id} - Hotel room offer with ID ${hotel_room_id} cached successfully.`
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
