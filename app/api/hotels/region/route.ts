import { API_OPTIONS } from "@/types/rapid-hotels-api/api-types";
import {
  REGION_SEARCH_URL,
  RegionSearchDomainOptions,
  RegionSearchLocaleOptions,
} from "@/types/rapid-hotels-api/region-search-types";
import { NextRequest, NextResponse } from "next/server";

interface validateSearchParams {
  query: string | null;
  endpoint: string | null;
  error?: string | null;
}

function validateSearchParams(searchParams: URLSearchParams) {
  const query = encodeURIComponent(searchParams.get("query") || "");
  const domain = searchParams.get("domain");
  const locale = searchParams.get("locale");

  const isValidDomain =
    domain && (RegionSearchDomainOptions as readonly string[]).includes(domain);
  const isValidLocale =
    locale && (RegionSearchLocaleOptions as readonly string[]).includes(locale);

  if (query && isValidDomain && isValidLocale) {
    const combinedSearchParams = new URLSearchParams({
      query,
      domain: domain!,
      locale: locale!,
    }).toString();

    return {
      query,
      endpoint: `${REGION_SEARCH_URL}?${combinedSearchParams}`,
    };
  }

  let errorMessage = "";
  if (!isValidDomain) {
    errorMessage += `Invalid domain. Expected one of: ${RegionSearchDomainOptions.join(
      ", "
    )}. `;
  }
  if (!isValidLocale) {
    errorMessage += `Invalid locale. Expected one of: ${RegionSearchLocaleOptions.join(
      ", "
    )}. `;
  }

  return {
    query,
    endpoint: null,
    error: errorMessage,
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
        error: `Invalid input given searchParams: ${query}. \n ${error}`,
      },
      {
        status: 400,
      }
    );
  }

  try {
    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch data from API: ${response.statusText}` },
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

// API Response
type RegionResult = {
  "@type": "gaiaRegionResult";
  index: string;
  gaiaId: string;
  type: "CITY" | "AIRPORT" | "POI" | "NEIGHBORHOOD" | "MULTICITY" | string;
  regionNames: {
    fullName: string;
    shortName: string;
    displayName: string;
    primaryDisplayName: string;
    secondaryDisplayName: string;
    lastSearchName: string;
  };
  essId: {
    sourceName: "GAI";
    sourceId: string;
  };
  coordinates: {
    lat: string;
    long: string;
  };
  hierarchyInfo: {
    country: {
      name: string;
      isoCode2: string;
      isoCode3: string;
    };
    airport?: {
      airportCode: string;
      airportId: string;
      metrocode?: string;
      multicity: string;
    };
    relation?: string[];
  };
  isMinorAirport?: "false";
};

type RegionSearchAPIResponse = {
  query: string;
  data: RegionResult[];
};
