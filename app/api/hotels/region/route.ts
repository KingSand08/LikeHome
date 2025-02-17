import { APIRegionSearchResponseJSON } from "@/types/rapid-hotels-api/api-json-docs/hotels-region-doc";
import {
  API_OPTIONS,
  buildURLSearchParams,
  validateSearchParamsOutput,
} from "@/lib/rapid-hotel-api/api-setup";
import { NextRequest, NextResponse } from "next/server";
import {
  API_REGION_SEARCH_URL,
  regionSearchParamsSchema,
} from "@/lib/rapid-hotel-api/zod/region-search-schemas";
import prisma from "@/prisma/client";
import { Region } from "@prisma/client";

function validateSearchParams(
  searchParams: URLSearchParams
): validateSearchParamsOutput {
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
  if (true) { // set to true for mock data (process.env.NODE_ENV === "development")
    const query = searchParams.get("query") ?? "Unknown";
    const mockRegionDetailsData: Omit<Region, "id">[] = Array(10)
      .fill(0)
      .map((_, index) => ({
        region_id: `${index}`,
        type: `${query}`,
        regionNames: {
          shortName: `${query} Short Name ${index}`,
          fullName: `${query} Full Name ${index}`,
          displayName: `${query} ${index}`,
          primaryDisplayName: `${query} Primary Display Name ${index}`,
          secondaryDisplayName: `${query} Secondary Display Name ${index}`,
          lastSearchName: `${query} Last Search Name ${index}`,
        },
        coordinates: { latitude: 0, longitude: 0 },
        country: { name: "USA", domain: "US" },
      }));

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json(mockRegionDetailsData, { status: 200 });
  }
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
        { status: response.status, statusText: response.statusText }
      );
    }

    const JSON_DATA: APIRegionSearchResponseJSON = await response.json();
    const PAYLOAD: Omit<Region, "id">[] =
      JSON_DATA.data?.map((regionItem) => ({
        region_id: regionItem.gaiaId ?? "",
        type: regionItem.type ?? "Unknown",
        regionNames: {
          fullName: regionItem.regionNames?.fullName ?? "Unknown",
          shortName: regionItem.regionNames?.shortName ?? "Unknown",
          displayName: regionItem.regionNames?.displayName ?? "Unknown", // Recommended name
          primaryDisplayName:
            regionItem.regionNames?.primaryDisplayName ?? "Unknown",
          secondaryDisplayName:
            regionItem.regionNames?.secondaryDisplayName ?? "Unknown",
          lastSearchName: regionItem.regionNames?.lastSearchName ?? "Unknown",
        },
        coordinates: {
          // Geocode
          latitude: Number(regionItem.coordinates?.lat) ?? 0,
          longitude: Number(regionItem.coordinates?.long) ?? 0,
        },
        country: {
          name: regionItem.hierarchyInfo?.country?.name ?? "Unknown",
          domain: regionItem.hierarchyInfo?.country?.isoCode2 ?? "", // Using isoCode2 as domain.
        },
      })) ?? [];

    // update the cached regions before returning the response
    mongoDBCreateMany(PAYLOAD);
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

function mongoDBCreateMany(data: Omit<Region, "id">[]) {
  // remove duplicates by region_id
  const uniqueData = data.filter(
    (value, index, self) =>
      self.findIndex((t) => t.region_id === value.region_id) === index
  );

  // create many
  prisma.region.createMany({
    data: uniqueData,
  });
}
