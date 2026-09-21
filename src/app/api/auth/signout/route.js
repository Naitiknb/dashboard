import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/session";

export async function POST() {
    const response = NextResponse.json({
        message: "Logged out successfully.",
    });

    response.cookies.delete(AUTH_COOKIE);

    return response;
}