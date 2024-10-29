import { validateDateFormatAndDateRange } from "@/lib/rapid-hotel-api/validateDates";
import { validateDomainAndLocale } from "@/lib/rapid-hotel-api/validateDomainLocale";
import { validatePriceRange } from "@/lib/rapid-hotel-api/validatePriceRange";
import { API_OPTIONS } from "@/types/rapid-hotels-api/api-types";
import {
  DEFAULT_SORT_ORDER,
  HOTEL_ROOM_SEARCH_URL,
} from "@/types/rapid-hotels-api/hotel-search-types";
import {
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
} from "@/types/rapid-hotels-api/region-search-types";
import { NextRequest, NextResponse } from "next/server";

interface validateSearchParams {
  query: string | null;
  endpoint: string | null;
  error?: string | null;
}

function validateSearchParams(searchParams: URLSearchParams) {
  const requiredSearchParams = [
    "checkin_date",
    "checkout_date",
    "adults_number",
    "region_id", // Also known as gaiaId in region search api.
  ];
  const requiredWithDefaultSearchParams = {
    sort_order: searchParams.get("sort_order") || DEFAULT_SORT_ORDER,
    locale: searchParams.get("locale") || DEFAULT_LOCALE,
    domain: searchParams.get("domain") || DEFAULT_DOMAIN,
  };
  const optionalSearchParams = [
    "price_min",
    "price_max",
    "star_rating_ids",
    "guest_rating_min",
    "children_ages",
    "page_number",
    "accessibility",
    "amenities",
    "lodging_type",
    "meal_plan",
    "available_filter",
  ];
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

  // Validate min and max price range.
  const minPrice = searchParams.get("price_min");
  const maxPrice = searchParams.get("price_max");
  const priceRangeError = validatePriceRange(minPrice, maxPrice);
  if (priceRangeError) errors.push(priceRangeError);

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
  const endpoint = `${HOTEL_ROOM_SEARCH_URL}?${validatedSearchParams.toString()}`;

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
  // return NextResponse.json({data: endpoint}, {status: 200})

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

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `An error occurred while fetching data | query: ${query} | endpoint: ${endpoint}`,
      },
      { status: 500 }
    );
  }
}
