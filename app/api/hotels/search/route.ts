import {
  validateDateFormat,
  validateDateRange,
} from "@/lib/rapid-hotel-api/validateDates";
import {
  validateDomain,
  validateLocale,
} from "@/lib/rapid-hotel-api/validateDomainLocale";
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
    "region_id",
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

  // Validate min and max price range.
  const minPrice = searchParams.get("price_min");
  const maxPrice = searchParams.get("price_max");
  const priceRangeError = validatePriceRange(minPrice, maxPrice);
  if (priceRangeError) errors.push(priceRangeError);

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

// Refer to types/rapid-hotels-api/hotel-search-types.ts for API input searchParams. See HotelsSearchQuery.

// Hotel Search API output:

// Level 0 - API output
type PropertySearchResults = {
  __typename: "PropertySearchResults";
  filterMetadata: PropertyFilterMetadata;
  properties: Property[];
  universalSortAndFilter: {}; // Placeholder, as details are not required
  propertySearchListings: {}; // Placeholder, as details are not required
  summary: {}; // Placeholder, as details are not required
  searchCriteria: {}; // Placeholder, as details are not required
  shoppingContext: {}; // Placeholder, as details are not required
  map: {}; // Placeholder, as details are not required
  clickstream: {}; // Placeholder, as details are not required
  [key: string]: any;
};

// Level 1 - filterMetadata
type PropertyFilterMetadata = {
  __typename: "PropertyFilterMetadata";
  priceRange: PriceRange; // Set absolute minPrice and maxPrice based on this data if price range not provided.
  [key: string]: any;
};
type PriceRange = {
  __typename: "PriceRange";
  max: number;
  min: number;
  [key: string]: any;
};

// Level 1 - properties
type Property = {
  __typename: "Property";
  id: string;
  name: string;
  featuredMessages: any[];
  availability: PropertyAvailability;
  propertyImage: PropertyImage;
  destinationInfo: PropertyDestinationInfo;
  legalDisclaimer: string | null;
  listingFooter: string | null;
  mapMarker: MapMarker;
  neighborhood: Region;
  offerBadge: string | null;
  offerSummary: OfferSummary;
  pinnedDetails: string | null;
  price: PropertyPrice;
  priceAfterLoyaltyPointsApplied: PropertyPrice;
  propertyFees: any[];
  reviews: PropertyReviewsSummary;
  star: number | null;
  supportingMessages: string | null;
  regionId: string;
  priceMetadata: PropertyPriceMetadata;
  saveTripItem: string | null;
  [key: string]: any;
};

// Level 2 - Property attributes
type PropertyAvailability = {
  __typename: "PropertyAvailability";
  available: boolean;
  minRoomsLeft: number | null;
};

type PropertyImage = {
  __typename: "PropertyImage";
  alt: string;
  fallbackImage: string | null;
  image: Image;
  subjectId: number;
};

type Image = {
  __typename: "Image";
  description: string;
  url: string;
};

type PropertyDestinationInfo = {
  __typename: "PropertyDestinationInfo";
  distanceFromDestination: Distance;
  distanceFromMessaging: string;
  regionId: string;
};

type Distance = {
  __typename: "Distance";
  unit: string;
  value: number;
};

type MapMarker = {
  __typename: "MapMarker";
  label: string;
  latLong: Coordinates;
};

type Coordinates = {
  __typename: "Coordinates";
  latitude: number;
  longitude: number;
};

type Region = {
  __typename: "Region";
  name: string;
};

type OfferSummary = {
  __typename: "OfferSummary";
  messages: OfferSummaryMessage[];
  attributes: OfferAttribute[];
};

type OfferSummaryMessage = {
  __typename: "OfferSummaryMessage";
  message: string;
  theme: string;
  type: string;
  mark: string | null;
};

type OfferAttribute = {
  __typename: "OfferAttribute";
  type: string;
};

type PropertyPrice = {
  __typename: "PropertyPrice";
  options: PropertyPriceOption[];
  priceMessaging: string | null;
  lead: Money;
  strikeOut: Money;
  displayMessages: PriceDisplayMessage[];
  strikeOutType: string;
  priceMessages: LodgingPlainMessage[];
};

type PropertyPriceOption = {
  __typename: "PropertyPriceOption";
  strikeOut: Money;
  disclaimer: LodgingPlainMessage;
  formattedDisplayPrice: string;
};

type Money = {
  __typename: "Money";
  amount: number;
  formatted: string;
  currencyInfo?: Currency; // Optional if needed in some contexts
};

type Currency = {
  __typename: "Currency";
  code: string;
  symbol: string;
};

type PriceDisplayMessage = {
  __typename: "PriceDisplayMessage";
  lineItems: (LodgingEnrichedMessage | DisplayPrice)[];
};

type LodgingEnrichedMessage = {
  __typename: "LodgingEnrichedMessage";
  accessibilityLabel: string | null;
  mark: string | null;
  state: string;
  value: string;
  badge: string | null;
};

type DisplayPrice = {
  __typename: "DisplayPrice";
  disclaimer: LodgingPlainDialog | null;
  price: FormattedMoney;
  role: string;
};

type LodgingPlainDialog = {
  __typename: "LodgingPlainDialog";
  content: string[];
  title: string | null;
};

type FormattedMoney = {
  __typename: "FormattedMoney";
  formatted: string;
  accessibilityLabel: string;
};

type LodgingPlainMessage = {
  __typename: "LodgingPlainMessage";
  value: string;
};

type PropertyReviewsSummary = {
  __typename: "PropertyReviewsSummary";
  score: number;
  total: number;
};

type PropertyPriceMetadata = {
  __typename: "PropertyPriceMetadata";
  discountType: string;
  rateDiscount: RateDiscount;
  totalDiscountPercentage: number;
};

type RateDiscount = {
  __typename: "RateDiscount";
  description: string;
};
