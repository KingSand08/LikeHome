"use server";

import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
import { APIRegion } from "@/app/api/hotels/region/route";
import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";
import prisma from "@/prisma/client";

export async function cacheRegion(region: APIRegion) {
  if (!region.region_id || region.region_id === "") {
    console.log("Skipping cacheRegion from invalid region id");
    return;
  }
  try {
    await prisma.cachedRegion.upsert({
      where: {
        region_id: region.region_id,
      },
      update: {
        type: region.type,
        regionNames: {
          fullName: region.regionNames.fullName,
          shortName: region.regionNames.shortName,
          displayName: region.regionNames.displayName,
          primaryDisplayName: region.regionNames.primaryDisplayName,
          secondaryDisplayName: region.regionNames.secondaryDisplayName,
          lastSearchName: region.regionNames.lastSearchName,
        },
        coordinates: {
          latitude: region.coordinates.latitude,
          longitude: region.coordinates.longitude,
        },
        country: {
          name: region.country.name,
          domain: region.country.domain,
        },
      },
      create: {
        region_id: region.region_id,
        type: region.type,
        regionNames: {
          fullName: region.regionNames.fullName,
          shortName: region.regionNames.shortName,
          displayName: region.regionNames.displayName,
          primaryDisplayName: region.regionNames.primaryDisplayName,
          secondaryDisplayName: region.regionNames.secondaryDisplayName,
          lastSearchName: region.regionNames.lastSearchName,
        },
        coordinates: {
          latitude: region.coordinates.latitude,
          longitude: region.coordinates.longitude,
        },
        country: {
          name: region.country.name,
          domain: region.country.domain,
        },
      },
    });
    console.log("Region cached successfully:", region.region_id);
  } catch (error) {
    console.error("Error caching region:", region.region_id, error);
  }
}

export async function retrieveCacheRegions(selectedRegionIDs: string[]) {
  try {
    const fetchPromises = selectedRegionIDs.map(async (selectedRegionID) => {
      return await prisma.cachedRegion.findUnique({
        where: { region_id: selectedRegionID },
      });
    });

    const regions = await Promise.all(fetchPromises);
    return regions.filter((region) => region !== null);
  } catch (error) {
    console.error("Failed to retrieve regions:", error);
    return [] as APIRegion[];
  }
}

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

  if (!hotel_id || hotel_id === "" || hotel_room_id === "" || !hotel_room_id) {
    return;
  }

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
