import { ApiHotelRoomOffersResponseJSON } from "@/types/rapid-hotels-api/api-json-docs/hotel-room-offers-doc";
import {
  API_OPTIONS,
  buildURLSearchParams,
  validateSearchParamsOutput,
} from "@/lib/rapid-hotel-api/api-setup";
import { NextRequest, NextResponse } from "next/server";
import {
  API_HOTEL_ROOM_OFFERS_URL,
  hotelRoomOffersParamsRefinedSchema,
} from "@/lib/rapid-hotel-api/zod/hotel-room-offers-schemas";

function validateSearchParams(
  searchParams: URLSearchParams
): validateSearchParamsOutput {
  const parseResult = hotelRoomOffersParamsRefinedSchema.safeParse({
    // Required
    checkin_date: searchParams.get("checkin_date"),
    checkout_date: searchParams.get("checkout_date"),
    adults_number: searchParams.get("adults_number")
      ? parseInt(searchParams.get("adults_number")!, 10)
      : undefined,
    hotel_id: searchParams.get("hotel_id"),

    // Required with default values
    locale: searchParams.get("locale"),
    domain: searchParams.get("domain"),

    // Optional
    children_ages: searchParams.get("children_ages")
      ? searchParams
          .get("children_ages")!
          .split(",")
          .map((age) => parseInt(age), 10)
      : undefined,
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

  // Create endpoint
  const combinedSearchParams = buildURLSearchParams(parseResult.data);
  return {
    query: searchParams.toString(),
    endpoint: `${API_HOTEL_ROOM_OFFERS_URL}?${combinedSearchParams.toString()}`,
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

    const JSON_DATA: ApiHotelRoomOffersResponseJSON = await response.json();
    const PAYLOAD: APIHotelRoomOffersJSONFormatted = {
      hotel_id: JSON_DATA.id ?? "",
      soldOut: JSON_DATA.soldOut ?? false,
      basePricePerNight: JSON_DATA.stickyBar?.displayPrice ?? "",
      hotelRoomOffers:
        JSON_DATA.categorizedListings?.map(
          (categorizedListing): HotelRoomOffer => ({
            hotel_id: JSON_DATA.id ?? "",
            hotel_room_id: categorizedListing.unitId ?? "",
            description:
              categorizedListing.primarySelections?.[0]?.propertyUnit
                ?.description ?? "No description available",
            name: categorizedListing.header?.text ?? "Unnamed room",
            galleryImages:
              categorizedListing.primarySelections?.[0]?.propertyUnit?.unitGallery?.gallery?.map(
                (galleryImage, index): Image => ({
                  description:
                    galleryImage.image?.description ?? "No description",
                  url: galleryImage.image?.url ?? "",
                  alt: galleryImage.image?.description ?? "",
                  index: index,
                })
              ) ?? [],
            pricePerNight: {
              amount:
                categorizedListing.primarySelections?.[0]?.propertyUnit
                  ?.ratePlans?.[0]?.priceDetails?.[0].price?.lead?.amount ?? 0,
              currency: {
                code:
                  categorizedListing.primarySelections?.[0]?.propertyUnit
                    ?.ratePlans?.[0]?.priceDetails?.[0].price?.lead
                    ?.currencyInfo?.code ?? "",
                symbol:
                  categorizedListing.primarySelections?.[0]?.propertyUnit
                    ?.ratePlans?.[0]?.priceDetails?.[0].price?.lead
                    ?.currencyInfo?.symbol ?? "",
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
      { status: 500 }
    );
  }
}

export type APIHotelRoomOffersJSONFormatted = {
  hotel_id: string;
  soldOut: boolean;
  basePricePerNight: string;
  hotelRoomOffers: HotelRoomOffer[];
};
export type HotelRoomOffer = {
  hotel_id: string;
  hotel_room_id: string;
  description: string;
  name: string;
  galleryImages: Image[];
  pricePerNight: {
    amount: number;
    currency: {
      code: string;
      symbol: string;
    };
  };
};
type Image = {
  description: string;
  url: string;
  alt: string;
  index: number;
};
