import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const token = await getToken({ req })
    const { pathname } = req.nextUrl;

    const isAuthPages = pathname == "/login" || pathname == "/register"

    // Build redirects from the incoming request URL (not NEXTAUTH_URL) so they
    // always stay on the current domain, in dev and in production.
    if (token && isAuthPages) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!token && !isAuthPages) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/cart", "/checkout", "/allorders", "/login", "/register", "/allorders"],
}
