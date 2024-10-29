import { validateDateFormatAndDateRange } from "@/lib/rapid-hotel-api/validateDates";
import { validateDomainAndLocale } from "@/lib/rapid-hotel-api/validateDomainLocale";
import { ApiHotelRoomOffersResponseJSON } from "@/types/rapid-hotels-api/api-json-docs/hotel-room-offers-doc";
import { API_OPTIONS } from "@/types/rapid-hotels-api/api-types";
import { HOTEL_ROOM_OFFERS_URL } from "@/types/rapid-hotels-api/hotel-room-offers-types";
import {
  DEFAULT_LOCALE,
  DEFAULT_DOMAIN,
} from "@/types/rapid-hotels-api/region-search-types";
import { NextRequest, NextResponse } from "next/server";

function validateSearchParams(searchParams: URLSearchParams) {
  const requiredSearchParams = [
    "checkin_date",
    "checkout_date",
    "adults_number",
    "hotel_id",
  ];
  const requiredWithDefaultSearchParams = {
    locale: searchParams.get("locale") || DEFAULT_LOCALE,
    domain: searchParams.get("domain") || DEFAULT_DOMAIN,
  };
  const optionalSearchParams = ["children_ages"];
  let errors: string[] = [];

  // Validate required searchParams and check for missing searchParams.
  requiredSearchParams.forEach((searchParam) => {
    if (!searchParams.has(searchParam) || !searchParams.get(searchParam)) {
      errors.push(`Missing required searchParams: ${searchParam}`);
    }
  });

  // Validate check-in and check-out date formatting/range.
  const checkinDate = searchParams.get("checkin_date");
  const checkoutDate = searchParams.get("checkout_date");
  const dateErrors = validateDateFormatAndDateRange(checkinDate, checkoutDate);
  if (dateErrors) errors = [...errors, ...dateErrors];

  // Validate domain and locale
  const domainLocaleErrors = validateDomainAndLocale(
    requiredWithDefaultSearchParams.domain,
    requiredWithDefaultSearchParams.locale
  );
  if (domainLocaleErrors) errors = [...errors, ...domainLocaleErrors];

  // Check for errors in required searchParams
  if (errors.length > 0) {
    return {
      query: searchParams.toString(),
      endpoint: null,
      error: errors.join(" | "),
    };
  }

  // Create endpoint
  const validatedSearchParams = new URLSearchParams();

  Object.entries(requiredWithDefaultSearchParams).forEach(([key, value]) => {
    if (!searchParams.has(key)) {
      searchParams.set(key, value);
    }
  });

  searchParams.forEach((value, key) => {
    if (
      requiredSearchParams.includes(key) ||
      optionalSearchParams.includes(key) ||
      Object.keys(requiredWithDefaultSearchParams).includes(key)
    ) {
      validatedSearchParams.append(key, value);
    }
  });
  const endpoint = `${HOTEL_ROOM_OFFERS_URL}?${validatedSearchParams.toString()}`;

  return {
    query: validatedSearchParams.toString(),
    endpoint,
    error: null,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (!searchParams.toString()) {
    return NextResponse.json(
      {
        error: `Empty searchParams`,
      },
      {
        status: 400,
      }
    );
  }

  const { query, endpoint, error } = validateSearchParams(searchParams);
  if (!endpoint || !query || error) {
    return NextResponse.json(
      {
        error: `Invalid input given searchParam(s): ${query}. Error: ${error}`,
      },
      {
        status: 400,
      }
    );
  }

  // For testing
  // return NextResponse.json({ data: endpoint }, { status: 200 });

  try {
    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch data from API: ${response.statusText}. Status code: ${response.status} Endpoint: ${endpoint}`,
        },
        { status: response.status }
      );
    }

    const JSON_DATA: ApiHotelRoomOffersResponseJSON = await response.json();
    const PAYLOAD: HotelRoomOffersResult = {
      hotel_id: JSON_DATA.id,
      soldOut: JSON_DATA.soldOut,
      basePrice: JSON_DATA.stickyBar.displayPrice,
      hotelRoomOffers: JSON_DATA.categorizedListings.map(
        (categorizedListing) => ({
          hotel_room_id: categorizedListing.unitId,
          description:
            categorizedListing.primarySelections[0].propertyUnit.description,
          name: categorizedListing.header.text,
          galleryImages:
            categorizedListing.primarySelections[0].propertyUnit.unitGallery.gallery.map(
              (galleryImage, index) => ({
                description: galleryImage.image.description,
                url: galleryImage.image.url,
                index: index,
              })
            ),
        })
      ),
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

type HotelRoomOffersResult = {
  hotel_id: string;
  soldOut: boolean;
  basePrice: string;
  hotelRoomOffers: HotelRoom[];
};

type HotelRoom = {
  hotel_room_id: string;
  description: string;
  name: string;
  galleryImages: Images[];
};

type Images = {
  description: string;
  url: string;
};
