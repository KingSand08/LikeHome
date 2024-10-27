import { APIValidTokenResponse } from "@/types/amadeus-api/token-api/types";
import { NextResponse } from "next/server";

const TOKEN_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const CLIENT_ID = process.env.HOTEL_API_KEY;
const CLIENT_SECRET = process.env.HOTEL_API_SECRET;


export async function GET() {
  try {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      console.error("Missing API credentials");
      return NextResponse.json(
        { error: "Server configuration error (missing .env variables)" },
        { status: 500 }
      );
    }

    const tokenResponse = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      cache: 'no-store',
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Error fetching access token:", errorText);
      return NextResponse.json(
        { error: errorText },
        { status: tokenResponse.status }
      );
    }

    const tokenData: APIValidTokenResponse = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("Invalid token response received:", tokenData);
      return NextResponse.json(
        { error: "Invalid token response" },
        { status: 500 }
      );
    }

    console.log("Successful token retrieval");
    return NextResponse.json(tokenData);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
