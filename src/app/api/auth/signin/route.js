import { NextResponse } from "next/server";

import {
    authenticateUser,
    createAuthSession,
} from "@/lib/auth";

export async function POST(request) {
    try {
        const body = await request.json();

        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                {
                    message: "Email and password are required.",
                },
                {
                    status: 400,
                }
            );
        }

        const user = await authenticateUser(email, password);

        if (!user) {
            return NextResponse.json(
                {
                    message: "Invalid email or password.",
                },
                {
                    status: 401,
                }
            );
        }

        await createAuthSession(user.id);

        return NextResponse.json({
            message: "Login successful.",
        });
    } catch (error) {
        console.error("Login error:", error);

        return NextResponse.json(
            {
                message: "Something went wrong.",
            },
            {
                status: 500,
            }
        );
    }
}