import { getAccessToken } from "@/lib/amadeus-api/tokenstorage";
import {
  HotelListByCity,
  HotelListByLatitude,
  HotelListByUniqueID,
} from "@/types/amadeus-api/hotel-search-api/hotels-list-types";
import { NextRequest, NextResponse } from "next/server";

// https://developers.amadeus.com/self-service/category/hotels/api-doc/hotel-list/api-reference

const ERROR_MESSAGE =
  "Ensure either 'cityCode' or 'hotelIds' are present. Otherwise, both 'latitude' and 'longitude' are provided (geocode)." as const;
const BASE_URL =
  "https://test.api.amadeus.com/v1/reference-data/locations/hotels" as const;
const APPEND_QUERY_URL = {
  cityCode: "/by-city",
  hotelIds: "/by-hotels",
  latitude: "/by-geocode",
} as const;

function validateSearchParams(searchParams: URLSearchParams): {
  query: HotelListByCity | HotelListByLatitude | HotelListByUniqueID | null;
  endpoint: string | null;
} {
  const hasCityCode = searchParams.has("cityCode");
  const hasHotelIds = searchParams.has("hotelIds");
  const hasLatitude = searchParams.has("latitude");
  const hasLongitude = searchParams.has("longitude");

  const hasCityCodeOnly =
    hasCityCode && !hasHotelIds && !hasLatitude && !hasLongitude;
  const hasHotelIdsOnly =
    hasHotelIds && !hasCityCode && !hasLatitude && !hasLongitude;
  const hasGeocodeOnly =
    hasLatitude && hasLongitude && !hasCityCode && !hasHotelIds;

  if (hasCityCodeOnly) {
    const query: HotelListByCity = {
      cityCode: searchParams.get("cityCode")!,
      radius: searchParams.get("radius")
        ? parseFloat(searchParams.get("radius")!)
        : undefined,
      radiusUnit:
        (searchParams.get("radiusUnit") as "KM" | "MILE") || undefined,
      chainCodes: searchParams.getAll("chainCodes"),
      amenities: searchParams.getAll(
        "amenities"
      ) as HotelListByCity["amenities"],
      ratings: searchParams.getAll("ratings") as HotelListByCity["ratings"],
      hotelSource:
        (searchParams.get("hotelSource") as
          | "BEDBANK"
          | "DIRECTCHAIN"
          | "ALL") || undefined,
    };
    return { query, endpoint: APPEND_QUERY_URL.cityCode };
  }

  if (hasHotelIdsOnly) {
    const query: HotelListByUniqueID = {
      hotelIds: searchParams.getAll("hotelIds"),
    };
    return { query, endpoint: APPEND_QUERY_URL.hotelIds };
  }

  if (hasGeocodeOnly) {
    const query: HotelListByLatitude = {
      latitude: parseFloat(searchParams.get("latitude")!),
      longitude: parseFloat(searchParams.get("longitude")!),
      radius: searchParams.get("radius")
        ? parseFloat(searchParams.get("radius")!)
        : undefined,
      radiusUnit:
        (searchParams.get("radiusUnit") as "KM" | "MILE") || undefined,
      chainCodes: searchParams.getAll("chainCodes"),
      amenities: searchParams.getAll(
        "amenities"
      ) as HotelListByLatitude["amenities"],
      ratings: searchParams.getAll("ratings") as HotelListByLatitude["ratings"],
      hotelSource:
        (searchParams.get("hotelSource") as
          | "BEDBANK"
          | "DIRECTCHAIN"
          | "ALL") || undefined,
    };
    return { query, endpoint: APPEND_QUERY_URL.latitude };
  }
  return { query: null, endpoint: null };
}

function buildQueryUrl(
  query: HotelListByCity | HotelListByLatitude | HotelListByUniqueID,
  endpoint: string
): string {
  const url = new URL(BASE_URL + endpoint);

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => url.searchParams.append(key, item));
    } else if (value !== undefined) {
      url.searchParams.append(key, value.toString());
    }
  });

  return url.toString();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Validate search params
  if (!searchParams.toString()) {
    return NextResponse.json(
      {
        error: `Missing searchParams: ${ERROR_MESSAGE}`,
      },
      { status: 400 }
    );
  }
  const { query, endpoint } = validateSearchParams(searchParams);
  if (!query || !endpoint) {
    return NextResponse.json(
      {
        error: `Invalid searchParams: ${ERROR_MESSAGE}`,
      },
      { status: 400 }
    );
  }
  const accessToken = await getAccessToken(req);
  if (!accessToken) {
    return NextResponse.json(
      { error: "Failed to retrieve access token" },
      { status: 500 }
    );
  }

  // Build the complete API URL with query parameters
  const apiUrl = buildQueryUrl(query, endpoint);

  // Use API with apiURL and correct searchparams
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}
