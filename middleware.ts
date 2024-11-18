
import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
    const session = await auth();

    // If the user is authenticated and trying to access login or signup, redirect to home
    if (session && (request.nextUrl.pathname === "/signin")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // If no token is found and the route requires authentication, redirect to the login page
    if (!session && (request.nextUrl.pathname.startsWith("/profile"))) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Allow the request to continue if the user is authenticated or on a public page
    return NextResponse.next();
};

export const config = {
    matcher: [
        "/signin:path*",
        "/profile:path*",
    ],
};

export default middleware;