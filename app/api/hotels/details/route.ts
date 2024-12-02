import {
  API_OPTIONS,
  buildURLSearchParams,
  validateSearchParamsOutput,
} from "@/lib/rapid-hotel-api/api-setup";
import { NextRequest, NextResponse } from "next/server";
import {
  API_HOTEL_DETAILS_URL,
  hotelDetailsParamsSchema,
} from "@/lib/rapid-hotel-api/zod/hotel-details-schemas";
import { APIHotelDetailsResponseJSON } from "@/types/rapid-hotels-api/api-json-docs/hotels-details-doc";

function validateSearchParams(
  searchParams: URLSearchParams
): validateSearchParamsOutput {
  const parseResult = hotelDetailsParamsSchema.safeParse({
    hotel_id: searchParams.get("hotel_id"),
    domain: searchParams.get("domain"),
    locale: searchParams.get("locale"),
  });
  if (!parseResult.success) {
    const errorMessages = parseResult.error.errors
      .map((err) => `searchParam: ${err.path.join(" ")} - ${err.message}`)
      .join(" & ");

    return {
      query: searchParams.toString(),
      endpoint: null,
      error: `Errors: ${errorMessages}`,
    };
  }

  const combinedSearchParams = buildURLSearchParams(parseResult.data);
  return {
    query: searchParams.toString(),
    endpoint: `${API_HOTEL_DETAILS_URL}?${combinedSearchParams.toString()}`,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const { query, endpoint, error } = validateSearchParams(searchParams);
  if (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(endpoint!, API_OPTIONS);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from API: ${response.statusText} & Status code: ${response.status}`
      );
    }

    const JSON_DATA: APIHotelDetailsResponseJSON = await response.json();

    const PAYLOAD: APIHotelDetailsJSONFormatted = {
      hotel_id: JSON_DATA.summary?.id ?? "",
      name: JSON_DATA.summary?.name ?? "",
      tagline: JSON_DATA.summary?.tagline ?? "",
      location: {
        address: {
          addressLine: JSON_DATA.summary?.location?.address?.addressLine ?? "",
          city: JSON_DATA.summary?.location?.address?.city ?? "",
          province: JSON_DATA.summary?.location?.address?.province ?? "",
          countryCode: JSON_DATA.summary?.location?.address?.countryCode ?? "",
        },
        coordinates: {
          latitude: JSON_DATA.summary?.location?.coordinates?.latitude ?? 0,
          longitude: JSON_DATA.summary?.location?.coordinates?.longitude ?? 0,
        },
      },
      images:
        JSON_DATA.propertyGallery?.images?.map((image, index) => ({
          alt: image.accessibilityText ?? "",
          description: image.image?.description ?? "",
          url: image.image?.url ?? "",
          index,
        })) ?? [],
      reviews: {
        score:
          JSON_DATA.reviewInfo?.summary?.overallScoreWithDescriptionA11y
            ?.value ?? "",
        totalReviews:
          JSON_DATA.reviewInfo?.summary?.propertyReviewCountDetails
            ?.shortDescription ?? "",
      },
    };

    return NextResponse.json(PAYLOAD, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `An error occurred while fetching data | query: ${query} | endpoint: ${endpoint} | Custom error message: ${error}`,
      },
      { status: 500 }
    );
  }
}

export type APIHotelDetailsJSONFormatted = {
  hotel_id: string;
  name: string;
  tagline: string;
  location: Location;
  images: Image[];
  reviews: {
    score: string;
    totalReviews: string;
  };
};

type Image = {
  width: number;
  height: number;
  alt: string;
  description: string;
  url: string;
  index: number;
};

type Location = {
  address: {
    addressLine: string;
    city: string;
    province: string;
    countryCode: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
};
