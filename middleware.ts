import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  const session = await auth();

  const requestedUrl = request.nextUrl.pathname + request.nextUrl.search;

  console.log(`Middleware Requested URL: ${requestedUrl}`);

  // If no session and route requires authentication
  if (!session && request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(
      new URL(
        `/signin?callbackUrl=${encodeURIComponent(requestedUrl)}`,
        request.url
      )
    );
  }

  if (!session && request.nextUrl.pathname.startsWith("/bookings")) {
    return NextResponse.redirect(
      new URL(
        `/signin?callbackUrl=${encodeURIComponent(requestedUrl)}`,
        request.url
      )
    );
  }

  if (!session && /^\/hotels\/[^\/]+\/[^\/]+$/.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(
      new URL(
        `/signin?callbackUrl=${encodeURIComponent(requestedUrl)}`,
        request.url
      )
    );
  }
};

export const config = {
  matcher: [
    "/signin:path*",
    "/profile:path*",
    "/bookings:path*",
    "/hotels/:hotelID/:roomID",
  ],
};

export default middleware;
