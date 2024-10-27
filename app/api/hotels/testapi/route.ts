import { getAccessToken } from "@/lib/tokenstorage";
import { NextRequest, NextResponse } from "next/server";

const TEST_URL = "https://test.api.amadeus.com/v1/shopping/flight-destinations";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const origin = searchParams.get("origin") || "PAR";
  const maxPrice = searchParams.get("maxPrice") || "200";

  const accessToken = await getAccessToken(req);

  if (!accessToken) {
    return NextResponse.json(
      { error: "Failed to retrieve access token" },
      { status: 500 }
    );
  }

  try {
    const destinationResponse = await fetch(
      `${TEST_URL}?origin=${origin}&maxPrice=${maxPrice}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!destinationResponse.ok) {
      const errorText = await destinationResponse.text();
      console.error("Error fetching flight destinations:", errorText);
      return NextResponse.json(
        { error: errorText },
        { status: destinationResponse.status }
      );
    }

    const destinationsData = await destinationResponse.json();
    return NextResponse.json(destinationsData);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
