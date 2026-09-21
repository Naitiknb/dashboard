import { NextResponse } from "next/server";
import {
    AUTH_COOKIE,
    readSessionToken,
} from "@/lib/session";

const PUBLIC = [
    "/signin",
    "/api/auth/signin",
];

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get(AUTH_COOKIE)?.value;

    const userId = await readSessionToken(token);

    if (!userId && !PUBLIC.includes(pathname)) {
        if (pathname.startsWith("/api/")) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        return NextResponse.redirect(
            new URL("/signin", request.url)
        );
    }

    if (userId && pathname === "/signin") {
        return NextResponse.redirect(
            new URL("/dashboard", request.url)
        );
    }

    return NextResponse.next();
}