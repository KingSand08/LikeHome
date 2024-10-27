// add token storage on client later

import { API_TOKEN_ROUTE, APIValidTokenResponse } from "@/types/token-api/types";
import { NextRequest } from "next/server";


export async function getAccessToken(req: NextRequest) {
    try {
      const tokenUrl = new URL(API_TOKEN_ROUTE, req.nextUrl.origin);
      const tokenResponse = await fetch(tokenUrl.toString());
      const data: APIValidTokenResponse = await tokenResponse.json();
  
      console.log("Token response data:", data);
  
      return data.access_token || null;
    } catch (error) {
      console.error("Error fetching access token:", error);
      return null;
    }
  }