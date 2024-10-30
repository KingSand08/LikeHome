import { validateDomainAndLocale } from "@/lib/rapid-hotel-api/validateDomainLocale";
import { APIRegionSearchResponseJSON } from "@/types/rapid-hotels-api/api-json-docs/hotels-region-doc";
import { API_OPTIONS } from "@/lib/rapid-hotel-api/api-setup";
import {
  DEFAULT_DOMAIN,
  DEFAULT_LOCALE,
  REGION_SEARCH_URL,
} from "@/types/rapid-hotels-api/region-search-types";
import { NextRequest, NextResponse } from "next/server";

interface validateSearchParams {
  query: string | null;
  endpoint: string | null;
  error?: string | null;
}

function validateSearchParams(searchParams: URLSearchParams) {
  const query = encodeURIComponent(searchParams.get("query") || "");
  const domain = searchParams.get("domain") || DEFAULT_DOMAIN;
  const locale = searchParams.get("locale") || DEFAULT_LOCALE;
  let errors: string[] = [];

  // Validate query
  if (!query || query == "")
    errors = [...errors, "Missing searchParam: query."];

  // Validate domain and locale
  const domainLocaleErrors = validateDomainAndLocale(domain, locale);
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
  const combinedSearchParams = new URLSearchParams({
    query,
    domain: domain!,
    locale: locale!,
  });
  return {
    query: searchParams.toString(),
    endpoint: `${REGION_SEARCH_URL}?${combinedSearchParams.toString()}`,
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
  if (!endpoint || error) {
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
        {
          error: `Failed to fetch data from API: ${response.statusText}. Status code: ${response.status} Endpoint: ${endpoint}`,
        },
        { status: response.status }
      );
    }

    const JSON_DATA: APIRegionSearchResponseJSON = await response.json();
    const PAYLOAD: RegionListResult[] = JSON_DATA.data.map((regionItem) => ({
      region_id: regionItem.gaiaId,
      type: regionItem.type,
      regionNames: {
        fullName: regionItem.regionNames.fullName,
        shortName: regionItem.regionNames.shortName,
        displayName: regionItem.regionNames.displayName, // Would recommend this as the name
        primaryDisplayName: regionItem.regionNames.primaryDisplayName,
        secondaryDisplayName: regionItem.regionNames.secondaryDisplayName,
        lastSearchName: regionItem.regionNames.lastSearchName,
      },
      coordinates: {
        // Geocode
        lat: regionItem.coordinates.lat,
        long: regionItem.coordinates.long,
      },
      country: {
        name: regionItem.hierarchyInfo.country.name,
        domain: regionItem.hierarchyInfo.country.isoCode2, // Using isoCode2 as domain.
      },
    }));

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

type RegionListResult = {
  region_id: string;
  type: "CITY" | "AIRPORT" | "POI" | "NEIGHBORHOOD" | "MULTICITY" | string;
  regionNames: {
    fullName: string;
    shortName: string;
    displayName: string; // Would recommend this as the name
    primaryDisplayName: string;
    secondaryDisplayName: string;
    lastSearchName: string;
  };
  coordinates: {
    // Geocode
    lat: string;
    long: string;
  };
  country: {
    name: string;
    domain: string; // Using isoCode2 as domain.
  };
};
