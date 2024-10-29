import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.content.tripadvisor.com/api/v1/location" as const;
const APPEND_QUERY_URL = {
  searchQuery: "/search",
  latLong: "/nearby_search",
} as const;
const ENV_DEFINED_KEY = process.env.TRIPADVISOR_API_KEY;

function validateSearchParams(searchParams: URLSearchParams): {
  query: URLSearchParams | null;
  endpoint: string | null;
} {
  const key = searchParams.get("key") || ENV_DEFINED_KEY;
  const latLong = searchParams.get("latLong");
  const searchQuery = searchParams.get("searchQuery");
  let endpoint = "";

  if (key && (latLong || searchQuery)) {
    if (searchQuery) {
      endpoint = `${BASE_URL}${APPEND_QUERY_URL.searchQuery}`;
    }
    if (latLong) {
      endpoint = `${BASE_URL}${APPEND_QUERY_URL.latLong}`;
    }

    return { query: searchParams, endpoint };
  }

  return { query: null, endpoint: null };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const { query: searchParamQuery, endpoint: endpointURL } =
    validateSearchParams(searchParams);

  if (!searchParamQuery || !endpointURL) {
    return NextResponse.json(
      {
        error: `Invalid searchParams given or missing: ${searchParams} | REQUIRED: key AND (latLong or searchQuery)`,
      },
      {
        status: 400,
      }
    );
  }

  // Fetch Tripadvisor API
  try {
    const response = await fetch(endpointURL, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from API" },
        { status: response.status }
      );
    }
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `An error occurred while fetching data | query: ${searchParamQuery} | endpoint: ${endpointURL}`,
      },
      { status: 500 }
    );
  }
}