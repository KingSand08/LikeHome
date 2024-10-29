import {
  validateDateFormat,
  validateDateRange,
} from "@/lib/rapid-hotel-api/validateDates";
import {
  validateDomain,
  validateLocale,
} from "@/lib/rapid-hotel-api/validateDomainLocale";
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
  const errors: string[] = [];

  // Validate required searchParams and check for missing searchParams.
  requiredSearchParams.forEach((searchParam) => {
    if (!searchParams.has(searchParam) || !searchParams.get(searchParam)) {
      errors.push(`Missing required searchParams: ${searchParam}`);
    }
  });

  // Validate check-in and check-out date formatting/range.
  const checkinDate = searchParams.get("checkin_date");
  const checkoutDate = searchParams.get("checkout_date");
  const checkinDateFormatError = validateDateFormat(
    checkinDate,
    "checkin_date"
  );
  const checkoutDateFormatError = validateDateFormat(
    checkoutDate,
    "checkout_date"
  );
  if (checkinDateFormatError) errors.push(checkinDateFormatError);
  if (checkoutDateFormatError) errors.push(checkoutDateFormatError);
  // Validate date range between check-in and check-out dates
  const dateRangeError = validateDateRange(checkinDate, checkoutDate);
  if (dateRangeError) errors.push(dateRangeError);

  // Validate domain and locale
  const domainError = validateDomain(requiredWithDefaultSearchParams.domain);
  const localeError = validateLocale(requiredWithDefaultSearchParams.locale);
  if (domainError) errors.push(domainError);
  if (localeError) errors.push(localeError);

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
  //   return NextResponse.json({ data: endpoint }, { status: 200 });

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
