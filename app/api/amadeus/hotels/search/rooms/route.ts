import { getAccessToken } from "@/lib/amadeus-api/tokenstorage";
import {
  HotelRoomOfferPricing,
  HotelRoomOffers,
} from "@/types/amadeus-api/hotel-search-api/hotels-rooms-types";
import { NextRequest, NextResponse } from "next/server";

// https://developers.amadeus.com/self-service/category/hotels/api-doc/hotel-search/api-reference

// given a hotelID, find a room. What rooms they offer

const ERROR_MESSAGE =
  "Ensure both 'cityCode' or 'hotelIds' are present" as const;
const BASE_URL =
  "https://test.api.amadeus.com/v3/shopping/hotel-offers" as const;

function validateSearchParams(searchParams: URLSearchParams): {
  query: HotelRoomOffers | HotelRoomOfferPricing | null;
} {
  const hasHotelIds = searchParams.has("hotelIds");
  const hasofferId = searchParams.has("offerId");

  const hasHotelIdsOnly = hasHotelIds && !hasofferId
  const hasOfferIdOnly = hasofferId && !hasHotelIds

  if (hasHotelIdsOnly) {

  }


  if (hasOfferIdOnly) {
    
  }

  return { query: null };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  return NextResponse.json("good", { status: 200 });
}
