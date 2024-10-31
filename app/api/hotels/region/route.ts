import { APIRegionSearchResponseJSON } from "@/types/rapid-hotels-api/api-json-docs/hotels-region-doc";
import {
  API_OPTIONS,
  buildURLSearchParams,
} from "@/lib/rapid-hotel-api/api-setup";
import { NextRequest, NextResponse } from "next/server";
import {
  API_REGION_SEARCH_URL,
  regionSearchParamsSchema,
} from "@/lib/rapid-hotel-api/zod/region-search-schemas";

function validateSearchParams(searchParams: URLSearchParams) {
  const parseResult = regionSearchParamsSchema.safeParse({
    query: searchParams.get("query"),
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

  // Create endpoint
  const combinedSearchParams = buildURLSearchParams(parseResult.data);
  return {
    query: searchParams.toString(),
    endpoint: `${API_REGION_SEARCH_URL}?${combinedSearchParams.toString()}`,
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
          error: `Failed to fetch data from API: ${response.statusText} & Status code: ${response.status} & Endpoint: ${endpoint}`,
        },
        { status: response.status }
      );
    }

    const JSON_DATA: APIRegionSearchResponseJSON = await response.json();
    const PAYLOAD: APIRegionJSONFormatted = JSON_DATA.data.map(
      (regionItem) => ({
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
      })
    );

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

type APIRegionJSONFormatted = {
  region_id: string;
  type: string;
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
}[];
