import { ApiHotelSearchResponseJSON } from "@/types/rapid-hotels-api/api-json-docs/hotels-search-doc";
import {
  API_OPTIONS,
  buildURLSearchParams,
  validateSearchParamsOutput,
} from "@/lib/rapid-hotel-api/api-setup";
import { NextRequest, NextResponse } from "next/server";
import {
  API_HOTEL_SEARCH_URL,
  hotelSearchParamsRefinedSchema,
  HotelsSearchAccessibilityOptions,
  HotelsSearchAmenitiesOptions,
  HotelsSearchAvailableFilterOptions,
  HotelsSearchLodgingOptions,
  HotelsSearchMealPlanOptions,
  HotelsSearchPaymentTypeOptions,
} from "@/lib/rapid-hotel-api/zod/hotel-search-schemas";

function validateSearchParams(
  searchParams: URLSearchParams
): validateSearchParamsOutput {
  const parseResult = hotelSearchParamsRefinedSchema.safeParse({
    // Required
    checkin_date: searchParams.get("checkin_date"),
    checkout_date: searchParams.get("checkout_date"),
    adults_number: searchParams.get("adults_number")
      ? parseInt(searchParams.get("adults_number")!, 10)
      : undefined,
    region_id: searchParams.get("region_id"),

    // Required with default values
    sort_order: searchParams.get("sort_order"),
    locale: searchParams.get("locale"),
    domain: searchParams.get("domain"),

    // Optional
    price_min: searchParams.get("price_min")
      ? parseInt(searchParams.get("price_min")!, 10)
      : undefined,
    price_max: searchParams.get("price_max")
      ? parseInt(searchParams.get("price_max")!, 10)
      : undefined,
    star_rating_ids: searchParams.get("star_rating_ids")
      ? searchParams
          .get("star_rating_ids")!
          .split(",")
          .map((id) => parseInt(id, 10))
      : undefined,
    guest_rating_min: searchParams.get("guest_rating_min")
      ? parseFloat(searchParams.get("guest_rating_min")!)
      : undefined,
    children_ages: searchParams.get("children_ages")
      ? searchParams
          .get("children_ages")!
          .split(",")
          .map((age) => parseInt(age, 10))
      : undefined,
    page_number: searchParams.get("page_number")
      ? parseInt(searchParams.get("page_number")!, 10)
      : undefined,
    accessibility: searchParams.get("accessibility")
      ? (searchParams
          .get("accessibility")!
          .split(",") as (typeof HotelsSearchAccessibilityOptions)[number][])
      : undefined,
    amenities: searchParams.get("amenities")
      ? (searchParams
          .get("amenities")!
          .split(",") as (typeof HotelsSearchAmenitiesOptions)[number][])
      : undefined,
    lodging_type: searchParams.get("lodging_type")
      ? (searchParams
          .get("lodging_type")!
          .split(",") as (typeof HotelsSearchLodgingOptions)[number][])
      : undefined,
    meal_plan: searchParams.get("meal_plan")
      ? (searchParams
          .get("meal_plan")!
          .split(",") as (typeof HotelsSearchMealPlanOptions)[number][])
      : undefined,
    payment_type: searchParams.get("payment_type")
      ? (searchParams
          .get("payment_type")!
          .split(",") as (typeof HotelsSearchPaymentTypeOptions)[number][])
      : undefined,
    available_filter: searchParams.get("available_filter")
      ? (searchParams
          .get("available_filter")!
          .split(",") as (typeof HotelsSearchAvailableFilterOptions)[number][])
      : undefined,
  });

  if (!parseResult.success) {
    const errorMessages = parseResult.error.errors
      .map((err) => `searchParam: ${err.path.join("")} - ${err.message}`)
      .join(" & ");

    return {
      query: searchParams.toString(),
      endpoint: null,
      error: `Errors: ${errorMessages}`,
    };
  }

  const validParams = Object.entries(parseResult.data)
    .filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        (!Array.isArray(value) || value.length > 0)
    )
    .reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.map((item) => item.toString()).join(",");
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string | number | boolean>);

  // Create URLSearchParams only with valid parameters
  const combinedSearchParams = buildURLSearchParams(validParams);
  return {
    query: searchParams.toString(),
    endpoint: `${API_HOTEL_SEARCH_URL}?${combinedSearchParams.toString()}`,
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
      return NextResponse.json(
        {
          error: `Failed to fetch data from API: ${response.statusText}. Status code: ${response.status} Endpoint: ${endpoint}`,
        },
        { status: response.status }
      );
    }

    const JSON_DATA: ApiHotelSearchResponseJSON = await response.json();
    const PAYLOAD: APIHotelSearchJSONFormatted = {
      priceRange: {
        maxPrice: JSON_DATA.filterMetadata?.priceRange?.max ?? 0,
        minPrice: JSON_DATA.filterMetadata?.priceRange?.min ?? 0,
      },
      summary: {
        matchedPropertiesSize: JSON_DATA.summary?.matchedPropertiesSize ?? 0,
      },
      properties:
        JSON_DATA.properties?.map(
          (propertyItem): APIHotelSearchHotelInfo => ({
            region_id: propertyItem.regionId ?? "",
            hotel_id: propertyItem.id ?? "",
            name: propertyItem.name ?? "Unknown",
            image: {
              description:
                propertyItem.propertyImage?.image?.description ??
                "No description",
              url: propertyItem.propertyImage?.image?.url ?? "",
              alt: propertyItem.propertyImage?.alt ?? "No alternative text",
            },
            coordinates: {
              lat: propertyItem.mapMarker?.latLong?.latitude ?? 0,
              long: propertyItem.mapMarker?.latLong?.longitude ?? 0,
            },
            reviews: {
              score: propertyItem.reviews?.score ?? 0,
              totalReviews: propertyItem.reviews?.total ?? 0,
              starRating: propertyItem.star ?? 0,
            },
            availability: {
              available: propertyItem.availability?.available ?? false,
              minRoomsLeft: propertyItem.availability?.minRoomsLeft ?? 0,
            },
            price: {
              amount: propertyItem.price?.lead?.amount ?? 0,
              currency: {
                code: propertyItem.price?.lead?.currencyInfo?.code ?? "",
                symbol: propertyItem.price?.lead?.currencyInfo?.symbol ?? "",
              },
            },
          })
        ) ?? [],
    };

    return NextResponse.json(PAYLOAD, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `An error occurred while fetching data | query: ${query} | endpoint: ${endpoint}`,
      },
      { status: 500, statusText: "No Idea" }
    );
  }
}

export type APIHotelSearchJSONFormatted = {
  priceRange: {
    maxPrice: number;
    minPrice: number;
  };
  properties: APIHotelSearchHotelInfo[] | [];
  summary: {
    matchedPropertiesSize: number;
  };
};
export type APIHotelSearchHotelInfo = {
  region_id: string;
  hotel_id: string;
  name: string;
  image: {
    description: string;
    url: string;
    alt: string;
  };
  coordinates: {
    // Geocode
    lat: number;
    long: number;
  };
  availability: {
    available: boolean;
    minRoomsLeft: number;
  };
  reviews: {
    score: number;
    totalReviews: number;
    starRating: number;
  };
  price: {
    amount: number;
    currency: {
      code: string;
      symbol: string;
    };
  };
};
