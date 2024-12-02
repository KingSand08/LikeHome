import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  const session = await auth();

  const requestedUrl = request.nextUrl.pathname + request.nextUrl.search;

  if (!session) {
    return NextResponse.redirect(
      new URL(
        `/signin?callbackUrl=${encodeURIComponent(requestedUrl)}`,
        request.url
      )
    );
  }
};

export const config = {
  matcher: ["/profile", "/bookings/:path*", "/hotels/:path/:path+"],
};

export default middleware;
